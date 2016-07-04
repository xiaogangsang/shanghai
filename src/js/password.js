'use strict;'

var common = require('common');

$(function () {

  common.init('');

  $('#form-pwd').parsley();
  var wH = $(window).height();
  var eH = $('.login').height();
  if (wH - eH > 0) {
    $('.password').css('margin-top', (wH - eH) / 2 - 150);
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
      $(html).prependTo($('#form-pwd'))
      .fadeTo(5000, 1)
      .slideUp(500, function () {$('.alert').alert('close');});
    },
  });

});

$('#form-pwd').on('submit', function (e) {
  e.preventDefault();
  $('.alert').remove();
  if (!$('#form-pwd').parsley().isValid()) {
    return false;
  }

  var password = $.trim($('#password').val());
  var newPassword = $.trim($('#newPassword').val());
  var rePassword = $.trim($('#rePassword').val());
  var $that = $(this);

  $.ajax({
    url: common.API_HOST + 'common/updatePassword',
    type: 'POST',
    dataType: 'json',
    data: {
      password: password,
      newPassword: newPassword,
      rePassword: rePassword,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('密码修改成功！');
      window.location.href = 'login.html?logout';
    } else {
      var html = '<div class="alert alert-danger" role="alert">' + res.meta.msg + '</div>';
      $(html).prependTo($that)
      .fadeTo(5000, 1)
      .slideUp(500, function () {$('.alert').alert('close');});
    }
  });

  return false;
});
