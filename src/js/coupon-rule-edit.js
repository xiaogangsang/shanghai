'use strict;'

var common = require('common');
var util = require('util');
require('fineUploader');

var _budgetSource = [];
var _wandaTicket = [];
var _movies = [];
var _configType = [
  { name: '2D' },
  { name: '3D' },
  { name: '4D' },
  { name: 'IMAX' },
  { name: '巨幕' },
  { name: 'VIP' },
];
var _channels = [];
var _provinces = [];
var _submitting = false;
var _popupDataCache = {
  channels: [],
  configType: [],
  films: [],
  cinemas: [],
  timetables: [],
};

var urlParam = common.getUrlParam();
var ref = urlParam.ref ? urlParam.ref : 'coupon-rule';
var isViewing;


// 渠道判断混乱，这里打个补丁
// 主要原因是 channelList 接口返回的 channelId 是数值型
// 其他接口返回的渠道有的是用字符串型（注意这里是“有的是”，也就是说我们不确定是字符串还是数值，所以把 _channels的 id 存为字符串也是不行的），
// 造成 indexOf 函数无法判断(indexOf 是严格判断 === )
// 解决方案是 array 的 indexOf 不再区分字符串和数字
var backup = Array.prototype.indexOf;
Array.prototype.indexOf = function(value) {
  var originalIndex = backup.call(this, value);
  if (originalIndex < 0) {
    var intIndex = backup.call(this, parseInt(value));
    if (intIndex < 0) {
      return backup.call(this, value + '');
    }

    return intIndex;
  }

  return originalIndex;
}

$(function () {

  setProvince();
  setBrand();

  isViewing = location.pathname.indexOf('view.html') > -1;

  if (urlParam.hid) {
    setEdit(urlParam.hid, false, true);
    $('h3').text($('h3').text() + urlParam.hid);
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
        $('h3').text('审核优惠券规则: ' + urlParam.vid);
        $('#formRemark').show();
      } else if (ref === 'approval-submitted') {
        // 查看(我的进件列表(当状态为审核中时不可编辑))
        $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">查看</li>');
        $('h3').text('查看优惠券规则: ' + urlParam.vid);
      }
    } else {
      // 审核的编辑
      ref = 'approval-submitted';

      $('.breadcrumb').html('<li>审核中心</li><li>我的进件列表</li><li class="active">编辑</li>');
      $('h3').text($('h3').text() + urlParam.vid);
    }

    setEdit(urlParam.vid, true);
  } else if (urlParam.couponId != undefined && urlParam.couponId != '') {
    // 编辑
    setEdit(urlParam.couponId);
    urlParam.id = urlParam.couponId;
    urlParam.typeCode = 2;
    $('h3').text($('h3').text() + urlParam.couponId);
  } else {
    // 新增
    $('.breadcrumb li:last-child').text('新增');
    $('h3').text('新增优惠券');
    $('.btn-save').show();
    // setWandaTicket(false);
    setBudgetSource(false);
    setMovie(false);
    setChannel(false);

    $('#formEdit button[type=submit]').prop('disabled', false);
  }

  common.init(ref);

  // 是的, 就是这么粗暴, 来咬我啊
  if (isViewing) {
    setInterval(function(){
      $('#formUnit :input:not(.btn-limit-cinema)').prop('disabled', true);
    }, 100);
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

  $('#movieSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#movieSelect_to',
    rightAll: '#movieSelect_all',
    rightSelected: '#movieSelect_right',
    leftSelected: '#movieSelect_left',
    leftAll: '#movieSelect_none',
  });

  $('#formEdit').parsley().on('form:validated', function () {
    _submitting = false;
  });

  //upper of range
  window.Parsley.addValidator('ur', {
    validateString: function (value, requirement) {
      var $inputs = $('input.parsley-range');
      var fields = [];
      $inputs.each(function (index, el) {
        var ns = $(this).data('parsley-ur');
        if (ns == requirement) {
          var value = parseFloat($(el).val());
          fields.push(value);
        }
      });

      if (~~fields[0] == 0 || ~~fields[1] == 0) {
        return true;
      } else {
        return fields[0] < fields[1];
      }
    },

    priority: 32,
    messages: {
      en: 'This value should be the upper limit of the range.',
      'zh-cn': '范围的下限与上限设置错误。',
    },
  });

  var uploader = new qq.FineUploaderBasic({
    button: $('#fileupload')[0],
    request: {
      endpoint: common.API_HOST + 'coupon/uploadImage',
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
          $('#imageUrl').val(responseJSON.data.savePath);
          alert('上传成功！');
        } else {
          alert('接口错误：' + responseJSON.meta.msg);
        }
      },
    },
  });
});

