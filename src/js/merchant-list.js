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
var settlementCommon = require('settlementCommon');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var dataCache;

var selectBranch;
var selectGuy;

var _DEBUG = true;

$(function () {

  var branches;
  var guys = {};

  common.init('merchant-list');

  // 初始化涉及的select控件
  // TP方
  $('#search_TP').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  // 商户级别
  $('#search_merchantLevel').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, true));
  // 商户状态
  $('#search_merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantStatus, true));

  // var selectBranch = $('#search_merchantBranch').selectize()[0].selectize;
  selectGuy = $('#search_merchantSubscribeGuy').selectize()[0].selectize;
  selectGuy.disable();
  selectGuy.clearOptions();

  // 提报卡部数据源
  selectBranch = $('#search_merchantBranch').selectize({
    onChange: function(value) {
      // -1: 全部
      if (value === '' || value === '-1') {
        selectGuy.disable();
        selectGuy.clearOptions();
      } else {
        selectGuy.enable();
        selectGuy.clearOptions();

        var guysInBranch = guys[value];

        selectGuy.load(function(callback) {
          callback(guysInBranch);
        });

        selectGuy.setValue(guysInBranch[0].value);
      }
    }, // end onChange
    onFocus: function() {
      // we only get provinces once
      if (branches) {
          return false;
      }

      this.clearOptions();
      this.load(function(callback) {
        if (!_DEBUG) {
          $.ajax({
            url: common.API_HOST + 'security/user/departmentUserAll',
            success: function(dataWeGot) {
                handleDepartmentData(dataWeGot, callback);
            },
            error: function(xhr, status, errorThrown) {
                alert('服务器连接错误!');
            },
            complete: function() {
            }
          }); // end ajax
        } else {
          var dataWeGot = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : [ { "departmentUserAll" : [ { "realName" : "纪蓓琳", "mobile" : null, "userId" : "661920" }, { "realName" : "王璐", "mobile" : null, "userId" : "663997" }, { "realName" : "刘越", "mobile" : null, "userId" : "666479" }, { "realName" : "崔莹", "mobile" : null, "userId" : "664931" }, { "realName" : "王婷", "mobile" : null, "userId" : "661664" }, { "realName" : "卢依吉", "mobile" : null, "userId" : "662331" }, { "realName" : "洪雨", "mobile" : null, "userId" : "662383" }, { "realName" : "王胜男", "mobile" : null, "userId" : "661552" }, { "realName" : "徐艳", "mobile" : null, "userId" : "661387" }, { "realName" : "陈中亚", "mobile" : null, "userId" : "665352" }, { "realName" : "周杨", "mobile" : null, "userId" : "672067" }, { "realName" : "张霖", "mobile" : null, "userId" : "671508" }, { "realName" : "董婷", "mobile" : null, "userId" : "661318" }, { "realName" : "黄壮", "mobile" : null, "userId" : "664385" } ], "department" : "上海客服_业务培训室" }, { "departmentUserAll" : [ { "realName" : "周凌烨", "mobile" : null, "userId" : "660663" }, { "realName" : "梁梦远", "mobile" : null, "userId" : "672324" }, { "realName" : "洪士敏", "mobile" : null, "userId" : "671267" }, { "realName" : "苏靖", "mobile" : null, "userId" : "662737" }, { "realName" : "何好", "mobile" : null, "userId" : "661968" }, { "realName" : "王惠", "mobile" : null, "userId" : "662017" }, { "realName" : "顾文莉", "mobile" : null, "userId" : "664867" }, { "realName" : "刘琪", "mobile" : null, "userId" : "661271" }, { "realName" : "潘若昕", "mobile" : null, "userId" : "672340" }, { "realName" : "李海燕", "mobile" : null, "userId" : "671850" }, { "realName" : "王琳琳", "mobile" : null, "userId" : "663573" }, { "realName" : "胡杨", "mobile" : null, "userId" : "661816" }, { "realName" : "郑超", "mobile" : null, "userId" : "666380" }, { "realName" : "陈君铎", "mobile" : null, "userId" : "663982" }, { "realName" : "高杰", "mobile" : null, "userId" : "664146" }, { "realName" : "王开捷", "mobile" : null, "userId" : "663441" }, { "realName" : "王瑶", "mobile" : null, "userId" : "662037" }, { "realName" : "袁琤琤", "mobile" : null, "userId" : "660874" }, { "realName" : "齐小慧", "mobile" : null, "userId" : "662213" }, { "realName" : "王汇文", "mobile" : null, "userId" : "666838" }, { "realName" : "黄莺", "mobile" : null, "userId" : "671187" }, { "realName" : "徐晨", "mobile" : null, "userId" : "666949" }, { "realName" : "董琦", "mobile" : null, "userId" : "665236" }, { "realName" : "陈珏", "mobile" : null, "userId" : "665517" }, { "realName" : "袁伟良", "mobile" : null, "userId" : "664006" }, { "realName" : "王潇", "mobile" : null, "userId" : "661156" }, { "realName" : "杜丹", "mobile" : null, "userId" : "660453" }, { "realName" : "胡蓉", "mobile" : null, "userId" : "661257" }, { "realName" : "李凌宇", "mobile" : null, "userId" : "671501" } ], "department" : "上海客服_业务管理室" } ] }');
          handleDepartmentData(dataWeGot, callback);
        }
      });// end load
    }// end onFocus
  })[0].selectize;

