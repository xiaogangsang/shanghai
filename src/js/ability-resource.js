var common = require('common');
var _roles = {};
var _resources = {};

$(function() {
  common.setMenu('ability-resource');
  getRoles();
  //set search form
  setResource();

  $('#roleSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#roleSelect_to',
    rightAll: '#roleSelect_all',
    rightSelected: '#roleSelect_right',
    leftSelected: '#roleSelect_left',
    leftAll: '#roleSelect_none'
  });
});

function getRoles() {
  $.ajax({
    url: common.API_HOST + 'role/getAllRoles',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.meta);
    if (true == res.meta.result) {
      _roles = res.data;
    } else {
      alert('获取角色列表失败：'+res.msg);
    }
  });
}

function setResource() {
  $.ajax({
    url: common.API_HOST + 'resource/getAllResources',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _resources = res.data;
      $.each(_resources, function(index, item) {
        $('#resourceSelect').append($('<option></option>').attr('value', item.id).text(item.name));
      });
      $("#resourceSelect").chosen();
    }
  });
}

function setRole(resourceId) {
  $.ajax({
    url: common.API_HOST + 'resource/resourceList',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: {id: resourceId}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(_roles).forEach(function(value){
        if( _.includes(res.data.roles, value.id) ) {
          $('#roleSelect_to').append($('<option></option>').attr('value', value.id).text(value.roleName));
        } else {
          $('#roleSelect').append($('<option></option>').attr('value', value.id).text(value.roleName));
        }
      });
      $('#formResource button').prop('disabled', false);
      $('#formResource').parsley();
    }
  });
}

$("#resourceSelect").on('change', function(e) {
  e.preventDefault();
  $('#roleSelect_to').html('');
  $('#roleSelect').html('');
  setRole($(this).val());
});

$('#formResource').on('submit', function(e) {
  e.preventDefault()
  $('select option').attr('selected','selected'); //hack for firefox
  $('#formResource').parsley().on('form:success', function(){
    $.ajax({
      url: common.API_HOST + 'resource/updateResource',
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: {
        id: $('#resourceSelect').val(),
        roleIds: $('#roleSelect_to').val()
      }
    })
    .done(function(res) {
      if (true == res.meta.result) {
        alert('保存成功！');
      } else {
        alert(res.msg);
      }
    });
  });
  return false;
});