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
  common.init('order-cs');
  getChannel();
  getSource();

  var urlParam = common.getUrlParam();
  if (urlParam.orderId != undefined && urlParam.orderId != '') {
    $.ajax({
      url: common.API_HOST + 'order/kf/orderDetail',
      type: 'POST',
      dataType: 'json',
      data: { transOrderNo: urlParam.orderId },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        $('h2').append('：' + urlParam.orderId);
        $('#transOrderNo').val(res.data.payOrder.transOrderNo);
        $('#productOrderNo').val(res.data.bizOrder.productOrderNo);
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

        res.data.bizOrder.canReturnTicket = false;
        if (res.data.bizOrder.productOrderStatus == '已出票'
          && res.data.bizOrder.status == '支付成功'
          && res.data.bizOrder.wandaTicketId != null) {
          res.data.bizOrder.canReturnTicket = true;
        }

        res.data.bizOrder.canReturnCoupon = false;
        if (res.data.bizOrder.productOrderStatus != '已出票'
          && res.data.bizOrder.couponId != null) {
          res.data.bizOrder.canReturnCoupon = true;
        }

        res.data.bizOrder.canSendSMS = false;
        if (res.data.bizOrder.smsContent != null && res.data.bizOrder.smsContent != '') {
          res.data.bizOrder.canSendSMS = true;
        }

        // if (res.data.bizOrder.ticketInfo != null) {
        res.data.bizOrder.frontTicket = res.data.bizOrder.ticketInfo==null ? null : res.data.bizOrder.ticketInfo.frontInfo.codeInfoList;

        //   res.data.bizOrder.haveFrontTicket = true;
        // } else {
        //   res.data.bizOrder.haveFrontTicket = false;
        // }

        // if (res.data.bizOrder.ticketInfo != null) {
        res.data.bizOrder.machineTicket = res.data.bizOrder.ticketInfo==null ? null : res.data.bizOrder.ticketInfo.machineInfo.codeInfoList;

        //   res.data.bizOrder.haveMachineTicket = true;
        // } else {
        //   res.data.bizOrder.haveMachineTicket = false;
        // }

        res.data.payOrder.transDetailList = res.data.transDetailList;
        setPayOrder(res.data.payOrder);
        setBizOrder(res.data.bizOrder);
      } else {
        alert('接口错误：' + res.meta.msg);
        window.location.href = 'order-cs.html';
      }
    });
  } else {
    window.location.href = 'order-cs.html';
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
    url: common.API_HOST + 'order/kf/sendMessage',
    type: 'POST',
    dataType: 'json',
    data: {
      transOrderNo: transOrderNo,
      productOrderNo: productOrderNo,
    },
  })
  .done(function (res) {
    // console.log(res);
    if (!!~~res.meta.result) {
      alert('短信发送成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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
    url: common.API_HOST + 'order/kf/refundCoupon',
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
      $('#popup-order-return-ticket').modal('hide');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-returnTicket', function (event) {
  event.preventDefault();
  $('#popup-undertaker').modal('show');
  $('#popup-undertaker form').parsley();
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

  var sendData = {
    transOrderNo: $('#transOrderNo').val(),
    productOrderNo: $('#productOrderNo').val(),
    // chargeUndertaker: $('input[name=chargeUndertaker]:checked').val(),
    refundReason: $.trim($('#reason').val()),
  };
  if (sendData.transOrderNo == '' || sendData.productOrderNo == '') {
    alert('非法操作，无法获取订单号！');
    $('#popup-undertaker').modal('hide');
    return false;
  }

  $.ajax({
    url: common.API_HOST + '/order/kf/refundTicket',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    $('#popup-undertaker button[type=submit]').prop('disabled', false).text('提交');
    if (!!~~res.meta.result) {
      alert('退票成功！');
      $('#popup-undertaker').modal('hide');
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
