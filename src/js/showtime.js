'use strict;'

var common = require('common');
var _sources = {};
var _hallTypes = {};
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('showtime');

  //set search form
  setDimen();
  setSource();
  setChannel();

  $('#search_beginShowDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endShowDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endShowDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginShowDate').datetimepicker('setEndDate', FromEndDate);
  });

});

//handle search form
$('#formSearch').on('submit', function (e) {
  e.preventDefault();

  if (!+$.trim($('#search_filmId').val()) && !+$.trim($('#search_cinemaId').val())) {
    alert('[影片ID] 和 [影院ID] 必填且必须为数字！');
    return false;
  }

  var sendData = {
    filmId: $.trim($('#search_filmId').val()),
    cinemaId: $.trim($('#search_cinemaId').val()),
    channelId: $('#search_channelId').val(),
    dimenId: $('#search_dimenId').val(),
    tpId: $('#search_tpId').val(),
    beginShowDate: $('#search_beginShowDate').val(),
    endShowDate: $('#search_endShowDate').val(),
    pageSize: _pageSize,
  };
  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'timeTable/timeTableList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="11" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          item.salePrice = (+item.settlePrice) + (+item.serviceFee);
          _(_hallTypes).forEach(function (value, key) {
            if (value.id == item.dimen) {
              item.dimenName = value.name;
            }
          });
        });

        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#pager').on('click', '.prev,.next', function (e) {
  e.preventDefault();
  if ($(this).hasClass('prev')) {
    if (_pageIndex <= 1) {
      _pageIndex = 1;
      alert('已经是第一页！');
      return false;
    }

    _pageIndex--;
  } else {
    if (_pageIndex >= _pageTotal) {
      _pageIndex = _pageTotal;
      alert('已经是最后一页！');
      return false;
    }

    _pageIndex++;
  }

  $('#formSearch').trigger('submit');
  return false;
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#pageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

function setDimen() {
  $.ajax({
    url: common.API_HOST + 'common/hallTypeList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    // console.log(res);
    if (!!~~res.meta.result) {
      _hallTypes = res.data;
      _(_hallTypes).forEach(function (item) {
        $('#search_dimenId').append($('<option></option>').attr('value', item.name).text(item.name));
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    // console.log(res.data);
    if (!!~~res.meta.result) {
      _sources = res.data;
      _(_sources).forEach(function (source) {
        $('#search_tpId').append($('<option></option>').attr('value', source.sourceId).text(source.sourceName));
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
    if (!!~~res.meta.result) {
      _channels = res.data;
      var html = '';
      $.each(_channels, function (index, item) {
        html += '<option value="' + item.channelId + '">' + item.channelName + '</option>';
      });

      $('#search_channelId').append(html);
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
