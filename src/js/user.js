var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _channels = {};
var _roles = {};
var _cities = [];

$(function() {
  init();
});

//initial
function init() {
  common.setMenu('user');
  //set search form
  setRole();
  //cache data
  getChannels();
  getRoles();
  getCities();
}

function getChannels() {
  $.get(common.API_HOST + 'common/channelList', function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：'+res.msg);
    }
  });
}
function getRoles() {
  $.get(common.API_HOST + 'role/getAllRoles', function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _roles = res.data;
    } else {
      alert('获取角色列表失败：'+res.msg);
    }
  });
}
function getCities() {
  $.get(common.API_HOST + 'common/cityList', function(res) {
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
  $.ajax({
    url: common.API_HOST + 'user/userList',
    type: 'GET',
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    data: {
      name: $.trim($('#name').val()),
      loginId: $.trim($('#loginId').val()),
      city: $.trim($('#city').val()),
      department: $.trim($('#department').val()),
      roleId: $('#roleId').val(),
      createdBy: $.trim($('#createdBy').val()),
      pageIndex: _pageIndex,
      pageSize: _pageSize
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _pageIndex = res.data.pageIndex;
      setPager(res.data.total, res.data.pageIndex, res.data.rows.length);
      setTableData(res.data.rows);
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
    contentType: "application/json; charset=utf-8",
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
  if (window.confirm('确定要重置此用户的密码吗？')) {
    alert('骗你的啦，后台接口还没好呢！');
  }
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  if (window.confirm('确定要删除此用户吗？')) {
    alert('骗你的啦，后台接口还没好呢！');
  }
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-user-form').modal('show');
  $('#popup-user-form form').parsley();
});
$(document).on('submit', '#popup-user-form form', function(e) {
  e.preventDefault();

  if ( $('#userId').length ) {
    data = {

    };
  }

  return false;
});

function setModal(userData) {
  var data, source;
  if (userData) {
    userData.selectedChannels = [];
    _(_channels).forEach(function(value, key){
      _channels[key].selected = _.includes(userData.channelAuthority, value.channelId) ? true : false;
    });
    delete userData.channelAuthority;
    userData.selectedRoles = [];
    _(_roles).forEach(function(value, key){
      _roles[key].selected = _.includes(userData.roles, value.id) ? true : false;
    });
    delete userData.roles;
    userData.selectedCities = [];
    _(_cities).forEach(function(value, key){
      _cities[key].selected = _.includes(userData.cityAuthority, value.cityId) ? true : false;

    });
    delete userData.cityAuthority
    data = {user:userData, channels:_channels, roles:_roles, cities:_cities};
    source = $("#edit-template").html();
  } else {
    data = {channels:_channels, roles:_roles, cities:_cities};
    source = $("#create-template").html();
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
  var source = $("#table-template").html();
  var template = Handlebars.compile(source);
  var html = template(data);
  $('#dataTable').html(html);
}

function setPager(total, pageIndex, pageSize) {
  var data = {total:total,pageIndex:pageIndex,pageSize:pageSize};
  var pageTotal = _.ceil(total/pageSize);
  pageTotal = pageTotal > 1 ? pageTotal : 0;
  var source = $("#pager-template").html();
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
      $.each(res.data, function(index, role) {
        $('#roleId').append($('<option></option>').attr('value', role.id).text(role.roleName));
      });
    }
  });
}