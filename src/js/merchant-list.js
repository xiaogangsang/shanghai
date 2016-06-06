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

var selectBranch;
var selectGuy;

$(function () {

  var branches;
  var guys = {};

  common.liquidationInit('merchant-list');

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
          $.ajax({
              url: '/movie-ops/security/user/departmentUserAll',
              success: function(dataWeGot) {
                  //var dataWeGot = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" : [ { "departmentUserAll" : [ { "realName" : "纪蓓琳", "mobile" : null, "userId" : "661920" }, { "realName" : "王璐", "mobile" : null, "userId" : "663997" }, { "realName" : "刘越", "mobile" : null, "userId" : "666479" }, { "realName" : "崔莹", "mobile" : null, "userId" : "664931" }, { "realName" : "王婷", "mobile" : null, "userId" : "661664" }, { "realName" : "卢依吉", "mobile" : null, "userId" : "662331" }, { "realName" : "洪雨", "mobile" : null, "userId" : "662383" }, { "realName" : "王胜男", "mobile" : null, "userId" : "661552" }, { "realName" : "徐艳", "mobile" : null, "userId" : "661387" }, { "realName" : "陈中亚", "mobile" : null, "userId" : "665352" }, { "realName" : "周杨", "mobile" : null, "userId" : "672067" }, { "realName" : "张霖", "mobile" : null, "userId" : "671508" }, { "realName" : "董婷", "mobile" : null, "userId" : "661318" }, { "realName" : "黄壮", "mobile" : null, "userId" : "664385" } ], "department" : "上海客服_业务培训室" }, { "departmentUserAll" : [ { "realName" : "周凌烨", "mobile" : null, "userId" : "660663" }, { "realName" : "梁梦远", "mobile" : null, "userId" : "672324" }, { "realName" : "洪士敏", "mobile" : null, "userId" : "671267" }, { "realName" : "苏靖", "mobile" : null, "userId" : "662737" }, { "realName" : "何好", "mobile" : null, "userId" : "661968" }, { "realName" : "王惠", "mobile" : null, "userId" : "662017" }, { "realName" : "顾文莉", "mobile" : null, "userId" : "664867" }, { "realName" : "刘琪", "mobile" : null, "userId" : "661271" }, { "realName" : "潘若昕", "mobile" : null, "userId" : "672340" }, { "realName" : "李海燕", "mobile" : null, "userId" : "671850" }, { "realName" : "王琳琳", "mobile" : null, "userId" : "663573" }, { "realName" : "胡杨", "mobile" : null, "userId" : "661816" }, { "realName" : "郑超", "mobile" : null, "userId" : "666380" }, { "realName" : "陈君铎", "mobile" : null, "userId" : "663982" }, { "realName" : "高杰", "mobile" : null, "userId" : "664146" }, { "realName" : "王开捷", "mobile" : null, "userId" : "663441" }, { "realName" : "王瑶", "mobile" : null, "userId" : "662037" }, { "realName" : "袁琤琤", "mobile" : null, "userId" : "660874" }, { "realName" : "齐小慧", "mobile" : null, "userId" : "662213" }, { "realName" : "王汇文", "mobile" : null, "userId" : "666838" }, { "realName" : "黄莺", "mobile" : null, "userId" : "671187" }, { "realName" : "徐晨", "mobile" : null, "userId" : "666949" }, { "realName" : "董琦", "mobile" : null, "userId" : "665236" }, { "realName" : "陈珏", "mobile" : null, "userId" : "665517" }, { "realName" : "袁伟良", "mobile" : null, "userId" : "664006" }, { "realName" : "王潇", "mobile" : null, "userId" : "661156" }, { "realName" : "杜丹", "mobile" : null, "userId" : "660453" }, { "realName" : "胡蓉", "mobile" : null, "userId" : "661257" }, { "realName" : "李凌宇", "mobile" : null, "userId" : "671501" } ], "department" : "上海客服_业务管理室" } ] }');
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

                    var defaultAll = {text: '全部', value: '-1'};
                    branches.splice(0, 0, defaultAll);

                    callback(branches);
                  }
              },
              error: function(xhr, status, errorThrown) {
                  alert('服务器连接错误!');
              },
              complete: function() {
              }
          });
      });
    }// end onFocus
  })[0].selectize;

  //set search form
  // setChannel();

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
    userName: $('#search_merchantSubscribeGuy').val(),
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

  $.ajax({
    url: 'movie-ops/settlement/merchantinfo/merchantinfoList.json',
    type: 'GET',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.merchantInfoQueryListResult.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {

    var res = $.parseJSON('{ "meta" : { "result" : "1", "msg" : "操作成功" }, "data" :{"merchantInfoQueryListResult":[{"accountStatus":1,"department":"卡中心","createTime":"2016-12-08","id":35,"merchantId":"8","merchantName":"Tomcat","merchantStatus":5,"userId":"","userName":""},{"accountStatus":1,"department":"卡中心","createTime":1464871880000,"id":38,"merchantId":"9","merchantName":"tomcat","merchantStatus":5,"userId":"","userName":""}],"total":"5"} }');
        useCache = true;
        // _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.merchantInfoQueryListResult.length, _pageTotal);

        _(res.data.merchantInfoQueryListResult).forEach(function (item) {

          item.merchantStatus = parseMerchantStatus(item.merchantStatus);
          item.accountStatus = parseMerchantStatus(item.accountStatus);
        });

        dataCache = res.data.merchantInfoQueryListResult;
        setTableData(dataCache);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

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
  // TODO: export
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

function parseMerchantStatus(merchantStatus) {

  var map = {'1' : '草稿', '2' : '已上线', '3' : '已下线', '4' : '审核驳回', '5' : '待审核', '6' : '已删除'};

  return map[merchantStatus];
}

function parseAccountStatus(accountStatus) {
  var map = {'1' : '正常', '2' : '停用'};

  return map[accountStatus];
}

