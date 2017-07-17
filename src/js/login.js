'use strict;'

var common = require('common');

$(function () {

  if (window.location.search.substring(1).indexOf('logout') > -1) {
    common.logout();
  }

  if (localStorage.getItem('Xtoken') != undefined) {
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
      var html = '<div class="alert alert-danger" role="alert">' + jqXHR.responseJSON.meta.msg + '</div>';
      $(html).prependTo($('#form-login'))
              .fadeTo(5000, 1)
              .slideUp(500, function () {$('.alert').alert('close');});
    },
  });
  // 获取验证码
  getVerificationCode();

});

$('#form-login').on('submit', function (e) {
  e.preventDefault();
  $('.alert').remove();
  if (!$('#form-login').parsley().isValid()) {
    return false;
  }

  var username = $.trim($('#username').val());
  var password = $.trim($('#password').val());
  var verifyCode = $.trim($('#checkCode').val());
  var $that = $(this);
  $.ajax({
    url: common.API_HOST + 'login',
    type: 'POST',
    dataType: 'json',
    data: {
      username: username,
      password: password,
      verifyCode: verifyCode,
    },
  })
  .done(function (res) {
    var resultCode = ~~res.meta.result;
    if (resultCode) {
      localStorage.setItem('userId', username);
      if (typeof res.data.name !== 'undefined') {
        localStorage.setItem('name', res.data.name);
      }
      if (res.data.status == 8) {
        alert('您当前密码为弱密码, 点击"确定"重置密码');
        window.location.href = 'password.html';
      } else {
        // Xtoken 用来身份验证, 所以我们放在 Cookie 中
        localStorage.setItem('Xtoken', res.data.Xtoken);
        localStorage.setItem('authFunction', JSON.stringify(res.data.allowMenus));

        var allowMenus = [];
        $.each(res.data.allowMenus, function (index, menu) {
          allowMenus.push(menu.menuId);
        });

        localStorage.setItem('authMenu', allowMenus.join(','));

        // var referer = common.getUrlParam().referer;
        // referer = referer ? decodeURIComponent(referer) : 'index.html';

        // window.location.href = referer;
        window.location.href = 'index.html';
      }
    } else {
      var html = '<div class="alert alert-danger" role="alert">' + res.meta.msg + '</div>';
      $(html).prependTo($that)
              .fadeTo(5000, 1)
              .slideUp(500, function () {$('.alert').alert('close');});
    }
  })
  .fail(function() {
    getVerificationCode();// 重新获取验证码
  });

  return false;
});

function getVerificationCode () {
  var getCodeUrl = common.API_HOST + 'verifyCode';
  $('#checkCode_img').attr('src',getCodeUrl+'?t='+ new Date().getTime()).show();
  $('#checkCode_img').click(function(){this.src=getCodeUrl+'?t='+ new Date().getTime();});
}



