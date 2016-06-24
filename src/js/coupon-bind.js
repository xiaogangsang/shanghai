'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};

$(function () {
  common.init('coupon-bind');
  $('#formBind').parsley();
  loadHistory();
});

// $('#fileupload').data('url', 'http://172.16.0.50:8080/movie-ops/couponCode/uploadUserIds').fileupload({
$('#fileupload').data('url', common.API_HOST + 'couponCode/uploadUserIds').fileupload({
  dataType: 'json',
  add: function (e, data) {
    data.submit();
  },

  done: function (e, data) {
    if (!!~~data.result.meta.result) {
      $('#fileupload').hide();
      $('#file').val(data.result.data.fileUniqueId).show();
      alert('上传成功！');
      $('#formBind button').prop('disabled', false);
    } else {
      alert('上传失败：' + data.result.meta.msg);
      $('#formBind button').prop('disabled', true);
    }
  },
});

$('#formBind').on('submit', function (event) {
  event.preventDefault();
  if (!!_querying || $(this).parsley().isValid() == false) {
    return false;
  }

  $('#formBind button').prop('disabled', true).text('提交中');

  $.ajax({
    url: common.API_HOST + 'couponCode/bindingUsers',
    // url: 'http://172.16.0.50:8080/movie-ops/couponCode/bindingUsers',
    type: 'POST',
    dataType: 'json',
    data: {
      couponId: $.trim($('#couponId').val()),
      fileUniqueId: $('#file').val(),
    },
  })
  .done(function (res) {
    _querying = false;
    $('#formBind button').text('产码');
    if (!!~~res.meta.result) {
      alert('灌码任务已提交，下面列表中查看进度');
      $('#couponId, #file').text('');
      $('#file').hide();
      $('#fileupload').show();
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
    url: common.API_HOST + 'couponCode/sendHistory',
    // url: 'http://172.16.0.50:8080/movie-ops/couponCode/sendHistory',
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
          item.createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          if (item.status == 'FAILURE') {
            item.canExport = true;
          } else {
            item.canExport = false;
          }

          switch (item.status) {
            case 'SUCCESS':
              item.status = '已完成';
              break;
            case 'DOING':
              item.status = '正在进行';
              break;
            case 'FAILURE':
              item.status = '失败';
              break;
            default:
              break;
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
