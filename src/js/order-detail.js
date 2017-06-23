'use strict;'

var common = require('common');
var _productOrderStatus = [
{ id: 0, name: '未出票' },
{ id: 1, name: '出票中' },
{ id: 2, name: '已出票' },
{ id: 3, name: '出票失败' },
{ id: 4, name: '已退票' },
];
var _productPayStatus = [
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
var _channels = {};
var _sources = {};
var _submitting = false;

$(function () {
  common.init('order');
  if (common.verifyPermission(119) == false) {
    alert('对不起，您没有权限！');
    window.location.href = 'login.html?logout';
  }

  getChannel();
  getSource();

  var urlParam = common.getUrlParam();
  if (urlParam.orderId != undefined && urlParam.orderId != '') {
    $.ajax({
      url: common.API_HOST + 'order/op/orderDetail',
      type: 'POST',
      dataType: 'json',
      data: { transOrderNo: urlParam.orderId },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        $('h2').append('：' + urlParam.orderId);
        $('#transOrderNo').val(res.data.payOrder.transOrderNo);
        $('#productOrderNo').val(res.data.bizOrder.productOrderNo);
        $('#channelId').val(res.data.bizOrder.channelId);
        $('#couponNo').val(res.data.bizOrder.couponCode);

        _(_channels).forEach(function (channel) {
          if (channel.channelId == res.data.bizOrder.channelId) {
            res.data.bizOrder.channelName = channel.channelName;
          }
        });

        _(_sources).forEach(function (source) {
          if (source.sourceId == res.data.bizOrder.thirdParty) {
            res.data.bizOrder.thirdPartyName = source.sourceName;
          }
        });

        _(_transOrderStatus).forEach(function (status) {
          if (status.id == res.data.payOrder.transOrderStatus) {
            res.data.payOrder.transOrderStatus = status.name;
          }
        });

        _(_productOrderStatus).forEach(function (status) {
          if (status.id == res.data.bizOrder.productOrderStatus) {
            res.data.bizOrder.productOrderStatus = status.name;
          }
        });

        _(_productPayStatus).forEach(function (status) {
          if (status.id == res.data.bizOrder.status) {
            res.data.bizOrder.status = status.name;
          }
        });

        res.data.bizOrder.canRefund = false;
        if (res.data.bizOrder.status == '支付成功' || res.data.bizOrder.status == '退款失败') {
          res.data.bizOrder.canRefund = true;
        }

        res.data.bizOrder.canReturnTicket = false;
        if (res.data.bizOrder.productOrderStatus == '已出票'
          && res.data.bizOrder.status == '支付成功'
          && res.data.bizOrder.wandaTicketId != null
          && res.data.bizOrder.supportRefund == true) {
          res.data.bizOrder.canReturnTicket = true;
        }

        // res.data.bizOrder.canReturnCoupon = false;
        // if (res.data.bizOrder.productOrderStatus != '已出票'
        //   && res.data.bizOrder.status != '待支付'
        //   && res.data.bizOrder.couponId != null) {
        //   res.data.bizOrder.canReturnCoupon = true;
        // }

        res.data.bizOrder.canSendSMS = false;
        if (res.data.bizOrder.smsContent != null && res.data.bizOrder.smsContent != '') {
          res.data.bizOrder.canSendSMS = true;
        }

        // if (res.data.bizOrder.ticketInfo != null) {
        res.data.bizOrder.frontTicket = res.data.bizOrder.ticketInfo == null || res.data.bizOrder.ticketInfo.frontInfo == null ? null : res.data.bizOrder.ticketInfo.frontInfo.codeInfoList;

        //   res.data.bizOrder.haveFrontTicket = true;
        // } else {
        //   res.data.bizOrder.haveFrontTicket = false;
        // }

        // if (res.data.bizOrder.ticketInfo != null) {
        res.data.bizOrder.machineTicket = res.data.bizOrder.ticketInfo == null || res.data.bizOrder.ticketInfo.machineInfo == null ? null : res.data.bizOrder.ticketInfo.machineInfo.codeInfoList;

        //   res.data.bizOrder.haveMachineTicket = true;
        // } else {
        //   res.data.bizOrder.haveMachineTicket = false;
        // }

        res.data.payOrder.transDetailList = res.data.transDetailList;
        setPayOrder(res.data.payOrder);
        res.data.bizOrder.actualPayAmount = res.data.payOrder.actualPayAmount;
        setBizOrder(res.data.bizOrder);
      } else {
        alert('接口错误：' + res.meta.msg);
        window.location.href = 'order.html';
      }
    });
  } else {
    window.location.href = 'order.html';
  }
});

