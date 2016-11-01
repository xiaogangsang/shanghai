'use stricts;'

var common = require('common');
var settlementCommon = require('settlementCommon');

$(function() {
    common.init("balance-out-record-batch-creator");
});

$('.btn-debug-record-in').click(function(event) {
    $('#popup-balance-in-record').modal('show');
});

$('.btn-debug-record-out').click(function(event) {
    $('#popup-balance-out-record').modal('show');
});