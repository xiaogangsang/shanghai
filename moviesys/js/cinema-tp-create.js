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
	var _brands = {};
	var _provinces = {};
	var _areas = [];
	var _services = {};
	var _tpCinemaId = 0;
	var _sourceId = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	var _submitting = false;
	
	$(function () {
	  common.init('cinema-tp');
	  setBrand();
	  setProvince();
	  getService();
	
	  var urlParam = common.getUrlParam();
	  if (urlParam.tpCinemaId == undefined || urlParam.tpCinemaId == ''
	    || urlParam.sourceId == undefined || urlParam.sourceId == '') {
	    alert('缺少参数！');
	    location = 'cinema-tp.html';
	  }
	
	  _tpCinemaId = urlParam.tpCinemaId;
	  _sourceId = urlParam.sourceId;
	
	  $.ajax({
	    url: common.API_HOST + 'cinema/thirdParty/cinemaDetail',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      thirdPartyCinemaId: _tpCinemaId,
	      sourceId: _sourceId,
	    },
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      var html = '';
	      _(res.data).forEach(function (value, key) {
	        if (value != '' && value != undefined && value != null) {
	          switch (key) {
	            case 'tpCinemaName':
	              $('#cinemaName').val(value);
	            break;
	            case 'address':
	              $('#address').val(value);
	            break;
	            case 'longitude':
	              $('#longitude').val(value);
	            break;
	            case 'latitude':
	              $('#latitude').val(value);
	            break;
	            case 'tel':
	              $('#tel').val(value);
	            break;
	            default:
	            break;
	          }
	          html += '<div class="detail-item"><span>' + key + '：</span>' + value + '</div>';
	        }
	      });
	
	      $('.cinema-detail').html(html);
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  $('#formCinema').parsley();
	});
	
	$(document).on('change', '#provinceId', function (e) {
	  var provinceId = parseInt($(this).val());
	  if (~~provinceId != 0) {
	    var province = _.find(_provinces, { provinceId: provinceId.toString() });
	    var cityList = province.cityList;
	    var html = '<option value="">选择城市</option>';
	    _(cityList).forEach(function (value, key) {
	      html += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
	    });
	
	    $('#cityId').html(html);
	    $('#areaId,#districtId').html('<option value=""></option>');
	  }
	
	  return false;
	});
	
	$(document).on('change', '#cityId', function (e) {
	  var cityId = parseInt($(this).val());
	  if (~~cityId != 0) {
	    $.ajax({
	      url: common.API_HOST + 'common/areaList',
	      type: 'POST',
	      dataType: 'json',
	      data: { cityId: cityId },
	    })
	    .done(function (res) {
	      if (!!~~res.meta.result) {
	        _areas = res.data;
	        var html = '<option value="">选择行政区</option>';
	        _(_areas).forEach(function (value, key) {
	          html += '<option value="' + value.areaId + '">' + value.areaName + '</option>';
	        });
	
	        $('#areaId').html(html);
	        $('#districtId').html('<option value=""></option>');
	      } else {
	        alert('接口错误：' + res.meta.msg);
	      }
	    });
	  }
	
	  return false;
	});
	
	$(document).on('change', '#areaId', function (e) {
	  var areaId = parseInt($(this).val());
	  if (~~areaId != 0) {
	    var area = _.find(_areas, { areaId: areaId });
	    var districtInfoList = area.districtInfoList;
	    var html = '<option value="">选择商圈</option>';
	    _(districtInfoList).forEach(function (value, key) {
	      html += '<option value="' + value.districtId + '">' + value.districtName + '</option>';
	    });
	
	    $('#districtId').html(html);
	  }
	
	  return false;
	});
	
	$(document).on('change', '#btn-service', function (e) {
	  var serviceId = parseInt($(this).val());
	  if (~~serviceId != 0) {
	    var service = _.find(_services, { id: serviceId });
	    var data = { service: service };
	    var template = $('#service-template').html();
	    Mustache.parse(template);
	    var html = Mustache.render(template, data);
	    $('.service-list').append(html);
	    $('#btn-service option').each(function () {
	      if (serviceId == $(this).val()) {
	        $(this).remove();
	      }
	    });
	
	    $(document).scrollTop($(document).height());
	  }
	
	  return false;
	});
	
	$(document).on('click', '.btn-service-delete', function (e) {
	  e.preventDefault();
	  var $parent = $(this).closest('.service-item');
	  if ($parent.find('textarea').val() !== '' && !window.confirm('确定要删除此服务吗？')) {
	    return false;
	  }
	
	  var serviceId = $parent.data('id');
	  var service = _.find(_services, { id: serviceId });
	  $('#btn-service').append($('<option></option>').attr('value', service.id).text(service.name));
	  $parent.remove();
	  return false;
	});
	
	$(document).on('submit', '#formCinema', function (e) {
	  e.preventDefault();
	  if (_submitting) {
	    return false;
	  }
	  _submitting = true;
	  $.ajax({
	    url: common.API_HOST + 'cinema/standard/cinemaSave',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      cinemaName: $.trim($('#cinemaName').val()),
	      brandId: $('#brandId').val(),
	      cityId: $('#cityId').val(),
	      areaId: $('#areaId').val(),
	      districtId: $('#districtId').val(),
	      address: $.trim($('#address').val()),
	      tel: $.trim($('#tel').val()),
	      longitude: $.trim($('#longitude').val()),
	      latitude: $.trim($('#latitude').val()),
	      thirdPartyCinemaId: _tpCinemaId,
	      sourceId: _sourceId,
	      associationStatus: 1,
	    },
	  })
	  .done(function (res) {
	    _submitting = false;
	    if (!!~~res.meta.result) {
	      alert('新建标准影院，并关联成功！');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
	
	function setBrand() {
	  $.ajax({
	    url: common.API_HOST + 'common/brandList',
	    type: 'GET',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      _brands = res.data;
	      _(_brands).forEach(function (brand) {
	        $('#brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
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
	        html += '<option value="' + province.provinceId + '">'
	                + province.provinceName + '</option>';
	      });
	
	      $('#provinceId').append(html);
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	}
	
	function getService() {
	  $.ajax({
	    url: common.API_HOST + 'cinema/standard/serviceList',
	    type: 'GET',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    console.log(res);
	    if (!!~~res.meta.result) {
	      _services = res.data;
	      var html = '';
	      _(_services).forEach(function (service) {
	        html += '<option value="' + service.id + '">' + service.name + '</option>';
	      });
	
	      $('#btn-service').append(html);
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
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
//# sourceMappingURL=cinema-tp-create.js.map