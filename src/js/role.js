var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _roles = {};
var _users = {};
var _resources = {};

$(function() {
  common.setMenu('role');
  $('#btn-export').attr('href', common.API_HOST+'security/role/exportRoles');
  //set search form
  setRole();
  getUsers();
  getResources();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault()
  var sendData = {
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  if ($('#search_roleId').val() != '') {
    sendData.roleId = $('#search_roleId').val();
  }
  if ($.trim($('#search_createdBy').val()) != '') {
    createdBy = $.trim($('#search_createdBy').val());
  }
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'security/role/roleList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      setTableData(res.data.rows);
    } else {
      alert('接口错误：'+res.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'security/role/roleDetail',
    type: 'POST',
    dataType: 'json',
    data: { roleId: $(this).parents('tr').data('id') }
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      setModal(res.data);
      $('#popup-role-form').modal('show');
      $('#popup-role-form form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
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
  $('#popup-role-form select option').attr('selected','selected'); //hack for firefox
  var sendData = {
    roleName: $.trim( $('#popup-role-form #roleName').val() ),
    desc: $.trim( $('#popup-role-form #desc').val() ),
    resources: $('#resourceSelect_to').val(),
    userIds: $('#userSelect_to').val()
  };
  var ajaxUrl = common.API_HOST + 'security/role/saveRole';
  if( $('#roleId').length > 0) {
    sendData.roleId = $('#popup-role-form #roleId').val();
    ajaxUrl = common.API_HOST + 'security/role/updateRole'
  }
  // console.log( sendData );
  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData)
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if( $('#roleId').length > 0) {
        alert('角色已更新！');
      } else {
        alert('角色已添加！');
      }
      $('#popup-role-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var tr = $(this).parents('tr');
  if (window.confirm('确定要删除此角色吗？')) {
    var sendData = {
      id: []
    };
    sendData.id.push(tr.data('id'));
    $.ajax({
      url: common.API_HOST + 'security/role/deleteRole',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(sendData)
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        tr.fadeOut(500,function(){
          tr.remove();
        });
      } else {
        alert('删除失败：'+res.meta.msg);
      }
    });
  }
  return false;
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
    alert('请至少选中一个！');
    return false;
  }
  if (window.confirm('确定要删除选中的角色吗？')) {
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
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
function setModal(roleData) {
  var data, template;
  if (roleData) {
    _(_resources).forEach(function(value, key){
      _(roleData.resources).forEach(function(item){
        if (item == value.id) {
          _resources[key].selected = true;
        }
      });
    });
    delete roleData.resources;
    _(_users).forEach(function(value, key){
      _(roleData.users).forEach(function(item){
        if (item == value.id) {
          _users[key].selected = true;
        }
      });
    });
    delete roleData.users;
    data = {role:roleData, resources:_resources, users:_users};
    template = $('#edit-template').html();
  } else {
    data = {resources:_resources, users:_users};
    template = $('#create-template').html();
    $('#popup-role-form .modal-title').html('新增角色');
  }
  Mustache.parse(template);
  var html = Mustache.render(template, data);
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

function setRole() {
  $.ajax({
    url: common.API_HOST + 'security/role/roleList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _roles = res.data.rows;
      _(_roles).forEach(function(role, key) {
        $('#search_roleId').append($('<option></option>').attr('value', role.id).text(role.roleName));
      });
    }
  });
}
function getUsers() {
  $.ajax({
    url: common.API_HOST + 'security/user/userList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _users = res.data.rows;
    } else {
      alert('获取用户列表失败：'+res.msg);
    }
  });
}
function getResources() {
  $.ajax({
    url: common.API_HOST + 'security/resource/resourceList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _resources = res.data.rows;
    } else {
      alert('获取功能列表失败：'+res.msg);
    }
  });
}