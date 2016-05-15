'use strict;'

var common = require('common');

$(function () {

  if (Cookies.get('Xtoken') != undefined) {
    window.location.href = 'index.html';
  }

  if (window.location.search.substring(1).indexOf('logout') > -1) {
    common.logout();
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
    if (!!~~res.meta.result) {
      Cookies.set('Xtoken', res.data.Xtoken);
      Cookies.set('name', res.data.name);
      sessionStorage.setItem('cityAuthority', res.data.cities.toString());
      sessionStorage.setItem('channelAuthority', res.data.channels.toString());
      sessionStorage.setItem('menuAuthority', res.data.allowMenus.toString());

      // alert('登陆成功！');
      window.location.href = 'index.html';
    } else {
      var html = '<div class="alert alert-danger" role="alert">' + res.meta.msg + '</div>';
      $(html).prependTo($that)
              .fadeTo(5000, 1)
              .slideUp(500, function () {$('.alert').alert('close');});
    }
  });

  return false;
});
