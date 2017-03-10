/**
 *	util.js
 *
 *  工具类
 *	1. 根据编码组装 <optino> & <checkbox> 以及 解析编码为文字
 *	
 */

var util = module.exports = {};

util.sourceMapKey = 'source-map-key';

/**
 * init func
 * @param $ jQuery object
 * 在 document ready 后, 拿取所有 有 source-map-key 属性的 element. 
 * 判断类型, select: 调用 optionsHTML
 */
util.init = function($) {
	var util = this;
	var sourceMapKey = util.sourceMapKey;

	$('[' + sourceMapKey + ']').each(function() {

		var tagName = this.tagName.toLowerCase();
		var key = $(this).attr(sourceMapKey);

		if (tagName == 'select') {
			$(this).html(util[key].optionsHTML(false));
		} else if (tagName == '') {
			$(this).html(util[key].checkboxesHTML());
		}
	});
}

var Codec = function(dict) {
	for (var prop in dict) {
		if (dict.hasOwnProperty(prop)) {
			this[prop] = dict[prop];
		}
	}
};

Codec.prototype.parse = function(key) {
	return this[key];
};

Codec.prototype.optionsHTML = function(withAll) {

	var html = withAll ? '<option value="">全部</option>' : '';

  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var value = this[key];
      html += '<option value="' + key + '">' + value + '</option>';
    }
  }

  return html;
};

Codec.prototype.checkboxesHTML = function(name) {
	var html = '';
	var nameSnippet = name ? ('name="' + name + '"') : '';

	for (var key in this) {
		if (this.hasOwnProperty(key)) {
			var value = this[key];
			html += '<div class="checkbox-inline"><label><input type="checkbox" ' + nameSnippet + ' value="' + key + '"><span>' + value + '</span></label></div>';
		}
	}

	return html;
}

// 评论类型
util.commentType = new Codec({'1' : '评论', '2' : '回复'});

// 成本中心类别
util.budgetSourceLevel = new Codec({'0': '总行', '1': '支行', '2': '卡中心', '3': '卡部', '4': 'O2O项目组'});



/**
 * Normally just call `close()`, but that doesn't work in Firefox
 * Details see: http://stackoverflow.com/questions/19302387/close-firefox-tab-from-javascript
 */

util.close = function() {
 	window.open(document.URL,'_self','resizable=no,top=-245,width=250,height=250,scrollbars=no');
	window.close();
}

