'use strict;'

var common = require('common');
var _budgetSource = [];
var _plans = [];
var _wandaTicket = [];
var _movies = [];
var _filmType = [
{ name: '2D' },
{ name: '3D' },
];
var _screenType = [
{ name: '普通' },
{ name: 'IMAX' },
{ name: 'DMAX' },
{ name: '巨幕' },
];
var _hallType = [
{ name: '普通' },
{ name: '4D' },
{ name: '5D' },
];
var _channels = [];
var _provinces = [];
var _cusTypes = ['新户', '老户'];
var _submitting = false;
var _priorities = [];
var _dimenChanged = false;
var _popupDataCache = {
  dailyBudgetList: [],
  cusTypes: [1, 2],
  saleLimit: { dailyOrder: '', dailyTicket: '', totalOrder: '', totalTicket: '' },
  channels: [],
  hallType: ['普通'],
  filmType: ['2D', '3D'],
  screenType: ['普通'],
  films: [],
  cinemas: [],
  timetables: [],
};

// var _loginTypes = [CL:'掌上生活登录', UD: '一网通登录', UA: '一卡通登录', UC: '信用卡登录'];

$(function () {
  common.init('activity-unit');

  Number.prototype.between = function (a, b, flag) {
    var min = Math.min.apply(Math, [a, b]);
    var max = Math.max.apply(Math, [a, b]);
    var _this = this;
    if (this == 0 && flag == true) {
      _this = -Infinity;
    }

    if (this == 0 && flag == false) {
      _this = Infinity;
    }

    return _this >= min && _this <= max;
  };

  setProvince();
  setBrand();

  var urlParam = common.getUrlParam();
  if (urlParam.unitId != undefined && urlParam.unitId != '') {
    setEdit(urlParam.unitId);
  } else {
    if (urlParam.planId != undefined && urlParam.planId != '') {
      setPlan(urlParam.planId);
    } else {
      setPlan(false);
    }

    setWandaTicket(false);
    setBudgetSource(false);
    setMovie(false);
    $('#preview-dimen').html('影片制式：不限<br>屏幕规格：[普通]<br>特殊影厅：[普通]');
    setChannel(false);
    setPattern(1);
    setPriority(false);
  }

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

  $('#formUnit').parsley();

});

//周期选择
$(document).on('click', '#repeatedDayAll', function (event) {
  if ($(this).prop('checked') == true) {
    $('input[name=repeatedDay]').prop('checked', true);
  } else {
    $('input[name=repeatedDay]').prop('checked', false);
  }

});

//优先级
$(document).on('click', '#priority', function (event) {
  event.preventDefault();
  $('#popup-unit-priority').modal('show');
  $('#popup-unit-priority input[type=text]').quicksearch('#priorityTable tbody tr', { selector: 'th' });
  $('#popup-unit-priority form').parsley();
});

$(document).on('submit', '#popup-unit-priority form', function (event) {
  event.preventDefault();
  var priority = +$('#popup-unit-priority input[type=text]').val();
  if ($.inArray(priority, _priorities) > -1) {
    alert('优先级重复，请换一个！');
    return false;
  }

  $('#priority').val(priority);
  $('#popup-unit-priority').modal('hide');
  return false;
});

