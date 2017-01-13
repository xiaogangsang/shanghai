/*
	�յ�������ϸ
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

// �����ǰ��ѯ�Ǵӻ���ҳ��ѡ�м�¼��ѯ
var _queryingFromSelectedSummary = false;

var _selectedSummary = {};

// _DEBUG ����JSON�ַ���, �������������ص�����
var _DEBUG = false;

$(function() {

	common.init('balance-in-detail');

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

    // ���� ���׶����� ���� �յ���֧�������� ��, ������������
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
      beginTime: dateIsRequired ? $('#search_startTime').val() : '',
      endTime: dateIsRequired ? $('#search_endTime').val() : '',
      chargeMerchant: $('#search_chargeMerchant').val(),
      chargeMerchantNo: $('#search_chargeMerchantNo').val(),
      partner: $('#search_partner').val(),
      discountType: $('#search_discountType').val(),
      discountName: $('#search_discountName').val(),
      // bizType: $('#search_bizType').val(),
      payStatus: $('#search_payStatus').val(),
      reconciliationStatus: $('#search_reconciliationStatus').val(),
      reason: $('#search_reason').val(),
      orderNo: $('#search_orderNo').val(),
      thdSerialNo: $('#search_thdSerialNo').val(),
      // paySequenceNo: $('#search_paySequenceNo').val(),
      checkStatus: $('#search_checkStatus').val(),
      orderSource:$('#search_orderSource').val(),
      acquiringOrderType:$('#search_acquiringOrderType').val(),
      pageSize: _pageSize,
    };

    searchCache = sendData;
  } else {
    sendData = searchCache;
  }

  sendData.pageIndex = _pageIndex;

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/queryDetailByMultiMsg',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    // var res = $.parseJSON('{ "meta": { "result": "1", "msg": "�����ɹ�" }, "data": { "summary": { "count": "��������", "totalTicketCount": "��Ʊ����", "totalTiketAmount": " Ʊ�� ", "totalReturnFee":"��Ʊ������", "totalServiceAmount": "�ܷ����", "totalSubsidyAmountO2o": "�����ܽ��", "totalO2oReceivableAmount": "Ӧ���ܽ��", "totalBankAmount": "ʵ���յ��ܽ��" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "����", "bizType": "ҵ������", "orderNo": "������", "countNum": "Ʊ��", "reconciliationDate": "��������", "thdSerialNo":"�յ���������", "costCenter": "�ɱ�����", "externalId": "֧����ˮ", "o2oReceivableAmount": "Ӧ�ս��", "subsidyType": "������ʽ", "chargeMerchant":"1", "subsidyAmountO2o": "�������", "discountName": "�/�Żݷ�ʽ����", "bankAmount":"ʵ�ս��", "returnFee":"��Ʊ������", "payAmount": "֧�����", "serviceAmount": "�����", "ticketAmount":"���׽��", "reconciliationStatus":"1", "createTime": "֧��ʱ��(����)", "discountType": "�Żݷ�ʽ", "id": 1934, "payStatus": "1", "chargeMerchantNo": "�̻���", "partner":"�˿��ծ��", "reason":"1" } ] } } }');
    var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "�����ɹ�"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "2"}, {"checkStatus" : "2"}]}}}');
    handleData(res);
  }
});

function queryFromSelectedSummary() {

  _selectedSummary.pageIndex = _pageIndex;
  var url = common.API_HOST + 'settlement/acquiring/listSummaryDetail?' + settlementCommon.serializeParam(_selectedSummary);

  if (!_DEBUG) {
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "�����ɹ�" }, "data": { "summary": { "count": "��������", "totalTicketCount": "��Ʊ����", "totalTiketAmount": " Ʊ�� ", "totalReturnFee":"��Ʊ������", "totalServiceAmount": "�ܷ����", "totalSubsidyAmountO2o": "�����ܽ��", "totalO2oReceivableAmount": "Ӧ���ܽ��", "totalBankAmount": "ʵ���յ��ܽ��" }, "detail": { "recordCount": "42", "recordDetail": [ { "receivablePoint": "����", "bizType": "ҵ������", "orderNo": "������", "countNum": "Ʊ��", "reconciliationDate": "��������", "thdSerialNo":"�յ���������", "costCenter": "�ɱ�����", "externalId": "֧����ˮ", "o2oReceivableAmount": "Ӧ�ս��", "subsidyType": "������ʽ", "chargeMerchant":"1", "subsidyAmountO2o": "�������", "discountName": "�/�Żݷ�ʽ����", "bankAmount":"ʵ�ս��", "returnFee":"��Ʊ������", "payAmount": "֧�����", "serviceAmount": "�����", "ticketAmount":"���׽��", "reconciliationStatus":"1", "createTime": "֧��ʱ��(����)", "discountType": "�Żݷ�ʽ", "id": 1934, "payStatus": "1", "chargeMerchantNo": "�̻���", "partner":"�˿��ծ��", "reason":"1" } ] } } }');
    handleData(res);
  }
}

function handlePresetQuery() {

  var sessionParam = sessionStorage.param;
  if (sessionParam) {
    var passedParam = JSON.parse(sessionParam);

    if (passedParam) {
      // �ӻ���ҳ  �鿴ѡ����ϸ
      if (passedParam.type == 1) {
        var parameters = passedParam.param;

        _pageIndex = 1;
        _selectedSummary = {'acquiringInfoFormCollection': parameters, 'pageSize': _pageSize};

        _queryingFromSelectedSummary = true;
        queryFromSelectedSummary();

      } else if (passedParam.type == 0) { // �ӻ���ҳ  �鿴������ϸ
        var parameters = passedParam.param;

        $('#search_dateType').val(parameters.dateType);
        $('#search_startTime').val(parameters.beginTime);
        $('#search_endTime').val(parameters.endTime);
        $('#search_chargeMerchant').val(parameters.chargeMerchant);
        $('#search_chargeMerchantNo').val(parameters.chargeMerchantNo);
        $('#search_payStatus').val(parameters.payStatus)

        _pageIndex = 1;
        useCache = false;
        $('#formSearch').trigger('submit');
      }
      sessionStorage.removeItem('param');
    }
  }
}

// �п��ܱ�ҳ�Ĳ�ѯ�Ǵӻ���ҳ���Ų�ѯ������������
handlePresetQuery();

function handleData(res) {
	_querying = false;

  if (settlementCommon.prehandleData(res)) {
    var totalRecord = res.data.detail.count;
    var record = res.data.detail.records;

    _pageTotal = Math.ceil(totalRecord / _pageSize);
    setPager(totalRecord, _pageIndex, record.length, _pageTotal);

    _(record).forEach(function(item) {
      item.chargeMerchant = settlementCommon.parseChargeMerchant(item.chargeMerchant);
      item.acquiringOrderType = settlementCommon.parseAcquiringOrderType(item.acquiringOrderType);
      item.orderSource = settlementCommon.parseOrderSource(item.orderSource);
      item.subsidyTypeTrd = settlementCommon.parseSubsidyType(item.subsidyTypeTrd);
      item.subsidyType = settlementCommon.parseSubsidyType(item.subsidyType);
      item.payStatus = settlementCommon.parsePayStatus(item.payStatus);
      item.reconciliationStatus = settlementCommon.parseReconciliationStatus(item.reconciliationStatus);
      item.reason = settlementCommon.parseReason(item.reason);
      item.bizType = settlementCommon.parseBizType(item.bizType);
      item.discountType = settlementCommon.parseDiscountType(item.discountType);
      item.partner = settlementCommon.parsePartner(item.partner);
      item.checkStatusNo = item.checkStatus;
      item.checkStatus = settlementCommon.parseCheckStatus(item.checkStatus);
    });

    if (!_queryingFromSelectedSummary) {
      useCache = true;
    }

    setTableData(record);

    // �ӻ���ҳ����鿴ѡ����ϸ, ��û��summary���ص�
    var summary = res.data.summary;
    if (summary) {
      _(summary).forEach(function(item) {
        item.payTool = settlementCommon.parseAcquiringPayTool(item.payTool);
        item.acquiringOrderType = settlementCommon.parseAcquiringOrderType(item.acquiringOrderType);
      });
      setSummaryTableData(summary);
    }
  }
}

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setSummaryTableData(data) {
  var data = { rows: data };
  var template = $('#summary-table-template').html();
	Mustache.parse(template);
	var html = Mustache.render(template, data);
	$('#summaryTable tbody').html(html);
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
      alert('�Ѿ��ǵ�һҳ��');
      return false;
    }

    _pageIndex--;
  } else {
    if (_pageIndex >= _pageTotal) {
      _pageIndex = _pageTotal;
      alert('�Ѿ������һҳ��');
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
    alert('Ҫ��ת��ҳ�볬���˷�Χ��');
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

// ����ȫ��export(���뵼��)
$('.btn-export-all').click(function(e) {

  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('���Ȳ�ѯ�ٵ���!');
    return false;
  }

  if (_queryingFromSelectedSummary) {
    var param = {'acquiringInfoFormCollection' : _selectedSummary.acquiringInfoFormCollection};

    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/exportSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
    })
    .done(function(res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('�����������ύ��ϵͳ����Ϊ���������ݣ���ҪԼ15���ӣ�\n���������б�鿴�����ص��������\n���������ݽ�����3�죬�뼰ʱ�鿴�����ء�');
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/acquiringInfoListExport',
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        // window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
        alert('�����������ύ��ϵͳ����Ϊ���������ݣ���ҪԼ15���ӣ�\n���������б�鿴�����ص��������\n���������ݽ�����3�죬�뼰ʱ�鿴�����ء�');
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

// ��������ύ
$('.complete-commit').click(function(e) {

  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('���Ȳ�ѯ�ٽ��д˲���!');
    return false;
  }

  var result =  confirm("ȷ���ύ?");
  if(result == false){
    return;
  }

  if (_queryingFromSelectedSummary) {
    var param = {'acquiringInfoFormCollection' : _selectedSummary.acquiringInfoFormCollection};
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/confirmSummaryDetail?' + settlementCommon.serializeParam(param),
      type: 'GET',
      dataType: 'json',
      data: param
    })
    .done(function(res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    $.ajax({
      url: common.API_HOST + 'settlement/acquiring/confirmAcquiringInfoBatch',
      type: 'GET',
      dataType: 'json',
      data: searchCache,
    })
    .done(function (res) {
      if (res.meta.result == 0) {
        alert(res.meta.msg);
      } else {
        alert(res.meta.msg);
      }
    });
  }
});

$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  var id = $(this).closest('tr').data('id');
  var checkStatus = $(this).data('checkstatus');

  $('#payId').html(id);
  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/queryAcquiringInfo',
    type: 'GET',
    data: {id: id},
  })
  .done(function(res) {
    if (res.meta.result == 0) {
      alert(res.meta.msg);
      return false;
    }
    var data = res.data;
    var detail = data.detail;
    detail.payTool = settlementCommon.parsePayTool(detail.payTool);
    detail.bizType = settlementCommon.parseBizType(detail.bizType);
    // detail.discountType = settlementCommon.parseDiscountType(detail.discountType);
    detail.chargeMerchant = settlementCommon.parseChargeMerchant(detail.chargeMerchant);

    var operateRecords = data.operateRecords;

    operateRecords.forEach(function(obj) {
      obj.chargeMerchant = settlementCommon.parseChargeMerchant(obj.chargeMerchant);
      obj.bizType = settlementCommon.parseBizType(obj.bizType);
      obj.payStatus = settlementCommon.parsePayStatus(obj.payStatus);
      obj.partner = settlementCommon.parsePartner(obj.partner);
      obj.discountType = settlementCommon.parseDiscountType(obj.discountType);
      obj.reconciliationStatus = settlementCommon.parseReconciliationStatus(obj.reconciliationStatus);
      obj.reason = settlementCommon.parseReason(obj.reason);
    });


    var template = $('#detail-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-detail .modal-body').html(html);

    $('#popup-detail').modal('show');

    $('#subsidyType option[value="' + detail.subsidyType + '"]').prop('selected', true);
    $('#subsidyTypeTrd option[value="' + detail.subsidyTypeTrd + '"]').prop('selected', true);
    $('#partner option[value="' + detail.partner + '"]').prop('selected', true);
    $('#reconciliationStatus option[value="' + detail.reconciliationStatus + '"]').prop('selected', true);
    $('#reason option[value="' + detail.reason + '"]').prop('selected', true);
    $('#payStatus option[value="' + detail.payStatus + '"]').prop('selected', true);
    $('#discountType option[value="' + detail.discountType + '"]').prop('selected', true);

    if (checkStatus == 2 || checkStatus == 3 || detail.reconciliationStatus == 4) { // �����/�����ɲ������޸�, ��������״̬Ϊȷ�ϵ�Ҳ�������޸�
      $('.detail-area').addClass('read-only');
      $('.detail-area :input').prop('readonly', true);
      // �����ύ��ť
      $('.edit-submit').hide();
    } else {
      $('#reconciliationStatus option[value=4]').remove();      // ��������ϸ���޸��ｫ����״̬��Ϊ"ȷ��"
    }
  });

  $('#popup-detail form').parsley().validate();
});

// �޸����� "�ύ"
$(document).on('submit', '#popup-detail form', function(e) {
  e.preventDefault();

  if ($('#reconciliationStatus').val() == 1) {
    alert('�յ�����״̬����Ϊ ��δ���ˣ���');
    return false;
  }
  
  if (!$('#popup-detail form').parsley().isValid()) {
    return false;
  }

  var createTime = $('#createTime').val();

  if (!settlementCommon.isValidTime(createTime)) {
    alert('֧��ʱ�������д���, �������޸�');
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
    reason: ($('#reconciliationStatus').val() == 2 ? $('#reason').val() : ''),// ���˲�һ�²���ԭ��
    merchantName: $('#merchantName').val(),
    remarks: $('#remarks').val(),
    subsidyAmountTrd:$('#subsidyAmountTrd').val(),
    subsidyTypeTrd:$('#subsidyTypeTrd').val(),

    discountType: $('#discountType').val(),
    discountName: $('#discountName').val(),
    costCenter: $('#costCenter').val(),
    signNum: $('#signNum').val(),
    discountId: $('#discountId').val(),
    iscountIdTrd: $('#iscountIdTrd').val(),
    discountNameTrd: $('#discountNameTrd').val(),
    costCenterTrd: $('#costCenterTrd').val(),
  };

  $.ajax({
    url: common.API_HOST + 'settlement/acquiring/updateDetail',
    type: 'POST',
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('�ύ�ɹ�!');
      $('#popup-detail').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});


/************************************************* �������� ***************************************************/
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

