'use strict;'

var common = require('common');
var _sources = {};
var _brands = {};
var _cities = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _bindHallName = '';
var _querying = false;
var searchCache = {};
var useCache = false;

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

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('change', '#search_relation', function (e) {
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
    sourceId: $('#search_sourceId').val(),
    tpHallName: $.trim($('#search_tpHallName').val()),
    pageSize: _pageSize,
  };
  if ($('#search_relation').val() == 1) {
    sendData.hallName = $.trim($('#search_hallName').val());
    sendData.brandId = $('#search_brandId').val();
    sendData.cityId = $('#search_cityId').val();
    sendData.startTime = $.trim($('#search_startTime').val());
    sendData.endTime = $.trim($('#search_endTime').val());
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

$('#dataTable').on('click', '.btn-bind', function (e) {
  e.preventDefault();
  var tpHallName = $(this).closest('tr').find('td:nth-child(2)').text();
  var tpHallId = $(this).closest('tr').data('id');
  var tpStoreId = $(this).closest('tr').data('tpstoreid');
  $('#bindHallName').val(tpHallName);
  $('#hallId').val();
  $('#tpHallId').val(tpHallId);
  $('#tpStoreId').val(tpStoreId);
  $('#formSearchHall').trigger('submit');
  $('#popup-tphall-bind').modal('show');
});

$('#dataTable').on('click', '.btn-bind-create', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/createAndBind',
    type: 'POST',
    dataType: 'json',
    data: {
      tpCinemaId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid'),
      associationStatus: 1,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('新建标准影院，并关联成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#formSearchHall', function (e) {
  e.preventDefault();
  var bindHallName = $.trim($('#bindHallName').val());
  if (bindHallName == '' || bindHallName == undefined || _bindHallName == bindHallName) {
    if (bindHallName == '') {
      alert('搜索关键词不能为空！');
    }

    return false;
  }

  _bindHallName = bindHallName;
  if (!!_querying) {
    return false;
  }

  _querying = true;
  $.ajax({
    url: common.API_HOST + 'hall/standard/list',
    type: 'POST',
    dataType: 'json',
    data: {
      hallName: bindHallName,
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.data.length <= 0) {
        var html = '<tr><td colspan="8" align="center">暂无匹配，请尝试搜索其他影院名</td></tr>';
        $('#popup-tphall-bind tbody').html(html);
        return false;
      }

      var data = { rows: res.data.data };
      var template = $('#tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-tphall-bind tbody').html(html);
      $('#popup-tphall-bind').on('click', '#hallTable tbody tr', function (e) {
        e.preventDefault();
        $('#hallTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#hallId').val($(this).data('id'));
      });
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
  };

  $.ajax({
    url: common.API_HOST + 'hall/tp/rel/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('绑定成功！');
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

function setModal(hallData) {
  var data;
  var template;
  var cities;
  var districts;
  if (hallData) {
    _(_brands).forEach(function (value, key) {
      _brands[key].selected = hallData.brandId == value.id ? true : false;
    });


    data = {
      hall: hallData,
      brands: _brands,
      provinces: _provinces,
      cities: cities,
      services: _services,
    };
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    setArea(hallData.cityId, hallData.areaId, hallData.districtId);
    $('#popup-cinema-form .modal-title').html('编辑标准影院');
  } else {
    data = { brands: _brands, provinces: _provinces, services: _services };
    template = $('#create-template').html();
    $('#popup-cinema-form .modal-title').html('新增标准影院');
    Mustache.parse(template);
    var html = Mustache.render(template, data);
  }

  $('#popup-cinema-form .modal-body').html(html);
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
