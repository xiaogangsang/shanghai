'use strict;'

var common = require('common');
var util = require('util');
var _channels = {};
var _cities = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _searchCache = {};
var _useCache = false;
var _dataCache;
var _submitting = false;
var _cacheCinemas = [];

$(function () {
  common.init('search');
  util.init($);
  setCity();

  $('#search_startTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_startTime').datetimepicker('setEndDate', FromEndDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_startTime').val(beginDate).datetimepicker('setEndDate', endDate);
  $('#search_endTime').val(endDate).datetimepicker('setStartDate', beginDate);

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  _useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    channel: $('#search_channel').val(),
    cityId: $('#search_cityId').val(),
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    searchTerm: $('#search_searchTerm').val().trim(),
    type: $('#search_type').val(),
    pageSize: _pageSize,
    pageIndex: _pageIndex,
  };
  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (_useCache) {
    sendData = _searchCache;
  } else {
    _searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  var ajaxUrl = common.API_HOST + 'front/seatIcon/query';

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      var data = sendData.bannerType == 4 ? res.data.seatIconList : res.data.rows;
      if (data.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        _useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, data.length, _pageTotal);

        _dataCache = data;
        setTableData(_dataCache);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '.btn-create', function (e) {
  e.preventDefault();
  console.log("点击新增")

});

$(document).on('click', '.btn-export', function (e) {
  e.preventDefault();
  console.log("点击导出")

});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  // that.data('id')
  console.log("点击编辑")
});

function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function (group) {
        _(group).forEach(function (city) {
          _cities.push(city);
        });
      });

      var html = '';
      $.each(_cities, function (index, item) {
        html += '<option value="' + item.cityId + '">' + item.cityName + '</option>';
      });

      $('#search_cityId').append(html);
      $('#search_cityId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}


function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
