'use strict;'

var common = require('common');
var _types = [
{ id: 'USER', name: '用户管理' },
{ id: 'ROLE', name: '角色管理' },
{ id: 'RESOURCE', name: '功能管理' },
{ id: 'USER_CITY_AUTHORITY', name: '城市权限管理' },
{ id: 'USER_CHANNEL_AUTHORITY', name: '用户权限管理' },
{ id: 'CINEMA', name: '影院管理' },
{ id: 'FILM', name: '影片管理' },
{ id: 'BANNER', name: '前端配置平台' },
{ id: 'PLAN', name: '活动计划管理' },
{ id: 'ACTIVITY', name: '活动单元管理' },
{ id: 'COUPON', name: '优惠券管理' },
{ id: 'COMMENT', name: '评论管理' },
{ id: 'ORDER', name: '订单管理' },
{ id: 'TICKET', name: '票类管理' },
{ id: 'CHANNELFEE', name: '服务费管理' },
];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('record-operation');
  setType();

  $('#search_beginDate').datetimepicker({
    format: 'yyyy-mm-dd hh:00',
    language: 'zh-CN',
    minView: 1,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endDate').datetimepicker({
    format: 'yyyy-mm-dd hh:00',
    language: 'zh-CN',
    minView: 1,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginDate').datetimepicker('setEndDate', FromEndDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginDate').datetimepicker('setEndDate', endDate);
  $('#search_endDate').datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    type: $('#search_type').val(),
    beginDate: $.trim($('#search_beginDate').val()),
    endDate: $.trim($('#search_endDate').val()),
    pageSize: _pageSize,
  };
  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'log/operationLog',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="4" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          _(_types).forEach(function (type) {
            if (type.id == item.objectType) {
              item.objectType = type.name;
            }
          });
        });

        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#pager').on('click', '.prev,.next', function (e) {
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

    _pageIndex++;
  }

  $('#formSearch').trigger('submit');
  return false;
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (~~$('#pageNo').val() == 0) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

function setType() {
  _(_types).forEach(function (value) {
    $('#search_type').append($('<option></option>').attr('value', value.id).text(value.name));
  });
}

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
