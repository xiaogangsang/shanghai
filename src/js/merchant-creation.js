/*
  Author: Ge Liu
  Create: 2016-06-02 17:25:26
  Description: 商户新增页 :
 */

'use strict;'
var common = require('common');
// require('fineUploader');
var settlementCommon = require('settlementCommon');
var fileIds = new Array();

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
  $(':checkbox[name="send-to"]').prop('checked', true).change();

	// 4. 配置商户级别和TP方数据源 
  $('#detail-merchantClass').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, true));
  $('#detail-tpId').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  $('#detail-merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantStatus, true));

  $('#attachment-table').hide();

  var template = $('#file-upload-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#attachments-container').append(html);

  $('#detail_formSearch').parsley();

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

		  var parent = el.parentNode;
		  if (parent.className.indexOf('btn-danger') < 0) {
	    	event.preventDefault();
	    	fileChangeHandler(event, el);
	    	return false;
	    }
    }
	});

	function fileChangeHandler(e, el) {
		e.preventDefault();

		var path = $(el).val();
	  fileName = path.match(/[^\/\\]*$/)[0];

	  var input = $(el).parents('.input-group').find(':text');
	  input.val(fileName);

    var uploadFile = $('.file-upload').prop('files')[0];
    var fileName = $('.file-upload').prop('files')[0].name;

    var formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('imageFileName', fileName);
    
	   if (uploadFile) {
	      $('#hud-overlay').show();
	      $.ajax({
	       url: common.API_HOST + 'settlement/merchantAttachment/uploadAttachment.json',
	       type: 'POST',
	       contentType: false,
	       processData: false,
	       data: formData
		   })
		   .done(function(res) {
		       $('#hud-overlay').hide();
		       if (!!~~res.meta.result == true) {
		           alert('上传成功！');
		           var $parentSpan = $(el).parent();
						  $parentSpan.find('span').text('删除文件');
						  $parentSpan.removeClass('btn-default');
						  $parentSpan.addClass('btn-danger');

						  fileIds.push(res.data.fileId);

						  var fileId = res.data.fileId;
							$parentSpan[0].setAttribute("id", fileId);

		       } else {
		          alert('接口错误：' + res.meta.msg);
			       	var $parentSpan = $(el).parent();
			       	$parentSpan.parent().parent().remove()
		       }
		       var template = $('#file-upload-template').html();
					 Mustache.parse(template);
					 var html = Mustache.render(template);
					 $('#attachments-container').append(html);
		   });
	    } else {
	        alert('请先选择文件');
	    }

	}

	$('body').on('click', '.btn-file', function(e) {
		if ($(this).hasClass('btn-danger')) {
			var $div = $(this).closest('.row');
			var fileId = $div.context.id;

			var sendData = {
		    id: fileId,
		  };

		  $.ajax({
	      url: common.API_HOST + 'settlement/merchantAttachment/delete.json',
	      type: 'POST',
	      dataType: 'json',
	      data: sendData,
		  })
		  .done(function (res) {
		  	if (!!~~res.meta.result == true) {
		  		$.each(fileIds,function(index,item){ 
			      if(item==fileId){
			         fileIds.splice(index,1);
			      }
			    });
	     		$div.remove();
			  } else {
			  	alert('接口错误：' + res.meta.msg);
			  }
		 });
      return false;
		}
	});

	/***************************************** 提交 ******************************************/

	$('.submit').click(function(e) {
			e.preventDefault();

			// 手动调用parsley验证，如果把button写在form里面则会自动触发验证。
			$('#detail_formSearch').parsley().validate();

			if (!$('#detail_formSearch').parsley().isValid()) {
			  return false;
			}

			var merchantType = '';
			if ($('#merchantTypeCheckbox').prop('checked')) {
			      merchantType = 1;
			    }

	    var allocationDetail = '';
	   	if ($('#inlineCheckbox1').prop('checked')) {
	      allocationDetail = 1;
	    } else if ($('#inlineCheckbox2').prop('checked')) {
	    allocationDetail = 0;
	    }

	    var allocationDetailReceiver = '';
	    if ($('#allocationDetailReceiver1').prop('checked') && $('#allocationDetailReceiver2').prop('checked')) {
	      allocationDetailReceiver = 3;
	    } else if ($('#allocationDetailReceiver1').prop('checked')) {
	    allocationDetailReceiver = 1;
	    } else if ($('#allocationDetailReceiver2').prop('checked')) {
	    allocationDetailReceiver = 2;
	    } else {
	    allocationDetailReceiver = 4;
	    }

	  var sendData = {
	  // 商户名称
	   merchantName: $('#merchantName').val(),
	   // 商户号
	   merchantId: $('#merchantNo').val(),
	   // 商户状态
	   merchantStatus: $('#detail-merchantStatus').val(),
	   // 商户联系人
	   merchantContacter: $('#merchantContacter').val(),
	   // 联系电话
	   merchantPhone: $('#merchantPhone').val(),
	   // 员工姓名
	   userName: $('#userName').val(),
	   // 员工编号
	   userId: $('#userId').val(),
	   // 商户级别
	   merchantClass: $('#merchantClass').val(),
	   // 商户类别
	   merchantType: $('#merchantType').val(),
	   // TP方
	   tpId: $('#detail-tpId').val(),
	   // 商户类别
	   merchantType: merchantType,
	   // 商户备注信息
	   merchantRemark: $('#merchantRemark').val(),
	   // 拨款模式
	   allocationType: $('#select-allocation-type').val(),
	   // 拨款周期
	   allocationPeriod: $('#allocationPeriod').val(),
	   // 拨款延迟天数
	   allocationDelay: $('#allocationDelay').val(),
	   // 拨款摘要
	   allocationRemark: $('#allocationRemark').val(),
	   // 是否发送拨款明细
	   allocationDetail: allocationDetail,
	   // 发送对象
	   allocationDetailReceiver: allocationDetailReceiver,  
	   // 商户E-mail
	   email: $('#email').val(),
	   // 卡部E-mail
	   departmentEmail: $('#cardEmail').val(),
	   // 账户名
	   accountName: $('#accountName').val(),
	   // 账号
	   bankAccount: $('#bankAccount').val(),
	   // 开户行
	   branchName: $('#bankName').val(),
	   // 银行行号
	   bankCode: $('#bankCode').val(),
	   // 上传文件
	   fileIds: fileIds,

	  };

	$.ajax({
	   url: common.API_HOST + 'settlement/merchantinfo/addMerchant.json',
	   type: 'POST',
     traditional: true,
	   data: sendData,
	 })
	 .done(function (res) {
	   if (res.meta.result == true) {
	     alert('保存成功！');
	     window.location.reload();
	   } else {
	     alert('接口错误：' + res.meta.msg);
	   }
	 });
	});

});