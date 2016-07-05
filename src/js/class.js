'use strict;'

var common = require('common');
var _cities = [];
var _channels = {};
var _cinemas = {};
var _provinces = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
// var _channelAuthority = sessionStorage.getItem('channelAuthority').split(',');
var _submitting = false;

$(function () {
  common.init('class');

  //set search form
  setChannel();
  setProvince(true);

  getCity();
  getCinema();

  $('#formSearch').trigger('submit');
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    id: $.trim($('#search_id').val()),
    ticketName: $.trim($('#search_ticketName').val()),
    channelId: $('#search_channelId').val(),
    city: $.trim($('#search_city').val()),
    status: $('#search_status').val(),
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
    url: common.API_HOST + 'thirdParty/wandaTicket/ticketList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          item.channelNames = item.channelNames.split(',').length == 2 ? '全部' : item.channelNames;
          item.beginTime = item.beginTime.split(' ')[0];
          item.endTime = item.endTime.split(' ')[0];
          item.cityShort = item.cityNames.length > 13 ? item.cityNames.substr(0, 10) + '...'
          : item.cityNames;
          item.statusName = item.status == 1 ? '已上线' : '已下线';
          item.settleName = item.settleType == 1 ? '万达总部' : '万达区域';
          item.typeName = item.type == 1 ? '日常票类' : '活动票类';
          item.onlineStatus = item.status == 1 ? 1 : 0;
        });

        setTableData(res.data.rows);
        $('#btn-export').prop('disabled', false);
      }
    } else {
      alert(res.meta.msg);
    }
  });

  return false;
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

