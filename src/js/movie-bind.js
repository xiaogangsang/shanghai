'use strict;'

var common = require('common');
var _movieId = 0;
var _bindMovieName = '';
var _querying = false;
var _submitting = false;

$(function () {
  common.init('movie');

  var urlParam = common.getUrlParam();
  if (urlParam.movieId == undefined || urlParam.movieId == '') {
    alert('缺少参数！');
    location = 'movie.html';
  }

  _movieId = urlParam.movieId;

  $.ajax({
    url: common.API_HOST + 'film/standardFilm/detail',
    type: 'POST',
    dataType: 'json',
    data: { id: _movieId },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      var data = res.data;
      res.data.dimenName = res.data.dimen != null ? res.data.dimen : '';
      var template = $('#movie-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('.movie-detail').html(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

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
});

$('#tpMovieTable').on('click', '.btn-bind', function (e) {
  e.preventDefault();
  var tr = $(this).closest('tr');
  var tpMovieName = $('h2').text();
  var thirdPartyFilmId = tr.data('id');
  var thirdPartyId = tr.data('tpid');

  $('#bindMovieName').val(tpMovieName);
  $('#bindTpMovie').text(thirdPartyFilmId + ':' + tr.find('td:nth-child(2)').text());

  $('#thirdPartyFilmId').val(thirdPartyFilmId);
  $('#thirdPartyId').val(thirdPartyId);
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
          movie.dimenNames = movie.dimen != null ? movie.dimen : '';
          movie.showDate = movie.showDate.split(' ')[0];
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
