/*
	出货对账明细
  Ge Liu
 */

'use strict;'
var common = require('common');

var _channels = {};
var _cities = [];
var _choosed = [];
var _movies = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

// 如果当前查询是从汇总页的选中记录查询
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

var _DEBUG = false;

$(function() {

	common.init('balance-out-detail');

	$('#search_startTime').datetimepicker({
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
    $('#search_startTime').datetimepicker('setEndDate', FromEndDate);
  });
});

$('#formSearch').parsley();

// handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();

  _pageIndex = 1;
  useCache = false;
  _queryingFromSelectedSummary = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();

  if (!useCache) {
    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }
  }

  var sendData = {
  	dateType: $('#search_dateType').val(),
    beginTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    merchantName: $('#search_merchantName').val(),
    merchantNo: $('#search_merchantNo').val(),
    shipmentStatus: $('#search_shipmentStatus').val(),
    bizType: $('#search_bizType').val(),
    partner: $('#search_partner').val(),
    acquiringReconciliationStatus: $('#search_acquiringReconciliationStatus').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    reason: $('#search_reson').val(),
    discountType: $('#search_discountType').val(),
    discountName: $('#search_discountName').val(),
    bizOrderNo: $('#search_bizOrderNo').val(),
    thdOrderNo: $('#search_thdOrderNo').val(),
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

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/infoList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
    handleData(res);
  }

  return false;
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;
  var url = common.API_HOST + 'settlement/shipmentInfo/listSummaryDetail?' + serializeParam(_selectedSummary);

  if (!_DEBUG) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
    handleData(res);
  }
}

function handlePresetQuery() {

  var sessionParam = sessionStorage.param;
  if (sessionParam) {
    var passedParam = JSON.parse(sessionParam);

    if (passedParam) {
      // 从汇总页  查看选中明细
      if (passedParam.type == 1) {
        var parameters = passedParam.param;

        _pageIndex = 1;
        _selectedSummary = {'shipmentInfoFormCollection': parameters, 'pageSize': _pageSize};

        _queryingFromSelectedSummary = true;
        queryFromSelectedSummary();

      } else if (passedParam.type == 0) { // 从汇总页  查看所有明细
        var parameters = passedParam.param;

        $('#search_dateType').val(parameters.dateType);
        $('#search_startTime').val(parameters.startTime);
        $('#search_endTime').val(parameters.endTime);
        $('#search_merchantName').val(parameters.merchantName);
        $('#search_merchantNo').val(parameters.MerchantNo);
        $('#search_shipmentStatus').val(parameters.shipmentStatus);
        $('#search_bizType').val(parameters.bizType);

        _pageIndex = 1;
        useCache = false;
        $('#formSearch').trigger('submit');
      }
      sessionStorage.removeItem('param');
    }
  }
}

handlePresetQuery();

function handleData(res) {
	_querying = false;

	if (~res.meta.result) {
		if (res.data == null || res.data.detail.count < 1) {
      var errorMsg = res.meta.msg;
      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#pager').html('');
		} else {
			var totalRecord = res.data.detail.count;
      var record = res.data.detail.records;

      _pageTotal = Math.ceil(totalRecord / _pageSize);
      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

      _(record).forEach(function(item) {
        item.bizType = parseBizType(item.bizType);
        item.payStatus = parsePayStatus(item.payStatus);
        item.partner = parsePartner(item.partner);
        item.acquiringReconciliationStatus = parseReconciliationStatus(item.acquiringReconciliationStatus);
        item.subsidyType = parseSubsidyType(item.subsidyType);
        item.reconciliationStatus = parseReconciliationStatus(item.reconciliationStatus);
        item.reason = parseReason(item.reason);
        item.discountType = parseDiscountType(item.discountType);
        item.shipmentStatus = parseShipmentStatus(item.shipmentStatus);
      });

      if (!_queryingFromSelectedSummary) {
        useCache = true;
      }

      setTableData(record);

      setSummaryTableData(res.data.summary);
		}
	}
}

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setSummaryTableData(data) {
	var template = $('#summary-table-template').html();
	Mustache.parse(template);
	var html = Mustache.render(template, data);
	$('#summaryTable tbody').html(html);
}


function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

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

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }
  return false;
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#pageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }

  return false;
});

$('.btn-reset').click(function(e) {
 $('#formSearch :input:not(:button)').val('');
});

$('.btn-export-all').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'shipmentInfoFormCollection' : _selectedSummary.shipmentInfoFormCollection};

    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/exportSummaryDetail' + serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        window.location.href = res.data.filePath;
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/infoListExport', 
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        window.location.href = res.data.filePath;// liugeTODO: 统一一下
      }
    });
  }
});

