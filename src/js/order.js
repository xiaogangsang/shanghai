'use strict;'

var common = require('common');
var _channels = {};
var _productOrderStatus = [
{ id: 0, name: '未出票' },
{ id: 1, name: '出票中' },
{ id: 2, name: '已出票' },
{ id: 3, name: '出票失败' },
{ id: 4, name: '已退票' },
];
var _status = [
{ id: 1, name: '待支付' },
{ id: 2, name: '支付成功' },
{ id: 3, name: '支付失败' },
{ id: 5, name: '退款成功' },
{ id: 6, name: '退款失败' },
{ id: 9, name: '已关闭' },
];
var _transOrderStatus = [
{ id: 1, name: '待支付' },
{ id: 2, name: '支付成功' },
{ id: 3, name: '支付关闭' },
{ id: 9, name: '已关闭' },
];
var _sources = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _detailPermission = false;

$(function () {
  common.init('order');
  if (common.verifyPermission(118) == false) {
    alert('对不起，您没有权限！');
    window.location.href = 'login.html?logout';
  }

  _detailPermission = common.verifyPermission(119);
  setChannel();
  getSource();

  $('#search_placeOrderStartTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(startDate));
    $('#search_placeOrderEndTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_placeOrderEndTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var endDate = new Date(ev.date.valueOf());
    endDate.setDate(endDate.getDate(endDate));
    $('#search_placeOrderStartTime').datetimepicker('setEndDate', endDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_placeOrderStartTime').val(beginDate).datetimepicker('setEndDate', endDate);
  $('#search_placeOrderEndTime').val(endDate).datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  $('#dataTable tbody').html('<tr><td colspan="13" align="center">查询中...</td></tr>');
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    mobile: $('#search_mobile').val().trim(),
    transOrderNo: $('#search_transOrderNo').val().trim(),
    tpOrderNo: $('#search_tpOrderNo').val().trim(),
    productOrderStatus: $('#search_productOrderStatus').val(),
    channelId: $('#search_channelId').val(),
    placeOrderStartTime: $('#search_placeOrderStartTime').val(),
    placeOrderEndTime: $('#search_placeOrderEndTime').val(),
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
    url: common.API_HOST + '/order/op/orderList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        var html = '<tr><td colspan="13" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          _(_productOrderStatus).forEach(function (status) {
            if (status.id == item.productOrderStatus) {
              item.productOrderStatus = status.name;
            }
          });

          _(_channels).forEach(function (channel) {
            if (channel.channelId == item.channelId) {
              item.channelName = channel.channelName;
            }
          });

          _(_sources).forEach(function (source) {
            if (source.sourceId == item.thirdParty) {
              item.thirdParty = source.sourceName;
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

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
      var html = '';
      $.each(_channels, function (index, item) {
        html += '<option value="' + item.channelId + '">' + item.channelName + '</option>';
      });

      $('#search_channelId').html(html);

      $('#formSearch').trigger('submit');
    }
  });
}

function getSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    // console.log(res.data);
    if (!!~~res.meta.result) {
      _sources = res.data;
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setTableData(rows) {
  var data = { detailPermission: _detailPermission, rows: rows };
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
