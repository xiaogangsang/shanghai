'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');

var _tpList = [];
var _channelList = [];
var _channelId;
var _submitting = false;

$(function () {
  common.init('channel');
  queryChannelList();
});

function queryData () {
	$.ajax({
	  url: common.API_HOST + 'channelRelSource/querySourcesByChannel',
	  type: 'POST',
	  dataType: 'json',
	  data: {
	  	channelId: _channelId,
	  }
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
	    var result = {}
	    result.tp = _tpList;
	    result.selectedTp = res.data;

			var template = $('#content-template').html();
	    Mustache.parse(template);
	    var html = Mustache.render(template, result);

	    $('#container-content').html(html);

	    $('#tpSelect').multiselect({
	      right: '#tpSelect_to',
	      rightAll: '#tpSelect_all',
	      rightSelected: '#tpSelect_right',
	      leftSelected: '#tpSelect_left',
	      leftAll: '#tpSelect_none',
	    });
		}
	})
}

function queryTPList () {
  $.ajax({
    url: common.API_HOST + 'tp/tpList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function(res) {
  	if (!!~~res.meta.result) {
  		queryData();
  		_tpList = res.data;
   	}
  })
}

function queryChannelList () {
	$.ajax({
	  url: common.API_HOST + 'common/channelList',
	  type: 'POST',
	  dataType: 'json',
	})
	.done(function(res) {
  	if (!!~~res.meta.result) {
			queryTPList();

  		_channelList = res.data;
  		var channelData = {}
  		$.each(_channelList, function(index, item) {
  			 channelData[item.channelId] = item.channelName;
  			 (index == 0) ? _channelId = item.channelId : null;
  		});
  		var channelHtml = settlementCommon.optionsHTML(channelData, false);
  		$('#channelId').html(channelHtml);
  	}
	})
}

$(document).on('change', '#channelId', function(e) {
	e.preventDefault();
	_channelId = $('#channelId').val();
	queryData()
});

$(document).on('submit', 'form', function (e) {
  e.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;

  $('.multi-selection option').prop('selected', true);

  var ids = [];
  $('#tpSelect_to option').each(function (index, el) {
    ids.push($(el).val());
  });

  $.ajax({
    url: common.API_HOST + 'channelRelSource/saveChannelRelSource',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
    	channelId: _channelId,
    	sourceIdList: ids,
    }),
    // data: {
    //   channelId: _channelId,
    //   sourceIdList: ids,
    // },
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('保存成功!');
    } else {
      alert('保存失败：' + res.meta.msg);
    }
  });

  return false;
});