'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _status = [
  { id: 1, name: '启用' },
  { id: 2, name: '停用' },
  { id: 3, name: '删除' },
];

var _useCache = false;
var _querying = false;
var _searchCache = {};
var _dataCache;
var _selectedsectionData;


$(function () {
	common.init('diff-base-info-department');
  pager.init($('#pager'));
})

$('#formSearch').on('click', 'button[type=submit]', function(e) {
  e.preventDefault();
  pager.pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
	e.preventDefault();

  if (_querying) return false;
  _querying = true;

  $('#dataTable tbody').html('<tr><td colspan="30" align="center">查询中...</td></tr>');

	var sendData = {
		id: $('#dep_number').val(),
		departmentName: $('#dep_name').val(),
		departmentUseStatus: $('#dep_status').val(),
    pageIndex: pager.pageIndex,
    pageSize: pager.pageSize,
	};

  if (_useCache) {
    sendData = _searchCache;
    sendData.pageIndex = pager.pageIndex;
  } else {
    _searchCache = sendData;
  }

  $.ajax({
    url: common.API_HOST + 'settlement/department/selectList',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    handleData(res);
  })
});

function handleData(res) {
	_querying = false;

	if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
		var record = res.data.detail.records;

		pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
		pager.setPager(totalRecord, pager.pageIndex, record.length, pager.pageTotal);

		_(record).forEach(function(item) {
      item.departmentUseStatus = settlementCommon.parseDepartmentUseStatus(item.departmentUseStatus);
    });

		_dataCache = record;
		setTableData(_dataCache);
  }
}

function setTableData(rows) {
	var data = {rows : rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

$('.multi-check-all').change(function(e) {
  e.preventDefault();
  var isChecked = $(this).is(':checked');

  if (isChecked) {
    $('#dataTable tbody :checkbox:not(:checked)').prop('checked', true);
  } else {
    $('#dataTable tbody :checkbox:checked').prop('checked', false);
  }
});

$('body').on('click', '.btn-edit', function (e) {
  e.preventDefault();

  var index = $(this).parents('tr')[0].sectionRowIndex;
  var sectionData = _dataCache[index];

  _(_status).forEach(function (value) {
      if (sectionData.departmentUseStatus == value.name) {
        // data.statusName = value.name;
        value.selected = true;
      } else {
        value.selected = false;
      }
  });
  sectionData.status = _status;
  sectionData.title = '修改';
  _selectedsectionData = sectionData;

  var template = $('#edit-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, sectionData);
  $('#popup-add-diff').html(html);

  $('#popup-add-diff').modal('show');
});

$('body').on('click', '#btn-save', function (e) {
  e.preventDefault();

	var sendData = {
		departmentName: $('#departmentName').val(),
		departmentUseStatus: $('#departmentUseStatus').val(),
	};

  var url = common.API_HOST + 'settlement/department/updateDepartment';
  if (_selectedsectionData.title === '修改') {
    sendData.id = _selectedsectionData.id;
  }else{
    url = common.API_HOST + 'settlement/department/insertDepartment';
  }

  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
        alert('保存成功');
        // location.reload();
        $('#formSearch').trigger('submit');
        $('#popup-add-diff').modal('hide');

      } else {
        alert('接口错误：' + res.meta.msg);
      }
  });

  return false;
});

$('#formSearch').on('click','button[type=button]', function (event) {
  event.preventDefault();

  _(_status).forEach(function (value) {
      if (value.id == 0) {
        value.selected = true;
      } else {
        value.selected = false;
      }
  });
  var newData = new Object();
  newData.status = _status;
  newData.title = '新增';
  newData.departmentName = '';
  _selectedsectionData = newData;

  var template = $('#edit-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, newData);
  $('#popup-add-diff').html(html);
  $('#popup-add-diff').modal('show');
});
