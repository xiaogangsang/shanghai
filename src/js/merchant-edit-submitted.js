/*
  Author: Ge Liu
  Create: 2016-06-02 17:25:26
  Description: 我提交的商户列表查询页, 页面比较简单, 用到的接口有:
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

// var _bankPageIndex = 1;
// var _bankPageSize = 10;
// var _bankPageTotal = 0;

var _querying = false;
var searchCache = {};
var useCache = false;
var dataCache;
var merchantDataCache;
var bankDataCache;
var merchantAttachments;
var fileIds = new Array();

var _DEBUG = false;

$(function () {

  common.init('merchant-edit-submitted');

  // 初始化涉及的select控件
  $('#search_TP').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  $('#search_merchantLevel').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, true));
  $('#search_merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantInfoStatus, true));

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

/****************************************** 开户行 ******************************************/

  function showModal(e) {

    e.preventDefault();
    var template = $('#select-bank-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, {});

    $('#popup-merchant-bank .modal-body').html(html);
    $('#popup-merchant-bank').modal('show');
  }

  $('#popup-merchant-bank').on('hidden.bs.modal', function (e) {
    $('body').addClass('modal-open');
  })

  $(document).on('click', '#select-bank', showModal);

  // 查询银行网点
  $('body').on('click', '#bank_search', function(e) {
    e.preventDefault();
    requestBankData();
  });

  function requestBankData(){
     var sendData = {
        bankName: $('#bank_Name').val(),
        networkName: $('#networkName').val(),
        cityName: $('#cityName').val(),
        pageSize: _pageSize,
        pageIndex: _pageIndex,
      };

      $.ajax({
        url: common.API_HOST + 'common/bank/list',
        type: 'POST',
        dataType: 'json',
        data: sendData,
      })
      .done(function (res) {
        if (!!~~res.meta.result == true) {
          if (res.data.bankList.rows.length < 1) {
            $('#bank_dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
            $('#bank_pager').html('');
          } else {
            // useCache = true;
            // _pageIndex = res.data.pageIndex;
            var totalRecord = res.data.bankList.total;
            var record = res.data.bankList.rows;

            _pageTotal = Math.ceil(totalRecord / _pageSize);
            setBankPager(totalRecord, _pageIndex, record.length, _pageTotal);

            bankDataCache = record;
            setBankTableData(bankDataCache);
          }
        } else {
          alert('接口错误：' + res.meta.msg);
        }
     });
  }

  function setBankTableData(rows) {
    var data = { rows: rows };
    var template = $('#bank-table-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#bank_dataTable tbody').html(html);
  }

  function setBankPager(total, pageIndex, rowsSize, pageTotal) {
    var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
    var template = $('#bank-pager-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#bank_pager').html(html);
  }

  $('body').on('click', '#bank_pager .prev,.next', function (e) {
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
  requestBankData();
  return false;
});

$('body').on('click', '#bank_pager #btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#bank_pager #pageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#bank_pager #pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  // $('#bank_formSearch').trigger('submit');
  requestBankData();
  return false;
});

$('body').on('click', '#bank_reset', function(e) {
  e.preventDefault();
  $('#bank_Name').val('');
  $('#networkName').val('');
  $('#cityName').val('');
});

$('body').on('click', '.btn-select', function(e) {
  e.preventDefault();

  var index = $(this).parents('tr')[0].sectionRowIndex;
  var sectionData = bankDataCache[index];
  $('#bankName').val(sectionData.name);
  $('#bankCode').val(sectionData.code);

  $('#popup-merchant-bank').modal('hide');
  });



  /***************************************** 选择文件 ******************************************/

  // jQuery way
  // $(document).on('change', '.file-upload', fileChangeHandler);

  // static bind way
  // document.getElementsByClass("file-upload").addEventListener("click", fileChangeHandler);

  /* 
   * jQuery 1.12 动态绑定change事件在firefox8下不起作用, 所以还是用最原始的绑定方式, 
   */
  document.addEventListener("change", function(event) {
    // retrieve an event if it was called manually
    event = event || window.event;

    // retrieve the related element
    var el = event.target || event.srcElement;

    var className = el.className;

    if (className.indexOf('file-upload') > -1) {

      var parent = el.parentNode;
      if (parent.className.indexOf('btn-danger') < 0) {
        event.preventDefault();
        fileChangeHandler(event, el);
        return false;
      }
    }
  });

  function fileChangeHandler(e, el) {
   e.preventDefault();

    var path = $(el).val();
    fileName = path.match(/[^\/\\]*$/)[0];

    var input = $(el).parents('.input-group').find(':text');
    input.val(fileName);

    var uploadFile = $('.file-upload').prop('files')[0];
    var fileName = $('.file-upload').prop('files')[0].name;

    var formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('imageFileName', fileName);
    var merchantId = $('#merchantNo').val();
    formData.append('merchantId',merchantId);
     if (uploadFile) {

        $('#hud-overlay').show();

        $.ajax({
         url: common.API_HOST + 'settlement/merchantAttachment/uploadAttachment',
         type: 'POST',
         contentType: false,
         processData: false,
         data: formData
       })
       .done(function(res) {
           $('#hud-overlay').hide();
           if (!!~~res.meta.result == true) {
               alert('上传成功！');
               var $parentSpan = $(el).parent();
              $parentSpan.find('span').text('删除文件');
              $parentSpan.removeClass('btn-default');
              $parentSpan.addClass('btn-danger');

              fileIds.push(res.data.fileId);
              var fileId = res.data.fileId;
              $parentSpan[0].setAttribute("id", fileId);

           } else {
              alert('接口错误：' + res.meta.msg);
              var $parentSpan = $(el).parent();
              $parentSpan.parent().parent().remove()
           }
           var template = $('#file-upload-template').html();
           Mustache.parse(template);
           var html = Mustache.render(template);
           $('#attachments-container').append(html);
       });
      } else {
          alert('请先选择文件');
      }

  }

  $('body').on('click', '.btn-file', function(e) {
    if ($(this).hasClass('btn-danger')) {
      var $div = $(this).closest('.row');
      var fileId = $div.context.id;

      var sendData = {
        id: fileId,
        merchantId:$('#merchantNo').val(),
      };

      $.ajax({
        url: common.API_HOST + 'settlement/merchantAttachment/delete',
        type: 'POST',
        dataType: 'json',
        data: sendData,
      })
      .done(function (res) {
        if (!!~~res.meta.result == true) {
          $.each(fileIds,function(index,item){ 
            if(item==fileId){
               fileIds.splice(index,1);
            }
          });
          $div.remove();
        } else {
          alert('接口错误：' + res.meta.msg);
        }
     });
      return false;
    }
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
    periodStart: $('#search_startTime').val(),
    periodEnd: $('#search_endTime').val(),
    merchantStatus: $('#search_merchantStatus').val(),
    merchantName: $('#search_merchantName').val(),
    merchantId: $('#search_merchantNo').val(),
    // userName: $('#search_merchantSubscribeGuy').val(),
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
      url: common.API_HOST + 'settlement/merchantinfo/merchantinfoList',
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
    if (res.data.result.record.length < 1) {
      $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      $('#pager').html('');
    } else {
      useCache = true;
      // _pageIndex = res.data.pageIndex;
      var totalRecord = res.data.result.total;
      var record = res.data.result.record;
      dataCache = res.data.result.record;

      _pageTotal = Math.ceil(totalRecord / _pageSize);
      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

      _(record).forEach(function (item) {

        item.isOffline = (item.merchantStatus == 3 || item.merchantStatus == 4);
        item.isOnline = (item.merchantStatus == 2);

        item.isDisabled = (item.accountStatus == 2 && item.merchantStatus == 2);
        item.isEnabled = (item.accountStatus == 1 && item.merchantStatus == 2);

        item.merchantStatus = settlementCommon.parseMerchantStatus(item.merchantStatus);
        item.accountStatus = settlementCommon.parseAccountStatus(item.accountStatus);
        item.tpId = settlementCommon.parseTP(item.tpId);
        item.merchantClass = settlementCommon.parseMerchantLevel(item.merchantClass);
      });
      setTableData(record);
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

$('.btn-export').click(function(e) {

  e.preventDefault();

  if ($('#dataTable tr td').length < 2) {
    alert('请先查询再导出!');
    return false;
  }

  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/merchantinfoListExport',
    type: 'POST',
    dataType: 'json',
    data: searchCache,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + res.data.fileUrl;
      // alert('您的申请已提交，系统正在为您导出数据，需要约15分钟，\n请至下载列表查看并下载导出结果。\n导出的数据仅保留3天，请及时查看并下载。');
    } else {
      alert(res.meta.msg);
    }
  });
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

function setModal(data) {

  var detailData = data.merchantInfo;
  var attachments = data.merchantAttachments;
  // attachments.forEach(function (item) {
  //   filepath = item.attachmentName;
  //   var extStart = filepath.lastIndexOf(".");
  //   var ext=filepath.substring(extStart,filepath.length).toUpperCase();
  //   item.isShow = !(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG");
  // });
  detailData.attachments = attachments;
  merchantAttachments = data.merchantAttachments;

  var template = $('#detail-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, detailData);
  $('#popup-merchant-detail .modal-body').html(html);

  formatPopupUI(detailData);
}

function formatPopupUI(detailData) {

  // 设置商户级别和TP方的的选择
  $('#detail-merchantClass').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, false));
  $('#detail-merchantClass option[value="' + detailData.merchantClass + '"]').prop('selected', true);
  $('#detail-tpId').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  $('#detail-tpId option[value="' + detailData.tpId + '"]').prop('selected', true);
  $('#detail-merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantStatus, true));
  $('#detail-merchantStatus option[value="' + detailData.merchantStatus + '"]').prop('selected', true);
  $('#detail-merchantStatus').attr('disabled', 'true');
  $('#select-fixed-allocation-day option[value="' + detailData.fixedAllocationDay + '"]').prop('selected', true);

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
    if (allocationDetail == '1') {
      $('.send-allocation-detail-container').show();
    } else if (allocationDetail == '0') {
      $('.send-allocation-detail-container').hide();
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

function setAllocationDetailReceiver(detailData){
    if (detailData.allocationDetailReceiver == 3) {
      $('#allocationDetailReceiver1').prop('checked', true);
      $('#allocationDetailReceiver2').prop('checked', true);
      $('.merchant-email').show();
      $('.branch-email').show();
      $('#email').attr('required', 'true');
      $('#cardEmail').attr('required', 'true');

    } else if (detailData.allocationDetailReceiver == 1) {
      $('#allocationDetailReceiver1').prop('checked', true);
      $('.merchant-email').show();
      $('.branch-email').hide();
      $('#email').attr('required', 'true');
      $("#cardEmail").removeAttr("required");

    } else if (detailData.allocationDetailReceiver = 2) {
      $('#allocationDetailReceiver2').prop('checked', true);
      $('.branch-email').show();
      $('.merchant-email').hide();
      $("#email").removeAttr("required");
      $('#cardEmail').attr('required', 'true');
    }
    settlementCommon.addStarMark();
}

/****************************************** 账户和商户操作 **********************************************/
// 编辑商户
$('#dataTable').on('click', '.btn-edit', function (e) {

  e.preventDefault();

  var rowIndex = $(this).closest('tr').prevAll().length;
  var detailData = dataCache[rowIndex];
  var merchantId = detailData.merchantId;

  if (!_DEBUG) {
      $.ajax({
        url: common.API_HOST + 'settlement/merchantinfo/query',
        type: 'POST',
        dataType: 'json',
        data: {merchantId: merchantId},
      })
      .done(function (res) {

        if (!!~~res.meta.result) {
          setModal(res.data);
          // tpl里requied 手动调用加星
          settlementCommon.addStarMark();
          $('#edit-merchantNoTitle').prop('hidden', false);
          $('#popup-merchant-detail').modal('show');
          // 设置发送对象
          setAllocationDetailReceiver(res.data.merchantInfo);
          $('#edit-merchantNo').text(detailData.merchantId);
          $('#detail_formSearch').parsley();
          var template = $('#file-upload-template').html();
          Mustache.parse(template);
          var html = Mustache.render(template);
          $('#attachments-container').append(html);
          // tpl里requied 手动调用加星
          settlementCommon.addStarMark();
        } else {
          alert(res.meta.msg);
        }
      });
    } else {
      var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "merchantName" : "商户名称", "merchantId" : "商户号", "merchantStatus" : "商户状态", "merchantContacter" : "商户联系人", "merchantPhone" : "商户联系电话", "userName" : "员工姓名", "userId" : "员工编号", "tpId":"1", "merchantClass":"1", "merchantType" : "商户类别", "merchantRemark" : "商户备注", "allocationType" : "2", "allocationPeriod" : "28", "allocationDelay" : "拨款延迟", "fixedAllocationDay" : "28", "allocationDetail" : "是否给拨款明细", "allocationRemark" : "拨款摘要", "allocationDetailReceiver":"1", "email":"商户邮箱", "departmentEmail":"卡部邮箱", "accountName" : "账户名", "accountStatus" : "账户状态", "bankAccount" : "银行账号", "bankCode" : "联行行号", "branchName":"开户行", "attachments":[ { "attachmentName":"附件名", "createTime":"上传时间", "fileUrl":"文件路径", "fileId":"文件id" } ] } }');
      setModal(res.data);
      $('#popup-merchant-detail').modal('show');
    }

});

// 删除商户
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  var param = {merchantId: merchantId};

  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/delete.json',
    type: 'POST',
    data: param,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert(res.meta.msg);
    } else {
      alert(res.meta.msg);
    }
  });
});