//优惠券有效期类型
$(":radio").click(function(){
   setDateType($(this).val() == 'duration');
});
function setDateType(isDuration) {
  if(isDuration){
    $('#couponType_fixDate_begin').hide();
    $('#beginDate').val('');
    $('#couponType_fixDate_end').hide();
    $('#endDate').val('');
    $('#couponType_duration').show();
  }else{
    $('#couponType_fixDate_begin').show();
    $('#couponType_fixDate_end').show();
    $('#couponType_duration').hide();
    $('#effectiveDays').val('');
  }

  $('#beginDate').prop('required', !isDuration);
  $('#endDate').prop('required', !isDuration);
  $('#effectiveDays').prop('required', isDuration);

}
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

    if (!sources || sources.length < 1) {
      $('#budgetSource, #assessor').html('<option value=""></option>');
      // alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
    } else {
      var html = '';
      _(sources).forEach(function (source) {
        html += '<option value="' + source.id + '">' + source.sourceName + '</option>';
      });

      $('#budgetSource').html(html);
      $('#budgetSource').closest('.form-group').show();
    }
  }

  // 卡部预付款只能选择万达
  $('input[type=checkbox][name=advancePayment][value!=WANDA]').prop('checked', false).prop('disabled', (level == 3));

  $('#budgetSource').trigger('change');
});

//渠道
$(document).on('click', '#btn-set-channel', function (event) {
  event.preventDefault();
  setChannel(_popupDataCache.channels);
  var data = { channels: _channels };
  var template = $('#channel-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-unit-channel .modal-body').html(html);
  $('#popup-unit-channel').modal('show');
  $('#popup-unit-channel form').parsley();
});

$(document).on('submit', '#popup-unit-channel form', function (event) {
  event.preventDefault();
  _popupDataCache.channels = $('input[name=channels]:checked').map(function () {return ~~$(this).val();}).get();
  var previewHtml = _popupDataCache.channels.length == _channels.length ? '不限' : $('input[name=channels]:checked').map(function () {return $(this).next('span').text();}).get().join('、');
  $('#preview-channel').html(previewHtml);
  $('#popup-unit-channel').modal('hide');
  return false;
});

//影片
$(document).on('click', '#btn-set-movie', function (event) {
  event.preventDefault();
  var html = '';
  var choosedHtml = '';
  _(_movies).forEach(function (movie) {
    if (_popupDataCache.films != null && _popupDataCache.films.indexOf(movie.filmId) > -1) {
      choosedHtml += '<option value="' + movie.filmId + '">' + movie.filmName + '</option>';
    } else {
      html += '<option value="' + movie.filmId + '">' + movie.filmName + '</option>';
    }
  });

  $('#movieSelect').html(html);
  $('#movieSelect_to').html(choosedHtml);
  $('#popup-unit-movie').modal('show');
});

$(document).on('click', '#popup-unit-movie button[type=submit]', function (event) {
  $('.multi-selection select:eq(1) option').prop('selected', true);
});

$(document).on('submit', '#popup-unit-movie form', function (event) {
  event.preventDefault();
  var previewHtml = '';
  if ($('#movieSelect_to option').length > 0) {
    _popupDataCache.films = $('#movieSelect_to option').map(function () {return ~~$(this).val();}).get();
    previewHtml = $('#movieSelect_to option').map(function () {return $(this).val() + '[' + $(this).text() + ']';}).get().join(' ');
  } else {
    _popupDataCache.films = [];
    previewHtml = '不限';
  }

  $('#preview-movie').html(previewHtml);
  $('#popup-unit-movie').modal('hide');
  return false;
});

//制式
$(document).on('click', '#btn-set-dimen', function (event) {
  event.preventDefault();
  _(_configType).forEach(function (dimen) {
    dimen.checked = true;
    if (_popupDataCache.configType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    }
  });

  var data = { configType: _configType };
  var template = $('#dimen-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-unit-dimen .modal-body').html(html);
  $('#popup-unit-dimen').modal('show');
  $('#popup-unit-dimen form').parsley();
});

$(document).on('submit', '#popup-unit-dimen form', function (event) {
  event.preventDefault();
  _popupDataCache.configType = $('input[name=configType]:checked').map(function () {return $(this).next('span').text();}).get();
  var previewHtmlConfigType = _popupDataCache.configType.length < 1 ? '不限' : '[' + _popupDataCache.configType.join('] [') + ']';
  $('#preview-dimen').html(previewHtmlConfigType);
  $('#popup-unit-dimen').modal('hide');
  return false;
});

