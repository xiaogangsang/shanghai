'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _querying = false;
var _records = {};

$(function () {
	common.init('balance-out-error');

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
			item.subsidytypeTrd = settlementCommon.parseSubsidyType(item.subsidytypeTrd);
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
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(detail.acquiringReconciliationStatus);
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