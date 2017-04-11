'use strict;'

var common = require('common');
var util = require('util');
var _channels = {};
var _cities = [];
var _choosed = [];
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

  var ajaxUrl = common.API_HOST + 'console/hotWord/list';

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    // var res = JSON.parse('{    "meta": {        "msg": "成功",        "result": "1"     },    "data": {        "pageIndex": 1,        "pageSize": 10,        "rows": [            {                "channel": "2",                "city": [                    "string1",                    "string2",                    "string3",                    "string4",                    "string5"                 ],                "endTime": "2017-09-11",                "id": "11",                "link": "http://www.baidu.com",                "order": 2,                "searchCount": 123,                "searchTerm": "美女",                "startTime": "2015-10-09",                "type": "2"             }         ],        "total": 23     } }');
    if (!!~~res.meta.result) {
      var data = res.data.rows;
      if (!data || data.length < 1) {
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
  console.log("点击新增");
  _choosed = [];
  popupEditWithData({term: {}});

});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  var id = $(this).closest('tr').data('id');
  var term;
  _(_dataCache).forEach(function (item) {
    if (item.id == id) {
      term = item;
    }
  });

  var data = {term: term};
  _choosed = (term.city ? term.city.split(',') : []);
  popupEditWithData(data);
});

function popupEditWithData(data) {
  var template = $('#edit-template').html();
  html = util.render(template, data);
  $('#popup-banner-form .modal-body').html(html);
  $('#popup-banner-form').modal('show');

  $('#startTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#endTime').datetimepicker('setStartDate', startDate);
  });

  $('#endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#startTime').datetimepicker('setEndDate', FromEndDate);
  });
  $('#popup-banner-form form').parsley();
  $('input[name=areaType]').trigger('change');
}

