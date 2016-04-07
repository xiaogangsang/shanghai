var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _roles = {};
var _users = {};
var _resources = {};

$(function() {
  common.setMenu('role');
  //set search form
  setRole();
  getUsers();
  getResources();
});

function setRole() {
  $.ajax({
    url: common.API_HOST + 'role/getAllRoles',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _roles = res.data;
      $.each(_roles, function(index, role) {
        $('#search_roleId').append($('<option></option>').attr('value', role.id).text(role.roleName));
      });
    }
  });
}
function getUsers() {
  $.ajax({
    url: common.API_HOST + 'user/getAllUsers',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _users = res.data;
    } else {
      alert('获取用户列表失败：'+res.msg);
    }
  });
}
function getResources() {
  $.ajax({
    url: common.API_HOST + 'resource/getAllResources',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _resources = res.data;
    } else {
      alert('获取功能列表失败：'+res.msg);
    }
  });
}

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault()
  var sendData = {
    roleId: $('#search_roleId').val(),
    createdBy: $.trim($('#search_createdBy').val()),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'role/roleList',
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
    url: common.API_HOST + 'role/roleDetail',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: { id: userId }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      setModal(res.data);
      $('#popup-role-form').modal('show');
      $('#popup-role-form form').parsley();
    } else {
      alert(res.msg);
    }
  });
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-role-form').modal('show');
  $('#popup-role-form form').parsley();
});
$(document).on('submit', '#popup-role-form form', function(e) {
  e.preventDefault();
  $('select option').attr('selected','selected'); //hack for firefox
  var sendData = {
    'roleName': $.trim( $('#popup-role-form #roleName').val() ),
    'desc': $.trim( $('#popup-role-form #desc').val() ),
    'resources': $('#ressourceSelect_to').val(),
    'users':$('#userSelect_to').val()
  };
  var ajaxUrl = common.API_HOST + 'user/saveRole';
  if( $('#roleId').length > 0) {
    sendData.roleId = $('#popup-role-form #roleId').val();
    ajaxUrl = common.API_HOST + 'user/updateRole'
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
      if( $('#roleId').length > 0) {
        alert('角色已更新！');
      } else {
        alert('角色已添加！');
      }
      alert('骗你的啦，后台接口还没好呢！');
    } else {
      alert('操作失败：'+res.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此角色吗？')) {
    $.ajax({
      url: common.API_HOST + 'role/deleteRole',
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
$(document).on('click', '#btn-export', function() {
  alert('后台接口还没好呢！');
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
function setModal(roleData) {
  var data, source;
  if (roleData) {
    _(_resources).forEach(function(value, key){
      _resources[key].selected = _.includes(roleData.resources, value.id) ? true : false;
    });
    delete roleData.resources;
    _(_users).forEach(function(value, key){
      _users[key].selected = _.includes(roleData.users, value.id) ? true : false;
    });
    delete roleData.users;
    data = {role:roleData, resources:_resources, users:_users};
    source = $('#edit-template').html();
  } else {
    data = {resources:_resources, users:_users};
    source = $('#create-template').html();
    $('#popup-role-form .modal-title').html('新增角色');
  }
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#popup-role-form .modal-body').html(html);

  $('#resourceSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#resourceSelect_to',
    rightAll: '#resourceSelect_all',
    rightSelected: '#resourceSelect_right',
    leftSelected: '#resourceSelect_left',
    leftAll: '#resourceSelect_none'
  });
  $('#userSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#userSelect_to',
    rightAll: '#userSelect_all',
    rightSelected: '#userSelect_right',
    leftSelected: '#userSelect_left',
    leftAll: '#userSelect_none'
  });
}
