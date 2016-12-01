'use strict;'

require('cookie');

Array.prototype.unique = function () {
  var o = {};
  var i;
  var l = this.length;
  var r = [];
  for (i = 0; i < l; i += 1) {
    o[this[i]] = this[i];
  }

  for (i in o) {
    r.push(o[i]);
  }

  return r;
};

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement /*, fromIndex*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }

    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {k = 0;}
    }

    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement ||
         (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
        return true;
      }

      k++;
    }

    return false;
  };
}

var common = {};

common.API_HOST = window.location.protocol + '//' + window.location.host + '/MovieOps/';

common.init = function (pageName) {
  common.checkLogin();
  common.setLoginName();
  common.showMenu(pageName);

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
  var allowMenus = Cookies.get('authMenu').split(',');
  if (pageName != undefined && pageName != '' && $('#menu-' + pageName).size() > 0) {
    var menuId = +$('#menu-' + pageName).data('id');
    if (!allowMenus.includes(menuId.toString())) {
      common.logout();
      window.location.href = 'login.html';
    }

    $('#menu-' + pageName).addClass('active').closest('.panel-collapse').collapse('show');
  }

  var $menus = $('#menu .list-group-item');
  $menus.each(function (index, el) {
    menuId = +$(el).data('id');
    if (allowMenus.includes(menuId.toString())) {
      $(el).show();
      $(el).closest('.panel').show();
    }
  });
};

common.checkLogin = function () {
  if (Cookies.get('authMenu').length < 1 || Cookies.get('Xtoken') == undefined) {
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
  Cookies.remove('authCity');
  Cookies.remove('authChannel');
  Cookies.remove('authMenu');
  Cookies.remove('authFunction');
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

common.getAssignedFuncions = function () {
  var allowMenus = JSON.parse(Cookies.get('authFunction'));
  var assignedFunctions = [];
  var pageId = +$('#menu a.active').data('id');
  _(allowMenus).forEach(function (page) {
    if (page.menuId == pageId && page.function != null && page.function.length > 0) {
      assignedFunctions =  assignedFunctions.concat(page.function).unique();
    }
  });

  return assignedFunctions;
};

common.verifyPermission = function (funcId) {
  var pageId = +$('#menu a.active').data('id');
  var assignedFunctions = this.getAssignedFuncions();
  if (assignedFunctions.length > 0 && assignedFunctions.indexOf(+funcId) > -1) {
    return true;
  }

  return false;
};

common.showAssignedButton = function () {
  var assignedFunctions = this.getAssignedFuncions();
  if (assignedFunctions.length < 1) {
    return false;
  }

  $.each($('.auth-ctl'), function (index, el) {
    if (assignedFunctions.indexOf(+$(this).data('auth')) > -1) {
      $(this).show();
    }
  });
};

module.exports = common;
