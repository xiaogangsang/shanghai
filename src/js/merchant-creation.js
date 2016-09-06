'use strict;'
var common = require('common');

$(function() {

	// $('#hud-overlay').show();

	common.init('merchant-creation');

	init();

	function init() {

		// 商户输入项配置
		var template = $('#detail-template').html();
	  Mustache.parse(template);
	  var data = {};
	  var html = Mustache.render(template, data);

	  $('.breadcrumb').parent().after(html);

	  $('.detail-area').removeClass('readonly');

	  // 设置输入项的默认值
	  // 1. 周期拨款模式
	  $('#select-allocation-type').change();

	  // 2. 不发送拨款明细
	  $(':radio[name="allocation-detail-input"][value="0"]').prop('checked', true).change();

	  // 3. 发送对象
	  $(':checkbox[name="send-to"]').prop('checked', false).change();
	}
});

/****************************************** event handler **********************************************/
$(document).on('click', '.submit', function(e) {
	e.preventDefault();

	// 搜集type=text的输入项, 必输项
	var mandatoryKeys = ['merchantName', 
	'merchantContacter', 
	'merchantPhone', 
	'accountName', 
	'bankAccount', 
	'bankCode'];

	// 搜集type=text的输入项, 可选项
	var optionKeys = ['merchantRemark', 'allocationRemark'];

	// 搜集其他类型
});


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

