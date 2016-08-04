/*
	 拨款汇总
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
var _submitting = false;

var detailUseCache = false;
var detailDataCache;
var detailPageIndex = 1;
var detailPageTotal = 0;

var _DEBUG = false;

$(function() {

	common.init('money-out-summary');

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
    startDate: $('#search_startTime').val(),
    endDate: $('#search_endTime').val(),
    batch: $('#search_batch').val(),
    merName: $('#search_merName').val(),
    merNo: $('#search_merNo').val(),
    appStatus: $('#search_appStatus').val(),
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
      url: common.API_HOST + 'settlement/merchantSummary/getMerchantSummaryList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{"meta" : {"result" : "1","msg" : "操作成功"},"data" : {"total" : 42,"record" : [ {"appAmount" : 95,"merNo" : "308010700103175","merchantSummaryId" : 127,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164343","appDate" : "2016-07-04","appStatus" : 7}, {"appAmount" : 190,"merNo" : "308010700103175","merchantSummaryId" : 128,"accNo" : "78978","accName" : "光大银行某某账户","merName" : "测试商户","batchNum" : "20160704164407","appDate" : "2016-07-04","appStatus" : 7} ]}}');
    handleData(res);
  }

  return false;
});

function handleData(res) {
	_querying = false;

	if (settlementCommon.prehandleData(res)) {
		useCache = true;

		var totalRecord = res.data.detail.count;
    var records = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, records.length, _pageTotal);

    _(records).forEach(function(item) {
    	item.chargeMerchant = settlementCommon.parseMerchant(item.chargeMerchant);
      item.payStatusNo = item.payStatus;
    	item.payStatus = settlementCommon.parsePayStatus(item.payStatus);

      var moneyOutStatus = item.appStatus;
      item.resend = (moneyOutStatus == 4 || moneyOutStatus == 6 || moneyOutStatus == 2);
      item.refused = (moneyOutStatus == 3 || moneyOutStatus == 7);
      item.appStatus = settlementCommon.parseMoneyOutStatus(item.appStatus);
    });

    dataCache = records;

    setTableData(dataCache);
	}
}

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
  $('#formSearch :input:not(:button)').val('');
});

$('.btn-detail-reset').click(function(e) {
  $('#detailFormSearch :input:not(:button)').val('');
});

$('.btn-batch-resend').click(function(e) {
  e.preventDefault();
  batchOperate(2);
});

$('.btn-batch-refused').click(function(e) {
  e.preventDefault();
  batchOperate(1);
});

function batchOperate(operateCode) {
  var parameters = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    parameters.push($(this).data('id'));
  });

  if (parameters.length == 0) {
    alert('请至少选择一条记录');
  } else {
    operate(operateCode, parameters);
    $('.multi-check-all').prop('checked', false).change();
  }
}

$('.multi-check-all').change(function(e) {
  e.preventDefault();
  var isChecked = $(this).is(':checked');

  if (isChecked) {
    $('#dataTable tbody :checkbox:not(:checked)').prop('checked', true);
  } else {
    $('#dataTable tbody :checkbox:checked').prop('checked', false);
  }
});


$('body').on('change', 'tr > td :checkbox', function(e) {
  e.preventDefault();

  var isChecked = $(this).is(':checked');

  if (!isChecked) {
    $('.multi-check-all').prop('checked', false);
  }
});


$('.btn-export-all').click(function(e) {
  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/merchantSummary/getMerchantExcel',
    dataType: 'json',
    data: searchCache
  }).done(function(res) {
    window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.filePath;
  });
});

$('.btn-export-selected').click(function(e) {

  e.preventDefault();

  var parameters = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
    var obj = dataCache[rowIndex].merchantSummaryId;
    parameters.push(obj);
  });

  if (parameters.length == 0) {
    alert('请至少选择一条记录');
    return false;
  }

  var param = {merIds: settlementCommon.toString(parameters)};

  $.ajax({
    url: common.API_HOST + 'settlement/appropriationInfo/getAppropriationExcel',
    dataType: 'json',
    data: param
  }).done(function(res) {
    if (!!~~res.meta.result) {
      window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.filePath;
    } else {
      alert(res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.see-detail', function(e) {
  e.preventDefault();

  detailDataCache = {
    merchantSummaryId: $(this).data('id')
  };

  var template = $('#detail-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, {});
  $('#popup-detail .modal-body').html(html);

  $('#popup-detail').modal('show');

  $('#detailFormSearch button[type=submit]').click();
});

$('#dataTable').on('click', '.resend', function(e) {
  e.preventDefault();

  var idList = [$(this).data('id')];

  operate(2, idList);
});

$('#dataTable').on('click', '.refused', function(e) {
  e.preventDefault();

  var idList = [$(this).data('id')];

  operate(1, idList);
});

/*
  operateCode: 1: 银行退票; 2:重拨
*/
function operate(operateCode, idList) {

  if (!window.confirm('将立刻为商户进行此次拨款，操作不可撤回，请仔细核对金额和商户账户信息！')) {
    return false;
  }

  data = {ids: settlementCommon.toString(idList), appStatus: operateCode};

  $.ajax({
    url: common.API_HOST + "settlement/merchantSummary/updateMerchantSummaryStatus",
    type: "GET",
    dataType: 'json',
    data: data
  })
  .done(function(res) {
    alert(res.meta.msg);
    $('#formSearch').trigger('submit');
  });
}


