var common = require('common');
var _channels = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;

$(function() {
  common.setMenu('comment');
  common.setLoginName();
  //set search form
  setChannel();
  // setCity();

  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
  };
  $('#search_beginDate,#search_endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    tel: $.trim( $('#search_tel').val() ),
    channelId: $('#search_channelId').val(),
    filmName: $.trim( $('#search_filmName').val() ),
    content: $.trim( $('#search_content').val() ),
    beginDate: $.trim( $('#search_beginDate').val() ),
    endDate: $.trim( $('#search_endDate').val() ),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'comment/commentList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    _querying = false;
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length <= 0 ) {
        $('#dataTable tbody').html('<tr><td colspan="7" align="center">请点击“查询”按钮！</td></tr>');
        return false;
      }
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total/_pageSize);
      setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
      _(res.data.rows).forEach(function(value, key){
        _(_channels).forEach(function(item){
          if (value.channelId == item.channelId) {
            res.data.rows[key].channelName = item.channelName;
          }
        });
      });
      setTableData(res.data.rows);
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
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此评论吗？')) {
    $.ajax({
      url: common.API_HOST + 'comment/commentDelete',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify([that.data('id')])
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('删除成功！');
        that.fadeOut(500,function(){
          that.remove();
        });
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
  return false;
});
$(document).on('click', '#btn-delete-multi', function(e) {
  e.preventDefault();
  if($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }
  if (window.confirm('确定要删除选中的评论吗？')) {
    var commentIds = [];
    var checked_items = $('.multi-check:checked');
    checked_items.each(function(index, el) {
      commentIds.push( $(this).closest('tr').data('id') );
    });
    $.ajax({
      url: common.API_HOST + 'comment/commentDelete',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(commentIds)
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('删除成功');
        checked_items.each(function(index, el) {
          $(this).closest('tr').fadeOut(1000,function(){
            $(this).remove();
          });
        });
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
  return false;
});
$(document).on('click', '.multi-check-all', function() {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _channels = res.data;
      $.each(_channels, function(index, item) {
        $('#search_channelId').append($('<option></option>').attr('value', item.channelId).text(item.channelName));
      });
      $("#search_channelId").chosen({disable_search_threshold: 6,allow_single_deselect: true});
    }
  });
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}