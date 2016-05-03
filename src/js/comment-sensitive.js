var common = require('common');
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;

$(function() {
  common.setMenu('comment-forbidden');

  $('#fileupload').data('url', common.API_HOST+'comment/importSensitive').fileupload({
    dataType: 'json',
    add: function (e, data) {
      $('#fileupload').next('span').remove();
      $('#fileupload').after(' <span>'+data.files[0].name+'</span>');
      $('#popup-sensitive-import button[type=submit]').off('click').on('click',function () {
        $(this).prop('disable', true).text('上传中...');
        data.submit();
      });
    },
    done: function (e, data) {
      if (true == data.result.meta.result) {
        alert('导入成功！');
      } else {
        alert('导入失败：'+data.result.meta.msg);
      }
      $('#popup-user-import button[type=submit]').prop('disable', false).text('上传');
    }
  });
});

//handle search form
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    word: $.trim( $('#search_word').val() ),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'comment/sensitiveList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    _querying = false;
    console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length <= 0 ) {
        $('#dataTable tbody').html('<tr><td colspan="3" align="center">请点击“查询”按钮！</td></tr>');
        return false;
      }
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total/_pageSize);
      setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
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
$(document).on('click', '#btn-create', function(e) {
  e.preventDefault();
  $('#popup-comment-form .form-group').remove();
  $('#btn-add').before('<div class="form-group"><div class="input-group"><div class="input-group-addon">敏感词</div><input type="text" class="form-control"></div></div>');
  $('#popup-comment-form').modal('show');
});
$(document).on('click', '#btn-add', function(event) {
  event.preventDefault();
  $(this).before('<div class="form-group"><div class="input-group"><div class="input-group-addon">敏感词</div><input type="text" class="form-control"></div></div>');
});
$(document).on('submit', '#popup-comment-form form', function(event) {
  event.preventDefault();
  var word = [];
  $('#popup-comment-form input[type=text]').each(function(index) {
    var text = $.trim($(this).val());
    if ( '' != text ) {
      word.push(text);
    }
  });
  if (word.length > 0) {
    $.ajax({
      url: common.API_HOST + 'comment/sensitiveSave',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(word)
    })
    .done(function(res) {
      // console.log(res);
      if (true == res.meta.result) {
        alert('添加成功！');
        $('#popup-comment-form').modal('hide');
        _pageIndex = 1;
        $('#formSearch').trigger('submit');
      } else {
        alert('接口错误：'+res.meta.msg);
      }
    });
  }
  return false;
});
$('#dataTable').on('click', '.btn-delete', function(e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此敏感词吗？')) {
    $.ajax({
      url: common.API_HOST + 'comment/sensitiveDelete',
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
  if (window.confirm('确定要删除选中的敏感词吗？')) {
    var commentIds = [];
    var checked_items = $('.multi-check:checked');
    checked_items.each(function(index, el) {
      commentIds.push( $(this).closest('tr').data('id') );
    });
    $.ajax({
      url: common.API_HOST + 'comment/sensitiveDelete',
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
$(document).on('click', '#btn-import', function(event) {
  event.preventDefault();
  $('#popup-sensitive-import').modal('show');
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