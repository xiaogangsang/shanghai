'use strict;'

var common = require('common');
var _brands = {};
var _sources = {};
var _cities = [];
var _provinces = {};
var _areas = [];
var _services = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _searchCache = {};
var _useCache = false;
var _submitting = false;
var _bindMerchantIds = [];
var _accountStatus = ['', '正常', '停用'];
var _merchantStatus = ['', '草稿', '已上线', '已下线', '审核驳回', '待审核', '已删除'];
var _mechantLevel = ['', '总部', '区域'];

$(function () {
  common.init('cinema');

  //set search form
  setBrand();
  setSource();
  setCity();

  //data cache
  getProvince();
  getService();

  $('#formSearch').trigger('submit');
});

$(document).on('change click', '#popup-cinema-form #provinceId', function (e) {
  var provinceId = parseInt($(this).val());
  if (~~provinceId != 0) {
    var province = _.find(_provinces, { provinceId: provinceId.toString() });
    var cityList = province.cityList;
    var options = '';
    _(cityList).forEach(function (value, key) {
      options += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
    });

    $('#cityId').html(options).chosen();
    $('#areaId,#districtId').html('<option value=""></option>');
  }

  return false;
});

$(document).on('change click', '#popup-cinema-form #cityId', function (e) {
  var cityId = parseInt($(this).val());
  if (~~cityId != 0) {
    $.ajax({
      url: common.API_HOST + 'common/areaList',
      type: 'POST',
      dataType: 'json',
      data: { cityId: cityId },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        _areas = res.data;
        var options = '<option value=""></option>';
        _(_areas).forEach(function (value, key) {
          options += '<option value="' + value.areaId + '">' + value.areaName + '</option>';
        });

        $('#areaId').html(options);
        $('#districtId').html('<option value=""></option>');
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('change click', '#popup-cinema-form #areaId', function (e) {
  var areaId = parseInt($(this).val());
  if (~~areaId != 0) {
    var area = _.find(_areas, { areaId: areaId });
    var districtInfoList = area.districtInfoList;
    var options = '<option value=""></option>';
    _(districtInfoList).forEach(function (value, key) {
      options += '<option value="' + value.districtId + '">' + value.districtName + '</option>';
    });

    $('#districtId').html(options);
  }

  return false;
});

$(document).on('change click', '#popup-cinema-form #btn-service', function (e) {
  var serviceId = parseInt($(this).val());
  if (~~serviceId == 0) {
    return false;
  }

  var service = _.find(_services, { id: serviceId });
  data = { service: service };
  template = $('#service-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $(this).before(html);
  $('#btn-service option').each(function () {
    if (serviceId == $(this).val()) {
      $(this).remove();
    }
  });

  $('#popup-cinema-form').scrollTop($('#popup-cinema-form').height());
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
    brandId: $.trim($('#search_brandId').val()),
    cityId: $.trim($('#search_cityId').val()),
    cinemaName: $('#search_cinemaName').val(),
    onlineStatus: $('#search_onlineStatus').val(),
    associationStatus: $('#search_associationStatus').val(),
    seatTicketFlag: $('#search_seatTicketFlag').val(),
    pageSize: _pageSize,
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

  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length <= 0) {
        $('#dataTable tbody').html('<tr><td colspan="10" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        _useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          item.onlineStatusName = item.onlineStatus == 1 ? '已上线' : '已下线';
          item.associationStatusName = item.associationStatus == 1 ? '已关联' : '未关联';
          item.seatTicketFlag = (item.seatTicketFlag == '0' ? false : true);
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
  $('#formSearch').trigger('submit');
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ($('#pageNo').val() == '') {
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

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var $tr = $(this).closest('tr');
  var $btn = $(this);
  var sendData = {
    ids: [$tr.data('id')],
    onlineStatus: $btn.data('onlinestatus') == 1 ? 0 : 1,
  };

  var statusName = sendData.onlineStatus ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'cinema/standard/updateStatus',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $btn.data('onlineStatus', sendData.onlineStatus).html(sendData.onlineStatus ? '下线' : '上线');
      $tr.find('td:nth-child(6)').html('已' + statusName);
      $('#formSearch').trigger('submit');
      alert(statusName + '操作成功!');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-flag', function (e) {
  e.preventDefault();
  var $tr = $(this).closest('tr');
  var $btn = $(this);

  batchSuspend([$tr.data('id')], 1 - $btn.data('seatticketflag'));
});

$('#dataTable').on('click', '.btn-detail', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: { cinemaId: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var data = res.data;
      data.service = data.service != undefined && data.service != '' ? data.service = JSON.parse(data.service) : [];
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-cinema-detail .modal-body').html(html);
      $('#popup-cinema-detail').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: { cinemaId: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      setModal(res.data);
      $('#popup-cinema-form').modal('show');
      $('#cityId').chosen();
      $('#popup-cinema-form form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var $btn = $(this);
  var $tr = $(this).closest('tr');
  $btn.prop('disabled', true);
  var cinemaName = $tr.find('td:nth-child(3)').text();
  var cinemaId = $tr.data('id');
  if (window.confirm('确定要删除标准影院【' + cinemaName + '】吗？')) {
    $.ajax({
      url: common.API_HOST + 'cinema/standard/delete',
      type: 'POST',
      dataType: 'json',
      data: { cinemaId: cinemaId },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        $tr.animate({opacity: 0.25}, 600, function() {
          $tr.remove();
        });
      } else {
        alert('接口错误：' + res.meta.msg);
        $btn.prop('disabled', false);
      }
    });
  }

  $btn.prop('disabled', false);
  return false;
});

$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  setModal(false);
  $('#popup-cinema-form').modal('show');
  $('#popup-cinema-form form').parsley();
});

$(document).on('click', '#btn-online-multi,#btn-offline-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  var onlineStatusName = $(this).attr('id') == 'btn-online-multi' ? '上线' : '下线';
  if (window.confirm('确定要' + onlineStatusName + '选中的影院吗？')) {
    var onlineStatus = $(this).attr('id') == 'btn-online-multi' ? 1 : 0;
    var ids = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function () {
      ids.push($(this).closest('tr').data('id'));
    });

    var sendData = {
      ids: ids,
      onlineStatus: onlineStatus,
    };

    $.ajax({
      url: common.API_HOST + 'cinema/standard/updateStatus',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(sendData),
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        $checkedItems.each(function (index, el) {
          $(this).closest('tr').find('td:nth-child(6)').html('已' + onlineStatusName);
          var buttonText = onlineStatus == 1 ? '下线' : '上线';
          $(this).closest('tr').find('.btn-status').data('onlineStatus', onlineStatus).html();
        });

        onlineStatus == 1 ? alert('批量上线成功') : alert('批量下线成功');
        $('#formSearch').trigger('submit');
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});


$(document).on('click', '.btn-suspend-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  var statusName = $(this).data('value') == 1 ? '解除停售' : '停售';

  if (window.confirm('确定要' + statusName + '选中的影院吗？')) {

    var ids = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function () {
      ids.push($(this).closest('tr').data('id'));
    });

    batchSuspend(ids, $(this).data('value'));
  }

  return false;
});

function batchSuspend(ids, value) {
  $.ajax({
    url: common.API_HOST + 'cinema/standard/updateSeatTicketFlag',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({ids: ids, seatTicketFlag: value}),
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert('操作成功!');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$(document).on('submit', '#popup-cinema-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    cinemaName: $('#popup-cinema-form #cinemaName').val().trim(),
    brandId: $('#popup-cinema-form #brandId').val(),
    provinceId: $('#popup-cinema-form #provinceId').val(),
    cityId: $('#popup-cinema-form #cityId').val(),
    areaId: $('#popup-cinema-form #areaId').val(),
    districtId: $('#popup-cinema-form #districtId').val(),
    address: $('#popup-cinema-form #address').val().trim(),
    tel: $('#popup-cinema-form #tel').val().trim(),
    longitude: $('#popup-cinema-form #longitude').val().trim(),
    latitude: $('#popup-cinema-form #latitude').val().trim(),
    score: $('#popup-cinema-form #cinemaScore').val().trim(),
  };
  var idArr = [];
  var desArr = [];
  $('#popup-cinema-form .service-item').each(function (index, el) {
    var id = parseInt($(this).data('id'));
    var des = $.trim($(this).find('textarea').val());
    if (~~id != 0 && des != '') {
      idArr.push(id);
      desArr.push(des);
    }
  });

  sendData.serviceId = idArr.join('|');
  sendData.serviceDescription = desArr.join('|');
  var ajaxUrl = common.API_HOST + 'cinema/standard/cinemaSave';
  if ($('#cinemaId').length > 0) {
    sendData.cinemaId = $('#popup-cinema-form #cinemaId').val();
    ajaxUrl = common.API_HOST + 'cinema/standard/cinemaUpdate';
  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#cinemaId').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-cinema-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '.btn-merchant', function (event) {
  event.preventDefault();
  var cinemaId = ~~$(this).closest('tr').data('id');
  var cinemaName = $(this).closest('tr').find('td:nth-child(3)').text();
  $('#popup-cinema-bind-merchant h5').text(cinemaName);
  $('#popup-cinema-bind-merchant #bindStoreId').val(cinemaId);
  $('.merchant-list tbody').html('<tr><td colspan="6" align="center">点击查询！</td></tr>');
  $('#formSearchMerchat').trigger('reset');
  $('.merchant-list').hide();
  loadBindMerchant(cinemaId);
});

function loadBindMerchant(cinemaId) {
  _bindMerchantIds = [];
  $.ajax({
    url: common.API_HOST + 'merchant/listById',
    type: 'POST',
    dataType: 'json',
    data: { storeId: cinemaId },
  })
  .done(function (res) {
    if (res.meta.result == 1) {
      if (res.data != null && res.data.length > 0) {
        var rows = [];
        _(res.data).forEach(function (merchant, key) {
          var tp = _.find(_sources, { sourceId: merchant.tpId });
          merchant.tpId = tp != undefined ? tp.sourceName : '';
          merchant.merchantClass = _mechantLevel[merchant.merchantClass];
          merchant.merchantStatus = _merchantStatus[merchant.merchantStatus];
          merchant.accountStatus = _accountStatus[merchant.accountStatus];
          rows.push(merchant);
          _bindMerchantIds.push(merchant.id);
        });

        var data = { rows: rows };
        var template = $('#bind-template').html();
        Mustache.parse(template);
        var html = Mustache.render(template, data);
        $('#merchantTable tbody').html(html);
      } else {
        $('#merchantTable tbody').html('<tr><td colspan="7" align="center">暂无关联商户！</td></tr>');
      }

      $('#popup-cinema-bind-merchant').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

$(document).on('click', '#btn-listMerchant', function (event) {
  event.preventDefault();
  if ($(this).text().indexOf('添加商户') >= 0) {
    $('.merchant-list').slideDown();
    $(this).html('添加完毕 <span class="glyphicon glyphicon-chevron-up"></span>');
  } else {
    $('.merchant-list').slideUp();
    $(this).html('添加商户 <span class="glyphicon glyphicon-chevron-down"></span>');
  }
});

$(document).on('submit', '#formSearchMerchant', function (event) {
  event.preventDefault();
  $.ajax({
    url: common.API_HOST + 'merchant/list',
    type: 'POST',
    dataType: 'json',
    data: {
      pageSize: 999,
      pageIndex: 1,
      merchantId: $('#merchantId').val().trim(),
      merchantName: $('#merchantName').val().trim(),
      tpId: $('#tpId').val(),
      merchantType: $('#merchantType').val(),
    },
  })
  .done(function (res) {
    if (res.meta.result == 1) {
      if (res.data.row != null && res.data.row.length > 0) {
        var unbindMerchants = [];
        _(res.data.row).forEach(function (merchant, key) {
          var tp = _.find(_sources, { sourceId: merchant.tpId });
          merchant.tpId = tp != undefined ? tp.sourceName : '';
          merchant.merchantClass = _mechantLevel[merchant.merchantClass];
          merchant.merchantStatus = _merchantStatus[merchant.merchantStatus];
          merchant.canBind = _bindMerchantIds.indexOf(merchant.id) < 0 ? true : false;
          unbindMerchants.push(merchant);
        });

        var data = { rows: unbindMerchants };
        var template = $('#unbind-template').html();
        Mustache.parse(template);
        var html = Mustache.render(template, data);
        $('.merchant-list tbody').html(html);
      } else {
        $('.merchant-list tbody').html('<tr><td colspan="6" align="center">没有符合条件的商户！</td></tr>');
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '.btn-addMerchant', function (event) {
  event.preventDefault();
  var $tr = $(this).closest('tr');
  var id = $(this).closest('tr').data('id');
  var storeId = $('#bindStoreId').val();
  $.ajax({
    url: common.API_HOST + 'merchant/add',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id,
      storeId: storeId,
    },
  })
  .done(function (res) {
    if (res.meta.result == 1) {
      alert('关联商户成功！');
      loadBindMerchant(storeId);
      $tr.remove();
      if ($('#merchantList tbody tr').length < 1) {
        $('.merchant-list tbody').html('<tr><td colspan="6" align="center">没有符合条件的商户！</td></tr>');
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '.btn-delMerchant', function (event) {
  event.preventDefault();
  if (!window.confirm('确定要解除与该商户的关联吗？')) {
    return false;
  }

  var $tr = $(this).closest('tr');
  var id = $(this).closest('tr').data('id');
  var storeId = $('#bindStoreId').val();
  $.ajax({
    url: common.API_HOST + 'merchant/del',
    type: 'POST',
    dataType: 'json',
    data: {
      id: id,
      storeId: storeId,
    },
  })
  .done(function (res) {
    if (res.meta.result == 1) {
      alert('解除关联商户成功！');
      $tr.remove();
      delete _bindMerchantIds[_bindMerchantIds.indexOf(id)];
      loadBindMerchant(storeId);
      $('#formSearchMerchant').trigger('submit');
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

    _(cities).forEach(function (value) {
      if (cinemaData.cityId == value.cityId) {
        value.selected = true;
      } else {
        value.selected = false;
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

  $('#popup-cinema-form').off('click').on('click', '.btn-service-delete', function (e) {
    e.preventDefault();
    var $parent = $(this).closest('.service-item');
    if ($parent.find('textarea').val() !== '' && window.confirm('确定要删除此服务吗？') == false) {
      return false;
    }

    var serviceId = $parent.data('id');
    var service = _.find(_services, { id: serviceId });
    $('#btn-service').append($('<option></option>').attr('value', service.id).text(service.name));
    $parent.remove();

    return false;
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

function getProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _provinces = res.data;
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function getService() {
  $.ajax({
    url: common.API_HOST + 'common/cinema/standard/serviceList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _services = res.data;
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
    if (!!~~res.meta.result) {
      _sources = res.data;
      var html = '';
      _(_sources).forEach(function (source) {
        html += '<option value="' + source.sourceId + '">' + source.sourceName + '</option>';
      });

      $('#tpId').append(html);
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

function setArea(cityId, areaId, districtId) {
  $.ajax({
    url: common.API_HOST + 'common/areaList',
    type: 'POST',
    dataType: 'json',
    data: { cityId: cityId },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _areas = res.data;
      var html = '';
      _(_areas).forEach(function (area, key) {
        if (areaId == area.areaId) {
          html += '<option value="' + area.areaId + '" selected>' + area.areaName + '</option>';
        } else {
          html += '<option value="' + area.areaId + '">' + area.areaName + '</option>';
        }
      });

      $('#areaId').append(html);
      if (districtId) {
        setDistricts(areaId, districtId);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setDistricts(areaId, districtId) {
  var area = _.find(_areas, { areaId: areaId });
  var districts = area.districtInfoList;
  var htmlDistrict = '';
  _(districts).forEach(function (district, key) {
    if (districtId == district.districtId) {
      htmlDistrict += '<option value="' + district.districtId + '" selected>' +
      district.districtName +
      '</option>';
    } else {
      htmlDistrict += '<option value="' + district.districtId + '">' +
      district.districtName +
      '</option>';
    }
  });

  $('#districtId').append(htmlDistrict);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