function handleDepartmentData(dataWeGot, callback) {
  var resCode = dataWeGot.meta.result;
  if (resCode !== '1') {
    alert(dataWeGot.meta.msg);
    return false;
  }

  branches = dataWeGot.data;

  if (branches) {
    for (var i = 0; i < branches.length; ++i) {
      var item = branches[i];
      // 卡部只有名称没有编号
      var value = item['department'];
      item.text = value;
      item.value = value;

      var branchGuys = item['departmentUserAll'];

      for (var j = 0; j < branchGuys.length; ++j) {
        var item = branchGuys[j];
        item.text = item['realName'];
        item.value = item['userId'];
      }

      guys[value] = branchGuys;
    }

    var defaultAll = {text: '全部', value: ''};
    branches.splice(0, 0, defaultAll);

    callback(branches);
  }
}

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
    startTime: $('#search_startTime').val(),
    endTime: $('#search_endTime').val(),
    merchantStatus: $('#search_merchantStatus').val(),
    merchantName: $('#search_merchantName').val(),
    merchantId: $('#search_merchantNo').val(),
    userId: $('#search_merchantSubscribeGuy').val(),
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
      url: common.API_HOST + 'settlement/merchantinfo/merchantinfoList.json',
      type: 'GET',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      handleMerchantData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "total" : 8, "record" : [ { "allocationPeriod" : "12", "merchantContacter" : "zhangsan", "accountName" : "光大银行某某账户", "fixedAllocationDay" : "", "merchantName" : "测试商户", "accountStatus" : "1", "merchantId" : "123456", "allocationDelay" : "2", "allocationDetail" : "1", "startTime" : "2016-05-15", "id" : "5", "department" : "上海客服_高端客户服务一室", "class" : "class com.cmb.o2o.settlement.model.MerchantInfo", "merchantRemark" : "测试", "merchantType" : "1", "auditorName" : "biaoge", "email" : "ceshi@163.com", "bankAccount" : "78978", "bankCode" : "1231212", "merchantStatus" : "2", "allocationRemark" : "测试", "allocationType" : "1", "userName" : "jiangxiao", "userId" : "660587", "auditorId" : "111", "merchantPhone" : "13513513513", "createTime" : "2016-05-23", "allocationDetailReceiver" : "1", "endTime" : "2016-12-31" }, { "allocationPeriod" : "0", "merchantContacter" : "", "accountName" : "", "fixedAllocationDay" : "", "merchantName" : "", "merchantId" : "6", "allocationDelay" : "0", "allocationDetail" : "0", "startTime" : "2016-06-06", "id" : "33", "department" : "上海客服_高端客户服务一室", "class" : "class com.cmb.o2o.settlement.model.MerchantInfo", "merchantRemark" : "", "auditorName" : "", "email" : "", "bankAccount" : "", "bankCode" : "", "merchantStatus" : "1", "allocationRemark" : "", "allocationType" : "0", "userName" : "", "userId" : "660587", "auditorId" : "", "merchantPhone" : "", "createTime" : "2016-06-02", "allocationDetailReceiver" : "0", "endTime" : "2016-11-25" } ] } }');
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

        item.merchantStatus = settlementCommon.parseMerchantStatus(item.merchantStatus);
        item.accountStatus = settlementCommon.parseAccountStatus(item.accountStatus);
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
  selectGuy.clear();
  selectBranch.clear();
});

$('.btn-export').click(function(e) {
  // SETTLEMENT_TODO: export
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

  var merchantId = detailData.merchantId;

if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/merchantinfo/query.json',
      type: 'GET',
      dataType: 'json',
      data: {merchantId: merchantId},
    })
    .done(function (res) {

      if (!!~~res.meta.result) {
        setModal(res.data);
        $('#popup-merchant-detail').modal('show');
      } else {
        alert(res.meta.msg);
      }
    });
  } else {
    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : { "merchantName" : "商户名称", "merchantId" : "商户号", "merchantStatus" : "商户状态", "merchantContacter" : "商户联系人", "merchantPhone" : "商户联系电话", "userName" : "员工姓名", "userId" : "员工编号", "tpId":"tp方", "merchantClass":"商户级别", "merchantType" : "商户类别", "merchantRemark" : "商户备注", "allocationType" : "1", "allocationPeriod" : "拨款周期", "allocationDelay" : "拨款延迟", "fixedAllocationDay" : "28", "allocationDetail" : "是否给拨款明细", "allocationRemark" : "拨款摘要", "allocationDetailReceiver":"拨款明细接收对象", "email":"商户邮箱", "departmentEmail":"卡部邮箱", "accountName" : "账户名", "accountStatus" : "账户状态", "bankAccount" : "银行账号", "bankCode" : "联行行号", "branchName":"开户行", "attachments":[ { "attachmentName":"附件名", "createTime":"上传时间", "fileUrl":"文件路径", "fileId":"文件id" } ] } }');
    setModal(res.data);
    $('#popup-merchant-detail').modal('show');
  }
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
  // 详情时失能所有的select, radio, checkbox
  $('.detail-area select, .detail-area :radio, .detail-area :checkbox').prop('disabled', true);
  // 隐藏所有的button
  $('.detail-area :button').hide();

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

