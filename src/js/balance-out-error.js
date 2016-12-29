'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

$(function () {
	common.init('balance-out-error');

	settlementCommon.fetchBasicData(function (res) {
		if (res.type) {
			_typeList = res.type;
			typeHtml = settlementCommon.optionsHTML(res.type, true);
			$('#search_diffType').html(typeHtml);
		}
	});
})