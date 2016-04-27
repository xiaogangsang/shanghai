var common = require('common');
var _cities = [];
var _channels = {};
var _cinemas = {};
var _choosed = {};
var _pageIndex = 1;
var _pageSize = 10;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function() {
  common.setMenu('class');
  common.setLoginName();
  //set search form
  setChannel();
  setCity();

  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
  };
  getCinema();
});

$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $("#formSearch").trigger('submit');
});
$('#formSearch').on('submit', function(e) {
  e.preventDefault();

  if (true == _querying) {
    return false;
  }
  _querying = true;

  var sendData = {
    id: $.trim( $('#search_id').val() ),
    ticketName: $.trim( $('#search_ticketName').val() ),
    channelId: $('#search_channelId').val(),
    cityId: $('#search_cityId').val(),
    status: $('#search_status').val(),
    pageSize: _pageSize
  };
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }
  sendData.pageIndex = _pageIndex;
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    _querying = false;
    useCache = true;
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex != undefined ? res.data.pageIndex : _pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      _(res.data.rows).forEach(function(item){
        item.beginTime = item.beginTime.split(' ')[0];
        item.endTime = item.endTime.split(' ')[0];
        item.cityShort = item.cityNames.length > 13 ? item.cityNames.substr(0,10)+'...' : item.cityNames;
        item.statusName = item.status == 1 ? '已上线' : '已下线';
        item.settleName = item.settleType == 1 ? '万达总部' : '万达区域';
        item.typeName = item.type == 1 ? '日常票类' : '活动票类';
        item.onlineStatus = item.status==1 ? 1 : 0;
      });
      setTableData(res.data.rows);
      $('#btn-export').prop('disabled', false);
    } else {
      alert(res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-status', function(e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  var btn = $(this);
  var sendData = {
    id: tr.data('id'),
    status: btn.data('status')==1 ? 2 : 1
  };
  var statusName = sendData.status==1 ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/updateStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      $('#formSearch').trigger('submit');
      // btn.data('status', sendData.status).text(sendData.status==1 ? '下线' : '上线');
      // tr.find('td:nth-child(8)').html('已'+statusName);
      alert(statusName+'操作成功!');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-check', function(event) {
  event.preventDefault();
  var id = $(this).closest('tr').data('id');
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: id }
  })
  .done(function(res) {
    if (true == res.meta.result) {
      $('#popup-class-check .modal-title').text('检查【'+res.data.wandaTicket.ticketId+'】的场次');
      $('#check_id').val(res.data.wandaTicket.id);

      var cinemaList = [];
      _(res.data.ticketStoreRelList).forEach(function(store){
        cinemaList.push(store.storeId);
      });
      _(_cinemas).forEach(function(cinema){
        if(cinemaList.indexOf(cinema.cinemaId) > -1) {
          $('#check_cinemaId').append($('<option></option>').attr('value', cinema.cinemaId).text(cinema.cinemaName));
        }
      });
      var beginTimeStr = res.data.wandaTicket.beginTimeStr.split(' ')[0];
      var endTimeStr = res.data.wandaTicket.endTimeStr.split(' ')[0];

      $('#check_date').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true, startDate: beginTimeStr, endDate: endTimeStr});

      $('#popup-class-check').modal('show');
      $('#popup-class-check form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('submit', '#popup-class-check form', function(event) {
  event.preventDefault();
  alert('检查时间会有点长，请耐心等待！');
  $(this).find('input[type=submit]').prop('disabled', true).text('检查中...');
  var sendData = {
    id: $('#check_id').val(),
    cinemaId: $('#check_cinemaId').val(),
    date: $.trim( $('#check_date').val() )
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'timeTable/timeTableList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      $(this).find('input[type=submit]').text('检查完毕');
      alert(res.data.status);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-edit', function(event) {
  event.preventDefault();
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      var cinemaList = [];
      _(res.data.ticketStoreRelList).forEach(function(store){
        cinemaList.push(store.storeId);
      });
      delete res.data.ticketStoreRelList;
      _(_cinemas).forEach(function(cinema){
        cinema.selected = cinemaList.indexOf(cinema.cinemaId) > -1 ? true : false;
      });
      var channelList = [];
      _(res.data.ticketChannelRelList).forEach(function(channel){
        channelList.push(channel.channelId);
      });
      delete res.data.ticketChannelRelList;
      _(_channels).forEach(function(channel){
        channel.selected = channelList.indexOf(channel.channelId) > -1 ? true : false;
      });
      res.data.wandaTicket.beginTimeStr = res.data.wandaTicket.beginTimeStr.split(' ')[0];
      res.data.wandaTicket.endTimeStr = res.data.wandaTicket.endTimeStr.split(' ')[0];

      setModal(res.data.wandaTicket);
      $('#popup-class-form').modal('show');
      $('#beginTime,#endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
      $('#popup-class-form form').parsley();
      $('#cinemaSelect').multiselect({
        search: {
          left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
          right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
        },
        right: '#cinemaSelect_to',
        rightAll: '#cinemaSelect_all',
        rightSelected: '#cinemaSelect_right',
        leftSelected: '#cinemaSelect_left',
        leftAll: '#cinemaSelect_none'
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#popup-class-form button[type=submit]', function(event) {
  event.preventDefault();
  $('#cinemaSelect_to option').prop('selected', true);
  $('#popup-class-form form').trigger('submit');
});
$(document).on('submit', '#popup-class-form form', function(event) {
  event.preventDefault();
  var sendData = {
    ticketName: $.trim( $('#popup-class-form #ticketName').val() ),
    settleType: $('#popup-class-form input[name=settleType]:checked').val(),
    ticketType: $('#popup-class-form input[name=ticketType]:checked').val(),
    isSupportRefund: $('#popup-class-form input[name=isSupportRefund]:checked').val(),
    ticketRule: $.trim( $('#popup-class-form #ticketRule').val() ),
    beginTime: $.trim( $('#popup-class-form #beginTime').val() ),
    endTime: $.trim( $('#popup-class-form #endTime').val() )
  };
  sendData.channelId = [];
  $('#popup-class-form input[name=channelId]:checked').each(function(index, el) {
    sendData.channelId.push($(this).val());
  });
  sendData.channelId = sendData.channelId.join('|');
  sendData.cinema = [];
  $('#cinemaSelect_to option').each(function(index, el) {
    sendData.cinema.push($(this).val());
  });
  sendData.cinema = sendData.cinema.join('|');
  var ajaxUrl = common.API_HOST + 'thirdParty/wandaTicket/saveTicket';
  if( $('#popup-class-form #id').length > 0) {
    sendData.id = $('#popup-class-form #id').val();
    ajaxUrl = common.API_HOST + 'thirdParty/wandaTicket/updateTicket';
  }
  console.log( sendData );
  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if( $('#popup-class-form #id').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }
      $('#popup-class-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-class-form').modal('show');
  $('#popup-class-form form').parsley();
  $('#beginTime,#endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  $('#cinemaSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#cinemaSelect_to',
    rightAll: '#cinemaSelect_all',
    rightSelected: '#cinemaSelect_right',
    leftSelected: '#cinemaSelect_left',
    leftAll: '#cinemaSelect_none'
  });
});
$(document).on('click', '#btn-export', function(e) {
  e.preventDefault();
  var downloadUrl = common.API_HOST + 'thirdParty/wandaTicket/exportTickets?' +
  'id='+$.trim( $('#search_id').val() ) +
  '&ticketName='+$.trim( $('#search_ticketName').val() ) +
  '&channelId='+$('#search_channelId').val() +
  '&cityId='+$('#search_cityId').val() +
  '&status='+$('#search_status').val() +
  '&pageIndex='+_pageIndex +
  '&pageSize='+_pageSize;
  window.open(downloadUrl);
  return false;
});
$('#pager').on('click', '.prev,.next', function(e) {
  e.preventDefault();
  if ($(this).hasClass('prev')) {
    if (_pageIndex <= 1) {
      _pageIndex = 1;
      alert('已经是第一页！');
      return false;
    }
    _pageIndex--;
  } else {
    if (_pageIndex >= _pageTotal) {
      _pageIndex = _pageTotal;
      alert('已经是最后一页！');
      return false;
    }
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
  return false;
});

function setModal(classData) {
  var data, template;
  if (classData) {
    data = {class:classData, channels:_channels, cinemas: _cinemas};
    template = $('#edit-template').html();
  } else {
    data = {channels:_channels, cinemas: _cinemas};
    template = $('#create-template').html();
    $('#popup-class-form .modal-title').html('新增票类');
  }
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-class-form .modal-body').html(html);
}
function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data).forEach(function(group){
        _(group).forEach(function(city){
          _cities.push( city );
        });
      });
      $.each(_cities, function(index, item) {
        $('#search_cityId').append($('<option></option>').attr('value', item.cityId).text(item.cityName));
      });
      $("#search_cityId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert(res.meta.msg);
    }
  });
}
function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      _channels = res.data;
      $.each(_channels, function(index, channel) {
        $('#search_channelId').append($('<option></option>').attr('value', channel.channelId).text(channel.channelName));
      });
      $("#search_channelId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert(res.meta.msg);
    }
  });
}
function getCinema() {
  $.ajax({
    url: common.API_HOST + 'common/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: {brandId: 1}
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      _cinemas = res.data;
    } else {
      alert(res.meta.msg);
    }
  });
}
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}