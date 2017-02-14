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
var _dateType = null;

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
  settlementCommon.datetimepickerRegister($('#sync_startTime'), $('#sync_endTime'));
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

    sendData = getParameters();
    if (sendData === null) {
      return false;
    }

    searchCache = sendData;
  } else {
    sendData = searchCache;
  }

  sendData.pageIndex = _pageIndex;

  if (_dateType === 9) {
    sendData.dateType = 9;
    _dateType = null;
  }

  $('#hud-overlay').show();

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
    var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "操作成功"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "1"}, {"checkStatus" : "2"}]}}}');
    handleData(res);
  }

  return false;
});

function getParameters() {
  // 输入 商品订单号 或者 二级商户订单号 或者 交易订单号 后, 无需输入日期
  var bizOrderNo = $('#search_bizOrderNo').val();
  var thdOrderNo = $('#search_thdOrderNo').val();
  var orderNo = $('#search_orderNo').val();
  var dateIsRequired = (bizOrderNo === '' && thdOrderNo === '' && orderNo === '');

  $('#search_dateType').prop('required', dateIsRequired);
  $('#search_startTime').prop('required', dateIsRequired);
  $('#search_endTime').prop('required', dateIsRequired);

  if (!$('#formSearch').parsley().isValid()) {
    return null;
  }

  _pageSize = $('#search_pageSize').val() || 10;

  var param = {
    dateType: dateIsRequired ? $('#search_dateType').val() : '',
    startTime: dateIsRequired ? $('#search_startTime').val() : '',
    endTime: dateIsRequired ? $('#search_endTime').val() : '',
    merchantName: $('#search_merchantName').val(),
    merchantNo: $('#search_merchantNo').val(),
    shipmentStatus: $('#search_shipmentStatus').val(),
    partner: $('#search_partner').val(),
    reconciliationStatus: $('#search_reconciliationStatus').val(),
    discountType: $('#search_discountType').val(),
    discountName: $('#search_discountName').val(),
    bizOrderNo: $('#search_bizOrderNo').val(),
    thdOrderNo: $('#search_thdOrderNo').val(),
    checkStatus: $('#search_checkStatus').val(),
    payTool: $('#search_payTool').val(),
    orderNo: $('#search_orderNo').val(),
    pageSize: _pageSize,
    orderSource: $('#search_orderSource').val(),
    shipmentOrderType: $('#search_shipmentOrderType').val(),
    settlementPlan: $('#search_settlementPlan').val(),
    appStatus: $('#search_appStatus').val(),
    batchNo: $('#search_batchNo').val(),
    waitBatchNo: $('#search_waitBatchNo').val(),
    cityName: $('#search_cityName').val(),
  };

  return param;
}

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
  $('#hud-overlay').hide();

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
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

    if (res.data.detail.exceptionCount) {
      $('#exceptionAlert').show();
      $('#exceptionCount').html(res.data.detail.exceptionCount);
    }
    if (res.data.detail.nullSettleDateCount) {
      $('#nullSettleDateAlert').show();
      $('#nullSettleDateCount').html(res.data.detail.nullSettleDateCount);
    }
  } else {
    $('#exceptionAlert').hide();
    $('#nullSettleDateAlert').hide();
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
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);
    // detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    // detail.subsidyType = settlementCommon.parseSubsidyType(detail.subsidyType);
    detail.subsidyType = detail.subsidyType;
    detail.partner = settlementCommon.parsePartner(detail.partner);
    // detail.subsidyTypeTrd = settlementCommon.parseSubsidyType(detail.subsidyTypeTrd);
    detail.subsidyTypeTrd = detail.subsidyTypeTrd;

    var operate = data.operate;

    operate.forEach(function(obj) {
      // obj.subsidyType = settlementCommon.parseSubsidyType(obj.subsidyType);
      // obj.partner = settlementCommon.parsePartner(obj.partner);
      obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
      obj.shipmentStatus = settlementCommon.parseShipmentStatus(obj.shipmentStatus);
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
    $('#settlementPlan option[value="' + detail.settlementPlan + '"]').prop('selected', true);
    $('#appStatus option[value="' + detail.appStatus + '"]').prop('selected', true);
    $('#discountType option[value="' + detail.discountType + '"]').prop('selected', true);

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
    returnFee: $('#returnFee').val(),
    partner: $('#returnFee').val(),

    // 支付活动补贴金额(元)
    subsidyAmountTrd: $('#subsidyAmountTrd').val(),
    // 支付活动补贴付款方式
    subsidyTypeTrd: $('#subsidyTypeTrd').val(),


    finalSettleAmount: $('#finalSettleAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    shipmentStatus: $('#shipmentStatus').val(),
    reason: $('#reconciliationStatus').val() == 2 ? $('#reason').val() : '',// 对账不一致才有原因
    remarks: $('#remarks').val(),

    settleDate: $('#settleDate').val(),
    settlementPlan: $('#settlementPlan').val(),
    appStatus: $('#appStatus').val(),
    batchNo: $('#batchNo').val(),
    waitBatchNo: $('#waitBatchNo').val(),
    cityName: $('#cityName').val(),

    discountType: $('#discountType').val(),
    discountName: $('#discountName').val(),
    costCenter: $('#costCenter').val(),
    signNum: $('#signNum').val(),
    discountId: $('#discountId').val(),
    discountIdTrd: $('#discountIdTrd').val(),
    discountNameTrd: $('#discountNameTrd').val(),
    costCenterTrd: $('#costCenterTrd').val(),
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

$('#exceptionAlert a').click(function(e) {
  e.preventDefault();
  window.location = 'balance-out-error.html?startTime=' + $('#search_startTime').val() + '&endTime=' + $('#search_endTime').val();
});

$('#nullSettleDateAlert a').click(function(e) {
  e.preventDefault();
  _dateType = 9;
  $('#formSearch button[type=submit]').trigger('click');
});

$('.btn-sync').click(function(e) {
  e.preventDefault();
  $('#popup-sync-settle').modal('show');
});

$('#formSync').submit(function(e) {
  e.preventDefault();

  var param = {
    startTime: $('#sync_startTime').val(),
    endTime: $('#sync_endTime').val(),
  };

  $('#hud-overlay').show();

  //同步接口，后台说一次批量操作至少15分钟，所以设置超时时间15分钟......
  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/synchronousSettleDate',
    timeout: (15*60*1000),
    type: 'GET',
    dataType: 'json',
    data: param,
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      $('#popup-sync-settle').modal('hide');
      $('#formSearch').trigger('submit');
    }
    alert(res.meta.msg);
  })
  .always(function() {
    $('#hud-overlay').hide();
  });
});

