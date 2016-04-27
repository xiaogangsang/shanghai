var common = require('common');
var _status = [{id:0, name:'即将上映'}, {id:1, name:'正在热映'}, {id:2, name:'下映存档'}];
var _versions = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;

$(function() {
  common.setMenu('movie');
  common.setLoginName();
  //set search form
  setVersion();
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
  $('#search_beginShowDate,#search_endShowDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
  var beginDate = new Date();
  var endDate = new Date();
  endDate.setDate(endDate.getDate()+7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  $('#search_beginShowDate').val(beginDate);
  $('#search_endShowDate').val(endDate);
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    name: $.trim( $('#search_name').val() ),
    produceCorp: $.trim( $('#search_produceCorp').val() ),
    dimenId: $('#search_dimenId').val(),
    beginShowDate: $('#search_beginShowDate').val(),
    endShowDate: $('#search_endShowDate').val(),
    status: $('#search_status').val(),
    associationStatus: $('#search_associationStatus').val(),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/list',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="8" align="center">请点击“查询”按钮！</td></tr>');
        return false;
      } else {
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total/_pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        _(res.data.rows).forEach(function(item){
          _(_status).forEach(function(value){
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
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$(document).on('submit', '#popup-movie-form form', function(e) {
  e.preventDefault();
  var sendData = {
    id: $('#popup-movie-form #id').val(),
    name: $.trim( $('#popup-movie-form #name').val() ),
    showDate: $('#popup-movie-form #showDate').val(),
    duration: $.trim( $('#popup-movie-form #duration').val() ),
    summary: $.trim( $('#popup-movie-form #summary').val() ),
    description: $.trim( $('#popup-movie-form #description').val() ),
    area: $.trim( $('#popup-movie-form #area').val() ),
    produceCorp: $.trim( $('#popup-movie-form #produceCorp').val() ),
    poster: $.trim( $('#popup-movie-form #poster').val() ),
    status: $('#popup-movie-form #status').val()
  };
  var dimenIds = [];
  $('#popup-movie-form input[name=dimenId]:checked').each(function() {
    dimenIds.push($(this).val());
  });
  sendData.dimenId = dimenIds.join('|');
  // console.log( sendData );
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    // contentType: 'application/json; charset=utf-8',
    data: sendData
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      alert('更新成功！');
      $('#popup-movie-form').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#dataTable').on('click', '.btn-edit', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      res.data.showDate = res.data.showDate.split(' ')[0];
      setModal(res.data);
      $('#popup-movie-form').modal('show');
      $('#showDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
      $('#popup-movie-form form').parsley();
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('click', '#btn-upload', function(event) {
  event.preventDefault();
  $('#popup-movie-upload').modal('show');
  $('#fileupload').data('url', common.API_HOST+'film/standardFilm/uploadPoster').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#popup-movie-upload button[type=submit]').click(function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },
    done: function (e, data) {
      // console.log(data.result);
      $('#popup-movie-upload button[type=submit]').prop('disable', false).text('上传');
      if (true == data.result.meta.result) {
        $('#poster').val(common.API_HOST+data.result.data.savePath);
        $('.poster-preview').attr('src', common.API_HOST+data.result.data.savePath);
        alert('上传成功！');
        $('#popup-movie-upload').modal('hide');
      } else {
        alert('上传失败：'+data.result.meta.msg);
      }
    }
  });
});
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: $(this).closest('tr').data('id') }
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      var data = res.data;
      _(_status).forEach(function(value){
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
      alert('接口错误：'+res.meta.msg);
    }
  });
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

function setModal(movieData) {
  var data, template;
  if (movieData) {
    _(_status).forEach(function(value, key){
      if (value.id == movieData.status) {
        value.selected = true;
      } else {
        value.selected = false;
      }
    });
    _(_versions).forEach(function(value, key){
      value.selected = movieData.dimenIds.indexOf(value.id) > -1 ? true : false;
    });
    data = {movie:movieData, versions:_versions, status:_status};
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
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _versions = res.data;
      _(_versions).forEach(function(item){
        $('#search_dimenId').append($('<option></option>').attr('value', item.id).text(item.name));
      });
    } else {
      alert('接口错误：'+res.meta.msg);
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