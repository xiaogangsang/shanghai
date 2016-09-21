'use strict;'

var common = require('common');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 20;
var _pageTotal = 0;
var _querying = false;
var _searchCache = {};
var _useCache = false;
var _shipStatus = ['', '出货中', '出货成功', '出货失败', '已退货'];
var _status = ['', '待支付', '支付成功', '支付失败', '退款成功', '退款失败', '已关闭'];

$(function () {
  common.init('monitor-refund');
  setChannel();

  $('#search_beginTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginTime').datetimepicker('setEndDate', FromEndDate);
  });

  var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_beginTime').val(todayDate).datetimepicker('setEndDate', todayDate);
  $('#search_endTime').val(todayDate).datetimepicker('setEndDate', todayDate);
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  $('#dataTable tbody').html('<tr><td colspan="13" align="center">查询中...</td></tr>');
  _pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  if (!!_querying) {
    return false;
  }

  _querying = true;

  var sendData = {
    channel: $('#search_channel').val(),
    orderNo: $('#search_orderNo').val().trim(),
    mobile: $('#search_mobile').val().trim(),
    thdOrderNo: $('#search_thdOrderNo').val().trim(),
    type: $('#search_type').val(),
    beginTime: $('#search_beginTime').val().trim(),
    endTime: $('#search_endTime').val().trim(),
    pageSize: _pageSize,
  };

  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + '/monitor/autoRefundLog',
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
        _useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          item.shipStatus = _shipStatus[+item.shipStatus];
          item.status = _status[+item.status];
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

      $('#search_channel').append(html);
    }
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
