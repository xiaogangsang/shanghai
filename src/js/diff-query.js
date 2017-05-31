'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;

var _signList = {};
var _disposeList = {};
var _typeList = {};

$(function () {
	common.init('diff-query');
	pager.init($('#pager'));
	// settlementCommon.datetimepickerRegister($('#search_start'), $('#search_endDate'));

	var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_startTime').val(todayDate);
  $('#search_endTime').val(todayDate);

  $('#search_channelId').html(settlementCommon.optionsHTML(settlementCommon.channel, true));

  settlementCommon.fetchBasicData(function (res) {
  	if (res.sign) {
  		_signList = res.sign;
  		signHtml = settlementCommon.optionsHTML(res.sign, true);
  		$('#search_processType').html(signHtml);
  	}
  	if (res.dispose) {
  		_disposeList = res.dispose;
  		disposeHtml = settlementCommon.optionsHTML(res.dispose, true);
  		$('#search_processStatus').html(disposeHtml);
  	}
  	if (res.type) {
  		_typeList = res.type;
  		typeHtml = settlementCommon.optionsHTML(res.type, true);
  		$('#search_diffType').html(typeHtml);
  	}
  });
})

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
		differType: $('#search_diffType').val(),
		channelId: $('#search_channelId').val(),
		processStatus: $('#search_processStatus').val(),
		processType: $('#search_processType').val(),
		orderNo: $('#search_orderNo').val(),
		number: $('#search_number').val(),
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
		url: common.API_HOST + 'settlement/differAppend/queryDifferAppendList',
		type: 'POST',
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
			var today = new Date(item.settleDate);
			item.settleDate = common.getDate(today);
			item.processStatus = _disposeList[item.processStatus];
			item.processType = _signList[item.processType];
			item.type = _typeList[item.type];
			item.channelId = settlementCommon.parseChannel(item.channelId);
		});

		var template = $('#table-template').html();
		Mustache.parse(template);
		var html = Mustache.render(template, {rows: records});
		$('#dataTable tbody').html(html);
	}
}

function batchDeleteRec(recList) {
	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/deleteDifferAppendList?' + settlementCommon.serializeParam({'idList' : recList}),
		type: 'GET',
		dataType: 'json',
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			settlementCommon.success('删除成功');
			$('#formSearch').trigger('submit');
		} else {
			settlementCommon.warning('删除失败');
		}
	})
}

$('#btn-batch-delete').click(function(e) {
	e.preventDefault();

	if (!confirm('将删除选中的差异，是否确定？')) {
		return;
	}

	var deleteIds = [];
  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var id = $(this).closest('tr').data('diffid');
    deleteIds.push(id);
  });

  batchDeleteRec(deleteIds);
});

$('#btn-export').click(function(e) {
	e.preventDefault();

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	var param = {
		startTime: $('#search_startTime').val(),
		endTime: $('#search_endTime').val(),
		differType: $('#search_diffType').val(),
		channelId: $('#search_channelId').val(),
		processStatus: $('#search_processStatus').val(),
		processType: $('#search_processType').val(),
		orderNo: $('#search_orderNo').val(),
		number: $('#search_number').val(),
	}

	$('#hud-overlay').show();

	$.ajax({
		url: common.API_HOST + 'settlement/differAppend/queryDifferAppendListExport',
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

$('#dataTable').on('click', '.btn-delete', function (e) {
	e.preventDefault();

	if (!confirm('将删除选中的差异，是否确定？')) {
		return;
	}
	var id = $(this).closest('tr').data('diffid');
  batchDeleteRec([id]);
});

$('#dataTable').on('change', 'tr > th :checkbox', function(e) {
	e.preventDefault();
	var isChecked = $(this).is(':checked');
	$('.multi-check').prop('checked', isChecked);
})

$('#dataTable').on('change', 'tr > td :checkbox', function(e) {
  e.preventDefault();
  var isChecked = $(this).is(':checked');
  if (!isChecked) {
    $('.multi-check-all').prop('checked', false);
  }
});
