'use strict;'

var common = require('common');
var _brands = {};
var _tpHallId = 0;
var _tpStoreId = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('hall-tp');

  var urlParam = common.getUrlParam();
  if (urlParam.tpHallId == undefined || urlParam.tpHallId == ''
    || urlParam.tpStoreId == undefined || urlParam.tpStoreId == '') {
    alert('缺少参数！');
    location = 'hall-tp.html';
  }

  _tpHallId = urlParam.tpHallId;
  _tpStoreId = urlParam.tpStoreId;

  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: {
      thirdPartyCinemaId: _tpHallId,
      sourceId: _tpStoreId,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var html = '';
      _(res.data).forEach(function (value, key) {
        if (value != '' && value != undefined && value != null) {
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
          html += '<div class="detail-item"><span>' + key + '：</span>' + value + '</div>';
        }
      });

      $('.cinema-detail').html(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  $('#formCinema').parsley();
});

$(document).on('submit', '#formCinema', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  $.ajax({
    url: common.API_HOST + 'cinema/standard/cinemaSave',
    type: 'POST',
    dataType: 'json',
    data: {
      cinemaName: $.trim($('#cinemaName').val()),
      brandId: $('#brandId').val(),
      cityId: $('#cityId').val(),
      areaId: $('#areaId').val(),
      districtId: $('#districtId').val(),
      address: $.trim($('#address').val()),
      tel: $.trim($('#tel').val()),
      longitude: $.trim($('#longitude').val()),
      latitude: $.trim($('#latitude').val()),
      thirdPartyCinemaId: _tpHallId,
      sourceId: _tpStoreId,
      associationStatus: 1,
    },
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('新建标准影院，并关联成功！');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});
