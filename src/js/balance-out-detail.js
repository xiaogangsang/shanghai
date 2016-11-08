/*
	出货对账明细
  Ge Liu
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');

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

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

	common.init('balance-out-detail');

  // 初始化涉及的select控件
  // TP方
  $('#search_payTool').html(settlementCommon.optionsHTML(settlementCommon.payTool, true));
  
  $('#formSearch').parsley();
});


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

  $('.multi-check-all').prop('checked', false);

  if (_querying) {
    return false;
  }

  _querying = true;

  var sendData;

  if (!useCache) {

    // 输入 商品订单号 或者 二级商户订单号 或者 交易订单号 后, 无需输入日期
    var bizOrderNo = $('#search_bizOrderNo').val();
    var thdOrderNo = $('#search_thdOrderNo').val();
    var orderNo = $('#search_orderNo').val();
    var dateIsRequired = (bizOrderNo === '' && thdOrderNo === '' && orderNo === '');

    $('#search_dateType').prop('required', dateIsRequired);
    $('#search_startTime').prop('required', dateIsRequired);
    $('#search_endTime').prop('required', dateIsRequired);

    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }

    _pageSize = $('#search_pageSize').val() || 10;

    sendData = {
      dateType: dateIsRequired ? $('#search_dateType').val() : '',
      startTime: dateIsRequired ? $('#search_startTime').val() : '',
      endTime: dateIsRequired ? $('#search_endTime').val() : '',
      merchantName: $('#search_merchantName').val(),
      merchantNo: $('#search_merchantNo').val(),
      shipmentStatus: $('#search_shipmentStatus').val(),
      bizType: $('#search_bizType').val(),
      partner: $('#search_partner').val(),
      acquiringReconciliationStatus: $('#search_acquiringReconciliationStatus').val(),
      reconciliationStatus: $('#search_reconciliationStatus').val(),
      reason: $('#search_reason').val(),
      discountType: $('#search_discountType').val(),
      discountName: $('#search_discountName').val(),
      bizOrderNo: $('#search_bizOrderNo').val(),
      thdOrderNo: $('#search_thdOrderNo').val(),
      checkStatus: $('#search_checkStatus').val(),
      payTool: $('#search_payTool').val(),
      orderNo: $('#search_orderNo').val(),
      pageSize: _pageSize,
    };

    searchCache = sendData;
  } else {
    sendData = searchCache;
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
    // var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": { "summary": { "count": "订单总数", "totalTicketCount": "出票张数", "totalTiketAmount": " 票价 ", "totalReturnFee":"退票手续费", "totalServiceAmount": "总服务费", "totalSubsidyAmountO2o": "补贴总金额", "totalO2oReceivableAmount": "应收总金额", "totalBankAmount": "实际收到总金额" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "积分", "bizType": "业务类型", "orderNo": "订单号", "countNum": "票数", "reconciliationDate": "对账日期", "thdSerialNo":"收单方订单号", "costCenter": "成本中心", "externalId": "支付流水", "o2oReceivableAmount": "应收金额", "subsidyType": "补贴方式", "chargeMerchant":"1", "subsidyAmountO2o": "补贴金额", "discountName": "活动/优惠方式名称", "bankAmount":"实收金额", "returnFee":"退票手续费", "payAmount": "支付金额", "serviceAmount": "服务费", "ticketAmount":"交易金额", "reconciliationStatus":"1", "createTime": "支付时间(交易)", "discountType": "优惠方式", "id": 1934, "payStatus": "1", "chargeMerchantNo": "商户号", "partner":"退款承债方", "reason":"1" } ] } } }');
    var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "操作成功"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "1"}, {"checkStatus" : "2"}]}}}');
    handleData(res);
  }

  return false;
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;
  var url = common.API_HOST + 'settlement/shipmentInfo/listSummaryDetail?' + settlementCommon.serializeParam(_selectedSummary);

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

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(item.acquiringReconciliationStatus);
      item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseOutReason(item.reason);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
      item.checkStatusNo = item.checkStatus;
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
      item.shipmentOrderType = settlementCommon.parseShipmentOrderType(item.shipmentOrderType);
      item.orderSource = settlementCommon.parseOrderSource(item.orderSource);
      item.subsidyTypeTrd = settlementCommon.parseSubsidyType(item.subsidyTypeTrd);
    });

    if (!_queryingFromSelectedSummary) {
      useCache = true;
    }

    setTableData(record);

    // 从汇总页点击查看选中明细, 是没有summary返回的
    if (res.data.summary) {
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

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再导出!');
    return false;
  }

  if (_queryingFromSelectedSummary) {
    var param = {'shipmentInfoFormCollection' : _selectedSummary.shipmentInfoFormCollection};

    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/exportSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    // 参数不能带有页码信息...
    var searchCacheWithoutPagination = $.extend({}, searchCache);
    delete searchCacheWithoutPagination.pageIndex;
    delete searchCacheWithoutPagination.pageSize;

    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/infoListExport', 
      type: 'GET',
      dataType: 'json',
      data: searchCacheWithoutPagination,
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

// 对账完成提交
$('.complete-commit').click(function(e) {

  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再进行此操作!');
    return false;
  }

  var confirmMessage = confirm("确定要提交吗？");
  if (confirmMessage == true) {
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
  } 
});

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  var id = $(this).closest('tr').data('id');
  var checkStatus = $(this).data('checkstatus');

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/onlyShipmentInfo',
    type: 'GET',
    data: {id: id},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert(res.meta.msg);
      return false;
    }
    var data = res.data;
    data.detail = data.onlyShipmentInfo;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(detail.acquiringReconciliationStatus);
    detail.subsidyType = settlementCommon.parseSubsidyType(detail.subsidyType);
    detail.partner = settlementCommon.parsePartner(detail.partner);
    detail.subsidyTypeTrd = settlementCommon.parseSubsidyType(detail.subsidyTypeTrd);

    var operate = data.operate;

    operate.forEach(function(obj) {
      // obj.subsidyType = settlementCommon.parseSubsidyType(obj.subsidyType);
      // obj.partner = settlementCommon.parsePartner(obj.partner);
      obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
      obj.shipmentStatus = settlementCommon.parseShipmentStatus(obj.shipmentStatus);
      obj.reason = settlementCommon.parseOutReason(obj.reason);
    });

    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    // $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    // $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#subsidyTypeTrd option[value="' + detail.subsidyTypeTrd + '"]').prop('selected', true);
    $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);

    if (checkStatus == 2 || checkStatus == 3 || detail.reconciliationStatus == 4) { // 待审核/审核完成不能再修改, 出货对账状态为确认的也不能再修改
      $('.detail-area').addClass('read-only');
      $('.detail-area :input').prop('readonly', true);
      // 隐藏提交按钮
      $('.edit-submit').hide();
    } else {
      $('#reconciliationStatus option[value=4]').remove();      // 不能在明细的修改里将对账状态设为"确认"
    }
    
    $('#popup-detail form').parsley().validate();
  });
});

// 修改提交
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('出货对账状态不能为 ＂未对账＂！');
    return false;
  }

  if (!$('#popup-detail form').parsley().isValid()) {
    return false;
  }

  var shipmentDate = $('#shipmentDate').val();

  if (!settlementCommon.isValidTime(shipmentDate)) {
    alert('支付时间内容有错误, 请重新修改');
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    oldVersion: $submitButton.data('version'),
    shipmentDate: shipmentDate,
    merchantName: $('#merchantName').val(),
    merchantId: $('#merchantNo').val(),
    settleAmount: $('#settleAmount').val(),
    subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    subsidyType: $('#subsidyType').val(),
    acceptanceAppropriation: $('#acceptanceAppropriation').val(),
    // returnFee: $('#returnFee').val(),
    // partner: $('#returnFee').val(),

    // 支付活动补贴金额(元)
    subsidyAmountTrd: $('#subsidyAmountTrd').val(),
    // 支付活动补贴付款方式
    subsidyTypeTrd: $('#subsidyTypeTrd').val(),


    finalSettleAmount: $('#finalSettleAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    shipmentStatus: $('#shipmentStatus').val(),
    reason: $('#reconciliationStatus').val() == 2 ? $('#reason').val() : '',// 对账不一致才有原因
    remarks: $('#remarks').val()
  };
  
  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/updateOnlyShipmentInfo',
    data: param,
  }).done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

// 补订单记录
$('.btn-complement').click(function(e) {
  e.preventDefault();
  $('#popup-balance-out-record').modal('show');
});

/************************************************* 批量操作 ***************************************************/
$('.multi-check-all').change(function(e) {
  e.preventDefault();
  var isChecked = $(this).is(':checked');

  if (isChecked) {
    $('#dataTable tbody :checkbox:not(:checked)').prop('checked', true);
  } else {
    $('#dataTable tbody :checkbox:checked').prop('checked', false);
  }
});


