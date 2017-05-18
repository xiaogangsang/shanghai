'use strict;'

var common = require('common');
var util = require('util');
var pager = require('pager');

require('fineUploader');

var _channels = {};
var _cities = [];
var _choosed = [];
var _movies = {};
var _querying = false;
var _searchCache = {};
var _useCache = false;
var _dataCache;
var _submitting = false;
var _provinces = [];
var _cacheCinemas = [];

$(function () {
  common.init();
  util.init($);
  pager.init($('#pager'));

  setChannel();
  setProvince();
  setBrand();

  util.setupDateRange($('#search_startTime'), $('#search_endTime'));

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
  pager.pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = $(this).queryParam();
  sendData.pageSize = pager.pageSize;

  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }

  sendData.pageIndex = pager.pageIndex;

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
        pager.pageIndex = res.data.pageIndex;
        pager.pageTotal = Math.ceil(res.data.total / pager.pageSize);
        pager.setPager(res.data.total, pager.pageIndex, data.length, pager.pageTotal);
        _(data).forEach(function (item) {
          _(_channels).forEach(function (channel, key) {
            if (channel.channelId == item.channelId || channel.channelId == item.channel) {
              item.channelName = channel.channelName;
            }
          });

          item.bannerType = item.bannerType == undefined ? 4 : item.bannerType;
          item.noDel = item.bannerType == 4 ? true : false;
          item.bannerName = item.bannerType == 4 ? item.iconName : item.bannerName;
          item.bannerTypeName = util.bannerType[item.bannerType];
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

  util.setupDateRange($('#startTime'), $('#endTime'));

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

/**
 * 选择影院
 */
$(document).on('change', 'input[name=cinemaType]', function (e) {
  e.preventDefault();
  if (!!~~$('input[name=cinemaType]:checked').val()) {
    $('#btn-cinema').closest('tr').show();
  } else {
    $('#btn-cinema').closest('tr').hide();
  }
});

$(document).on('click', '#btn-cinema', function (event) {
  event.preventDefault();
  $('#search-cinema-brandId option ,#search-cinema-provinceId option').prop('selected', false);
  $('#search-cinema-cityId').html('<option value="">城市</option>');
  $('#search-cinema-candidate tbody, #search-cinema-choosed tbody').html('');
  $('#input-cinema-filter, #search-cinema-cinemaName').val('');
  if (_cacheCinemas != null && _cacheCinemas.length > 0) {
    var html = '';
    _(_cacheCinemas).forEach(function (cinema) {
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

  $('#search-cinema-cityId').html(options).chosen();
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
  _cacheCinemas = $('#search-cinema-choosed tbody tr').map(function () {
    var cinema = {
      cinemaId: $(this).data('id'),
      cinemaName: $(this).find('td:nth-child(1)').html(),
      cityName: $(this).find('td:nth-child(2)').html(),
      brandName: $(this).find('td:nth-child(3)').html(),
    };
    return cinema;
  }).get();
  $('#popup-unit-cinema').modal('hide');
  return false;
});

/**
 * 编辑按钮
 */
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
  util.setupDateRange($('#startTime'), $('#endTime'));

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
      sendData.cinemaType = ~~$('input[name=cinemaType]:checked').val();
      sendData.cinemaList = [];
      if (sendData.cinemaType == 1) {
        _(_cacheCinemas).forEach(function(item){
          sendData.cinemaList.push(item.cinemaId);
        });
        if (sendData.cinemaList.length < 1) {
          alert('当前选择了限制影院，请至少选择一个影院！');
          return false;
        }
      }
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
    case 5:
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
    default:
      alert('配置类型不存在！');
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

  $('#popup-city').on('change click', '#chooseAll', function (event) {
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


$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  pager.pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});


function setModal(bannerData, type) {
  var data;
  var template;
  var html;
  var uploadButton;
  if (bannerData) {
    data = { banner: bannerData, channels: _channels };
    switch (+bannerData.bannerType) {
      case 1:
        template = $('#edit-home-template').html();
        uploadButton = '#file-upload';
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
        data.banner.cinemaType = 0;
        if (data.banner.cinemaList != null && data.banner.cinemaList.length > 0) {
          data.banner.cinemaType = 1;
          $.ajax({
            url: common.API_HOST + 'common/getCinemasByIds',
            type: 'POST',
            dataType: 'json',
            data: { ids: data.banner.cinemaList.join('|') },
          })
          .done(function (res) {
            if (!!~~res.meta.result) {
              if (res.data == null || res.data.length < 1) {
                return false;
              } else {
                _cacheCinemas = res.data;
              }
            } else {
              alert('接口错误：' + res.meta.msg);
            }
          });
        }
        break;
      case 4:
        template = $('#edit-seat-template').html();
        data.movies = _movies;
        _(data.movies).forEach(function (movie) {
          movie.selected = movie.filmId == bannerData.filmId ? true : false;
        });

        bannerData.seatType = bannerData.seatStatus - 1;
        bannerData.pic = '';
        $.each(bannerData.picUrls, function (index, url) {
          bannerData.pic += '<img src="' + url + '" title="' + url + '" width="32" height="32"> ';
        });
        break;
      case 5:
        template = $('#edit-cinema-template').html();
        uploadButton = '#file-upload';
        break;
    }

    $('#popup-banner-form .modal-title').html('编辑[' + util.bannerType[bannerData.bannerType] + ']');
  } else {
    data = { channels: _channels };
    switch (+type) {
      case 1:
        template = $('#create-home-template').html();
        uploadButton = '#file-upload';
      break;
      case 2:
        template = $('#create-hot-template').html();
        data.movies = _movies;
      break;
      case 3:
        template = $('#create-sale-template').html();
        _cacheCinemas = [];
        break;
      case 4:
        template = $('#create-seat-template').html();
        uploadButton = '.file-upload';
        data.movies = _movies;
      break;
      case 5:
        template = $('#create-cinema-template').html();
        uploadButton = '#file-upload';
      break;
      case 6: 
        template = $('#promotion-template').html();
        uploadButton = '#file-upload';
      break;
    }

    $('#popup-banner-form .modal-title').html('新建[' + util.bannerType[type] + ']');
  }

  html = util.render(template, data);
  $('#popup-banner-form .modal-body').html(html);
  $('#popup-banner-form').modal('show');
  $('#popup-banner-form').on('shown.bs.modal', function (event) {
    event.preventDefault();
    if (uploadButton != undefined) {
      if (type == 4) {
        for (var i = 0; i < 4; i++) {
          var uploader = new qq.FineUploaderBasic({
            button: $(uploadButton)[i],
            request: {
              endpoint: common.API_HOST + 'banner/uploadPic',
              inputName: 'file',
              filenameParam: 'file',
            },
            callbacks: {
              onError: function (id, fileName, errorReason) {
                if (errorReason != 'Upload failure reason unknown') {
                  alert('上传失败' + errorReason);
                }
              },

              onComplete: function (id, fileName, responseJSON) {
                if (!!~~responseJSON.meta.result) {
                  $(this._options.button).closest('tr').find('input[type=text]').val(responseJSON.data.savePath);
                  alert('上传成功！');
                } else {
                  alert('上传失败：' + responseJSON.meta.msg);
                }
              },
            },
          });
        }
      } else {
        var uploader = new qq.FineUploaderBasic({
          button: $(uploadButton)[0],
          request: {
            endpoint: common.API_HOST + 'banner/uploadPic',
            inputName: 'file',
            filenameParam: 'file',
          },
          callbacks: {
            onError: function (id, fileName, errorReason) {
              if (errorReason != 'Upload failure reason unknown') {
                alert('上传失败' + errorReason);
              }
            },

            onComplete: function (id, fileName, responseJSON) {
              if (!!~~responseJSON.meta.result) {
                $(uploadButton).closest('tr').find('input[type=text]').val(responseJSON.data.savePath);
                alert('上传成功！');
              } else {
                alert('上传失败：' + responseJSON.meta.msg);
              }
            },
          },
        });
      }
    }
  });;

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

      $('#search_provinceId,#search-cinema-provinceId').append(html);
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