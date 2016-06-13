'use strict;'
var common = require('common');

$(function() {

	common.liquidationInit('merchant-creation');

	init();

	function init() {
		var template = $('#detail-template').html();
	  Mustache.parse(template);
	  var data = {};
	  var html = Mustache.render(template, data);

	  $('.breadcrumb').parent().after(html);

	  $('.detail-area').removeClass('readonly');
	}
});