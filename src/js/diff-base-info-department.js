'use strict;'

var common = require('common');

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var useCache = false;
var _querying = false;
var searchCache = {};
var dataCache;


$(function () {
	common.init('diff-base-info-department');
	
})

// $('#formSearch').click(function(e){
// 	e.preventDefault();
// 	alert('aaaaaaa');
// });

$('#formSearch').on('click', 'button[type=submit]', function (event) {
	event.preventDefault();
	// alert('aaaa');

	// _pageIndex = 1;
	_pageSize = 10;
	useCache = false;

	var sendData = {
		id: $('#dep_number').val(),
		pageIndex: _pageIndex,
		pageSize: _pageSize,
		departmentName: '卡中心',
		departmentUseStatus: $('#dep_status').val(),

	};

	if (!!_querying) {
    return false;
  }

  _querying = true;
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  // if (!_DEBUG) {
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
    if (res.data.record.length < 1) {
      $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      $('#pager').html('');
    } else {
      var totalRecord = res.data.detail.records.count;
  		var record = res.data.detail.records;

  		_pageTotal = Math.ceil(totalRecord / _pageSize);
  		setPager(totalRecord, _pageIndex, record.length, _pageTotal);

  		_(record).forEach(function(item) {
      item.shipmentStatus = settlementCommon.parseDepartmentUseStatus(item.departmentUseStatus);
    });
  		dataCache = record;
  		setTableData(dataCache);
    }
  } else {
    alert('接口错误：' + res.meta.msg);
  }	
}

function setTableData(rows) {
	var data = {rows : rews};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
	var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

$('#pager').on('click', '.prev,.next', function (e) {
  e.preventDefault();
  if ($(this).hasClass('prev')) {
    if (_pageIndex <= 1) {
      _pageIndex = 1;
      alert('已经是第一页！');
      return false;
    }

    _pageIndex--;
  } else {
    if (_pageIndex >= _pageTotal) {
      _pageIndex = _pageTotal;
      alert('已经是最后一页！');
      return false;
    }

    _pageIndex++;
  }
 $('#formSearch').trigger('submit');
  return false;
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#pageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

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
    var sectionData = recordData[index];
    $('#departmentName').val(sectionData.departmentName);
    $('#departmentUseStatus').val(sectionData.departmentUseStatus);

    // _(_status).forEach(function (value) {
    //     if (data.status == value.id) {
    //       // data.statusName = value.name;
    //       value.selected = true;
    //     } else {
    //       value.selected = false;
    //     }
        
    //   });

    $('#popup-add-diff').modal('show');

  });

  $('body').on('click', '.btn-save', function (e) {
	  e.preventDefault();

		var sendData = {
			id: sectionData.id,
			departmentName: $('#departmentName').val(),
			departmentUseStatus: $('#departmentUseStatus').val(),
		};

	  $.ajax({
	    url: common.API_HOST + 'settlement/department/updateDepartment',
	    type: 'GET',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
          alert('保存成功');
          location.reload();
          $('#popup-admin-edit').modal('hide');

        } else {
          alert('接口错误：' + res.meta.msg);
        }
	  });
	  
	  return false;
});














