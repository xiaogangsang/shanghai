var common = require('common');
var _users = [];
var _channels = [];

$(function() {
  common.setMenu('ability-channel');
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
    leftAll: '#userSelect_none'
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
      pageSize: 9999
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data.rows).forEach(function(value, key){
        _users.push({id:value.id, realName: value.realName, cityAuthority: value.cityAuthority});
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
      $.each(_channels, function(index, item) {
        $('#channelSelect').append($('<option></option>').attr('value', item.channelId).text(item.channelName));
      });
      $("#channelSelect").chosen();
    }
  });
}

function setUser(channelId) {
  $.ajax({
    url: common.API_HOST + 'security/authority/userChannel/getUsersByChannelId',
    type: 'POST',
    dataType: 'json',
    data: {channelId: channelId}
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      _(_users).forEach(function(value, key){
        if( res.data.indexOf(value.id.toString()) > -1 ) {
          $('#userSelect_to').append($('<option></option>').attr('value', value.id).text(value.realName));
        } else {
          $('#userSelect').append($('<option></option>').attr('value', value.id).text(value.realName));
        }
      });
      $('#formChannel button[type=submit]').prop('disabled', false).text('保存');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

$("#channelSelect").on('change', function(e) {
  e.preventDefault();
  $('#userSelect_to').html('');
  $('#userSelect').html('');
  setUser($(this).val());
  $('#formChannel button[type=submit]').prop('disabled', true).text('加载中...');
});
$('#formChannel').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  $('.multi-selection option').attr('selected','selected');
  $('#formChannel').trigger('submit');
});
$('#formChannel').on('submit', function(e) {
  e.preventDefault()
  $('#formChannel').parsley().on('form:success', function(){
    var sendData = {
      channelId: $('#channelSelect').val(),
      userIds: $('#userSelect_to').val()
    };
    $.ajax({
      url: common.API_HOST + 'security/authority/userChannel/updateChannelAuthority',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(sendData)
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