'use strict;'

var common = require('common');
var _budgetSource = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('activity-cs');
  var urlParam = common.getUrlParam();
  if (urlParam.planId != undefined && urlParam.planId != '') {
    $('#search_planId').val(urlParam.planId);
    $('#formSearch').trigger('submit');
    $('#btn-create').attr('href', 'activity-unit-edit.html?planId=' + urlParam.planId);
  }

  //set search form
  getBudgetSource();

  $('#formSearch').trigger('submit');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  if ($.trim($('#search_id').val()) != '' && ~~$.trim($('#search_id').val()) == 0) {
    alert('[单元ID]必须是大于0的数字！');
    return false;
  }

  if ($.trim($('#search_planId').val()) != '' && ~~$.trim($('#search_planId').val()) == 0) {
    alert('[计划ID]必须是大于0的数字！');
    return false;
  }

  var sendData = {
    id: $.trim($('#search_id').val()),
    name: $.trim($('#search_name').val()),
    planId: $.trim($('#search_planId').val()),
    status: $('#search_status').val(),
    budgetStatus: $('#search_budgetStatus').val(),
    budgetSource: $('#search_budgetSource').val(),
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
    url: common.API_HOST + 'activity/activityList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (res.meta.result == true) {
      if (res.data.rows.length < 1) {
        var html = '<tr><td colspan="20" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
        $('#btn-export').prop('disabled', true);
      } else {
        useCache = true;
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
            case 2:
              value.statusName = '计划下线';
            break;
            default:
              value.statusName = '';
            break;
          }

          // switch (+value.budgetStatus) {
          //   case 1:
          //     value.budgetStatusName = '总预算不足';
          //   break;
          //   case 2:
          //     value.budgetStatusName = '日预算不足';
          //   break;
          //   case 3:
          //     value.budgetStatusName = '正常';
          //   break;
          //   default:
          //     value.budgetStatusName = '';
          //   break;
          // }
        });

        setTableData(res.data.rows);
        $('#btn-export').prop('disabled', false);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('change', '#search_level', function (event) {
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

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

$(document).on('click', '#btn-online-multi, #btn-offline-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  var queryStatusName = $(this).attr('id') == 'btn-online-multi' ? '上线' : '下线';
  if (window.confirm('确定要' + queryStatusName + '选中的单元吗？')) {
    var queryStatus = $(this).attr('id') == 'btn-online-multi' ? 1 : 0;
    var ids = [];
    var $checkedItems = $('.multi-check:checked');

    $checkedItems.each(function () {
      ids.push($(this).closest('tr').data('id'));
    });

    var ajaxUrl = queryStatus == 1 ? 'activity/activityOnline' : 'activity/activityOffline';
    $.ajax({
      url: common.API_HOST + ajaxUrl,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(ids),
    })
    .done(function (res) {
      if (res.meta.result == true) {
        $('#formSearch').trigger('submit');
        queryStatus == 1 ? alert('批量上线成功') : alert('批量下线成功');
        $('.multi-check-all').prop('checked', false);
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('click', '#btn-export', function (event) {
  event.preventDefault();
  var exportUrl = common.API_HOST + 'activity/exportActivities?' +
    'id=' + $.trim($('#search_id').val()) +
    '&name=' + $.trim($('#search_name').val()) +
    '&planId=' + $.trim($('#search_planId').val()) +
    '&status=' + $('#search_status').val() +
    '&budgetStatus=' + $('#search_budgetStatus').val() +
    '&budgetSource=' + $('#search_budgetSource').val() +
    '&pageSize=' + _pageSize +
    '&pageIndex=' + _pageIndex;
  window.location.href =  exportUrl;
});

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var $btn = $(this);
  var queryStatus = $btn.data('status') == 1 ? 0 : 1;
  var queryStatusName = queryStatus == 1 ? '上线' : '下线';
  if (window.confirm('确定要' + queryStatusName + '此单元吗？')) {
    var ids = [$btn.closest('tr').data('id')];
    var ajaxUrl = queryStatus == 1 ? 'activity/activityOnline' : 'activity/activityOffline';
    $.ajax({
      url: common.API_HOST + ajaxUrl,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(ids),
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
  if (window.confirm('确定要删除此单元吗？')) {
    $.ajax({
      url: common.API_HOST + 'activity/deleteActivity',
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