//影院
$(document).on('click', '#btn-set-cinema', function (event) {
  event.preventDefault();
  showLimitCinamesPanel(_popupDataCache.cinemas, isViewing, function(chosenCinemas) {
    _popupDataCache.cinemas = chosenCinemas;

    var previewHtml = chosenCinemas.length > 0 ? '选择了 ' + chosenCinemas.length + ' 个影院' : '不限';
    $('#preview-cinema').html(previewHtml);
  });

  $('#popup-unit-cinema .modal-title').text('影院限制');
});

//影院黑名单
$(document).on('click', '#btn-set-black-cinema', function (event) {
  event.preventDefault();
  showLimitCinamesPanel(_popupDataCache.blackCinemas, isViewing, function(chosenCinemas) {
    _popupDataCache.blackCinemas = chosenCinemas;

    var previewHtml = chosenCinemas.length > 0 ? '选择了 ' + chosenCinemas.length + ' 个影院' : '不限';
    $('#preview-black-cinema').html(previewHtml);
  });
  $('#popup-unit-cinema .modal-title').text('影院黑名单');
});

function showLimitCinamesPanel(cinemas, readonly, completion) {
  cinemas = cinemas || [];
  $('#search-cinema-brandId option ,#search-cinema-provinceId option').prop('selected', false);
  $('#search-cinema-cityId').html('<option value="">城市</option>').chosen('destroy').chosen();
  $('#search-cinema-candidate tbody, #search-cinema-choosed tbody').html('');
  $('#input-cinema-filter, #search-cinema-cinemaName').val('');
  if (cinemas != null && cinemas.length > 0) {
    var html = '';
    _(cinemas).forEach(function (cinema) {
      html += '<tr data-id="' + cinema.cinemaId + '"><td>' + cinema.cinemaName + '</td><td>' + cinema.cityName + '</td><td>' + cinema.brandName + '</td></tr>';
    });

    $('#search-cinema-choosed tbody').html(html);
    $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  }

  $('#popup-unit-cinema').modal('show');
  $('#choosedCount').text(cinemas.length);
  if (readonly) {
    $('#popup-unit-cinema form button:not(#btn-cinema-filter):not(.close)').prop('disabled', true);
  }

  $('#popup-unit-cinema form').off('submit').on('submit', function (event) {
    event.preventDefault();
    chosenCinemas = $('#search-cinema-choosed tbody tr').map(function () {
      var cinema = {
        cinemaId: $(this).data('id'),
        cinemaName: $(this).find('td:nth-child(1)').html(),
        cityName: $(this).find('td:nth-child(2)').html(),
        brandName: $(this).find('td:nth-child(3)').html(),
      };
      return cinema;
    }).get();
    
    $('#popup-unit-cinema').modal('hide');

    if (completion) {
      completion(chosenCinemas);
    }

    return false;
  });
}

$(document).on('change click', '#search-cinema-provinceId', function (e) {
  var provinceId = parseInt($(this).val());
  var options = '';
  if (!!+provinceId) {
    var province = _.find(_provinces, { provinceId: provinceId.toString() });
    var cityList = province.cityList;
    _(cityList).forEach(function (value, key) {
      options += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
    });
  } else {
    options = '<option value="">城市</option>';
  }

  $('#search-cinema-cityId').html(options).chosen('destroy').chosen();
  return false;
});

$(document).on('click', '#btn-search-cinema', function (event) {
  event.preventDefault();
  var sendData = {
    brandId: $('#search-cinema-brandId').val(),
    cityId: $('#search-cinema-cityId').val(),
    cinemaName: $.trim($('#search-cinema-cinemaName').val()),
    associationStatus: 1,
    onlineStatus: 1,
    pageIndex: 1,
    pageSize: 9999,
  };
  if (sendData.brandId == '' && sendData.cityId == '') {
    alert('院线或城市，请至少选择一个！');
    $('#search-cinema-brandId').focus();
    return false;
  }

  $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查询中，请稍等...</td></tr>');
  $.ajax({
    url: common.API_HOST + 'common/cinemas',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data.rows.length <= 0) {
        $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
        return false;
      }

      var html = '';
      _(res.data.rows).forEach(function (cinema) {
        html += '<tr data-id="' + cinema.id + '"><td>' + cinema.name + '</td><td>' + cinema.cityName + '</td><td>' + cinema.brandName + '</td></tr>';
      });

      $('#search-cinema-candidate tbody').html(html);
    } else {
      $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#search-cinema-candidate tbody tr, #search-cinema-choosed tbody tr', function (event) {
  event.preventDefault();
  $(this).toggleClass('selected');
});

$(document).on('click', '#search-cinema-add-all', function (event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function (index, el) {
    choosedIds.push($(el).data('id'));
  });

  $('#search-cinema-candidate tbody tr').each(function (index, el) {
    if (choosedIds.indexOf($(el).data('id')) == -1) {
      $(el).clone().appendTo('#search-cinema-choosed tbody').removeClass('selected');
    }
  });

  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#search-cinema-add', function (event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function (index, el) {
    choosedIds.push($(el).data('id'));
  });

  $('#search-cinema-candidate tbody tr.selected').each(function (index, el) {
    if (choosedIds.indexOf($(el).data('id')) == -1) {
      $(el).clone().appendTo('#search-cinema-choosed tbody').removeClass('selected');
    }
  });

  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#search-cinema-remove-all', function (event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text('0');
});

