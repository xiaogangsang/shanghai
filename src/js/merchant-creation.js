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
var dataCache;
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;

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
	$('.allocation-type1-input').hide();
	$('.allocation-type2-input').hide();
	$('#merchantNoDiv').hide();

  // 2. 不发送拨款明细
  // $(':radio[name="allocation-detail-input"][value="0"]').prop('checked', true).change();

	// 4. 配置商户级别和TP方数据源 
  $('#detail-merchantClass').html(settlementCommon.optionsHTML(settlementCommon.merchantLevel, false));
  $('#detail-tpId').html(settlementCommon.optionsHTML(settlementCommon.TP, true));
  $('#detail-merchantStatus').html(settlementCommon.optionsHTML(settlementCommon.merchantInfoStatus, false));
  $('#detail-merchantStatus option[value="5"]').prop('selected', true);
	$('#detail-merchantStatus').attr('disabled', 'true');
	// $('#detail-merchantStatus').attr('required', 'false');

  $('#attachment-table').hide();

  var template = $('#file-upload-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template);
  $('#attachments-container').append(html);

	/****************************************** event handler **********************************************/
	// 拨款模式
	$('body').on('change', '#select-allocation-type', function(e) {
	  e.preventDefault();
	  var value = $(this).val();

		$('.allocation-type1-input').hide();
	  $('.allocation-type2-input').hide();

	  if (value == '1') {
	    $('.allocation-type1-input').show();
	    $('#allocationPeriod').attr('required', 'true');
	    $('#allocationDelay').attr('required', 'true');
	    $('#select-fixed-allocation-day').removeAttr("required");
	  } else if (value == '2') {
	    $('.allocation-type2-input').show();
	    $('#select-fixed-allocation-day').attr('required', 'true');
	    $('#allocationPeriod').removeAttr("required");
	    $('#allocationDelay').removeAttr("required");
	  }
		// tpl里requied 手动调用加星
		settlementCommon.addStarMark();
	});

	// 是否发送拨款明细
	$('body').on('change', ':radio[name="allocation-detail-input"]', function(e) {
	  if ($(this).val() == '1') {
	    $('.send-allocation-detail-container').show();
	    $('#allocationDetailReceiver1').attr('required', 'true');
	    $('#allocationDetailReceiver2').attr('required', 'true');

	  } else if ($(this).val() == '0') {
	    $('.send-allocation-detail-container').hide();
	    $('#allocationDetailReceiver1').removeAttr("required");
	    $('#allocationDetailReceiver2').removeAttr("required");
	  }
	  $('.merchant-email').hide();
	  $('.branch-email').hide();
		// tpl里requied 手动调用加星
		settlementCommon.addStarMark();
	});

	// 发送对象
	$('body').on('change', ':checkbox[name="send-to"]', function(e) {
	  if ($(this).val() == '1') {
	    if ($(this).prop('checked')) {
	      $('.merchant-email').show();
	    	$('#email').attr('required', 'true');
	    } else {
	    	$("#email").removeAttr("required");
	      $('.merchant-email').hide();
	    }
	  } else if ($(this).val() == '2') {
	    if ($(this).prop('checked')) {
	      $('.branch-email').show();
      	$("#cardEmail").removeAttr("required");
	    } else {
	    	$("#cardEmail").removeAttr("required");
	      $('.branch-email').hide();
	    }
	  }
	  settlementCommon.addStarMark();
	});

  // 2. 不发送拨款明细
  $(':radio[name="allocation-detail-input"][value="0"]').prop('checked', true).change();


	$('#merchantPhone').blur(
       function(){
          $('#merchantPhone').parsley().validate();
          if (!$('#merchantPhone').parsley().isValid()) {
              return false;
            }
     });
	$('#email').blur(
	       function(){
	          $('#email').parsley().validate();
	          if (!$('#email').parsley().isValid()) {
	              return false;
	            }
	      });

	$('#cardEmail').blur(
	       function(){
	          $('#cardEmail').parsley().validate();
	          if (!$('#cardEmail').parsley().isValid()) {
	              return false;
	            }
	      });

	$('#bankAccount').blur(
	       function(){
	          $('#bankAccount').parsley().validate();
	          if (!$('#bankAccount').parsley().isValid()) {
	              return false;
	            }
	      });
  // tpl里requied 手动调用加星
  settlementCommon.addStarMark();

  $('#detail_formSearch').parsley();

	/****************************************** 开户行 ******************************************/

	function showModal(e) {

		e.preventDefault();
	  var template = $('#select-bank-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, {});

	  $('#popup-merchant-bank .modal-body').html(html);
	  $('#bank_formSearch').on('submit', function (e) {
		e.preventDefault();
		var sendData = {
	    bankName: $('#bank_Name').val(),
	    networkName: $('#networkName').val(),
	    cityName: $('#cityName').val(),
	    pageSize: _pageSize,
	    pageIndex: _pageIndex,
	  };

	  $.ajax({
      url: common.API_HOST + 'common/bank/list',
      type: 'POST',
      dataType: 'json',
      data: sendData,
	  })
	  .done(function (res) {
	  	if (!!~~res.meta.result == true) {
	  		if (res.data.bankList.rows.length < 1) {
		      $('#back_dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
		      $('#bank_pager').html('');
		    } else {
		      useCache = true;
		      // _pageIndex = res.data.pageIndex;
		      var totalRecord = res.data.bankList.total;
		      var record = res.data.bankList.rows;

		      _pageTotal = Math.ceil(totalRecord / _pageSize);
		      setPager(totalRecord, _pageIndex, record.length, _pageTotal);

		      dataCache = record;
		      setTableData(dataCache);
		    }
		  } else {
		  	alert('接口错误：' + res.meta.msg);
		  }
	 });
	});

	  $('#popup-merchant-bank').modal('show');

	}

	$(document).on('click', '#select-bank', showModal);
	// 查询银行网点
	// $('body').on('click', '#back_search', function(e) {

	function setTableData(rows) {
	  var data = { rows: rows };
	  var template = $('#bank-table-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#bank_dataTable tbody').html(html);
	}

	function setPager(total, pageIndex, rowsSize, pageTotal) {
	  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
	  var template = $('#bank-pager-template').html();
	  Mustache.parse(template);
	  var html = Mustache.render(template, data);
	  $('#bank_pager').html(html);
	}

	$('body').on('click', '.prev,.next', function (e) {
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

  $('#bank_formSearch').trigger('submit');
  return false;
});

$('body').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if ('' == $('#pageNo').val()) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#bank_formSearch').trigger('submit');
  return false;
});

$('body').on('click', '#back_reset', function(e) {
	e.preventDefault();
  $('#bank_Name').val('');
  $('#networkName').val('');
  $('#cityName').val('');
});

$('body').on('click', '.btn-select', function(e) {
	e.preventDefault();

	var index = $(this).parents('tr')[0].sectionRowIndex;
  var sectionData = dataCache[index];
  $('#bankName').val(sectionData.name);
  $('#bankCode').val(sectionData.code);

  $('#popup-merchant-bank').modal('hide');
  });




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
	       url: common.API_HOST + 'settlement/merchantAttachment/uploadAttachment',
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
	      url: common.API_HOST + 'settlement/merchantAttachment/delete',
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
			var departmentEmail = $('#cardEmail').val();
			var email = $('#email').val();
	   	if ($('#inlineCheckbox1').prop('checked')) {
	      allocationDetail = 1;
	    } else if ($('#inlineCheckbox2').prop('checked')) {
		    allocationDetail = 0;
				departmentEmail = '';
				email = '';

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
	   merchantClass: $('#detail-merchantClass').val(),
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
	   // 拨款日期
	   fixedAllocationDay: $('#select-fixed-allocation-day').val(),
	   // 拨款摘要
	   allocationRemark: $('#allocationRemark').val(),
	   // 是否发送拨款明细
	   allocationDetail: allocationDetail,
	   // 发送对象
	   allocationDetailReceiver: allocationDetailReceiver,
	   // 商户E-mail
	   email: email,
	   // 卡部E-mail
	   departmentEmail: departmentEmail,
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
	   url: common.API_HOST + 'settlement/merchantinfo/addMerchant',
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
