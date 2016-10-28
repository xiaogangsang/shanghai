'use strict;'

var common = require('common');
var _budgetSource = [];
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
var _submitting = false;
var _dimenChanged = false;
var _popupDataCache = {
  channels: [],
  hallType: ['普通'],
  filmType: ['2D', '3D'],
  screenType: ['普通'],
  films: [],
  cinemas: [],
  timetables: [],
};

$(function () {
  common.init('coupon-rule');

  setProvince();
  setBrand();

  var urlParam = common.getUrlParam();
  if (urlParam.couponId != undefined && urlParam.couponId != '') {
    setEdit(urlParam.couponId);
  } else {
    setWandaTicket(false);
    setBudgetSource(false);
    setMovie(false);
    setDimen(false, false, false, false);
    setChannel(false);
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

//上传图片
$(document).on('click', '#btn-upload', function (event) {
  event.preventDefault();
  $('#fileupload').next('span').remove();
  $('#popup-coupon-image-upload').modal('show');
  $('#fileupload').data('url', common.API_HOST + 'coupon/uploadImage').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#fileupload').next('span').remove();
      $('#fileupload').after(' <span>' + data.files[0].name + '</span>');
      $('#popup-coupon-image-upload button.btn-primary').off('click').on('click', function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },

    done: function (e, data) {
      $('#popup-coupon-image-upload button.btn-primary').prop('disable', false).text('上传');
      if (!!~~data.result.meta.result) {
        $('#imageUrl').val(data.result.data.savePath);
        alert('上传成功！');
        $('#popup-coupon-image-upload').modal('hide');
      } else {
        alert('上传失败：' + data.result.meta.msg);
      }
    },
  });
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
    $('#choosedCount').text(_popupDataCache.cinemas.length);
    var html = '';
    _(_popupDataCache.cinemas).forEach(function (cinema) {
      html += '<tr data-id="' + cinema.cinemaId + '"><td>' + cinema.cinemaName + '</td><td>' + cinema.cityName + '</td><td>' + cinema.brandName + '</td></tr>';
    });

    $('#search-cinema-choosed tbody').html(html);
    $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  }

  $('#popup-unit-cinema').modal('show');
});

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

$(document).on('change', '#couponPattern', function (event) {
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

  $('#formUnit input[type=submit]').prop('disabled', true).text('更新中...');

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
    hallType: _popupDataCache.hallType,
    filmType: _popupDataCache.filmType,
    screenType: _popupDataCache.screenType,
    couponPattern: $('#couponPattern').val(),
    patternList: [],
    films: _popupDataCache.films,
    cinemas: [],
    timetables: _popupDataCache.timetables,
  };

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

  var ajaxUrl = 'coupon/couponSave';
  if ($('#id').size() > 0) {
    ajaxUrl = 'coupon/couponUpdate';
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
      if (ajaxUrl == 'coupon/couponUpdate') {
        alert('更新成功！');
        document.location.reload(true);
      } else {
        alert('保存成功！');
        document.location = 'coupon-rule.html';
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

  var previewHtmlScreenType = '<br>屏幕规格：';
  _(_screenType).forEach(function (dimen) {
    dimen.checked = true;
    if (checkedScreenType != false && checkedScreenType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    } else {
      previewHtmlScreenType += '[' + dimen.name + '] ';
    }
  });

  var previewHtmlHallType = '<br>特殊影厅：';
  _(_hallType).forEach(function (dimen) {
    dimen.checked = true;
    if (checkedHallType != false && checkedHallType.indexOf(dimen.name) < 0) {
      dimen.checked = false;
    } else {
      previewHtmlHallType += '[' + dimen.name + '] ';
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

function setEdit(couponId) {
  $('h3').text('编辑优惠券:' + couponId);
  $.ajax({
    url: common.API_HOST + 'coupon/couponDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: couponId },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var coupon = res.data;
      _popupDataCache.channels = coupon.channels != null ? coupon.channels : [];
      _popupDataCache.films = coupon.films != null ? coupon.films : [];
      _popupDataCache.filmType = coupon.filmType != null ? coupon.filmType : ['2D', '3D'];
      _popupDataCache.screenType = coupon.screenType != null ? coupon.screenType : ['普通', 'IMAX', 'DMAX', '巨幕'];
      _popupDataCache.hallType = coupon.hallType != null ? coupon.hallType : ['普通', '4D', '5D'];
      _popupDataCache.timetables = coupon.timetables != null ? coupon.timetables : [];
      _popupDataCache.advancePayment = coupon.advancePayment.split(',');

      coupon.cinemas = coupon.cinemas != null ? coupon.cinemas : [];
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
      });

      if (coupon == null || coupon == undefined) {
        alert('无法获取要编辑的活动单元信息，这个不太正常，让[猴子们]来查一查！');
        return false;
      }

      $('#formEdit').prepend('<input type="hidden" id="id" value="' + coupon.id + '">');

      $('#name').val(coupon.name).prop('disabled', true);;
      $('#signNo').val(coupon.signNo).prop('disabled', true);;
      $('#beginDate').val(coupon.beginDate.split(' ')[0]);
      $('#endDate').val(coupon.endDate.split(' ')[0]);

      $('input[name=advancePayment]').prop({ disabled: true, checked: false });
      $('input[name=advancePayment]').each(function (index, el) {
        $(el).prop('checked', _popupDataCache.advancePayment == 'ALL' || _popupDataCache.advancePayment.indexOf($(el).val()) > -1 ? true : false);
      });

      $('#couponDesc').val(coupon.couponDesc);
      $('#imageUrl').val(coupon.imageUrl);
      $('#maxInventory').val(coupon.maxInventory);

      //成本中心
      if (coupon.budgetSource != '' && coupon.budgetSource != null && coupon.budgetSource != undefined) {
        setBudgetSource(coupon.budgetSource);
      } else {
        setBudgetSource(false);
      }

      $('#level,#budgetSource').prop('disabled', true);

      //万达票类
      if (coupon.wandaTicketId != '' && coupon.wandaTicketId != null && coupon.wandaTicketId != undefined) {
        setWandaTicket(coupon.wandaTicketId);
      } else {
        setWandaTicket(false);
      }

      $('#wandaTicketId').prop('disabled', true);

      //活动形式
      $('#couponPattern option').eq(coupon.couponPattern - 1).prop('selected', true);
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

      //渠道
      if (coupon.channels != null && coupon.channels.length > 0) {
        setChannel(coupon.channels);
      } else {
        setChannel(false);
      }

      //影片
      coupon.films != null && coupon.films.length > 0 ? setMovie(coupon.films) : setMovie(false);

      //制式
      if (coupon.filmType == null && coupon.screenType == null && coupon.hallType == null) {
        $('#preview-dimen').html('不限');
      } else {
        var previewHtmlFilmType = coupon.filmType.length == _filmType.length ? '影片制式：不限' : '影片制式：[' + coupon.filmType.join('] [') + ']';
        var previewHtmlScreenType = '<br>屏幕规格：[' + coupon.screenType.join('] [') + ']';
        var previewHtmlHallType = '<br>特殊影厅：[' + coupon.hallType.join('] [') + ']';
        $('#preview-dimen').html(previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType);
      }

      //影院
      $('#preview-cinema').html(coupon.cinemas != null && coupon.cinemas.length > 0 ? '选择了 ' + coupon.cinemas.length + ' 个影院' : '不限');

      //场次
      setTimeTable(coupon.timetables);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
