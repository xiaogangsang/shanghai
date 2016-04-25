var common = require('common');
var _channels = {};
var _status = [{id:1, name:'出票中'}, {id:2, name:'已出票'}, {id:3, name:'出票失败'},{id:4, name:'已退票'}];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var searchCache = {};
var useCache = false;

$(function() {
  common.setMenu('order-cs');
  //set search form
  setChannel();
  // setSource();
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
  $('#search_placeOrderStartTime,#search_placeOrderEndTime').datetimepicker({format: 'yyyy-mm-dd hh:ii:00', language: 'zh-CN', todayHighlight: true, autoclose: true});
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    mobile: $.trim( $('#search_mobile').val() ),
    productOrderStatus: $('#search_productOrderStatus').val(),
    channelId: $('#search_channelId').val(),
    placeOrderStartTime: $('#search_placeOrderStartTime').val(),
    placeOrderEndTime: $('#search_placeOrderEndTime').val(),
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
    url: common.API_HOST + '/order/kf/orderList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="13" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        return false;
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function(item){
          _(_status).forEach(function(status){
            if (status.id == item.productOrderStatus) {
              item.productOrderStatus = status.name;
            }
          });
          _(_channels).forEach(function(channel){
            if (channel.channelId == item.channelId) {
              item.channelName = channel.channelName;
            }
          });
        });
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-detail', function(event) {
  event.preventDefault();
  $.ajax({
    url: common.API_HOST + '/order/kf/orderDetail',
    type: 'POST',
    dataType: 'json',
    data: {transOrderNo:$(this).closest('tr').data('id')}
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      setModal(res.data);
      $('#popup-order-cs-detail').modal('show');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-sendsms', function(event) {
  event.preventDefault();
  if (false == window.confirm('确定要发送短信吗？')) {
    return false;
  }
  var transOrderNo = $('#transOrderNo').val();
  var productOrderNo = $('#productOrderNo').val();
  if ( transOrderNo=='' || productOrderNo=='' ) {
    alert('非法操作，无法获取订单号！');
    return false;
  }
  $.ajax({
    url: common.API_HOST + '/order/kf/sendMessage',
    type: 'POST',
    dataType: 'json',
    data: {
      transOrderNo: transOrderNo,
      productOrderNo: productOrderNo
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert('短信发送成功！');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-returnCoupon', function(event) {
  event.preventDefault();
  if (false == window.confirm('确定退优惠券吗？')) {
    return false;
  }
  var productOrderNo = $('#productOrderNo').val();
  if ( productOrderNo=='' ) {
    alert('非法操作，无法获取订单号！');
    return false;
  }
  $.ajax({
    url: common.API_HOST + '/order/kf/refundCoupon',
    type: 'POST',
    dataType: 'json',
    data: {productOrderNo: productOrderNo}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert('退优惠券成功！');
      $('#popup-order-return-ticket').modal('hide');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-returnTicket', function(event) {
  event.preventDefault();
  $('#popup-order-return-ticket').modal('show');
});
$(document).on('submit', '#popup-order-return-ticket form', function(event) {
  event.preventDefault();
  if (false == window.confirm('确定退票吗？')) {
    return false;
  }
  var transOrderNo = $('#transOrderNo').val();
  var productOrderNo = $('#productOrderNo').val();
  var refundReason = $('#refundReason').val();
  if (refundReason == '') {
    alert('退款原因不能为空！');
    return false;
  }
  if ( transOrderNo=='' || productOrderNo=='' ) {
    alert('非法操作，无法获取订单号！');
    $('#popup-order-return-ticket').modal('hide');
    return false;
  }
  $.ajax({
    url: common.API_HOST + '/order/kf/refundTicket',
    type: 'POST',
    dataType: 'json',
    data: {
      transOrderNo: transOrderNo,
      productOrderNo: productOrderNo,
      refundReason: refundReason
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert('退票成功！');
      $('#popup-order-return-ticket').modal('hide');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
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
  $('#dataTable tbody').html('<tr><td colspan="13" align="center">查询中...</td></tr>');
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

function setModal(orderData) {
  if (orderData) {
    orderData.canReturnTicket = false; //已出票+支付成功+支持退票的万达票类影院
    orderData.canReturnCoupon = false; //不是已出票+有优惠券
    var data = {order:orderData};
    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-order-cs-detail .modal-body').html(html);
  }
  return false;
}
function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
      $.each(_channels, function(index, item) {
        $('#search_channelId').append($('<option></option>').attr('value', item.channelId).text(item.channelName));
      });
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