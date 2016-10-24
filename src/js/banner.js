'use strict;'

var common = require('common');
var _channels = {};
var _cities = [];
var _choosed = [];
var _movies = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _searchCache = {};
var _useCache = false;
var _dataCache;
var _submitting = false;
var _provinces = [];
var _bannerType = ['', '首页', '热门影片', '交叉销售位', '选座页配置'];

$(function () {
  common.init('banner');
  setChannel();
  setProvince();

  $('#search_startTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_startTime').datetimepicker('setEndDate', FromEndDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_startTime').val(beginDate).datetimepicker('setEndDate', endDate);
  $('#search_endTime').val(endDate).datetimepicker('setStartDate', beginDate);

  $('#formSearch').trigger('submit');

  //data cache
  getCity();
  getMovie();
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    bannerName: $('#search_bannerName').val().trim(),
    iconName: $('#search_bannerName').val().trim(),
    bannerType: $('#search_bannerType').val(),
    channelId: $('#search_channelId').val(),
    channel: $('#search_channelId').val(),
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    cityId: $('#search_cityId').val(),
    pageSize: _pageSize,
  };
  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  var ajaxUrl = sendData.bannerType == 4 ? common.API_HOST + 'front/seatIcon/query' : common.API_HOST + 'banner/bannerList';

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      var data = sendData.bannerType == 4 ? res.data.seatIconList : res.data.rows;
      if (data.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        _useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, data.length, _pageTotal);
        _(data).forEach(function (item) {
          _(_channels).forEach(function (channel, key) {
            if (channel.channelId == item.channelId || channel.channelId == item.channel) {
              item.channelName = channel.channelName;
            }
          });

          item.bannerType = item.bannerType == undefined ? 4 : item.bannerType;
          item.bannerName = item.bannerType == 4 ? item.iconName : item.bannerName;
          item.bannerTypeName = _bannerType[item.bannerType];
          item.status = item.iconStatus != undefined ? item.iconStatus : item.status;
          item.statusName = item.status == 1 ? '是' : '否';
          item.startTime = item.startTime.split(' ')[0];
          item.endTime = item.endTime.split(' ')[0];
        });

        _dataCache = data;
        setTableData(_dataCache);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '.btn-create', function (e) {
  _choosed = [];
  setModal(false, $(this).data('type'));
  $('#startTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#endTime').datetimepicker('setStartDate', startDate);
  });

  $('#endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#startTime').datetimepicker('setEndDate', FromEndDate);
  });

  $('#popup-banner-form form').parsley();
  $('#popup-banner-form #filmId').chosen();
});

$(document).on('change click', '#search_provinceId', function (e) {
  e.preventDefault();
  var provinceId = parseInt($(this).val());
  var options = '';
  if (!!+provinceId) {
    var province = _.find(_provinces, { provinceId: provinceId.toString() });
    var cityList = province.cityList;
    _(cityList).forEach(function (value, key) {
      options += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
    });
  } else {
    options = '<option value="">全国</option>';
  }

  $('#search_cityId').html(options);
  return false;
});

