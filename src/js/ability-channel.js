'use strict;'

var common = require('common');
var _users = [];
var _channels = [];
var _submitting = false;

$(function () {
  common.init('ability-channel');

  //set search form
  setChannel();

  //data cache
  getUsers();

  $('#userSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#userSelect_to',
    rightAll: '#userSelect_all',
    rightSelected: '#userSelect_right',
    leftSelected: '#userSelect_left',
    leftAll: '#userSelect_none',
  });

  $('#formChannel').parsley();
});

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
    if (res.meta.result == true) {
      _(res.data.rows).forEach(function (value, key) {
        _users.push({ id: value.id, realName: value.realName, cityAuthority: value.cityAuthority });
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (res.meta.result == true) {
      _channels = res.data;
      var htmlChannel = '';
      $.each(_channels, function (index, item) {
        if (Cookies.get('authChannel').indexOf(item.channelId) > -1) {
          htmlChannel += '<option value="' + item.channelId + '">' + item.channelName + '</option>';
        }
      });

      $('#channelSelect').append(htmlChannel);
      $('#channelSelect').chosen();
    }
  });
}

function setUser(channelId) {
  $.ajax({
    url: common.API_HOST + 'security/authority/userChannel/getUsersByChannelId',
    type: 'POST',
    dataType: 'json',
    data: { channelId: channelId },
  })
  .done(function (res) {
    if (res.meta.result == true) {
      var htmlChoosed = '';
      var htmlUnchoosed = '';
      _(_users).forEach(function (value, key) {
        if (res.data.indexOf(value.id.toString()) > -1) {
          htmlChoosed += '<option value="' + value.id + '">' + value.id + ':' + value.realName + '</option>';
        } else {
          htmlUnchoosed += '<option value="' + value.id + '">' + value.id + ':' + value.realName + '</option>';
        }
      });

      $('#userSelect_to').append(htmlChoosed);
      $('#userSelect').append(htmlUnchoosed);
      $('#formChannel button[type=submit]').prop('disabled', false).text('保存');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$('#channelSelect').on('change click', function (e) {
  e.preventDefault();
  $('#userSelect_to').html('');
  $('#userSelect').html('');
  setUser($(this).val());
  $('#formChannel button[type=submit]').prop('disabled', true).text('加载中...');
});

$('#formChannel').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  $('.multi-selection select:eq(1) option').prop('selected', true);
  var sendData = {
    channelId: $('#channelSelect').val(),
    userIds: $('#userSelect_to').val(),
  };
  $.ajax({
    url: common.API_HOST + 'security/authority/userChannel/updateChannelAuthority',
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