// 下线商户
$('#dataTable').on('click', '.btn-offline', function(e) {
  e.preventDefault();

  var rowIndex = $(this).closest('tr').prevAll().length;
  var detailData = dataCache[rowIndex];

  var merchantStatus;
  if (detailData.merchantStatus == '待审核') {
    merchantStatus = 5;
  } else if (detailData.merchantStatus == '审核驳回') {
    merchantStatus = 4;
  } else if (detailData.merchantStatus == '已下线') {
    merchantStatus = 3;
  } else if (detailData.merchantStatus == '已删除') {
    merchantStatus = 6;
  } else if (detailData.merchantStatus == '已上线') {
    merchantStatus = 2;
  }

  var sendData = {
    merchantId: detailData.merchantId,
    merchantStatus: merchantStatus,
  };

  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/offline.json',
    type: 'POST',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert(res.meta.msg);
    } else {
      alert(res.meta.msg);
    }
  });
});

// 查看商户详情
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();

  var rowIndex = $(this).closest('tr').prevAll().length;
  var detailData = dataCache[rowIndex];
  var merchantId = detailData.merchantId;

  if (!_DEBUG) {
      $.ajax({
        url: common.API_HOST + 'settlement/merchantinfo/query',
        type: 'POST',
        dataType: 'json',
        data: {merchantId: merchantId},
      })
      .done(function (res) {

        if (!!~~res.meta.result) {
          setModal(res.data);

          // make all the input lable-like
          $('.detail-area :input').prop('readonly', true);
          // 详情时失能所有的select, radio, checkbox
          $('.detail-area select, .detail-area :radio, .detail-area :checkbox').prop('disabled', true);
          // 隐藏所有的button
          $('.detail-area :button').hide();
          $("#uploadBtnDiv").prop('hidden', true);
          $("#commitBtnDiv").prop('hidden', true);
          $('#popup-merchant-detail').modal('show');
          // 设置发送对象
          setAllocationDetailReceiver(res.data.merchantInfo);

        } else {
          alert(res.meta.msg);
        }
      });
    } else {
      var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "merchantName" : "商户名称", "merchantId" : "商户号", "merchantStatus" : "商户状态", "merchantContacter" : "商户联系人", "merchantPhone" : "商户联系电话", "userName" : "员工姓名", "userId" : "员工编号", "tpId":"1", "merchantClass":"1", "merchantType" : "商户类别", "merchantRemark" : "商户备注", "allocationType" : "2", "allocationPeriod" : "28", "allocationDelay" : "拨款延迟", "fixedAllocationDay" : "28", "allocationDetail" : "是否给拨款明细", "allocationRemark" : "拨款摘要", "allocationDetailReceiver":"1", "email":"商户邮箱", "departmentEmail":"卡部邮箱", "accountName" : "账户名", "accountStatus" : "账户状态", "bankAccount" : "银行账号", "bankCode" : "联行行号", "branchName":"开户行", "attachments":[ { "attachmentName":"附件名", "createTime":"上传时间", "fileUrl":"文件路径", "fileId":"文件id" } ] } }');
      setModal(res.data);
      $('#popup-merchant-detail').modal('show');
    }
});

