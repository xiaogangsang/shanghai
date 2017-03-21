'use strict;'

var _smsSendStatus = {
  '1': '待发送',
  '2': '通讯超时',
  '3': '模版异常',
  '4': '发送成功',
};
var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
	common.init('record-sms');

	$('#search_smsStartTime').datetimepicker({
	  format: 'yyyy-mm-dd',
	  language: 'zh-CN',
	  minView: 2,
	  todayHighlight: true,
	  autoclose: true,
	}).on('changeDate', function (ev) {
	  var startDate = new Date(ev.date.valueOf());
	  startDate.setDate(startDate.getDate(startDate));
	  $('#search_smsEndTime').datetimepicker('setStartDate', startDate);
	});

	$('#search_smsEndTime').datetimepicker({
	  format: 'yyyy-mm-dd',
	  language: 'zh-CN',
	  minView: 2,
	  todayHighlight: true,
	  autoclose: true,
	}).on('changeDate', function (ev) {
	  var endDate = new Date(ev.date.valueOf());
	  endDate.setDate(endDate.getDate(endDate));
	  $('#search_smsStartTime').datetimepicker('setEndDate', endDate);
	});

	var beginDate = new Date();
	var endDate = new Date();
	beginDate.setDate(beginDate.getDate() - 7);
	beginDate = common.getDate(beginDate);
	endDate = common.getDate(endDate);
	$('#search_smsStartTime').val(beginDate).datetimepicker('setEndDate', endDate);
	$('#search_smsEndTime').val(endDate).datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);

	// $('#formSearch').trigger('submit');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  $('#dataTable tbody').html('<tr><td colspan="13" align="center">查询中...</td></tr>');
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
	e.preventDefault();
	var sendData = {
		mobile: $.trim($('#search_mobile').val()),
		beginDate: $('#search_smsStartTime').val(),
		endDate: $('#search_smsEndTime').val(),
		pageSize: _pageSize,
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

	$.ajax({
		url: common.API_HOST + 'sms/list',
		type: 'POST',
		dataType: 'json',
		data: sendData,
	})
	.done(function (res) {
		_querying = false;
		if (!!~~res.meta.result) {
		  if (res.data == null || res.data.rows.length < 1) {
		    var html = '<tr><td colspan="13" align="center">查不到相关数据，请修改查询条件！</td></tr>';
		    $('#dataTable tbody').html(html);
		    $('#pager').html('');
		  } else {
		    useCache = true;
		    _pageIndex = res.data.pageIndex;
		    _pageTotal = Math.ceil(res.data.total / _pageSize);
		    setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
		    _(res.data.rows).forEach(function (item) {
				item.updateTime = getDatetimeString(item.updateTime);
				item.status = _smsSendStatus[item.status];
		    });

		    setTableData(res.data.rows);
		  }
		} else {
		  alert('接口错误：' + res.meta.msg);
		}
	});
	
	return false;
});

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
  if (~~$('#pageNo').val() == 0) {
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

function setTableData(rows) {
  var data = { rows: rows };
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

function getDatetimeString(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = ('0' + date.getMinutes()).substr(-2);
  var seconds = ('0' + date.getSeconds()).substr(-2);
  var years = date.getFullYear();
  var months = ('0' + (date.getMonth()+1)).substr(-2);
  var days = ('0' + date.getDate()).substr(-2);
  return years + '-' + months + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
}
