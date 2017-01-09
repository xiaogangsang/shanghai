'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');

$('#dataTable').on('click', '.btn-edit', function (e) {
	e.preventDefault();

	var orderNo = $(this).closest('tr').data('orderno');
	var differAppendId = $(this).closest('tr').data('diffid');

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

			var template = $('#acquiring-table-template').html();
			Mustache.parse(template);
			var html = Mustache.render(template, {rows: res.data.detail.acquiringRecords});
			$('#diff_acquiringRecords tbody').html(html);

			var template = $('#shipment-table-template').html();
			Mustache.parse(template);
			var html = Mustache.render(template, {rows: res.data.detail.shipmentRecords});
			$('#diff_shipmentRecords tbody').html(html);

			$('#popup-edit-diff').modal('show');

		} else {
			settlementCommon.warning(res.meta.msg);
		}
	});
});