// 账户停用
$('#dataTable').on('click', '.btn-disable-account', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  var param = {merchantId: merchantId};

  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/suspendAccount.json',
    type: 'GET',
    data: param,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert(res.meta.msg);
    } else {
      alert(res.meta.msg);
    }
  });
});

// 启用账户
$('#dataTable').on('click', '.btn-enable-account', function(e) {
  e.preventDefault();
  var merchantId = $(this).data('merchantid');

  var param = {merchantId: merchantId};

  $.ajax({
    url: common.API_HOST + 'settlement/merchantinfo/activateAccount.json',
    type: 'POST',
    data: param,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert(res.meta.msg);
    } else {
      alert(res.meta.msg);
    }
  });
});


$('body').on('click','.submit',function(e){
  e.preventDefault();

  // 手动调用parsley验证，如果把button写在form里面则会自动触发验证。
      $('#detail_formSearch').parsley().validate();

      if (!$('#detail_formSearch').parsley().isValid()) {
        return false;
      }

      var merchantType = '';
      if ($('#merchantTypeCheckbox').prop('checked')) {
            merchantType = 1;
          }

      var allocationDetail = '';
      if ($('#inlineCheckbox1').prop('checked')) {
        allocationDetail = 1;
      } else if ($('#inlineCheckbox2').prop('checked')) {
      allocationDetail = 0;
      }

      var allocationDetailReceiver = '';
      if ($('#allocationDetailReceiver1').prop('checked') && $('#allocationDetailReceiver2').prop('checked')) {
        allocationDetailReceiver = 3;
      } else if ($('#allocationDetailReceiver1').prop('checked')) {
      allocationDetailReceiver = 1;
      } else if ($('#allocationDetailReceiver2').prop('checked')) {
      allocationDetailReceiver = 2;
      } else {
      allocationDetailReceiver = 4;
      }

    var sendData = {
    // 商户名称
     merchantName: $('#merchantName').val(),
     // 商户号
     merchantId: $('#merchantNo').val(),
     // 商户状态
     merchantStatus: $('#detail-merchantStatus').val(),
     // 商户联系人
     merchantContacter: $('#merchantContacter').val(),
     // 联系电话
     merchantPhone: $('#merchantPhone').val(),
     // 员工姓名
     userName: $('#userName').val(),
     // 员工编号
     userId: $('#userId').val(),
     // 商户级别
     merchantClass: $('#merchantClass').val(),
     // 商户类别
     merchantType: $('#merchantType').val(),
     // TP方
     tpId: $('#detail-tpId').val(),
     // 商户类别
     merchantType: merchantType,
     // 商户备注信息
     merchantRemark: $('#merchantRemark').val(),
     // 拨款模式
     allocationType: $('#select-allocation-type').val(),
     // 拨款周期
     allocationPeriod: $('#allocationPeriod').val(),
     // 拨款延迟天数
     allocationDelay: $('#allocationDelay').val(),
     // 拨款摘要
     allocationRemark: $('#allocationRemark').val(),
     // 是否发送拨款明细
     allocationDetail: allocationDetail,
     // 发送对象
     allocationDetailReceiver: allocationDetailReceiver,
     // 商户E-mail
     email: $('#email').val(),
     // 卡部E-mail
     departmentEmail: $('#cardEmail').val(),
     // 账户名
     accountName: $('#accountName').val(),
     // 账号
     bankAccount: $('#bankAccount').val(),
     // 开户行
     branchName: $('#bankName').val(),
     // 银行行号
     bankCode: $('#bankCode').val(),
     // 上传文件
     // fileIds: fileIds,

    };

  $.ajax({
     url: common.API_HOST + 'settlement/merchantinfo/editMerchant.json',
     type: 'POST',
     data: sendData,
   })
   .done(function (res) {
     if (res.meta.result == true) {
      $('#formSearch').trigger('submit');
       alert('保存成功！');
      $('#popup-merchant-detail').modal('hide');

     } else {
       alert('接口错误：' + res.meta.msg);
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
    $('#allocationPeriod').attr('required', 'true');
    $('#allocationDelay').attr('required', 'true');
    $("#select-fixed-allocation-day").removeAttr("required");
  } else if (value == '2') {
    $('.allocation-type1-input').hide();
    $('.allocation-type2-input').show();
    $('#select-fixed-allocation-day').attr('required', 'true');
    $("#allocationPeriod").removeAttr("required");
    $("#allocationDelay").removeAttr("required");
  }
  // tpl里requied 手动调用加星
  settlementCommon.addStarMark();
});

// 是否发送拨款明细
$('.modal').on('change', ':radio[name="allocation-detail-input"]', function(e) {
  if ($(this).val() == '1') {
    $('.send-allocation-detail-container').show();
    $('#allocationDetailReceiver1').attr('required', 'true');
    $('#allocationDetailReceiver2').attr('required', 'true');
  } else if ($(this).val() == '0') {
    $('.send-allocation-detail-container').hide();
    $('#allocationDetailReceiver1').removeAttr("required");
    $('#allocationDetailReceiver2').removeAttr("required");
  }
    // tpl里requied 手动调用加星
    settlementCommon.addStarMark
});


$('.modal').on('click', '.download', function(e) {
  var fileUrl = $(this).data('fileurl');
  // alert('文件路径为 ' + fileUrl + ', 本接口尚未实现.');
  var rowIndex = $(this).closest('tr').prevAll().length;
  var attachment = merchantAttachments[rowIndex];
  window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoadById?id=' + attachment.id;

});

$('.modal').on('click', '.lookMore', function(e) {
  var fileUrl = $(this).data('fileurl');

  var rowIndex = $(this).closest('tr').prevAll().length;
  var attachment = merchantAttachments[rowIndex];
  $('#showImg').src = common.API_HOST + 'settlement/merchantAttachment/downLoadById?id=' + attachment.id;;
  // src="http://www.xker.com/xkerfiles/allimg/1412/143420O50-5.jpg"
  $('#checkImage').modal('show');
});

// 发送对象
  $('body').on('change', ':checkbox[name="send-to"]', function(e) {
    if ($(this).val() == '1') {
      if ($(this).prop('checked')) {
        $('.merchant-email').show();
        $('#email').attr('required', 'true');
      } else {
        // $("#email").rules("remove",'required');
        $("#email").removeAttr("required");
        $('.merchant-email').hide();
      }
    } else if ($(this).val() == '2') {
      if ($(this).prop('checked')) {
        $('.branch-email').show();
        $('#cardEmail').attr('required', 'true');
      } else {
        // $("#cardEmail").rules("remove",'required');
        $("#cardEmail").removeAttr("required");
        $('.branch-email').hide();
      }
    }
    // tpl里requied 手动调用加星
    settlementCommon.addStarMark();
  });









