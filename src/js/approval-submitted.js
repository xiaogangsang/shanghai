'use strict;'

var common = require('common');
var _budgetSource = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

var typeMap = {'0': '活动单元', '1': '活动计划', '2': '优惠券'};
var statusMap = {'0': '未审核', '1': '审核中', '2': '审核驳回', '3': '已审核'};
var editUrlMap = {'0': 'activity-unit-edit.html', '1': 'activity-plan-edit.html', '2': 'coupon-rule-edit.html'};

$(function () {
  common.init('approval-submitted');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    name: $.trim($('#search_name').val()),
    typeCode: $.trim($('#search_type').val()),
    statusCode: $('#search_status').val(),
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
    url: common.API_HOST + 'verification/myOutbox',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {

    // LIUGE_TODO: data下面的key改为rows
    // var res = JSON.parse('{  "meta": {    "result": "1",    "msg": "操作成功"  },  "data": {    "rows": [      {        "id": 11,        "typeCode": 0,        "type": null,        "name": "审核测试活动2",        "pid": 0,        "promotor": "1",        "promotorName": "超级管理员",        "operator": "19552",        "operatorName": null,        "content": null,        "statusCode": 1,        "status": null,        "updateTime": "2017-02-09 16:41:12.0"      }    ],    "pageIndex": 1,    "total": 6,    "pageSize": 9999  }}');
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);

        _(res.data.rows).forEach(function (item, key) {
          item.canEdit = (item.statusCode != 1);
          item.editUrl = editUrlMap[item.typeCode];
          item.status = statusMap[item.statusCode];
          item.type = typeMap[item.typeCode];

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

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (~~$('#pageNo').val() == 0) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (~~pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

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
