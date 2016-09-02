/*
  Author: Ge Liu
  Create: 2016-06-02 17:25:26
  Description: 商户列表查询页, 页面比较简单, 用到的接口有:
      1. 根据用户输入条件进行查询
      2. 商户操作(当前状态为已上线, 可进行 下线 和 详情 操作; 当前状态为已下线, 可进行 编辑 和 删除 操作)
      3. 账户操作(当前状态为正常, 可进行 账户启用 操作; 当前状态为停用, 可进行 账户停用 操作)
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var dataCache;

var _DEBUG = true;

$(function () {

  common.init('merchant-edit-submitted');

  // 初始化涉及的select控件
  $('#search_TP').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  $('#search_merchantLevel').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, true));
  $('#search_merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantStatus, true));

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
  var sendData = {
    periodStart: $('#search_startTime').val(),
    periodEnd: $('#search_endTime').val(),
    merchantStatus: $('#search_merchantStatus').val(),
    merchantName: $('#search_merchantName').val(),
    merchantId: $('#search_merchantNo').val(),
    userName: $('#search_merchantSubscribeGuy').val(),
    tpId: $('#search_TP').val(),
    merchantClass: $('#search_merchantLevel').val(),
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
      url: common.API_HOST + 'settlement/merchantinfo/merchantinfoListByLoginUser.json',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleMerchantData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "total" : 8, "record" : [ { "tpId" : "2", "merchantClass" : "2", "allocationPeriod" : "12", "merchantContacter" : "zhangsan", "accountName" : "光大银行某某账户", "fixedAllocationDay" : "", "merchantName" : "测试商户", "accountStatus" : "1", "merchantId" : "123456", "allocationDelay" : "2", "allocationDetail" : "1", "startTime" : "2016-05-15", "id" : "5", "department" : "上海客服_高端客户服务一室", "class" : "class com.cmb.o2o.settlement.model.MerchantInfo", "merchantRemark" : "测试", "merchantType" : "1", "auditorName" : "biaoge", "email" : "ceshi@163.com", "bankAccount" : "78978", "bankCode" : "1231212", "merchantStatus" : "2", "allocationRemark" : "测试", "allocationType" : "1", "userName" : "jiangxiao", "userId" : "660587", "auditorId" : "111", "merchantPhone" : "13513513513", "createTime" : "2016-05-23", "allocationDetailReceiver" : "1", "endTime" : "2016-12-31" }, { "allocationPeriod" : "0", "merchantContacter" : "", "accountName" : "", "fixedAllocationDay" : "", "merchantName" : "", "merchantId" : "6", "allocationDelay" : "0", "allocationDetail" : "0", "startTime" : "2016-06-06", "id" : "33", "department" : "上海客服_高端客户服务一室", "class" : "class com.cmb.o2o.settlement.model.MerchantInfo", "merchantRemark" : "", "auditorName" : "", "email" : "", "bankAccount" : "", "bankCode" : "", "merchantStatus" : "1", "allocationRemark" : "", "allocationType" : "0", "userName" : "", "userId" : "660587", "auditorId" : "", "merchantPhone" : "", "createTime" : "2016-06-02", "allocationDetailReceiver" : "0", "endTime" : "2016-11-25" } ] } }');
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

      _(record).forEach(function (item) {

        item.isOffline = (item.merchantStatus == 3);
        item.isOnline = (item.merchantStatus == 2);

        item.isDisabled = (item.accountStatus == 2);
        item.isEnabled = (item.accountStatus == 1);

        item.merchantStatus = settlementCommon.parseMerchantStatus(item.merchantStatus);
        item.accountStatus = settlementCommon.parseAccountStatus(item.accountStatus);
        item.tpId = settlementCommon.parseTP(item.tpId);
        item.merchantClass = settlementCommon.parseMerchantLevel(item.merchantClass);
      });

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
  $('#search_merchantStatus').val('');
  $('#search_merchantName').val('');
  $('#search_merchantNo').val('');
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

/****************************************** Merchant Detail **********************************************/

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

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

/****************************************** 账户和商户操作 **********************************************/
// SETTLEMENT_TODO: 完成下面6中操作
// 编辑商户
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想编辑该商户, 但哥还没做呢! 再点哥就报警了!');
});

// 删除商户
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想删除该商户, 但哥还没做呢! 再点哥就报警了!');
});

// 下线商户
$('#dataTable').on('click', '.btn-offline', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想下线该商户, 但哥还没做呢! 再点哥就报警了!');
});

// 查看商户详情
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想查看该商户详情, 但哥还没做呢! 再点哥就报警了!');
});

// 账户停用
$('#dataTable').on('click', '.btn-disable-account', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想停用该商户的账户, 但哥还没做呢! 再点哥就报警了!');
});

// 启用账户
$('#dataTable').on('click', '.btn-enable-account', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  alert('瞎JB点啥, 这功能还没做呢, merchant ID 是' + merchantId + ', 你想启用该商户, 但哥还没做呢! 再点哥就报警了!');
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
