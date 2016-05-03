var common = require('common');
var _channels = {};
var _cities = [];
var _choosed = [];
var _movies = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var searchCache = {};
var useCache = false;
var dataCache = [];

$(function() {
  common.setMenu('banner');
  //set search form
  setChannel();
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
  $('#search_startTime, #search_endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  var beginDate = new Date();
  var endDate = new Date();
  endDate.setDate(endDate.getDate()+7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_startTime').val(beginDate);
  $('#search_endTime').val(endDate);

  //data cache
  getCity();
  getMovie();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    bannerName: $.trim( $('#search_bannerName').val() ),
    bannerType: $('#search_bannerType').val(),
    channelId: $('#search_channelId').val(),
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    pageSize: _pageSize
  };
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }
  sendData.pageIndex = _pageIndex;
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'banner/bannerList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="10" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        return false;
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function(item){
          _(_channels).forEach(function(channel, key){
            if (channel.channelId == item.channelId) {
              item.channelName = channel.channelName;
            }
          });
          item.bannerTypeName = item.bannerType == 1 ? '首页' : '热门影片';
          item.statusName = item.status == 1 ? '是' : '否';
          item.startTime = item.startTime.split(' ')[0];
          item.endTime = item.endTime.split(' ')[0];
        });
        dataCache = res.data.rows;
        setTableData(dataCache);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$(document).on('click', '#btn-create', function(e) {
  _choosed = [];
  setModal(false);
  $('#popup-banner-form').modal('show');
  $('#startTime,#endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  $('#popup-banner-form form').parsley();
  $('#popup-banner-form #filmId').chosen();

  $('#popup-banner-form').on('change', '#bannerType', function(event) {
    event.preventDefault();
    if ( 1 == $(this).val() ) {
      $('.type-2').hide();
      $('.type-1').show();
      $('.type-1').find('input,select').prop('required', true);
      $('.type-2').find('input,select').prop('required', false);
    } else {
      $('.type-1').hide();
      $('.type-2').show();
      $('.type-1').find('input,select').prop('required', false);
      $('.type-2').find('input,select').prop('required', true);
      $('.chosen-search input').prop('required', false);
    }
    $('#popup-banner-form form').parsley().reset();
  });
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  var id = $(this).closest('tr').data('id');
  var banner;
  _(dataCache).forEach(function(item){
    if (item.id == id) {
      banner = item;
    }
  });
  console.log(banner);
  _(_channels).forEach(function(channel){
    channel.selected = banner.channelId == channel.channelId ? true : false;
  });
  _choosed = banner.cityList;
  setModal(banner);
  $('#popup-banner-form').modal('show');
  $('#startTime,#endTime').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  $('#popup-banner-form form').parsley();
  if (banner.bannerType == 2) {
    $('#popup-banner-form #filmId').chosen();
  }
});
$(document).on('submit', '#popup-city form', function(event) {
  event.preventDefault();
  var choosedCity = [];
  $('.choosed-city .label').each(function() {
    choosedCity.push( $(this).data('id') );
  });
  _choosed = choosedCity;
  // console.log(_choosed);
  $('#popup-city').modal('hide');
});
$('#dataTable').on('click', '.btn-status', function(event) {
  event.preventDefault();
  var tr = $(this).closest('tr');
  var sendData = {
    id: tr.data('id'),
    bannerType: tr.data('bannertype'),
    status: $(this).data('status') == 1 ? 0 : 1
  };
  // console.log(sendData);
  var statusName = sendData.status ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'banner/updateBannerStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      tr.find('.btn-status').data('status',sendData.status).html(sendData.status ? '下线' : '上线');
      tr.children('td:nth-child(6)').html(sendData.status?'是':'否');
      alert(statusName+'操作成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert("接口错误："+res.meta.msg);
    }
  });
});
$(document).on('submit', '#popup-banner-form form', function(event) {
  event.preventDefault();
  var sendData = {
    bannerType: $('#popup-banner-form #bannerType').val(),
    bannerName: $.trim( $('#popup-banner-form #bannerName').val() ),
    channelId: $('#popup-banner-form #channelId').val(),
    position: $.trim( $('#popup-banner-form #position').val() ),
    status: $('#popup-banner-form #status').val(),
    startTime: $.trim( $('#popup-banner-form #startTime').val() ),
    endTime: $.trim( $('#popup-banner-form #endTime').val() ),
    cityList: _choosed
  };
  if (sendData.cityList.length < 1) {
    alert('请选择城市！');
    return false;
  }
  if ( 1 == sendData.bannerType ) {
    sendData.imageUrl = $('#popup-banner-form #imageUrl').val();
    sendData.link = $('#popup-banner-form #link').val();
  } else {
    sendData.filmId = $('#popup-banner-form #filmId').val();
  }
  var ajaxUrl = common.API_HOST + 'banner/saveBanner';
  if( $('#popup-banner-form #id').length > 0) {
    sendData.id = $('#popup-banner-form #id').val();
    ajaxUrl = common.API_HOST + 'banner/updateBanner';
  }
  // console.log( sendData );
  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify( sendData )
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if( $('#popup-banner-form #id').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }
      $('#popup-banner-form').modal('hide');
      $('#formSearch').trigger('submit');
      _choosed = [];
      _(_cities).forEach(function(city){
        city.selected = false;
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$(document).on('click', '#popup-banner-form #btn-upload', function(event) {
  event.preventDefault();
  $('#fileupload').next('span').remove();
  $('#popup-banner-upload').modal('show');
  $('#fileupload').data('url', common.API_HOST+'banner/uploadPic').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#fileupload').next('span').remove();
      $('#fileupload').after(' <span>'+data.files[0].name+'</span>');
      $('#popup-banner-upload button.btn-primary').off('click').on('click',function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },
    done: function (e, data) {
      $('#popup-banner-upload button.btn-primary').prop('disable', false).text('上传');
      if (true == data.result.meta.result) {
        $('#imageUrl').val(common.API_HOST+data.result.data.savePath);
        alert('上传成功！');
        $('#popup-banner-upload').modal('hide');
      } else {
        alert('上传失败：'+data.result.meta.msg);
      }
    }
  });
});
$(document).on('click', '#popup-banner-form #btn-city', function(event) {
  event.preventDefault();
  var html_choosed = '';
  var html_tab = '';
  var html_pane = '';
  var tabCount = 1;
  var html_group;
  var index = 1;
  var total = _cities.length;
  _(_cities).forEach(function(group){
    // console.log(group);
    if (index%5 == 1) {
      html_tab += '<li><a href="#section-'+index+'" aria-controls="section-'+index+'" role="tab" data-toggle="tab">';
      html_pane += '<div role="tabpanel" class="tab-pane" id="section-'+index+'">';
    }
    html_tab += group.key+' ';
    html_group = '<div class="input-group"><div class="input-group-addon">'+group.key+'</div>';
    _(group.group).forEach(function(city, key){
      if (_choosed.indexOf(city.cityId) > -1) {
        html_group += '<label><input type="checkbox" value="'+city.cityId+'" checked><span>'+city.cityName+'</span></label>';
        html_choosed += '<span class="label label-default" data-id="'+city.cityId+'">'+city.cityName+' <button type="button" class="close"><span>&times;</span></button></span>';
      } else {
        html_group += '<label><input type="checkbox" value="'+city.cityId+'"><span>'+city.cityName+'</span></label>';
      }
    });
    html_group += '</div>';

    html_pane += html_group;

    if (index%5 == 0 || index == total) {
      html_tab += '</a></li>';
      html_pane += '</div>';
      tabCount++;
    }

    index++;
  });
  var data = {choosed: html_choosed, tab: html_tab, pane: html_pane};
  var template = $('#city-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-city .modal-body').html(html);
  $('#popup-city .nav-tabs li:first-child a').trigger('click');
  $('#popup-city').modal('show');

  $('.candidate-city').on('change', 'input[type=checkbox]', function(event) {
    event.preventDefault();
    var cityId = $(this).val();
    var cityName = $(this).next('span').text();
    if( true == $(this).prop('checked') ) {
      $('.choosed-city').append('<span class="label label-default" data-id="'+cityId+'">'+cityName+' <button type="button" class="close"><span>&times;</span></button></span>');
    } else {
      $('.choosed-city .label').each(function() {
        if ( $(this).data('id') == cityId ) {
          $(this).remove();
        }
      });
    }
  });
  $('#popup-city').on('change', '#chooseAll', function(event) {
    event.preventDefault();
    $('.choosed-city .label').remove();
    if( true == $(this).prop('checked') ) {
      var choosed = '';
      $('.candidate-city input[type=checkbox]').each(function() {
        var cityId = $(this).val();
        var cityName = $(this).next('span').text();
        choosed += '<span class="label label-default" data-id="'+cityId+'">'+cityName+' <button type="button" class="close"><span>&times;</span></button></span>'
      });
      $('.candidate-city input[type=checkbox]').prop('checked', true);
      $('.choosed-city').append(choosed);
    } else {
      $('.candidate-city input[type=checkbox]').prop('checked', false);
    }
  });
});

function setModal(bannerData) {
  var data, template, html;
  if (bannerData) {
    data = {banner:bannerData, channels:_channels};
    if (bannerData.bannerType == 1) {
      template = $('#index-template').html();
      $('#popup-banner-form .modal-title').html('编辑[首页]Banner');
    } else {
      data.movies = _movies;
      _(_movies).forEach(function(movie){
        if(movie.filmId == bannerData.filmId) {
          data.banner.filmId = movie.filmName;
        }
      });
      template = $('#movie-template').html();
      $('#popup-banner-form .modal-title').html('编辑[热门影片]Banner');
    }
  } else {
    data = {movies: _movies, channels:_channels};
    template = $('#create-template').html();
    $('#popup-banner-form .modal-title').html('新建Banner');
  }
  Mustache.parse(template);
  html = Mustache.render(template, data);
  $('#popup-banner-form .modal-body').html(html);
  return false;
}
$('#pager').on('click', '.prev,.next', function(e) {
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
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $("#formSearch").trigger('submit');
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
  return false;
});

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
      $.each(_channels, function(index, item) {
        $('#search_channelId').append($('<option></option>').attr('value', item.channelId).text(item.channelName));
      });
    }
  });
}
function getMovie() {
  $.ajax({
    url: common.API_HOST + 'common/filmList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _movies = res.data;
    }
  });
}
function getCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data).forEach(function(group, key){
        _cities.push({key:key, group:group});
      });
      // console.log(_cities);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}