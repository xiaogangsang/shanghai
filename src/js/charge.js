'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
// var _channelAuthority = sessionStorage.getItem('channelAuthority').split(',');
var _submitting = false;

$(function () {
  common.init('charge');
  setTableData();
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  var data = {
    channelId: tr.data('id'),
    fee: tr.data('fee'),
    channelName: tr.children('td:nth-child(2)').text(),
  };
  var template = $('#edit-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-charge-form .modal-body').html(html);
  $('#popup-charge-form').modal('show');
  $('#popup-charge-form form').parsley();
});

$(document).on('submit', '#popup-charge-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }
  _submitting = true;

  // if (_channelAuthority.indexOf('' + $('#popup-charge-form #channelId').val()) > -1) {
    var sendData = {
      channelId: $('#popup-charge-form #channelId').val(),
      fee: $.trim($('#popup-charge-form #fee').val()),
    };

    $.ajax({
      url: common.API_HOST + 'timeTable/feeRuleUpdate',
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
      }
    });

  // } else {
  //   alert('没有权限！');
  // }

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
