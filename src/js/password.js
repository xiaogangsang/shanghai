'use strict;'

var common = require('common');

$(function () {

  // 修改密码不再判断是否登录
  var userId = localStorage.getItem('userId');
  var loginName = localStorage.getItem('name') || userId;
  if (loginName) {
    $('#loginName').text(loginName);
  }

  if (!userId) {
    common.logout();
    window.location.href = 'login.html';
  }

  // $('.dropdown-toggle').prop('disabled', true);

  $('#form-pwd').parsley();

  $.ajaxSetup({
    error: function (jqXHR, textStatus, errorThrown) {
      var message;
      switch (jqXHR.status){
        case (500):
          message = '服务器挂了';
        break;
        case (401):
          message = '用户未登录或登录超时';
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
      userId: userId,
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
