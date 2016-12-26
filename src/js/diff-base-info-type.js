'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _useCache = false;
var _formCache = {};
var _querying = false;
var _records = {};

var _yesOrNo = {'1' : '是', '2' : '否'};
var _postiveOrNegative = {'1' : '+', '2' : '-'};
var _useStatus = {'1' : '启用', '2' : '停用', '3' : '删除'};

$(function () {
	common.init('diff-base-info-type');
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
		differenceName: $('#search_differenceName').val(),
		useStatus: $('#search_useStatus').val(),
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
		url: common.API_HOST + 'settlement/type/selectList',
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
	if (!!~~res.meta.result) {
		if (res.data == null || res.data.detail.records.length < 1) {
			handleEmptyData(res);
		} else {
			useCache = true;
			var totalRecord = res.data.detail.count;
			var records = res.data.detail.records;
			_records = $.extend(true, {}, records);

			pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
			pager.setPager(totalRecord, pager.pageIndex, records.length, pager.pageTotal);

			_(records).forEach(function(item) {
				item.addStatus = _yesOrNo[item.addStatus];
				item.departmentStatus = _yesOrNo[item.departmentStatus];
				item.settlementStatus = _yesOrNo[item.settlementStatus];
				item.differenceStatus = _postiveOrNegative[item.differenceStatus];
				item.useStatus = _useStatus[item.useStatus];
			});

			var template = $('#table-template').html();
			Mustache.parse(template);
			var html = Mustache.render(template, {rows: records});
			$('#dataTable tbody').html(html);
		}
	} else {
		handleEmptyData(res);
	}
}

function handleEmptyData (res) {
	var message = res.meta.msg;
	if (!!~~res.meta.result && res.data.detail.records.length < 1) {
		message = '查询成功，无记录。';
	}
	var html = '<tr><td colspan="30" align="center">' + message + '</td></tr>';
	$('#dataTable tbody').html(html);
	$('#pager').html('');
}

function queryData (callback) {
	$.ajax({
		url: common.API_HOST + 'settlement/department/selectList',
		type: 'GET',
		dataType: 'json',
		data: {pageIndex: 1, pageSize: 100},
	})
	.done(function(departmentRes) {
		if (!!~~departmentRes.meta.result) {
			var departmentHtml = '';
			_(departmentRes.data.detail.records).forEach(function (item) {
				departmentHtml += '<option value="' + item.id + '">' + item.departmentName + '</option>';
			});
			$('#add_departmentId').html(departmentHtml);

			$.ajax({
				url: common.API_HOST + 'settlement/dispose/selectList',
				type: 'GET',
				dataType: 'json',
			})
			.done(function(disposeRes) {
				if (!!~~disposeRes.meta.result) {
					var disposeHtml = '';
					_(disposeRes.data.detail.records).forEach(function (item) {
						disposeHtml += '<option value="' + item.id + '">' + item.disposeName + '</option>';
					});
					$('#add_disposeId').html(disposeHtml);
					callback();
				}
			});
		}
	});
}

$('#btn-add').click(function(e) {
	e.preventDefault();

	queryData(function () {
		$('#formAdd button[type=submit]').data('id', '');
		$('#popup-add-diff-type').modal('show');
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
			$('#add_differenceName').val(selectedItem.differenceName);
			$('#add_addStatus').val(selectedItem.addStatus);
		 	$('#add_departmentStatus').val(selectedItem.departmentStatus);
		 	$('#add_settlementStatus').val(selectedItem.settlementStatus);
		 	$('#add_differenceStatus').val(selectedItem.differenceStatus);
		 	$('#add_departmentId').val(selectedItem.departmentId);
		 	$('#add_disposeId').val(selectedItem.disposeId);
		 	$('#add_useStatus').val(selectedItem.useStatus);
		 	$('#formAdd button[type=submit]').data('id', selectedItem.id);
		}
		$('#popup-add-diff-type').modal('show');
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
		addStatus: $('#add_addStatus').val(),
		departmentStatus: $('#add_departmentStatus').val(),
		settlementStatus: $('#add_settlementStatus').val(),
		differenceStatus: $('#add_differenceStatus').val(),
		differenceName: $('#add_differenceName').val(),
		departmentId: $('#add_departmentId').val(),
		disposeId: $('#add_disposeId').val(),
		useStatus: $('#add_useStatus').val()
	};

	if (param.id.length === 0) {
		$.ajax({
			url: common.API_HOST + 'settlement/type/insertType',
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
			url: common.API_HOST + 'settlement/type/updateType',
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
	$('#popup-add-diff-type').modal('hide');
});