/****************************************** detail *******************************************/
$('body').on('click', '#detailFormSearch button[type=submit]', function(e) {
  e.preventDefault();
  detailUseCache = false;
  detailPageIndex = 1;
  $('#detailFormSearch').trigger('submit');
});

$('body').on('submit', '#detailFormSearch', function(e) {
  e.preventDefault();

  var sendData = {
    merId: detailDataCache.merchantSummaryId,
    ticketType: $('#search_ticketType').val(),
    movieOrderNo: $('#search_movieOrderNo').val(),
    payOrderNo: $('#search_payOrderNo').val(),
    partnerOrderNo: $('#search_partnerOrderNo').val(),
    channelType: $('#search_channelType').val(),
    businessType: $('#search_businessType').val(),
    pageSize: _pageSize,
  };

  if (detailUseCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = detailPageIndex;

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/appropriationInfo/getAppropriationInfoList',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function(res) {
      handleDetailData(res);
    });
  } else {
    var res = $.parseJSON('{"meta": {"result": "1","msg": "操作成功"},"data":{"detail":{"recordCount":"41","recordDetail":[{"productOrderNo":"商品订单号","partnerOrderNo":"合作方订单号","payOrderNo":"交易订单号","shipmentDate":"出/退货时间（格式yyyy-MM-dd HH:mm:ss）","appDate":"拨款日期（格式yyyy-MM-dd）","ticketType":"票类","channelType":"1","businessType":"1","orderNo":"影票交易订单号","shipmentStatus":"1","payStatus":"1","refundPartner":"1","discountType":"1","discountName":"优惠名称","refundFree":"退货手续费（单位：元）","appAmount":"拨款金额（单位：元）"},{"productOrderNo":"商品订单号","partnerOrderNo":"合作方订单号","payOrderNo":"交易订单号","shipmentDate":"出/退货时间（格式yyyy-MM-dd HH:mm:ss）","appDate":"拨款日期（格式yyyy-MM-dd）","ticketType":"票类","channelType":"渠道(1掌上生活，2手机银行)","businessType":"业务类别（1：影票，2退票手续费）","orderNo":"影票交易订单号","shipmentStatus":"出货状态（1未出货，2出货失败，3出货成功，4退货失败，5退货成功）","payStatus":"支付状态（1未支付，2支付成功，3支付失败，4未退款，5退款成功，6退款失败）","refundPartner":"退款承担方（1o2o，2tp方，3渠道方）","discountType":"优惠方式（1活动，2优惠券）","discountName":"优惠名称","refundFree":"退货手续费（单位：元）","appAmount":"拨款金额（单位：元）"}]}}}');
    handleDetailData(res);
  }
});


function handleDetailData(res) {

  if (!!~~res.meta.result) {
    if (res.data == null || res.data.detail == null || res.data.detail.count < 1) {
      var errorMsg = '无满足条件记录';
      $('#detailDataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#detailPager').html('');
    } else {
      detailUseCache = true;
      var totalRecord = res.data.detail.count;
      var record = res.data.detail.records;

      detailPageTotal = Math.ceil(totalRecord / _pageSize);
      setDetailPager(totalRecord, detailPageIndex, record.length, detailPageTotal);

      _(record).forEach(function(item) {
        item.channelType = settlementCommon.parseChannel(item.channelType);
        item.businessType = settlementCommon.parseBizType(item.businessType);
        item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
        item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
        item.refundPartner = settlementCommon.parsePartner(item.refundPartner);
        item.discountType = settlementCommon.parseDiscountType(item.discountType);
      });

      setDetailTableData(record);
    }
  } else {
    alert(res.meta.msg);
    $('#detailDataTable tbody').html('');
    $('#detailPager').html('');
  }
}

function setDetailTableData(rows) {
  var data = {rows: rows};
  var template = $('#detail-table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#detailDataTable tbody').html(html);
}

$('body').on('click', '.btn-detail-reset', function(e) {
  e.preventDefault();

  $('#detailFormSearch :input:not(:button)').val('');
});


function setDetailPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#detail-pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#detailPager').html(html);
}

$('body').on('click', '#detailPager .prev,.next', function (e) {
  e.preventDefault();
  if ($(this).hasClass('prev')) {
    if (detailPageIndex <= 1) {
      detailPageIndex = 1;
      alert('已经是第一页！');
      return false;
    }

    detailPageIndex--;
  } else {
    if (detailPageIndex >= detailPageTotal) {
      detailPageIndex = detailPageTotal;
      alert('已经是最后一页！');
      return false;
    }

    detailPageIndex++;
  }

  $('#detailFormSearch').trigger('submit');
  return false;
});

$('body').on('click', '#detailPager #detail-btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#detailPageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#detailPageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > detailPageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  detailPageIndex = pageNo;
  $('#detailFormSearch').trigger('submit');
  return false;
});
