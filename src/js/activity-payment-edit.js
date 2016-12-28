'use strict;'

var common = require('common');
var _budgetSource = [];
var _submitting = false;

// var _loginTypes = [CL:'掌上生活登录', UD: '一网通登录', UA: '一卡通登录', UC: '信用卡登录'];

$(function () {
  common.init('activity-payment');
  var urlParam = common.getUrlParam();
  if (urlParam.id != undefined && urlParam.id != '') {
    setEdit(urlParam.id);
  } else {
    setBudgetSource(false);
  }

  $('#beginDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#endDate').datetimepicker('setStartDate', startDate);
  });

  $('#endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#beginDate').datetimepicker('setEndDate', FromEndDate);
  });

  $('#formUnit').parsley().on('form:validated', function () {
    _submitting = false;
  });

});

//周期选择
$(document).on('click', '#repeatedDayAll', function (event) {
  if ($(this).prop('checked') == true) {
    $('input[name=repeatedDay]').prop('checked', true);
  } else {
    $('input[name=repeatedDay]').prop('checked', false);
  }

});

//成本中心
$(document).on('change click', '#level', function (event) {
  event.preventDefault();
  var level = $(this).val();
  if (level == undefined || level == '') {
    $('#budgetSource').html('<option value=""></option>');
  } else {
    var sources = [];
    _(_budgetSource).forEach(function (group, key) {
      if (level == key) {
        sources = group;
      }
    });

    if (sources.length < 1) {
      $('#budgetSource').html('<option value=""></option>');
      alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
    } else {
      var html = '';
      _(sources).forEach(function (source) {
        html += '<option value="' + source.id + '">' + source.sourceName + '</option>';
      });

      $('#budgetSource').html(html);
      $('#budgetSource').closest('.form-group').show();
    }
  }
});

$(document).on('click', '#formUnit button[type=submit]', function (event) {
  var dailyEffectiveBeginTime = $('#beginHH').val() + ':' + $('#beginMM').val() + ':' + $('#beginSS').val();
  var dailyEffectiveEndTime = $('#endHH').val() + ':' + $('#endMM').val() + ':' + $('#endSS').val();
  if (dailyEffectiveBeginTime > dailyEffectiveEndTime) {
    $('#error-dailytime').append('<ul class="parsley-errors-list filled"><li>开始时间不能大于结束时间！</li></ul>');
    $('#beginHH').focus();
    event.preventDefault();
    return false;
  } else {
    $('#error-dailytime').html('');
  }
});

//form
$(document).on('submit', '#formUnit', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  $('#formUnit input[type=submit]').prop('disabled', true).text('保存中...');

  var sendData = {
    type: $('#type').val(),
    name: $('#name').val().trim(),
    budgetSource: $('#budgetSource').val(),
    beginDate: $('#beginDate').val(),
    endDate: $('#endDate').val(),
    dailyEffectiveBeginTime: $('#beginHH').val() + ':' + $('#beginMM').val() + ':' + $('#beginSS').val(),
    dailyEffectiveEndTime: $('#endHH').val() + ':' + $('#endMM').val() + ':' + $('#endSS').val(),
    cinemaPageDesc: $('#cinemaPageDesc').val().trim(),
    activityIcon: $('#activityIcon').val().trim(),
    activityDesc: $('#activityDesc').val().trim(),
    activityRuleDesc: $('#activityRuleDesc').val().trim(),
    repeatedDay: [],
  };

  $('input[name=repeatedDay]:checked').each(function (index, el) {
    sendData.repeatedDay.push($(el).val());
  });

  sendData.repeatedDay = sendData.repeatedDay.join(',');

  var ajaxUrl = 'thdActivity/save';
  if ($('#id').size() > 0) {
    ajaxUrl = 'thdActivity/update';
    sendData.id = $('#id').val();
  }

  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    $('#formUnit input[type=submit]').prop('disabled', false).text('保存');
    if (!!~~res.meta.result) {
      if (ajaxUrl == 'thdActivity/update') {
        alert('更新成功！');
        document.location.reload(true);
      } else {
        alert('新建成功！');
        document.location = 'activity-payment.html';
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

function setBudgetSource(budgetSourceId) {
  $.ajax({
    url: common.API_HOST + 'common/budgetSourceList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _budgetSource = res.data;
      if (!!~~budgetSourceId) {
        var html = '';
        var levelId = 0;
        _(_budgetSource).forEach(function (group, key) {
          _(group).forEach(function (source) {
            if (budgetSourceId == source.id) {
              levelId = parseInt(key);
            }
          });
        });

        $('#level option').eq(1 + levelId).prop('selected', true);
        _(_budgetSource[levelId]).forEach(function (source) {
          if (budgetSourceId == source.id) {
            html += '<option value="' + source.id + '" selected>' + source.sourceName + '</option>';
          } else {
            html += '<option value="' + source.id + '">' + source.sourceName + '</option>';
          }
        });

        $('#budgetSource').html(html);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setEdit(id) {
  $('.breadcrumb li:last-child').text('编辑');
  $('h3').text('编辑活动单元:' + id);
  $.ajax({
    url: common.API_HOST + 'thdActivity/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: id },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var event = res.data;
      if (event == null || event == undefined) {
        alert('无法获取到该活动的信息，按F5刷新页面试试！');
        return false;
      }

      $('#formUnit').prepend('<input type="hidden" id="id" value="' + event.id + '">');
      $('#name').val(event.name).prop('disabled', true);
      $('#beginDate').val(event.startTime);
      $('#endDate').val(event.endTime);
      var dailyEffectBeginTime = event.dailyEffectiveBeginTime.split(':');
      $('#beginHH').val(dailyEffectBeginTime[0]);
      $('#beginMM').val(dailyEffectBeginTime[1]);
      $('#beginSS').val(dailyEffectBeginTime[2]);
      var dailyEffectEndTime = event.dailyEffectiveEndTime.split(':');
      $('#endHH').val(dailyEffectEndTime[0]);
      $('#endMM').val(dailyEffectEndTime[1]);
      $('#endSS').val(dailyEffectEndTime[2]);
      var repeatedDay = event.daySelected.split(',');
      _(repeatedDay).forEach(function (day) {
        $('input[name=repeatedDay]').eq(day - 1).prop('checked', true);
      });

      if (repeatedDay.length == 7) {
        $('#repeatedDayAll').prop('checked', true);
      }

      $('#cinemaPageDesc').val(event.cinemaPageDesc);
      $('#activityIcon').val(event.activityIcon);
      $('#activityDesc').val(event.activityDesc);
      $('#activityRuleDesc').val(event.activityRuleDesc);

      //成本中心
      if (event.budgetSourceType != '' && event.budgetSourceType != null && event.budgetSourceType != undefined) {
        setBudgetSource(event.budgetSourceType);
        $('#level,#budgetSource').prop('disabled', true);
      } else {
        setBudgetSource(false);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
