var common = require('common');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('report');
  setChannel();
  setSource();
  setCity();
  // setBrand();
  setCinema();

  $('#search_beginDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(startDate));
    $('#search_endDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var endDate = new Date(ev.date.valueOf());
    endDate.setDate(endDate.getDate(endDate));
    $('#search_beginDate').datetimepicker('setEndDate', endDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginDate').val(beginDate).datetimepicker('setEndDate', endDate);
  $('#search_endDate').val(endDate).datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    beginDate: $('#search_beginDate').val(),
    endDate: $('#search_endDate').val(),
    channelId: $('#search_channelId').val(),
    partnerId: $('#search_partnerId').val(),
    cityId: $('#search_cityId').val(),
    storeId: $('#search_storeId').val(),
    productName: $.trim($('#search_productName').val()),
    activityId: $.trim($('#search_activityId').val()),
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
    url: common.API_HOST + 'report/reportList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    console.log(res);
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data == null || res.data.retList == null || res.data.retList.length < 1) {
        var html = '<tr><td colspan="15" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageNo;
        _pageTotal = Math.ceil(res.data.totalNum / _pageSize);
        setPager(res.data.totalNum, _pageIndex, res.data.retList.length, _pageTotal);
        _(res.data.retList).forEach(function (item) {
          _(_channels).forEach(function (channel) {
            if (item.channelId == channel.channelId) {
              item.channelName = channel.channelName;
            }
          });
        });

        setTableData(res.data);
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

function setTableData(data) {
  var data = { rows: data.retList, totalAmountAll: data.totalAmountAll };
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
      _(_channels).forEach(function (channel) {
        html += '<option value="' + channel.channelId + '">' + channel.channelName + '</option>';
      });

      $('#search_channelId').append(html);
    } else {
      alert('获取渠道列表失败：' + res.meta.msg);
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
    if (!!~~res.meta.result) {
      var html = '';
      _(res.data).forEach(function (source) {
        html += '<option value="' + source.sourceId + '">' + source.sourceName + '</option>';
      });

      $('#search_partnerId').append(html);
    } else {
      alert('获取渠道列表失败：' + res.meta.msg);
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
    if (!!~~res.meta.result) {
      var _cities = [];
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
      $('#search_cityId').chosen();
    }
  });
}

// function setBrand() {
//   $.ajax({
//     url: common.API_HOST + 'common/brandList',
//     type: 'GET',
//     dataType: 'json',
//   })
//   .done(function (res) {
//     if (!!~~res.meta.result) {
//       var html = '';
//       _(res.data).forEach(function (brand) {
//         html += '<option value="' + brand.id + '">' + brand.name + '</option>';
//       });

//       $('#search_brandId').append(html);
//     } else {
//       alert('接口错误：' + res.meta.msg);
//     }
//   });
// }

function setCinema() {
  $.ajax({
    url: common.API_HOST + 'common/cinemaList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var html = '';
      _(res.data).forEach(function (cinema) {
        html += '<option value="' + cinema.cinemaId + '">' + cinema.cinemaName + '</option>';
      });

      $('#search_storeId').append(html).chosen();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
