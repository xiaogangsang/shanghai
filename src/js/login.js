$('#form-login').on('submit', function(e) {
  e.preventDefault();
  sessionStorage.setItem('sessId', 'abcd1234');
  var username = $.trim($('#username').val()),
      password = $.trim($('#password').val()),
      that = $(this);
  if ( '' == username || '' == password ) {
    $('<div class="alert alert-danger" role="alert">用户名和密码不能为空！</div>').prependTo(that).fadeTo(5000, 1).slideUp(500, function(){$(".alert").alert('close');});
    return false;
  }
  window.location.href = 'index.html';
  console.info('validation pass.');
  console.log(sessionStorage.getItem('sessId'));
  // $.ajax({
  //   url: "http://127.0.0.1/login.json",
  //   jsonp: "callback",
  //   dataType: "jsonp",
  //   data: that.serialize(),
  //   success: function( response ) {
  //     if ( true == response.result ) {
  //       sessionStorage.setItem('sessId', response.sessId);
  //       sessionStorage.setItem('roleId', response.roleId);
  //       window.location.href = 'index.html';
  //     } else {
  //       $('<div class="alert alert-danger" role="alert">用户名或密码错误！</div>').prependTo(that).fadeTo(5000, 1).slideUp(500, function(){$(".alert").alert('close');});
  //     }
  //   }
  // });
  return false;
});