function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var cities = [];
      _(res.data).forEach(function (group) {
        _(group).forEach(function (city) {
          cities.push(city);
        });
      });

      var html = '';
      $.each(cities, function (index, item) {
        html += '<option value="' + item.cityId + '">' + item.cityName + '</option>';
      });
      
      _(res.data).forEach(function (group, key) {
        _cities.push({ key: key, group: group });
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
  var html = util.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

$(document).on('submit', '#popup-banner-form form', function (event) {
  event.preventDefault();

  if ($('input[name=areaType]:checked').val() == 2 && _choosed.length ==0) {
    alert('请选择区域下的城市!');
    return;
  }

  if (_submitting) {
    return false;
  }

  _submitting = true;
  var id = $('#id').val();
  id = id ? id : undefined;

  var sendData = {
    id: id, 
    searchTerm: $('#searchTerm').val().trim(),
    type: $('input[name=type]:checked').val(),
    link: $('#link').val().trim(),
    orderNo: $('#orderNo').val(),
    city: ($('input[name=areaType]:checked').val() == 2 ? _choosed : ['9999'] ),
    channel: $('input[name=channel]:checked').val(),
    startTime: $('#popup-banner-form #startTime').val().trim(),
    endTime: $('#popup-banner-form #endTime').val().trim(),
  };

  var ajaxUrl = id ? 'console/hotWord/update': 'console/hotWord/add';

  var ajaxContentType = 'application/x-www-form-urlencoded; charset=UTF-8';

  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: ajaxContentType,
    data: sendData,
    traditional: true
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if (id) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-banner-form').modal('hide');
      $('#formSearch').trigger('submit');
      _choosed = [];
      _(_cities).forEach(function (city) {
        city.selected = false;
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('change', 'input[name=areaType]', function (e) {
  e.preventDefault();
  if ($('input[name=areaType]:checked').val() != 1) {
    $('#btn-city').closest('tr').show();
  } else {
    $('#btn-city').closest('tr').hide();
  }
});

//$(document).on('change', 'input[name=type]', function (e) {
//  e.preventDefault();
//  if ($('input[name=type]:checked').val() == 1) {
//    $('.hide-if-not-popular').hide();
//  } else {
//    $('.hide-if-not-popular').show();
//  }
//});

$(document).on('click', '#popup-banner-form #btn-city', function (event) {
  event.preventDefault();
  var htmlChoosed = '';
  var htmlTab = '';
  var htmlPane = '';
  var tabCount = 1;
  var htmlGroup;
  var index = 1;
  var total = _cities.length;
  _(_cities).forEach(function (group) {
    if (index % 5 == 1) {
      htmlTab += '<li>'
      + '<a href="#section-' + index + '" aria-controls="section-' + index
      + '" role="tab" data-toggle="tab">';
      htmlPane += '<div role="tabpanel" class="tab-pane" id="section-' + index + '">';
    }

    htmlTab += group.key + ' ';
    htmlGroup = '<div class="input-group"><div class="input-group-addon">' + group.key + '</div>';
    _(group.group).forEach(function (city, key) {
      if (_choosed.indexOf(city.cityId) > -1) {
        htmlGroup += '<label>';
        htmlGroup += '<input type="checkbox" value="' + city.cityId + '" checked>';
        htmlGroup += '<span>' + city.cityName + '</span>';
        htmlGroup += '</label>';
        htmlChoosed += '<span class="label label-default" data-id="' + city.cityId + '">';
        htmlChoosed += city.cityName;
        htmlChoosed += ' <button type="button" class="close"><span>&times;</span></button>';
        htmlChoosed += '</span>';
      } else {
        htmlGroup += '<label>';
        htmlGroup += '<input type="checkbox" value="' + city.cityId + '">';
        htmlGroup += '<span>' + city.cityName + '</span>';
        htmlGroup += '</label>';
      }
    });

    htmlGroup += '</div>';
    htmlPane += htmlGroup;

    if (index % 5 == 0 || index == total) {
      htmlTab += '</a></li>';
      htmlPane += '</div>';
      tabCount++;
    }

    index++;
  });

  var data = { choosed: htmlChoosed, tab: htmlTab, pane: htmlPane };
  var template = $('#city-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-city .modal-body').html(html);
  $('#popup-city .nav-tabs li:first-child a').trigger('click');
  $('#popup-city').modal('show');

  $('.candidate-city').on('change', 'input[type=checkbox]', function (event) {
    event.preventDefault();
    var cityId = $(this).val();
    var cityName = $(this).next('span').text();
    if ($(this).prop('checked')) {
      $('.choosed-city').append('<span class="label label-default" data-id="' + cityId + '">' + cityName + ' <button type="button" class="close"><span>&times;</span></button></span>');
    } else {
      $('.choosed-city .label').each(function () {
        if ($(this).data('id') == cityId) {
          $(this).remove();
        }
      });
    }
  });

  $('#popup-city').on('change click', '#chooseAll', function (event) {
    event.preventDefault();
    $('.choosed-city .label').remove();
    if (!!$(this).prop('checked')) {
      var choosed = '';
      $('.candidate-city input[type=checkbox]').each(function () {
        var cityId = $(this).val();
        var cityName = $(this).next('span').text();
        choosed += '<span class="label label-default" data-id="' + cityId + '">' + cityName + ' <button type="button" class="close"><span>&times;</span></button></span>';
      });

      $('.candidate-city input[type=checkbox]').prop('checked', true);
      $('.choosed-city').append(choosed);
    } else {
      $('.candidate-city input[type=checkbox]').prop('checked', false);
    }
  });
});

$(document).on('click', '#popup-city .choosed-city>.label>.close', function (event) {
  event.preventDefault();
  var $label = $(this).closest('.label');
  var cityId = $label.data('id');

  // if (_cityAuthority.indexOf('' + cityId) > -1) {
  $('.candidate-city input:checked').each(function (index, el) {
    if ($(el).val() == cityId) {
      $(el).prop('checked', false);
    }
  });

  $label.remove();

  // } else {
  //   alert('没有权限！');
  // }
});

$(document).on('submit', '#popup-city form', function (event) {
  event.preventDefault();
  var choosedCity = [];
  $('.choosed-city .label').each(function () {
    choosedCity.push($(this).data('id'));
  });

  _choosed = choosedCity;
  $('#popup-city').modal('hide');
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

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (~~$('#pageNo').val() == 0) {
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

