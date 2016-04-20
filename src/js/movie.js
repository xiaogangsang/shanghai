var common = require('common');
// var _cities = [];
// var _channels = {};
var _versions = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;

$(function() {
  common.setMenu('movie');
  //set search form
  setVersion();
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
  $('#search_beginShowDate,#search_endShowDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  var beginDate = new Date();
  var endDate = new Date();
  endDate.setDate(endDate.getDate()+7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginShowDate').val(beginDate);
  $('#search_endShowDate').val(endDate);
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    name: $.trim( $('#search_name').val() ),
    produceCorp: $.trim( $('#search_produceCorp').val() ),
    dimenId: $('#search_dimenId').val(),
    beginShowDate: $('#search_beginShowDate').val(),
    endShowDate: $('#search_endShowDate').val(),
    status: $('#search_status').val(),
    associationStatus: $('#search_associationStatus').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + '/film/standardFilm/list',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="6" align="center">请点击“查询”按钮！</td></tr>');
        return false;
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.floor(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function(item){
          switch (item.status) {
            case 0:
              item.statusName = '即将上映';
              break;
            case 1:
              item.statusName = '正在热映';
              break;
            case 2:
              item.statusName = '下映存档';
              break;
            default:
              item.statusName = '';
              break;
          }
          item.associationStatus = item.associationStatus == 1 ? '已关联' : '未关联';
        });
        setTableData(res.data.rows);
      }

    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
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
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + '/film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      var data = res.data;
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-movie-detail .modal-body').html(html);
      $('#popup-movie-detail').modal('show');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
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
        $('#search_dimenId').append($('<option></option>').attr('value', item.id).text(item.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
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