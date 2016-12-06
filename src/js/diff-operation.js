'use strict;'

var common = require('common');

$(function () {
	common.init('diff-operation');
})

$('#btn-test').click(function(e) {
	$('#popup-edit-diff').modal('show');
});

$('#btn-batch').click(function(e) {
	if (!confirm('即将开始运算，可能需要几分钟，请稍等，系统运算过程中请勿操作系统。')) {
		return;
	}
});