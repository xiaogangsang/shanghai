var common = require('common');

$(function() {
  init();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  alert('别心急，接口还没有完成呢！');
  return false;
});

//initial
function init() {
  common.setMenu('class');
  //set search form
  setChannel();
  setCity();
}

function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      $.each(res.data, function(key, cityGroup) {
        // console.log(key);
        var $optGroup = $('<optgroup></optgroup>').attr('label',key.toUpperCase());
        $.each(cityGroup, function(index, city){
          $optGroup.append($('<option></option>').attr('value', city.cityId).text(city.cityName));
        });
        $('#city').append($optGroup);
      });
      $('#city').chosen();
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
    // console.log(res.data);
    if (true == res.meta.result) {
      $.each(res.data, function(index, channel) {
        $('#channel').append($('<option></option>').attr('value', channel.channelId).text(channel.channelName));
      });    }
  });
}