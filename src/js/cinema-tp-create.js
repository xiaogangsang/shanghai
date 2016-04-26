var common = require('common');
var _brands = {};
var _provinces = {};
var _areas = [];
var _services = {};
var _tpCinemaId = 0;
var _sourceId = 0;

$(function() {
  common.setMenu('cinema-tp');
  setBrand();
  setProvince();
  getService();

  var urlParam = common.getUrlParam();
  if (urlParam.tpCinemaId == undefined || urlParam.tpCinemaId == '' || urlParam.sourceId == undefined || urlParam.sourceId == '') {
    alert('缺少参数！');
    location = 'cinema-tp.html';
  }

  _tpCinemaId = urlParam.tpCinemaId;
  _sourceId = urlParam.sourceId;

  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: {
      thirdPartyCinemaId: _tpCinemaId,
      sourceId: _sourceId
    }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      var html = '';
      _(res.data).forEach(function(value, key){
        if ('' != value && undefined != value && null != value) {
          switch (key) {
            case 'tpCinemaName':
            $('#cinemaName').val(value);
            break;
            case 'address':
            $('#address').val(value);
            break;
            case 'longitude':
            $('#longitude').val(value);
            break;
            case 'latitude':
            $('#latitude').val(value);
            break;
            case 'tel':
            $('#tel').val(value);
            break;
            default:
            break;
          }
          html += '<div class="detail-item"><span>'+key+'：</span>'+value+'</div>';
        }
      });
      $('.cinema-detail').html(html);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });

  $('#formCinema').parsley();
});

$(document).on('change', '#provinceId', function(e) {
  var provinceId = parseInt( $(this).val() );
  if ( NaN != provinceId || undefined != provinceId  || '' != provinceId ) {
    var province = _.find(_provinces, { 'provinceId': provinceId.toString() });
    var cityList = province.cityList;
    var options = '<option value="">选择城市</option>';
    _(cityList).forEach(function(value, key){
      options += '<option value="'+value.cityId+'">'+value.cityName+'</option>';
    });
    $('#cityId').html(options);
    $('#areaId,#districtId').html('<option value=""></option>');
  }
  return false;
});

$(document).on('change', '#cityId', function(e) {
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
        var options = '<option value="">选择行政区</option>';
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
$(document).on('change', '#areaId', function(e) {
  var areaId = parseInt( $(this).val() );
  if ( NaN != areaId || undefined != areaId  || '' != areaId ) {
    var area = _.find(_areas, { 'areaId': areaId });
    var districtInfoList = area.districtInfoList;
    var options = '<option value="">选择商圈</option>';
    _(districtInfoList).forEach(function(value, key){
      options += '<option value="'+value.districtId+'">'+value.districtName+'</option>';
    });
    $('#districtId').html(options);
  }
  return false;
});
$(document).on('change', '#btn-service', function(e) {
  var serviceId = parseInt( $(this).val() );
  if ( NaN == serviceId || undefined == serviceId  || '' == serviceId ) {
    return false;
  }
  var service = _.find(_services, {'id': serviceId});
  var data = {service: service};
  var template = $('#service-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#formCinema').append(html);
  $('#btn-service option').each(function() {
    if ( serviceId == $(this).val() ) {
      $(this).remove();
    }
  });
  $(document).scrollTop($(document).height());
});
$(document).on('click', '.btn-service-delete', function(e) {
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

$(document).on('submit', '#formCinema', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaSave',
    type: 'POST',
    dataType: 'json',
    data: {
      cinemaName: $.trim( $('#cinemaName').val() ),
      brandId: $('#brandId').val(),
      cityId: $('#cityId').val(),
      areaId: $('#areaId').val(),
      districtId: $('#districtId').val(),
      address: $.trim( $('#address').val() ),
      tel: $.trim( $('#tel').val() ),
      longitude: $.trim( $('#longitude').val() ),
      latitude: $.trim( $('#latitude').val() ),
      tpCinemaId: _tpCinemaId,
      sourceId: _sourceId,
      associationStatus: 1
    }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      alert('新建标准影院，并关联成功！');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});

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
        $('#brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    if (true == res.meta.result) {
      _provinces = res.data;
      _(_provinces).forEach(function(province) {
        $('#provinceId').append($('<option></option>').attr('value', province.provinceId).text(province.provinceName));
      });
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
    console.log(res);
    if (true == res.meta.result) {
      _services = res.data;
      _(_services).forEach(function(service){
        $('#btn-service').append($('<option></option>').attr('value', service.id).text(service.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}