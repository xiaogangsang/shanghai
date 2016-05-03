var common = require('common');
var _brands = {};
var _cities = [];
var _provinces = {};
var _areas = [];
var _services = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;

$(function() {
  common.setMenu('cinema');
  //set search form
  setBrand();
  setCity();
  //data cache
  getProvince();
  getService();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    brandId: $.trim( $('#search_brandId').val() ),
    cityId: $.trim( $('#search_cityId').val() ),
    cinemaName: $('#search_cinemaName').val(),
    onlineStatus: $('#search_onlineStatus').val(),
    associationStatus: $('#search_associationStatus').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    _querying = false;
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length <= 0 ) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">请点击“查询”按钮！</td></tr>');
        alert('暂无数据！');
        return false;
      }
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total/_pageSize);
      setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
      _(res.data.rows).forEach(function(item){
        item.onlineStatusName = item.onlineStatus == 1 ? '已上线' : '已下线';
        item.associationStatusName = item.associationStatus == 1 ? '已关联' : '未关联';
      });
      setTableData(res.data.rows);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#pager').on('click', '.prev,.next', function(e) {
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
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  $("#formSearch").trigger('submit');
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
  return false;
});
$(document).on('click', '.multi-check-all', function() {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});
$('#dataTable').on('click', '.btn-status', function(e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  var btn = $(this);
  var sendData = {
    ids: [tr.data('id')],
    onlineStatus: btn.data('onlinestatus') == 1 ? 0 : 1
  };
  // console.log(sendData);
  var statusName = sendData.onlineStatus ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'cinema/standard/updateStatus',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData)
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      btn.data('onlineStatus',sendData.onlineStatus).html(sendData.onlineStatus ? '下线' : '上线');
      tr.find('td:nth-child(6)').html('已'+statusName);
      $('#formSearch').trigger('submit');
      alert(statusName+'操作成功!');
    } else {
      alert("接口错误："+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: { cinemaId: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      var data = res.data;
      data.service = undefined != data.service || '' != data.service ? data.service = JSON.parse(data.service) : [];
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-cinema-detail .modal-body').html(html);
      $('#popup-cinema-detail').modal('show');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: { cinemaId: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      setModal(res.data);
      $('#popup-cinema-form').modal('show');
      $('#popup-cinema-form form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  setModal(false);
  $('#popup-cinema-form').modal('show');
  $('#popup-cinema-form form').parsley();
});
$(document).on('click', '#btn-online-multi,#btn-offline-multi', function(e) {
  e.preventDefault();
  if($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }
  var onlineStatusName = $(this).attr('id')=='btn-online-multi' ? '上线' : '下线';
  if (window.confirm('确定要'+onlineStatusName+'选中的影院吗？')) {
    var onlineStatus = $(this).attr('id')=='btn-online-multi' ? 1 : 0;
    var ids = [];
    var checked_items = $('.multi-check:checked');
    checked_items.each(function() {
      ids.push( $(this).closest('tr').data('id') );
    });
    var sendData = {
      ids:ids,
      onlineStatus: onlineStatus
    };
    // console.log(JSON.stringify(sendData));
    $.ajax({
      url: common.API_HOST + 'cinema/standard/updateStatus',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(sendData)
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        checked_items.each(function(index, el) {
          $(this).closest('tr').find('td:nth-child(6)').html('已'+onlineStatusName);
          var buttonText = onlineStatus == 1 ? '下线' : '上线';
          $(this).closest('tr').find('.btn-status').data('onlineStatus',onlineStatus).html();
        });
        onlineStatus == 1 ? alert('批量上线成功') : alert('批量下线成功');
        $('#formSearch').trigger('submit');
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
  return false;
});
$(document).on('submit', '#popup-cinema-form form', function(e) {
  e.preventDefault();
  var sendData = {
    cinemaName: $.trim( $('#popup-cinema-form #cinemaName').val() ),
    brandId: $('#popup-cinema-form #brandId').val(),
    provinceId: $('#popup-cinema-form #provinceId').val(),
    cityId: $('#popup-cinema-form #cityId').val(),
    areaId: $('#popup-cinema-form #areaId').val(),
    districtId: $('#popup-cinema-form #districtId').val(),
    address: $.trim( $('#popup-cinema-form #address').val() ),
    tel: $.trim( $('#popup-cinema-form #tel').val() ),
    longitude: $.trim( $('#popup-cinema-form #longitude').val() ),
    latitude: $.trim( $('#popup-cinema-form #latitude').val() )
  };
  var id_arr = [];
  var des_arr = [];
  $('#popup-cinema-form .service-item').each(function(index, el) {
    var id = parseInt( $(this).data('id') );
    var des = $.trim( $(this).find('textarea').val() );
    if (NaN != id && '' != des ) {
      id_arr.push(id);
      des_arr.push(des);
    }
  });
  sendData.serviceId = id_arr.join('|');
  sendData.serviceDescription = des_arr.join('|');
  var ajaxUrl = common.API_HOST + 'cinema/standard/cinemaSave';
  if( $('#cinemaId').length > 0) {
    sendData.cinemaId = $('#popup-cinema-form #cinemaId').val();
    ajaxUrl = common.API_HOST + 'cinema/standard/cinemaUpdate';
  }
  // console.log( sendData );
  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if( $('#cinemaId').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }
      $('#popup-cinema-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setModal(cinemaData) {
  var data, template, cities, districts;
  if (cinemaData) {
    _(_brands).forEach(function(value, key){
      _brands[key].selected = cinemaData.brandId==value.id ? true : false;
    });
    _(_provinces).forEach(function(value, key){
      if (cinemaData.provinceId==value.provinceId) {
        _provinces[key].selected = true;
        cities = _provinces[key].cityList;
      } else {
        _provinces[key].selected = false;
      }
    });
    var availableServices = JSON.parse(cinemaData.service);
    _(_services).forEach(function(value, key){
      var availableService = _.find(availableServices, { 'serviceTypeId': value.id });
      if (availableService && availableService.serviceContent != undefined) {
        _services[key].selected = true;
        _services[key].content = availableService.serviceContent;
      } else {
        _services[key].selected = false;
      }
    });

    data = {cinema:cinemaData, brands: _brands, provinces:_provinces, cities: cities, services: _services};
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    setArea(cinemaData.cityId, cinemaData.areaId, cinemaData.districtId);
    $('#popup-cinema-form .modal-title').html('编辑标准影院');
  } else {
    data = {brands: _brands, provinces:_provinces, services: _services};
    template = $('#create-template').html();
    $('#popup-cinema-form .modal-title').html('新增标准影院');
    Mustache.parse(template);
    var html = Mustache.render(template, data);
  }
  $('#popup-cinema-form .modal-body').html(html);

  $('#popup-cinema-form').on('change', '#provinceId', function(e) {
    var provinceId = parseInt( $(this).val() );
    if ( NaN != provinceId || undefined != provinceId  || '' != provinceId ) {
      var province = _.find(_provinces, { 'provinceId': provinceId.toString() });
      var cityList = province.cityList;
      var options = '<option value=""></option>';
      _(cityList).forEach(function(value, key){
        options += '<option value="'+value.cityId+'">'+value.cityName+'</option>';
      });
      $('#cityId').html(options);
      $('#areaId,#districtId').html('<option value=""></option>');
    }
    return false;
  });
  $('#popup-cinema-form').on('change', '#cityId', function(e) {
    var cityId = parseInt( $(this).val() );
    if ( NaN != cityId || undefined != cityId  || '' != cityId ) {
      $.ajax({
        url: common.API_HOST + 'common/areaList',
        type: 'POST',
        dataType: 'json',
        data: {cityId: cityId}
      })
      .done(function(res) {
        if (true == res.meta.result) {
          _areas = res.data;
          var options = '<option value=""></option>';
          _(_areas).forEach(function(value, key){
           options += '<option value="'+value.areaId+'">'+value.areaName+'</option>';
         });
          $('#areaId').html(options);
          $('#districtId').html('<option value=""></option>');
        } else {
          alert('接口错误：'+res.meta.msg);
        }
      });
    }
    return false;
  });
  $('#popup-cinema-form').on('change', '#areaId', function(e) {
    var areaId = parseInt( $(this).val() );
    if ( NaN != areaId || undefined != areaId  || '' != areaId ) {
      var area = _.find(_areas, { 'areaId': areaId });
      var districtInfoList = area.districtInfoList;
      var options = '<option value=""></option>';
      _(districtInfoList).forEach(function(value, key){
        options += '<option value="'+value.districtId+'">'+value.districtName+'</option>';
      });
      $('#districtId').html(options);
    }
    return false;
  });
  $('#popup-cinema-form').on('change', '#btn-service', function(e) {
    var serviceId = parseInt( $(this).val() );
    if ( NaN == serviceId || undefined == serviceId  || '' == serviceId ) {
      return false;
    }
    var service = _.find(_services, {'id': serviceId});
    data = {service: service};
    template = $('#service-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $(this).before(html);
    $('#btn-service option').each(function() {
      if ( serviceId == $(this).val() ) {
        $(this).remove();
      }
    });
    $('#popup-cinema-form').scrollTop($('#popup-cinema-form').height());
  });
  $('#popup-cinema-form').on('click', '.btn-service-delete', function(e) {
    e.preventDefault();
    var $parent = $(this).closest('.service-item');
    if ($parent.find('textarea').val() !== '' && false == window.confirm('确定要删除此服务吗？')) {
      return false;
    }
    var serviceId = $parent.data('id');
    var service = _.find(_services, {'id': serviceId});
    $('#btn-service').append($('<option></option>').attr('value', service.id).text(service.name));
    $parent.remove();
    return false;
  });
}
function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      _brands = res.data;
      _(_brands).forEach(function(brand){
        $('#search_brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
      $("#search_brandId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function getProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _provinces = res.data;
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function getService() {
  $.ajax({
    url: common.API_HOST + 'cinema/serviceList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _services = res.data;
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data).forEach(function(group){
        _(group).forEach(function(city){
          _cities.push( city );
        });
      });
      $.each(_cities, function(index, item) {
        $('#search_cityId').append($('<option></option>').attr('value', item.cityId).text(item.cityName));
      });
      $("#search_cityId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setArea( cityId, areaId, districtId ) {
  $.ajax({
    url: common.API_HOST + 'common/areaList',
    type: 'POST',
    dataType: 'json',
    data: {cityId: cityId}
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _areas = res.data;
      _(_areas).forEach(function(area, key){
        if (areaId==area.areaId) {
          $('#areaId').append($('<option></option>').attr('value', area.areaId).text(area.areaName)).prop('selected',true);
        } else {
          $('#areaId').append($('<option></option>').attr('value', area.areaId).text(area.areaName));
        }
      });
      if (districtId) {
        setDistricts( areaId, districtId );
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setDistricts( areaId, districtId ) {
  var area = _.find(_areas, { 'areaId': areaId });
  var districts = area.districtInfoList;
  _(districts).forEach(function(district, key){
    if (districtId==district.districtId) {
      $('#districtId').append($('<option></option>').attr('value', district.districtId).text(district.districtName)).prop('selected',true);
    } else {
      $('#districtId').append($('<option></option>').attr('value', district.districtId).text(district.districtName));
    }
  });
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}