var common = require('common');
var _users = {};
var _channels = {};

$(function() {
  common.setMenu('ability-channel');
  getUsers();
  //set search form
  setChannel();

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
});

function getUsers() {
  $.ajax({
    url: common.API_HOST + 'user/getAllUsers',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.meta);
    if (true == res.meta.result) {
      _users = res.data;
    } else {
      alert('获取用户列表失败：'+res.msg);
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
    url: common.API_HOST + 'resource/userList',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: {id: channelId}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(_users).forEach(function(value){
        if( _.includes(res.data.users, value.id) ) {
          $('#userSelect_to').append($('<option></option>').attr('value', value.id).text(value.realName));
        } else {
          $('#userSelect').append($('<option></option>').attr('value', value.id).text(value.realName));
        }
      });
      $('#formChannel button').prop('disabled', false);
      $('#formChannel').parsley();
    }
  });
}

$("#channelSelect").on('change', function(e) {
  e.preventDefault();
  $('#userSelect_to').html('');
  $('#userSelect').html('');
  setUser($(this).val());
});

$('#formChannel').on('submit', function(e) {
  e.preventDefault()
  $('select option').attr('selected','selected'); //hack for firefox
  $('#formChannel').parsley().on('form:success', function(){
    alert('可以提交');
    // $.ajax({
    //   url: common.API_HOST + 'resource/updateResource',
    //   type: 'GET',
    //   dataType: 'json',
    //   contentType: 'application/json; charset=utf-8',
    //   data: {
    //     id: $('#resourceSelect').val(),
    //     roleIds: $('#channelSelect_to').val()
    //   }
    // })
    // .done(function(res) {
    //   if (true == res.meta.result) {
    //     alert('保存成功！');
    //   } else {
    //     alert(res.msg);
    //   }
    // });
  });
  return false;
});