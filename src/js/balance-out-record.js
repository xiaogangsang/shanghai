'use strict;'

var common = require('common');

$(function () {
  setupDefaultValue();
  $('#record_shipmentStatus').prop('disabled',true);
  setProvince();
})

function setProvince() {
  $.ajax({
    url: common.API_HOST + 'common/provinceList',
    type: 'GET',
    dataType: 'json',
  })
    .done(function (res) {
      if (!!~~res.meta.result) {
        _provinces = res.data;
        var html = '';
        _(_provinces).forEach(function (province) {
          html += '<option value="' + province.provinceId + '">' + province.provinceName + '</option>';
        });

        $('#record-provinceId').append(html);
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
}

$(document).on('change click', '#record-provinceId', function (e) {
  var provinceId = parseInt($(this).val());
  var options = '';
  if (!!+provinceId) {
    var province = _.find(_provinces, { provinceId: provinceId.toString() });
    var cityList = province.cityList;
    _(cityList).forEach(function (value, key) {
      options += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
    });
  } else {
    options = '<option value="">选择城市</option>';
  }

  $('#record-cityId').html(options);
  return false;
});

function setupDefaultValue () {
  $('#record_subsidyAmountO2o').val(0);
  $('#record_subsidyAmountTrd').val(0);
  $('#record_returnFee').val(0);
  $('#record_subsidyType').val(2);
  $('#record_subsidyTypeTrd').val(1);
}

Parsley.addValidator('validateAmount', {
  messages: { 'zh-cn': '出货调整时，金额应该为0或正值。退货调整时，金额应该为0或负值。' },
  validate: function(value, requirement) {
    var shipmentOrderType = $('#record_shipmentOrderType').val();
    if (~~shipmentOrderType === 3) { // 出货
      return (~~value < 0) ? false : true;
    } else if (~~shipmentOrderType === 4) { // 退货
      return (~~value > 0) ? false : true;
    }
  }
});

$('#record_shipmentDate').datetimepicker({
  format: 'yyyy-mm-dd',
  language: 'zh-CN',
  minView: 2,
  todayHighlight: true,
  autoclose: true,
  startDate: new Date(),
});

$('#record_shipmentOrderType').on('change', function(e) {
  e.preventDefault();
  var shipmentOrderType = $('#record_shipmentOrderType').val();
  if (~~shipmentOrderType === 3) {
    $('#record_shipmentStatus option[value="2"]').prop('selected', true);
  } else if (~~shipmentOrderType === 4) {
    $('#record_shipmentStatus option[value="7"]').prop('selected', true);
  }
});
$('record_shipmentStatus').on('change', function(e) {
  e.preventDefault();
  var shipmentStatus = $('#record_shipmentStatus').val();
  if (~~shipmentStatus === 2) {
    $('#record_shipmentOrderType option[value="3"]').prop('selected', true);
  } else if (~~shipmentStatus === 7) {
    $('#record_shipmentOrderType option[value="4"]').prop('selected', true);
  }
});

$('#record_merchantNo').on('blur', function(e) {
  e.preventDefault();

  var merchantNo = $('#record_merchantNo').val().trim();
  if (!merchantNo) return false;
  $.ajax({
    url: common.API_HOST + "settlement/merchantinfo/query",
    type: 'POST',
    dataType: 'json',
    data: { merchantId: merchantNo }
  })
    .done(function(res) {
      if (!!~~res.meta.result) {
        $('#record_merchantName').val(res.data.merchantInfo.merchantName);
      }
    })
});

$('#formBalanceOutRecord').on('submit', function(e) {
  e.preventDefault();

  $('#formBalanceOutRecord').parsley().validate();
  if (!$('#formBalanceOutRecord').parsley().isValid()) {
    return false;
  }

  var partner = $('#record_partner').val();
  if (~~partner === 0) {
    partner = '';
  }
  var param = {
    shipmentOrderType: $('#record_shipmentOrderType').val(),
    payTool: $('#record_payTool').val(),
    shipmentDate: $('#record_shipmentDate').val(),
    movieName: $('#record_movieName').val(),
    cinemaName: $('#record_cinemaName').val(),
    countNum: $('#record_countNum').val(),
    merchantName: $('#record_merchantName').val(),
    merchantNo: $('#record_merchantNo').val().trim(),
    thdOrderNo: $('#record_thdOrderNo').val(),
    settleAmount: $('#record_settleAmount').val(),
    subsidyType: $('#record_subsidyType').val(),
    subsidyAmountO2o: $('#record_subsidyAmountO2o').val(),
    subsidyTypeTrd: $('#record_subsidyTypeTrd').val(),
    subsidyAmountTrd: $('#record_subsidyAmountTrd').val(),
    returnFee: $('#record_returnFee').val(),
    acceptanceAppropriation: $('#record_acceptanceAppropriation').val(),
    finalSettleAmount: $('#record_finalSettleAmount').val(),
    partner: partner,
    shipmentStatus: $('#record_shipmentStatus').val(),
    cityName : $('#record-cityId').text()
  }

  $.ajax({
    url: common.API_HOST + "settlement/shipmentInfo/insertOnlyShipmentInfo",
    type: 'GET',
    data: param
  })
    .done(function(res) {
      if (!!~~res.meta.result) {
        alert("录入成功，请至列表查看");
        $("#formBalanceOutRecord button.close").trigger('click');
        $("#formBalanceOutRecord :input").val("");
        setupDefaultValue();
      } else {
        var msg = res.meta.msg;
        if (msg) {
          alert(msg);
        } else {
          alert("录入失败，请检查数据后重试");
        }
      }
    })
});