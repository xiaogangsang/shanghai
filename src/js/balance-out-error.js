'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _querying = false;
var _records = {};

$(function () {
	common.init('balance-out-error');
  pager.init($('#pager'));

	var urlParam = common.getUrlParam();
	if (urlParam['startTime'] && urlParam['endTime']) {
		$('#search_startTime').val(urlParam['startTime']);
		$('#search_endTime').val(urlParam['endTime']);
		$('#formSearch button[type=submit]').trigger('click');
	}
});

$('#formSearch').on('click', 'button[type=submit]', function(e) {
	e.preventDefault();
	pager.pageIndex = 1;
	_useCache = false;
	$('#formSearch').trigger('submit');
});

$('#formSearch').submit(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

  if (!(($('#search_startTime').val() &&  $('#search_endTime').val()) || $('#search_orderNo').val())) {
    settlementCommon.warning('请选择退货时间或填写交易订单号');
    return false;
  }

	if (_querying) return false;
	_querying = true;

	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var param = {
		startTime: $('#search_startTime').val(),
		endTime: $('#search_endTime').val(),
		orderNo: $('#search_orderNo').val(),
		shipmentOrderType: $('#search_shipmentOrderType').val(),
		exception: $('#search_exception').val(),
		pageSize: pager.pageSize,
		pageIndex: pager.pageIndex,
	}

	if (_useCache) {
		param = _formCache;
		param.pageIndex = pager.pageIndex;
	} else {
		_formCache = param;
	}

	$.ajax({
		url: common.API_HOST + 'settlement/shipmentInfo/selectException',
		type: 'GET',
		dataType: 'json',
		data: param,
	})
	.done(function(res) {
		handleData(res);
	})
});

function handleData(res) {
	_querying = false;

	if (settlementCommon.prehandleData(res)) {
		useCache = true;
		var totalRecord = res.data.detail.count;
		var records = res.data.detail.records;
		_records = $.extend(true, {}, records);

		pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
		pager.setPager(totalRecord, pager.pageIndex, records.length, pager.pageTotal);

		_(records).forEach(function(item) {
			var today = new Date(item.shipmentDate);
			item.shipmentDate = common.getDate(today);
			item.orderSource = settlementCommon.parseOrderSource(item.orderSource);
			item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
			item.subsidyTypeTrd = settlementCommon.parseSubsidyType(item.subsidyTypeTrd);
			item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
			item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
			item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
			item.shipmentOrderType = settlementCommon.parseShipmentOrderType(item.shipmentOrderType);
		});

		var template = $('#table-template').html();
		Mustache.parse(template);
		var html = Mustache.render(template, {rows: records});
		$('#dataTable tbody').html(html);
	}
}

$('#btn-reset').click(function(e) {
	e.preventDefault();
	$('#formSearch :input').val('');
});

$('#btn-export').click(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	$('#hud-overlay').show();

	var param = {
		startTime: $('#search_startTime').val(),
		endTime: $('#search_endTime').val(),
		orderNo: $('#search_orderNo').val(),
		shipmentOrderType: $('#search_shipmentOrderType').val(),
		exception: $('#search_exception').val(),
	}

	$.ajax({
		url: common.API_HOST + 'settlement/shipmentInfo/exceptionExport',
		type: 'GET',
		dataType: 'json',
		data: param,
	})
	.done(function(res) {
		var fileUrl = null;
		if (!!~~res.meta.result && res.data) {
			fileUrl = res.data.fileUrl;
			if (fileUrl && fileUrl.length > 0) {
				settlementCommon.success('申请导出成功！');
			}
		} else {
			settlementCommon.warning('申请导出失败！');
		}
	})
	.always(function() {
		$('#hud-overlay').hide();
	});
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
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
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
    merchantNo: $('#merchantNo').val(),
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
    remarks: $('#remarks').val(),

    settleDate: $('#settleDate').val(),
    settlementPlan: $('#settlementPlan').val(),
    appStatus: $('#appStatus').val(),
    batchNo: $('#batchNo').val(),
    waitBatchNo: $('#waitBatchNo').val(),
    cityName: $('#cityName').val(),
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
