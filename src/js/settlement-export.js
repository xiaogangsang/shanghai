/*
  导出
  三处导出(收单, 出货和拨款)统一处理
  Ge Liu
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');

var type;
var map = {'1' : 'balance-in-export', '2' : 'balance-out-export', '3' : 'money-out-export'};

var _DEBUG = true;

$(function() {

  var parts = window.location.href.split('/');

  var htmlName = parts[parts.length - 1];

  if (htmlName.indexOf('balance-in') > -1) {
    type = 1;
  } else if (htmlName.indexOf('balance-out') > -1) {
    type = 2;
  } else if (htmlName.indexOf('money-out') > -1) {
    type = 3;
  }

  common.init(map[type]);

  var param = {fileType : type};

  if (!_DEBUG) {
    $.ajax({
      url: common.API_HOST + 'settlement/settlementExportFileRecord/list',
      type: 'GET',
      dateType: 'json',
      data: param
    }).done(function(res) {
      handleData(res);
    });
  } else {
    var res = $.parseJSON('{ "meta": { "result": "1", "msg": "操作成功" }, "data": [ { "fileName": "文件名", "fileUrl": "文件url", "fileType": "1", "period": "时间区间", "createTime": "申请时间", "updateTime": "完成时间", "fileStatus": "2" } ] }');
    handleData(res);
  }
});

function handleData(res) {

  if (res.meta.result == 0) {
    alert(res.meta.msg);
  } else {
    var rows = res.data;

    _(rows).forEach(function(item) {
      item.canDownload = (item.fileStatus == 2);
      item.fileType = settlementCommon.parseFileType(item.fileType);
      item.fileStatus =  settlementCommon.parseFileStatus(item.fileStatus);
    });

    var data = { rows: rows };
    var template = $('#table-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#dataTable tbody').html(html);
  }
}

$('#dataTable').on('click', '.download', function(e) {

  e.preventDefault();

  var url = $(this).data('url');
  window.location.href = common.API_HOST + 'settlement/merchantAttachment/downLoad?fileUrl=' + url;
});
