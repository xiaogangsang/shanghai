'use strict;'

var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _roles = [];
var _users = [];
var _resources = [];
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('role');
  $('#btn-export').attr('href', common.API_HOST + 'security/role/exportRoles');

  //set search form
  getAllRoles();
  getUsers();
  getResources();
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    pageIndex: _pageIndex,
    pageSize: _pageSize,
  };

  if ($('#search_roleName').val().trim() != '') {
    sendData.roleName = $('#search_roleName').val();
  }

  if ($('#search_createdBy').val().trim() != '') {
    sendData.createdBy = $('#search_createdBy').val().trim();
  }

  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;
  $.ajax({
    url: common.API_HOST + 'security/role/getAllRoles',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="6" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _(res.data.rows).forEach(function (item) {
          if (item.desc != null && item.desc.length > 12) {
            item.short = item.desc.substr(0, 10) + '...';
          } else {
            item.short = item.desc;
          }
        });

        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, res.data.pageIndex, res.data.rows.length, _pageTotal);
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.msg);
    }
  });

  return false;
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'security/role/roleDetail',
    type: 'POST',
    dataType: 'json',
    data: { roleId: $(this).parents('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      setModal(res.data);
      $('#popup-role-form').modal('show');
      $('#popup-role-form form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  setModal(false);
  $('#popup-role-form').modal('show');
  $('#popup-role-form form').parsley();
});

$(document).on('click', '#popup-role-form button[type=submit]', function (event) {
  event.preventDefault();
  $('.multi-selection option').prop('selected', true);
  $('#popup-role-form form').trigger('submit');
});

$(document).on('submit', '#popup-role-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    // roleType: $('#popup-role-form #roleType').val(),
    roleName: $('#popup-role-form #roleName').val().trim(),
    desc: $('#popup-role-form #desc').val().trim(),
    resources: $('#resourceSelect_to').val(),
    userIds: $('#userSelect_to').val(),
    assignedRoles: $('#assignedRoleSelect_to').val(),
  };
  var ajaxUrl = common.API_HOST + 'security/role/saveRole';
  if ($('#roleId').length > 0) {
    sendData.roleId = $('#popup-role-form #roleId').val();
    ajaxUrl = common.API_HOST + 'security/role/updateRole';

  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#roleId').length > 0) {
        alert('角色已更新！');
      } else {
        alert('角色已添加！');
      }

      $('#popup-role-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var tr = $(this).parents('tr');
  if (window.confirm('确定要删除此角色吗？')) {
    $.ajax({
      url: common.API_HOST + 'security/role/deleteRole',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify([tr.data('id')]),
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        tr.fadeOut(500, function () {
          tr.remove();
        });
      } else {
        alert('删除失败：' + res.meta.msg);
      }
    });
  }

  return false;
});

$('#pager').on('click', '.prev,.next', function (e) {
  e.preventDefault();
  if ($(this).hasClass('prev')) {
    if (_pageIndex <= 1) {
      _pageIndex = 1;
      alert('已经是第一页！');
      return false;
    }

    _pageIndex--;
  } else {
    if (_pageIndex >= _pageTotal) {
      _pageIndex = _pageTotal;
      alert('已经是最后一页！');
      return false;
    }

    _pageIndex++;
  }

  $('#formSearch').trigger('submit');
  return false;
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (~~$('#pageNo').val() == 0) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

$(document).on('click', '#btn-delete-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  if (window.confirm('确定要删除选中的角色吗？')) {
    var userIds = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function (index, el) {
      userIds.push($(this).closest('tr').data('id'));
    });

    $.ajax({
      url: common.API_HOST + 'security/role/deleteRole',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userIds),
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        $checkedItems.each(function (index, el) {
          $(this).closest('tr').fadeOut(1000, function () {
            $(this).remove();
          });
        });
      } else {
        alert('删除失败：' + res.meta.msg);
      }
    });
  }

  return false;
});

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

function setModal(roleData) {
  var data;
  var template;
  if (roleData) {
    _(_resources).forEach(function (res) {
      var funcSelected = false;
      var funcUnSelected = false;
      if (res.function.length > 0) {
        res.group = true;
        _(res.function).forEach(function (func) {
          if (roleData.resources.indexOf(func.id.toString()) > -1) {
            func.selected = true;
            funcSelected = true;
          } else {
            func.selected = false;
            funcUnSelected = true;
          }
        });

        res.hasSelected = funcSelected;
        res.hasUnSelected = funcUnSelected;
      } else {
        res.selected = roleData.resources.indexOf(res.id.toString()) > -1 ? true : false;
      }
    });

    delete roleData.resources;
    _(_users).forEach(function (value, key) {
      _users[key].selected = roleData.users.indexOf(value.id.toString()) > -1 ? true : false;
    });

    delete roleData.users;

    _(_roles).forEach(function (value, key) {
      _roles[key].selected = roleData.assignedRoles.indexOf(value.id) > -1 ? true : false;
    });

    delete roleData.assignedRoles;

    data = { role: roleData, resources: _resources, users: _users, assignedRoles: _roles };
    template = $('#edit-template').html();
    $('#popup-role-form .modal-title').html('编辑角色');
  } else {
    data = { resources: _resources, users: _users, assignedRoles: _roles };
    template = $('#create-template').html();
    $('#popup-role-form .modal-title').html('新增角色');
  }

  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-role-form .modal-body').html(html);

  $('#assignedRoleSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#assignedRoleSelect_to',
    rightAll: '#assignedRoleSelect_all',
    rightSelected: '#assignedRoleSelect_right',
    leftSelected: '#assignedRoleSelect_left',
    leftAll: '#assignedRoleSelect_none',
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
    leftAll: '#userSelect_none',
  });

  $('#resourceSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#resourceSelect_to',
    rightAll: '#resourceSelect_all',
    rightSelected: '#resourceSelect_right',
    leftSelected: '#resourceSelect_left',
    leftAll: '#resourceSelect_none',
  });
}

function getUsers() {
  $.ajax({
    url: common.API_HOST + 'security/user/userList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _users = res.data.rows;
      $('#btn-create').text('新增角色');
      $('#formSearch button').prop('disabled', false);
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function getResources() {
  $.ajax({
    url: common.API_HOST + 'security/resource/resourceListInSelect',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result && res.data != null && res.data.length > 0) {
      _(res.data).forEach(function (res) {
        res.group = res.function.length > 0 ? true : false;
        _resources.push(res);
      });
    } else {
      alert('获取功能列表失败：' + res.msg);
    }
  });
}

function getAllRoles() {
  $.ajax({
    url: common.API_HOST + 'security/role/getAllRoles',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _roles = res.data.rows;
    }
  });
}
