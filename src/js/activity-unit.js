var common = require('common');

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;

$(function() {
  common.setMenu('activity-unit');
  //set search form
  // setBrand();
  // setCity();
  //data cache
  // getProvince();
  // getService();
});

$('#formActivity').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    id: $.trim( $('#search_id').val() ),
    name: $.trim( $('#search_name').val() ),
    status: $('#search_status').val(),
    budgetStatus: $('#search_budgetStatus').val(),
    // budgetSource: $('#search_budgetSource').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'activity/activityList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    _querying = false;
    console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach( function(value, key) {
          value.statusName = statusName(value.status);
          value.budgetStatusName = budgetStatusName(value.budgetStatus);
          
        });
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});

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

// TODO: 这里有问题, 如果点击查询以后修改了查询条件, 那么再点击页码跳转就会出问题, 不再是当前搜索结果的页码跳转
// 上一页 下一页 页面跳转
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

// 直接输入页码页面跳转
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

/*********************************** utilities method *********************************/

function budgetStatusName(status) {
  var name;
  switch (status) {
    case '1':
    name = '总预算不足';
    break;
    case '2':
    name = '日预算不足';
    break;
    case '3':
    name = '正常';
    break;
    default:
    name = '';
    break;
  }
  
  return name;
}

function statusName(status) {
	var name;
	switch (status) {
		case '1':
			name = '已上线';
			break;
		case '0':
			name = '已下线';
			break;
		case '2':
			name = '计划下线';
			break;
		default:
			name = '';
			break;
	}

	return name;
}