$('.complete-commit').click(function(e) {

  e.preventDefault();

  if (_queryingFromSelectedSummary) {
    var param = {'shipmentInfoFormCollection' : _selectedSummary.shipmentInfoFormCollection};
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/listSummaryDetailUpdate',
      type: 'POST',
      dataType: 'json',
      data: param
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/updateInfoList',
      type: 'POST',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/onlyShipmentInfo',
      type: 'GET',
      data: {id: $(this).closest('tr').data('id')},
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert('查询数据失败!');
        return false;
      }
      var data = res.data;
      data.detail = data.onlyShipmentInfo;
      var detail = data.detail;
      detail.payTool = parsePayTool(detail.payTool);
      detail.payStatus = parsePayStatus(detail.payStatus);
      detail.bizType = parseBizType(detail.bizType);
      detail.chargeMerchant = parseMerchant(detail.chargeMerchant);
      detail.discountType = parseDiscountType(detail.discountType);
      detail.acquiringReconciliationStatus = parseReconciliationStatus(detail.acquiringReconciliationStatus);
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-detail .modal-body').html(html);

      $('#popup-detail').modal('show');

      $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
      $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
      $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
      $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
      $('#reason option[value="' + detail.reason + '"]').prop('selected', true);

    });
  } else {
    var data = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "operateRecords" : [ { "bizType" : 1, "orderNo" : "738289474424934400", "o2oReceivableAmount" : 12, "operateTime" : "2016-06-23 15:42:18", "operatorName" : "徐慧", "subsidyAmountO2o" : 4750, "discountName" : "买2减1", "ticketAmount" : 4750, "chargeMerchant" : 1, "serviceAmount" : 0, "partner" : "3", "reconciliationStatus" : 4, "returnFee" : 1, "discountType" : 1, "payStatus" : 4 }, { "bizType" : 1, "orderNo" : "738289474424934400", "o2oReceivableAmount" : 12, "operateTime" : "2016-06-23 11:50:51", "operatorName" : "李瑾", "subsidyAmountO2o" : 4750, "discountName" : "买2减1", "ticketAmount" : 4750, "chargeMerchant" : 1, "serviceAmount" : 0, "partner" : "3", "reconciliationStatus" : 4, "returnFee" : 1, "discountType" : 1, "payStatus" : 4 } ], "detail" : { "reason" : 1, "receivablePoint" : 0, "bizType" : 1, "reconciliationDate" : 1466733543000, "subsidyType" : 1, "bankAmount" : 1, "checkStatus" : 1, "discountName" : "买2减1", "ticketAmount" : 1, "payAmount" : 4700, "serviceAmount" : 0, "discountType" : 1, "id" : 2585, "thdSerialNo" : "1223", "orderNo" : "738284476651671552", "countNum" : 1, "costCenter" : "卡中心总部", "o2oReceivableAmount" : 4700, "externalId" : 857, "updateTime" : 1466738155000, "version" : 0, "subsidyAmountO2o" : 0, "chargeMerchant" : 1, "partner" : "1", "reconciliationStatus" : 4, "createTime" : 1464796800000, "returnFee" : 12, "chargeMerchantNo" : "738284476651671552", "payStatus" : 1, "chargeMerchantNo" : "308010700103175" } } }');
    data = data.data;
    var detail = data.detail;
    detail.payTool = parsePayTool(detail.payTool);
    detail.payStatus = parsePayStatus(detail.payStatus);
    detail.bizType = parseBizType(detail.bizType);
    detail.chargeMerchant = parseMerchant(detail.chargeMerchant);
    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');
  }
});

// 修改提交
$('body').on('click', '.edit-submit', function(e) {
  e.preventDefault();

  var param = {
    id: $(this).data('id'),
    oldVersion: $(this).data('version'),
    merchantName: $('#merchantName').val(),
    merchantId: $('#merchantNo').val(),
    settleAmount: $('#settleAmount').val(),
    subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    subsidyType: $('#subsidyType').val(),
    acceptanceAppropriation: $('#acceptanceAppropriation').val(),
    returnFee: $('#returnFee').val(),
    partner: $('#returnFee').val(),
    finalSettlementAmount: $('#finalSettlementAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    shipmentStatus: $('#shipmentStatus').val(),
    reason: $('#reason').val()
  };

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/updateOnlyShipmentInfo',
      data: param,
    }).done(function(res) {
      if (res.meta.result != 1) {
        // TODO: submit failed
      } else {
        alert('提交成功');
      }
    });
  }
});

/****************************************** Utilities Method **********************************************/

function parseMerchant(merchant) {
  var map = {'1' : '卡中心', '2' : '总行'};
  return map[merchant];
}

function parsePayStatus(payStatus) {
  var map = {'1' : '待支付', '2' : '支付成功', '3' : '支付失败', '4' : '退款中', '5' : '退款成功', '6' : '退款失败'};
  return map[payStatus];
}

function parseReconciliationStatus(status) {
  var map = {'1' : '未对账', '2' : '对账不一致', '3' : '对账成功', '4' : '确认'};
  return map[status];
}

function parseReason(reason) {
  var map = {'1' : '我方缺失', '2' : '对方缺失', '3' : '状态错误', '4' : '金额不符'};
  return map[reason];
}

function parsePayTool(payTool) {
  var map = {'1' : '掌上生活', '2' : '手机银行'};
  return map[payTool];
}

function parseBizType(bizType) {
  var map = {'1' : '影票', '2' : '手续费'};
  return map[bizType];
}

// not used
function parseSubsidyType(type) {
  var map = {'1' : '预付', '2' : '后付'};
  return map[type];
}

function parseDiscountType(type) {
  var map = {'1' : '活动', '2' : '优惠券'};

  return map[type];
}

function parsePartner(partner) {
  var map = {'1' : 'O2O', '2' : 'TP方', '3' : '渠道方'};
  return map[partner];
}

function parseShipmentStatus(status) {
  var map = {'1' : '未出货(初始化状态)', '2' : '出货成功', '3' : '出货失败', '4' : '出货中', '5' : '待定', '6' : '待定', '7' : '退货成功', '8' : '退货失败'};

  return map[status];
}


// Caution: only array is concerned in this function
function serializeParam(param) {

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



