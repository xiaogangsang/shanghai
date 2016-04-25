var common = require('common');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var searchCache = {};
var useCache = false;

$(function() {
  common.setMenu('record-coupon');
  getChannel();
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    couponCode: $.trim( $('#search_couponCode').val() ),
    pageSize: _pageSize
  };
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }
  sendData.pageIndex = _pageIndex;
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'usedCouponLog/List',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        return false;
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        // _(res.data.rows).forEach(function(item){
        //   _(_versions).forEach(function(value, key){
        //     if (value.id == item.dimen) {
        //       item.dimenName = value.name;
        //     }
        //   });
        // });
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});

$('#pager').on('click', '.prev,.next', function(e) {
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
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $("#formSearch").trigger('submit');
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
  return false;
});

function getChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：'+res.meta.msg);
    }
  });
}
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}