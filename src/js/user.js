var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _channels = {};
var _roles = {};
var _cities = [];

$(function() {
  common.setMenu('user');
  $('#btn-export').attr('href', common.API_HOST+'security/user/exportUsers');
  $('#fileupload').data('url', common.API_HOST+'security/user/importUsers').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#popup-user-import button[type=submit]').click(function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },
    done: function (e, data) {
      if (true == data.result.meta.result) {
        alert('导入成功！');
      } else {
        alert('导入失败：'+data.result.meta.msg);
      }
      $('#popup-user-import button[type=submit]').prop('disable', false).text('上传');
    }
  });
  //set search form
  setRole();
  //cache data
  getChannels();
  getCities();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault()
  var sendData = {
    // name: $.trim($('#search_name').val()),
    // loginId: $.trim($('#search_loginId').val()),
    // city: $.trim($('#search_city').val()),
    // department: $.trim($('#search_department').val()),
    // roleId: $('#search_roleId').val(),
    // createdBy: $.trim($('#search_createdBy').val()),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  var name = $.trim($('#search_name').val())
  if ('' != name) {
    sendData.name = name;
  }
  var loginId = $.trim($('#search_loginId').val());
  if ('' != loginId) {
    sendData.loginId = loginId;
  }
  var city = $.trim($('#search_city').val());
  if ('' != city) {
    sendData.city = city;
  }
  var department = $.trim($('#search_department').val());
  if ('' != department) {
    sendData.department = department;
  }
  var roleId = $('#search_roleId').val();
  if ('' != roleId) {
    sendData.roleId = roleId;
  }
  var createdBy = $.trim($('#search_createdBy').val());
  if ('' != createdBy) {
    sendData.createdBy = createdBy;
  }
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'security/user/userList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total/_pageSize);
      setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
      setTableData(res.data.rows);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$(document).on('click', '#btn-import', function(event) {
  event.preventDefault();
  $('#popup-user-import').modal('show');
});

$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  var userId = $(this).parents('tr').data('id');
  $.ajax({
    url: common.API_HOST + 'security/user/userDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: userId }
  })
  .done(function(res) {
    if (true == res.meta.result) {
      res.data.channelAuthority = undefined != res.data.channelAuthority ? res.data.channelAuthority : [];
      res.data.roles = undefined != res.data.roles ? res.data.roles : [];
      res.data.cityAuthority = undefined != res.data.cityAuthority ? res.data.cityAuthority : [];
      setModal(res.data);
      $('#popup-user-form').modal('show');
      $('#popup-user-form form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-reset', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要重置此用户的密码吗？')) {
    $.ajax({
      url: common.API_HOST + 'security/user/resetPassword',
      type: 'POST',
      dataType: 'json',
      data: {id:that.data('id')}
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('密码已重置！');
      } else {
        alert('接口错误：'+res.meta.msg);
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
      url: common.API_HOST + 'security/user/deleteUser',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify([that.data('id')])
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('删除成功！');
        that.fadeOut(500,function(){
          that.remove();
        });
      } else {
        alert('接口错误：'+res.meta.msg);
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
$('#pager').on('click', '.prev,.next', function(e) {
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
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
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
      url: common.API_HOST + 'security/user/deleteUser',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userIds)
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('删除成功');
        checked_items.each(function(index, el) {
          $(this).closest('tr').fadeOut(1000,function(){
            $(this).remove();
          });
        });
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
  return false;
});
$(document).on('click', '#popup-user-form button[type=submit]', function(event) {
  event.preventDefault();
  $('.multi-selection option').attr('selected','selected');
  $('#popup-user-form form').trigger('submit');
});
$(document).on('submit', '#popup-user-form form', function(e) {
  e.preventDefault();
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
  var ajaxUrl = common.API_HOST + 'security/user/saveUser';
  if( $('#userId').length > 0) {
    sendData.id = $('#popup-user-form #userId').val();
    ajaxUrl = common.API_HOST + 'security/user/updateUser';
  } else {
    sendData.loginId = $.trim( $('#popup-user-form #loginId').val() );
    sendData.password = $.trim( $('#popup-user-form #password').val() );
  }
  console.log( sendData );
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
      if( $('#userId').length > 0) {
        alert('用户已更新！');
      } else {
        alert('用户已添加！');
      }
      $('#formSearch').trigger('submit');
      $('#popup-user-form').modal('hide');
    } else {
      alert('操作失败：'+res.meta.msg);
    }
  });
  return false;
});

function setModal(userData) {
  var data, template;
  if (userData) {
    _(_channels).forEach(function(value, key){
      _channels[key].selected = userData.channelAuthority.indexOf(value.channelId) > -1 ? true : false;
    });
    delete userData.channelAuthority;
    _(_roles).forEach(function(value, key){
      _roles[key].selected = userData.roles.indexOf(value.id) > -1 ? true : false;
    });
    delete userData.roles;
    _(_cities).forEach(function(value, key){
      _cities[key].selected = userData.cityAuthority.indexOf(value.id) > -1 ? true : false;
    });
    delete userData.cityAuthority
    data = {user:userData, channels:_channels, roles:_roles, cities:_cities};
    template = $('#edit-template').html();
    $('#popup-user-form .modal-title').html('编辑用户');
  } else {
    data = {channels:_channels, roles:_roles, cities:_cities};
    template = $('#create-template').html();
    $('#popup-user-form .modal-title').html('新增用户');
  }
  Mustache.parse(template);
  var html = Mustache.render(template, data);

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
      $.each(_roles, function(index, role) {
        $('#search_roleId').append($('<option></option>').attr('value', role.id).text(role.roleName));
      });
      $('#search_roleId').chosen({disable_search_threshold: 6,allow_single_deselect: true});
    }
  });
}
function getChannels() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：'+res.meta.msg);
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
      alert('获取城市列表失败：'+res.meta.msg);
    }
  });
}