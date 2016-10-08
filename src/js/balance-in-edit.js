/*
  支付流水修改记录 & 支付流水修改审核
  Ge Liu
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
var _submitting = false;

// 如果当前查询是从汇总页的选中记录查询
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

// 是查看提交的修改(false)还是审核(true)
var approval = false;

$(function() {

  var parts = window.location.href.split('/');
  var htmlName = parts[parts.length - 1];
  approval = htmlName.indexOf('approval') > -1;

  if (approval) {
    common.init('balance-in-edit-approval');
  } else {
    common.init('balance-in-edit-submitted');
  }
  
  $('#formSearch').parsley();
});


// handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();

  _pageIndex = 1;
  useCache = false;
  _queryingFromSelectedSummary = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();

  $('.multi-check-all').prop('checked', false);

  if (_querying) {
    return false;
  }

  _querying = true;

  var sendData;

  if (!useCache) {

    // 输入 交易订单号 或者 收单方支付订单号 后, 无需输入日期
    var orderNo = $('#search_orderNo').val();
    var thdSerialNo = $('#search_thdSerialNo').val();
    var dateIsRequired = (orderNo === '' && thdSerialNo === '');

    $('#search_dateType').prop('required', dateIsRequired);
    $('#search_startTime').prop('required', dateIsRequired);
    $('#search_endTime').prop('required', dateIsRequired);

    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }

    _pageSize = $('#search_pageSize').val() || 10;

    sendData = {
      dateType: dateIsRequired ? $('#search_dateType').val() : '',
      periodStart: dateIsRequired ? $('#search_startTime').val() : '',
      periodEnd: dateIsRequired ? $('#search_endTime').val() : '',
      chargeMerchant: $('#search_chargeMerchant').val(),
      chargeMerchantNo: $('#search_chargeMerchantNo').val(),
      partner: $('#search_partner').val(),
      discountType: $('#search_discountType').val(),
      discountName: $('#search_discountName').val(),
      bizType: $('#search_bizType').val(),
      payStatus: $('#search_payStatus').val(),
      reconciliationStatus: $('#search_reconciliationStatus').val(),
      reason: $('#search_reason').val(),
      orderNo: $('#search_orderNo').val(),
      thdSerialNo: $('#search_thdSerialNo').val(),
      // paySequenceNo: $('#search_paySequenceNo').val(),
      checkStatus: approval ? 2 : $('#search_checkStatus').val(),
      pageSize: _pageSize,
    };

    searchCache = sendData;
  } else {
    sendData = searchCache;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/list',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    handleData(res);
  });

  return false;
});

function handleData(res) {
	_querying = false;

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.canEdit = (item.checkStatus != 2 && item.checkStatus != 3 && item.reconciliationStatus != 4); // 待审核/审核完成状态不能再修改, 对账状态为确认的也不能修改
      item.canReverse = (item.checkStatus == 3);
      item.chargeMerchant = settlementCommon.parseMerchant(item.chargeMerchant);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseReason(item.reason);
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
    });

    if (!_queryingFromSelectedSummary) {
      useCache = true;
    }

    setTableData(record);
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

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }
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

  if (_queryingFromSelectedSummary) {
    queryFromSelectedSummary();
  } else {
    $('#formSearch').trigger('submit');
  }

  return false;
});

$('.btn-reset').click(function(e) {
 $('#formSearch :input:not(:button)').val('');
});

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/queryAcquiringInfo',
    type: 'GET',
    data: {id: $(this).data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);

    if (data.operateRecords) {
      formatEditHistory(data.operateRecords);
    }
    
    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
  });

  $('.modal form').parsley().validate();
});

// 查看详情(对比)
$('#dataTable').on('click', '.btn-detail', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/queryAcquiringCheckDiff',
    type: 'GET',
    data: {id: $(this).data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;
    data.detail = data.currentDetail;
    data.detail.lastDetail = data.lastDetail;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);

    // 如果原值, 未被修改, 不用显示. 这里的实现方式是删掉原值中和现值相同的字段
    var currentDetail = data.currentDetail;
    var lastDetail = data.lastDetail;

    for (var prop in lastDetail) {
      if (lastDetail.hasOwnProperty(prop) && currentDetail.hasOwnProperty(prop) && lastDetail[prop] == currentDetail[prop]) {
        lastDetail[prop] = '';
      }
    }

    if (data.operateRecords) {
      formatEditHistory(data.operateRecords);
    }

    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('.detail-area').addClass('compare');
    $('.detail-area.compare :input').prop('readonly', true);
    $('.detail-history').hide(); // 对比时不显示历史修改记录
    

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatus option[value="' + detail.payStatus + '"]').prop('selected', true);

    detail = detail.lastDetail;
    // 先清空掉已选的值(select会默认选择第一个)
    $('#subsidyTypeNew').val([]);
    $('#subsidyTypeNew option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#partnerNew').val([]);
    $('#partnerNew option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatusNew').val([]);
    $('#shipmentStatusNew option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatusNew').val([]);
    $('#reconciliationStatusNew option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reasonNew').val([]);
    $('#reasonNew option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatusNew').val([]);
    $('#payStatusNew option[value="' + detail.payStatus + '"]').prop('selected', true);

    // 如果没有原备注的话, 隐藏原备注textarea
    if (!detail.remarks) {
      $('#remarksNew').hide();
    }
  });
});


// 修改记录列表的状态码转换
function formatEditHistory(operateRecords) {
  operateRecords.forEach(function(obj) {
    obj.chargeMerchant = settlementCommon.parseMerchant(obj.chargeMerchant);
    obj.bizType = settlementCommon.parseBizType(obj.bizType);
    obj.payStatus = settlementCommon.parsePayStatus(obj.payStatus);
    obj.partner = settlementCommon.parsePartner(obj.partner);
    obj.discountType = settlementCommon.parseDiscountType(obj.discountType);
    obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
    obj.reason = settlementCommon.parseReason(obj.reason);
  });
}


// 审核通过
$('#dataTable').on('click', '.btn-approval', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/updateAcquiringCheck',
    type: 'POST',
    data: {id: $(this).data('id'), checkStatus: $(this).data('checkstatus'), version: $(this).data('version')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert(res.meta.msg);
      return false;
    } else {
      $('#formSearch').trigger('submit');
      alert('操作成功!');
    }
  });
});

$(document).on('click', '.modal button[type=submit]', function(event) {
  event.preventDefault();
  $('#popup-detail form').trigger('submit');
});

// 修改详情 "提交"
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('收单对账状态不能为 ＂未对账＂！');
    return false;
  }

  if (!$('.modal form').parsley().isValid()) {
    return false;
  }

  var createTime = $('#createTime').val();

  if (!settlementCommon.isValidTime(createTime)) {
    alert('支付时间内容有错误, 请重新修改');
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    version: $submitButton.data('version'),
    createTime: createTime,
    payAmount: $('#payAmount').val(),
    receivablePoint: $('#receivablePoint').val(),
    thdSerialNo: $('#thdSerialNo').val(),
    ticketAmount: $('#ticketAmount').val(),
    serviceAmount: $('#serviceAmount').val(),
    subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    subsidyType: $('#subsidyType').val(),
    returnFee: $('#returnFee').val(),
    partner: $('#partner').val(),
    o2oReceivableAmount: $('#o2oReceivableAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    payStatus: $('#payStatus').val(),
    reason: $('#reconciliationStatus').val() == 2 ? $('#reason').val() : '',// 对账不一致才有原因
    merchantName: $('#merchantName').val(),
    remarks: $('#remarks').val()
  };

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/updateDetail',
    type: 'POST',
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功!');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

// 反审核(单条记录)
$('#dataTable').on('click', '.btn-reverse', function(e) {
  e.preventDefault();

  var id = $(this).data('id');

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/reverse',
    type: 'POST',
    data: {id: id, version: $(this).data('version')}
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('操作成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

/************************************************* 批量操作 ***************************************************/
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

