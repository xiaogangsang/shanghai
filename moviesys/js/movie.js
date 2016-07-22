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
	var _status = [
	{ id: 0, name: '即将上映' },
	{ id: 1, name: '正在热映' },
	{ id: 2, name: '下映存档' },
	];
	var _versions = {};
	var _pageIndex = 1;
	var _pageSize = 10;
	var _pageTotal = 0;
	var _querying = false;
	var searchCache = {};
	var useCache = false;
	var _submitting = false;
	
	$(function () {
	  common.init('movie');
	
	  //set search form
	  setVersion();
	
	  $('#search_beginShowDate').datetimepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN',
	    minView: 2,
	    todayHighlight: true,
	    autoclose: true,
	  }).on('changeDate', function (ev) {
	    var startDate = new Date(ev.date.valueOf());
	    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
	    $('#search_endShowDate').datetimepicker('setStartDate', startDate);
	  });
	
	  $('#search_endShowDate').datetimepicker({
	    format: 'yyyy-mm-dd',
	    language: 'zh-CN',
	    minView: 2,
	    todayHighlight: true,
	    autoclose: true,
	  }).on('changeDate', function (ev) {
	    var FromEndDate = new Date(ev.date.valueOf());
	    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
	    $('#search_beginShowDate').datetimepicker('setEndDate', FromEndDate);
	  });
	
	  var beginDate = new Date();
	  var endDate = new Date();
	  beginDate.setDate(beginDate.getDate() - 7);
	  beginDate = common.getDate(beginDate);
	  endDate = common.getDate(endDate);
	  $('#search_beginShowDate').val(beginDate).datetimepicker('setEndDate', endDate);
	  $('#search_endShowDate').val(endDate).datetimepicker('setStartDate', beginDate);
	
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
	    name: $.trim($('#search_name').val()),
	    produceCorp: $.trim($('#search_produceCorp').val()),
	    dimenId: $('#search_dimenId').val(),
	    beginShowDate: $('#search_beginShowDate').val(),
	    endShowDate: $('#search_endShowDate').val(),
	    status: $('#search_status').val(),
	    associationStatus: $('#search_associationStatus').val(),
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
	    url: common.API_HOST + 'film/standardFilm/list',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _querying = false;
	    if (!!~~res.meta.result) {
	      if (res.data.rows.length < 1) {
	        $('#dataTable tbody').html('<tr><td colspan="8" align="center">查不到相关数据，请修改查询条件！</td></tr>');
	        $('#pager').html('');
	      } else {
	        useCache = true;
	        _pageIndex = res.data.pageIndex;
	        _pageTotal = Math.ceil(res.data.total / _pageSize);
	        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
	        _(res.data.rows).forEach(function (item) {
	          _(_status).forEach(function (value) {
	            if (item.status == value.id) {
	              item.statusName = value.name;
	            }
	          });
	
	          item.dimenName = item.dimenNames.join(',');
	          item.associationStatus = item.associationStatus == 1 ? '已关联' : '未关联';
	        });
	
	        setTableData(res.data.rows);
	      }
	
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
	$(document).on('submit', '#popup-movie-form form', function (e) {
	  e.preventDefault();
	  if (_submitting) {
	    return false;
	  }
	
	  _submitting = true;
	  var sendData = {
	    id: $('#popup-movie-form #id').val(),
	    name: $.trim($('#popup-movie-form #name').val()),
	    showDate: $('#popup-movie-form #showDate').val(),
	    duration: $.trim($('#popup-movie-form #duration').val()),
	    summary: $.trim($('#popup-movie-form #summary').val()),
	    description: $.trim($('#popup-movie-form #description').val()),
	    area: $.trim($('#popup-movie-form #area').val()),
	    produceCorp: $.trim($('#popup-movie-form #produceCorp').val()),
	    poster: $.trim($('#popup-movie-form #poster').val()),
	    status: $('#popup-movie-form #status').val(),
	  };
	  var dimenIds = [];
	  $('#popup-movie-form input[name=dimenId]:checked').each(function () {
	    dimenIds.push($(this).val());
	  });
	
	  sendData.dimenId = dimenIds.join('|');
	
	  $.ajax({
	    url: common.API_HOST + 'film/standardFilm/saveOrUpdate',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    _submitting = false;
	    if (!!~~res.meta.result) {
	      alert('更新成功！');
	      $('#popup-movie-form').modal('hide');
	      $('#formSearch').trigger('submit');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	
	  return false;
	});
	
	$('#dataTable').on('click', '.btn-edit', function (e) {
	  e.preventDefault();
	  $.ajax({
	    url: common.API_HOST + 'film/standardFilm/detail',
	    type: 'POST',
	    dataType: 'json',
	    data: { id: $(this).closest('tr').data('id') },
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      res.data.showDate = res.data.showDate.split(' ')[0];
	      setModal(res.data);
	      $('#popup-movie-form').modal('show');
	      $('#showDate').datetimepicker({
	        format: 'yyyy-mm-dd',
	        language: 'zh-CN',
	        minView: 2,
	        todayHighlight: true,
	        autoclose: true,
	      });
	      $('#popup-movie-form form').parsley();
	
	      $('.poster-preview').on('load', function (event) {
	        var poster = $(this).attr('src');
	        window.previewImg = '<img id="previewImg" src="' + poster + '" width="160"><script>window.onload = function() { parent.document.getElementById("frameImg").height = document.getElementById("previewImg").height+"px"; }</script>';
	        var iframe = document.createElement('iframe');
	        iframe.id = 'frameImg';
	        iframe.src = 'javascript:parent.previewImg;';
	        iframe.frameBorder = '0';
	        iframe.scrolling = 'no';
	        iframe.width = '160px';
	        iframe.style.display = 'block';
	        var el = document.querySelector('.poster-preview');
	        el.parentNode.replaceChild(iframe, el);
	      });
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
	
	$(document).on('click', '#btn-upload', function (event) {
	  event.preventDefault();
	  $('#popup-movie-upload').modal('show');
	  $('#fileupload').data('url', common.API_HOST + 'film/standardFilm/uploadPoster').fileupload({
	    dataType: 'json',
	    add: function (e, data) {
	      $('#fileupload').next('span').remove();
	      $('#fileupload').after(' <span>' + data.files[0].name + '</span>');
	      $('#popup-movie-upload button[type=submit]').off('click').on('click', function () {
	        $(this).prop('disable', true).text('上传中...');
	        data.submit();
	      });
	    },
	
	    done: function (e, data) {
	      $('#popup-movie-upload button[type=submit]').prop('disable', false).text('上传');
	      if (!!~~data.result.meta.result) {
	        $('#poster').val(data.result.data.savePath);
	        $('.poster-preview').attr('src', data.result.data.savePath);
	        alert('上传成功！');
	        $('#popup-movie-upload').modal('hide');
	      } else {
	        alert('上传失败：' + data.result.meta.msg);
	      }
	    },
	  });
	});
	
	$('#dataTable').on('click', '.btn-detail', function (e) {
	  e.preventDefault();
	  $.ajax({
	    url: common.API_HOST + 'film/standardFilm/detail',
	    type: 'POST',
	    dataType: 'json',
	    data: { id: $(this).closest('tr').data('id') },
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      var data = res.data;
	      _(_status).forEach(function (value) {
	        if (data.status == value.id) {
	          data.statusName = value.name;
	        }
	      });
	
	      data.dimenName = data.dimenNames.join(',');
	      var template = $('#detail-template').html();
	      Mustache.parse(template);
	      var html = Mustache.render(template, data);
	      $('#popup-movie-detail .modal-body').html(html);
	      $('#popup-movie-detail').modal('show');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
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
	  $('#formSearch').trigger('submit');
	});
	
	$('#pager').on('click', '#btn-pager', function (e) {
	  e.preventDefault();
	  if (~~$('#pageNo').val() == 0) {
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
	
	function setModal(movieData) {
	  var data;
	  var template;
	  if (movieData) {
	    _(_status).forEach(function (value, key) {
	      if (value.id == movieData.status) {
	        // value.selected = true;
	      } else {
	        // value.selected = false;
	      }
	    });
	
	    _(_versions).forEach(function (value, key) {
	      value.selected = movieData.dimenIds.indexOf(value.id) > -1 ? true : false;
	    });
	
	    data = { movie: movieData, versions: _versions, status: _status };
	    template = $('#edit-template').html();
	    Mustache.parse(template);
	    var html = Mustache.render(template, data);
	    $('#popup-movie-form .modal-body').html(html);
	  }
	
	  return false;
	}
	
	function setVersion() {
	  $.ajax({
	    url: common.API_HOST + 'common/dimenList',
	    type: 'GET',
	    dataType: 'json',
	  })
	  .done(function (res) {
	    if (!!~~res.meta.result) {
	      _versions = res.data;
	      _(_versions).forEach(function (item) {
	        $('#search_dimenId').append($('<option></option>').attr('value', item.id).text(item.name));
	      });
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
//# sourceMappingURL=movie.js.map