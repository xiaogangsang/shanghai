'use strict;'

var common = require('common');

$(function () {
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
      Cookies.set('x-token', res.data['x-token']);
      Cookies.set('name', res.data.name);
      alert('登陆成功！');
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