$('body').on('change', 'tr > td :checkbox', function(e) {
  e.preventDefault();

  var isChecked = $(this).is(':checked');

  if (!isChecked) {
    $('.multi-check-all').prop('checked', false);
  }
});

// 批量修改对账状态
$('body').on('click', '.btn-confirm-status-update', function(e) {

  e.preventDefault();

  var ids = selectedIds();

  if (ids.length === 0) {
    alert('请至少选择一条记录!');
    return false;
  }

  var param = {idArr: ids, operateType: '2', reconciliationStatus: $('#targetStatus').val()};

  $.ajax({
    url: common.API_HOST + 'settlement/batchUploadFileRecord/batchOperateStatusByIds',
    type: 'POST',
    traditional: true,
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('操作成功!');
      $('#popup-status-choose').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

$('body').on('click', '.batch-status-update', function(e) {
  e.preventDefault();

  var ids = selectedIds();

  if (ids.length === 0) {
    alert('请至少选择一条记录!');
    return false;
  }

  $('#targetStatus option:selected').prop('selected', false);
  $('#popup-status-choose').modal('show');
});

$('body').on('click', '.btn-status-update-cancel', function(e) {
  e.preventDefault();
  $('#popup-status-choose').modal('hide');
});

function selectedIds() {
  var ids = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var id = $(this).closest('tr').data('id');
    ids.push(id);
  });

  return ids;
}

/****************** 补订单 *******************/

$(document).on('blur', '#record_merhcantNo', function(e) {
  e.preventDefault();

  var merchantNo = $('#record_merhcantNo').val().trim();
  if (!merchantNo) return false;
  $.ajax({
    url: common.API_HOST + "settlement/merchantinfo/query",
    type: 'GET',
    data: {merchantId: merchantNo}
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      var merchantName = res.data.merchantName;
      if (merchantName) {
        $('#record_merchantName').val(merchantName);
      }
    }
  })  
});

$(document).on('submit', '#formBalanceOutRecord', function(e) {
  e.preventDefault();

  var merchantName = $('#record_merchantName').val();
  if (!merchantName) {
    alert("请输入正确的二级商户号，系统会根据商户号自动填充二级商户名，缺少二级商户名无法录入");
    return false;
  }
  
  if (!$('#formBalanceOutRecord').parsley().isValid()) {
    return false;
  }

  var param = {
    shipmentOrderType: $('#record_shipmentOrderType').val(),
    payTool: $('#record_payTool').val(),
    shipmentDate: $('#record_shipmentDate').val(),
    movieName: $('#record_movieName').val(),
    cinemaName: $('#record_cinemaName').val(),
    record_countNum: $('#record_countNum').val(),
    merchantName: $('#record_merchantName').val(),
    merhcantNo: $('#record_merhcantNo').val(),
    orderNo: $('#record_orderNo').val(),
    thdOrderNo: $('#record_thdOrderNo').val(),
    payAmount: $('#record_payAmount').val(),
    receivablePoint: $('#record_receivablePoint').val(),
    settleAmount: $('#record_settleAmount').val(),
    subsidyType: $('#record_subsidyType').val(),
    subsidyAmountO2o: $('#record_subsidyAmountO2o').val(),
    subsidyTypeTrd: $('#record_subsidyTypeTrd').val(),
    subsidyAmountTrd: $('#record_subsidyAmountTrd').val(),
    returnFee: $('#record_returnFee').val(),
    acceptanceAppropriation: $('#record_acceptanceAppropriation').val(),
    finalSettlementAmount: $('#record_finalSettlementAmount').val(),
    partner: $('#record_partner').val(),
    discountType: $('#record_discountType').val(),
    discountId: $('#record_discountId').val(),
    discountName: $('#record_discountName').val(),
    costCenter: $('#record_costCenter').val(),
    signNum: $('#record_signNum').val(),
    costCenterTrd: $('#record_costCenterTrd').val(),
    shipmentStatus: $('#record_shipmentStatus').val()
  }

  $.ajax({
    url: common.API_HOST + "settlement/shipmentInfo/insertOnlyShipmentInfo",
    type: 'GET',
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert("录入成功，请至列表查看");
      $("#formBalanceOutRecord button.close").trigger('click');
      $("#formBalanceOutRecord :input").val("");
    } else {
      alert("录入失败，请检查数据后重试");
    }
  })  
});

