'use strict;'

require('cookie');
var common = {};

common.API_HOST = window.location.origin + '/MovieOps/';

common.init = function (pageName) {
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
    if (allowMenus == undefined || allowMenus.indexOf(menuId) < 0) {
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
    var pair = vars[i].split('=');
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
