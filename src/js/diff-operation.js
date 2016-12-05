'use strict;'

var common = require('common');

$(function () {
	common.init('diff-operation');
})

$('.btn-test').click(function(e) {
	$('#popup-edit-diff').modal('show');
});