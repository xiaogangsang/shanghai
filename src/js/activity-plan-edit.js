/**
 * 该文件承载了四个职能
 * 1. 编辑活动计划
 * 2. 新增活动计划
 * 3. 编辑已提交审核的审核项
 * 4. 查看已提交的审核项
 */


'use strict;'

var common = require('common');
var _querying = false;
var _submitting = false;
var _budgetSource = null;
var urlParam = common.getUrlParam();

$(function () {

  if (urlParam.id != undefined && urlParam.id != '') {
    // 编辑
    common.init('activity-plan');
    $.ajax({
      url: common.API_HOST + 'plan/planDetail',
      type: 'POST',
      dataType: 'json',
      data: { id: urlParam.id },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        setModal(res.data);
        // TODO: 
        // res.data.budgetSourceId = 176;
        // 编辑里不需要
        // res.data.assessor = 19552;
        $('#popup-plan-form #level').trigger('change', res.data.budgetSourceId, res.data.assessor);

      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });

    $('h3').text($('h3').text() + urlParam.id);
  } else if (urlParam.vid) {
    // 审核
    common.init('approval-submitted');
    $('.btn-save').hide();

    $.ajax({
      url: common.API_HOST + 'verification/detail',
      type: 'POST',
      dataType: 'json',
      data: { id: urlParam.vid },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        setModal(res.data.data);
        // TODO: 
        // res.data.budgetSourceId = 176;
        // 编辑里不需要
        // res.data.assessor = 19552;
        $('#popup-plan-form #level').trigger('change', res.data.budgetSourceId, res.data.assessor);

      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });

    $('h3').text($('h3').text() + urlParam.vid);

    $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">编辑</li>');
  } else {
    // 新增
    common.init('activity-plan');
    $('.breadcrumb li:last-child').text('新增');
    $('h3').text('新增活动计划');

    $('form button[type=submit]').prop('disabled', false);


  }

  setModal();
});

function setModal(planData) {
  var template;
  var html;

  if (planData) {
    template = $('#edit-template').html();
    Mustache.parse(template);
    var data = { plan: planData };
    html = Mustache.render(template, data);
  } else {
    template = $('#edit-template').html();
    Mustache.parse(template);
    html = Mustache.render(template, {plan: '1'});
  }

  $('.modal-body').html(html);

  $('#popup-plan-form form').parsley();
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

  $('#popup-plan-form button[type=submit]').prop('disabled', true);
  var sendData = {
    name: $.trim($('#popup-plan-form #name').val()),
    dailyAmount: $('#popup-plan-form #dailyAmount').val(),
    dailyTicket: $('#popup-plan-form #dailyTicket').val(),
    totalAmount: $('#popup-plan-form #totalAmount').val(),
    totalTicket: $('#popup-plan-form #totalTicket').val(),
    budgetSourceType: $('#popup-plan-form #budgetSource').val(),
    operator: $('#assessor').val(),
    vid: urlParam.vid
  };

  // TODO:
  var ajaxUrl;

  if ($('#popup-plan-form button[type=submit][clicked=true]').hasClass('btn-approval')) {
    if (urlParam.vid) {
      ajaxUrl = 'plan/updateAndSubmitVerification';
    } else {
      ajaxUrl = 'plan/saveAndSubmitVerification';
    }
  } else {
    // 
    ajaxUrl = 'plan/saveVerification';
  }
  // var ajaxUrl = 'plan/savePlan';

  var isUpdate = ($('#popup-plan-form #id').val().length > 0);

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
      alert('提交成功！');

      $('#popup-plan-form').modal('hide');
      $('#formSearch').trigger('submit');
      $('#popup-plan-form button[type=submit]').prop('disabled', false);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

// 选择成本中心类别
// 
$(document).on('change', '#level', function (event, budgetSourceId, assessor) {
  event.preventDefault();

  var callback = function() {

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

    var level = budgetSourceTypeId ? budgetSourceTypeId : $('#level').val();

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
  };

  if (_budgetSource) {
    callback();
  } else {
    getBudgetSource(callback);
  }
});

// 选择成本中心
$(document).on('change', '#budgetSource', function (event, assessor) {
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
      _(res.data.rows).forEach(function(obj) {
        var selected = obj.id == assessor ? 'selected' : '';
        html += '<option value="' + obj.id + '"' + selected + '>' + obj.realName + '</option>';
      });
      $('#assessor').html(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

function getBudgetSource(callback) {
  $.ajax({
    url: common.API_HOST + 'common/budgetSourceList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _budgetSource = res.data;
      if (callback) {
        callback();
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}