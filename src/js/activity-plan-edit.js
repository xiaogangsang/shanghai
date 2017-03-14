/**
 * 该文件承载了四个职能
 * 1. 编辑活动计划
 * 2. 新增活动计划
 * 3. 编辑已提交审核的审核项
 * 4. 查看已提交的审核项
 */


'use strict;'

var common = require('common');
var util = require('util');
var _querying = false;
var _submitting = false;
var _budgetSource = null;
var urlParam = common.getUrlParam();
var ref = urlParam.ref ? urlParam.ref : 'activity-plan';

$(function () {

  var isViewing = location.pathname.indexOf('view.html') > -1;

  if (urlParam.hid) {
    // 历史
    setEdit(urlParam.hid, false, true);
    $('h3').text($('h3').text() + urlParam.hid);
    // $('li.active').text('查看');
    // 在"进件审核"中的查看和"我的进件列表"中的查看并无区别, 只是标题不同
    if (ref === 'approval-approve') {
      $('.breadcrumb').html('<li>审核中心</li><li>进件审核</li><li class="active">查看历史</li>');
    } else if (ref === 'approval-submitted') {
      $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">查看历史</li>');
    }
  } else if (urlParam.vid) {
    if (isViewing) {
      if (ref === 'approval-approve') {
        // 查看(为了审核)
        $('.breadcrumb').html('<li>审核中心</li><li>进件审核</li><li class="active">审核</li>');
        $('h3').text('审核活动计划: ' + urlParam.vid);
        $('#formRemark').show();
      } else if (ref === 'approval-submitted') {
        // 查看(我的进件列表(当状态为审核中时不可编辑))
        $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">查看</li>');
        $('h3').text('查看活动计划: ' + urlParam.vid);
      }
    } else {
      // 审核的编辑
      ref = 'approval-submitted';
      $('h3').text($('h3').text() + urlParam.vid);
      $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">编辑</li>');
    }

    setEdit(urlParam.vid, true);
  } else if (urlParam.id != undefined && urlParam.id != '') {
    // 编辑
    setEdit(urlParam.id);
    urlParam.typeCode = 1;

    $('h3').text($('h3').text() + urlParam.id);
  } else {
    // 新增
    $('.breadcrumb li:last-child').text('新增');
    $('h3').text('新增活动计划');
    $('.btn-save').show();

    $('form button[type=submit]').prop('disabled', false);
    setModal();
  }

  common.init(ref);

  // 是的, 就是这么粗暴, 来咬我啊
  if (isViewing) {
    setInterval(function(){
      $('#contentForm :input').prop('disabled', true);
    }, 100);
  }
});

function setEdit(id, isApproval, isHistory) {
  var url;
  if (isHistory) {
    url = 'verification/historyDetail';
  } else if (isApproval) {
    url = 'verification/detail';
  } else {
    url = 'plan/planDetail';
  }

  $.ajax({
    url: common.API_HOST + url,
    type: 'POST',
    dataType: 'json',
    data: { id: id },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (isApproval) {
        for (var key in res.data.data) {
          if (res.data.data.hasOwnProperty(key)) {
            res.data[key] = res.data.data[key].val;
            // res.data.data[key].edited = true;
          }
        }
      } else if (isHistory) {
        res.data = res.data.data;
        res.data.data = common.clone(res.data);
      } else {
        res.data.data = common.clone(res.data);
      }

      // 为了代码方便, 不再判断要不要进行高亮操作, 这里把不需要判断的情况的edited全是undefined, 这样就不会高亮
      for (var key in res.data.data) {
        if (res.data.data.hasOwnProperty(key) && res.data.data[key] == null) {
          res.data.data[key] = {};
        }
      }

      setModal(res.data);

      $('#popup-plan-form #level').trigger('change', res.data.budgetSourceId, res.data.assessor);

      getHistory();

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

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

$(document).on('click', "form button[type=submit]", function() {
    $("button[type=submit]", $(this).parents("form")).removeAttr("clicked");
    $(this).attr("clicked", "true");
});

// 审核/驳回
$(document).on('submit', '#formRemark', function(event) {
  event.preventDefault();

  if (_submitting) {
    return false;
  }

  _submitting = true;

  var id = urlParam.vid;
  var accept = $('#formRemark button[type=submit][clicked=true]').hasClass('btn-approval') ? 1 : 0;

  $.ajax({
    url: common.API_HOST + 'verification/doCheck',
    type: 'POST',
    dataType: 'json',
    data: {id: id, accept: accept, remark: $('#remark-input').val()}
  })
  .done(function (res) {

    _submitting = false;
    if (!!~~res.meta.result) {
      alert('操作成功! 点击 "确定" 关闭本页面');
      util.close();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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
  var ajaxUrl, tips;

  if ($('#popup-plan-form button[type=submit][clicked=true]').hasClass('btn-approval')) {
    if (urlParam.vid) {
      ajaxUrl = 'plan/updateAndSubmitVerification';
    } else {
      ajaxUrl = 'plan/saveAndSubmitVerification';
    }
    tips = '提交成功, 审核进度可到 "我的进件列表" 查看. \n点击 "确定" 关闭本页面';
  } else {
    // 
    ajaxUrl = 'plan/saveVerification';
    tips = '保存成功, 可到 "我的进件列表" 查看或编辑. \n点击 "确定" 关闭本页面';
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
      alert(tips);
      window.open(document.URL,'_self','resizable=no,top=-245,width=250,height=250,scrollbars=no');
      window.close();
      // close();

      // $('#popup-plan-form').modal('hide');
      // $('#formSearch').trigger('submit');
      $('#popup-plan-form button[type=submit]').prop('disabled', false);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

// 选择成本中心类别
// 
$(document).on('change mouseup', '#level', function (event, budgetSourceId, assessor) {
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

      if (!sources || sources.length < 1) {
        $('#budgetSource, #assessor').html('<option value=""></option>');
        // alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
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
$(document).on('change mouseup', '#budgetSource', function (event, assessor) {

  event.preventDefault();
  var budgetSourceId = $(this).val();

  if (!budgetSourceId || !$('#assessor').length) return;

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
      console.log('getAssessor出错');
      // alert('接口错误：' + res.meta.msg);
      $('#assessor').html('<option value=""></option>');
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

      // $('#level > option').each(function() {
      //   if (this.value && !_budgetSource[this.value]) {
      //     $(this).remove();
      //   }
      // });

      if (callback) {
        callback();
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

// 历史记录
var getHistory = function() {
  if (urlParam.id !== undefined && urlParam.typeCode !== undefined) {

    var url = 'verification/history';
    
    $.ajax({
      url: common.API_HOST + url,
      type: 'POST',
      dataType: 'json',
      data: { id: urlParam.id, typeCode: urlParam.typeCode },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        var template = $('#history-template').html();
        Mustache.parse(template);
        res.data.url = 'activity-plan-view.html';
        res.data.ref = ref;
        var html = Mustache.render(template, res.data);
        $('section').after(html);
      } else {
        alert('获取编辑历史失败: ' + res.meta.msg);
      }
    });
  }
};

