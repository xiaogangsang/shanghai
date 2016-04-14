require('datetimepicker');
var common = require('common');
// var _cities = [];
// var _channels = {};
var _versions = {};
var _pageIndex = 1;
var _pageSize = 10;

$(function() {
  common.setMenu('class');
  //set search form
  // $("#search_status").chosen({disable_search_threshold: 10,allow_single_deselect: true});
  // setChannel();
  // setCity();
  setVersion();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    id: $.trim( $('#search_id').val() ),
    ticketName: $.trim( $('#search_ticketName').val() ),
    channelId: $('#search_channelId').val(),
    cityId: $('#search_cityId').val(),
    status: $('#search_status').val()
  };
  console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'wandaTicket/ticketList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      _(res.data.row).forEach(function(item){
        item.statusName = item.statusName == 1 ? '已上线' : '已下线';
        item.settleName = item.settleType == 1 ? '万达总部' : '万达区域';
        item.typeName = item.ticketType == 1 ? '日常票类' : '活动票类';
      });
      setTableData(res.data.rows);
      $('#btn-export').prop('disabled', false);
    } else {
      alert(res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-online,.btn-offline', function(e) {
  e.preventDefault();
  var sendData = {
    id: $(this).closest('tr').data('td'),
    status: $(this).hasClass('btn-offline') ? 1 : 0
  };
  var statusName = sendData.status ? '下线' : '上线';
  $.ajax({
    url: common.API_HOST + 'wandaTicket/updateStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      1 == sendData.status ? $(this).closest('tr').find('.btn-offline').addClass('btn-online').removeClass('btn-offline').html('下线') : $(this).closest('tr').find('.btn-online').addClass('btn-offline').removeClass('btn-online').html('上线');
      $(this).closest('tr').find('td:nth-child(8)').html('已'+statusName);
      alert(statusName+'操作成功!');
    } else {
      alert(res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();

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

function setModal(classData) {
  var data, template;
  if (classData) {
    delete classData.resources;
    _(_users).forEach(function(value, key){
      _users[key].selected = _.includes(classData.users, value.id) ? true : false;
    });
    delete classData.users;
    data = {class:classData, channels:_channels};
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

function setVersion() {
  $.ajax({
    url: common.API_HOST + 'common/dimenList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _versions = res.data;
      _(_versions).forEach(function(item){
        $('#search_channelId').append($('<option></option>').attr('value', channel.channelId).text(channel.channelName));
      });
      $("#search_channelId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert(res.meta.msg);
    }
  });
}

function setPager(total, pageIndex, pageSize) {
  var data = {total:total,pageIndex:pageIndex,pageSize:pageSize};
  var pageTotal = _.ceil(total/pageSize);
  pageTotal = pageTotal > 1 ? pageTotal : 0;
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
// function setChannel() {
//   $.ajax({
//     url: common.API_HOST + 'common/channelList',
//     type: 'GET',
//     dataType: 'json'
//   })
//   .done(function(res) {
//     // console.log(res.data);
//     if (true == res.meta.result) {
//       _channels = res.data;
//       $.each(_channels, function(index, channel) {
//         $('#search_channelId').append($('<option></option>').attr('value', channel.channelId).text(channel.channelName));
//       });
//       $("#search_channelId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
//     } else {
//       alert(res.meta.msg);
//     }
//   });
// }
// function setCity() {
//   $.ajax({
//     url: common.API_HOST + 'common/cityList',
//     type: 'GET',
//     dataType: 'json'
//   })
//   .done(function(res) {
//     // console.log(res);
//     if (true == res.meta.result) {
//       _(res.data).forEach(function(group){
//         _(group).forEach(function(city){
//           _cities.push( city );
//         });
//       });
//       $.each(_cities, function(index, item) {
//         $('#search_cityId').append($('<option></option>').attr('value', item.cityId).text(item.cityName));
//       });
//       $("#search_cityId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
//     } else {
//       alert(res.meta.msg);
//     }
//   });
// }