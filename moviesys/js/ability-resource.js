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
	var _roles = [];
	var _submitting = false;
	
	$(function () {
	  common.init('ability-resource');
	
	  //set search form
	  setResource();
	
	  //cache data
	  getRoles();
	
	  $('#roleSelect').multiselect({
	    search: {
	      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
	      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
	    },
	    right: '#roleSelect_to',
	    rightAll: '#roleSelect_all',
	    rightSelected: '#roleSelect_right',
	    leftSelected: '#roleSelect_left',
	    leftAll: '#roleSelect_none',
	  });
	
	  $('#formResource').parsley();
	});
	
	function getRoles() {
	  $.ajax({
	    url: common.API_HOST + 'security/role/roleList',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      pageIndex: 1,
	      pageSize: 9999,
	    },
	  })
	  .done(function (res) {
	    if (res.meta.result == true) {
	      _(res.data.rows).forEach(function (value, key) {
	        _roles.push({ id: value.id, name: value.roleName });
	      });
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	}
	
	function setResource() {
	  $.ajax({
	    url: common.API_HOST + 'security/resource/resourceList',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      pageIndex: 1,
	      pageSize: 9999,
	    },
	  })
	  .done(function (res) {
	    if (res.meta.result == true) {
	      var htmlResource = '';
	      _(res.data.rows).forEach(function (value, key) {
	        htmlResource += '<option value="' + value.id + '">' + value.name + '</option>';
	      });
	
	      $('#resourceSelect').append(htmlResource);
	      $('#resourceSelect').chosen();
	    }
	  });
	}
	
	function setRole(resourceId) {
	  $.ajax({
	    url: common.API_HOST + 'security/resource/resourceList',
	    type: 'POST',
	    dataType: 'json',
	    data: {
	      id: resourceId,
	      pageIndex: 1,
	      pageSize: 9999,
	    },
	  })
	  .done(function (res) {
	    if (res.meta.result == true) {
	      var roles = [];
	      _(res.data.rows[0].roles).forEach(function (value, key) {
	        roles.push(value.id);
	      });
	
	      var htmlChoosed = '';
	      var htmlUnchoosed = '';
	      _(_roles).forEach(function (value, key) {
	        if (roles.indexOf(value.id) > -1) {
	          htmlChoosed += '<option value="' + value.id + '">' + value.name + '</option>';
	        } else {
	          htmlUnchoosed += '<option value="' + value.id + '">' + value.name + '</option>';
	        }
	      });
	
	      $('#roleSelect_to').append(htmlChoosed);
	      $('#roleSelect').append(htmlUnchoosed);
	      $('#formResource button[type=submit]').prop('disabled', false).text('保存');
	      $('#formResource').parsley();
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	}
	
	$('#resourceSelect').on('change', function (e) {
	  e.preventDefault();
	  $('#roleSelect_to').html('');
	  $('#roleSelect').html('');
	  setRole($(this).val());
	  $('#formResource button[type=submit]').prop('disabled', true).text('加载中...');
	});
	
	$('#formResource').on('click', 'button[type=submit]', function (event) {
	  event.preventDefault();
	  if (!!_submitting) {
	    return false;
	  }
	
	  _submitting = true;
	  $('.multi-selection select:eq(1) option').prop('selected', true);
	  var sendData = {
	    id: $('#resourceSelect').val(),
	    roleIds: $('#roleSelect_to').val(),
	  };
	  $.ajax({
	    url: common.API_HOST + 'security/resource/updateResource',
	    type: 'POST',
	    dataType: 'json',
	    contentType: 'application/json; charset=utf-8',
	    data: JSON.stringify(sendData),
	  })
	  .done(function (res) {
	    _submitting = false;
	    if (res.meta.result == true) {
	      alert('保存成功！');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});


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
//# sourceMappingURL=ability-resource.js.map