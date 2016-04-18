var common = require('common');
var _roles = [];
// var _resources = [];

$(function() {
  common.setMenu('ability-resource');
  //set search form
  setResource();
  //cache data
  getRoles();

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

  $('#formResource').parsley();
});
function getRoles() {
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
      _(res.data.rows).forEach(function(value, key){
        _roles.push({id:value.id, name: value.roleName});
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setResource() {
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
      _(res.data.rows).forEach(function(value, key){
        $('#resourceSelect').append($('<option></option>').attr('value', value.id).text(value.name));
      });
      $("#resourceSelect").chosen();
    }
  });
}

function setRole(resourceId) {
  $.ajax({
    url: common.API_HOST + 'security/resource/resourceList',
    type: 'POST',
    dataType: 'json',
    data: {
      id: resourceId,
      pageIndex: 1,
      pageSize: 9999
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      var roles = [];
      _(res.data.rows[0].roles).forEach(function(value, key){
        roles.push(value.id);
      });
      _(_roles).forEach(function(value, key){
        if( roles.indexOf(value.id) > -1 ) {
          $('#roleSelect_to').append($('<option></option>').attr('value', value.id).text(value.name));
        } else {
          $('#roleSelect').append($('<option></option>').attr('value', value.id).text(value.name));
        }
      });
      $('#formResource button[type=submit]').prop('disabled', false).text('保存');
      $('#formResource').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

$("#resourceSelect").on('change', function(e) {
  e.preventDefault();
// console.log($(this).val());
  $('#roleSelect_to').html('');
  $('#roleSelect').html('');
  setRole($(this).val());
  $('#formResource button[type=submit]').prop('disabled', true).text('加载中...');
});
$('#formResource').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  $('.multi-selection option').attr('selected','selected');
  $('#formResource').trigger('submit');
});
$('#formResource').on('submit', function(e) {
  e.preventDefault()
  $('#formResource').parsley().on('form:success', function(){
    $.ajax({
      url: common.API_HOST + 'security/resource/updateResource',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        id: $('#resourceSelect').val(),
        roleIds: $('#roleSelect_to').val()
      })
    })
    .done(function(res) {
      if (true == res.meta.result) {
        alert('保存成功！');
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  });
  return false;
});