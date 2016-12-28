'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;
var _records = {};

var _signUseStatus = {'1' : '启用', '2' : '停用', '3' : '删除'};

$(function () {
	common.init('diff-base-info-mark');
	pager.init($('#pager'));
})


$('#formSearch').on('click', 'button[type=submit]', function(e) {
	e.preventDefault();
	pager.pageIndex = 1;
	_useCache = false;
	$('#formSearch').trigger('submit');
});

$('#formSearch').submit(function(e) {
	e.preventDefault();

	if (_querying) return false;
	_querying = true;

	$('#formSearch').parsley().validate();
	if (!$('#formSearch').parsley().isValid()) {
	    return false;
	}

	$('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var param = {
		id: $('#search_id').val(),
		signName: $('#search_signName').val(),
		signUseStatus: $('#search_signUseStatus').val(),
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
		url: common.API_HOST + 'settlement/sign/selectList',
		type: 'GET',
		dataType: 'json',
		data: param
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
			item.signUseStatus = _signUseStatus[item.signUseStatus];
		});

		var template = $('#table-template').html();
		Mustache.parse(template);
		var html = Mustache.render(template, {rows: records});
		$('#dataTable tbody').html(html);
	}
}

function queryData (callback) {
	$.ajax({
		url: common.API_HOST + 'settlement/type/selectList',
		type: 'GET',
		dataType: 'json',
		data: {pageIndex: 1, pageSize: 100, useStatus: 1}
	})
	.done(function(typeRes) {
		if (!!~~typeRes.meta.result) {
			var typeHtml = '';
			_(typeRes.data.detail.records).forEach(function (item) {
				typeHtml += '<option value="' + item.id + '">' + item.differenceName + '</option>';
			});
			$('#add_differenceId').html(typeHtml);
			callback();
		}
	});
}

$('#btn-add').click(function(e) {
	e.preventDefault();

	queryData(function () {
		$('#formAdd button[type=submit]').data('id', '');
		$('#popup-add-diff-mark').modal('show');
	})
});

$('#dataTable').on('click', '.btn-edit', function (e) {
	e.preventDefault();

	var id=$($(this).closest('tr').children('td')[0]).html();
	var selectedItem = null;
	_(_records).forEach(function (item) {
		if (item.id === parseInt(id)) {
			selectedItem = item;
		}
	});

	queryData(function () {
		if (selectedItem) {
			$('#add_signName').val(selectedItem.signName);
			$('#add_differenceId').val(selectedItem.differenceId);
		 	$('#add_signUseStatus').val(selectedItem.signUseStatus);
		 	$('#formAdd button[type=submit]').data('id', selectedItem.id);
		}
		$('#popup-add-diff-mark').modal('show');
	})
});

$('#formAdd').submit(function(e) {
	e.preventDefault();

	$('#formAdd').parsley().validate();
	if (!$('#formAdd').parsley().isValid()) {
	    return false;
	}

	var param = {
		id: $('#formAdd button[type=submit]').data('id'),
		signName: $('#add_signName').val(),
		differenceId: $('#add_differenceId').val(),
		signUseStatus: $('#add_signUseStatus').val(),
	};

	if (param.id.length === 0) {
		$.ajax({
			url: common.API_HOST + 'settlement/sign/insertSign',
			type: 'GET',
			dataType: 'json',
			data: param
		})
		.done(function(res) {
			var message =  null;
			if (!!~~res.meta.result) {
				$('#formAdd button[type=button]').trigger('click');
				$('#formSearch').trigger('submit');
				message = '新增成功！';
			}
			if (message == null) {
				message = res.meta.msg;
			}
			alert(message);
		});
	} else {
		$.ajax({
			url: common.API_HOST + 'settlement/sign/updateSign',
			type: 'GET',
			dataType: 'json',
			data: param
		})
		.done(function(res) {
			var message =  null;
			if (!!~~res.meta.result) {
				$('#formAdd button[type=button]').trigger('click');
				$('#formSearch').trigger('submit');
				message = '修改成功！';
			}
			if (message == null) {
				message = res.meta.msg;
			}
			alert(message);
		});
	}
});

$('#formAdd button[type=button]').click(function(e) {
	e.preventDefault();
	$('#formAdd :input').val('');
	$('#formAdd button[type=submit]').data('id', '');
	$('#popup-add-diff-mark').modal('hide');
});

