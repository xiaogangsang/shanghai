'use strict;'

var common = {};

common.API_HOST = 'http://180.169.45.105/MovieOps/';

common.init = function (pageName) {
  common.showMenu(pageName);
  common.setLoginName();

  $.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
      switch (jqXHR.status){
        case (500):
          alert('服务器挂了！');
        break;
        case (401):
          alert('未登录或登陆超时，请重新登陆！');
          common.logout();
          window.location.href = 'login.html';
        break;
        case (403):
          alert('没有权限！');
        break;
        case (404):
          alert('服务器失踪了，请稍后再次！');
        break;
        case (408):
          alert('请求超时，请稍后再次！');
        break;
      }
    },
  });
};

common.showMenu = function (pageName) {
  // var allowMenus = sessionStorage.getItem('menuAuthority').split(',');
  // if (pageName != undefined && pageName != '' && $('#menu-' + pageName).size() > 0) {
  //   var menuId = '' + $('#menu-' + pageName).data('id');
  //   if (allowMenus == undefined || allowMenus.indexOf(menuId) < 0) {
  //     common.logout();
  //     window.location.href = 'login.html';
  //   }

    $('#menu-' + pageName).addClass('active').closest('.panel-collapse').collapse('show');
  // }

  var $menus = $('#menu .list-group-item');
  $menus.each(function (index, el) {
    // menuId = '' + $(el).data('id');
    // if (allowMenus.indexOf(menuId) > -1) {
      $(el).show();
      $(el).closest('.panel').show();
    // }
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
  sessionStorage.setItem('cityAuthority','');
  sessionStorage.setItem('channelAuthority','');
  sessionStorage.setItem('menuAuthority','');
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
