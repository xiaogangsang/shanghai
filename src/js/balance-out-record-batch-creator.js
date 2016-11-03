'use stricts;'

var common = require('common');
var settlementCommon = require('settlementCommon');

$(function() {
    common.init("balance-out-record-batch-creator");
});

$('#btn-debug-record-in').click(function(e) {
    $('#popup-balance-in-record').modal('show');
});

$('#btn-debug-record-out').click(function(e) {
    $('#popup-balance-out-record').modal('show');
});

$(document).on('submit', '#formBalanceInRecord', function(e) {
	e.preventDefault();
	
	if (!$('#formBalanceInRecord').parsley().isValid()) {
		return false;
	}

	var param = {
		acquiringOrderType: $('#record_acquiringOrderType').val(),
		payTool: $('#record_payTool').val(),
		createTime: $('#search_startTime').val(),
		payStatus: $('#record_payStatus').val(),
		payAmount: $('#record_payAmount').val(),
		receivablePoint: $('#record_receivablePoint').val(),
		chargeMerchant: $('#record_chargeMerchant').val(),
		chargeMerchantNo: $('#record_chargeMerchantNo').val(),
		orderNo: $('#record_orderNo').val(),
		thdSerialNo: $('#record_thdSerialNo').val(),
		ticketAmount: $('#record_ticketAmount').val(),
		serviceAmount: $('#record_serviceAmount').val(),
		subsidyAmountO2o: $('#record_subsidyAmountO2o').val(),
		subsidyType: $('#record_subsidyType').val(),
		subsidyAmountTrd: $('#record_subsidyAmountTrd').val(),
		subsidyTypeTrd: $('#record_subsidyTypeTrd').val(),
		returnFee: $('#record_returnFee').val(),
		partner: $('#record_partner').val(),
		o2oReceivableAmount: $('#record_o2oReceivableAmount').val(),
		bankAmount: $('#record_bankAmount').val(),
		refundReason: $('#record_refundReason').val(),
		discountType: $('#record_discountType').val(),
		discountId: $('#record_discountId').val(),
		discountName: $('#record_discountName').val(),
		costCenter: $('#record_costCenter').val(),
		signatureNo: $('#record_signatureNo').val(),
		costCenterTrd: $('#record_costCenterTrd').val()
	};

	$.ajax({
		url: common.API_HOST + "settlement/acquiring/insertOnlyAcquiringInfo",
		type: 'POST',
		data: param
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			alert("录入成功，请至列表查看");
			$("#formBalanceInRecord button.close").trigger('click');
			$("#formBalanceInRecord :input").val("");
		} else {
			alert("录入失败，请检查数据后重试");
		}
	})	
});

$(document).on('submit', '#formBalanceOutRecord', function(e) {
	e.preventDefault();
	
	if (!$('#formBalanceOutRecord').parsley().isValid()) {
		return false;
	}

	var param = {
		shipmentOrderType: $('#record_shipmentOrderType').val(),
		payTool: $('#record_payTool').val(),
		shipmentDate: $('#search_startTime').val(),
		movieName: $('#record_movieName').val(),
		cinemaName: $('#record_cinemaName').val(),
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
		type: 'POST',
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
