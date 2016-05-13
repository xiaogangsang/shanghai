'use strict;'

var common = require('common');
var _budgetSource = [];
var _wandaTicket = [];
var _movies = [];
var _dimens = [];
var _channels = [];
var _provinces = [];
var _submitting = false;

$(function() {
  common.init('activity-coupon');

  setProvince();
  setBrand();

  var urlParam = common.getUrlParam();
  if (urlParam.couponId != undefined && urlParam.couponId != '') {
    setEdit(urlParam.couponId);
  } else {
    setWandaTicket(false);
    setBudgetSource(false);
    setMovie(false);
    setDimen(false,false,false);
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
    leftAll: '#movieSelect_none'
  });

  $('#formEdit').parsley();

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
$(document).on('change', '#level', function(event) {
  event.preventDefault();
  var level = $(this).val();
  if (undefined == level || '' == level) {
    $('#budgetSource').html('<option value=""></option>');
    // $('#budgetSource').closest('.form-group').hide();
  } else {
    var sources = [];
    _(_budgetSource).forEach(function(group, key) {
      if (level == key) {
        sources = group;
      }
    });
    if (sources.length < 1) {
      $('#budgetSource').html('<option value=""></option>');
      // $('#budgetSource').closest('.form-group').hide();
      alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
    } else {
      var html = '';
      _(sources).forEach(function(source){
        html += '<option value="'+source.id+'">'+source.sourceName+'</option>';
      });
      $('#budgetSource').html(html);
      $('#budgetSource').closest('.form-group').show();
    }
  }
});

//渠道
$(document).on('click', '#btn-set-channel', function (event) {
  event.preventDefault();
  $('#popup-unit-channel').modal('show');
  $('#popup-unit-channel form').parsley();
});

$(document).on('submit', '#popup-unit-channel form', function (event) {
  event.preventDefault();
  var previewHtml = '';
  if ($('input[name=channels]:checked').size() == $('input[name=channels]').size()) {
    previewHtml = '不限';
  } else {
    $('input[name=channels]:checked').each(function (index, el) {
      previewHtml += $(el).next('span').text()+'；';
    });
  }

  $('#preview-channel').html(previewHtml);
  $('#popup-unit-channel').modal('hide');
  return false;
});

//影片
$(document).on('click', '#btn-set-movie', function(event) {
  event.preventDefault();
  $('#popup-unit-movie').modal('show');
});
$(document).on('click', '#popup-unit-movie button[type=submit]', function(event) {
  $('.multi-selection select:eq(1) option').prop('selected', true);
});
$(document).on('submit', '#popup-unit-movie form', function(event) {
  event.preventDefault();
  var preview_html = '';
  if ( $('#movieSelect_to option').length > 0 ) {
    $('#movieSelect_to option').each(function(index, el) {
      preview_html += $(el).val()+'['+$(el).text()+'] ';
    });
  }
  if(preview_html != '') {
    $('#preview-movie').html(preview_html);
  } else {
    $('#preview-movie').html('不限');
  }
  $('#popup-unit-movie').modal('hide');
  return false;
});

//制式
$(document).on('click', '#btn-set-dimen', function (event) {
  event.preventDefault();
  $('#popup-unit-dimen').modal('show');
  $('#popup-unit-dimen form').parsley();
});

$(document).on('submit', '#popup-unit-dimen form', function (event) {
  event.preventDefault();
  var previewHtmlFilmType = '影片制式：';
  if ($('input[name=filmType]:checked').size() == $('input[name=filmType]').size()) {
    previewHtmlFilmType += '不限';
  } else {
    $('input[name=filmType]:checked').each(function (index, el) {
      previewHtmlFilmType += '[' + $(el).next('span').text() + '] ';
    });
  }

  var previewHtmlScreenType = '<br>屏幕规格：';
  if ($('input[name=screenType]:checked').size() == $('input[name=screenType]').size()) {
    previewHtmlScreenType += '不限';
  } else {
    $('input[name=screenType]:checked').each(function (index, el) {
      previewHtmlScreenType += '[' + $(el).next('span').text() + '] ';
    });
  }

  var previewHtmlHallType = '<br>特殊影厅：';
  if ($('input[name=hallType]:checked').size() == $('input[name=hallType]').size()) {
    previewHtmlHallType += '不限';
  } else {
    $('input[name=hallType]:checked').each(function (index, el) {
      previewHtmlHallType += '[' + $(el).next('span').text() + '] ';
    });
  }


  $('#preview-dimen').html(previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType);
  $('#popup-unit-dimen').modal('hide');
  return false;
});

//影院
$(document).on('click', '#btn-set-cinema', function(event) {
  event.preventDefault();
  $('#popup-unit-cinema').modal('show');
});
$(document).on('change', '#search-cinema-provinceId', function(e) {
  var provinceId = parseInt( $(this).val() );
  if ( NaN != provinceId || undefined != provinceId  || '' != provinceId ) {
    var province = _.find(_provinces, { 'provinceId': provinceId.toString() });
    var cityList = province.cityList;
    var options = '<option value="">选择城市</option>';
    _(cityList).forEach(function(value, key){
      options += '<option value="'+value.cityId+'">'+value.cityName+'</option>';
    });
    $('#search-cinema-cityId').html(options);
  }
  return false;
});
$(document).on('click', '#btn-search-cinema', function(event) {
  event.preventDefault();
  var sendData = {
    brandId: $('#search-cinema-brandId').val(),
    cityId: $('#search-cinema-cityId').val(),
    cinemaName: $.trim( $('#search-cinema-cinemaName').val() ),
    associationStatus: 1,
    onlineStatus: 1,
    pageIndex: 1,
    pageSize: 9999
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
    data: sendData
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      if (res.data.rows.length <= 0 ) {
        $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
        return false;
      }
      var html = '';
      _(res.data.rows).forEach(function(cinema){
        html += '<tr data-id="'+cinema.id+'"><td>'+cinema.name+'</td><td>'+cinema.cityName+'</td><td>'+cinema.brandName+'</td></tr>';
      });
      $('#search-cinema-candidate tbody').html(html);
    } else {
      $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#search-cinema-candidate tbody tr, #search-cinema-choosed tbody tr', function(event) {
  event.preventDefault();
  $(this).toggleClass('selected');
});
$(document).on('click', '#search-cinema-add-all', function(event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function(index, el) {
    choosedIds.push($(el).data('id'));
  });
  $('#search-cinema-candidate tbody tr').each(function(index, el) {
    if ( choosedIds.indexOf($(el).data('id')) == -1 ) {
      $(el).clone().appendTo("#search-cinema-choosed tbody").removeClass('selected');
    }
  });
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});
$(document).on('click', '#search-cinema-add', function(event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function(index, el) {
    choosedIds.push($(el).data('id'));
  });
  $('#search-cinema-candidate tbody tr.selected').each(function(index, el) {
    if ( choosedIds.indexOf($(el).data('id')) == -1 ) {
      $(el).clone().appendTo("#search-cinema-choosed tbody").removeClass('selected');
    }
  });
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});
$(document).on('click', '#search-cinema-remove-all', function(event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text('0');
});
$(document).on('click', '#search-cinema-remove', function(event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr.selected').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});
$(document).on('click', '#btn-cinema-filter', function(event) {
  event.preventDefault();
  $('#input-cinema-filter').val('');
  $('#search-cinema-choosed tbody tr').show();
});
$(document).on('submit', '#popup-unit-cinema form', function(event) {
  event.preventDefault();
  var preview_html = '';
  if ( $('#search-cinema-choosed tbody tr').length > 0 ) {
    $('#search-cinema-choosed tbody tr').each(function(index, el) {
      preview_html += $(el).data('id')+'['+$(el).find('td:nth-child(1)').text()+'] ';
    });
    $('#preview-cinema').html(preview_html);
  } else {
    $('#preview-cinema').html('不限');
  }
  $('#popup-unit-cinema').modal('hide');
  return false;
});

//场次
$(document).on('click', '#btn-set-showtime', function(event) {
  event.preventDefault();
  $('#popup-unit-showtime').modal('show');
  $('#popup-unit-showtime form').parsley();
});
$(document).on('click', '#btn-showtime', function(event) {
  event.preventDefault();
  var template = $('#showtime-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#showtimeTable tbody').append(html);
  $('#popup-unit-showtime').scrollTop($('#popup-unit-showtime').height());
  $('.beginDate, .endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  $('.beginTime, .endTime').datetimepicker({format: 'hh:ii', language: 'zh-CN', startView: 1, autoclose: true});
});
$(document).on('click', '#showtimeTable .btn-delete', function(event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条场次限制吗？')) {
    $(this).closest('tr').remove();
  }
});
$(document).on('submit', '#popup-unit-showtime form', function(event) {
  event.preventDefault();
  var preview_html = '';
  if ( $('#showtimeTable tbody tr').length >0 ) {
    $('#showtimeTable tbody tr').each(function(index, el) {
      var beginDate = $(el).find('.beginDate').val();
      var endDate = $(el).find('.endDate').val();
      var beginTime = $(el).find('.beginTime').val();
      var endTime = $(el).find('.endTime').val();
      preview_html += '<p>'+beginDate+' ~ '+endDate+' 每天 '+beginTime+' ~ '+endTime+'</p>';
    });
    $('#preview-showtime').html(preview_html);
  } else {
    $('#preview-showtime').html('不限');
  }
  $('#popup-unit-showtime').modal('hide');
  return false;
});
$(document).on('change', '#couponPattern', function(event) {
  event.preventDefault();
  var current = +$(this).val();
  switch (current) {
    case 1:
    case 3:
    case 4:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('#limitNum').prop({disabled: false, required: true});
      $('#typeTable th:nth-child(3)').text('单张票价区间（最低）');
      $('#typeTable th:nth-child(4)').text('单张票价区间（最高）');
    break;
    case 2:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$');
      $('#limitNum').prop({disabled: true, required: false});
      $('#typeTable th:nth-child(3)').text('订单价格区间（最低）');
      $('#typeTable th:nth-child(4)').text('订单价格区间（最高）');
    break;
    case 5:
      $('#amount').attr('data-parsley-pattern', '^[1-9]{1}$');
      $('#limitNum').prop({disabled: false, required: true});
      $('#typeTable th:nth-child(3)').text('单张票价区间（最低）');
      $('#typeTable th:nth-child(4)').text('单张票价区间（最高）');
    break;
  }
});

//form
$(document).on('submit', '#formEdit', function(event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }
  _submitting = true;

  $('#formUnit input[type=submit]').prop('disabled', true).text('更新中...');

  var sendData = {
    name: $.trim( $('#name').val() ),
    signNo: $.trim( $('#signNo').val() ),
    budgetSource: $('#budgetSource').val(),
    beginDate: $('#beginDate').val(),
    endDate: $('#endDate').val(),
    budgetSource: $('#budgetSource').val(),
    wandaTicketId: $('#wandaTicketId').val(),
    advancePayment: $('input[name=advancePayment]:checked').val(),
    channels: [],
    hallType: [],
    filmType: [],
    screenType: [],
    couponPattern: $('#couponPattern').val(),
    patternList: [],
    films: [],
    cinemas: [],
    timetables: []
  };
  $('input[name=channels]:checked').each(function(index, el) {
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

  sendData.patternList.push( {
    amount: $('#amount').val(),
    limitNum: $('#limitNum').val(),
    lowerBound: $('#lowerBound').val(),
    upperBound: $('#upperBound').val()
  } );

  $('#movieSelect_to option').each(function(index, el) {
    sendData.films.push( $(el).val() );
  });
  $('#search-cinema-choosed tbody tr').each(function(index, el) {
    sendData.cinemas.push( $(el).data('id') );
  });
  $('#showtimeTable tbody tr').each(function(index, el) {
    var beginDate = $(el).find('.beginDate').val();
    var endDate = $(el).find('.endDate').val();
    var beginTime = $(el).find('.beginTime').val();
    var endTime = $(el).find('.endTime').val();
    sendData.timetables.push( {beginDate:beginDate,endDate:endDate,beginTime:beginTime,endTime:endTime} );
  });

  var ajaxUrl = 'coupon/couponSave';
  if ( $('#id').size() > 0 ) {
    ajaxUrl = 'coupon/couponUpdate';
    sendData.id = $('#id').val();
  }
  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData)
  })
  .done(function(res) {
    $('#formUnit input[type=submit]').prop('disabled', false).text('保存');
    if (!!~~res.meta.result) {
      if ( ajaxUrl == 'coupon/couponUpdate' ) {
        alert('更新成功！');
        document.location.reload(true);
      } else {
        alert('保存成功！');
        document.location = 'activity-coupon.html';
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});

//数据缓存
function setBudgetSource( budgetSourceId ) {
  $.ajax({
    url: common.API_HOST + 'activity/budgetSourceList',
    type: 'POST',
    dataType: 'json'
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      _budgetSource = res.data;
      if (false != budgetSourceId) {
        var html = '';
        var levelId = 0;
        _(_budgetSource).forEach(function(group, key){
          _(group).forEach(function(source){
            if (budgetSourceId == source.id) {
              levelId = parseInt(key);
            }
          });
        });
        $('#level option').eq(1+levelId).prop('selected', true);
        _(_budgetSource[levelId]).forEach(function(source){
          if (budgetSourceId == source.id) {
            html += '<option value="'+source.id+'" selected>'+source.sourceName+'</option>';
          } else {
            html += '<option value="'+source.id+'">'+source.sourceName+'</option>';
          }
        });
        $('#budgetSource').html(html);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function(brand){
        $('#search-cinema-brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setWandaTicket( wandaTicketId ) {
  $.ajax({
    url: common.API_HOST + 'activity/wandaActivityTicketList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.wandaTicketList.length < 1) {
        return false;
      } else {
        _wandaTicket = res.data.wandaTicketList;
        var html = '';
        _(_wandaTicket).forEach(function(ticket) {
          if (wandaTicketId == ticket.id) {
            html += '<option value="'+ticket.id+'" selected>'+ticket.ticketId+'</option>';
          } else {
            html += '<option value="'+ticket.id+'">'+ticket.ticketId+'</option>';
          }
        });
        $('#wandaTicketId').append(html);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setMovie( films ) {
  $.ajax({
    url: common.API_HOST + 'common/filmList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        _movies = res.data;
        var html = '';
        var choosed_html = '';
        var preview_html = '';
        _(_movies).forEach(function(movie) {
          if (films != false && films.indexOf(movie.filmId) > -1) {
            choosed_html += '<option value="'+movie.filmId+'">'+movie.filmName+'</option>';
            preview_html += movie.filmId+'['+movie.filmName+'] ';
          } else {
            html += '<option value="'+movie.filmId+'">'+movie.filmName+'</option>';
          }
        });
        $('#movieSelect').html(html);
        $('#movieSelect_to').html(choosed_html);
        if (preview_html != '') {
          $('#preview-movie').html(preview_html);
        }
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setDimen(hallType, filmType, screenType) {
  $.ajax({
    url: common.API_HOST + 'common/allDimens',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        _dimens = res.data;
        var allChecked = true;

        var previewHtmlFilmType = '影片制式：';
        _(_dimens.filmType).forEach(function (dimen) {
          dimen.checked = true;
          if (filmType != false && filmType.indexOf(dimen.name) < 0) {
            dimen.checked = false;
            allChecked = false;
          } else {
            previewHtmlFilmType += '[' + dimen.name +  '] ';
          }
        });

         var previewHtmlScreenType = '<br>屏幕制式：';
        _(_dimens.screenType).forEach(function (dimen) {
          dimen.checked = true;
          if (screenType != false && screenType.indexOf(dimen.name) < 0) {
            dimen.checked = false;
            allChecked = false;
          } else {
            previewHtmlScreenType += '[' + dimen.name + '] ';
          }
        });

        var previewHtmlHallType = '<br>特殊影厅：';
        _(_dimens.hallType).forEach(function (dimen) {
          dimen.checked = true;
          if (hallType != false && hallType.indexOf(dimen.name) < 0) {
            dimen.checked = false;
            allChecked = false;
          } else {
            previewHtmlHallType += '[' + dimen.name + '] ';
          }
        });

        var previewHtml = '';
        if (allChecked==true) {
          previewHtml = '不限';
        } else {
          previewHtml = previewHtmlFilmType + previewHtmlScreenType + previewHtmlHallType;
        }

        $('#preview-dimen').html(previewHtml);

        var data = {dimens:_dimens};
        var template = $('#dimen-template').html();
        Mustache.parse(template);
        var html = Mustache.render(template, data);
        $('#popup-unit-dimen .modal-body').html(html);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
function setChannel(channels) {
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
        var previewHtml = '';
        var allChecked = true;
        _(_channels).forEach(function (channel) {
          channel.checked = true;
          if (channels != false && channels.indexOf(channel.channelId.toString()) < 0) {
            channel.checked = false;
            allChecked = false;
          } else {
            previewHtml += channel.channelName + '；';
          }
        });

        if (previewHtml=='' || allChecked==true) {
          previewHtml = '不限';
        }

        $('#preview-channel').html(previewHtml);

        var data = {channels:_channels};
        var template = $('#channel-template').html();
        Mustache.parse(template);
        var html = Mustache.render(template, data);
        $('#error-channel').before(html);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
function setCinema( cinemas ) {
  $.ajax({
    url: common.API_HOST + 'common/getCinemasByIds',
    type: 'POST',
    dataType: 'json',
    data: {ids:cinemas}
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        var html = '';
        var preview_html = '';
        _(res.data).forEach(function(cinema){
          html += '<tr data-id="'+cinema.cinemaId+'"><td>'+cinema.cinemaName+'</td><td>'+cinema.cityName+'</td><td>'+cinema.brandName+'</td></tr>';
          preview_html += cinema.cinemaId + '[' + cinema.cinemaName + '] ';
        });
        $('#search-cinema-choosed tbody').html(html);
        if (preview_html != '') {
          $('#preview-cinema').html(preview_html);
        }
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

function setProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      _provinces = res.data;
      var html = '';
      _(_provinces).forEach(function(province) {
        html += '<option value="'+province.provinceId+'">'+province.provinceName+'</option>';
      });
      $('#search-cinema-provinceId').append(html);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

function setEdit(couponId) {
  $('h3').text('编辑优惠券:'+couponId);
  $.ajax({
    url: common.API_HOST + 'coupon/couponDetail',
    type: 'POST',
    dataType: 'json',
    data: {id:couponId}
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      var coupon = res.data;
      if (coupon == null || coupon == undefined) {
        alert('无法获取要编辑的活动单元信息，这个不太正常，让[猴子们]来查一查！');
        return false;
      }

      $('#formEdit').prepend('<input type="hidden" id="id" value="'+coupon.id+'">');

      $('#name').val(coupon.name);
      $('#beginDate').val(coupon.beginDate.split(' ')[0]);
      $('#endDate').val(coupon.endDate.split(' ')[0]);

      $('input[name=advancePayment]').prop({'disabled': true, 'checked': false});
      $('input[name=advancePayment]').each(function(index, el) {
        if ($(el).val() == coupon.advancePayment) {
          $(el).prop('checked', true);
        }
      });

      //成本中心
      if (coupon.budgetSource != '' && coupon.budgetSource != null && coupon.budgetSource != undefined) {
        setBudgetSource(coupon.budgetSource);
      } else {
        setBudgetSource(false);
      }
      //万达票类
      if (coupon.wandaTicketId != '' && coupon.wandaTicketId != null && coupon.wandaTicketId != undefined) {
        setWandaTicket(coupon.wandaTicketId);
      } else {
        setWandaTicket(false);
      }
      //活动形式
      $('#couponPattern option').eq(coupon.couponPattern-1).prop('selected', true);
      if(coupon.couponPattern != null) {
        var htmlPattern = '<tr>';
        htmlPattern += '<td><input type="text" id="amount" required data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" placeholder="必填" value="'+coupon.patternList[0].amount+'"></td>';
        htmlPattern += '<td><input type="text" id="limitNum" required data-parsley-pattern="^[1-9]{1}\\d*$" placeholder="必填" value="'+coupon.patternList[0].limitNum+'"></td>';
        htmlPattern += '<td><input type="text" id="lowerBound" class="parsley-range" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="0" placeholder="不限" value="'+coupon.patternList[0].lowerBound+'"></td>';
        htmlPattern += '<td><input type="text" id="upperBound" class="parsley-range" data-parsley-pattern="^[1-9]{1}\\d*.{1}\\d{1,2}$|^[1-9]{1}\\d*$|^[0].{1}\\d{1,2}$" data-parsley-ur="0" placeholder="不限" value="'+coupon.patternList[0].upperBound+'"></td>'
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
      if (coupon.films != null && coupon.films.length > 0) {
        setMovie(coupon.films);
      } else {
        setMovie(false);
      }
      //制式
      var hallType = false;
      var filmType = false;
      var screenType = false;
      if (coupon.hallType != null && coupon.hallType.length > 0) {
        hallType = coupon.hallType
      }
      if (coupon.filmType != null && coupon.filmType.length > 0) {
        filmType = coupon.filmType
      }
      if (coupon.screenType != null && coupon.screenType.length > 0) {
        screenType = coupon.screenType
      }
      setDimen(hallType, filmType, screenType);
      //影院
      if (coupon.cinemas != null && coupon.cinemas.length > 0) {
        setCinema(coupon.cinemas.join('|'));
      }
      //场次
      if (coupon.timetables != null && coupon.timetables.length > 0) {
        var html = '';
        var preview_html = '';
        _(coupon.timetables).forEach(function(time){
          html += '<tr><td><input type="text" class="form-control beginDate" required value="'+time.beginDate+'"></td><td><input type="text" class="form-control endDate" required value="'+time.endDate+'"></td><td><input type="text" class="form-control beginTime" required value="'+time.beginTime+'"></td><td><input type="text" class="form-control endTime" required value="'+time.endTime+'"></td><td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td></tr>';
          preview_html += '<p>'+time.beginDate+' ~ '+time.endDate+' 每天 '+time.beginTime+' ~ '+time.endTime+'</p>';
        });
        $('#showtimeTable tbody').html(html);
        if (preview_html != '') {
          $('#preview-showtime').html(preview_html);
          $('.beginDate, .endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
        }
      }
      //填充完毕
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}