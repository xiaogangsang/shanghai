/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/liuge/Workspace/moviesys/dist/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict;'
	
	var common = __webpack_require__(1);
	var _channels = {};
	var _cities = [];
	var _choosed = [];
	var _movies = {};
	var _pageIndex = 1;
	var _pageSize = 10;
	var _pageTotal = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	var dataCache;
	var _submitting = false;
	var _provinces = [];
	
	// var _cityAuthority = sessionStorage.getItem('cityAuthority').split(',');
	
	$(function () {
	  common.init('banner');
	
	  //set search form
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
	
	  //data cache
	  getCity();
	  getMovie();
	
	  $('#formSearch').trigger('submit');
	});
	
	//handle search form
	$('#formSearch').on('click', 'button[type=submit]', function (event) {
	  event.preventDefault();
	  _pageIndex = 1;
	  useCache = false;
	  $('#formSearch').trigger('submit');
	});
	
	$('#formSearch').on('submit', function (e) {
	  e.preventDefault();
	  var sendData = {
	    bannerName: $.trim($('#search_bannerName').val()),
	    bannerType: $('#search_bannerType').val(),
	    channelId: $('#search_channelId').val(),
	    startTime: $('#search_startTime').val(),
	    endTime: $('#search_endTime').val(),
	    cityId: $('#search_cityId').val(),
	    pageSize: _pageSize,
	  };
	  if (!!_querying) {
	    return false;
	  }
	
	  _querying = true;
	  if (useCache) {
	    sendData = searchCache;
	  } else {
	    searchCache = sendData;
	  }
	
	  sendData.pageIndex = _pageIndex;
	
	  $.ajax({
	    url: common.API_HOST + 'banner/bannerList',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _querying = false;
	    if (!!~~res.meta.result) {
	      if (res.data.rows.length < 1) {
	        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
	        $('#pager').html('');
	      } else {
	        useCache = true;
	        _pageIndex = res.data.pageIndex;
	        _pageTotal = Math.ceil(res.data.total / _pageSize);
	        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
	        _(res.data.rows).forEach(function (item) {
	          _(_channels).forEach(function (channel, key) {
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
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
	$(document).on('click', '#btn-create', function (e) {
	  _choosed = [];
	  setModal(false);
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
	
	  $('#popup-banner-form').on('change', '#bannerType', function (event) {
	    event.preventDefault();
	    if ($(this).val() == 1) {
	      $('.type-2, .type-3').hide();
	      $('.type-2, .type-3').find('input,select').prop('required', false);
	      $('.type-1').show();
	      $('.type-1').find('input,select').prop('required', true);
	    } else if ($(this).val() == 2) {
	      $('.type-1, .type-3').hide();
	      $('.type-1, .type-3').find('input,select').prop('required', false);
	      $('.type-2').show();
	      $('.type-2').find('input,select').prop('required', true);
	    } else {
	      $('.type-1, .type-2').hide();
	      $('.type-1, .type-2').find('input,select').prop('required', false);
	      $('.type-3').show();
	      $('.type-3').find('input,select').prop('required', true);
	    }
	
	    $('.chosen-search input').prop('required', false);
	    $('#popup-banner-form form').parsley().reset();
	  });
	});
	
	$(document).on('change', '#search_provinceId', function (e) {
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
	  _(dataCache).forEach(function (item) {
	    if (item.id == id) {
	      banner = item;
	    }
	  });
	
	  _(_channels).forEach(function (channel) {
	    channel.selected = banner.channelId == channel.channelId ? true : false;
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
	  $.ajax({
	    url: common.API_HOST + 'banner/updateBannerStatus',
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
	    bannerType: ~~$('#popup-banner-form #bannerType').val(),
	    bannerName: $.trim($('#popup-banner-form #bannerName').val()),
	    channelId: ~~$('#popup-banner-form #channelId').val(),
	    status: ~~$('#popup-banner-form #status').val(),
	    startTime: $.trim($('#popup-banner-form #startTime').val()),
	    endTime: $.trim($('#popup-banner-form #endTime').val()),
	  };
	
	  if (sendData.bannerType == 1 || sendData.bannerType == 2) {
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
	  }
	
	  if (sendData.bannerType == 1 || sendData.bannerType == 3) {
	    sendData.imageUrl = $('#popup-banner-form #imageUrl').val();
	    sendData.link = $('#popup-banner-form #link').val();
	  }
	
	  if (sendData.bannerType == 2) {
	    sendData.filmId = $('#popup-banner-form #filmId').val();
	  }
	
	  var ajaxUrl = common.API_HOST + 'banner/saveBanner';
	  if ($('#popup-banner-form #id').length > 0) {
	    sendData.id = $('#popup-banner-form #id').val();
	    ajaxUrl = common.API_HOST + 'banner/updateBanner';
	  }
	
	  $.ajax({
	    url: ajaxUrl,
	    type: 'POST',
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(sendData),
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
	
	$(document).on('click', '#popup-banner-form #btn-upload', function (event) {
	  event.preventDefault();
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
	        $('#imageUrl').val(data.result.data.savePath);
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
	
	        // if (_cityAuthority.indexOf('' + city.cityId) > -1) {
	        htmlGroup += '<label>';
	        htmlGroup += '<input type="checkbox" value="' + city.cityId + '" checked>';
	        htmlGroup += '<span>' + city.cityName + '</span>';
	        htmlGroup += '</label>';
	
	        // }
	
	        htmlChoosed += '<span class="label label-default" data-id="' + city.cityId + '">';
	        htmlChoosed += city.cityName;
	        htmlChoosed += ' <button type="button" class="close"><span>&times;</span></button>';
	        htmlChoosed += '</span>';
	
	      } else {
	
	        // if (_cityAuthority.indexOf('' + city.cityId) > -1) {
	        htmlGroup += '<label>';
	        htmlGroup += '<input type="checkbox" value="' + city.cityId + '">';
	        htmlGroup += '<span>' + city.cityName + '</span>';
	        htmlGroup += '</label>';
	
	        // }
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
	
	function setModal(bannerData) {
	  var data;
	  var template;
	  var html;
	  if (bannerData) {
	    data = { banner: bannerData, channels: _channels };
	    if (bannerData.bannerType == 1) {
	      template = $('#index-template').html();
	      $('#popup-banner-form .modal-title').html('编辑[首页]Banner');
	    } else if (bannerData.bannerType == 2) {
	      data.movies = _movies;
	      _(_movies).forEach(function (movie) {
	        if (movie.filmId == bannerData.filmId) {
	          data.banner.filmName = movie.filmName;
	        }
	      });
	
	      template = $('#movie-template').html();
	      $('#popup-banner-form .modal-title').html('编辑[热门影片]Banner');
	    } else {
	      template = $('#salling-template').html();
	      $('#popup-banner-form .modal-title').html('编辑[交叉销售]Banner');
	    }
	  } else {
	    data = { movies: _movies, channels: _channels };
	    template = $('#create-template').html();
	    $('#popup-banner-form .modal-title').html('新建Banner');
	  }
	
	  Mustache.parse(template);
	  html = Mustache.render(template, data);
	  $('#popup-banner-form .modal-body').html(html);
	  return false;
	}
	
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
	  useCache = false;
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict;'
	
	__webpack_require__(2);
	var common = {};
	
	common.API_HOST = window.location.protocol + '//' + window.location.host + '/MovieOps/';
	
	common.init = function (pageName) {
	  common.checkLogin();
	  common.showMenu(pageName);
	  common.setLoginName();
	
	  $.ajaxSetup({
	    error: function (jqXHR, textStatus, errorThrown) {
	      var errorMsg = jqXHR.status + '：未知错误！';
	      var redirectUrl = document.location.href;
	      switch (jqXHR.status){
	        case (500):
	          errorMsg = jqXHR.status + '：服务器无响应，请稍后再试！';
	        break;
	        case (401):
	          errorMsg = jqXHR.status + '：未登录或登陆超时，请尝试重新登陆！';
	          redirectUrl = 'login.html?logout';
	        break;
	        case (403):
	          errorMsg = jqXHR.status + '：没有权限，请尝试重新登陆！';
	          redirectUrl = 'login.html?logout';
	        break;
	        case (404):
	          errorMsg = jqXHR.status + '：服务器暂时无法访问，请稍后再试！';
	        break;
	        case (408):
	          errorMsg = jqXHR.status + '：请求超时，请稍后再试！';
	        break;
	        case (0):
	          errorMsg = jqXHR.status + '：貌似断网了！';
	        break;
	      }
	      $('<div class="modal fade" data-keyboard="false" data-backdrop="static"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">错误提示</h4></div><div class="modal-body"><p style="text-align:center;">' + errorMsg + '</p></div><div class="modal-footer"><a href="' + redirectUrl + '" class="btn btn-primary">确定</a></div></div></div></div>').appendTo('body').modal('show');
	      throw new Error('Abort, error ' + jqXHR.status);
	    },
	  });
	};
	
	common.showMenu = function (pageName) {
	  var allowMenus = sessionStorage.getItem('menuAuthority') != null ? sessionStorage.getItem('menuAuthority').split(',') : null;
	  if (pageName != undefined && pageName != '' && $('#menu-' + pageName).size() > 0) {
	    var menuId = '' + $('#menu-' + pageName).data('id');
	    if (allowMenus.indexOf(menuId) < 0) {
	      common.logout();
	      window.location.href = 'login.html';
	    }
	
	    $('#menu-' + pageName).addClass('active').closest('.panel-collapse').collapse('show');
	
	  }
	
	  var $menus = $('#menu .list-group-item');
	  $menus.each(function (index, el) {
	    menuId = '' + $(el).data('id');
	    if (allowMenus.indexOf(menuId) > -1) {
	      $(el).show();
	      $(el).closest('.panel').show();
	    }
	  });
	};
	
	common.checkLogin = function () {
	  if (sessionStorage.getItem('menuAuthority') == null || Cookies.get('Xtoken') == undefined) {
	    common.logout();
	    window.location.href = 'login.html';
	  }
	};
	
	common.setLoginName = function () {
	  var loginName = Cookies.get('name');
	  if (loginName != undefined && loginName != '') {
	    $('#loginName').text(loginName);
	  }
	};
	
	common.logout = function () {
	  Cookies.remove('Xtoken');
	  Cookies.remove('name');
	  sessionStorage.setItem('cityAuthority', '');
	  sessionStorage.setItem('channelAuthority', '');
	  sessionStorage.setItem('menuAuthority', '');
	};
	
	common.getDate = function (date) {
	  if (date == undefined || date == '') {
	    date = new Date();
	  }
	
	  var YYYY = date.getFullYear().toString();
	  var MM = (date.getMonth() + 1).toString();
	  var DD = date.getDate().toString();
	  MM = MM[1] ? MM : '0' + MM[0];
	  DD = DD[1] ? DD : '0' + DD[0];
	  return YYYY + '-' + MM + '-' + DD;
	};
	
	common.getUrlParam = function () {
	  var paramArr = {};
	  var query = window.location.search.substring(1);
	  var vars = query.split('&');
	  for (var i = 0; i < vars.length; i++) {
	    var pair = vars[i].split(/=(.+)?/);
	    if (typeof paramArr[pair[0]] === 'undefined') {
	      paramArr[pair[0]] = decodeURIComponent(pair[1]);
	    } else if (typeof paramArr[pair[0]] === 'string') {
	      var arr = [paramArr[pair[0]], decodeURIComponent(pair[1])];
	      paramArr[pair[0]] = arr;
	    } else {
	      paramArr[pair[0]].push(decodeURIComponent(pair[1]));
	    }
	  }
	
	  return paramArr;
	};
	
	module.exports = common;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Cookies"] = __webpack_require__(3);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.1
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}
	
		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}
	
				// Write
	
				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);
	
					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}
	
					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}
	
					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}
	
					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);
	
					return (document.cookie = [
						key, '=', value,
						attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
						attributes.path    && '; path=' + attributes.path,
						attributes.domain  && '; domain=' + attributes.domain,
						attributes.secure ? '; secure' : ''
					].join(''));
				}
	
				// Read
	
				if (!key) {
					result = {};
				}
	
				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;
	
				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var name = parts[0].replace(rdecode, decodeURIComponent);
					var cookie = parts.slice(1).join('=');
	
					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}
	
					try {
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);
	
						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}
	
						if (key === name) {
							result = cookie;
							break;
						}
	
						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}
	
				return result;
			}
	
			api.set = api;
			api.get = function (key) {
				return api(key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};
	
			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};
	
			api.withConverter = init;
	
			return api;
		}
	
		return init(function () {});
	}));


/***/ }
/******/ ]);
//# sourceMappingURL=banner.js.map