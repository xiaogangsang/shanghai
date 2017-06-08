'use strict;'

var common = require('common');
var util = require('util');

var _sources = {};
var _brands = {};
var _cities = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;

$(function () {
  common.init('cinema-tp');
  util.init($);

  //set search form
  setSource();
  setBrand();
  setCity();

  $('#search_beginDate,#search_endDate').datetimepicker({
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
  $('#search_beginDate').datetimepicker('setEndDate', endDate);
  $('#search_endDate').datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);


  var urlParam = common.getUrlParam();
  if (urlParam.name) {
    $('#search_cinemaName').val(urlParam.name);
    $('#search_associationStatus').val(1).change();
  }

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('change click', '#search_associationStatus', function (e) {
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
    associationStatus: $('#search_associationStatus').val(),
    sourceId: $('#search_sourceId').val(),
    thirdPartyCinemaName: $.trim($('#search_thirdPartyCinemaName').val()),
    isWanDa: $('#search_isWanDa').val(),
    pageSize: _pageSize,
  };
  if ($('#search_associationStatus').val() == 1) {
    sendData.cinemaName = $.trim($('#search_cinemaName').val());
    sendData.brandId = $('#search_brandId').val();
    sendData.cityId = $('#search_cityId').val();
    sendData.beginDate = $.trim($('#search_beginDate').val());
    sendData.endDate = $.trim($('#search_endDate').val());
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
    url: common.API_HOST + 'cinema/thirdParty/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length <= 0) {
        var html = '<tr><td colspan="10" align="center">查不到相关数据，请修改查询条件！</td></tr>';
        $('#dataTable tbody').html(html);
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (value, key) {
          var source = _.find(_sources, { sourceId: parseInt(value.thirdParty) });
          if (source) {
            res.data.rows[key].thirdPartyName = source.sourceName;
          }
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

$('#dataTable').on('click', '.btn-detail', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: {
      thirdPartyCinemaId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid'),
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var html = '<div class="cinema-detail clearfix">';
      _(res.data).forEach(function (value, key) {
        if (value != '' && value != undefined && value != null) {
          html += '<div class="detail-item"><span>' + key + '：</span>' + value + '</div>';
        }
      });

      html += '</div>';
      $('#popup-cinema-tp-detail .modal-body').html(html);
      $('#popup-cinema-tp-detail').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-bind', function (e) {
  e.preventDefault();
  var tpCinemaName = $(this).closest('tr').find('td:nth-child(2)').text();
  var tpCinemaId = $(this).closest('tr').data('id');
  var sourceId = $(this).closest('tr').data('sourceid');

  $('#filter_cinemaName').val(tpCinemaName);
  $('#bindTpCinema').text(tpCinemaName);
  $('#cinemaId').val();
  $('#thirdPartyCinemaId').val(tpCinemaId);
  $('#sourceId').val(sourceId);
  $('#popup-cinema-bind tbody').html('<tr><td colspan="5" align="center">点击搜索</td></tr>');
  $('#popup-cinema-bind').modal('show');
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

$(document).on('submit', '#formSearchCinema', function (e) {
  e.preventDefault();
  if (!!_querying) {
    return false;
  }

  _querying = true;
  $('#popup-cinema-bind tbody').html('<tr><td colspan="5" align="center">搜索中...</td></tr>');
  $.ajax({
    url: common.API_HOST + 'common/cinemas',
    type: 'POST',
    dataType: 'json',
    data: {
      cinemaName: $('#filter_cinemaName').val().trim(),
      brandId: $('#filter_brandId').val(),
      cityId: $('#filter_cityId').val(),
      tel: $('#filter_tel').val().trim(),
      longitude: $('#filter_longitude').val().trim(),
      latitude: $('#filter_latitude').val().trim(),
      address: $('#filter_address').val().trim(),
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.length <= 0) {
        $('#popup-cinema-bind tbody').html('<tr><td colspan="5" align="center">暂无匹配，请尝试修改搜索条件</td></tr>');
        return false;
      }

      var data = { rows: res.data.rows };
      var template = $('#tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-cinema-bind tbody').html(html);

      $('#popup-cinema-bind').on('click', '#cinemaTable tbody tr', function (e) {
        e.preventDefault();
        $('#cinemaTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#cinemaId').val($(this).data('id'));
      });

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#formBindCinema', function (e) {
  e.preventDefault();
  var sendData = {
    cinemaId: $('#cinemaId').val(),
    sourceId: $('#sourceId').val(),
    thirdPartyCinemaId: $('#thirdPartyCinemaId').val(),
    status: 1,
    associationStatus: 1,
  };

  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/updateAssociationStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert('绑定成功！');
      $('#popup-cinema-bind').modal('hide');
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

function setModal(cinemaData) {
  var data;
  var template;
  var cities;
  var districts;
  if (cinemaData) {
    _(_brands).forEach(function (value, key) {
      _brands[key].selected = cinemaData.brandId == value.id ? true : false;
    });

    _(_provinces).forEach(function (value, key) {
      if (cinemaData.provinceId == value.provinceId) {
        _provinces[key].selected = true;
        cities = _provinces[key].cityList;
      } else {
        _provinces[key].selected = false;
      }
    });

    var availableServices = JSON.parse(cinemaData.service);
    _(_services).forEach(function (value, key) {
      var availableService = _.find(availableServices, { serviceTypeId: value.id });
      if (availableService && availableService.serviceContent != undefined) {
        _services[key].selected = true;
        _services[key].content = availableService.serviceContent;
      } else {
        _services[key].selected = false;
      }
    });

    data = {
      cinema: cinemaData,
      brands: _brands,
      provinces: _provinces,
      cities: cities,
      services: _services,
    };
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    setArea(cinemaData.cityId, cinemaData.areaId, cinemaData.districtId);
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
      var html = '<option value="">全部</option>';
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

      $('#search_brandId, #filter_brandId').append(html);
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

      $('#search_cityId, #filter_cityId').append(html);
      $('#search_cityId, #filter_cityId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
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
