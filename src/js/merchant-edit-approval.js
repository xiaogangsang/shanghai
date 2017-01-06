/*
  Author: Ge Liu
  Create: 2016-06-02 17:25:26
  Description: 商户列表查询页, 页面比较简单, 用到的接口有:
      1. 获取所有卡部以及每个卡部的所有提报人
      2. 根据用户输入条件进行查询
      3. 查看商户详情
      4. 导出
 */

'use strict;'
var common = require('common');
var _channels = {};
var _cities = [];
var _choosed = [];
var _movies = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var dataCache;
var _submitting = false;
var _firstShow = true;

var selectBranch;
var selectGuy;

var _DEBUG = false;

$(function () {

  var branches;
  var guys = {};

  common.init('merchant-edit-approval');

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
  if (!useCache) {
    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }
  }
  var sendData = {
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    userId: $('#search_merchantSubscribeGuy').val(),
    merchantName: $('#search_merchantName').val(),
    merchantId: $('#search_merchantNo').val(),
    tpId: $('#search_tp').val(),
    merchantClass: $('#search_merchantClass').val(),
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

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/merchantinfo/listMerchantsNeedChecking.json',
      type: 'POST',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleMerchantData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "total" : 8, "record" : [ { "tpId" : "tp方", "merchantName" : "测试商户", "merchantId" : "123456", "id" : "5", "merchantStatus" : "2", "userName" : "jiangxiao", "userId" : "660587", "createTime" : "2016"} ] } }');
    handleMerchantData(res);
  }

  return false;
});

function handleMerchantData(res) {

  _querying = false;

  if (!!~~res.meta.result) {
    if (res.data.record.length < 1) {
      $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      $('#pager').html('');
    } else {
      useCache = true;
      // _pageIndex = res.data.pageIndex;
      var totalRecord = res.data.total;
      var record = res.data.record;

      _pageTotal = Math.ceil(totalRecord / _pageSize);
      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

      dataCache = record;
      setTableData(dataCache);
    }
  } else {
    alert('接口错误：' + res.meta.msg);
  }
}

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

$('.btn-reset').click(function(e) {
  $('#search_startTime').val('');
  $('#search_endTime').val('');
  $('#search_merchantSubscribeGuy').val('');
  $('#search_merchantName').val('');
  $('#search_merchantNo').val('');
  $('#search_tp').val('');
  $('#search_merchantClass').val('');
  // selectGuy.clear();
  selectBranch.clear();
});

function setTableData(rows) {
  var data = { rows: rows };
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

/****************************************** Merchant Approval **********************************************/

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  if (_firstShow) {
    var template = $('#reject-result-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template);
    $('#detail-template').append(html);
    _firstShow = false;
  };
  

  var rowIndex = $(this).closest('tr').prevAll().length;
  var detailData = dataCache[rowIndex];

  setModal(detailData);
  $('#popup-merchant-detail').modal('show');
});

function setModal(detailData) {

  var template = $('#detail-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, detailData);

  $('#popup-merchant-detail .modal-body').html(html);

  formatPopupUI(detailData);
}

function formatPopupUI(detailData) {
  // make all the input lable-like
  $('.detail-area :input').prop('readonly', true);
  $('.detail-area :input').prop('disabled', true);
  $('#commitBtn').hide();

  // 拨款模式不同, 相应控件显示隐藏
  var allocationType = detailData.allocationType;
  if (typeof(allocationType) != 'undefined') {
    $('#select-allocation-type').val(allocationType).change();
  }

  $('#select-fixed-allocation-day').val(detailData.fixedAllocationDay);

  // 是否要发送拨款明细
  var allocationDetail = detailData.allocationDetail;
  $(':radio[name="allocation-detail-input"]').each(function(index, el) {
    if ($(el).val() == allocationDetail) {
      $(el).prop('checked', true).change();
    }
  });
  
  // 发送对象
  var sendTo = '0';
  $('input[name="send-to"]').each(function(index, el) {
    if ($(el).val() == sendTo) {
      $(el).prop('checked', true).change();
    } else {
      $(el).prop('checked', false).change();
    }
  });
}


$('#dataTable').on('click', '.btn-reject', function (e) {
  e.preventDefault();

  var rowIndex = $(this).closest('tr').prevAll().length;
  var detailData = dataCache[rowIndex];
  sendRejectRequest(detailData.merchantId);
});

$('body').on('click', '#btn-reject', function (e) {
  e.preventDefault();
  var merchantNo = $('#merchantNo').val();
  sendRejectRequest(merchantNo);

});

function sendRejectRequest(merchantNo) {
  var param = {merchantId: merchantNo};
  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/disable.json',
    type: 'GET',
    data: param,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      alert(res.meta.msg);
      
      $('#formSearch').trigger('submit');
      $('#popup-merchant-detail').modal('hide');
    } else {
      alert(res.meta.msg);
    }
  });
}

$('body').on('click', '#btn-egis', function (e) {
    e.preventDefault();

    var merchantNo = $('#merchantNo').val();
    var param = {merchantId: merchantNo};
    $.ajax({
      url: common.API_HOST + 'settlement/merchantinfo/online.json',
      type: 'POST',
      data: param,
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert(res.meta.msg);
        
        $('#formSearch').trigger('submit');
        $('#popup-merchant-detail').modal('hide');
      } else {
        alert(res.meta.msg);
      }
    });
});

/****************************************** event handler **********************************************/
// 拨款模式
$('.modal').on('change', '#select-allocation-type', function(e) {
  e.preventDefault();
  var value = $(this).val();

  if (value == '1') {
    $('.allocation-type1-input').show();
    $('.allocation-type2-input').hide();
  } else if (value == '2') {
    $('.allocation-type1-input').hide();
    $('.allocation-type2-input').show();
  }
});

// 是否发送拨款明细
$('.modal').on('change', ':radio[name="allocation-detail-input"]', function(e) {
  if ($(this).val() == '1') {
    $('.send-allocation-detail-container').show();
  } else if ($(this).val() == '0') {
    $('.send-allocation-detail-container').hide();
  }
});

// 发送对象
$('.modal').on('change', ':checkbox[name="send-to"]', function(e) {
  if ($(this).val() == '1') {
    if ($(this).prop('checked')) {
      $('.merchant-email').show();
    } else {
      $('.merchant-email').hide();
    }
  } else if ($(this).val() == '2') {
    if ($(this).prop('checked')) {
      $('.branch-email').show();
    } else {
      $('.branch-email').hide();
    }
  }
});


