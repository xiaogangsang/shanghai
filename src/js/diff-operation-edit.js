'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');

var _signList = {};
var _disposeList = {};
var _typeList = {};
var _departmentList = {};
var _appendData = {};

function renderOptions() {
	signHtml = settlementCommon.optionsHTML(_signList, false);
	$('#diff_processType').html(signHtml);
	disposeHtml = settlementCommon.optionsHTML(_disposeList, false);
	$('#diff_processStatus').html(disposeHtml);
	typeHtml = settlementCommon.optionsHTML(_typeList, false);
	$('#diff_differType').html(typeHtml);
	departmentHtml = settlementCommon.optionsHTML(_departmentList, false);
	$('#diff_departId').html(departmentHtml)
}

function renderTable(res) {
	// 相关收单明细
	var acquiringRecords = res.data.detail.acquiringRecords;
	_(acquiringRecords).forEach(function(item) {
		(item.settleDate) ? (item.settleDate = common.getDate(new Date(item.settleDate))) : null;
		item.payTool = settlementCommon.parsePayTool(item.payTool);
		item.acquiringOrderType = settlementCommon.parseAcquiringOrderType(item.acquiringOrderType);
		item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
		item.subsidyTypeTrd = settlementCommon.parseSubsidyType(item.subsidyTypeTrd);
		item.partner = settlementCommon.parsePartner(item.partner);
	});
	var template = $('#acquiring-table-template').html();
	Mustache.parse(template);
	var html = Mustache.render(template, {rows: acquiringRecords});
	$('#diff_acquiringRecords tbody').html(html);

	// 相关出货明细
	var shipmentRecords = res.data.detail.shipmentRecords;
	_(shipmentRecords).forEach(function(item) {
		(item.settleDate) ? (item.settleDate = common.getDate(new Date(item.settleDate))) : null;
		item.payTool = settlementCommon.parsePayTool(item.payTool);
		item.shipmentOrderType = settlementCommon.parseShipmentOrderType(item.shipmentOrderType);
		item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
		item.subsidyTypeTrd = settlementCommon.parseSubsidyType(item.subsidyTypeTrd);
		item.partner = settlementCommon.parsePartner(item.partner);
	});
	var template = $('#shipment-table-template').html();
	Mustache.parse(template);
	var html = Mustache.render(template, {rows: shipmentRecords});
	$('#diff_shipmentRecords tbody').html(html);

	// 相关差异列表
	var appendRecords = res.data.detail.appendRecords;
	_(appendRecords).forEach(function(item) {
		(item.settleDate) ? (item.settleDate = common.getDate(new Date(item.settleDate))) : null;
		item.differType = _typeList[item.differType];
		item.processType = _signList[item.processType];
		item.processStatus = _disposeList[item.processStatus];
		item.channelId = settlementCommon.parseChannel(item.channelId);
		item.advanceType = settlementCommon.parseSubsidyType(item.advanceType);
		item.advanceTypeTrd = settlementCommon.parseSubsidyType(item.advanceTypeTrd);
	});
	var template = $('#append-table-template').html();
	Mustache.parse(template);
	var html = Mustache.render(template, {rows: appendRecords});
	$('#diff_apendRecords tbody').html(html);
}

