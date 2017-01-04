'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');
var pager = require('pager');

var _status = [
{ id: 0, name: '启用' },
{ id: 1, name: '停用' },
];

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var useCache = false;
var _querying = false;
var searchCache = {};
var dataCache;
var selectedsectionData;


$(function () {
	common.init('diff-base-info-department');
	pager.init($('#pager'));
})

$('#formSearch').on('click', 'button[type=submit]', function (event) {
	event.preventDefault();

	pager.pageIndex = 1;
	useCache = false;

	var sendData = {
		id: $('#dep_number').val(),
		pageSize: pager.pageSize,
    pageIndex: pager.pageIndex,
		departmentName: $('#dep_name').val(),
		departmentUseStatus: $('#dep_status').val(),

	};

  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }
  sendData.pageIndex = pager.pageIndex;

  $.ajax({
    url: common.API_HOST + 'settlement/department/selectList',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    handleData(res);
  });
  
  return false;
});

  function handleData(res) {
  	_querying = false;

  	if (!!~~res.meta.result) {
      if (res.data == null || res.data.detail.records.length < 1) {
          $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
          $('#pager').html('');

        } else {
          var totalRecord = res.data.detail.count;
          var record = res.data.detail.records;

          pager.pageTotal = Math.ceil(totalRecord / pager.pageSize);
          pager.setPager(totalRecord, pager.pageIndex, record.length, pager.pageTotal);

          _(record).forEach(function(item) {
          item.departmentUseStatus = settlementCommon.parseDepartmentUseStatus(item.departmentUseStatus);
        });
      		dataCache = record;
      		setTableData(dataCache);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
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


  $('body').on('change', 'tr > td :checkbox', function(e) {
    e.preventDefault();

    var isChecked = $(this).is(':checked');

    if (!isChecked) {
      $('.multi-check-all').prop('checked', false);
    }
  });

  // 修改
  $('body').on('click', '.btn-edit', function (e) {
    e.preventDefault();

    var index = $(this).parents('tr')[0].sectionRowIndex;
    var sectionData = dataCache[index];

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
    selectedsectionData = sectionData;

    var template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, sectionData);
    $('#popup-add-diff').html(html);

    $('#popup-add-diff').modal('show');
  });

  // 保存
  $('body').on('click', '#btn-save', function (e) {
	  e.preventDefault();

		var sendData = {
			departmentName: $('#departmentName').val(),
			departmentUseStatus: $('#departmentUseStatus').val(),
		};

    var url = common.API_HOST + 'settlement/department/updateDepartment';
    if (selectedsectionData.title === '修改') {
      sendData.id = selectedsectionData.id;
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
          $('#formSearch').trigger('submit');
          $('#popup-add-diff').modal('hide');

        } else {
          alert('接口错误：' + res.meta.msg);
        }
	  });
	  
	  return false;
  });

  // 新增
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
      selectedsectionData = newData;

      var template = $('#edit-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, newData);
      $('#popup-add-diff').html(html);
      $('#popup-add-diff').modal('show');
  });


