'use strict;'

var common = require('common');
var _brands = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;
var _screenType = [
  { id: 4, name: '普通' },
  { id: 1, name: 'IMAX' },
  { id: 2, name: 'DMAX' },
  { id: 3, name: '巨幕' },
];
var _hallType = [
  { id: 3, name: '普通' },
  { id: 1, name: '4D' },
  { id: 2, name: '5D' },
];
var _bindCinemaName = '';

$(function () {
  common.init('hall');

  //set search form
  setBrand();

  $('#formSearch').trigger('submit');
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
    brandId: $.trim($('#search_brandId').val()),
    cityName: $.trim($('#search_cityName').val()),
    storeName: $('#search_storeName').val(),
    status: $('#search_status').val(),
    relation: $('#search_relation').val(),
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
    url: common.API_HOST + 'hall/standard/list',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.data.length <= 0) {
        $('#dataTable tbody').html('<tr><td colspan="12" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.data.length, _pageTotal);
        _(res.data.data).forEach(function (item) {
          item.relation = item.relation == 1 ? '已关联' : '未关联';
        });

        setTableData(res.data.data);
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

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  $('#formSearch').trigger('submit');
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ($('#pageNo').val() == '') {
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

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var $tr = $(this).closest('tr');
  var $btn = $(this);
  var sendData = {
    hallIdList: $tr.data('id'),
  };
  var changeToStatus = $btn.data('status') == 1 ? 0 : 1;
  var statusName = changeToStatus ? '上线' : '下线';
  var ajaxUrl = changeToStatus ? 'hall/standard/online' : 'hall/standard/offline';
  $.ajax({
    url: common.API_HOST + ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $btn.data('status', changeToStatus).html(changeToStatus ? '下线' : '上线');
      $tr.find('td:nth-child(10)').html('已' + statusName);
      $('#formSearch').trigger('submit');
      alert(statusName + '操作成功!');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'hall/standard/get',
    type: 'POST',
    dataType: 'json',
    data: { hallId: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      setModal(res.data);
      $('#popup-hall-form').modal('show');
      $('#popup-hall-form form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  setModal(false);
  $('#popup-hall-form').modal('show');
  $('#popup-hall-form form').parsley();
});

$(document).on('click', '#btn-online-multi,#btn-offline-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个！');
    return false;
  }

  var onlineStatusName = $(this).attr('id') == 'btn-online-multi' ? '上线' : '下线';
  if (window.confirm('确定要' + onlineStatusName + '选中的影厅吗？')) {
    var changeToStatus = $(this).attr('id') == 'btn-online-multi' ? 1 : 0;
    var ids = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function () {
      ids.push($(this).closest('tr').data('id'));
    });

    var sendData = {
      hallIdList: ids.join(','),
    };
    var ajaxUrl = changeToStatus == 1 ? 'hall/standard/online' : 'hall/standard/offline';
    $.ajax({
      url: common.API_HOST + ajaxUrl,
      type: 'POST',
      dataType: 'json',
      data: sendData,
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        $checkedItems.each(function (index, el) {
          $(this).closest('tr').find('td:nth-child(10)').html('已' + onlineStatusName);
          var buttonText = changeToStatus == 1 ? '下线' : '上线';
          $(this).closest('tr').find('.btn-status').data('status', status).html();
        });

        changeToStatus == 1 ? alert('批量上线成功') : alert('批量下线成功');
        $('#formSearch').trigger('submit');
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('click', '#storeId', function (event) {
  event.preventDefault();
  $('#bindCinemaName').val('');
  $('#cinemaTable tbody').html('<tr><td colspan="5" align="center">输入要绑定的标准影院名，并按回车</td></tr>');
  $('#popup-hall-bind').modal('show');
});

$(document).on('submit', '#formSearchCinema', function (e) {
  e.preventDefault();
  var bindCinemaName = $.trim($('#bindCinemaName').val());
  if (bindCinemaName == '' || bindCinemaName == undefined || _bindCinemaName == bindCinemaName) {
    if (bindCinemaName == '') {
      alert('搜索关键词不能为空！');
    }

    return false;
  }

  _bindCinemaName = bindCinemaName;
  if (!!_querying) {
    return false;
  }

  _querying = true;

  $.ajax({
    url: common.API_HOST + 'common/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: { cinemaName: bindCinemaName },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.length <= 0) {
        var html = '<tr><td colspan="5" align="center">暂无匹配，请尝试搜索其他影院名</td></tr>';
        $('#popup-hall-bind tbody').html(html);
        return false;
      }

      var data = { rows: res.data };
      var template = $('#tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-hall-bind tbody').html(html);
      $('#popup-hall-bind').on('click', '#cinemaTable tbody tr', function (e) {
        e.preventDefault();
        $('#popup-hall-bind #bindSelect').prop('disabled', false);
        $('#cinemaTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#cinemaId').val($(this).data('id'));
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#bindSelect', function (event) {
  event.preventDefault();
  var id = $('#cinemaTable tbody tr.selected').data('id');
  var cinemaName = $('#cinemaTable tbody tr.selected td:nth-child(2)').text();
  $('#storeId').val(id + '|' + cinemaName);
  $('#popup-hall-bind').modal('hide');
});

$(document).on('submit', '#popup-hall-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;

  var sendData = {
    hallName: $.trim($('#popup-hall-form #hallName').val()),
    storeId: $('#popup-hall-form #storeId').val(),
    seatNum: $('#popup-hall-form #seatNum').val(),
    screenType: $.trim($('#popup-hall-form #screenType').val()),
    effect: $.trim($('#popup-hall-form #effect').val()),
  };

  if ($('#hallId').length > 0) {
    sendData.hallId = $('#popup-hall-form #hallId').val();
  }

  $.ajax({
    url: common.API_HOST + 'hall/standard/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#hallId').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-hall-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setModal(hallData) {
  var data;
  var template;
  var cities;
  if (hallData) {
    _(_screenType).forEach(function (value, key) {
      _screenType[key].selected = hallData.screenType == value.name ? true : false;
    });

    _(_hallType).forEach(function (value, key) {
      _hallType[key].selected = hallData.effectType == value.name ? true : false;
    });

    _(_brands).forEach(function (value, key) {
      _brands[key].selected = hallData.brandId == value.id ? true : false;
    });

    data = {
      hall: hallData,
      screenTypes: _screenType,
      effectTypes: _hallType,
    };
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-hall-form .modal-title').html('编辑标准影厅');
  } else {
    data = {
      screenTypes: _screenType,
      effectTypes: _hallType,
    };
    template = $('#create-template').html();
    $('#popup-hall-form .modal-title').html('新增标准影厅');
    Mustache.parse(template);
    var html = Mustache.render(template, data);
  }

  $('#popup-hall-form .modal-body').html(html);
}

function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _brands = res.data;
      var html = '';
      _(_brands).forEach(function (brand) {
        html += '<option value="' + brand.id + '">' + brand.name + '</option>';
      });

      $('#search_brandId').append(html);
      $('#search_brandId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}
