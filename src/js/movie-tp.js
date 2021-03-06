'use strict;'

var common = require('common');
require('fineUploader');

var _status = [
{ id: 0, name: '即将上映' },
{ id: 1, name: '正在热映' },
{ id: 2, name: '下映存档' },
];

var _sources = {};
var _versions = {};
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;
var dataCache;
var _movieId = 0;
var _bindMovieName = '';
var _querying = false;
var _submitting = false;

$(function () {
  common.init('movie-tp');

  //set search form
  setVersion();
  setSource();

  $('#search_beginDate,#search_endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  });
  var beginDate = new Date();
  var endDate = new Date();
  beginDate.setDate(beginDate.getDate() - 7);
  beginDate = common.getDate(beginDate);
  endDate = common.getDate(endDate);
  //$('#search_beginDate').datetimepicker('setEndDate', endDate);
  //$('#search_endDate').datetimepicker('setStartDate', beginDate).datetimepicker('setEndDate', endDate);

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('change click', '#search_associationStatus', function (e) {
  e.preventDefault();
  if ($(this).val() == 1) {
    $('#association').show();
  } else {
    $('#association').hide();
  }
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
    produceCorp: $.trim($('#search_produceCorp').val()),
    associationStatus: $('#search_associationStatus').val(),
    tpFilmName:$('#search_name_tp').val(),
    pageSize: _pageSize,
  };

  if (!!~~$('#search_sourceId').val()) {
    sendData.sourceId = $('#search_sourceId').val();
  }
  if ($('#search_associationStatus').val() == 1) {
    sendData.name = $.trim($('#search_name').val());
    sendData.beginShowDate = $('#search_beginDate').val();
    sendData.endShowDate = $('#search_endDate').val();
  }


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
    url: common.API_HOST + 'film/tpFilm/tpfilmList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.list.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="8" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;

        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.totalCount / _pageSize);
        setPager(res.data.totalCount, _pageIndex, res.data.list.length, _pageTotal);
        _(res.data.list).forEach(function (item,key) {
          _(_status).forEach(function (value) {
            if (item.status == value.id) {
              item.statusName = value.name;
            }
          });

          // item.showDate = item.showDate.split(' ')[0];
          /*item.dimenName = item.dimenNames.join(',');*/

          // item.associationStatus = item.associationStatus == 1 ? '已关联' : '未关联';

          var source = _.find(_sources, { sourceId: parseInt(item.sourceId) });
          if (source) {
            res.data.list[key].sourceName = source.sourceName;
          }
        });

        setTableData(res.data.list);
        dataCache = res.data.list;

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
    directors: $.trim($('#popup-movie-form #director').val()),
    actors: $.trim($('#popup-movie-form #actor').val()),
    score: $.trim($('#popup-movie-form #score').val()),
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


$('#dataTable').on('click', '.btn-bind', function (e) {
  e.preventDefault();

  // var rowIndex = $(this).closest('td').parent()[0].sectionRowIndex;
  //   var obj = dataCache[rowIndex];

 var rowIndex = $(this).closest('tr')[0].sectionRowIndex;
  var obj = dataCache[rowIndex];
  $('#bindMovieName').val(obj.sFilmName);
  $('#bindTpMovie').text(obj.sFilmName);
  $('#thirdPartyFilmId').val(obj.sFilmId);
  $('#thirdPartyId').val(obj.sourceId);
  $('#formSearchMovie').trigger('submit');
  $('#popup-movie-bind').modal('show');
  return false;
});

$(document).on('submit', '#formBindMovie', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }
  _submitting = true;
  var sendData = {
    id: $('#cinemaId').val(),
    thirdPartyFilmId: $('#thirdPartyFilmId').val(),
    sourceId: $('#thirdPartyId').val(),
    status: 1,
  };
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/updateAssociation',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      $.ajax({
        url: common.API_HOST + 'film/standardFilm/associationTpFilms',
        type: 'POST',
        dataType: 'json',
        data: { id: _movieId },
      })
      .done(function (res) {
        if (!!~~res.meta.result) {
          var data = { movies: res.data };
          var template = $('#tpmovie-template').html();
          Mustache.parse(template);
          var html = Mustache.render(template, data);
          $('#tpMovieTable tbody').html(html);
        } else {
          alert('接口错误：' + res.meta.msg);
        }
      });

      alert('绑定成功！');
      $('#popup-movie-bind').modal('hide');
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$(document).on('submit', '#formSearchMovie', function (e) {
  e.preventDefault();
  var bindMovieName = $.trim($('#bindMovieName').val());
  if (bindMovieName == '' || bindMovieName == undefined || _bindMovieName == bindMovieName) {
    if (bindMovieName == '') {
      alert('搜索关键词不能为空！');
    }

    return false;
  }

  if (!!_querying) {
    return false;
  }

  _querying = true;

  _bindMovieName = bindMovieName;
  $.ajax({
    url: common.API_HOST + 'film/standardFilm/list',
    type: 'POST',
    dataType: 'json',
    data: {
      name: bindMovieName,
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data != null && res.data.rows.length <= 0) {
        var html = '<tr><td colspan="5" align="center">暂无匹配，请尝试搜索其他影片名</td></tr>';
        $('#popup-movie-bind tbody').html(html);
        return false;
      }

      var rows = [];
      _(res.data.rows).forEach(function (movie, key) {
        if (movie.id != _movieId) {
          // movie.dimen = movie.dimenNames.join(',');
          movie.showDate = movie.showDate != null ? movie.showDate.split(' ')[0] : '';
          rows.push(movie);
        }
      });

      if (rows.length <= 0) {
        $('#popup-movie-bind tbody').html('<tr><td colspan="5" align="center">暂无匹配，请尝试搜索其他影片名</td></tr>');
        return false;
      }

      var data = { rows: rows };
      // console.log(res.data);
      var template = $('#tr-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-movie-bind tbody').html(html);
      $('#popup-movie-bind').on('click', '#movieTable tbody tr', function (e) {
        e.preventDefault();
        $('#movieTable tbody tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#cinemaId').val($(this).data('id'));
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-movie-create', function (e) {
  e.preventDefault();

  var rowIndex = $(this).closest('tr')[0].sectionRowIndex;
  var obj = dataCache[rowIndex];


  $.ajax({
    url: common.API_HOST + 'film/tpFilm/tpfilmDetail',
    type: 'POST',
    dataType: 'json',
    data: { thirdPartyFilmId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid'),
    },
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      var data = res.data;
      _(_status).forEach(function (value) {
        if (data.status == value.id) {
          // data.statusName = value.name;
          value.selected = true;
        } else {
          value.selected = false;
        }
        
      });
      var array;
      var releaseDate = data.releaseDate;
      if (releaseDate != null && releaseDate.length > 0) {
        array = releaseDate.split("-");
        if (array.length >= 1) {
          data.year = array[0];
        }

        if (array.length >= 2) {
          data.month = array[1];
        }

        if (array.length >= 3) {
          data.day = array[2];
        }
      }

      // data.sourceName = _.find(_sources,{ sourceId: parseInt(data.sourceId)}).sourceName;
      data.sourceId = obj.sourceId;
      data.status = _status;
      data.thirdPartyFilmId = obj.sFilmId;
      data.filmId = obj.filmId;
      var template = $('#edit-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-movie-creat-tp .modal-body').html(html);
      $('#popup-movie-creat-tp').modal('show');
      $('#sbindTpMovie').text(res.data.filmName);
      var dimenStr = data.dimen;
      if (dimenStr.indexOf("2D") >= 0) {
        $('#inlineCheckbox1').prop("checked",true);
      };

      if (dimenStr.indexOf("3D") >= 0) {
        $('#inlineCheckbox2').prop("checked",true);
      };

      $('#popup-movie-creat-tp').on('shown.bs.modal', function () {
        var uploader = new qq.FineUploaderBasic({
          button: $('#fileupload')[0],
          request: {
            endpoint: common.API_HOST + 'film/standardFilm/uploadPoster',
            inputName: 'file',
            filenameParam: 'file',
          },
          callbacks: {
            onError: function (id, fileName, errorReason) {
              if (errorReason != 'Upload failure reason unknown') {
                console.log(errorReason);
                alert('上传失败');
              }
            },

            onComplete: function (id, fileName, responseJSON) {
              if (!!~~responseJSON.meta.result) {
                $('#poster').val(responseJSON.data.savePath);
                $('.poster-preview').attr('src', responseJSON.data.savePath);
                alert('上传成功！');
              } else {
                alert('接口错误：' + responseJSON.meta.msg);
              }
            },
          },
        });
      });

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('body').on('click', '.btn-save', function (e) {
  e.preventDefault();
  var dimenSelected = '';
  if ($('#inlineCheckbox1').prop('checked')) {
        dimenSelected += $('#inlineCheckbox1').val();
      }

  if ($('#inlineCheckbox2').prop('checked')) {
        dimenSelected = dimenSelected + '/' + $('#inlineCheckbox2').val();
      }

  var showDate = '';
  if ($('#releaseYear').val() && $('#releaseMonth').val().length && $('#releaseDay').val().length) {
    showDate = $('#releaseYear').val() + '-' + $('#releaseMonth').val() + '-' + $('#releaseDay').val();
  } else if ($('#releaseYear').val() && $('#releaseMonth').val().length) {
    showDate = $('#releaseYear').val() + '-' + $('#releaseMonth').val();
  } else {
    showDate = $('#releaseYear').val();
  }


  var sendData = {
    id: $('#filmId').val(),
    name: $('#name').val(),
    dimen: dimenSelected,
    showDate:showDate,
    duration:$('#duration').val(),
    summary:$('#summary').val(),
    description:$('#description').val(),
    area:$('#area').val(),
    produceCorp:$('#produceCorp').val(),
    poster:$('#poster').val(),
    status:$('#status').val(),
    actors:$('#actor').val(),
    directors:$('#director').val(),
    score:$('#score').val(),
    sourceId:$('#sourceId').val(),
    thirdPartyFilmId:$('#sFilmId').val(),
    theme:$('#type').val(),
  };

$.ajax({
    url: common.API_HOST + 'film/standardFilm/saveOrUpdate',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      alert('保存成功');
      $('#popup-movie-creat-tp').modal('hide');

    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('body').on('click', '#tpBtn-upload', function (event) {
  event.preventDefault();
  alert('a');
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
    url: common.API_HOST + 'film/tpFilm/tpfilmDetail',
    type: 'POST',
    dataType: 'json',
    data: { thirdPartyFilmId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid'),
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var data = res.data;
      _(_status).forEach(function (value) {
        if (data.status == value.id) {
          data.statusName = value.name;
        }
      });

      data.sourceName = _.find(_sources,{ sourceId: parseInt(data.sourceId)}).sourceName;
      data.associationStatus = _.find(_status,{id:parseInt(data.status)}).name;

      //data.dimenName = data.dimenNames.join(',');
      var template = $('#detail-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#popup-movie-tp-detail .modal-body').html(html);
      $('#popup-movie-tp-detail').modal('show');
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
        // value.selected = true;
      } else {
        // value.selected = false;
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


function setSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json',
  })
      .done(function (res) {
        if (!!~~res.meta.result) {
          _sources = res.data;
          var html = '';
          _(_sources).forEach(function (source) {
            html += '<option value="' + source.sourceId + '">' + source.sourceName + '</option>';
          });

          $('#search_sourceId').append(html);
          $('#search_sourceId').chosen({ disable_search_threshold: 10, allow_single_deselect: true });
        } else {
          alert('接口错误：' + res.meta.msg);
        }
      });
}