'use strict;'

var common = require('common');
var settlementCommon = require('settlementCommon');

var _tpList = [];
var _channelList = [];
var _channelId;

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

	    $('#container-content').append(html);

	    $('#tpSelect').multiselect({
	      search: {
	        left: '<input type="text" name="q" class="form-control" placeholder="可选TP方..." />',
	        right: '<input type="text" name="q" class="form-control" placeholder="已选TP方..." />',
	      },
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

$(document).on('submit', 'form', function (event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;

  $('.multi-selection option').prop('selected', true);

  var ids = [];

  $('#brandSelect_to option, #effectSelect_to option, #serviceSelect_to option, #durationSelect_to option').each(function (index, el) {
    // if (!$(el).hasClass('hidden')) {
      ids.push($(el).val());
    // }
  });

  var points = $('input[name=points]:checked').data("id");

  if (points) ids.push(points);

  $.ajax({
    url: common.API_HOST + 'filter/updateFilterSettings.json',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({selected: ids}),
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      alert('提交成功!');
    } else {
      alert('操作失败：' + res.meta.msg);
    }
  });

  return false;
});