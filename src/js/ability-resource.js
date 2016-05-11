'use strict;'

var common = require('common');
var _roles = [];
var _submitting = false;

$(function () {
  common.init('ability-resource');

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
    leftAll: '#roleSelect_none',
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
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (res.meta.result == true) {
      _(res.data.rows).forEach(function (value, key) {
        _roles.push({ id: value.id, name: value.roleName });
      });
    } else {
      alert('接口错误：' + res.meta.msg);
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
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (res.meta.result == true) {
      var htmlResource = '';
      _(res.data.rows).forEach(function (value, key) {
        htmlResource += '<option value="' + value.id + '">' + value.name + '</option>';
      });

      $('#resourceSelect').append(htmlResource);
      $('#resourceSelect').chosen();
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
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (res.meta.result == true) {
      var roles = [];
      _(res.data.rows[0].roles).forEach(function (value, key) {
        roles.push(value.id);
      });

      var htmlChoosed = '';
      var htmlUnchoosed = '';
      _(_roles).forEach(function (value, key) {
        if (roles.indexOf(value.id) > -1) {
          htmlChoosed += '<option value="' + value.id + '">' + value.name + '</option>';
        } else {
          htmlUnchoosed += '<option value="' + value.id + '">' + value.name + '</option>';
        }
      });

      $('#roleSelect_to').append(htmlChoosed);
      $('#roleSelect').append(htmlUnchoosed);
      $('#formResource button[type=submit]').prop('disabled', false).text('保存');
      $('#formResource').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$('#resourceSelect').on('change', function (e) {
  e.preventDefault();
  $('#roleSelect_to').html('');
  $('#roleSelect').html('');
  setRole($(this).val());
  $('#formResource button[type=submit]').prop('disabled', true).text('加载中...');
});

$('#formResource').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  if (condition) {
    return false;
  }
  _submitting = true;
  $('.multi-selection select:eq(1) option').prop('selected', true);
  var sendData = {
    id: $('#resourceSelect').val(),
    roleIds: $('#roleSelect_to').val(),
  };
  $.ajax({
    url: common.API_HOST + 'security/resource/updateResource',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    _submitting = false;
    if (res.meta.result == true) {
      alert('保存成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});
