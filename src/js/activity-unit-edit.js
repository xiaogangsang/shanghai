var common = require('common');
var _budgetSource = [];
var _plans = [];
var _wandaTicket = [];
var _movies = [];
var _dimens = [];
var _channels = [];

$(function() {
  common.setMenu('activity-unit');
  common.setLoginName();
  var urlParam = common.getUrlParam();
  if (urlParam.unitId != undefined && urlParam.unitId != '') {
    setEdit(urlParam.unitId);
  } else {
    setPlan(false);
    setBrand();
    setWandaTicket(false);
    setBudgetSource(false);
    setMovie(false);
    setDimen(false);
    setChannel(false);
  }

  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
  };
  $('#beginDate, #endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});

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

  $('#formUnit').parsley();

});

//成本中心
$(document).on('change', '#level', function(event) {
  event.preventDefault();
  var level = $(this).val();
  if (undefined == level || '' == level) {
    $('#budgetSource').html('<option value="">全部</option>');
    $('#budgetSource').closest('.form-group').hide();
  } else {
    var sources = [];
    _(_budgetSource).forEach(function(group, key) {
      if (level == key) {
        sources = group;
      }
    });
    if (sources.length < 1) {
      $('#budgetSource').html('<option value="">全部</option>');
      $('#budgetSource').closest('.form-group').hide();
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

//活动形式
$(document).on('click', '#btn-type-add', function(event) {
  event.preventDefault();
  $('#typeTable tbody').append('<tr><td><input type="number" class="amount"></td><td><input type="number" class="upperBound"> - <input type="number" class="lowerBound"></td><td><button class="btn btn-xs btn-default btn-type-delete">删除</button></td></tr>');
});
$(document).on('click', '.btn-type-delete', function(event) {
  event.preventDefault();
  if ( $('#typeTable tbody tr').length < 2 ) {
    alert('作为一个负责任的系统，最后一条就不给你删了！');
    return false;
  }
  if (window.confirm('确定要删除此条规则吗？')) {
    $(this).closest('tr').remove();
  }
  return false;
});

// 活动预算
$(document).on('click', '#btn-set-daily', function(event) {
  event.preventDefault();
  $('#popup-unit-budget').modal('show');
  $('#popup-unit-budget form').parsley();
});
$(document).on('submit', '#popup-unit-budget form', function(event) {
  event.preventDefault();
  var totalAmount = $('#totalAmount').val();
  var totalTicket = $('#totalTicket').val();
  var preview_html = '';
  if (totalAmount != '') {
    preview_html += '总金额预算：' + totalAmount + '；';
  }
  if (totalTicket != '') {
    preview_html += '总出票预算：' + totalTicket + '；';
  }
  if ( $('#dailyBudgetTable tbody tr').length > 0 ) {
    $('#dailyBudgetTable tbody tr').each(function(index, el) {
      var startDate = $(el).find('.startDate ').val();
      var endDate = $(el).find('.endDate ').val();
      var dailyAmount = $(el).find('.dailyAmount').val();
      var dailyTicket = $(el).find('.dailyTicket').val();
      preview_html += '<p>'+startDate+' ~ '+endDate+'，日金额预算：'+dailyAmount+'，日出票预算：'+dailyTicket+'；</p>';
    });
  }
  if(preview_html != '') {
    $('#preview-budget').html(preview_html);
  } else {
    $('#preview-budget').html('不限');
  }
  $('#popup-unit-budget').modal('hide');
  return false;
});
$(document).on('click', '#btn-daily', function(event) {
  event.preventDefault();
  var template = $('#daily-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#dailyBudgetTable tbody').append(html);
  $('#popup-unit-budget').scrollTop($('#popup-unit-budget').height());
  $('.startDate, .endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
});
$(document).on('click', '#dailyBudgetTable .btn-delete', function(event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条日预算吗？')) {
    $(this).closest('tr').remove();
  }
});
//单户限购
$(document).on('click', '#btn-set-restriction', function(event) {
  event.preventDefault();
  $('#popup-unit-restriction').modal('show');
  $('#popup-unit-restriction form').parsley();
});
$(document).on('submit', '#popup-unit-restriction form', function(event) {
  event.preventDefault();
  var dailyTicket = $('#saleLimit_dailyTicket').val();
  var dailyOrder = $('#saleLimit_dailyOrder').val();
  var totalTicket = $('#saleLimit_totalTicket').val();
  var totalOrder = $('#saleLimit_totalOrder').val();
  var preview_html = '';
  if (dailyTicket != '') {
    preview_html += '每日限购'+dailyTicket+'张；';
  }
  if (totalTicket != '') {
    preview_html += '总共限购'+totalTicket+'张；';
  }
  if (dailyOrder != '') {
    preview_html += '每日限购'+dailyOrder+'笔；';
  }
  if (totalOrder != '') {
    preview_html += '总共限购'+totalOrder+'笔；';
  }
  if(preview_html != '') {
    $('#preview-restriction').html(preview_html);
  } else {
    $('#preview-restriction').html('不限');
  }
  $('#popup-unit-restriction').modal('hide');
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
//影院
$(document).on('click', '#btn-set-cinema', function(event) {
  event.preventDefault();
  $('#popup-unit-cinema').modal('show');
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
  if (sendData.brandId == '') {
    alert('为了更加方便地查找，请选择院线！');
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
    // console.log(res);
    if (true == res.meta.result) {
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


//form
$(document).on('submit', '#formUnit', function(event) {
  event.preventDefault();
  var sendData = {
    name: $.trim( $('#name').val() ),
    planId: $('#planId').val(),
    beginDate: $('#beginDate').val(),
    endDate: $('#endDate').val(),
    dailyEffectiveBeginTime: $('#beginHH').val()+':'+$('#beginMM').val()+':'+$('#beginSS').val(),
    dailyEffectiveEndTime: $('#endHH').val()+':'+$('#endMM').val()+':'+$('#endSS').val(),
    budgetSource: $('#budgetSource').val(),
    wandaTicketId: $('#wandaTicketId').val(),
    priority: $('#priority').val(),
    advancePayment: $('input[name=advancePayment]:checked').val(),
    cinemaPageDesc: $.trim( $('#cinemaPageDesc').val() ),
    activityIcon: $.trim( $('#activityIcon').val() ),
    timetablePageDesc: $.trim( $('#timetablePageDesc').val() ),
    activityDesc: $.trim( $('#activityDesc').val() ),
    activityLink: $.trim( $('#activityLink').val() ),
    repeatedDay: [],
    customerType: [],
    channels: [],
    dimens: [],
    activityPattern: $('#activityPattern').val(),
    activityPatternList: [],
    totalAmount: $('#totalAmount').val(),
    totalTicket: $('#totalTicket').val(),
    dailyBudgetList: [],
    saleLimit: {dailyTicket: $('#dailyTicket').val(), dailyOrder: $('#dailyOrder').val(), totalTicket: $('#totalTicket').val(), totalOrder: $('#totalOrder').val()},
    films: [],
    cinemas: [],
    timetables: []
  }
  $('input[name=repeatedDay]:checked').each(function(index, el) {
    sendData.repeatedDay.push($(el).val());
  });
  sendData.repeatedDay = sendData.repeatedDay.join(',');
  $('input[name=customerType]:checked').each(function(index, el) {
    sendData.customerType.push($(el).val());
  });
  $('input[name=channels]:checked').each(function(index, el) {
    sendData.channels.push($(el).val());
  });
  $('input[name=dimens]:checked').each(function(index, el) {
    sendData.dimens.push($(el).next('span').text());
  });
  $('#typeTable tbody tr').each(function(index, el) {
    var amount = $(el).find('.amount').val();
    var lowerBound = $(el).find('.lowerBound').val();
    var upperBound = $(el).find('.upperBound').val();
    sendData.activityPatternList.push( {amount:amount, lowerBound:lowerBound, upperBound:upperBound} );
  });
  $('#dailyBudgetTable tbody tr').each(function(index, el) {
    var startDate = $(el).find('.startDate').val();
    var endDate = $(el).find('.endDate').val();
    var dailyAmount = $(el).find('.dailyAmount').val();
    var dailyTicket = $(el).find('.dailyTicket').val();
    sendData.dailyBudgetList.push( {startDate:startDate, endDate:endDate, dailyAmount:dailyAmount, dailyTicket:dailyTicket} );
  });
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

  var ajaxUrl = 'activity/saveActivity';
  if ( $('#id').length > 0 ) {
    ajaxUrl = 'activity/updateActivity';
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
    // console.log(res);
    if (true == res.meta.result) {
     if ( ajaxUrl = 'activity/updateActivity' ) {
      alert('更新成功！');
      document.location.reload(true);
     } else {
      alert('保存成功！');
      document.location = 'activity-unit.html';
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
    // console.log(res);
    if (true == res.meta.result) {
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
    // console.log(res.data);
    if (true == res.meta.result) {
      _(res.data).forEach(function(brand){
        $('#search-cinema-brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setPlan(planId) {
  $.ajax({
    url: common.API_HOST + 'plan/planList',
    type: 'POST',
    dataType: 'json',
    data: {status: 1, pageIndex: 1, pageSize: 9999}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        alert('没有已上线的计划，这不正常哦！');
        return false;
      } else {
        _plans = res.data.rows;
        var html = '';
        _(_plans).forEach(function(plan) {
          if (planId == plan.id) {
            html += '<option value="'+plan.id+'" selected>'+plan.name+'</option>';
          } else {
            html += '<option value="'+plan.id+'">'+plan.name+'</option>';
          }
        });
        $('#planId').append(html);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setWandaTicket( wandaTicketId ) {
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketList',
    type: 'POST',
    dataType: 'json',
    data: {status: 1, pageIndex: 1, pageSize: 9999}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data == null || res.data.rows.length < 1) {
        return false;
      } else {
        _wandaTicket = res.data.rows;
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
    // console.log(res);
    if (true == res.meta.result) {
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
            preview_html += movie.filmId+'['+movie.filmName+']';
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
function setDimen( dimens ) {
  $.ajax({
    url: common.API_HOST + 'common/dimenList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        _dimens = res.data;
        var html = '';
        _(_dimens).forEach(function(dimen) {
          if (dimens != false) {
            if (dimens.indexOf(dimen.name) > -1) {
              html += '<div class="checkbox-inline"><label><input type="checkbox" name="dimens" value="'+dimen.id+'" required data-parsley-errors-container="#error-dimens" checked><span>'+dimen.name+'</span></label></div>';
            } else {
              html += '<div class="checkbox-inline"><label><input type="checkbox" name="dimens" value="'+dimen.id+'" required data-parsley-errors-container="#error-dimens"><span>'+dimen.name+'</span></label></div>';
            }
          } else {
            html += '<div class="checkbox-inline"><label><input type="checkbox" name="dimens" value="'+dimen.id+'" required data-parsley-errors-container="#error-dimens" checked><span>'+dimen.name+'</span></label></div>';
          }
        });
        $('#error-dimens').before(html);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setChannel( channels ) {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data == null || res.data.length < 1) {
        return false;
      } else {
        _channels = res.data;
        var html = '';
        _(_channels).forEach(function(channel) {
          if (channels != false) {
            if (channels.indexOf(channel.channelId.toString()) > -1) {
              html += '<div class="checkbox-inline"><label><input type="checkbox" name="channels" value="'+channel.channelId+'" required data-parsley-errors-container="#error-channels" checked><span>'+channel.channelName+'</span></label></div>';
            } else {
              html += '<div class="checkbox-inline"><label><input type="checkbox" name="channels" value="'+channel.channelId+'" required data-parsley-errors-container="#error-channels"><span>'+channel.channelName+'</span></label></div>';
            }
          } else {
            html += '<div class="checkbox-inline"><label><input type="checkbox" name="channels" value="'+channel.channelId+'" required data-parsley-errors-container="#error-channels" checked><span>'+channel.channelName+'</span></label></div>';
          }
        });
        $('#error-channels').before(html);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}


function setEdit(unitId) {
  $('h3').text('编辑活动单元:'+unitId);
  $.ajax({
    url: common.API_HOST + 'activity/activityDetail',
    type: 'POST',
    dataType: 'json',
    data: {id:unitId}
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      var unit = res.data;
      if (unit == null || unit == undefined) {
        alert('无法获取要编辑的活动单元信息，这个不太正常，让[猴子们]来查一查！');
        return false;
      }

      $('#formUnit').prepend('<input type="hidden" id="id" value="'+unit.id+'">');

      $('#name').val(unit.name);
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
      _(repeatedDay).forEach(function(day){
        $('input[name=repeatedDay]').eq(day-1).prop('checked', true);
      });
      $('#priority').val(unit.priority);
      var advancePayment = unit.advancePayment == 1 ? 0 : 1;
      $('input[name=advancePayment]').eq(advancePayment).prop('checked', true);
      $('#cinemaPageDesc').val(unit.cinemaPageDesc);
      $('#activityIcon').val(unit.activityIcon);
      $('#timetablePageDesc').val(unit.timetablePageDesc);
      $('#activityDesc').val(unit.activityDesc);
      $('#activityLink').val(unit.activityLink);
      $('input[name=customerType]').prop('checked', false);
      _(unit.cusTypes).forEach(function(cus){
        $('input[name=customerType]').eq(cus-1).prop('checked', true);
      });
      //计划
      if (unit.planId != '' && unit.planId != null && unit.planId != undefined) {
        setPlan(unit.planId);
      } else {
        setPlan(false);
      }
      //成本中心
      if (unit.budgetSourceId != '' && unit.budgetSourceId != null && unit.budgetSourceId != undefined) {
        setBudgetSource(unit.budgetSourceId);
      } else {
        setBudgetSource(false);
      }
      //万达票类
      if (unit.wandaTicketId != '' && unit.wandaTicketId != null && unit.wandaTicketId != undefined) {
        setWandaTicket(unit.wandaTicketId);
      } else {
        setWandaTicket(false);
      }
      //活动形式
      $('#activityPattern option').eq(unit.activityPattern-1).prop('selected', true);
      var html = '';
      _(unit.activityPatternList).forEach(function(pattern){
        html += '<tr><td><input type="number" class="amount" value="'+pattern.amount+'" required></td><td><input type="number" class="lowerBound" value="'+pattern.lowerBound+'"> - <input type="number" class="upperBound" value="'+pattern.upperBound+'"></td><td><button type="button" class="btn btn-xs btn-default btn-type-delete">删除</button></td></tr>';
      });
      $('#typeTable tbody').html(html);
      //活动预算
      $('#totalAmount').val(unit.totalAmount);
      $('#totalTicket').val(unit.totalTicket);
      var preview_html = '';
      if (unit.totalAmount != '') {
        preview_html += '总金额预算：' + unit.totalAmount + '；';
      }
      if (unit.totalTicket != '') {
        preview_html += '总出票预算：' + unit.totalTicket + '；';
      }
      var html = '';
      _(unit.dailyBudgetList).forEach(function(daily){
        html += '<tr><td><input type="text" class="form-control startDate" required value="'+daily.startDate+'"></td><td><input type="text" class="form-control endDate" required value="'+daily.endDate+'"></td><td><input type="number" class="form-control dailyAmount" required value="'+daily.dailyAmount+'"></td><td><input type="number" class="form-control dailyTicket" required value="'+daily.dailyTicket+'"></td><td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td></tr>';
        preview_html += '<p>'+daily.startDate+' ~ '+daily.endDate+'，日金额预算：'+daily.dailyAmount+'，日出票预算：'+daily.dailyTicket+'；</p>';
      });
      $('#dailyBudgetTable tbody').html(html);
      if(preview_html != '') {
        $('#preview-budget').html(preview_html);
        $('.startDate, .endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
      }
      //单户限购
      $('#saleLimit_dailyOrder').val(unit.saleLimit.dailyOrder);
      $('#saleLimit_dailyTicket').val(unit.saleLimit.dailyTicket);
      $('#saleLimit_totalOrder').val(unit.saleLimit.totalOrder);
      $('#saleLimit_totalTicket').val(unit.saleLimit.totalTicket);
      var preview_html = '';
      if (unit.saleLimit.dailyTicket != '') {
        preview_html += '每日限购'+unit.saleLimit.dailyTicket+'张；';
      }
      if (unit.saleLimit.totalTicket != '') {
        preview_html += '总共限购'+unit.saleLimit.totalTicket+'张；';
      }
      if (unit.saleLimit.dailyOrder != '') {
        preview_html += '每日限购'+unit.saleLimit.dailyOrder+'笔；';
      }
      if (unit.saleLimit.totalOrder != '') {
        preview_html += '总共限购'+unit.saleLimit.totalOrder+'笔；';
      }
      if(preview_html != '') {
        $('#preview-restriction').html(preview_html);
      }
      //渠道
      if (unit.channels.length > 0 && unit.channels != null) {
        setChannel(unit.channels);
      } else {
        setChannel(false);
      }
      //影片
      if (unit.films.length > 0 && unit.films != null) {
        setMovie(unit.films);
      } else {
        setMovie(false);
      }
      //制式
      if (unit.dimens.length > 0 && unit.dimens != null) {
        setDimen(unit.dimens);
      } else {
        setDimen(false);
      }
      //影院
      //TODO 缺少接口，不能一个个去读取
      //场次
      if (unit.timetables.length > 0 && unit.timetables != null) {
        var html = '';
        var preview_html = '';
        _(unit.timetables).forEach(function(time){
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