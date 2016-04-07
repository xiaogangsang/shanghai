var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _channels = {};
var _roles = {};
var _cities = [];

$(function() {
  common.setMenu('user');
  //set search form
  setRole();
  //cache data
  getChannels();
  getCities();
});

function getChannels() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.meta);
    if (true == res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：'+res.msg);
    }
  });
}
function getCities() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data).forEach(function(group){
        _(group).forEach(function(city){
          _cities.push( city );
        });
      });
    } else {
      alert('获取城市列表失败：'+res.msg);
    }
  });
}

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault()
  var sendData = {
    name: $.trim($('#search_name').val()),
    loginId: $.trim($('#search_loginId').val()),
    city: $.trim($('#search_city').val()),
    department: $.trim($('#search_department').val()),
    roleId: $('#search_roleId').val(),
    createdBy: $.trim($('#search_createdBy').val()),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'user/userList',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      setTableData(res.data.rows);
      $('#btn-export').prop('disabled', false);
    } else {
      alert(res.msg);
    }
  });
  return false;
});

$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  var userId = $(this).parents('tr').data('id');
  $.ajax({
    url: common.API_HOST + 'user/userDetail',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: { id: userId }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      setModal(res.data);
      $('#popup-user-form').modal('show');
      $('#popup-user-form form').parsley();
    } else {
      alert(res.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-reset', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要重置此用户的密码吗？')) {
    $.ajax({
      url: common.API_HOST + 'user/resetPassword',
      type: 'GET',
      dataType: 'json',
      data: {id:that.data('id')}
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('密码已重置！');
        alert('骗你的啦，后台接口还没好呢！');
      } else {
        alert('重置失败：'+res.msg);
      }
    });
  }
  return false;
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此用户吗？')) {
    $.ajax({
      url: common.API_HOST + 'user/deleteUser',
      type: 'GET',
      dataType: 'json',
      data: {id:[that.data('id')]}
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        that.fadeOut(500,function(){
          that.remove();
          alert('骗你的啦，后台接口还没好呢！');
        });
      } else {
        alert('删除失败：'+res.msg);
      }
    });
  }
  return false;
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-user-form').modal('show');
  $('#popup-user-form form').parsley();
});
$(document).on('click', '.multi-check-all', function() {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});
$(document).on('click', '#btn-delete-multi', function(e) {
  e.preventDefault();
  if($('.multi-check:checked').length < 1) {
    alert('请至少选中一个用户！');
    return false;
  }
  if (window.confirm('确定要删除选中的用户吗？')) {
    var userIds = [];
    var checked_items = $('.multi-check:checked');
    checked_items.each(function(index, el) {
      userIds.push( $(this).closest('tr').data('id') );
    });
    $.ajax({
      url: common.API_HOST + 'user/deleteUser',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: {id:userIds}
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        checked_items.each(function(index, el) {
          $(this).closest('tr').fadeOut(1000,function(){
            $(this).remove();
          });
        });
        alert('骗你的啦，后台接口还没好呢！');
      } else {
        alert('删除失败：'+res.msg);
      }
    });
  }
  return false;
});
$(document).on('submit', '#popup-user-form form', function(e) {
  e.preventDefault();
  $('select option').attr('selected','selected'); //hack for firefox
  var sendData = {
    'realName': $.trim( $('#popup-user-form #realName').val() ),
    'city': $.trim( $('#popup-user-form #city').val() ),
    'department': $.trim( $('#popup-user-form #department').val() ),
    'mobile': $.trim( $('#popup-user-form #mobile').val() ),
    'email': $.trim( $('#popup-user-form #email').val() ),
    'roles': $('#roleSelect_to').val(),
    'cities':$('#citySelect_to').val()
  };
  var checked_channels = [];
  $('input[name="channel"]:checked').each(function(){
    checked_channels.push($(this).val());
  });
  sendData.channels = checked_channels;
  var ajaxUrl = common.API_HOST + 'user/saveUser';
  if( $('#userId').length > 0) {
    sendData.userId = $('#popup-user-form #userId').val();
    ajaxUrl = common.API_HOST + 'user/updateUser';
  } else {
    sendData.loginId = $.trim( $('#popup-user-form #loginId').val() );
    sendData.password = $.trim( $('#popup-user-form #password').val() );
  }
  // console.log( sendData );
  $.ajax({
    url: ajaxUrl,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if( $('#userId').length > 0) {
        alert('用户已更新！');
      } else {
        alert('用户已添加！');
      }
      alert('骗你的啦，后台接口还没好呢！');
    } else {
      alert('操作失败：'+res.msg);
    }
  });
  return false;
});

function setModal(userData) {
  var data, source;
  if (userData) {
    _(_channels).forEach(function(value, key){
      _channels[key].selected = _.includes(userData.channelAuthority, value.channelId) ? true : false;
    });
    delete userData.channelAuthority;
    _(_roles).forEach(function(value, key){
      _roles[key].selected = _.includes(userData.roles, value.id) ? true : false;
    });
    delete userData.roles;
    _(_cities).forEach(function(value, key){
      _cities[key].selected = _.includes(userData.cityAuthority, value.cityId) ? true : false;
    });
    delete userData.cityAuthority
    data = {user:userData, channels:_channels, roles:_roles, cities:_cities};
    source = $('#edit-template').html();
  } else {
    data = {channels:_channels, roles:_roles, cities:_cities};
    source = $('#create-template').html();
    $('#popup-user-form .modal-title').html('新增用户');
  }
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#popup-user-form .modal-body').html(html);

  $('#roleSelect').multiselect({
    right: '#roleSelect_to',
    rightAll: '#roleSelect_all',
    rightSelected: '#roleSelect_right',
    leftSelected: '#roleSelect_left',
    leftAll: '#roleSelect_none'
  });
  $('#citySelect').multiselect({
    right: '#citySelect_to',
    rightAll: '#citySelect_all',
    rightSelected: '#citySelect_right',
    leftSelected: '#citySelect_left',
    leftAll: '#citySelect_none'
  });
}

function setTableData(rows) {
  var data = {rows:rows};
  var source = $('#table-template').html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#dataTable').html(html);
}

function setPager(total, pageIndex, pageSize) {
  var data = {total:total,pageIndex:pageIndex,pageSize:pageSize};
  var pageTotal = _.ceil(total/pageSize);
  pageTotal = pageTotal > 1 ? pageTotal : 0;
  var source = $('#pager-template').html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#pager').html(html);
}

function setRole() {
  $.ajax({
    url: common.API_HOST + 'role/getAllRoles',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      _roles = res.data;
      $.each(_roles, function(index, role) {
        $('#search_roleId').append($('<option></option>').attr('value', role.id).text(role.roleName));
      });
    }
 });
}