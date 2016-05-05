'use strict;'

var common = require('common');
var _users = [];
var _cities = [];

$(function () {
  common.init('ability-city');

  //set search form
  setCity();

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

  $('#formCity').parsley();
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

function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (res.meta.result == true) {
      _(res.data).forEach(function (group) {
        _(group).forEach(function (city) {
          _cities.push(city);
        });
      });

      var htmlCity = '';
      $.each(_cities, function (index, item) {
        htmlCity += '<option value="' + item.cityId + '">' + item.cityName + '</option>';
      });

      $('#citySelect').append(htmlCity);
      $('#citySelect').chosen();
    }
  });
}

function setUser(cityId) {
  $.ajax({
    url: common.API_HOST + 'security/authority/userCity/getUsersByCityId',
    type: 'POST',
    dataType: 'json',
    data: { cityId: cityId },
  })
  .done(function (res) {
    if (res.meta.result == true) {
      var htmlChoosed = '';
      var htmlUnchoosed = '';
      _(_users).forEach(function (value, key) {
        if (res.data.indexOf(value.id.toString()) > -1) {
          htmlChoosed += '<option value="' + value.id + '">' + value.realName + '</option>';
        } else {
          htmlUnchoosed += '<option value="' + value.id + '">' + value.realName + '</option>';
        }
      });

      $('#userSelect_to').append(htmlChoosed);
      $('#userSelect').append(htmlUnchoosed);
      $('#formCity button[type=submit]').prop('disabled', false).text('保存');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$('#citySelect').on('change', function (e) {
  e.preventDefault();
  $('#userSelect_to').html('');
  $('#userSelect').html('');
  setUser($(this).val());
  $('#formCity button[type=submit]').prop('disabled', true).text('加载中...');
});

$('#formCity').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  $('.multi-selection select:eq(1) option').prop('selected', true);
  var sendData = {
    cityId: $('#citySelect').val(),
    cityName: $('#citySelect option:selected').text(),
    userIds: $('#userSelect_to').val(),
  };
  $.ajax({
    url: common.API_HOST + 'security/authority/userCity/updateCityAuthority',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    if (res.meta.result == true) {
      alert('保存成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});
