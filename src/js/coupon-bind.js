'use strict;'

var common = require('common');
require('fineUploader');

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

var uploader = new qq.FineUploaderBasic({
  button: $('#fileupload')[0],
  request: {
    endpoint: common.API_HOST + 'couponCode/uploadUserIds',
    inputName: 'file',
    filenameParam: 'file',
  },
  callbacks: {
    onError: function (id, fileName, errorReason) {
      if (errorReason != 'Upload failure reason unknown') {
        console.log(errorReason);
        alert('上传失败');
      }
    },

    onComplete: function (id, fileName, responseJSON) {
      if (!!~~responseJSON.meta.result) {
        $('#fileupload').hide();
        $('#file').val(responseJSON.data.fileUniqueId).show();
        $('#formBind button').prop('disabled', false);
        alert('上传成功！');
      } else {
        alert('接口错误：' + responseJSON.meta.msg);
        $('#formBind button').prop('disabled', true);
      }
    },
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
    type: 'POST',
    dataType: 'json',
    data: {
      couponId: $.trim($('#couponId').val()),
      fileUniqueId: $('#file').val(),
    },
  })
  .done(function (res) {
    _querying = false;
    $('#formBind button').text('灌码');
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
        $('#dataTable tbody').html('<tr><td colspan="7" align="center">暂无数据！</td></tr>');
        $('#pager').html('');
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);

        _(res.data.rows).forEach(function (item, key) {
          var date = new Date(item.createTime);
          item.createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
