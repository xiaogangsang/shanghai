'use strict;'

var common = require('common');
var _sources = {};
var _brands = {};
var _cities = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;
var _bindCinemaName = '';
var _tpHallId = 0;
var _tpStoreId = 0;
var _screenType = ['', 'IMAX', 'DMAX', '巨幕', '普通'];
var _effectType = ['', '4D', '5D', '普通', '4DX', 'DA', 'ScreenX'];

$(function () {
  common.init('hall-tp');

  //set search form
  setSource();
  setBrand();
  setCity();

  $('#search_startTime,#search_endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  });
  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_startTime').datetimepicker('setEndDate', endDate);
  $('#search_endTime').datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);

  var urlParam = common.getUrlParam();
  if (urlParam.name && urlParam.cinemaName) {
    $('#search_relation').val(1).change();
    $('#search_hallName').val(urlParam.name);
    $('#search_cinemaName').val(urlParam.cinemaName);
  }
  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('change click', '#search_relation', function (e) {
  e.preventDefault();
  if ($(this).val() == 1) {
    $('#association').show();
  } else {
    $('#association').hide();
  }
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    relation: $('#search_relation').val(),
    pageSize: _pageSize,
  };

  if (!!~~$('#search_sourceId').val()) {
    sendData.sourceId = $('#search_sourceId').val();
  }

  if ($('#search_tpHallName').val().trim() != '') {
    sendData.tpHallName = $('#search_tpHallName').val().trim();
  }

  if ($('#search_cinemaName').val().trim() != '') {
    sendData.storeName = $('#search_cinemaName').val().trim();
  }

  if ($('#search_relation').val() == 1) {
    if ($('#search_hallName').val().trim() != '') {
      sendData.hallName = $('#search_hallName').val().trim();
    }

    if (!!~~$('#search_brandId').val()) {
      sendData.brandId = $('#search_brandId').val();
    }

    if (!!~~$('#search_cityId').val()) {
      sendData.cityId = $('#search_cityId').val();
    }

    if ($('#search_startTime').val().trim() != '') {
      sendData.startTime = $('#search_startTime').val().trim();
    }

    if ($('#search_endTime').val().trim() != '') {
      sendData.endTime = $('#search_endTime').val().trim();
    }
  }

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
    url: common.API_HOST + 'hall/tp/list',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.data.length <= 0) {
        var html = '<tr><td colspan="13" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.data.length, _pageTotal);
        _(res.data.data).forEach(function (tpHall) {
          tpHall.createTime = tpHall.createTime != undefined ? common.getDate(new Date(tpHall.createTime)) : '';
        });

        setTableData(res.data.data);
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

$('#dataTable').on('click', '.btn-create', function (e) {
  e.preventDefault();
  _tpHallId = $(this).closest('tr').data('id');
  _tpStoreId = $(this).closest('tr').data('tpstoreid');
  var hallName = $(this).closest('tr').children('td:nth-child(2)').text();
  var tpCinemaName = $(this).closest('tr').children('td:nth-child(6)').text().trim();

  $('#bindCinemaName').val(tpCinemaName);
  $('#popup-tphall-create #storeId').val('');
  $('#popup-tphall-create #hallName').val(hallName);
  $('#popup-tphall-create #sourceId').val($(this).closest('tr').data('sourceid'));

  $('#popup-tphall-create form').parsley();
  $('#popup-tphall-create').modal('show');
});

$(document).on('submit', '#popup-tphall-create form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;

  var sendData = {
    hallName: $.trim($('#popup-tphall-create #hallName').val()),
    storeId: $('#popup-tphall-create #storeId').data('id')
  };

  $.ajax({
    url: common.API_HOST + 'hall/standard/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      var sendData = {
        hallId: res.data.hallId,
        tpHallId: _tpHallId,
        tpStoreId: _tpStoreId,
        sourceId:$.trim($('#popup-tphall-create #sourceId').val()),
      };

      $.ajax({
        url: common.API_HOST + 'hall/tp/rel/saveOrUpdate',
        type: 'POST',
        dataType: 'json',
        data: sendData,
      })
      .done(function (res) {
        if (!!~~res.meta.result) {
          alert('新建并关联成功！');
          $('#formSearch').trigger('submit');
        } else {
          alert('新建成功，关联失败，错误：' + res.meta.msg);
        }
      });

      $('#popup-tphall-create').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('新建失败，错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '#storeId', function (event) {
  event.preventDefault();
  $('#cinemaTable tbody').html('<tr><td colspan="5" align="center">输入要关联的标准影院名，并按回车</td></tr>');
  if ($('#bindCinemaName').val().trim() != '') {
    $('#formSearchCinema').trigger('submit');
  }

  $('#popup-hall-bind').modal('show');
});

$(document).on('submit', '#formSearchCinema', function (e) {
  e.preventDefault();
  var bindCinemaName = $.trim($('#bindCinemaName').val());
  if (bindCinemaName == '' || bindCinemaName == undefined) {
    alert('搜索关键词不能为空！');
    return false;
  }

  _bindCinemaName = bindCinemaName;
  if (!!_querying) {
    return false;
  }

  _querying = true;

  $.ajax({
    url: common.API_HOST + 'common/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: { cinemaName: bindCinemaName },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.length <= 0) {
        var html = '<tr><td colspan="5" align="center">暂无匹配，请尝试搜索其他影院名</td></tr>';
        $('#popup-hall-bind tbody').html(html);
        return false;
      }

      var data = { rows: res.data };
      var template = $('#tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-hall-bind tbody').html(html);
      $('#popup-hall-bind').on('click', '#cinemaTable tbody tr', function (e) {
        e.preventDefault();
        $('#popup-hall-bind #bindSelect').prop('disabled', false);
        $('#cinemaTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#bindSelect', function (event) {
  event.preventDefault();
  var id = $('#cinemaTable tbody tr.selected').data('id');
  var cinemaName = $('#cinemaTable tbody tr.selected td:nth-child(2)').text();
  $('#storeId').data('id', id).val('【' + id + '】' + cinemaName);
  $('#popup-hall-bind').modal('hide');
});

$('#dataTable').on('click', '.btn-bind', function (e) {
  e.preventDefault();
  var tpHallId = $(this).closest('tr').data('id');
  var tpStoreId = $(this).closest('tr').data('tpstoreid');
  var sourceId = $(this).closest('tr').data('sourceid');
  $('#hallId').val('');
  $('#tpHallId').val(tpHallId);
  $('#tpStoreId').val(tpStoreId);
  $('#sourceId').val(sourceId);
  $('#hallTable tbody').html('');

  $.ajax({
    url: common.API_HOST + 'hall/tp/rel/getStandardHall',
    type: 'POST',
    dataType: 'json',
    data: {
      tpHallId: tpHallId,
      tpStoreId: tpStoreId,
      sourceId:sourceId,
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.data == undefined || res.data.data.length <= 0) {
        alert('无法关联，对应影院下查不到标准影厅，可能该影院没有关联到标准影院！');
        return false;
      }

      var data = { rows: res.data.data };
      var template = $('#tp-tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-tphall-bind tbody').html(html);
      $('#popup-tphall-bind').on('click', '#hallTable tbody tr', function (e) {
        e.preventDefault();
        $('#hallTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#hallId').val($(this).data('id'));
      });

      $('#popup-tphall-bind').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#formBindHall', function (e) {
  e.preventDefault();
  var sendData = {
    hallId: $('#hallId').val(),
    tpHallId: $('#tpHallId').val(),
    tpStoreId: $('#tpStoreId ').val(),
    sourceId:$('#sourceId').val(),
  };

  $.ajax({
    url: common.API_HOST + 'hall/tp/rel/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('关联成功！');
      $('#popup-tphall-bind').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _sources = res.data;
      var html = '';
      _(_sources).forEach(function (source) {
        html += '<option value="' + source.sourceId + '">' + source.sourceName + '</option>';
      });

      $('#search_sourceId').append(html);
      $('#search_sourceId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _brands = res.data;
      var html = '';
      _(_brands).forEach(function (brand) {
        html += '<option value="' + brand.id + '">' + brand.name + '</option>';
      });

      $('#search_brandId').append(html);
      $('#search_brandId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
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

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
