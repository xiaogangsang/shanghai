/**
 *	util.js
 *
 *  工具类
 *	1. 根据编码组装 <optino> & <checkbox> 以及 解析编码为文字
 *  2. 可以写代码逻辑的 Template (准备全面替换 Mustache.js)
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

      var withAll = $(this).attr('with-all') != null && $(this).attr('with-all') !== false;
			$(this).html(util[key].optionsHTML(withAll, $(this).attr('value') || $(this).prop('value')));
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

Codec.prototype.optionsHTML = function(withAll, selectedKey) {

	var html = withAll ? '<option value="">全部</option>' : '';

  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var value = this[key];
      html += '<option value="' + key + '" ' + (key == selectedKey ? 'selected' : '') + '>' + value + '</option>';
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

Codec.prototype.radiosHTML = function(name, selectedKey, customizedProps) {
  var html = '';
	var nameSnippet = name ? ('name="' + name + '"') : '';
  for (var key in this) {
    if (this.hasOwnProperty(key)) {
      var value = this[key];
      var customizedProp = '';
      if (customizedProps) {
        if (typeof customizedProps === 'string') {
          customizedProp = customizedProps;
        } else {
          customizedProp = customizedProps[key] ? customizedProps[key] : '';
        }
      }

      html += '<div class="radio-inline"><label><input type="radio" ' + nameSnippet + ' value="' + key + '" ' + (selectedKey == key ? 'checked ' : ' ') + customizedProp + '><span>' + value + '</span></label></div>';
    }
  }

  return html;
}

// 评论类型
util.commentType = new Codec({'1' : '评论', '3' : '回复'});

// 渠道
util.channel = new Codec({'1' : '掌上生活', '2' : '手机银行'});

// 搜索词类型
util.searchTermType = new Codec({'1' : '搜索词', '2' : '热搜词'});

// 区域
util.areaType = new Codec({'1': '全国', '2': '区域'});

// 成本中心类别
util.budgetSourceLevel = new Codec({'0': '总行', '1': '支行', '2': '卡中心', '3': '卡部', '4': 'O2O项目组'});

// 万达非万达(查询条件)
util.isWanDa = new Codec({'0': '非万达', '1': '万达'});

// 前端配置类型
util.bannerType = new Codec({'1': '首页', '2': '热门影片', '3': '交叉销售位', '4': '选座页配置', '5': '影院页Banner', '6': '首页浮窗'});




/**
 *  Set up date range
 */
util.setupDateRange = function($startTime, $endTime) {
  $startTime.datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $endTime.datetimepicker('setStartDate', startDate);
  });

  $endTime.datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $startTime.datetimepicker('setEndDate', FromEndDate);
  });
}

/**
 * Normally just call `close()`, but that doesn't work in Firefox
 * Details see: http://stackoverflow.com/questions/19302387/close-firefox-tab-from-javascript
 */

util.close = function() {
 	window.open(document.URL,'_self','resizable=no,top=-245,width=250,height=250,scrollbars=no');
	window.close();
}

/************************************* Template ********************************************/
util.render = render; 

function render(template, data) {
  var regExp = /{{\s*(\^|#)\s*(.+?)\s*}}([^]+?){{\s*\/\s*\2\s*}}/g;
  var lastIndex = regExp.lastIndex = 0;
  var result = '', match;

  while (match = regExp.exec(template)) {
    var key = match[2], flag = match[1], innerTmpl = match[3];
    var templateBetweenSections = template.substring(lastIndex, match.index);
    result += renderSingleSection(templateBetweenSections, data);
      
    var sectionData = evalInContext(data, key);
    if (flag === '#' && sectionData) {
      var dataType = Object.prototype.toString.call(sectionData);
      if (dataType === '[object Array]') {
        sectionData.forEach(function (el) {
          result += render(innerTmpl, el);
        });
      } else if (dataType === '[object Object]') {
        result += render(innerTmpl, sectionData);
      } else if (dataType === '[object Function]') {
        result += sectionData.call(data, innerTmpl, function(template) {
          return renderSingleSection(template, data);
        });
      } else {
        result += render(innerTmpl, data);
      }
    } else if (flag === '^' && !sectionData) {
      result += render(innerTmpl, data);
    }
    lastIndex = regExp.lastIndex;
  }

  result += renderSingleSection(template.substring(lastIndex), data);
  return result;
}

function renderSingleSection(template, data) {
  var regExp = /{{{\s*(.+?)\s*}}}|{{&\s*(.+?)\s*}}|{{\s*(.+?)\s*}}/g;
  var lastIndex = regExp.lastIndex = 0;
  var result = '';
  var match;

  template = template;

  while (match = regExp.exec(template)) {

    result += template.substring(lastIndex, match.index);
    var matched = match[1] || match[2] || match[3];
    var escape = match[3];

    var value = evalInContext(data, matched);
    if (value !== void 0 && value !== null) {
      result += escape ? escapeHtml('' + value) : value;
    }

    lastIndex = regExp.lastIndex;
  }

  result += template.substring(lastIndex);

  return result;
}

function evalInContext(context, js) {
  var value = context;
  if ((js = js.trim()) !== '.')  {
    if (isPureNestedProp(js)) {
      value = evalNestedProp(context, js);
    } else {
      value = eval('try { with(context) { ' + js + ' } } catch (e) {}');
    }
  }

  return (typeof(value) === 'function' ? value.call(context) : value);
}

function isPureNestedProp(js) {
  var regex = /^\s*[a-zA-Z_\$][\w\$]*\s*(\.\s*[a-zA-Z_$][\w\$]*\s*)*$/;
  return regex.test(js);
}

function evalNestedProp(obj, nestedProp) {
  var nestedProps = nestedProp.split('.'), value = obj;
  for (var i = 0; i < nestedProps.length; ++i) {
    var prop = nestedProps[i].trim();
    value = value[prop];
    if (value === void 0 || value === null) {
      break;
    }
  }

  return value;
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