// �����޸Ķ���״̬
$('body').on('click', '.btn-confirm-status-update', function(e) {
  e.preventDefault();

  var ids = selectedIds();

  if (ids.length === 0) {
    alert('������ѡ��һ����¼!');
    return false;
  }

  var param = {idArr: ids, operateType: '1', reconciliationStatus: $('#targetStatus').val()};

  $.ajax({
    url: common.API_HOST + 'settlement/batchUploadFileRecord/batchOperateStatusByIds',
    type: 'POST',
    traditional: true,
    data: param
  })
  .done(function(res) {
    if (!!~~res.meta.result) {
      alert('�����ɹ�!');
      $('#popup-status-choose').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert(res.meta.msg);
      return false;
    }
  });
});

$('body').on('click', '.batch-status-update', function(e) {
  e.preventDefault();

  var ids = selectedIds();

  if (ids.length === 0) {
    alert('������ѡ��һ����¼!');
    return false;
  }

  $('#targetStatus option:selected').prop('selected', false);
  $('#popup-status-choose').modal('show');
});

$('body').on('click', '.add-order-record', function(e) {
  e.preventDefault();
  $('#popup-balance-in-record').modal('show');
});

$('body').on('click', '.btn-status-update-cancel', function(e) {
  e.preventDefault();
  $('#popup-status-choose').modal('hide');
});

function selectedIds() {
  var ids = [];

  $('#dataTable tbody :checkbox:checked').each(function(index) {
    var id = $(this).closest('tr').data('id');
    ids.push(id);
  });

  return ids;
}
