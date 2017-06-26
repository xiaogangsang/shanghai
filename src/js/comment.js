'use strict;'

var common = require('common');
var util = require('util');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('comment');
  util.init($);

  //set search form
  setChannel();

  $('#search_beginDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginDate').datetimepicker('setEndDate', FromEndDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginDate').datetimepicker('setEndDate', endDate);
  $('#search_endDate').datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    tel: $.trim($('#search_tel').val()),
    channelId: $('#search_channelId').val(),
    filmName: $.trim($('#search_filmName').val()),
    content: $.trim($('#search_content').val()),
    beginDate: $.trim($('#search_beginDate').val()),
    endDate: $.trim($('#search_endDate').val()),
    type: $('#search_commentType').val(),
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
    url: common.API_HOST + 'comment/commentList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (!res.data.rows || res.data.rows.length <= 0) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (value, key) {
          _(_channels).forEach(function (item) {
            if (value.channelId == item.channelId) {
              res.data.rows[key].channelName = item.channelName;
            }
          });
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

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  $('#formSearch').trigger('submit');
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

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此评论吗？')) {
    deleteComments([that.data('id')]);
  }

  return false;
});

$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  $('#popup-comment-offical').remove();
  var officalReply = $(this).data('offical-reply');
  var data = {id: $(this).parents('tr').data('id')};
  if (officalReply) {
    data['officalReply'] = officalReply;
  }
  var template = $('#comment-offical-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('body').append(html);
  $('#popup-comment-offical').modal('show');
});

$(document).on('submit', '#formOfficalReply', function(e) {
  e.preventDefault();
  id = $(e.target).data('id');

  var param = {
    ids: [id],
    channelId: $('#search_channelId').val(),
    officialReply: $('#form_officalReply').val(),
  };

  $.ajax({
    url: common.API_HOST + 'comment/commentUpdate',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(param),
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('编辑成功');
      $('#popup-comment-offical').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-delete-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  if (window.confirm('确定要删除选中的评论吗？')) {
    var commentIds = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function (index, el) {
      commentIds.push($(this).closest('tr').data('id'));
    });

    deleteComments(commentIds);
  }

  return false;
});


function deleteComments(ids) {

  var param = {
    ids: ids, 
    type: $('#search_commentType').val(), 
    channelId: $('#search_channelId').val()
  };

  $.ajax({
    url: common.API_HOST + 'comment/commentDelete',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(param),
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert('删除成功');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
      var html = '';
      $.each(_channels, function (index, item) {
        html += '<option value="' + item.channelId + '">' + item.channelName + '</option>';
      });

      $('#search_channelId').append(html);

      $('#formSearch').trigger('submit');
    }
  });
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