$(document).on('click', '#search-cinema-remove', function (event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr.selected').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#btn-cinema-filter', function (event) {
  event.preventDefault();
  $('#input-cinema-filter').val('');
  $('#search-cinema-choosed tbody tr').show();
});

//场次
$(document).on('click', '#btn-set-timetable', function (event) {
  event.preventDefault();
  var html = '';
  _(_popupDataCache.timetables).forEach(function (time) {
    html += '<tr><td><input type="text" class="form-control beginDate" required value="' + time.beginDate + '"></td><td><input type="text" class="form-control endDate" required value="' + time.endDate + '"></td><td><input type="text" class="form-control beginTime" required value="' + time.beginTime + '"></td><td><input type="text" class="form-control endTime" required value="' + time.endTime + '"></td><td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td></tr>';
  });

  $('#timeTable tbody').html(html);
  resetTimeTable();
  $('#popup-unit-timetable').modal('show');
  $('#popup-unit-timetable form').parsley();
});

$(document).on('click', '#btn-timetable', function (event) {
  event.preventDefault();
  var template = $('#timetable-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#timeTable tbody').append(html);
  $('#popup-unit-timetable').scrollTop($('#popup-unit-timetable').height());
  resetTimeTable();
});

$(document).on('click', '#timeTable .btn-delete', function (event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条场次限制吗？')) {
    $(this).closest('tr').remove();
  }
});

$(document).on('submit', '#popup-unit-timetable form', function (event) {
  event.preventDefault();
  _popupDataCache.timetables = $('#timeTable tbody tr').map(function () {
    var time = {
      beginDate: $(this).find('.beginDate').val(),
      endDate: $(this).find('.endDate').val(),
      beginTime: $(this).find('.beginTime').val(),
      endTime: $(this).find('.endTime').val(),
    };
    return time;
  }).get();
  setTimeTable(_popupDataCache.timetables);
  var previewHtml = '';
  if (_popupDataCache.timetables.length > 0) {
    _(_popupDataCache.timetables).forEach(function (time) {
      previewHtml += '<p>' + time.beginDate + ' ~ ' + time.endDate + ' 每天 ' + time.beginTime + ' ~ ' + time.endTime + '</p>';
    });

    $('#preview-timetable').html(previewHtml);
  } else {
    $('#preview-timetable').html('不限');
  }

  $('#popup-unit-timetable').modal('hide');
  return false;
});

$(document).on('change click', '#couponPattern', function (event) {
  event.preventDefault();
  var current = +$(this).val();
  switch (current) {
    case 1:
    case 3:
      $('#amount').attr('data-parsley-pattern', '^0|[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('#limitNum').prop({ disabled: false, required: true });
      $('#typeTable th:nth-child(3)').text('单张票价区间（最低）');
      $('#typeTable th:nth-child(4)').text('单张票价区间（最高）');
    break;
    case 4:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('#limitNum').prop({ disabled: false, required: true });
      $('#typeTable th:nth-child(3)').text('单张票价区间（最低）');
      $('#typeTable th:nth-child(4)').text('单张票价区间（最高）');
    break;
    case 2:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('#limitNum').prop({ disabled: true, required: false });
      $('#typeTable th:nth-child(3)').text('订单价格区间（最低）');
      $('#typeTable th:nth-child(4)').text('订单价格区间（最高）');
    break;
    case 5:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}$');
      $('#limitNum').prop({ disabled: false, required: true });
      $('#typeTable th:nth-child(3)').text('单张票价区间（最低）');
      $('#typeTable th:nth-child(4)').text('单张票价区间（最高）');
    break;
  }
});

