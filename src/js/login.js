'use strict;'

var common = require('common');

$(function () {

  if (window.location.search.substring(1).indexOf('logout') > -1) {
    common.logout();
  }

  $('#form-login').parsley();
  var wH = $(window).height();
  var eH = $('.login').height();
  if (wH - eH > 0) {
    $('.login').css('margin-top', (wH - eH) / 2 - 40);
  }
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
    url: common.API_HOST + '/login',
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
      Cookies.set('cityAuthority', res.data.cities);
      Cookies.set('channelAuthority', res.data.channels);
      Cookies.set('menuAuthority', res.data.allowMenus);

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
