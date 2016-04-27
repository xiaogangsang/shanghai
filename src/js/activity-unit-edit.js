var common = require('common');
var _budgetSource = [];

$(function() {
  common.setMenu('activity-unit');
  common.setLoginName();
  // var urlParam = common.getUrlParam();
  // if (urlParam.planId != undefined || urlParam.planId != '') {
  //   $('#search_planId').val(urlParam.planId);
  //   $('#formSearch').trigger('submit');
  // }

  getBudgetSource();
  $('#movieSelect').multiselect({
  search: {
    left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
    right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
  },
  right: '#movieSelect_to',
  rightAll: '#movieSelect_all',
  rightSelected: '#movieSelect_right',
  leftSelected: '#movieSelect_left',
  leftAll: '#movieSelect_none'
});
});
// 活动预算
$(document).on('click', '#btn-set-daily', function(event) {
  event.preventDefault();
  $('#popup-unit-budget').modal('show');
  $('#popup-unit-budget form').parsley();
});
$(document).on('submit', '#popup-unit-budget form', function(event) {
  event.preventDefault();
  $('#popup-unit-budget').modal('hide');
  return false;
});
$(document).on('click', '#btn-daily', function(event) {
  event.preventDefault();
  var template = $('#daily-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#dailyBudgetTable tbody').append(html);
  $('#popup-unit-budget').scrollTop($('#popup-unit-budget').height());
});
$(document).on('click', '#dailyBudgetTable .btn-delete', function(event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条日预算吗？')) {
    $(this).closest('tr').remove();
  }
});
//单户限购
$(document).on('click', '#btn-set-restriction', function(event) {
  event.preventDefault();
  $('#popup-unit-restriction').modal('show');
  $('#popup-unit-restriction form').parsley();
});
$(document).on('submit', '#popup-unit-restriction form', function(event) {
  event.preventDefault();
  $('#popup-unit-restriction').modal('hide');
  return false;
});
//影片
$(document).on('click', '#btn-set-movie', function(event) {
  event.preventDefault();
  $('#popup-unit-movie').modal('show');
  $('#popup-unit-movie form').parsley();
});
$(document).on('click', '#popup-unit-movie button[type=submit]', function(event) {
  event.preventDefault();
  $('.multi-selection select:eq(1) option').prop('selected', true);
});
$(document).on('submit', '#popup-unit-movie form', function(event) {
  event.preventDefault();
  $('#popup-unit-movie').modal('hide');
  return false;
});
//场次
$(document).on('click', '#btn-set-showtime', function(event) {
  event.preventDefault();
  $('#popup-unit-showtime').modal('show');
  $('#popup-unit-showtime form').parsley();
});
$(document).on('submit', '#popup-unit-showtime form', function(event) {
  event.preventDefault();
  $('#popup-unit-showtime').modal('hide');
  return false;
});
$(document).on('click', '#btn-showtime', function(event) {
  event.preventDefault();
  var template = $('#showtime-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#showtimeTable tbody').append(html);
  $('#popup-unit-showtime').scrollTop($('#popup-unit-showtime').height());
});
$(document).on('click', '#showtimeTable .btn-delete', function(event) {
  event.preventDefault();
  if (window.confirm('确定要删除该条场次限制吗？')) {
    $(this).closest('tr').remove();
  }
});
//影院
$(document).on('click', '#btn-set-cinema', function(event) {
  event.preventDefault();
  $('#popup-unit-cinema').modal('show');
});











function getBudgetSource() {
  $.ajax({
    url: common.API_HOST + 'activity/budgetSourceList',
    type: 'POST',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _budgetSource = res.data;
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}