//form
$(document).on('submit', '#formEdit', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }
  _submitting = true;
  $('#formEdit button[type=submit]').prop('disabled', true);
  var sendData = {
    name: $.trim($('#name').val()),
    signNo: $.trim($('#signNo').val()),
    budgetSource: $('#budgetSource').val(),
    beginDate: $('#beginDate').val(),
    endDate: $('#endDate').val(),
    budgetSource: $('#budgetSource').val(),
    wandaTicketId: $('#wandaTicketId').val(),
    couponDesc: $.trim($('#couponDesc').val()),
    imageUrl: $.trim($('#imageUrl').val()),
    maxInventory: $.trim($('#maxInventory').val()),
    channels: _popupDataCache.channels,
    configType: _popupDataCache.configType,
    couponPattern: $('#couponPattern').val(),
    patternList: [],
    films: _popupDataCache.films,
    cinemas: [],
    blackCinemas: [],
    timetables: _popupDataCache.timetables,
    remarks: $('#remark').val().trim(),
    effectiveDays:$('#effectiveDays').val().trim(),
    operator: $('#assessor').val(),
    vid: urlParam.vid
  };

  if((sendData.beginDate == null || sendData.beginDate.length == 0) &&
      (sendData.endDate == null || sendData.endDate.length == 0) &&
      (sendData.effectiveDays == null || sendData.effectiveDays.length == 0)){
    alert('优惠券有效期不能为空');
    _submitting = false;
    return;
  }
  switch ($('input[name=advancePayment]:checked').length) {
    case 0:
      sendData.advancePayment = 'NO';
    break;
    case $('input[name=advancePayment]').length:
      sendData.advancePayment = 'ALL';
    break;
    default:
      sendData.advancePayment = $('input[name=advancePayment]:checked').map(function () {return $(this).val();}).get().join(',');
    break;
  }

  sendData.patternList.push({ amount: $('#amount').val(), limitNum: $('#limitNum').val(), lowerBound: $('#lowerBound').val(), upperBound: $('#upperBound').val() });
  _(_popupDataCache.cinemas).forEach(function (cinema) {
    sendData.cinemas.push(cinema.cinemaId);
  });

  _(_popupDataCache.blackCinemas).forEach(function (cinema) {
    sendData.blackCinemas.push(cinema.cinemaId);
  });

  var ajaxUrl, tips;

  if ($('#formEdit button[type=submit][clicked=true]').hasClass('btn-approval')) {
    if (urlParam.vid) {
      ajaxUrl = 'coupon/updateAndSubmitVerification';
    } else {
      ajaxUrl = 'coupon/saveAndSubmitVerification';
    }
    tips = '提交成功, 审核进度可到 "我的进件列表" 查看. \n点击 "确定" 关闭本页面';
  } else {
    // 
    ajaxUrl = 'coupon/saveVerification';
    tips = '保存成功, 可到 "我的进件列表" 查看或编辑. \n点击 "确定" 关闭本页面';
  }

  // var ajaxUrl = 'coupon/couponSave';
  if ($('#id').size() > 0 && $('#id').val()) {
    // ajaxUrl = 'coupon/couponUpdate';
    sendData.id = $('#id').val();
  }

  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert(tips);
      window.open(document.URL,'_self','resizable=no,top=-245,width=250,height=250,scrollbars=no');
      window.close();
      // if (ajaxUrl == 'coupon/couponUpdate') {
      //   alert('更新成功！');
      //   document.location.reload(true);
      // } else {
      //   alert('保存成功！');
      //   document.location = 'coupon-rule.html';
      // }
    } else {
      alert('接口错误：' + res.meta.msg);
    }

    $('#formEdit button[type=submit]').prop('disabled', false);
  });

  return false;
});

//数据缓存
function setBudgetSource(budgetSourceId, assessor, wandaTicketId) {
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
        $('#budgetSource').trigger('change', [assessor, wandaTicketId]);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function (brand) {
        $('#search-cinema-brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setWandaTicket(wandaTicketId, budgetSourceId) {
  
  var html = '<option value="">不选</option>';
  $('#wandaTicketId').html(html);

  $.ajax({
    url: common.API_HOST + 'activity/wandaActivityTicketList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
      budgetSource: budgetSourceId
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.wandaTicketList.length < 1) {
        return false;
      } else {
        _wandaTicket = res.data.wandaTicketList;
        var html = '';
        _(_wandaTicket).forEach(function (ticket) {
          if (wandaTicketId == ticket.id) {
            html += '<option value="' + ticket.id + '" selected>' + ticket.ticketId + '</option>';
          } else {
            html += '<option value="' + ticket.id + '">' + ticket.ticketId + '</option>';
          }
        });

        $('#wandaTicketId').append(html);
      }
    } else {
      // alert('接口错误：' + res.meta.msg);
    }
  });
}