function setPayOrder(pay) {
  var template = $('#pay-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, pay);
  $('#payOrder').append(html);
}

function setBizOrder(biz) {
  var template = $('#biz-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, biz);
  $('#bizOrder').append(html);
  $('[data-toggle="tooltip"]').tooltip();

  common.showAssignedButton();
}

$(document).on('click', '#btn-sendsms', function (event) {
  event.preventDefault();
  if (!window.confirm('确定要发送短信吗？')) {
    return false;
  }

  var transOrderNo = $('#transOrderNo').val();
  var productOrderNo = $('#productOrderNo').val();
  if (transOrderNo == '' || productOrderNo == '') {
    alert('非法操作，无法获取订单号！');
    return false;
  }

  $.ajax({
    url: common.API_HOST + 'order/op/sendMessage',
    type: 'POST',
    dataType: 'json',
    data: {
      transOrderNo: transOrderNo,
      productOrderNo: productOrderNo,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('短信发送成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-refund', function (event) {
  event.preventDefault();
  $('#popup-refund').modal('show');
  $('#popup-refund form').parsley();

  $('input[name=refundAmountUndertaker]').prop('checked', false);
  $('input[name=returnCouponSelect]').prop('checked', false);
  $('#popup-refund #reason')[0].value = '';

  $('#dropdown-reason').on('change click', function(event) {
    event.preventDefault();
    var reason = $(this).val();
    if (reason != '') {
      $('#popup-refund #reason')[0].value = reason;
    }
  });
});

$(document).on('submit', '#popup-refund form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  if (!window.confirm('确定退款吗？')) {
    return false;
  }

  $('#popup-refund button[type=submit]').text('处理中...').prop('disabled', true);
  $('#popup-refund .close').hide();
  _submitting = true;

  var sendData = {
    transOrderNo: $('#transOrderNo').val(),
    productOrderNo: $('#productOrderNo').val(),
    channelId: $('#channelId').val(),
    refundAmountUndertaker: $('input[name=refundAmountUndertaker]:checked').val(),
    refundReason: $.trim($('#popup-refund textarea').val()),
    refundCoupon: $('input[name=returnCouponSelect]:checked').val(),
  };
  if (sendData.transOrderNo == '' || sendData.productOrderNo == '') {
    alert('非法操作，无法获取订单号！');
    $('#popup-refund').modal('hide');
    return false;
  }

  $.ajax({
    url: common.API_HOST + 'order/op/refundMoney',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    $('#popup-refund button[type=submit]').text('提交').prop('disabled', false);
    $('#popup-refund .close').show();
    if (!!~~res.meta.result) {
      alert('退款成功！');
      $('#popup-refund').modal('hide');
      document.location.reload(true);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '#btn-returnCoupon', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  if (!window.confirm('确定退优惠券吗？')) {
    return false;
  }

  _submitting = true;

  $.ajax({
    url: common.API_HOST + 'order/op/refundCoupon',
    type: 'POST',
    dataType: 'json',
    data: {
      productOrderNo: $('#productOrderNo').val(),
      couponNo: $('#couponNo').val(),
    },
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('退优惠券成功！');
      document.location.reload(true);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-returnTicket', function (event) {
  event.preventDefault();
  $('#popup-undertaker').modal('show');
  $('#popup-undertaker form').parsley();
  $('#popup-undertaker #reason')[0].value = '';
});

$(document).on('submit', '#popup-undertaker form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  if (!window.confirm('确定退票吗？')) {
    return false;
  }

  _submitting = true;
  $('#popup-undertaker button[type=submit]').prop('disabled', true).text('处理中...');
  $('#popup-undertaker .close').hide();

  var sendData = {
    transOrderNo: $('#transOrderNo').val(),
    productOrderNo: $('#productOrderNo').val(),
    // chargeUndertaker: $('input[name=chargeUndertaker]:checked').val(),
    refundReason: $.trim($('#popup-undertaker textarea').val()),
  };
  if (sendData.transOrderNo == '' || sendData.productOrderNo == '') {
    alert('非法操作，无法获取订单号！');
    $('#popup-undertaker').modal('hide');
    return false;
  }

  $.ajax({
    url: common.API_HOST + '/order/op/refundTicket',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    $('#popup-undertaker button[type=submit]').prop('disabled', false).text('提交');
    $('#popup-undertaker .close').show();
    if (!!~~res.meta.result) {
      alert('退票成功！');
      $('#popup-order-return-ticket').modal('hide');
      document.location.reload(true);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

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

function getSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _sources = res.data;
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