$(document).on('change', 'input[name=areaType]', function (e) {
  e.preventDefault();
  if (!!~~$('input[name=areaType]:checked').val()) {
    $('#btn-city').closest('tr').show();
  } else {
    $('#btn-city').closest('tr').hide();
  }
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  var id = $(this).closest('tr').data('id');
  var banner;
  _(_dataCache).forEach(function (item) {
    if (item.id == id) {
      banner = item;
    }
  });

  _(_channels).forEach(function (channel) {
    channel.selected = banner.channelId == channel.channelId || banner.channel == channel.channelId ? true : false;
  });

  _choosed = banner.cityList != null ? banner.cityList : [];
  setModal(banner);
  $('#popup-banner-form').modal('show');
  $('#startTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#endTime').datetimepicker('setStartDate', startDate);
  });

  $('#endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#startTime').datetimepicker('setEndDate', FromEndDate);
  });

  $('#popup-banner-form form').parsley();
  $('#popup-banner-form #filmId').chosen();
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此banner吗？')) {
    $.ajax({
      url: common.API_HOST + 'banner/deleteBanner',
      type: 'POST',
      dataType: 'json',
      data: {
        id: that.data('id'),
        bannerType: that.data('bannertype'),
      },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        that.fadeOut(500, function () {
          that.remove();
        });
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('submit', '#popup-city form', function (event) {
  event.preventDefault();
  var choosedCity = [];
  $('.choosed-city .label').each(function () {
    choosedCity.push($(this).data('id'));
  });

  _choosed = choosedCity;
  $('#popup-city').modal('hide');
});

$('#dataTable').on('click', '.btn-status', function (event) {
  event.preventDefault();
  var tr = $(this).closest('tr');
  var sendData = {
    id: tr.data('id'),
    bannerType: tr.data('bannertype'),
    status: $(this).data('status') == 1 ? 0 : 1,
  };
  var statusName = sendData.status ? '上线' : '下线';
  var ajaxUrl = common.API_HOST + 'banner/updateBannerStatus';
  if (sendData.bannerType == 4) {
    ajaxUrl = sendData.status == 1 ? common.API_HOST + 'front/seatIcon/online' : common.API_HOST + 'front/seatIcon/offline';
  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      tr.find('.btn-status').data('status', sendData.status).html(sendData.status ? '下线' : '上线');
      tr.children('td:nth-child(6)').html(sendData.status ? '是' : '否');
      alert(statusName + '操作成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#popup-banner-form form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  if (!!~~$('input[name=areaType]:checked').val() && _choosed.length < 1) {
    alert('区域类型的banner，必须选择城市！');
    return false;
  }

  _submitting = true;

  var sendData = {
    status: ~~$('#popup-banner-form input[name=status]:checked').val(),
    startTime: $('#popup-banner-form #startTime').val().trim(),
    endTime: $('#popup-banner-form #endTime').val().trim(),
  };

  switch (~~$('#popup-banner-form #bannerType').val()) {
    case 1:
      sendData.bannerType = ~~$('#popup-banner-form #bannerType').val();
      sendData.bannerName = $('#popup-banner-form #bannerName').val().trim();
      sendData.channelId = ~~$('#popup-banner-form input[name=channelId]:checked').val();
      sendData.position = ~~$.trim($('#popup-banner-form #position').val());
      sendData.areaType = ~~$('input[name=areaType]:checked').val();
      sendData.cityList = [];
      if (sendData.areaType == 1) {
        sendData.cityList = _choosed;
        if (sendData.cityList.length < 1) {
          alert('区域类型的banenr，必须选择城市！');
          return false;
        }
      }

      sendData.imageUrl = $('#popup-banner-form #imageUrl').val();
      sendData.link = $('#popup-banner-form #link').val();
      break;
    case 2:
      sendData.bannerType = ~~$('#popup-banner-form #bannerType').val();
      sendData.bannerName = $('#popup-banner-form #bannerName').val().trim();
      sendData.channelId = ~~$('#popup-banner-form input[name=channelId]:checked').val();
      sendData.position = ~~$.trim($('#popup-banner-form #position').val());
      sendData.areaType = ~~$('input[name=areaType]:checked').val();
      sendData.cityList = [];
      if (sendData.areaType == 1) {
        sendData.cityList = _choosed;
        if (sendData.cityList.length < 1) {
          alert('区域类型的banenr，必须选择城市！');
          return false;
        }
      }

      sendData.filmId = ~~$('#popup-banner-form #filmId').val();
      break;
    case 3:
      sendData.bannerType = ~~$('#popup-banner-form #bannerType').val();
      sendData.bannerName = $('#popup-banner-form #bannerName').val().trim();
      sendData.channelId = ~~$('#popup-banner-form input[name=channelId]:checked').val();
      sendData.imageUrl = $('#popup-banner-form #imageUrl').val();
      sendData.link = $('#popup-banner-form #link').val();
      break;
    case 4:
      sendData.iconStatus = ~~$('#popup-banner-form input[name=status]:checked').val();
      sendData.channel = ~~$('#popup-banner-form input[name=channelId]:checked').val();
      sendData.filmId = ~~$('#popup-banner-form #filmId').val();
      if ($('#popup-banner-form #iconName').size() > 0) {
        sendData.iconName = $('#popup-banner-form #iconName').val().trim();
        sendData.seatStatus = $('#popup-banner-form input[name=seatStatus]:checked').val();
        sendData.picUrl = $('#popup-banner-form input[name=picUrl]').map(function () {
          if ($(this).val().trim() != '') {
            return $(this).val().trim();
          }
        }).get();
        sendData.picUrl = sendData.picUrl.join(',');
      }

      break;
    default:
      return false;
      break;
  }

  var ajaxUrl = sendData.bannerType == undefined ? common.API_HOST + 'front/seatIcon/add' : common.API_HOST + 'banner/saveBanner';
  if ($('#popup-banner-form #id').length > 0) {
    sendData.id = $('#popup-banner-form #id').val();
    ajaxUrl = sendData.bannerType == undefined ? common.API_HOST + 'front/seatIcon/update' : common.API_HOST + 'banner/updateBanner';
  }

  var ajaxContentType = sendData.bannerType == undefined ? 'application/x-www-form-urlencoded; charset=UTF-8' : 'application/json; charset=UTF-8';
  var sendData = sendData.bannerType == undefined ? sendData : JSON.stringify(sendData);

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: ajaxContentType,
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#popup-banner-form #id').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-banner-form').modal('hide');
      $('#formSearch').trigger('submit');
      _choosed = [];
      _(_cities).forEach(function (city) {
        city.selected = false;
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '#popup-banner-form #btn-upload, #popup-banner-form .btn-upload-seat', function (event) {
  event.preventDefault();
  var $this = $(this);
  $('#fileupload').next('span').remove();
  $('#popup-banner-upload').modal('show');
  $('#fileupload').data('url', common.API_HOST + 'banner/uploadPic').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#fileupload').next('span').remove();
      $('#fileupload').after(' <span>' + data.files[0].name + '</span>');
      $('#popup-banner-upload button.btn-primary').off('click').on('click', function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },

    done: function (e, data) {
      $('#popup-banner-upload button.btn-primary').prop('disable', false).text('上传');
      if (!!~~data.result.meta.result) {
        $this.closest('tr').find('input').val(data.result.data.savePath);
        alert('上传成功！');
        $('#popup-banner-upload').modal('hide');
      } else {
        alert('上传失败：' + data.result.meta.msg);
      }
    },
  });
});

$(document).on('click', '#popup-banner-form #btn-city', function (event) {
  event.preventDefault();
  var htmlChoosed = '';
  var htmlTab = '';
  var htmlPane = '';
  var tabCount = 1;
  var htmlGroup;
  var index = 1;
  var total = _cities.length;
  _(_cities).forEach(function (group) {
    if (index % 5 == 1) {
      htmlTab += '<li>'
      + '<a href="#section-' + index + '" aria-controls="section-' + index
      + '" role="tab" data-toggle="tab">';
      htmlPane += '<div role="tabpanel" class="tab-pane" id="section-' + index + '">';
    }

    htmlTab += group.key + ' ';
    htmlGroup = '<div class="input-group"><div class="input-group-addon">' + group.key + '</div>';
    _(group.group).forEach(function (city, key) {
      if (_choosed.indexOf(city.cityId) > -1) {
        htmlGroup += '<label>';
        htmlGroup += '<input type="checkbox" value="' + city.cityId + '" checked>';
        htmlGroup += '<span>' + city.cityName + '</span>';
        htmlGroup += '</label>';
        htmlChoosed += '<span class="label label-default" data-id="' + city.cityId + '">';
        htmlChoosed += city.cityName;
        htmlChoosed += ' <button type="button" class="close"><span>&times;</span></button>';
        htmlChoosed += '</span>';
      } else {
        htmlGroup += '<label>';
        htmlGroup += '<input type="checkbox" value="' + city.cityId + '">';
        htmlGroup += '<span>' + city.cityName + '</span>';
        htmlGroup += '</label>';
      }
    });

    htmlGroup += '</div>';
    htmlPane += htmlGroup;

    if (index % 5 == 0 || index == total) {
      htmlTab += '</a></li>';
      htmlPane += '</div>';
      tabCount++;
    }

    index++;
  });

  var data = { choosed: htmlChoosed, tab: htmlTab, pane: htmlPane };
  var template = $('#city-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-city .modal-body').html(html);
  $('#popup-city .nav-tabs li:first-child a').trigger('click');
  $('#popup-city').modal('show');

  $('.candidate-city').on('change', 'input[type=checkbox]', function (event) {
    event.preventDefault();
    var cityId = $(this).val();
    var cityName = $(this).next('span').text();
    if ($(this).prop('checked')) {
      $('.choosed-city').append('<span class="label label-default" data-id="' + cityId + '">' + cityName + ' <button type="button" class="close"><span>&times;</span></button></span>');
    } else {
      $('.choosed-city .label').each(function () {
        if ($(this).data('id') == cityId) {
          $(this).remove();
        }
      });
    }
  });

  $('#popup-city').on('change', '#chooseAll', function (event) {
    event.preventDefault();
    $('.choosed-city .label').remove();
    if (!!$(this).prop('checked')) {
      var choosed = '';
      $('.candidate-city input[type=checkbox]').each(function () {
        var cityId = $(this).val();
        var cityName = $(this).next('span').text();
        choosed += '<span class="label label-default" data-id="' + cityId + '">' + cityName + ' <button type="button" class="close"><span>&times;</span></button></span>';
      });

      $('.candidate-city input[type=checkbox]').prop('checked', true);
      $('.choosed-city').append(choosed);
    } else {
      $('.candidate-city input[type=checkbox]').prop('checked', false);
    }
  });
});

$(document).on('click', '#popup-city .choosed-city>.label>.close', function (event) {
  event.preventDefault();
  var $label = $(this).closest('.label');
  var cityId = $label.data('id');

  // if (_cityAuthority.indexOf('' + cityId) > -1) {
  $('.candidate-city input:checked').each(function (index, el) {
    if ($(el).val() == cityId) {
      $(el).prop('checked', false);
    }
  });

  $label.remove();

  // } else {
  //   alert('没有权限！');
  // }
});

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

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (!!~~$('#pageNo').val()) {
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

function setModal(bannerData, type) {
  var data;
  var template;
  var html;
  type = !~~type ? 1 : +type;
  if (bannerData) {
    data = { banner: bannerData, channels: _channels };
    switch (+bannerData.bannerType) {
      case 1:
        template = $('#edit-home-template').html();
        break;
      case 2:
        template = $('#edit-hot-template').html();
        data.movies = _movies;
        _(_movies).forEach(function (movie) {
          if (movie.filmId == bannerData.filmId) {
            data.banner.filmName = movie.filmName;
          }
        });

        break;
      case 3:
        template = $('#edit-sale-template').html();
        break;
      case 4:
        template = $('#edit-seat-template').html();
        data.movies = _movies;
        _(data.movies).forEach(function (movie) {
          movie.selected = movie.filmId == bannerData.filmId ? true : false;
        });

        bannerData.seatStatus--;
        bannerData.picUrl = '<div>' + bannerData.picUrls.join('</div><div>') + '</div>';
        break;
    }

    $('#popup-banner-form .modal-title').html('编辑[' + _bannerType[bannerData.bannerType] + ']');
  } else {
    data = { channels: _channels };
    switch (type) {
      case 1:
        template = $('#create-home-template').html();
        break;
      case 2:
        template = $('#create-hot-template').html();
        data.movies = _movies;
        break;
      case 3:
        template = $('#create-sale-template').html();
        break;
      case 4:
        template = $('#create-seat-template').html();
        data.movies = _movies;
        break;
    }

    $('#popup-banner-form .modal-title').html('新建[' + _bannerType[type] + ']');
  }

  Mustache.parse(template);
  html = Mustache.render(template, data);
  $('#popup-banner-form .modal-body').html(html);
  $('#popup-banner-form').modal('show');
  return false;
}

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
      $.each(_channels, function (index, item) {
        $('#search_channelId').append($('<option></option>').attr('value', item.channelId).text(item.channelName));
      });
    }
  });
}

function getMovie() {
  $.ajax({
    url: common.API_HOST + 'common/filmList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _movies = res.data;
    }
  });
}

function getCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function (group, key) {
        _cities.push({ key: key, group: group });
      });
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

      $('#search_provinceId').append(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

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
