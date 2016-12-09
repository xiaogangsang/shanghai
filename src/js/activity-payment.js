/*
* @Author: kyle
* @Date:   2016-11-04 14:59:49
* @Last Modified by:   kyle
* @Last Modified time: 2016-11-04 16:29:04
*/

'use strict;'

var common = require('common');
var _budgetSource = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _searchCache = {};
var _useCache = false;

$(function () {
  common.init('activity-payment');
  getBudgetSource();

  $('#formSearch').trigger('submit');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();

  if (!!_querying) {
    return false;
  }

  _querying = true;

  var sendData = {
    pageIndex: _pageIndex,
    pageSize: _pageSize,
    id: $('#search_id').val().trim(),
    name: $('#search_name').val().trim(),
    budgetSource: $('#search_budgetSource').val(),
    status: $('#search_status').val(),
  };

  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'thdActivity/query',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (res.meta.result == 1) {
      if (res.data.rows.length < 1) {
        var html = '<tr><td colspan="7" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
      } else {
        _useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (value, key) {
          value.status = parseInt(value.status);
          switch (value.status) {
            case 1:
              value.statusName = '已上线';
            break;
            case 0:
              value.statusName = '已下线';
            break;
            default:
              value.statusName = '未知';
            break;
          }
        });

        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('change click', '#search_level', function (event) {
  event.preventDefault();
  var level = $(this).val();
  if (level == undefined || level == '') {
    $('#search_budgetSource').html('<option value="">全部</option>');
    $('#search_budgetSource').closest('.form-group').hide();
  } else {
    var sources = [];
    _(_budgetSource).forEach(function (group, key) {
      if (level == key) {
        sources = group;
      }
    });

    if (sources.length < 1) {
      $('#search_budgetSource').html('<option value="">全部</option>');
      $('#search_budgetSource').closest('.form-group').hide();
      alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
    } else {
      var html = '';
      _(sources).forEach(function (source) {
        html += '<option value="' + source.id + '">' + source.sourceName + '</option>';
      });

      $('#search_budgetSource').html(html);
      $('#search_budgetSource').closest('.form-group').show();
    }
  }
});

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var $tr = $(this).closest('tr');
  var queryStatus = $(this).data('status') == 1 ? 0 : 1;
  var queryStatusName = queryStatus == 1 ? '上线' : '下线';
  if (window.confirm('确定要' + queryStatusName + '此活动吗？')) {
    var ajaxUrl = queryStatus == 1 ? 'thdActivity/online' : 'thdActivity/offline';
    $.ajax({
      url: common.API_HOST + ajaxUrl,
      type: 'POST',
      dataType: 'json',
      data: { id: $tr.data('id') },
    })
    .done(function (res) {
      if (res.meta.result == true) {
        $('#formSearch').trigger('submit');
        alert(queryStatusName + '成功!');
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var $tr = $(this).closest('tr');
  if (window.confirm('确定要删除此活动吗？')) {
    $.ajax({
      url: common.API_HOST + 'thdActivity/delete',
      type: 'POST',
      dataType: 'json',
      data: { id: $tr.data('id') },
    })
    .done(function (res) {
      if (res.meta.result == true) {
        alert('删除成功！');
        $tr.fadeOut(500, function () {$tr.remove();});
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

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
  if ($('#pageNo').val() == '') {
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

function getBudgetSource() {
  $.ajax({
    url: common.API_HOST + 'activity/budgetSourceList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (res.meta.result == true) {
      _budgetSource = res.data;
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
