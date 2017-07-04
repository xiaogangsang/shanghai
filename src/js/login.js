'use strict;'

var common = require('common');

$(function () {

  if (window.location.search.substring(1).indexOf('logout') > -1) {
    common.logout();
  }

  if (Cookies.get('Xtoken') != undefined) {
    window.location.href = 'index.html';
  }

  $('#form-login').parsley();
  var wH = $(window).height();
  var eH = $('.login').height();
  if (wH - eH > 0) {
    $('.login').css('margin-top', (wH - eH) / 2 - 40);
  }

  $.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
      var message;
      switch (jqXHR.status){
        case (500):
          message = '服务器挂了';
        break;
        case (401):
          message = '登陆ID或密码错误';
        break;
        case (403):
          message = '没有权限';
        break;
        case (404):
          message = '服务器失踪了，请稍后再次';
        break;
        case (408):
          message = '请求超时，请稍后再次';
        break;
        default:
          message = '未知错误';
        break;
      }
      var html = '<div class="alert alert-danger" role="alert">' + message + '</div>';
      $(html).prependTo($('#form-login'))
              .fadeTo(5000, 1)
              .slideUp(500, function () {$('.alert').alert('close');});
    },
  });

});

$('#form-login').on('submit', function (e) {
  e.preventDefault();
  $('.alert').remove();
  if (!$('#form-login').parsley().isValid()) {
    return false;
  }

  var username = $.trim($('#username').val());
  var password = $.trim($('#password').val());
  var $that = $(this);
  $.ajax({
    url: common.API_HOST + 'login',
    type: 'POST',
    dataType: 'json',
    data: {
      username: username,
      password: password,
    },
  })
  .done(function (res) {
    var resultCode = ~~res.meta.result;
    if (resultCode) {
      if (res.data.status == 8) {
        alert('您当前密码为弱密码, 点击"确定"重置密码');
        Cookies.set('userId', username);
        window.location.href = 'password.html';
      } else {
        Cookies.set('Xtoken', res.data.Xtoken);
        Cookies.set('name', res.data.name);
        Cookies.set('authCity', res.data.cities);
        Cookies.set('authChannel', res.data.channels);
        Cookies.set('userId', username);
        localStorage.setItem('authFunction', JSON.stringify(res.data.allowMenus));
        // Cookies.set('authFunction', JSON.stringify(res.data.allowMenus));
        var allowMenus = [];
        $.each(res.data.allowMenus, function (index, menu) {
          allowMenus.push(menu.menuId);
        });

        Cookies.set('authMenu', allowMenus.join(','));

        var referer = common.getUrlParam().referer;
        referer = referer ? decodeURIComponent(referer) : 'index.html';

        window.location.href = referer;
      }
    } else {
      var html = '<div class="alert alert-danger" role="alert">' + res.meta.msg + '</div>';
      $(html).prependTo($that)
              .fadeTo(5000, 1)
              .slideUp(500, function () {$('.alert').alert('close');});
    }
  });

  return false;
});
