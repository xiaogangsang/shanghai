'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;
var _records = {}

var _matched = {1 : '是', 2 : '否'};

$(function () {
	common.init('diff-operation');
	pager.init($('#pager'));
	settlementCommon.datetimepickerRegister($('#auto_startTime'), $('#auto_endTime'));

	var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_startTime').val(todayDate);
  $('#search_endTime').val(todayDate);
  $('#auto_startTime').val(todayDate);
  $('#auto_endTime').val(todayDate);

  $('#btn-export').prop('disabled', true);
  $('#btn-batch').prop('disabled', true);

  // checkForAutoDiff();
  // checkForBatchCreateDiff();
  checkForBalanceStateSync();
});


function checkForAutoDiff() {
  if ($('#hud-overlay')[0].style.display === 'none') {
    $('#hud-overlay').show();
  }
  $.ajax({
    url: common.API_HOST +  'settlement/differDetail/autoHandleDifferDetail/check',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      var status = res.data.autoHandleDifferDetailCheck.detail.finish;
      if (!status) {
        $('#hud-overlay p').html('正在进行自动整理，请稍后...');
        setTimeout(function () {
          checkForAutoDiff();
        }, 20000);
      } else {
        $('#hud-overlay').hide();
        $('#hud-overlay p').html('working...');
      }
    }
  });
}

function checkForBatchCreateDiff() {
  if ($('#hud-overlay')[0].style.display === 'none') {
    $('#hud-overlay').show();
  }
  $.ajax({
    url: common.API_HOST +  'settlement/differAppend/autoHandleDifferAppend/check',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      var status = res.data.autoHandleDifferAppendCheck.detail.finish;
      if (!status) {
        $('#hud-overlay p').html('正在批量生成差异，请稍后...');
        setTimeout(function () {
          checkForBatchCreateDiff();
        }, 20000);
      } else {
        $('#hud-overlay').hide();
        $('#hud-overlay p').html('working...');
      }
    }
  });
}

function checkForBalanceStateSync() {
  if ($('#hud-overlay')[0].style.display === 'none') {
    $('#hud-overlay').show();
  }
  $.ajax({
    url: common.API_HOST +  'settlement/differDetail/syncShipmentInfoStatus/thread_check',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      var status = res.data.syncShipmentInfoStatusCheck.detail.finish;
      if (!status) {
        $('#hud-overlay p').html('正在同步出货对账状态，请稍后...');
        setTimeout(function () {
          checkForBalanceStateSync();
        }, 20000);
      } else {
        $('#hud-overlay').hide();
        $('#hud-overlay p').html('working...');
      }
    }
  });
}

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

	var beginTime = $('#search_startTime').val();
	var endTime = $('#search_endTime').val();
	var orderNo = $('#search_orderNo').val();
	var matched = $('#search_matched').val();

	if (!(orderNo || (beginTime && endTime))) {
		settlementCommon.warning('查询前请选择结算日期或输入交易订单号');
		return false;
	}

	if (_querying) return false;
	_querying = true;

	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var param = {
		startTime: beginTime,
		endTime: endTime,
		orderNo: orderNo,
		matched: matched,
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
		url: common.API_HOST + 'settlement/differDetail/queryDifferDetailList',
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
			item.matched = _matched[item.matched];
			var today = new Date(item.settleDate);
			item.settleDate = common.getDate(today);
			item.channelId = settlementCommon.parseChannel(item.channelId);
		});

		var template = $('#table-template').html();
		Mustache.parse(template);
		var html = Mustache.render(template, {rows: records});
		$('#dataTable tbody').html(html);

	  $('#btn-export').prop('disabled', false);
	  $('#btn-batch').prop('disabled', false);

	} else {
	  $('#btn-export').prop('disabled', true);
  	$('#btn-batch').prop('disabled', true);
	}
}

$('#btn-export').click(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	var beginTime = $('#search_startTime').val();
	var endTime = $('#search_endTime').val();
	var orderNo = $('#search_orderNo').val();
	var matched = $('#search_matched').val();

	if (!(orderNo || (beginTime && endTime))) {
		alert('导出前请选择结算日期或输入交易订单号');
		return false;
	}

	$('#hud-overlay').show();

	var param = {
		startTime: beginTime,
		endTime: endTime,
		orderNo: orderNo,
		matched: matched,
	}

	$.ajax({
		url: common.API_HOST + 'settlement/differDetail/queryDifferDetailListExport',
		type: 'POST',
		dataType: 'json',
		data: param,
	})
	.done(function(res) {
		var fileUrl = null;
		if (!!~~res.meta.result && res.data) {
			fileUrl = res.data.fileUrl;
			if (fileUrl && fileUrl.length > 0) {
				window.location.href = common.API_HOST + 'settlement/downloadFile/downloadByUrl?fileUrl=' + fileUrl;
			}
		} else {
			settlementCommon.warning('该时间段内无差异数据！');
		}
	})
	.always(function() {
		$('#hud-overlay').hide();
	});

});

$('#btn-batch').click(function(e) {
	e.preventDefault();

	if (!confirm('即将开始运算，可能需要几分钟，请稍等，系统运算过程中请勿操作系统。')) {
		return;
	}

	$('#hud-overlay').show();

	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/autoHandleDifferAppend',
		type: 'GET',
		dataType: 'json',
		data: {
			startTime: $('#search_startTime').val(),
			endTime: $('#search_endTime').val(),
		}
	})
	.done(function(res) {
		$('#hud-overlay').hide();
		if (!!~~res.meta.result) {
			checkForBatchCreateDiff();
		} else {
			settlementCommon.warning(res.meta.msg);
		}
	})
	.fail(function () {
		$('#hud-overlay').hide();
	});
});

$(document).on('submit', '#formAutoDiff', function(e) {
	e.preventDefault();

	$('#formAutoDiff').parsley().validate();
	if (!$('#formAutoDiff').parsley().isValid()) {
	    return false;
	}

	$('#hud-overlay').show();

	var param = {
		startTime: $('#auto_startTime').val(),
		endTime: $('#auto_endTime').val()
	}
	$.ajax({
		url: common.API_HOST +  'settlement/differDetail/autoHandleDifferDetail',
		type: 'GET',
		dataType: 'json',
		data: param
	})
	.done(function(res) {
		$('#hud-overlay').hide();
		if (!!~~res.meta.result) {
			$('#popup-auto-diff').modal('hide');
			checkForAutoDiff();
			// settlementCommon.success('自动整理完毕');
			// $('#search_startTime').val(param.startTime);
			// $('#search_endTime').val(param.endTime);
			// $('#formSearch').trigger('submit');
		} else {
			settlementCommon.warning(res.meta.msg);
		}
	})
	.fail(function () {
		$('#hud-overlay').hide();
	});
});

$('#btn-sync').click(function(e) {
	e.preventDefault();

	$.ajax({
		url: common.API_HOST + 'settlement/differDetail/syncShipmentInfoStatus/check',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			if (res.data.detail.checkStatus) {
				$.ajax({
					url: common.API_HOST + 'settlement/differDetail/syncShipmentInfoStatus',
					type: 'GET',
					dataType: 'json',
				})
				.done(function() {
					if (!!~~res.meta.result) {
						// settlementCommon.success('同步出货对账状态成功！');
						checkForBalanceStateSync();
					} else {
						settlementCommon.warning(res.meta.msg);
					}
				})
			} else {
				settlementCommon.warning('差异数据未处理完，无法同步！');
			}
		}
	})
});