// 修改记录导出(from 修改记录)
$('.btn-export').click(function(e) {
  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再进行此操作!');
    return false;
  }

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/exportModifiedRecordsByMultiMsg',
    type: 'GET',
    data: searchCache
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
      } else {
        alert(res.meta.msg);
      }
  });

  // alert('接口尚未调通. 批量导出, 选中的id: ' + ids);
});

// 批量反审核(from 修改记录)
$('.btn-batch-reverse').click(function(e) {
  var ids = selectedIds();

  if (ids.length === 0) {
    alert('请至少选择一条记录!');
    return false;
  }

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/reverseByBatchByIds',
    type: 'POST',
    data: {ids: ids}
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('操作成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

// 全部反审核
$('.btn-all-reverse').click(function(e) {
  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再进行此操作!');
    return false;
  }
  operateAll('5');
});

// 批量审核通过(from 修改审核)
$('.btn-batch-approve').click(function(e) {
  e.preventDefault();
  batchOperate('3');
});

// 批量审核驳回(from 修改审核)
$('.btn-batch-reject').click(function(e) {
  e.preventDefault();
  batchOperate('4');
});


// 批量审核(3)/驳回(4)
function batchOperate(type) {
  
  var ids = selectedIds();

  if (ids.length === 0) {
    alert('请至少选择一条记录!');
    return false;
  }

  var param = {ids: ids, checkStatus: type};

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/updateAcquiringCheckByBatch',
    type: 'POST',
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });

  // alert('接口尚未联调.  操作: ' + (type == 1 ? '批量审核通过' : '批量审核驳回') + '. 选择的记录的ID: ' + ids);
}


function selectedIds() {
  var ids = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var id = $(this).closest('tr').data('id');
    ids.push(id);
  });

  return ids;
}

// 全部审核通过
$('.btn-all-approve').click(function(e) {
  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再进行此操作!');
    return false;
  }

  operateAll('3');
});

// 全部审核驳回
$('.btn-all-reject').click(function(e) {
  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再进行此操作!');
    return false;
  }

  operateAll('4');
});

function operateAll(type) {

  var searchTerms = settlementCommon.clone(searchCache);
  searchTerms.opCheckStatus = type;

  $.ajax({
    url: common.API_HOST + 'settlement/acquiringCheck/updateBatchByMultiMsg',
    type: 'POST',
    data: searchTerms
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('操作成功!');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
}
