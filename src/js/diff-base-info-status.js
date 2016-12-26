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
	common.init('diff-base-info-status');
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
		id: $('#dis_number').val(),
		pageIndex: pager.pageIndex,
		pageSize: pager.pageSize,
		disposeName: $('#dis_name').val(),
		disposeUseStatus: $('#dis_status').val(),

	};

  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }
  sendData.pageIndex = pager.pageIndex;

  $.ajax({
    url: common.API_HOST + 'settlement/dispose/selectList',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    handleData(res);
  });
});

function handleData(res) {
	_querying = false;

	if (!!~~res.meta.result) {
    if (res.data == null || res.data.detail.records.length < 1) {
      handleEmptyData(res);
    } else {
      var totalRecord = res.data.detail.count;
  		var record = res.data.detail.records;

  		pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
  		pager.setPager(totalRecord, pager.pageIndex, record.length, pager.pageTotal);

  		_(record).forEach(function(item) {
        item.disposeUseStatus = settlementCommon.parseDepartmentUseStatus(item.disposeUseStatus);
      });
  		_dataCache = record;
  		setTableData(_dataCache);
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


function setTableData(rows) {
	var data = {rows : rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

// 修改
$('body').on('click', '.btn-edit', function (e) {
  e.preventDefault();

  var index = $(this).parents('tr')[0].sectionRowIndex;
  var sectionData = _dataCache[index];

  _(_status).forEach(function (value) {
      if (sectionData.disposeUseStatus == value.name) {
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
		disposeName: $('#disposeName').val(),
		disposeUseStatus: $('#disposeUseStatus').val(),
	};

  var url = common.API_HOST + 'settlement/dispose/updateDispose';
  if (_selectedsectionData.title === '修改') {
    sendData.id = _selectedsectionData.id;
  }else{
    url = common.API_HOST + 'settlement/dispose/insertDispose';
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
  newData.disposeName = '';
  _selectedsectionData = newData;

  var template = $('#edit-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, newData);
  $('#popup-add-diff').html(html);
  $('#popup-add-diff').modal('show');
});