function setMovie(films) {
  var previewHtml = '';
  if (_movies.length > 0) {
    if (films == false) {
      previewHtml = '不限';
    } else {
      _(_movies).forEach(function (movie) {
        if (films.indexOf(movie.filmId) > -1) {
          previewHtml += movie.filmId + '[' + movie.filmName + '] ';
        }
      });
    }

    $('#preview-movie').html(previewHtml);
  } else {
    $.ajax({
      url: common.API_HOST + 'common/filmList',
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        if (res.data == null || res.data.length < 1) {
          return false;
        } else {
          _movies = res.data;
          if (films == false) {
            previewHtml = '不限';
          } else {
            _(_movies).forEach(function (movie) {
              if (films.indexOf(movie.filmId) > -1) {
                previewHtml += movie.filmId + '[' + movie.filmName + '] ';
              }
            });
          }

          $('#preview-movie').html(previewHtml);
        }
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }
}

function setDimen(actionEdit, checkedHallType, checkedFilmType, checkedScreenType) {

  if (!actionEdit) {
    checkedHallType = ['普通'];
    checkedFilmType = ['2D', '3D'];
    checkedScreenType = ['普通'];
  }

  var previewHtmlFilmType = '影片制式：';
  _(_filmType).forEach(function (dimen) {
    dimen.checked = true;
    if (checkedFilmType != false && checkedFilmType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    } else {
      previewHtmlFilmType += '[' + dimen.name +  '] ';
    }
  });

  var previewHtml = previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType;

  $('#preview-dimen').html(previewHtml);

  var data = { filmType: _filmType, screenType: _screenType, hallType: _hallType };
  var template = $('#dimen-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-unit-dimen .modal-body').html(html);
}

function setChannel(channels) {
  var previewHtml = '';
  var checkedChannelNames = [];
  if (_channels.length > 0) {
    if (channels == false || _channels.length == channels.length) {
      _popupDataCache.channels = [];
      _(_channels).forEach(function (channel) {
        _popupDataCache.channels.push(channel.channelId);
        channel.checked = true;
      });

      previewHtml = '不限';
    } else {
      _(_channels).forEach(function (channel) {
        if (channels.indexOf(channel.channelId) < 0) {
          channel.checked = false;
        } else {
          channel.checked = true;
          checkedChannelNames.push(channel.channelName);
        }
      });

      previewHtml = checkedChannelNames.join('、');
    }

    $('#preview-channel').html(previewHtml);
  } else {
    $.ajax({
      url: common.API_HOST + 'common/channelList',
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        if (res.data == null || res.data.length < 1) {
          return false;
        } else {
          _channels = res.data;
          if (channels == false || _channels.length == channels.length) {
            _popupDataCache.channels = [];
            _(_channels).forEach(function (channel) {
              _popupDataCache.channels.push(channel.channelId);
              channel.checked = true;
            });

            previewHtml = '不限';
          } else {
            _(_channels).forEach(function (channel) {
              if (channels.indexOf(channel.channelId) < 0) {
                channel.checked = false;
              } else {
                channel.checked = true;
                checkedChannelNames.push(channel.channelName);
              }
            });

            previewHtml = checkedChannelNames.join('、');
          }

          $('#preview-channel').html(previewHtml);
        }
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }
}

function setCinema(cinemas) {
  $.ajax({
    url: common.API_HOST + 'common/getCinemasByIds',
    type: 'POST',
    dataType: 'json',
    data: { ids: cinemas },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        var html = '';
        var previewHtml = '';
        _(res.data).forEach(function (cinema) {
          html += '<tr data-id="' + cinema.cinemaId + '"><td>' + cinema.cinemaName + '</td><td>' + cinema.cityName + '</td><td>' + cinema.brandName + '</td></tr>';
        });

        $('#search-cinema-choosed tbody').html(html);
        $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');

        if (res.data.length > 0) {
          previewHtml = '选择了 ' + res.data.length + ' 个影院';
        } else {
          previewHtml = '不限';
        }

        $('#preview-cinema').html(previewHtml);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _provinces = res.data;
      var html = '';
      _(_provinces).forEach(function (province) {
        html += '<option value="' + province.provinceId + '">' + province.provinceName + '</option>';
      });

      $('#search-cinema-provinceId').append(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setTimeTable(timetables) {
  var previewHtml = '';
  if (timetables == false || timetables == null || timetables.length == 0) {
    previewHtml = '不限';
  } else {
    _(timetables).forEach(function (time) {
      previewHtml += '<p>' + time.beginDate + ' ~ ' + time.endDate + ' 每天 ' + time.beginTime + ' ~ ' + time.endTime + '</p>';
    });
  }

  $('#preview-timetable').html(previewHtml);
}

function resetTimeTable() {
  $('.beginDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $(this).closest('tr').find('.endDate').datetimepicker('setStartDate', startDate);
  });

  $('.endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $(this).closest('tr').find('.beginDate').datetimepicker('setEndDate', FromEndDate);
  });

  $('.beginTime').datetimepicker({
    format: 'hh:ii',
    language: 'zh-CN',
    startView: 1,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $(this).closest('tr').find('.endTime').datetimepicker('setStartDate', startDate);
  });

  $('.endTime').datetimepicker({
    format: 'hh:ii',
    language: 'zh-CN',
    startView: 1,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $(this).closest('tr').find('.beginTime').datetimepicker('setEndDate', FromEndDate);
  });
}

function setEdit(couponId, isApproval, isHistory) {

  var url;
  if (isHistory) {
    url = 'verification/historyDetail';
  } else if (isApproval) {
    url = 'verification/detail';
  } else {
    url = 'coupon/couponDetail';
  }


  $.ajax({
    url: common.API_HOST + url,
    type: 'POST',
    dataType: 'json',
    data: { id: couponId },
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

      var coupon = res.data;
      _popupDataCache.channels = coupon.channels != null ? coupon.channels : [];
      _popupDataCache.films = coupon.films != null ? coupon.films : [];
      _popupDataCache.configType = coupon.configType != null ? coupon.configType : [];
      _popupDataCache.timetables = coupon.timetables != null ? coupon.timetables : [];
      _popupDataCache.advancePayment = coupon.advancePayment;

      coupon.cinemas = coupon.cinemas != null ? coupon.cinemas : [];

      if (coupon.cinemas.length > 0) {
        $.ajax({
          url: common.API_HOST + 'common/getCinemasByIds',
          type: 'POST',
          dataType: 'json',
          data: { ids: coupon.cinemas.join('|') },
        })
        .done(function (res) {
          if (!!~~res.meta.result) {
            if (res.data == null || res.data.length < 1) {
              return false;
            } else {
              _popupDataCache.cinemas = res.data;
            }
          } else {
            alert('接口错误：' + res.meta.msg);
          }

          $('#formEdit button[type=submit]').prop('disabled', false);
        });
      } else {
        $('#formEdit button[type=submit]').prop('disabled', false);
      }

      if (coupon == null || coupon == undefined) {
        alert('无法获取要编辑的活动单元信息，这个不太正常，让[猴子们]来查一查！');
        return false;
      }

      if (coupon.id) $('#formEdit').prepend('<input type="hidden" id="id" value="' + coupon.id + '">');

      $('#name').val(coupon.name).prop('disabled', true);
      // $('#inlineRadio1').prop('disabled', true);
      // $('#inlineRadio2').prop('disabled', true);
      // $('#beginDate').prop('disabled', true).prop('readonly', false);
      // $('#endDate').prop('disabled', true).prop('readonly', false);
      // $('#effectiveDays').prop('disabled', true);

      if(coupon.effectiveDays > 0){
        $('#inlineRadio2').prop('checked', true);
        $('#effectiveDays').val(coupon.effectiveDays);
        setDateType(true)
      }else{
        $('#beginDate').val(coupon.beginDate.split(' ')[0]);
        $('#endDate').val(coupon.endDate.split(' ')[0]);
      }
      $('#signNo').val(coupon.signNo).prop('disabled', true);

      $('input[name=advancePayment]').prop({ disabled: true, checked: false });
      $('input[name=advancePayment]').each(function (index, el) {
        $(el).prop('checked', _popupDataCache.advancePayment == 'ALL' || _popupDataCache.advancePayment.indexOf($(el).val()) > -1 ? true : false);
      });

      $('#couponDesc').val(coupon.couponDesc).addClass(coupon.data.couponDesc.edited ? 'highlight' : '');
      $('#imageUrl').val(coupon.imageUrl).addClass(coupon.data.imageUrl.edited ? 'highlight' : '');
      $('#maxInventory').val(coupon.maxInventory).addClass(coupon.data.maxInventory.edited ? 'highlight' : '');
      $('#remark').val(coupon.remarks).addClass(coupon.data.remarks.edited ? 'highlight' : '');

      //成本中心
      setBudgetSource(coupon.budgetSource, coupon.assessor, coupon.wandaTicketId);

      $('#level,#budgetSource').prop('disabled', true);

      $('#wandaTicketId').prop('disabled', true);

      // 优惠券规则
      $('#couponPattern option')
        .eq(coupon.couponPattern - 1)
        .prop('selected', true)
        .closest('div.edit-section')
        .addClass(coupon.data.couponPattern.edited ? 'highlight' : '');
      if (coupon.couponPattern != null) {
        coupon.patternList[0].lowerBound = ~~coupon.patternList[0].lowerBound < 1 ? '' : coupon.patternList[0].lowerBound;
        coupon.patternList[0].upperBound = ~~coupon.patternList[0].upperBound < 1 ? '' : coupon.patternList[0].upperBound;
        var htmlPattern = '<tr>';
        htmlPattern += '<td><input type="text" id="amount" required data-parsley-pattern="^0|[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" placeholder="必填" value="' + coupon.patternList[0].amount + '"></td>';
        htmlPattern += '<td><input type="text" id="limitNum" required data-parsley-pattern="^[1-9]{1}\\d*$" placeholder="必填" value="' + coupon.patternList[0].limitNum + '"></td>';
        htmlPattern += '<td><input type="text" id="lowerBound" class="parsley-range" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="0" placeholder="不限" value="' + coupon.patternList[0].lowerBound + '"></td>';
        htmlPattern += '<td><input type="text" id="upperBound" class="parsley-range" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="0" placeholder="不限" value="' + coupon.patternList[0].upperBound + '"></td>';
        htmlPattern += '</tr>';
        $('#typeTable tbody').html(htmlPattern);
        $('#couponPattern').trigger('change');
      }
      $('.pane-activity-type').addClass((coupon.data.couponPattern.edited || coupon.data.patternList.edited) ? 'highlight' : '');

      //渠道
      if (coupon.channels != null && coupon.channels.length > 0) {
        setChannel(coupon.channels);
      } else {
        setChannel(false);
      }
      $('#preview-channel').closest('tr').addClass(coupon.data.channels.edited ? 'highlight' : '');

      //影片
      coupon.films != null && coupon.films.length > 0 ? setMovie(coupon.films) : setMovie(false);
      $('#preview-movie').closest('tr').addClass(coupon.data.films.edited ? 'highlight' : '');

      //制式
      var previewHtmlConfigType = coupon.configType == null || coupon.configType.length == 0 ? '不限' : '[' + coupon.configType.join('] [') + ']';
      $('#preview-dimen').html(previewHtmlConfigType).closest('tr').addClass(coupon.data.configType.edited ? 'highlight' : '');

      //影院
      $('#preview-cinema')
      .html(coupon.cinemas != null && coupon.cinemas.length > 0 ? '选择了 ' + coupon.cinemas.length + ' 个影院' : '不限')
      .closest('tr').addClass(coupon.data.cinemas.edited ? 'highlight' : '');

      //影院黑名单
      $('#preview-black-cinema')
      .html(coupon.blackCinemas != null && coupon.blackCinemas.length > 0 ? '选择了 ' + coupon.blackCinemas.length + ' 个影院' : '不限')
      .closest('tr').addClass(coupon.data.blackCinemas && coupon.data.blackCinemas.edited ? 'highlight' : '');

      //场次
      setTimeTable(coupon.timetables);
      $('#preview-timetable').closest('tr').addClass(coupon.data.timetables.edited ? 'highlight' : '');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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


// 选择成本中心
$(document).on('change mouseup', '#budgetSource', function (event, assessor, wandaTicketId) {
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
      console.log('getAssessor出错');
      // alert('接口错误：' + res.meta.msg);
      $('#assessor').html('<option value=""></option>');
    }
  });

  setWandaTicket(wandaTicketId, budgetSourceId);
});


// 历史记录
$(function() {

  if (urlParam.id !== undefined && urlParam.typeCode !== undefined) {

    var url = 'verification/history';
    var data = {typeCode: urlParam.typeCode};
    if (urlParam.vid) {
        data.id = urlParam.vid;
    } else {
        data.pid = urlParam.id;
    }
    
    $.ajax({
      url: common.API_HOST + url,
      type: 'POST',
      dataType: 'json',
      data: data
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        var template = $('#history-template').html();
        Mustache.parse(template);
        res.data.url = 'coupon-rule-view.html';
        res.data.ref = ref;
        var html = Mustache.render(template, res.data);
        $('section').after(html);
      } else {
        alert('获取编辑历史失败: ' + res.meta.msg);
      }
    });
  }
});