$('#dataTable').on('click', '.btn-check', function (event) {
  event.preventDefault();
  var id = $(this).closest('tr').data('id');
  var ticketId = $(this).closest('tr').children('td:nth-child(2)').text();
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/getCinemasByTicket',
    type: 'POST',
    dataType: 'json',
    data: { id: id },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      $('#popup-class-check .modal-title').text('检查【' + ticketId + '】的场次');
      $('#check_ticketName').val(ticketId);
      var html = '';
      _(res.data.ticketStoreList).forEach(function (cinema) {
        html += '<option value="' + cinema.sourceCinemaId + '">' + cinema.cinemaName + '</option>';
      });

      $('#check_cinemaId').html(html);
      $('#check_date').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        minView: 2,
        todayHighlight: true,
        autoclose: true,
      });

      $('#popup-class-check').modal('show');
      $('#popup-class-check form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#popup-class-check form', function (event) {
  event.preventDefault();
  $('#popup-class-check button[type=submit]').prop('disabled', true).text('检查中...');
  $('#popup-class-check button.close').hide();
  $('#popup-class-check .bg-warning').slideDown();
  var sendData = {
    ticketName: $('#check_ticketName').val(),
    tpCinemaId: $('#check_cinemaId').val(),
    playDate: $.trim($('#check_date').val()),
  };
  $.ajax({
    url: common.API_HOST + 'thirdParty/wandaTicket/checkTicket',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    $('#popup-class-check button[type=submit]').prop('disabled', false).text('检查');
    $('#popup-class-check button.close').show();
    $('#popup-class-check .bg-warning').slideUp();
    if (!!~~res.meta.result) {
      alert(res.data.status);
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

//影院
$(document).on('click', '#btn-set-cinema', function (event) {
  event.preventDefault();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#popup-class-cinema').modal('show');
});

$(document).on('change', '#search-cinema-provinceId', function (e) {
  var provinceId = parseInt($(this).val());
  if (!!+provinceId) {
    var province = _.find(_provinces, { provinceId: provinceId.toString() });
    var cityList = province.cityList;
    var options = '<option value="">选择城市</option>';
    _(cityList).forEach(function (value, key) {
      options += '<option value="' + value.cityId + '">' + value.cityName + '</option>';
    });

    $('#search-cinema-cityId').html(options);
  }

  return false;
});

$(document).on('click', '#btn-search-cinema', function (event) {
  event.preventDefault();
  var sendData = {
    brandId: 1,
    cityId: $('#search-cinema-cityId').val(),
    cinemaName: $.trim($('#search-cinema-cinemaName').val()),
    associationStatus: 1,
    onlineStatus: 1,
    pageIndex: 1,
    pageSize: 9999,
  };

  $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查询中，请稍等...</td></tr>');
  $.ajax({
    url: common.API_HOST + 'common/cinemas',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data.rows.length <= 0) {
        $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
        return false;
      }

      var html = '';
      _(res.data.rows).forEach(function (cinema) {
        html += '<tr data-id="' + cinema.id + '"><td>' + cinema.name + '</td><td>' + cinema.cityName + '</td></tr>';
      });

      $('#search-cinema-candidate tbody').html(html);
    } else {
      $('#search-cinema-candidate tbody').html('<tr><td colspan="3" align="center">查不到数据！</td></tr>');
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#search-cinema-candidate tbody tr, #search-cinema-choosed tbody tr', function (event) {
  event.preventDefault();
  $(this).toggleClass('selected');
});

$(document).on('click', '#search-cinema-add-all', function (event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function (index, el) {
    choosedIds.push($(el).data('id'));
  });

  $('#search-cinema-candidate tbody tr').each(function (index, el) {
    if (choosedIds.indexOf($(el).data('id')) == -1) {
      $(el).clone().appendTo('#search-cinema-choosed tbody').removeClass('selected');
    }
  });

  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#search-cinema-add', function (event) {
  event.preventDefault();
  var choosedIds = [];
  $('#search-cinema-choosed tbody tr').each(function (index, el) {
    choosedIds.push($(el).data('id'));
  });

  $('#search-cinema-candidate tbody tr.selected').each(function (index, el) {
    if (choosedIds.indexOf($(el).data('id')) == -1) {
      $(el).clone().appendTo('#search-cinema-choosed tbody').removeClass('selected');
    }
  });

  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#search-cinema-remove-all', function (event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text('0');
});

$(document).on('click', '#search-cinema-remove', function (event) {
  event.preventDefault();
  $('#search-cinema-choosed tbody tr.selected').remove();
  $('#input-cinema-filter').quicksearch('#search-cinema-choosed tbody tr');
  $('#choosedCount').text($('#search-cinema-choosed tbody tr').length);
});

$(document).on('click', '#btn-cinema-filter', function (event) {
  event.preventDefault();
  $('#input-cinema-filter').val('');
  $('#search-cinema-choosed tbody tr').show();
});

$(document).on('submit', '#popup-class-cinema form', function (event) {
  event.preventDefault();

  if ($('#search-cinema-choosed tbody tr').size() > 0) {
    $('#preview-cinema').html('选中了[ ' + $('#search-cinema-choosed tbody tr').size() + ' ]个影院');
  } else {
    $('#preview-cinema').html('');
  }

  $('#popup-class-cinema').modal('hide');
  return false;
});

$(document).on('click', '#popup-class-form button[type=submit]', function (event) {
  event.preventDefault();
  $('#cinemaSelect_to option').prop('selected', true);
  $('#popup-class-form form').trigger('submit');
});

$(document).on('submit', '#popup-class-form form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    ticketName: $.trim($('#popup-class-form #ticketName').val()),
    settleType: $('#popup-class-form input[name=settleType]:checked').val(),
    ticketType: $('#popup-class-form input[name=ticketType]:checked').val(),
    isSupportRefund: $('#popup-class-form input[name=isSupportRefund]:checked').val(),
    ticketRule: $.trim($('#popup-class-form #ticketRule').val()),
    beginTime: $.trim($('#popup-class-form #beginTime').val()),
    endTime: $.trim($('#popup-class-form #endTime').val()),
  };
  sendData.channelId = [];
  $('#popup-class-form input[name=channelId]:checked').each(function (index, el) {
    sendData.channelId.push($(this).val());
  });

  sendData.channelId = sendData.channelId.join('|');
  sendData.cinema = [];
  if ($('#search-cinema-choosed tbody tr').size() < 1) {
    $('#preview-cinema').html('<ul class="parsley-errors-list filled"><li>没有选择影院</li></ul>');
    return false;
  }

  $('#search-cinema-choosed tbody tr').each(function (index, el) {
    sendData.cinema.push($(el).data('id'));
  });

  sendData.cinema = sendData.cinema.join('|');
  var ajaxUrl = common.API_HOST + 'thirdParty/wandaTicket/saveTicket';
  if ($('#popup-class-form #id').length > 0) {
    sendData.id = $('#popup-class-form #id').val();
    ajaxUrl = common.API_HOST + 'thirdParty/wandaTicket/updateTicket';
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
      if ($('#popup-class-form #id').length > 0) {
        alert('更新成功！');
      } else {
        alert('添加成功！');
      }

      $('#popup-class-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  $('#search-cinema-cinemaName').val('');
  $('#search-cinema-candidate tbody, #search-cinema-choosed tbody').html('');
  $('#choosedCount').html('0');
  setProvince(false);
  $('#search-cinema-cityId').html('<option value="">选择城市</option>');

  setModal(false);
  $('#popup-class-form').modal('show');
  $('#popup-class-form form').parsley();
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

});

$(document).on('click', '#btn-export', function (e) {
  e.preventDefault();
  var downloadUrl = common.API_HOST + 'thirdParty/wandaTicket/exportTickets?' +
  'id=' + $.trim($('#search_id').val()) +
  '&ticketName=' + $.trim($('#search_ticketName').val()) +
  '&channelId=' + $('#search_channelId').val() +
  '&cityId=' + $('#search_cityId').val() +
  '&status=' + $('#search_status').val() +
  '&pageIndex=' + _pageIndex +
  '&pageSize=' + _pageSize;
  window.open(downloadUrl);
  return false;
});

// $(document).on('click', '.checkbox-inline label', function (event) {
//   var channelId = $(this).children('input').val();
//   if (_channelAuthority.indexOf('' + channelId) < 0) {
//     alert('没有权限！');
//     event.preventDefault();
//   }
// });

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
  if (~~$('#pageNo').val() == 0) {
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

function setModal(classData) {
  var data;
  var template;

  if (classData) {
    data = { class: classData, channels: _channels, cinemas: _cinemas };
    template = $('#edit-template').html();
  } else {

    // var allowChannels = [];
    // _(_channels).forEach(function (channel) {
    //   if (_channelAuthority.indexOf('' + channel.channelId) > -1) {
    //     allowChannels.push(channel);
    //   }
    // });

    data = { channels: _channels, cinemas: _cinemas };
    template = $('#create-template').html();
    $('#popup-class-form .modal-title').html('新增票类');
  }

  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-class-form .modal-body').html(html);
}

function getCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function (group) {
        _(group).forEach(function (city) {
          _cities.push(city);
        });
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

function setChannel() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
      var html = '';
      $.each(_channels, function (index, channel) {
        html += '<option value="' + channel.channelId + '">' + channel.channelName + '</option>';
      });

      $('#search_channelId').append(html);
      $('#search_channelId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
    } else {
      alert(res.meta.msg);
    }
  });
}

function getCinema() {
  $.ajax({
    url: common.API_HOST + 'common/cinemas',
    type: 'POST',
    dataType: 'json',
    data: {
      brandId: 1,
      associationStatus: 1,
      onlineStatus: 1,
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _cinemas = res.data.rows;
    } else {
      alert(res.meta.msg);
    }
  });
}

function setProvince(first) {
  if (!!first) {
    $.ajax({
      url: common.API_HOST + 'common/provinceList',
      type: 'GET',
      dataType: 'json',
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        _provinces = res.data;
        var html = '';
        _(_provinces).forEach(function (province) {
          html += '<option value="' + province.provinceId + '">' + province.provinceName + '</option>';
        });

        $('#search-cinema-provinceId').append(html);
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  } else {
    var html = '';
    _(_provinces).forEach(function (province) {
      html += '<option value="' + province.provinceId + '">' + province.provinceName + '</option>';
    });

    $('#search-cinema-provinceId').append(html);
  }

}

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
