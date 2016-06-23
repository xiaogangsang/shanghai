'use strict;'

var common = require('common');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('coupon-record');
  getChannel();
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
  if ($.trim($('#search_couponCode').val()) == '' && $.trim($('#search_userId').val()) == '') {
    alert('优惠券码或归属用户ID，至少填写一项！');
    return false;
  }

  var sendData = {
    couponCode: $.trim($('#search_couponCode').val()),
    userId: $.trim($('#search_userId').val()),
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
    url: common.API_HOST + 'couponCode/list',
    // url: 'http://172.16.0.50:8080/movie-ops/couponCode/list',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="7" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;

        // _pageIndex = res.data.pageIndex;
        // _pageTotal = Math.ceil(res.data.total / _pageSize);
        // setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data).forEach(function (item) {
          switch (item.source) {
            case 'PRODUCE':
              item.source = '批量产码';
            break;
            case 'SEND':
              item.source = '批量灌码';
            break;
            case 'BUY_CMBCC':
              item.source = '掌上生活购买';
            break;
            case 'BUY_CMB':
              item.source = '手机银行购买';
            break;
            default:
            break;
          }

          switch (item.status) {
            case 'DELETED':
              item.status = '删除';
            break;
            case 'ACTIVE':
              item.status = '有效';
            break;
            case 'USED':
              item.status = '已使用';
            break;
            default:
            break;
          }
        });

        setTableData(res.data);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#dataTable').on('click', '.btn-flow', function (event) {
  event.preventDefault();
  $.ajax({
    url: common.API_HOST + 'usedCouponLog/list',
    // url: 'http://172.16.0.50:8080/movie-ops/usedCouponLog/list',
    type: 'POST',
    dataType: 'json',
    data: { couponCode: $(this).closest('tr').data('code') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        alert('暂无流水记录！');
        return false;
      }

      var orderUrl = 'order-cs-detail.html';
      if ($('#menu-order').css('display') == 'block') {
        orderUrl = 'order-detail.html';
      }

      var data = { rows: rows, orderUrl: orderUrl };
      var template = $('#flow-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#flowTable tbody').html(html);
      $('#popup-coupon-flow').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

// $('#pager').on('click', '.prev,.next', function (e) {
//   e.preventDefault();
//   if ($(this).hasClass('prev')) {
//     if (_pageIndex <= 1) {
//       _pageIndex = 1;
//       alert('已经是第一页！');
//       return false;
//     }

//     _pageIndex--;
//   } else {
//     if (_pageIndex >= _pageTotal) {
//       _pageIndex = _pageTotal;
//       alert('已经是最后一页！');
//       return false;
//     }

//     _pageIndex++;
//   }

//   $('#formSearch').trigger('submit');
//   return false;
// });

// $('#pager').on('click', '#btn-pager', function (e) {
//   e.preventDefault();
//   if (~~$('#pageNo').val() == 0) {
//     return false;
//   }

//   var pageNo = parseInt($('#pageNo').val());
//   if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
//     alert('要跳转的页码超过了范围！');
//     return false;
//   }

//   _pageIndex = pageNo;
//   $('#formSearch').trigger('submit');
//   return false;
// });

function getChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：' + res.meta.msg);
    }
  });
}

function setTableData(rows) {
  var orderUrl = 'order-cs-detail.html';
  if ($('#menu-order').css('display') == 'block') {
    orderUrl = 'order-detail.html';
  }

  var data = { rows: rows, orderUrl: orderUrl };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

// function setPager(total, pageIndex, rowsSize, pageTotal) {
//   var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
//   var template = $('#pager-template').html();
//   Mustache.parse(template);
//   var html = Mustache.render(template, data);
//   $('#pager').html(html);
// }
