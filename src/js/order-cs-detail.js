var common = require('common');
var _bizStatus = [{id:1, name:'出票中'}, {id:2, name:'已出票'}, {id:3, name:'出票失败'}, {id:4, name:'已退票'}];
var _payStatus = [{id:1, name:'待支付'}, {id:2, name:'支付成功'}, {id:3, name:'支付失败'}, {id:4, name:'退款成功'}, {id:5, name:'退款失败'}];
var _channels = {};

$(function() {
  common.setMenu('order-cs');
  getChannel();

  var urlParam = common.getUrlParam();
  if (urlParam.orderId != undefined && urlParam.orderId != '') {
    $.ajax({
      url: common.API_HOST + 'order/kf/orderDetail',
      type: 'POST',
      dataType: 'json',
      data: {transOrderNo: urlParam.orderId}
    })
    .done(function(res) {
      console.log(res);
      if (true == res.meta.result) {
        $('h2').append('：'+urlParam.orderId);
        $('#transOrderNo').val(res.data.payOrder.transOrderNo);
        $('#productOrderNo').val(res.data.bizOrder.productOrderNo);

        _(_channels).forEach(function(channel){
          if (channel.channelId == res.data.bizOrder.channelId) {
            res.data.bizOrder.channelName = channel.channelName;
          }
        });
        _(_payStatus).forEach(function(status){
          if (status.id == res.data.payOrder.transOrderStatus) {
            res.data.payOrder.transOrderStatus = status.name;
          }
        });
        _(_bizStatus).forEach(function(status){
          if (status.id == res.data.bizOrder.productOrderStatus) {
            res.data.bizOrder.productOrderStatus = status.name;
          }
        });
        res.data.bizOrder.canReturnTicket = false;
        if (res.data.bizOrder.productOrderStatus=='已出票' && res.data.payOrder.transOrderStatus=='支付成功' && res.data.bizOrder.wandaTicketId != null) {
          res.data.bizOrder.canReturnTicket = true;
        }
        res.data.bizOrder.canReturnCoupon = false;
        if (res.data.bizOrder.productOrderStatus!='已出票' && res.data.bizOrder.couponId != null) {
          res.data.bizOrder.canReturnCoupon = true;
        }
        setPayOrder(res.data.payOrder);
        setBizOrder(res.data.bizOrder);
      } else {
        alert('接口错误：'+res.meta.msg);
        window.location.href = 'order-cs.html';
      }
    });
  } else {
    window.location.href = 'order-cs.html';
  }
});

function setPayOrder( pay ) {
  var template = $('#pay-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, pay);
  $('#payOrder').append(html);
}

function setBizOrder( biz ) {
  biz.frontTicket = biz.ticketInfo.frontInfo.codeInfoList;
  biz.machineTicket = biz.ticketInfo.machineInfo.codeInfoList;
  var template = $('#biz-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, biz);
  $('#bizOrder').append(html);
  $('[data-toggle="tooltip"]').tooltip()
}

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
    url: common.API_HOST + 'order/kf/sendMessage',
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
    url: common.API_HOST + 'order/kf/refundCoupon',
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
  $('#popup-undertaker').modal('show');
  $('#popup-undertaker form').parsley();
});
$(document).on('submit', '#popup-undertaker form', function(event) {
  event.preventDefault();
  if (false == window.confirm('确定退票吗？')) {
    return false;
  }
  var sendData = {
    transOrderNo: $('#transOrderNo').val(),
    productOrderNo: $('#productOrderNo').val(),
    chargeUndertaker: $('#chargeUndertaker').val(),
    refundReason: $.trim( $('#refundReason').val() )
  };
  if ( sendData.transOrderNo=='' || sendData.productOrderNo=='' ) {
    alert('非法操作，无法获取订单号！');
    $('#popup-undertaker').modal('hide');
    return false;
  }
  $.ajax({
    url: common.API_HOST + '/order/kf/refundTicket',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert('退票成功！');
      $('#popup-undertaker').modal('hide');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});

function getChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：'+res.meta.msg);
    }
  });
}