//成本中心
$(document).on('change', '#level', function (event) {
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

//活动形式
$(document).on('click', '#btn-type-add', function (event) {
  event.preventDefault();
  var index = $('#typeTable tbody tr').size();
  var data = { index: index };
  var template = $('#type-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#typeTable tbody').append(html);
});

$(document).on('click', '.btn-type-delete', function (event) {
  event.preventDefault();
  if ($('#typeTable tbody tr').length < 2) {
    alert('作为一个负责任的系统，最后一条就不给你删了！');
    return false;
  }

  if (window.confirm('确定要删除此条规则吗？')) {
    $(this).closest('tr').remove();
  }

  return false;
});

// 活动预算
$(document).on('click', '#btn-set-daily', function (event) {
  event.preventDefault();

  $('#totalAmount').val(_popupDataCache.totalAmount);
  $('#totalTicket').val(_popupDataCache.totalTicket);
  var html = '';
  _(_popupDataCache.dailyBudgetList).forEach(function (daily) {
    html += '<tr>';
    html += '<td><input type="text" class="form-control startDate" required readonly placeholder="YYYY-MM-DD" value="' + daily.startDate + '"></td>';
    html += '<td><input type="text" class="form-control endDate" required readonly placeholder="YYYY-MM-DD" value="' + daily.endDate + '"></td>';
    html += '<td><input type="text" class="form-control dailyAmount" placeholder="不限" data-parsley-pattern="^[1-9]{1}\\d*$" value="' + daily.dailyAmount + '"></td>';
    html += '<td><input type="text" class="form-control dailyTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\\d*$" value="' + daily.dailyTicket + '"></td>';
    html += '<td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td>';
    html += '</tr>';
  });

  $('#dailyBudgetTable tbody').html(html);
  if (html != '') {
    $('.startDate').datetimepicker({
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
      $(this).closest('tr').find('.startDate').datetimepicker('setEndDate', FromEndDate);
    });
  }

  $('#popup-unit-budget').modal('show');
  $('#popup-unit-budget form').parsley();
});

$(document).on('submit', '#popup-unit-budget form', function (event) {
  event.preventDefault();
  var previewHtml = '';
  _popupDataCache.totalAmount = $('#totalAmount').val();
  previewHtml += _popupDataCache.totalAmount > 0 ? '总金额预算：' + _popupDataCache.totalAmount + '；' : '';
  _popupDataCache.totalTicket = $('#totalTicket').val();
  previewHtml += _popupDataCache.totalTicket > 0 ? '总出票预算：' + _popupDataCache.totalTicket + '；' : '';
  if ($('#dailyBudgetTable tbody tr').size() > 0) {
    $('#dailyBudgetTable tbody tr').each(function (index, el) {
      var startDate = $(el).find('.startDate').val();
      var endDate = $(el).find('.endDate').val();
      var dailyAmount = $(el).find('.dailyAmount').val();
      var dailyTicket = $(el).find('.dailyTicket').val();
      _popupDataCache.dailyBudgetList.push({ startDate: startDate, endDate: endDate, dailyAmount: dailyAmount, dailyTicket: dailyTicket });
      dailyAmount = dailyAmount == 0 ? '不限' : dailyAmount;
      dailyTicket = dailyTicket == 0 ? '不限' : dailyTicket;
      previewHtml += '<p>' + startDate + ' ~ ' + endDate + '，日金额预算：' + dailyAmount + '，日出票预算：' + dailyTicket + '；</p>';
    });
  }

  $('#preview-budget').html(previewHtml != '' ? previewHtml : '不限');
  $('#popup-unit-budget').modal('hide');
  return false;
});

$(document).on('click', '#btn-daily', function (event) {
  event.preventDefault();
  var template = $('#daily-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#dailyBudgetTable tbody').append(html);
  $('#popup-unit-budget').scrollTop($('#popup-unit-budget').height());

  $('.startDate').datetimepicker({
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
    $(this).closest('tr').find('.startDate').datetimepicker('setEndDate', FromEndDate);
  });

});

$(document).on('click', '#dailyBudgetTable .btn-delete', function (event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条日预算吗？')) {
    $(this).closest('tr').remove();
  }
});

//客群
$(document).on('click', '#btn-set-custypes', function (event) {
  event.preventDefault();
  $('input[name=customerType]').prop('checked', false);
  _(_popupDataCache.cusTypes).forEach(function (cus) {
    $('input[name=customerType]').eq(cus - 1).prop('checked', true);
  });

  $('#popup-unit-custypes').modal('show');
  $('#popup-unit-custypes form').parsley();
});

$(document).on('submit', '#popup-unit-custypes form', function (event) {
  event.preventDefault();
  var previewHtml = '';
  _popupDataCache.cusTypes = $('input[name=customerType]:checked').map(function () {return ~~$(this).val();}).get();
  if (_popupDataCache.cusTypes.length == _cusTypes.length) {
    previewHtml = '不限';
  } else {
    previewHtml = $('input[name=customerType]:checked').map(function () {return $(this).next('span').text();}).get().join('、');
  }

  $('#preview-custypes').html(previewHtml);
  $('#popup-unit-custypes').modal('hide');
  return false;
});

//特殊资格
$(document).on('click', '#btn-set-special', function (event) {
  event.preventDefault();
  $('input[name=specialType]').prop('checked', _popupDataCache.qualification == 'UD' ? true : false);
  $('#popup-unit-special').modal('show');
  $('#popup-unit-special form').parsley();
});

$(document).on('submit', '#popup-unit-special form', function (event) {
  event.preventDefault();
  if ($('input[name=specialType]:checked').val() == 'UD') {
    _popupDataCache.qualification = 'UD';
  } else {
    delete _popupDataCache.qualification;
  }

  $('#preview-special').html(_popupDataCache.qualification == 'UD' ? '手机银行一网通登录用户' : '不限');
  $('#popup-unit-special').modal('hide');
  return false;
});

//单户限购
$(document).on('click', '#btn-set-restriction', function (event) {
  event.preventDefault();
  $('#saleLimit_dailyOrder').val(~~_popupDataCache.saleLimit.dailyOrder == 0 ? '' : _popupDataCache.saleLimit.dailyOrder);
  $('#saleLimit_dailyTicket').val(~~_popupDataCache.saleLimit.dailyTicket == 0 ? '' : _popupDataCache.saleLimit.dailyTicket);
  $('#saleLimit_totalOrder').val(~~_popupDataCache.saleLimit.totalOrder == 0 ? '' : _popupDataCache.saleLimit.totalOrder);
  $('#saleLimit_totalTicket').val(~~_popupDataCache.saleLimit.totalTicket == 0 ? '' : _popupDataCache.saleLimit.totalTicket);
  $('#popup-unit-restriction').modal('show');
  $('#popup-unit-restriction form').parsley();
});

$(document).on('submit', '#popup-unit-restriction form', function (event) {
  event.preventDefault();
  _popupDataCache.saleLimit.dailyTicket = ~~$('#saleLimit_dailyTicket').val() == 0 ? '' : $('#saleLimit_dailyTicket').val();
  _popupDataCache.saleLimit.dailyOrder = ~~$('#saleLimit_dailyOrder').val() == 0 ? '' : $('#saleLimit_dailyOrder').val();
  _popupDataCache.saleLimit.totalTicket = ~~$('#saleLimit_totalTicket').val() == 0 ? '' : $('#saleLimit_totalTicket').val();
  _popupDataCache.saleLimit.totalOrder = ~~$('#saleLimit_totalOrder').val() == 0 ? '' : $('#saleLimit_totalOrder').val();
  var previewHtml = '';
  previewHtml += ~~_popupDataCache.saleLimit.dailyTicket == 0 ? '' : '每日限购' + _popupDataCache.saleLimit.dailyTicket + '张；';
  previewHtml += ~~_popupDataCache.saleLimit.totalTicket == 0 ? '' : '总共限购' + _popupDataCache.saleLimit.totalTicket + '张；';
  previewHtml += ~~_popupDataCache.saleLimit.dailyOrder == 0 ? '' : '每日限购' + _popupDataCache.saleLimit.dailyOrder + '笔；';
  previewHtml += ~~_popupDataCache.saleLimit.totalOrder == 0 ? '' : '总共限购' + _popupDataCache.saleLimit.totalOrder + '笔；';
  $('#preview-restriction').html(previewHtml != '' ? previewHtml : '不限');
  $('#popup-unit-restriction').modal('hide');
  return false;
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
    html += '<option value="' + movie.filmId + '">' + movie.filmName + '</option>';
    if (_popupDataCache.films.indexOf(movie.filmId) > -1) {
      choosedHtml += '<option value="' + movie.filmId + '">' + movie.filmName + '</option>';
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
  _(_filmType).forEach(function (dimen) {
    dimen.checked = true;
    if (_popupDataCache.filmType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    }
  });

  _(_screenType).forEach(function (dimen) {
    dimen.checked = true;
    if (_popupDataCache.screenType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    }
  });

  _(_hallType).forEach(function (dimen) {
    dimen.checked = true;
    if (_popupDataCache.hallType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    }
  });

  var data = { filmType: _filmType, screenType: _screenType, hallType: _hallType };
  var template = $('#dimen-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-unit-dimen .modal-body').html(html);
  $('#popup-unit-dimen').modal('show');
  $('#popup-unit-dimen form').parsley();
});

$(document).on('change', '#popup-unit-dimen input[type=checkbox]', function (event) {
  event.preventDefault();
  _dimenChanged = true;
});

$(document).on('submit', '#popup-unit-dimen form', function (event) {
  event.preventDefault();

  if (!_dimenChanged) {
    _dimenChanged = true;
    if (!window.confirm('已为您默认选择普通厅、普通屏幕、2D3D影片，是否确认保存？')) {
      return false;
    }
  }

  var previewHtmlFilmType = '影片制式：';
  _popupDataCache.filmType = $('input[name=filmType]:checked').map(function () {return $(this).next('span').text();}).get();
  if (_popupDataCache.filmType.length == _filmType.length) {
    previewHtmlFilmType += '不限';
  } else {
    previewHtmlFilmType += '[' + _popupDataCache.filmType.join('] [') + ']';
  }

  var previewHtmlScreenType = '<br>屏幕规格：';
  _popupDataCache.screenType = $('input[name=screenType]:checked').map(function () {return $(this).next('span').text();}).get();
  if (_popupDataCache.screenType.length == _screenType.length) {
    previewHtmlScreenType += '不限';
  } else {
    previewHtmlScreenType += '[' + _popupDataCache.screenType.join('] [') + ']';
  }

  var previewHtmlHallType = '<br>特殊影厅：';
  _popupDataCache.hallType = $('input[name=hallType]:checked').map(function () {return $(this).next('span').text();}).get();
  if (_popupDataCache.hallType.length == _hallType.length) {
    previewHtmlHallType += '不限';
  } else {
    previewHtmlHallType += '[' + _popupDataCache.hallType.join('] [') + ']';
  }

  $('#preview-dimen').html(previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType);
  $('#popup-unit-dimen').modal('hide');
  return false;
});

//影院
$(document).on('click', '#btn-set-cinema', function (event) {
  event.preventDefault();
  $('#search-cinema-brandId option ,#search-cinema-provinceId option').prop('selected', false);
  $('#search-cinema-cityId').html('<option value="">城市</option>');
  $('#search-cinema-candidate tbody, #search-cinema-choosed tbody').html('');
  $('#input-cinema-filter, #search-cinema-cinemaName').val('');
  if (_popupDataCache.cinemas != null && _popupDataCache.cinemas.length > 0) {
    var html = '';
    _(_popupDataCache.cinemas).forEach(function (cinema) {
      html += '<tr data-id="' + cinema.cinemaId + '"><td>' + cinema.cinemaName + '</td><td>' + cinema.cityName + '</td><td>' + cinema.brandName + '</td></tr>';
    });

    $('#search-cinema-choosed tbody').html(html);
    $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  }

  $('#popup-unit-cinema').modal('show');
});

$(document).on('change', '#search-cinema-provinceId', function (e) {
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

  $('#search-cinema-cityId').html(options);
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
    url: common.API_HOST + 'cinema/standard/cinemaList',
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

$(document).on('submit', '#popup-unit-cinema form', function (event) {
  event.preventDefault();
  _popupDataCache.cinemas = $('#search-cinema-choosed tbody tr').map(function () {
    var cinema = {
      cinemaId: $(this).data('id'),
      cinemaName: $(this).find('td:nth-child(1)').html(),
      cityName: $(this).find('td:nth-child(2)').html(),
      brandName: $(this).find('td:nth-child(3)').html(),
    };
    return cinema;
  }).get();
  var previewHtml = _popupDataCache.cinemas.length > 0 ? '选择了 ' + _popupDataCache.cinemas.length + ' 个影院' : '不限';
  $('#preview-cinema').html(previewHtml);
  $('#popup-unit-cinema').modal('hide');
  return false;
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

$(document).on('change', '#activityPattern', function (event) {
  event.preventDefault();
  var current = +$(this).val();
  setPattern(current);
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

  $('#formUnit input[type=submit]').prop('disabled', true).text('更新中...');

  var sendData = {
    name: $.trim($('#name').val()),
    signNo: $('#signNo').val(),
    planId: $('#planId').val(),
    budgetSource: $('#budgetSource').val(),
    wandaTicketId: $('#wandaTicketId').val(),
    advancePayment: $('input[name=advancePayment]:checked').val(),
    beginDate: $('#beginDate').val(),
    endDate: $('#endDate').val(),
    dailyEffectiveBeginTime: $('#beginHH').val() + ':' + $('#beginMM').val() + ':' + $('#beginSS').val(),
    dailyEffectiveEndTime: $('#endHH').val() + ':' + $('#endMM').val() + ':' + $('#endSS').val(),
    priority: $('#priority').val(),
    cinemaPageDesc: $.trim($('#cinemaPageDesc').val()),
    activityIcon: $.trim($('#activityIcon').val()),
    timetablePageDesc: $.trim($('#timetablePageDesc').val()),
    activityDesc: $.trim($('#activityDesc').val()),
    activityLink: $.trim($('#activityLink').val()),
    repeatedDay: [],
    customerType: _popupDataCache.cusTypes,
    saleLimit: _popupDataCache.saleLimit,
    channels: _popupDataCache.channels,
    hallType: _popupDataCache.hallType,
    filmType: _popupDataCache.filmType,
    screenType: _popupDataCache.screenType,
    activityPattern: $('#activityPattern').val(),
    activityPatternList: [],
    totalAmount: _popupDataCache.totalAmount,
    totalTicket: _popupDataCache.totalTicket,
    dailyBudgetList: _popupDataCache.dailyBudgetList,
    films: _popupDataCache.films,
    cinemas: [],
    timetables: _popupDataCache.timetables,
  };

  $('input[name=repeatedDay]:checked').each(function (index, el) {
    sendData.repeatedDay.push($(el).val());
  });

  sendData.repeatedDay = sendData.repeatedDay.join(',');

  $('input[name=channels]:checked').each(function (index, el) {
    sendData.channels.push($(el).val());
  });

  $('input[name=hallType]:checked').each(function (index, el) {
    sendData.hallType.push($(el).next('span').text());
  });

  $('input[name=filmType]:checked').each(function (index, el) {
    sendData.filmType.push($(el).next('span').text());
  });

  $('input[name=screenType]:checked').each(function (index, el) {
    sendData.screenType.push($(el).next('span').text());
  });

  //活动形式
  var rangeList = [];
  var patternCheck = true;
  $('#typeTable tbody tr').each(function (index, el) {
    var amount = $(el).find('.amount').val();
    var lowerBound = Number($(el).find('.lowerBound').val());
    var upperBound = Number($(el).find('.upperBound').val());

    _(rangeList).forEach(function (range) {
      var min = range.min == '' ? 0 : range.min;
      var max = range.max == '' ? Infinity : range.max;
      if (lowerBound.between(min, max, true) || upperBound.between(min, max, false)) {
        $(el).find('#error-cross').remove();
        $(el).find('td:nth-child(2)').append('<ul class="parsley-errors-list filled" id="error-cross"><li class="parsley-required">活动形式价格区间交叉了</li></ul>');
        $(el).find('.lowerBound').focus();
        patternCheck = false;
        return false;
      }
    });

    if (!patternCheck) {
      return false;
    }

    rangeList.push({ min: lowerBound, max: upperBound });
    sendData.activityPatternList.push({ amount: amount, lowerBound: lowerBound == 0 ? '' : lowerBound, upperBound: upperBound == 0 ? '' : upperBound });
  });

  if (!patternCheck) {
    return false;
  }

  if (_popupDataCache.qualification != undefined && _popupDataCache.qualification != null && _popupDataCache.qualification != '') {
    sendData.qualification = [_popupDataCache.qualification];
  }

  _(_popupDataCache.cinemas).forEach(function (cinema) {
    sendData.cinemas.push(cinema.cinemaId);
  });

  var ajaxUrl = 'activity/saveActivity';
  if ($('#id').size() > 0) {
    ajaxUrl = 'activity/updateActivity';
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
    $('#formUnit input[type=submit]').prop('disabled', false).text('保存');
    if (!!~~res.meta.result) {
      if (ajaxUrl == 'activity/updateActivity') {
        alert('更新成功！');
        document.location.reload(true);
      } else {
        alert('新建成功！');
        document.location = 'activity-unit.html';
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

//数据缓存
function setBudgetSource(budgetSourceId) {
  $.ajax({
    url: common.API_HOST + 'activity/budgetSourceList',
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

function setPriority(exclude) {
  $.ajax({
    url: common.API_HOST + 'activity/activityList',
    type: 'POST',
    dataType: 'json',
    data: { pageIndex: 1, pageSize: 999999, sord: 'priority', sidx: 'DESC' },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var html = '';
      _(res.data.rows).forEach(function (value, key) {
        if (value.priority != exclude) {
          _priorities.push(value.priority);
          html += '<tr><th>' + value.priority + '</th><td>' + value.name + '</td></tr>';
        }

      });

      $('#priorityTable tbody').html(html);

      $('#popup-unit-priority button[type=submit]').prop('disabled', false);
      $('#popup-unit-priority input[type=text]').val($('#priority').val());
      $('#popup-unit-priority input[type=text]').quicksearch('#priorityTable tbody tr');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setPlan(planId) {
  $.ajax({
    url: common.API_HOST + 'plan/planList',
    type: 'POST',
    dataType: 'json',
    data: { status: 1, pageIndex: 1, pageSize: 9999 },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        alert('没有已上线的计划，这不正常哦！');
        return false;
      } else {
        _plans = res.data.rows;
        var html = '';
        _(_plans).forEach(function (plan) {
          if (planId == plan.id) {
            html += '<option value="' + plan.id + '" selected>' + plan.name + '</option>';
          } else {
            html += '<option value="' + plan.id + '">' + plan.name + '</option>';
          }
        });

        $('#planId').append(html);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setWandaTicket(wandaTicketId) {
  $.ajax({
    url: common.API_HOST + 'activity/wandaActivityTicketList',
    type: 'GET',
    dataType: 'json',
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
      alert('接口错误：' + res.meta.msg);
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

function setChannel(channels) {
  var previewHtml = '';
  var checkedChannelNames = [];
  if (_channels.length > 0) {
    if (channels == false || _channels.length == channels.length) {
      _(_channels).forEach(function (channel) {channel.checked = true;});

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
              if (channels.indexOf(channel.channelId.toString()) < 0) {
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

function setPattern(patternId) {
  switch (~~patternId) {
    case 0:
    case 1:
    case 2:
      $('.amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('.activity-pattern-tip').text('金额需输入大于0的数字，最多两位小数');
    break;
    case 3:
      $('.amount').attr('data-parsley-pattern', '^[1-9]{1}$');
      $('.activity-pattern-tip').text('折扣需输入大于0且小于10的整数；金额需输入大于0的数字，最多两位小数');
    break;
    case 4:
      $('.amount').attr('data-parsley-pattern', '^[234]{1}$');
      $('.activity-pattern-tip').text('张数仅限输入2、3、4；金额需输入大于0的数字，最多两位小数');
    break;
    case 5:
      $('.amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('.activity-pattern-tip').text('积分需输入大于0的整数；金额需输入大于0的数字，最多两位小数');
    break;
  }
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

function setEdit(unitId) {
  $('.breadcrumb li:last-child').text('编辑');
  $('h3').text('编辑活动单元:' + unitId);
  $.ajax({
    url: common.API_HOST + 'activity/activityDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: unitId },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var unit = res.data;
      if (unit == null || unit == undefined) {
        alert('无法获取要编辑的活动单元信息，这个不太正常，让[猿们]来查一查！');
        return false;
      }

      _popupDataCache.totalAmount = ~~unit.totalAmount < 1 ? '' : ~~unit.totalAmount;
      _popupDataCache.totalTicket = ~~unit.totalTicket < 1 ? '' : ~~unit.totalTicket;
      _popupDataCache.dailyBudgetList = unit.dailyBudgetList;
      _popupDataCache.cusTypes = unit.cusTypes;
      _popupDataCache.channels = unit.channels;
      _popupDataCache.films = unit.films;
      _popupDataCache.filmType = unit.filmType;
      _popupDataCache.screenType = unit.screenType;
      _popupDataCache.hallType = unit.hallType;
      _popupDataCache.qualification = ~~unit.qualification != 0 && ~~unit.qualification[0] != 0 ? unit.qualification[0] : '';

      $.ajax({
        url: common.API_HOST + 'common/getCinemasByIds',
        type: 'POST',
        dataType: 'json',
        data: { ids: unit.cinemas },
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
      });

      _popupDataCache.timetables = unit.timetables;

      if (unit.saleLimit == null) {
        _popupDataCache.saleLimit = { dailyOrder: '', dailyTicket: '', totalOrder: '', totalTicket: '' };
      } else {
        _popupDataCache.saleLimit = {
          dailyOrder: ~~unit.saleLimit.dailyOrder == 0 ? '' : unit.saleLimit.dailyOrder,
          dailyTicket: ~~unit.saleLimit.dailyTicket == 0 ? '' : unit.saleLimit.dailyTicket,
          totalOrder: ~~unit.saleLimit.totalOrder == 0 ? '' : unit.saleLimit.totalOrder,
          totalTicket: ~~unit.saleLimit.totalTicket == 0 ? '' : unit.saleLimit.totalTicket,
        };
      }

      setPriority(unit.priority);

      $('#formUnit').prepend('<input type="hidden" id="id" value="' + unit.id + '">');

      $('#name').val(unit.name).prop('disabled', true);
      $('#signNo').val(unit.signNo).prop('disabled', true);

      $('#beginDate').val(unit.beginDate.split(' ')[0]);
      $('#endDate').val(unit.endDate.split(' ')[0]);
      var dailyEffectBeginTime = unit.dailyEffectBeginTime.split(':');
      $('#beginHH').val(dailyEffectBeginTime[0]);
      $('#beginMM').val(dailyEffectBeginTime[1]);
      $('#beginSS').val(dailyEffectBeginTime[2]);
      var dailyEffectEndTime = unit.dailyEffectEndTime.split(':');
      $('#endHH').val(dailyEffectEndTime[0]);
      $('#endMM').val(dailyEffectEndTime[1]);
      $('#endSS').val(dailyEffectEndTime[2]);
      var repeatedDay = unit.repeatedDay.split(',');
      _(repeatedDay).forEach(function (day) {
        $('input[name=repeatedDay]').eq(day - 1).prop('checked', true);
      });

      if (repeatedDay.length == 7) {
        $('#repeatedDayAll').prop('checked', true);
      }

      $('#priority').val(unit.priority);

      $('input[name=advancePayment]').prop({ disabled: true, checked: false });
      $('input[name=advancePayment]').each(function (index, el) {
        $(el).prop('checked', $(el).val() == unit.advancePayment ? true : false);
      });

      $('#cinemaPageDesc').val(unit.cinemaPageDesc);
      $('#activityIcon').val(unit.activityIcon);
      $('#timetablePageDesc').val(unit.timetablePageDesc);
      $('#activityDesc').val(unit.activityDesc);
      $('#activityLink').val(unit.activityLink);

      //计划
      if (unit.planId != '' && unit.planId != null && unit.planId != undefined) {
        setPlan(unit.planId);
      } else {
        setPlan(false);
      }

      if (unitId) {
        $('#planId').prop('disabled', true);
      }

      //成本中心
      if (unit.budgetSourceId != '' && unit.budgetSourceId != null && unit.budgetSourceId != undefined) {
        setBudgetSource(unit.budgetSourceId);
        $('#level,#budgetSource').prop('disabled', true);
      } else {
        setBudgetSource(false);
      }

      //万达票类
      if (unit.wandaTicketId != '' && unit.wandaTicketId != null && unit.wandaTicketId != undefined) {
        setWandaTicket(unit.wandaTicketId);
      } else {
        setWandaTicket(false);
      }

      if (unitId) {
        $('#wandaTicketId').prop('disabled', true);
      }

      //活动形式
      $('#activityPattern option').eq(unit.activityPattern - 1).prop('selected', true);
      var html = '';
      var index = 0;
      _(unit.activityPatternList).forEach(function (pattern) {
        html += '<tr>';
        html += '<td><input type="text" class="amount" required placeholder="必填" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" value="' + pattern.amount + '"></td>';
        html += '<td><input type="text" class="lowerBound parsley-range" placeholder="不限" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="' + index + '" value="' + pattern.lowerBound + '"></td>';
        html += '<td><input type="text" class="upperBound parsley-range" placeholder="不限" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="' + index + '" value="' + pattern.upperBound + '"></td>';
        html += '<td><button type="button" class="btn btn-xs btn-default btn-type-delete">删除</button></td></tr>';
        index++;
      });

      $('#typeTable tbody').html(html);
      setPattern(unit.activityPattern);

      //活动预算
      var previewHtml = '';
      var totalAmount = ~~unit.totalAmount == 0 ? '不限' : unit.totalAmount;
      var totalTicket = ~~unit.totalTicket == 0 ? '不限' : unit.totalTicket;
      previewHtml += '总金额预算：' + totalAmount + '；';
      previewHtml += '总出票预算：' + totalTicket + '；';
      _(unit.dailyBudgetList).forEach(function (daily) {
        previewHtml += '<p>' + daily.startDate + ' ~ ' + daily.endDate + '，日金额预算：' + (daily.dailyAmount == '' ? '不限' : daily.dailyAmount) + '，日出票预算：' + (daily.dailyTicket == '' ? '不限' : daily.dailyTicket) + '；</p>';
      });

      $('#preview-budget').html(previewHtml);

      //客群
      if (unit.cusTypes != null) {
        previewHtml = '';
        if (unit.cusTypes.length == _cusTypes.length) {
          previewHtml = '不限';
        } else {
          previewHtml = _cusTypes[unit.cusTypes[0] - 1];
        }

        $('#preview-custypes').html(previewHtml);
      }

      //特殊资格
      previewHtml = unit.qualification != null && unit.qualification[0] == 'UD' ? '手机银行一网通登录用户' : '不限';
      $('#preview-special').html(previewHtml);

      //单户限购
      previewHtml = '';
      if (unit.saleLimit != null) {
        previewHtml += ~~unit.saleLimit.dailyTicket != 0 ? '每日限购' + unit.saleLimit.dailyTicket + '张；' : '';
        previewHtml += ~~unit.saleLimit.totalTicket != 0 ? '总共限购' + unit.saleLimit.totalTicket + '张；' : '';
        previewHtml += ~~unit.saleLimit.dailyOrder != 0 ? '每日限购' + unit.saleLimit.dailyOrder + '笔；' : '';
        previewHtml += ~~unit.saleLimit.totalOrder != 0 ? '总共限购' + unit.saleLimit.totalOrder + '笔；' : '';
      } else {
        previewHtml = '不限';
      }

      $('#preview-restriction').html(previewHtml);

      //渠道
      unit.channels != null && unit.channels.length > 0 ? setChannel(unit.channels) : setChannel(false);

      //影片
      unit.films != null && unit.films.length > 0 ? setMovie(unit.films) : setMovie(false);

      //制式
      var previewHtmlFilmType = unit.filmType.length == _filmType.length ? '影片制式：不限' : '影片制式：[' + coupon.filmType.join('] [') + ']';
      var previewHtmlScreenType = '<br>屏幕规格：[' + unit.screenType.join('] [') + ']';
      var previewHtmlHallType = '<br>特殊影厅：[' + unit.hallType.join('] [') + ']';
      $('#preview-dimen').html(previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType);

      //影院
      $('#preview-cinema').html(unit.cinemas != null && unit.cinemas.length > 0 ? '选择了 ' + unit.cinemas.length + ' 个影院' : '不限');

      //场次
      setTimeTable(unit.timetables);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
