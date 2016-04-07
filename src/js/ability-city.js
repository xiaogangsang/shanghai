var common = require('common');
var _users = {};
var _cities = [];

$(function() {
  common.setMenu('ability-city');
  getUsers();
  //set search form
  setCity();

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

function setCity() {
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
      $.each(_cities, function(index, item) {
        $('#citySelect').append($('<option></option>').attr('value', item.cityId).text(item.cityName));
      });
      $("#citySelect").chosen();
    }
  });
}

function setUser(cityId) {
  $.ajax({
    url: common.API_HOST + 'resource/userList',
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: {id: cityId}
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
      $('#formCity button').prop('disabled', false);
      $('#formCity').parsley();
    }
  });
}

$("#citySelect").on('change', function(e) {
  e.preventDefault();
  $('#userSelect_to').html('');
  $('#userSelect').html('');
  setUser($(this).val());
});

$('#formCity').on('submit', function(e) {
  e.preventDefault()
  $('select option').attr('selected','selected'); //hack for firefox
  $('#formCity').parsley().on('form:success', function(){
    alert('可以提交');
    // $.ajax({
    //   url: common.API_HOST + 'resource/updateChannel',
    //   type: 'GET',
    //   dataType: 'json',
    //   contentType: 'application/json; charset=utf-8',
    //   data: {
    //     id: $('#channelSelect').val(),
    //     userIds: $('#userSelect_to').val()
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