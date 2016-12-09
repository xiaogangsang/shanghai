'use strict;'

var common = require('common');
// var _pageIndex = 1;
// var _pageSize = 10;
// var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('tp');
  $.ajax({
    url: common.API_HOST + 'thirdParty/list',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="5" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        // _pageIndex = res.data.pageIndex;
        // _pageTotal = Math.ceil(res.data.total / _pageSize);
        // setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        // _(res.data.rows).forEach(function (item) {

        // });

        setTableData(res.data.rows);
      }
    } else {
      alert(res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-status', function (e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  var $btn = $(this);
  var sendData = {
    id: tr.data('id'),
    status: $btn.data('status') == 1 ? 2 : 1,
  };
  var statusName = sendData.status == 1 ? '上线' : '下线';
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/updateStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#formSearch').trigger('submit');
      alert(statusName + '操作成功!');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-edit', function (event) {
  event.preventDefault();
  $('#search-cinema-cinemaName').val('');
  $('#search-cinema-candidate tbody, #search-cinema-choosed tbody').html('');
  $('#choosedCount').html('0');
  setProvince(false);
  $('#search-cinema-cityId').html('<option value="">选择城市</option>');

  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var cinemaList = [];
      _(res.data.ticketStoreRelList).forEach(function (store) {
        cinemaList.push(store.storeId);
      });

      delete res.data.ticketStoreRelList;
      var html = '';
      _(_cinemas).forEach(function (cinema) {
        if (cinemaList.indexOf(cinema.id) > -1) {
          html += '<tr data-id="' + cinema.id + '"><td>' + cinema.name + '</td><td>' + cinema.cityName + '</td></tr>';
        }
      });

      $('#search-cinema-choosed tbody').html(html);
      $('#choosedCount').html($('#search-cinema-choosed tbody tr').size());

      var channelList = [];
      _(res.data.ticketChannelRelList).forEach(function (channel) {
        channelList.push(channel.channelId);
      });

      delete res.data.ticketChannelRelList;
      _(_channels).forEach(function (channel) {
        channel.selected = channelList.indexOf(channel.channelId) > -1 ? true : false;
      });

      res.data.wandaTicket.beginTimeStr = res.data.wandaTicket.beginTimeStr.split(' ')[0];
      res.data.wandaTicket.endTimeStr = res.data.wandaTicket.endTimeStr.split(' ')[0];

      res.data.wandaTicket.isSupportRefund = res.data.wandaTicket.isSupportRefund == 1 ? 1 : 0;
      res.data.wandaTicket.type = res.data.wandaTicket.type == 1 ? 1 : 0;
      res.data.wandaTicket.settleType = res.data.wandaTicket.settleType == 1 ? 1 : 0;

      setModal(res.data.wandaTicket);

      if (cinemaList.length > 0) {
        $('#preview-cinema').html('选中了[ ' + cinemaList.length + ' ]个影院');
      }

      $('#popup-class-form').modal('show');
      $('#beginTime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        minView: 2,
        todayHighlight: true,
        autoclose: true,
      }).on('changeDate', function (ev) {
        var startDate = new Date(ev.date.valueOf());
        startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
        $('#endTime').datetimepicker('setStartDate', startDate);
      });

      $('#endTime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        minView: 2,
        todayHighlight: true,
        autoclose: true,
      }).on('changeDate', function (ev) {
        var FromEndDate = new Date(ev.date.valueOf());
        FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
        $('#beginTime').datetimepicker('setEndDate', FromEndDate);
      });

      $('#popup-class-form form').parsley();

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#popup-tp-form form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    name: $('#popup-tp-form #name').val().trim(),
    priority: $('#popup-tp-form #priority').val().trim(),
    remark: $('#popup-tp-form #remark').val().trim(),
  };

  var ajaxUrl = common.API_HOST + 'thirdParty/save';
  if ($('#popup-tp-form #id').length > 0) {
    sendData.id = $('#popup-tp-form #id').val();
    ajaxUrl = common.API_HOST + 'thirdParty/update';
  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#popup-tp-form #id').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-tp-form').modal('hide');
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

// $('#pager').on('click', '.prev,.next', function (e) {
//   e.preventDefault();
//   if ($(this).hasClass('prev')) {
//     if (_pageIndex <= 1) {
//       _pageIndex = 1;
//       alert('已经是第一页！');
//       return false;
//     }

//     _pageIndex--;
//   } else {
//     if (_pageIndex >= _pageTotal) {
//       _pageIndex = _pageTotal;
//       alert('已经是最后一页！');
//       return false;
//     }

//     _pageIndex++;
//   }

//   $('#formSearch').trigger('submit');
//   return false;
// });

// $('#pager').on('click', '#btn-pager', function (e) {
//   e.preventDefault();
//   if (~~$('#pageNo').val() == 0) {
//     return false;
//   }

//   var pageNo = parseInt($('#pageNo').val());
//   if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
//     alert('要跳转的页码超过了范围！');
//     return false;
//   }

//   _pageIndex = pageNo;
//   $('#formSearch').trigger('submit');
//   return false;
// });

// function setPager(total, pageIndex, rowsSize, pageTotal) {
//   var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
//   var template = $('#pager-template').html();
//   Mustache.parse(template);
//   var html = Mustache.render(template, data);
//   $('#pager').html(html);
// }