function fetchDataAndRenderHtml(orderNo, differAppendId) {
	settlementCommon.fetchBasicData(function (data) {

		(data.sign) ? (_signList = data.sign) : null;
		(data.dispose) ? (_disposeList = data.dispose) : null;
		(data.type) ? (_typeList = data.type) : null;
		(data.department) ? (_departmentList = data.department) : null;

		if (orderNo || differAppendId) {
			var param = {
				orderNo: orderNo,
				differAppendId: differAppendId,
			}
			$.ajax({
				url: common.API_HOST + 'settlement/differAppend/goEditDifferAppend',
				type: 'POST',
				dataType: 'json',
				data: param,
			})
			.done(function(res) {
				if (!!~~res.meta.result) {

					var template = $('#detail-template').html();
					Mustache.parse(template);
					var html = Mustache.render(template, res.data);
					$('#popup-edit-diff .modal-body').html(html);

					_appendData = res.data.detail.appendRecord;
					renderOptions();
					$('#diff_processType option[value="' + _appendData.processType + '"]').prop('selected', true);
					$('#diff_processStatus option[value="' + _appendData.processStatus + '"]').prop('selected', true);
					$('#diff_differType option[value="' + _appendData.differType + '"]').prop('selected', true);
					$('#diff_departId option[value="' + _appendData.departId + '"]').prop('selected', true);
					$('#diff_channelId option[value="' + _appendData.channelId + '"]').prop('selected', true);
					if (_appendData.settleDate) {
						$('#diff_settleDate').val(common.getDate(new Date(_appendData.settleDate)));
					}
					if (_appendData.updateTime) {
						$('#diff_updateTime').val(common.getDate(new Date(_appendData.updateTime)));
					}
					if (!differAppendId) {
						$('#diff_operatorName').closest('.form-group').hide();
						$('#diff_updateTime').closest('.form-group').hide();
						$('#formDiff button[type=submit]').attr('data-id', '');
					} else {
						$('#diff_operatorName').closest('.form-group').show();
						$('#diff_updateTime').closest('.form-group').show();
						$('#formDiff button[type=submit]').attr('data-id', differAppendId);
					}
					renderTable(res);

					$('#formDiff').parsley();
					settlementCommon.addStarMark();
					$('#popup-edit-diff').modal('show');

				} else {
					settlementCommon.warning(res.meta.msg);
				}
			});
		} else {
			var template = $('#detail-template').html();
			Mustache.parse(template);
			var html = Mustache.render(template, {detail: {appendRecord: {}}});
			$('#popup-edit-diff .modal-body').html(html);

			renderOptions();
			if (!differAppendId) {
				$('#diff_operatorName').closest('.form-group').hide();
				$('#diff_updateTime').closest('.form-group').hide();
				$('#formDiff button[type=submit]').attr('data-id', '');
			} else {
				$('#diff_operatorName').closest('.form-group').show();
				$('#diff_updateTime').closest('.form-group').show();
				$('#formDiff button[type=submit]').attr('data-id', differAppendId);
			}

			if (!orderNo) {
				$('#diff_number').closest('.form-group').hide();
				$('#diff_batchNo').closest('.form-group').hide();
				$('#diff_settleDate').removeAttr('readonly');
				$('#diff_orderNo').removeAttr('readonly');
				$('#diff_settleDate').prop('required', true);
				$('#diff_orderNo').prop('required', true);
			}

			$('#formDiff').parsley();
			settlementCommon.addStarMark();
			settlementCommon.datetimepickerRegister($('#diff_settleDate'), null);
			$('#popup-edit-diff').modal('show');
		}
	});
}

$('#popup-edit-diff').on('blur', '#diff_orderNo', function (e) {
	e.preventDefault();
	var orderNo = $('#diff_orderNo').val();
	if (orderNo.length > 0) {
		$.ajax({
			url: common.API_HOST + 'settlement/differAppend/goEditDifferAppend',
			type: 'POST',
			dataType: 'json',
			data: {orderNo: orderNo},
		})
		.done(function(res) {
			if (!!~~res.meta.result) {
				_appendData = res.data.detail.appendRecord;
				renderTable(res);
			}
		});
	}
})

$('.btn-diff-add').click(function(e) {
	e.preventDefault();
	fetchDataAndRenderHtml();
});

$('#dataTable').on('click', '.btn-edit', function (e) {
	e.preventDefault();

	var orderNo = $(this).closest('tr').data('orderno');
	var differAppendId = $(this).closest('tr').data('diffid');

	fetchDataAndRenderHtml(orderNo, differAppendId);
});

$(document).on('submit', '#formDiff', function(e) {
	e.preventDefault();

	var param = {
		differAppendId: $('#formDiff button[type=submit]').data('id'),
		settleDate: $('#diff_settleDate').val(),
		orderNo: $('#diff_orderNo').val(),
		number: $('#diff_number').val(),
		differType: $('#diff_differType').val(),
		channelId: $('#diff_channelId').val(),
		processType: $('#diff_processType').val(),
		batchNo: $('#diff_batchNo').val(),
		amount: $('#diff_amount').val(),
		processStatus: $('#diff_processStatus').val(),
		departId: $('#diff_departId').val(),
		describ: $('#diff_describ').val(),
		remarks: $('#diff_remarks').val(),
		processRemarks: $('#diff_processRemarks').val(),
		advanceType: _appendData.advanceType,
		advanceTypeTrd: _appendData.advanceTypeTrd,
		budgetAmountDiffer: _appendData.budgetAmountDiffer,
		budgetAmountTrdDiffer: _appendData.budgetAmountTrdDiffer,
	};
	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/saveDifferAppend',
		type: 'POST',
		dataType: 'json',
		data: param
	})
	.done(function(res) {
		alert(res.meta.msg);
		if (!!res.meta.result) {
			$('#popup-edit-diff').modal('hide');
			$('#formSearch').trigger('submit');
		}
	})
});

