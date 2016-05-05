'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('activity-plan');
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
    alert('[计划ID]必须是大于0的数字！');
    return false;
  }

  var sendData = {
    id: $.trim($('#search_id').val()),
    name: $.trim($('#search_name').val()),
    status: $('#search_status').val(),
    budgetStatus: $('#search_budgetStatus').val(),
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
    url: common.API_HOST + 'plan/planList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        var html = '<tr><td colspan=`"9" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (value, key) {
          value.status = parseInt(value.status);
          value.statusName = value.status == 1 ? '已上线' : '已下线';
          switch (value.budgetStatus) {
            case '1':
              value.budgetStatusName = '总预算不足';
            break;
            case '2':
              value.budgetStatusName = '日预算不足';
            break;
            case '3':
              value.budgetStatusName = '正常';
            break;
            default:
              value.budgetStatusName = '';
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

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var $btn = $(this);
  var sendData = {
    id: $btn.closest('tr').data('id'),
    status: $btn.data('status') == 1 ? 0 : 1,
  };
  $.ajax({
    url: common.API_HOST + 'plan/updatePlanStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var statusName = sendData.status == 1 ? '上线' : '下线';
      var btnStatusName = sendData.status == 1 ? '下线' : '上线';
      $btn.data('status', sendData.status).html(btnStatusName);
      $btn.closest('tr').find('td:nth-child(3)').html('已' + statusName);
      alert(statusName + '操作成功!');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  if (window.confirm('确定要删除此计划吗？')) {
    $.ajax({
      url: common.API_HOST + 'plan/deletePlan',
      type: 'POST',
      dataType: 'json',
      data: { id: tr.data('id') },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        tr.fadeOut(500, function () {
          tr.remove();
        });
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

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

// 直接输入页码页面跳转
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

// 新增
$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  setModal(false);
  $('#popup-plan-form').modal('show');
  $('#popup-plan-form form').parsley();
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'plan/planDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      setModal(res.data);
      $('#popup-plan-form').modal('show');
      $('#popup-plan-form form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

function setModal(planData) {
  var template;
  var html;

  if (planData) {
    template = $('#edit-template').html();
    Mustache.parse(template);
    var data = { plan: planData };
    html = Mustache.render(template, data);
    $('#popup-plan-form .modal-title').html('编辑活动计划');
  } else {
    template = $('#create-template').html();
    $('#popup-plan-form .modal-title').html('新增活动计划');
    Mustache.parse(template);
    html = Mustache.render(template);
  }

  $('#popup-plan-form .modal-body').html(html);
}

$(document).on('submit', '#popup-plan-form form', function (e) {
  e.preventDefault();
  var sendData = {
    name: $.trim($('#popup-plan-form #name').val()),
    dailyAmount: $('#popup-plan-form #dailyAmount').val(),
    dailyTicket: $('#popup-plan-form #dailyTicket').val(),
    totalAmount: $('#popup-plan-form #totalAmount').val(),
    totalTicket: $('#popup-plan-form #totalTicket').val(),
  };

  var ajaxUrl = common.API_HOST + 'plan/savePlan';

  var isUpdate = ($('#popup-plan-form #id').size() > 0);

  if (isUpdate) {
    sendData.id = $('#popup-plan-form #id').val();
    ajaxUrl = common.API_HOST + 'plan/updatePlan';
  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (isUpdate) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-plan-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});
