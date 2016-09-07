/*
  Author: Ge Liu
  Create: 2016-06-02 17:25:26
  Description: 商户新增页 :
 */

'use strict;'
var common = require('common');
var settlementCommon = require('settlementCommon');

$(function() {

	common.init('merchant-creation');

	// 商户输入项配置
	var template = $('#detail-template').html();
  Mustache.parse(template);
  var data = {};
  var html = Mustache.render(template, data);

  $('.breadcrumb').parent().after(html);

  // $('.detail-area').removeClass('readonly');

  // 设置输入项的默认值
  // 1. 周期拨款模式
  $('#select-allocation-type').change();

  // 2. 不发送拨款明细
  $(':radio[name="allocation-detail-input"][value="0"]').prop('checked', true).change();

  // 3. 发送对象
  $(':checkbox[name="send-to"]').prop('checked', false).change();

	// 4. 配置商户级别和TP方数据源 
  $('#detail-merchantClass').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, true));
  $('#detail-tpId').html(settlementCommon.optionsHTML(settlementCommon.TP, true));

  $('#attachment-table').hide();

  var template = $('#file-upload-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);

  $('#attachments-container').append(html);

	// /****************************************** event handler **********************************************/
	// $(document).on('click', '.submit', function(e) {
	// 	e.preventDefault();

	// 	// 搜集type=text的输入项, 必输项
	// 	var mandatoryKeys = ['merchantName', 
	// 	'merchantContacter', 
	// 	'merchantPhone', 
	// 	'accountName', 
	// 	'bankAccount', 
	// 	'bankCode'];

	// 	// 搜集type=text的输入项, 可选项
	// 	var optionKeys = ['merchantRemark', 'allocationRemark'];

	// 	// 搜集其他类型
	// });


	/****************************************** event handler **********************************************/
	// 拨款模式
	$('body').on('change', '#select-allocation-type', function(e) {
	  e.preventDefault();
	  var value = $(this).val();

		$('.allocation-type1-input').hide();
	  $('.allocation-type2-input').hide();

	  if (value == '1') {
	    $('.allocation-type1-input').show();
	  } else if (value == '2') {
	    $('.allocation-type2-input').show();
	  }
	});

	// 是否发送拨款明细
	$('body').on('change', ':radio[name="allocation-detail-input"]', function(e) {
	  if ($(this).val() == '1') {
	    $('.send-allocation-detail-container').show();
	  } else if ($(this).val() == '0') {
	    $('.send-allocation-detail-container').hide();
	  }
	});

	// 发送对象
	$('body').on('change', ':checkbox[name="send-to"]', function(e) {
	  if ($(this).val() == '1') {
	    if ($(this).prop('checked')) {
	      $('.merchant-email').show();
	    } else {
	      $('.merchant-email').hide();
	    }
	  } else if ($(this).val() == '2') {
	    if ($(this).prop('checked')) {
	      $('.branch-email').show();
	    } else {
	      $('.branch-email').hide();
	    }
	  }
	});

	/****************************************** 开户行 ******************************************/

	function showModal(e) {

		e.preventDefault();
	  var template = $('#select-bank-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, {});

	  $('#popup-merchant-bank .modal-body').html(html);

	  $('#popup-merchant-bank').modal('show');
	}

	$(document).on('click', '#select-bank', showModal);


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

		  var parent = el.parentElement;
		  if (parent.className.indexOf('btn-danger') < 0) {
	    	event.preventDefault();
	    	fileChangeHandler(event, el);
	    	return false;
	    }
    }
	}, true);

	function fileChangeHandler(e, el) {
		e.preventDefault();

		var path = $(el).val();
	  fileName = path.match(/[^\/\\]*$/)[0];

	  var input = $(el).parents('.input-group').find(':text');
	  input.val(fileName);

	  var $parentSpan = $(el).parent();
	  $parentSpan.find('span').text('删除文件');
	  $parentSpan.removeClass('btn-default');
	  $parentSpan.addClass('btn-danger');

	  var template = $('#file-upload-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template);

	  $('#attachments-container').append(html);
	}

	$('body').on('click', '.btn-file', function(e) {
		if ($(this).hasClass('btn-danger')) {
			var $div = $(this).closest('.row');
      $div.remove();
      return false;
		}
	});

	/***************************************** 提交 ******************************************/

	$('.submit').click(function(e) {
		e.preventDefault();
		var formData = new FormData();

		if ($('.file-upload').length > 1) {
			$('.file-upload').each(function() {
				var file = $(this).prop('files')[0];
				if (file) {
					formData.append('file', file);
				}
			});
		}

		$('#hud-overlay').show();

		$.ajax({
	    url: common.API_HOST + 'settlement/test',
	    type: 'POST',
	    contentType: false,
	    processData:false,
	    data: formData
	  })
	  .done(function (res) {
	  	$('#hud-overlay').hide();
	    if (res.meta.result == true) {
	      alert('保存成功！');
	    } else {
	      alert('接口错误：' + res.meta.msg);
	    }
	  });
	});
});