'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};

$(function () {
  common.init('coupon-generate');
  $('#formGenerate').parsley();
  loadHistory();
});

$('#formGenerate').on('submit', function (event) {
  event.preventDefault();
  if (!!_querying || $(this).parsley().isValid() == false) {
    return false;
  }

  $('#formGenerate button').prop('disabled', true).text('提交中');

  $.ajax({
    // url: common.API_HOST + 'couponCode/produceCodes',
    url: 'http://172.16.0.50:8080/movie-ops/couponCode/produceCodes',
    type: 'POST',
    dataType: 'json',
    data: {
      couponId: $.trim($('#couponId').val()),
      amount: $.trim($('#amount').val()),
    },
  })
  .done(function (res) {
    _querying = false;
    $('#formGenerate button').prop('disabled', false).text('产码');
    if (!!~~res.meta.result) {
      alert('产码请求已提交，可在下面列表中查看进度');
      $('#couponId, #amount').text('');
      _pageIndex = 1;
      loadHistory();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

function loadHistory() {
  if (!!_querying) {
    return false;
  }

  _querying = true;

  $.ajax({
    // url: common.API_HOST + 'couponCode/produceHistory',
    url: 'http://172.16.0.50:8080/movie-ops/couponCode/produceHistory',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: _pageIndex,
      pageSize: _pageSize,
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="7" align="center">载入中...</td></tr>');
        $('#pager').html('');
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);

        _(res.data.rows).forEach(function (item, key) {
          var date = new Date(item.createTime);
          item.createTime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
          if (item.status == 'SUCCESS') {
            item.canExport = true;
          } else {
            item.canExport = false;
          }
        });

        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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

  loadHistory();
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
  loadHistory();
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
