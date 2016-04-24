var common = require('common');
var _cities = [];
var _channels = {};
var _cinemas = {};
var _pageIndex = 1;
var _pageSize = 10;
var searchCache = {};
var useCache = false;

$(function() {
  common.setMenu('class');
  //set search form
  setChannel();
  setCity();

  getCinema();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
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
    // console.log(res);
    if (true == res.meta.result) {
      useCache = true;
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      _(res.data.rows).forEach(function(item){
        item.cityShort = item.cityNames.length > 13 ? item.cityNames.substr(0,10)+'...' : item.cityNames;
        item.statusName = item.status == 1 ? '已上线' : '已下线';
        item.settleName = item.settleType == 1 ? '万达总部' : '万达区域';
        item.typeName = item.type == 1 ? '日常票类' : '活动票类';
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
    status: btn.data('status')==1 ? 0 : 1
  };
  var statusName = sendData.status ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/updateStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      btn.data('status', sendData.status).text(sendData.status ? '下线' : '上线');
      tr.find('td:nth-child(8)').html('已'+statusName);
      alert(statusName+'操作成功!');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-check', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'timeTable/timeTableList',
    type: 'POST',
    dataType: 'json',
    data: {id: $(this).closest('tr').data('id')}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert(res.data.status);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      // res.data.showDate = res.data.showDate.split(' ')[0];
      setModal(res.data);
      $('#popup-class-form').modal('show');
      // $('#showDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
      $('#popup-class-form form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-class-form').modal('show');
  $('#popup-class-form form').parsley();
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
  $('#beginTime,#endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
});
$(document).on('click', '#btn-export', function(e) {
  e.preventDefault();
  var sendData = {
    id: $.trim( $('#search_id').val() ),
    ticketName: $.trim( $('#search_ticketName').val() ),
    channelId: $('#search_channelId').val(),
    cityId: $('#search_cityId').val(),
    status: $('#search_status').val()
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      _(res.data.rows).forEach(function(item){
        item.cityShort = item.cityNames.length > 13 ? item.cityNames.substr(0,10)+'...' : item.cityNames;
        item.statusName = item.status == 1 ? '已上线' : '已下线';
        item.settleName = item.settleType == 1 ? '万达总部' : '万达区域';
        item.typeName = item.type == 1 ? '日常票类' : '活动票类';
      });
      setTableData(res.data.rows);
      $('#btn-export').prop('disabled', false);
    } else {
      alert(res.meta.msg);
    }
  });
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
$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $("#formSearch").trigger('submit');
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
    var channel_ids = [];
    _(classData.ticketChannelRelList).forEach(function(item){
      channel_ids.push(item.channelId);
    });
    _(_channels).forEach(function(channel){
      channel.selected = channel_ids.indexOf(channel.channelId) > -1 ? true : false;
    });
    var cinema_ids = [];
    _(classData.ticketStoreRelList).forEach(function(item){
      cinema_ids.push(item.storeId);
    });
    classData = classData.wandaTicket;
    data = {class:classData, channels:_channels, cinemas: cinema_ids};
    template = $('#edit-template').html();
  } else {
    data = {channels:_channels};
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
    data: {brandId:1}
  })
  .done(function(res) {
    // console.log(res);
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