'use strict;'

var common = require('common');
var _status = [
{ id: 0, name: '即将上映' },
{ id: 1, name: '正在热映' },
{ id: 2, name: '下映存档' },
];
var _versions = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('movie');

  //set search form
  setVersion();

  $('#search_beginShowDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endShowDate').datetimepicker('setStartDate', startDate);
  });

  $('#search_endShowDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginShowDate').datetimepicker('setEndDate', FromEndDate);
  });

  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginShowDate').val(beginDate).datetimepicker('setEndDate', endDate);
  $('#search_endShowDate').val(endDate).datetimepicker('setStartDate', beginDate);

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
    name: $.trim($('#search_name').val()),
    produceCorp: $.trim($('#search_produceCorp').val()),
    dimenId: $('#search_dimenId').val(),
    beginShowDate: $('#search_beginShowDate').val(),
    endShowDate: $('#search_endShowDate').val(),
    status: $('#search_status').val(),
    associationStatus: $('#search_associationStatus').val(),
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
    url: common.API_HOST + 'film/standardFilm/list',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="8" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function (item) {
          _(_status).forEach(function (value) {
            if (item.status == value.id) {
              item.statusName = value.name;
            }
          });

          item.dimenName = item.dimenNames.join(',');
          item.associationStatus = item.associationStatus == 1 ? '已关联' : '未关联';
        });

        setTableData(res.data.rows);
      }

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('submit', '#popup-movie-form form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    id: $('#popup-movie-form #id').val(),
    name: $.trim($('#popup-movie-form #name').val()),
    showDate: $('#popup-movie-form #showDate').val(),
    duration: $.trim($('#popup-movie-form #duration').val()),
    summary: $.trim($('#popup-movie-form #summary').val()),
    description: $.trim($('#popup-movie-form #description').val()),
    area: $.trim($('#popup-movie-form #area').val()),
    produceCorp: $.trim($('#popup-movie-form #produceCorp').val()),
    poster: $.trim($('#popup-movie-form #poster').val()),
    status: $('#popup-movie-form #status').val(),
  };
  var dimenIds = [];
  $('#popup-movie-form input[name=dimenId]:checked').each(function () {
    dimenIds.push($(this).val());
  });

  sendData.dimenId = dimenIds.join('|');

  $.ajax({
    url: common.API_HOST + 'film/standardFilm/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('更新成功！');
      $('#popup-movie-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      res.data.showDate = res.data.showDate.split(' ')[0];
      setModal(res.data);
      $('#popup-movie-form').modal('show');
      $('#showDate').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        minView: 2,
        todayHighlight: true,
        autoclose: true,
      });
      $('#popup-movie-form form').parsley();

      $('.poster-preview').on('load', function (event) {
        var poster = $(this).attr('src');
        window.previewImg = '<img id="previewImg" src="' + poster + '" width="160"><script>window.onload = function() { parent.document.getElementById("frameImg").height = document.getElementById("previewImg").height+"px"; }</script>';
        var iframe = document.createElement('iframe');
        iframe.id = 'frameImg';
        iframe.src = 'javascript:parent.previewImg;';
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        iframe.width = '160px';
        iframe.style.display = 'block';
        var el = document.querySelector('.poster-preview');
        el.parentNode.replaceChild(iframe, el);
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('click', '#btn-upload', function (event) {
  event.preventDefault();
  $('#popup-movie-upload').modal('show');
  $('#fileupload').data('url', common.API_HOST + 'film/standardFilm/uploadPoster').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#fileupload').next('span').remove();
      $('#fileupload').after(' <span>' + data.files[0].name + '</span>');
      $('#popup-movie-upload button[type=submit]').off('click').on('click', function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },

    done: function (e, data) {
      $('#popup-movie-upload button[type=submit]').prop('disable', false).text('上传');
      if (!!~~data.result.meta.result) {
        $('#poster').val(data.result.data.savePath);
        $('.poster-preview').attr('src', data.result.data.savePath);
        alert('上传成功！');
        $('#popup-movie-upload').modal('hide');
      } else {
        alert('上传失败：' + data.result.meta.msg);
      }
    },
  });
});

$('#dataTable').on('click', '.btn-detail', function (e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var data = res.data;
      _(_status).forEach(function (value) {
        if (data.status == value.id) {
          data.statusName = value.name;
        }
      });

      data.dimenName = data.dimenNames.join(',');
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-movie-detail .modal-body').html(html);
      $('#popup-movie-detail').modal('show');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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

function setModal(movieData) {
  var data;
  var template;
  if (movieData) {
    _(_status).forEach(function (value, key) {
      if (value.id == movieData.status) {
        value.selected = true;
      } else {
        value.selected = false;
      }
    });

    _(_versions).forEach(function (value, key) {
      value.selected = movieData.dimenIds.indexOf(value.id) > -1 ? true : false;
    });

    data = { movie: movieData, versions: _versions, status: _status };
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    $('#popup-movie-form .modal-body').html(html);
  }

  return false;
}

function setVersion() {
  $.ajax({
    url: common.API_HOST + 'common/dimenList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _versions = res.data;
      _(_versions).forEach(function (item) {
        $('#search_dimenId').append($('<option></option>').attr('value', item.id).text(item.name));
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
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
