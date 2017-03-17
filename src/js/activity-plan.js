'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('activity-plan');

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

          // switch (value.budgetStatus) {
          //   case '1':
          //     value.budgetStatusName = '总预算不足';
          //   break;
          //   case '2':
          //     value.budgetStatusName = '日预算不足';
          //   break;
          //   case '3':
          //     value.budgetStatusName = '正常';
          //   break;
          //   default:
          //     value.budgetStatusName = '';
          //   break;
          // }
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
  return;
  e.preventDefault();
  setModal(false);
  $('#popup-plan-form').modal('show');
  $('#popup-plan-form form').parsley();
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  return;
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
      // TODO: 
      // res.data.budgetSourceId = 176;
      // 编辑里不需要
      // res.data.assessor = 19552;
      $('#popup-plan-form #level').trigger('change', res.data.budgetSourceId, res.data.assessor);
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

$(document).on('click', "#popup-plan-form button[type=submit]", function() {
    $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
    $(this).attr("clicked", "true");
});

$(document).on('submit', '#popup-plan-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }
  _submitting = true;
  $('#popup-plan-form button[type=submit]').prop('disabled', true).text('处理中...');
  var sendData = {
    name: $.trim($('#popup-plan-form #name').val()),
    dailyAmount: $('#popup-plan-form #dailyAmount').val(),
    dailyTicket: $('#popup-plan-form #dailyTicket').val(),
    totalAmount: $('#popup-plan-form #totalAmount').val(),
    totalTicket: $('#popup-plan-form #totalTicket').val(),
  };

  // TODO:
  var ajaxUrl = (($('#popup-plan-form button[type=submit][clicked=true]').hasClass('btn-approval')) ? 'plan/saveAndSubmitVerification' : 'plan/saveVerification');

  var isUpdate = ($('#popup-plan-form #id').size() > 0);

  if (isUpdate) {
    sendData.id = $('#popup-plan-form #id').val();
    // ajaxUrl = 'plan/updatePlan';
  }

  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if (isUpdate) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-plan-form').modal('hide');
      $('#formSearch').trigger('submit');
      $('#popup-plan-form button[type=submit]').prop('disabled', false).text('保存');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

/******************************************** detail ********************************************/

// 选择成本中心类别
// 
$(document).on('change mouseup', '#level', function (event, budgetSourceId, assessor) {
  event.preventDefault();

  var budgetSourceTypeId;

  if (budgetSourceId) {
    _(_budgetSource).forEach(function(group, key) {
      var found = false;

      _(group).forEach(function(obj) {
        if (obj.id == budgetSourceId) {
          found = true;
          return;
        }
      });

      if (found) {
        budgetSourceTypeId = key;
        return;
      }
    });

    $('#level option[value=' + budgetSourceTypeId + ']').prop('selected', true);
  }

  var level = budgetSourceTypeId ? budgetSourceTypeId : $(this).val();

  if (level == undefined || level == '') {
    $('#budgetSource').html('<option value=""></option>');
  } else {
    var sources = _budgetSource[level];

    if (sources.length < 1) {
      $('#budgetSource').html('<option value=""></option>');
      alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
    } else {
      var html = '';
      _(sources).forEach(function (source) {
        var selected = source.id == budgetSourceId ? 'selected' : '';
        html += '<option value="' + source.id + '"' + selected + '>' + source.sourceName + '</option>';
      });

      $('#budgetSource').html(html);
      $('#budgetSource').closest('.form-group').show();
      $('#budgetSource').trigger('change', assessor);
    }
  }
});

// 选择成本中心
$(document).on('change mouseup', '#budgetSource', function (event, assessor) {
  event.preventDefault();
  var budgetSourceId = $(this).val();

  if (!budgetSourceId) return;

  // TODO:
  $.ajax({
    url: common.API_HOST + 'verification/getAssessor',
    type: 'GET',
    dataType: 'json',
    data:{budgetSourceId: budgetSourceId}
  })
  .done(function (res) {
    console.log(budgetSourceId);
    // var res = JSON.parse('{  "meta": {    "result": "1",    "msg": "操作成功"  },  "data": [    {      "id": 19552,      "createdBy": "admin",      "createdDate": null,      "updatedBy": null,      "updatedDate": null,      "loginId": null,      "password": null,      "enabled": "1",      "realName": "樊坤",      "city": null,      "department": "o2o",      "mobile": null,      "email": null,      "roles": null    }  ]}');
    if (!!~~res.meta.result) {
      var html = '';
      _(res.data).forEach(function(obj) {
        var selected = obj.id == assessor ? 'selected' : '';
        html += '<option value="' + obj.id + '"' + selected + '>' + obj.realName + '</option>';
      });
      $('#assessor').html(html);
    } else {
      console.log('getAssessor出错');
      // alert('接口错误：' + res.meta.msg);
    }
  });
});

function getBudgetSource(budgetSourceId) {
  $.ajax({
    url: common.API_HOST + 'common/budgetSourceList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _budgetSource = res.data;
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
