/*
	出货对账修改记录 / 审核
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

var approval = false;

$(function() {

  var location = window.location.href;

  var parts = location.split('/');

  var html = parts[parts.length - 1];

  approval = (html.indexOf('approval') > -1);


  if (approval) {
    common.init('balance-out-edit-approval');
  } else {
  	common.init('balance-out-edit-submitted');
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

  if (_querying) {
    return false;
  }

  _querying = true;

  var sendData;

  if (!useCache) {

    // 输入 商品订单号 或者 二级商户订单号 后, 无需输入日期
    var bizOrderNo = $('#search_bizOrderNo').val();
    var thdOrderNo = $('#search_thdOrderNo').val();
    var dateIsRequired = (bizOrderNo === '' && thdOrderNo === '');

    $('#search_dateType').prop('required', dateIsRequired);
    $('#search_startTime').prop('required', dateIsRequired);
    $('#search_endTime').prop('required', dateIsRequired);

    if (!$('#formSearch').parsley().isValid()) {
      return false;
    }

    _pageSize = $('#search_pageSize').val() || 10;

    sendData = {
      dateType: $('#search_dateType').val(),
      startTime: $('#search_startTime').val(),
      endTime: $('#search_endTime').val(),
      merchantName: $('#search_merchantName').val(),
      merchantNo: $('#search_merchantNo').val(),
      shipmentStatus: $('#search_shipmentStatus').val(),
      bizType: $('#search_bizType').val(),
      partner: $('#search_partner').val(),
      acquiringReconciliationStatus: $('#search_acquiringReconciliationStatus').val(),
      reconciliationStatus: $('#search_reconciliationStatus').val(),
      reason: $('#search_reason').val(),
      discountType: $('#search_discountType').val(),
      discountName: $('#search_discountName').val(),
      bizOrderNo: $('#search_bizOrderNo').val(),
      thdOrderNo: $('#search_thdOrderNo').val(),
      checkStatus: approval ? 2 : $('#search_checkStatus').val(), // 审核的时候, 要过滤审核的状态为待审核
      pageSize: _pageSize,
    };

    searchCache = sendData;
  } else {
    sendData = searchCache;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/listByCheckStatus',
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
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(item.acquiringReconciliationStatus);
      item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseOutReason(item.reason);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
      item.shipmentStatus = settlementCommon.parseShipmentStatus(item.shipmentStatus);
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

  var compare = $(this).data('compare');

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/onlyShipmentInfo',
    type: 'GET',
    data: {id: $(this).closest('tr').data('id')},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert('查询数据失败!');
      return false;
    }
    var data = res.data;

    data.detail = data.onlyShipmentInfo;
    if (compare) {
      if (data.operate && data.operate.length > 0) {
        // 我们这里copy一下, 因为, 上面显示是用的select(需要状态码), 下面显示用的td(直接显示状态码对应的值), 不能重用
        data.detail.lastDetail = $.extend({}, data.operate[0]);
      } else {
        data.detail.lastDetail = {};
      }

      // 如果原值, 未被修改, 不用显示. 这里的实现方式是删掉原值中和现值相同的字段
      var currentDetail = data.detail;
      var lastDetail = data.detail.lastDetail;

      for (var prop in lastDetail) {
        if (lastDetail.hasOwnProperty(prop) && currentDetail.hasOwnProperty(prop) && lastDetail[prop] == currentDetail[prop]) {
          lastDetail[prop] = '';
        }
      }
    }

    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.payStatus = settlementCommon.parsePayStatus(detail.payStatus);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    detail.chargeMerchant = settlementCommon.parseMerchant(detail.chargeMerchant);
    detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.acquiringReconciliationStatus = settlementCommon.parseReconciliationStatus(detail.acquiringReconciliationStatus);
    detail.subsidyType = settlementCommon.parseSubsidyType(detail.subsidyType);
    detail.partner = settlementCommon.parsePartner(detail.partner);

    if (data.operate) {
      formatEditHistory(data.operate);
    }

    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    if (compare) {
      $('.detail-area').addClass('compare');
      $('.detail-area.compare :input').prop('readonly', true);
      $('.detail-history').hide();// 对比时不显示历史修改记录
    }

    // $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    // $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#shipmentStatus option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);

    if (compare) {

      detail = detail.lastDetail;
      // $('#subsidyTypeNew option[value="' + detail.subsidyType + '"]').prop('selected', true);
      // $('#partnerNew option[value="' + detail.partner + '"]').prop('selected', true);
      $('#shipmentStatusNew').val([]);
      $('#shipmentStatusNew option[value="' + detail.shipmentStatus + '"]').prop('selected', true);
      $('#reconciliationStatusNew').val([]);
      $('#reconciliationStatusNew option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
      $('#reasonNew').val([]);
      $('#reasonNew option[value="' + detail.reason + '"]').prop('selected', true);
    } else {
      $('.modal form').parsley().validate();
    }
  });
});

function formatEditHistory(operate) {
  operate.forEach(function(obj) {
    // obj.subsidyType = settlementCommon.parseSubsidyType(obj.subsidyType);
    // obj.partner = settlementCommon.parsePartner(obj.partner);
    obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
    obj.shipmentStatus = settlementCommon.parseShipmentStatus(obj.shipmentStatus);
    obj.reason = settlementCommon.parseOutReason(obj.reason);
  });
}

// 审核通过 / 驳回
$('#dataTable').on('click', '.btn-approval', function (e) {

  e.preventDefault();

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/checkShipment',
    type: 'POST',
    data: {id: $(this).data('id'), checkStatus: $(this).data('checkstatus'), oldVersion: $(this).data('version')},
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

// 修改提交
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('出货对账状态不能为 ＂未对账＂！');
    return false;
  }
  
  if (!$('.modal form').parsley().isValid()) {
    return false;
  }

  var shipmentDate = $('#shipmentDate').val();

  if (!settlementCommon.isValidTime(shipmentDate)) {
    alert('支付时间内容有错误, 请重新修改');
    return false;
  }

  $submitButton = $(this).find('button[type=submit]');

  var param = {
    id: $submitButton.data('id'),
    oldVersion: $submitButton.data('version'),
    shipmentDate: shipmentDate,
    merchantName: $('#merchantName').val(),
    merchantId: $('#merchantNo').val(),
    settleAmount: $('#settleAmount').val(),
    // subsidyAmountO2o: $('#subsidyAmountO2o').val(),
    // subsidyType: $('#subsidyType').val(),
    acceptanceAppropriation: $('#acceptanceAppropriation').val(),
    // returnFee: $('#returnFee').val(),
    // partner: $('#returnFee').val(),
    finalSettleAmount: $('#finalSettleAmount').val(),
    reconciliationStatus: $('#reconciliationStatus').val(),
    shipmentStatus: $('#shipmentStatus').val(),
    reason: $('#reason').val(),
    remarks: $('#remarks').val()
  };

  $.ajax({
    url: common.API_HOST + 'settlement/shipmentInfo/updateOnlyShipmentInfo',
    data: param,
  }).done(function(res) {
    if (!!~~res.meta.result) {
      alert('提交成功');
      $('#popup-detail').modal('hide');
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

// 批量审核通过
$('.btn-batch-approve').click(function() {
  batchOperate('1');
});

// 批量审核驳回
$('.btn-batch-reject').click(function() {
  batchOperate('2');
});

function batchOperate(type) {
  var parameters = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var id = $(this).closest('tr').data('id');
    parameters.push(id);
  });

  if (parameters.length === 0) {
    alert('请至少选择一条记录!');
    return false;
  }

  alert('接口尚未联调.  操作: ' + (type == 1 ? '批量审核通过' : '批量审核驳回') + '. 选择的记录的ID: ' + parameters);
}
