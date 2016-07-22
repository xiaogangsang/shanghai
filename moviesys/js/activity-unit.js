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
	var _budgetSource = [];
	var _pageIndex = 1;
	var _pageSize = 10;
	var _pageTotal = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	
	$(function () {
	  common.init('activity-unit');
	  var urlParam = common.getUrlParam();
	  if (urlParam.planId != undefined && urlParam.planId != '') {
	    $('#search_planId').val(urlParam.planId);
	    $('#formSearch').trigger('submit');
	    $('#btn-create').attr('href', 'activity-unit-edit.html?planId=' + urlParam.planId);
	  }
	
	  //set search form
	  getBudgetSource();
	
	  $('#formSearch').trigger('submit');
	});
	
	$('#formSearch').on('click', 'button[type=submit]', function (event) {
	  event.preventDefault();
	  _pageIndex = 1;
	  useCache = false;
	  $('#formSearch').trigger('submit');
	});
	
	$('#formSearch').on('submit', function (e) {
	  e.preventDefault();
	  if ($.trim($('#search_id').val()) != '' && ~~$.trim($('#search_id').val()) == 0) {
	    alert('[单元ID]必须是大于0的数字！');
	    return false;
	  }
	
	  if ($.trim($('#search_planId').val()) != '' && ~~$.trim($('#search_planId').val()) == 0) {
	    alert('[计划ID]必须是大于0的数字！');
	    return false;
	  }
	
	  var sendData = {
	    id: $.trim($('#search_id').val()),
	    name: $.trim($('#search_name').val()),
	    planId: $.trim($('#search_planId').val()),
	    status: $('#search_status').val(),
	    budgetStatus: $('#search_budgetStatus').val(),
	    budgetSource: $('#search_budgetSource').val(),
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
	    url: common.API_HOST + 'activity/activityList',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _querying = false;
	    if (res.meta.result == true) {
	      if (res.data.rows.length < 1) {
	        var html = '<tr><td colspan="20" align="center">查不到相关数据，请修改查询条件！</td></tr>';
	        $('#dataTable tbody').html(html);
	        $('#pager').html('');
	        $('#btn-export').prop('disabled', true);
	      } else {
	        useCache = true;
	        _pageIndex = res.data.pageIndex;
	        _pageTotal = Math.ceil(res.data.total / _pageSize);
	        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
	        _(res.data.rows).forEach(function (value, key) {
	          value.status = parseInt(value.status);
	          switch (value.status) {
	            case 1:
	              value.statusName = '已上线';
	            break;
	            case 0:
	              value.statusName = '已下线';
	            break;
	            case 2:
	              value.statusName = '计划下线';
	            break;
	            default:
	              value.statusName = '';
	            break;
	          }
	
	          // switch (+value.budgetStatus) {
	          //   case 1:
	          //     value.budgetStatusName = '总预算不足';
	          //   break;
	          //   case 2:
	          //     value.budgetStatusName = '日预算不足';
	          //   break;
	          //   case 3:
	          //     value.budgetStatusName = '正常';
	          //   break;
	          //   default:
	          //     value.budgetStatusName = '';
	          //   break;
	          // }
	        });
	
	        setTableData(res.data.rows);
	        $('#btn-export').prop('disabled', false);
	      }
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
	$(document).on('change', '#search_level', function (event) {
	  event.preventDefault();
	  var level = $(this).val();
	  if (level == undefined || level == '') {
	    $('#search_budgetSource').html('<option value="">全部</option>');
	    $('#search_budgetSource').closest('.form-group').hide();
	  } else {
	    var sources = [];
	    _(_budgetSource).forEach(function (group, key) {
	      if (level == key) {
	        sources = group;
	      }
	    });
	
	    if (sources.length < 1) {
	      $('#search_budgetSource').html('<option value="">全部</option>');
	      $('#search_budgetSource').closest('.form-group').hide();
	      alert('所选成本中心类别下无成本中心，这个情况不正常，需要注意哦！');
	    } else {
	      var html = '';
	      _(sources).forEach(function (source) {
	        html += '<option value="' + source.id + '">' + source.sourceName + '</option>';
	      });
	
	      $('#search_budgetSource').html(html);
	      $('#search_budgetSource').closest('.form-group').show();
	    }
	  }
	});
	
	$(document).on('click', '.multi-check-all', function () {
	  var items = $(this).closest('table').find('.multi-check');
	  if ($(this).prop('checked')) {
	    items.prop('checked', true);
	  } else {
	    items.prop('checked', false);
	  }
	});
	
	$(document).on('click', '#btn-online-multi, #btn-offline-multi', function (e) {
	  e.preventDefault();
	  if ($('.multi-check:checked').length < 1) {
	    alert('请至少选中一个！');
	    return false;
	  }
	
	  var queryStatusName = $(this).attr('id') == 'btn-online-multi' ? '上线' : '下线';
	  if (window.confirm('确定要' + queryStatusName + '选中的单元吗？')) {
	    var queryStatus = $(this).attr('id') == 'btn-online-multi' ? 1 : 0;
	    var ids = [];
	    var $checkedItems = $('.multi-check:checked');
	
	    $checkedItems.each(function () {
	      ids.push($(this).closest('tr').data('id'));
	    });
	
	    var ajaxUrl = queryStatus == 1 ? 'activity/activityOnline' : 'activity/activityOffline';
	    $.ajax({
	      url: common.API_HOST + ajaxUrl,
	      type: 'POST',
	      dataType: 'json',
	      contentType: 'application/json; charset=utf-8',
	      data: JSON.stringify(ids),
	    })
	    .done(function (res) {
	      if (res.meta.result == true) {
	        $('#formSearch').trigger('submit');
	        queryStatus == 1 ? alert('批量上线成功') : alert('批量下线成功');
	        $('.multi-check-all').prop('checked', false);
	      } else {
	        alert('接口错误：' + res.meta.msg);
	      }
	    });
	  }
	
	  return false;
	});
	
	$(document).on('click', '#btn-export', function (event) {
	  event.preventDefault();
	  var exportUrl = common.API_HOST + 'activity/exportActivities?' +
	    'id=' + $.trim($('#search_id').val()) +
	    '&name=' + $.trim($('#search_name').val()) +
	    '&planId=' + $.trim($('#search_planId').val()) +
	    '&status=' + $('#search_status').val() +
	    '&budgetStatus=' + $('#search_budgetStatus').val() +
	    '&budgetSource=' + $('#search_budgetSource').val() +
	    '&pageSize=' + _pageSize +
	    '&pageIndex=' + _pageIndex;
	  window.location.href =  exportUrl;
	});
	
	$('#dataTable').on('click', '.btn-status', function (e) {
	  e.preventDefault();
	  var $btn = $(this);
	  var queryStatus = $btn.data('status') == 1 ? 0 : 1;
	  var queryStatusName = queryStatus == 1 ? '上线' : '下线';
	  if (window.confirm('确定要' + queryStatusName + '此单元吗？')) {
	    var ids = [$btn.closest('tr').data('id')];
	    var ajaxUrl = queryStatus == 1 ? 'activity/activityOnline' : 'activity/activityOffline';
	    $.ajax({
	      url: common.API_HOST + ajaxUrl,
	      type: 'POST',
	      dataType: 'json',
	      contentType: 'application/json; charset=utf-8',
	      data: JSON.stringify(ids),
	    })
	    .done(function (res) {
	      if (res.meta.result == true) {
	        $('#formSearch').trigger('submit');
	        alert(queryStatusName + '成功!');
	      } else {
	        alert('接口错误：' + res.meta.msg);
	      }
	    });
	  }
	
	  return false;
	});
	
	$('#dataTable').on('click', '.btn-delete', function (e) {
	  e.preventDefault();
	  var $tr = $(this).closest('tr');
	  if (window.confirm('确定要删除此单元吗？')) {
	    $.ajax({
	      url: common.API_HOST + 'activity/deleteActivity',
	      type: 'POST',
	      dataType: 'json',
	      data: { id: $tr.data('id') },
	    })
	    .done(function (res) {
	      if (res.meta.result == true) {
	        alert('删除成功！');
	        $tr.fadeOut(500, function () {$tr.remove();});
	      } else {
	        alert('接口错误：' + res.meta.msg);
	      }
	    });
	  }
	
	  return false;
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
	
	$('#pager').on('click', '#btn-pager', function (e) {
	  e.preventDefault();
	  if ($('#pageNo').val() == '') {
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
	
	function getBudgetSource() {
	  $.ajax({
	    url: common.API_HOST + 'activity/budgetSourceList',
	    type: 'POST',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    if (res.meta.result == true) {
	      _budgetSource = res.data;
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
//# sourceMappingURL=activity-unit.js.map