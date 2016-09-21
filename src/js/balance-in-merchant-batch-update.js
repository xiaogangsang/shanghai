/*
  收单对账明细
  Pan Chong
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');


var _selectedSummary = {};

// _DEBUG 本地JSON字符串, 不连服务器本地调试用
var _DEBUG = false;

$(function() {

  common.init('balance-in-merchant-batch-update');

  var template = $('#file-upload-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);

  $('.content-area').prepend(html);
  
  /***************************************** 选择文件 ******************************************/

	// jQuery way
	// $(document).on('change', '.file-upload', fileChangeHandler);

	// static bind way
	// document.getElementsByClass("file-upload").addEventListener("click", fileChangeHandler);

	/* 
	 * jQuery 1.12 动态绑定change事件在firefox8下不起作用, 所以还是用最原始的绑定方式, 
   */
	document.addEventListener("change", function(event) {
    // retrieve an event if it was called manually
    event = event || window.event;

    // retrieve the related element
    var el = event.target || event.srcElement;

    var className = el.className;

    if (className.indexOf('file-upload') > -1) {

		  var parent = el.parentNode;
		  if (parent.className.indexOf('btn-danger') < 0) {
	    	event.preventDefault();
	    	fileChangeHandler(event, el);
	    	return false;
	    }
    }
	});
});

function fileChangeHandler(e, el) {
		e.preventDefault();

		var path = $(el).val();
	  fileName = path.match(/[^\/\\]*$/)[0];

	  var input = $(el).parents('.input-group').find(':text');
	  input.val(fileName);
	}

// 确定上传
$('body').on('click', '.btn-upload', function(e) {
  
  e.preventDefault();

  if (!confirm('上传后将更新对账数据，请仔细核对，保证数据文件的准确性。')) {
      return;
  }
  
  //var id = $(this).attr('id');
  var sendData;

  if (!_DEBUG) {
	  $.ajax({
	    url: common.API_HOST + '',
	    type: 'POST',
	    dataType: 'json',
	    data: sendData,
	  })
	  .done(function (res) {
	    //handleData(res);
	  });
	} else {
  //var res = $.parseJSON('{"meta" : {"result" : "1", "msg" : "操作成功"}, "data" : {"summary" : {}, "detail":{"count" : 2, "records":[{"checkStatus" : "2"}, {"checkStatus" : "2"}]}}}');
  //handleData(res);
	}
});