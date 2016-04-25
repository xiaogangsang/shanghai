var common = require('common');

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _budgetSource;

$(function() {
  common.setMenu('activity-unit');
  //set search form
  // setBrand();
  // setCity();
  //data cache
  // getProvince();
  // getService();

  getBudgetSource();
});

$('#formSearch').on('submit', function(e) {
  e.preventDefault();

  if (true == _querying) {
    return false;
  }
  _querying = true;

  $.ajax({
    url: common.API_HOST + 'coupon/couponList',
    type: 'POST',
    dataType: 'json',
    data: formParams()
  })
  .done(function(res) {
    _querying = false;
    console.log(res);
    if (true == res.meta.result) {
      if (!res.data || res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="20" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
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

// TODO: 新增 / 编辑


// 导出
$('.btn-export').click(function(e) {
  e.preventDefault();
  window.location.href = common.API_HOST + 'coupon/exportCoupons?' + $.param(formParams());
});

// 成本中心的交互逻辑
$('#search_budgetSource').change(handle1stLevelBudgetSourceChange);


/*********************************** logic utilities method *********************************/

// form params

function formParams() {
  var params = {
    id: $.trim( $('#search_id').val() ),
    name: $.trim( $('#search_name').val() ),
    budgetSource: $('#search_2nd_level_budgetSource').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };

  return params;
}


// Get budget source
function getBudgetSource() {
  $.ajax({
    url: common.API_HOST + 'activity/budgetSourceList',
    type: 'POST',
    dataType: 'json'
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
    	_budgetSource = res.data;
    	handle1stLevelBudgetSourceChange();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}

function handle1stLevelBudgetSourceChange() {
	var firstLevelBudget = $('#search_budgetSource').val();

	var secondLevelBudgetSources = _budgetSource[firstLevelBudget];
	var html = '';

	if (secondLevelBudgetSources) {
		for (var i = 0; i < secondLevelBudgetSources.length; i++) {
			var budgetSource = secondLevelBudgetSources[i];
			var option = '<option value="' + budgetSource.id + '">' + budgetSource.sourceName + '</option>';
			html += option;
		}
	}

	$('#search_2nd_level_budgetSource').html(html);
}

