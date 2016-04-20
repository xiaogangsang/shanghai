// $('.unit-limitation th').on('click', '.btn', function(e) {
//   e.preventDefault();
//   if(!!$(this).attr('id') ) {
//     var eleName = $(this).attr('id').substring(4);
//     $('#'+eleName).modal('show');
//   }
// });
require('datetimepicker');
var common = require('common');
// var _brands = {};
// var _cities = [];
// var _provinces = {};
// var _areas = [];
// var _services = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;

$(function() {
  common.setMenu('activity-plan');
  //set search form
  // setBrand();
  // setCity();
  //data cache
  // getProvince();
  // getService();
});

$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    id: $.trim( $('#search_id').val() ),
    name: $.trim( $('#search_name').val() ),
    status: $('#search_status').val(),
    budgetStatus: $('#search_budgetStatus').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'plan/planList',
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
          value.status = parseInt( value.status );
          value.statusName = value.status == 1 ? '已上线' : '已下线';
          switch (value.budgetStatus) {
            case '1':
            value.budgetStatusName = '总预算不足';
            break;
            case '2':
            value.budgetStatusName = '日预算不足';
            break;
            case '3':
            value.budgetStatusName = '正常';
            break;
            default:
            value.budgetStatusName = '';
            break;
          }
        });
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-status', function(e) {
  e.preventDefault();
  var btn = $(this);
  var sendData = {
    id: btn.closest('tr').data('id'),
    status: btn.data('status') == 1 ? 0 : 1
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'plan/updatePlanStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      var statusName = sendData.status == 1 ? '上线' : '下线';
      var btnStatusName = sendData.status == 1 ? '下线' : '上线';
      btn.data('status',sendData.status).html(btnStatusName);
      btn.closest('tr').find('td:nth-child(3)').html('已'+statusName);
      alert(statusName+'操作成功!');
    } else {
      alert("接口错误："+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  if (window.confirm('确定要删除此计划吗？')) {
    $.ajax({
      url: common.API_HOST + 'plan/deletePlan',
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


