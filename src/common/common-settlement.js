/**
	清算
	1. 状态码的转换全部统一放在这个文件里负责
	2. 一些工具函数也放在了这里
	GeLiu created at 2016-07-27 17:51:15
 */


var settlementCommon = module.exports = {};

// 收单商户
settlementCommon.merchant = {'1' : '卡中心', '2' : '总行'};

settlementCommon.parseMerchant = function(status) {
	return this.merchant[status];
}


// 支付流水状态
settlementCommon.payStatus = 
  {'1' : '待支付', '2' : '支付成功', '3' : '支付失败', '4' : '退款中', '5' : '退款成功', '6' : '退款失败'};

settlementCommon.parsePayStatus = function(status) {
  return this.payStatus[status];
}


// 对账状态(收单和出货编码一样)
settlementCommon.reconciliationStatus = {'1' : '未对账', '2' : '对账不一致', '3' : '对账成功', '4' : '确认'};

settlementCommon.parseReconciliationStatus = function(status) {
  return this.reconciliationStatus[status];
}


// 对账失败原因
settlementCommon.reason = {'1' : '我方缺失', '2' : '对方缺失', '3' : '状态错误', '4' : '金额不符'};

settlementCommon.parseReason = function(status) {
  return this.reason[status];
}


// 支付渠道
settlementCommon.payTool = {'1' : '掌上生活', '2' : '手机银行'};

settlementCommon.parsePayTool = function(status) {
  return this.payTool[status];
}


// 业务类别
settlementCommon.bizType = {'1' : '影票', '2' : '手续费'};

settlementCommon.parseBizType = function(status) {
  return this.bizType[status];
}


// 补贴付款方式
settlementCommon.subsidyType = {'1' : '预付', '2' : '后付'};

settlementCommon.parseSubsidyType = function(status) {
  return this.subsidyType[status];
}


// 优惠方式
settlementCommon.discountType = {'1' : '活动', '2' : '优惠券'};

settlementCommon.parseDiscountType = function(status) {
  return this.discountType[status];
}


// 承债方
settlementCommon.partner = {'1' : 'O2O', '2' : 'TP方', '3' : '渠道方'};

settlementCommon.parsePartner = function(status) {
	return this.partner[status];
}


// 审核状态
settlementCommon.checkStatus = {'1' : '未修改', '2' : '待审核', '3' : '审核完成', '4' : '驳回'};

settlementCommon.parseCheckStatus = function(status) {
  return this.checkStatus[status];
}


// 出货状态
settlementCommon.shipmentStatus = 
  {'1' : '未出货(初始化状态)', '2' : '出货成功', '3' : '出货失败', '4' : '出货中', '5' : '待定', '6' : '待定', '7' : '退货成功', '8' : '退货失败'};

 settlementCommon.parseShipmentStatus = function(status) {
  return this.shipmentStatus[status];
 }


// 拨款状态
settlementCommon.moneyOutStatus = 
  {'1' : '待拨款', '2' : '首次拨款成功', '3' : '暂停拨款', '4' : '银行退票', '5' : '待重拨', '6' : '生成拨款文件失败', '7' : '重拨成功'};

settlementCommon.parseMoneyOutStatus = function(status) {
	return this.moneyOutStatus[status];
}


// 支付渠道
settlementCommon.channel = {'1' : '掌上生活', '2' : '手机银行'};

settlementCommon.parseChannel = function(status) {
	return this.channel[status];
}


// 拨款操作
settlementCommon.operation = {'1' : '银行退票', '2' : '重拨'};

settlementCommon.parseOperation = function(status) {
	return this.operation[status];
}

/****************************************** Utilities Method **********************************************/
// $.ajax 默认的对array(对象数组)的序列化不符合服务端需求, 我们自定义array的序列化
// Caution: only array is concerned in this function
settlementCommon.serializeParam = function(param) {

  var queryString = '';

  for (var key in param) {
    var value = param[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        var obj = value[i];

        for (var innerKey in obj) {
          queryString += key + '[' + i + '].' + innerKey + '=' + encodeURIComponent(obj[innerKey]) + '&';
        }
      }
    } else {
      queryString += key + '=' + encodeURIComponent(value) + '&';
    }
  }

  queryString = queryString.slice(0, queryString.length - 1);

  return queryString;
}

// 下面是对字符串数组的自定义序列化
settlementCommon.toString = function(array) {
	var str = '';

  array.forEach(function(ele, index) {
    str += ele + (index === array.length - 1 ? '' : ',');
  });

  return str;
}

// 对返回数据错误的统一处理
settlementCommon.prehandleData = function(res) {

  // 接口错误, 弹alert
  // 内容错误(语义错误), 错误message显示在table里
  if (!!~~res.meta.result) {
    if (res.data == null || res.data.detail == null || res.data.detail.count < 1) {
      // var errorMsg = res.meta.msg;
      var errorMsg = '无满足条件记录';
      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#pager').html('');
    } else {
      return true;
    }
  } else {
    alert(res.meta.msg);
    $('#dataTable tbody').html('');
    $('#summaryTable tbody').html('');
    $('#pager').html('');
  }
  return false;
}



