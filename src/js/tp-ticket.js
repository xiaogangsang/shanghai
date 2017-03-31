'use strict;'

var common = require('common');
var _querying = false;
var _submitting = false;

$(function () {
  common.init('tp-ticket');
  loadData();
});

function loadData() {
  $('#dataTable tbody').html('<tr><td colspan="4" align="center">查询中...</td></tr>');
  $.ajax({
    url: common.API_HOST + 'tp/tpList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data != null && res.data.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="4" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      } else {
        setTableData(res.data);
      }
    } else {
      alert(res.meta.msg);
    }
  });
}

$('#dataTable').on('click', '.btn-edit', function (event) {
  event.preventDefault();
  var $tr = $(this).closest('tr');
  $('#sourceId').val($tr.data('id'));
  $('#sourceName').val($tr.find('td:nth-child(2)').text().trim());
  $('#sort').val($tr.find('td:nth-child(3)').text().trim());
  $('input[type=radio]').prop('checked', false);
  $('input[type=radio][value=' + $tr.data('status') + ']').prop('checked', true);
  $('#popup-tpTickt-form').modal('show');
});

$(document).on('submit', '#popup-tpTickt-form form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  $('#popup-tpTickt-form input[type=submit]').prop('disabled', true).text('处理中...');
  var sendData = {
    id: $('#sourceId').val(),
    name: $('#sourceName').val().trim(),
    sort: $('#sort').val().trim(),
    status: $('input[name=status]:checked').val(),
  };

  var ajaxUrl = common.API_HOST + 'tp/updateTpInfo';
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
      $('#popup-tpTickt-form').modal('hide');
      loadData();
    } else {
      alert('接口错误：' + res.meta.msg);
      $('#popup-tpTickt-form input[type=submit]').prop('disabled', false).text('再试一次');
    }
  });
  return false;
});

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
