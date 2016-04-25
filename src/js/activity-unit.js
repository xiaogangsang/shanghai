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
    url: common.API_HOST + 'activity/activityList',
    type: 'POST',
    dataType: 'json',
    data: formParams()
  })
  .done(function(res) {
    _querying = false;
    console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="20" align="center">查不到相关数据，请修改查询条件！</td></tr>');
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach( function(value, key) {
          value.status = parseInt(value.status);
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

// 上下线
$('#dataTable').on('click', '.btn-status', function(e) {
  e.preventDefault();

  var btn = $(this);

  var currentStatus = btn.data('status');
  var  id = btn.closest('tr').data('id');

  setOnlineOffline([id], currentStatus == '1' ? 0 : 1);
});

$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  if (window.confirm('确定要删除此计划吗？')) {
    $.ajax({
      url: common.API_HOST + 'activity/deleteActivity',
      type: 'POST',
      dataType: 'json',
      data: {id: tr.data('id')}
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('删除成功！');
        tr.fadeOut(500,function(){
          tr.remove();
        });
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
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



// 批量操作 - 批量上线
$('.btn-batch-online').click(function(e) {
  e.preventDefault();
  setOnline(selectedActivityIds());
});

// 批量操作 - 批量下线
$('.btn-batch-offline').click(function(e) {
	e.preventDefault();
	setOffline(selectedActivityIds());
});

// 批量操作 - 批量选中/取消选中
$('.toggle-selection-all').change(function(e) {
	e.preventDefault();
	var isChecked = $(this).is(':checked');

	if (isChecked) {
		$(':checkbox:not(:checked)').prop('checked', true);
	} else {
		$(':checkbox:checked').prop('checked', false);
	}
});

$('body').on('change', 'tr > td :checkbox', function(e) {
	e.preventDefault();

	var isChecked = $(this).is(':checked');

	if (!isChecked) {
		$('.toggle-selection-all').prop('checked', false);
	}
});


// 导出
$('.btn-export').click(function(e) {
  e.preventDefault();
  window.location.href = common.API_HOST + 'activity/exportActivities?' + $.param(formParams());
});

// 成本中心的交互逻辑
$('#search_budgetSource').change(handle1stLevelBudgetSourceChange);

/*********************************** logic utilities method *********************************/

// form params

function formParams() {
  var params = {
    id: $.trim( $('#search_id').val() ),
    name: $.trim( $('#search_name').val() ),
    status: $('#search_status').val(),
    budgetStatus: $('#search_budgetStatus').val(),
    budgetSource: $('#search_2nd_level_budgetSource').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };

  return params;
}

// online
function setOnline(activities) {
	setOnlineOffline(activities, 1);
}

// offline
function setOffline(activities) {
	setOnlineOffline(activities, 0);
}

// activities online / offline
function setOnlineOffline(activities, targetStatus){

  if (activities.length == 0) {
    alert('请先选择活动后再操作');
  	return;
  }

  var requestURL = (targetStatus == 1 ? 'activity/activityOnline' : 'activity/activityOffline')

  $.ajax({
    url: common.API_HOST + requestURL,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(activities)
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      $("#formSearch").trigger('submit');
      alert('操作成功!');
    } else {
      alert("接口错误："+res.meta.msg);
    }
  });
}

function selectedActivityIds() {
	var selectedActivities = [];
	$(':checkbox:checked').each(function(index) {
		var id = $(this).closest('tr').data('id');
		selectedActivities.push(id);
	});

	return selectedActivities;
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


/*********************************** sugar utilities method *********************************/

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

