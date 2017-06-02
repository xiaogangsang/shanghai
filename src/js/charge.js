'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _submitting = false;

$(function () {
  common.init('charge');
  setTableData();
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
  if (~~pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

function setTableData() {
  $.ajax({
    url: common.API_HOST + 'timeTable/feeRuleList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total / _pageSize);
      setPager(res.data.total, _pageIndex, res.data.length, _pageTotal);
      var template = $('#table-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, { rows: res.data });
      $('#dataTable tbody').html(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {
    total: total,
    pageIndex: pageIndex,
    rowsSize: rowsSize,
    pageTotal: pageTotal,
  };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

$('#dataTable').on('click', '.btn-edit', function (event) {
  event.preventDefault();
  var $tr = $(this).closest('tr');
  $('#channelId').val($tr.find('td:nth-child(1)').text().trim());
  $('#channelName').val($tr.find('td:nth-child(2)').text().trim());
  $('#free').val($tr.find('td:nth-child(3)').text());
  $('#status').val($tr.data('status'));
  $('#popup-charge-form').modal('show');
  $('#free').parsley().validate();
});

$(document).on('submit','#popup-charge-form', function(e) {
  event.preventDefault();

  $('#free').parsley().validate();

  if (!$('#free').parsley().isValid()) {
    return false;
  }

  if (_submitting) {
    return false;
  };
  _submitting = true;

  $('#popup-charge-form input[type=submit]').prop('disabled', true).text('提交中...');
  var sendData = {
    channelId: $('#channelId').val(),
    fee: $('#free').val().trim(),
    channelName: $('#channelName').val().trim(),
    status: $('#status').val()
  };

  var ajaxUrl = common.API_HOST + 'timeTable/feeRuleUpdate';
  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('更新成功！');
      $('#popup-charge-form').modal('hide');
      setTableData();
    } else {
      alert('接口错误：' + res.meta.msg);
      $('#popup-charge-form input[type=submit]').prop('disabled', false).text('再试一次');
    }
  });
  return false;
});

