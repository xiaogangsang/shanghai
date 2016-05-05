'use strict;'

var common = require('common');
var _channels = {};
var _status = [
{ id: 1, name: '出票中' },
{ id: 2, name: '已出票' },
{ id: 3, name: '出票失败' },
{ id: 4, name: '已退票' },
];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('order-cs');

  //set search form
  setChannel();

  // setSource();
  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    daysMin:  ['日', '一', '二', '三', '四', '五', '六', '日'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    suffix: [],
    meridiem: ['上午', '下午'],
  };
  $('#search_placeOrderStartTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_placeOrderEndTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_placeOrderEndTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_placeOrderStartTime').datetimepicker('setEndDate', FromEndDate);
  });
});

//handle search form
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
    mobile: $.trim($('#search_mobile').val()),
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
    url: common.API_HOST + '/order/kf/orderList',
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
          _(_status).forEach(function (status) {
            if (status.id == item.productOrderStatus) {
              item.productOrderStatus = status.name;
            }
          });

          _(_channels).forEach(function (channel) {
            if (channel.channelId == item.channelId) {
              item.channelName = channel.channelName;
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

      $('#search_channelId').append(html);
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