$('#formBatch').submit(function(e) {
  e.preventDefault();

  var batchSet = $('#batch_settingFunc').val();
  var parameter = $('#batch_settingParam').val();
  var range = $('#batch_settingRange').val();

  if (batchSet.valueOf() > 3 && parameter.length === 0) {
    alert('批量设置批次号，请在参数输入框中输入批次号');
    return false;
  }

  if (!confirm("是否确定进行批量设置？")) {
    return false;
  }

  // 按条件批量设置
  if (range === '1') {
    var param = getParameters();
    if (param === null) {
      alert('请填写查询条件的必填项');
      return false;
    }
    param.batchSet = batchSet;
    param.parameter = parameter;

    $('#hud-overlay').show();
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/batchUpdateShipmentInfo',
      type: 'GET',
      dataType: 'json',
      data: param,
    })
    .done(function(res) {
      alert('批量设置:' + res.meta.msg);
      $('#formSearch').trigger('submit');
    })
    .always(function() {
      $('#hud-overlay').hide();
    });
  } else {
    var selectIds = selectedIds();
    if (selectIds.length === 0) {
      alert('请至少选择一条记录');
      return false;
    }
    var param = {
      batchSet: batchSet,
      parameter: parameter,
      ids: selectIds,
    };
    $('#hud-overlay').show();
    $.ajax({
      url: common.API_HOST + 'settlement/shipmentInfo/batchUpdateShipmentInfo?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      alert('批量设置:' + res.meta.msg);
      $('#formSearch').trigger('submit');
    })
    .always(function() {
      $('#hud-overlay').hide();
    });
  }
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
