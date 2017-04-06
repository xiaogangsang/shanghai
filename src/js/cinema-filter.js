'use strict;'

var common = require('common');

var _submitting = false;

$(function () {
  common.init('cinema-filter');

  $.ajax({
    url: common.API_HOST + 'filter/getFilterSettings',
    type: 'POST',
    dataType: 'json'
  })
  .done(function (res) {
    // var res = JSON.parse('{  "meta": {    "result": "1",    "msg": "操作成功"  },  "data": {"brand": [    {        "id": "brand1",        "name": "wanda",        "selected": false    },    {        "id": "brand2",        "name": "amc",        "selected": true    }],"points": {        "id": "points",        "name": "jifen",        "selected": false},"effect": [    {        "id": "effect1",        "name": "3D",        "selected": true    },    {        "id": "effect2",        "name": "IMax",        "selected": true    }],"service": [    {        "id": "service1",        "name": "popcorn",        "selected": true    },    {        "id": "service2",        "name": "blah",        "selected": true    }]}}');
    if (!!~~res.meta.result) {

      var template = $('#content-template').html();

      Mustache.parse(template);
      var html = Mustache.render(template, res.data);

      $('#container-content').html(html);

      $('#brandSelect').multiselect({
        search: {
          left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
          right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
        },
        right: '#brandSelect_to',
        rightAll: '#brandSelect_all',
        rightSelected: '#brandSelect_right',
        leftSelected: '#brandSelect_left',
        leftAll: '#brandSelect_none',
      });
      $('#effectSelect').multiselect({
        search: {
          left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
          right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
        },
        right: '#effectSelect_to',
        rightAll: '#effectSelect_all',
        rightSelected: '#effectSelect_right',
        leftSelected: '#effectSelect_left',
        leftAll: '#effectSelect_none',
      });

      $('#serviceSelect').multiselect({
        search: {
          left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
          right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
        },
        right: '#serviceSelect_to',
        rightAll: '#serviceSelect_all',
        rightSelected: '#serviceSelect_right',
        leftSelected: '#serviceSelect_left',
        leftAll: '#serviceSelect_none',
      });

      $('#durationSelect').multiselect({
        search: {
          left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
          right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
        },
        right: '#durationSelect_to',
        rightAll: '#durationSelect_all',
        rightSelected: '#durationSelect_right',
        leftSelected: '#durationSelect_left',
        leftAll: '#durationSelect_none',
      });

      $('input[name=points][value=' + res.data.points.selected +  ']').prop('checked', true);

      $('form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

});

$(document).on('submit', 'form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;

  $('.multi-selection option').prop('selected', true);

  var ids = [];

  $('#brandSelect_to option, #effectSelect_to option, #serviceSelect_to option, #durationSelect_to option').each(function (index, el) {
    // if (!$(el).hasClass('hidden')) {
      ids.push($(el).val());
    // }
  });

  var points = $('input[name=points]:checked').data("id");

  if (points) ids.push(points);

  $.ajax({
    url: common.API_HOST + 'filter/updateFilterSettings.json',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({selected: ids}),
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('提交成功!');
    } else {
      alert('操作失败：' + res.meta.msg);
    }
  });

  return false;
});

