/**
  清算
  1. 状态码的转换全部统一放在这个文件里负责
  2. 一些工具函数也放在了这里
  3. 一些通用配置, 包括
      为每个页面增加 隐藏/显示 菜单栏 按钮
      查询的时间跨度限制
  Ge Liu created at 2016-07-27 17:51:15

  Modified history:
  2016-08-11 12:25:44 Ge Liu
    新增了查询日期的7天(结束日期 - 开始日期 <= 7)限制
  2016-08-16 10:59:27
    新增文件异步下载涉及到的各种状态编码
 */


var settlementCommon = module.exports = {};

// 收单商户
settlementCommon.merchant = {'1' : '卡中心', '2' : '总行'};

settlementCommon.parseMerchant = function(status) {
  return this.merchant[status];
}

settlementCommon.chargeMerchat = {'1' : 'O2O-卡中心', '2' : 'O2O-分行'};

settlementCommon.parseChargeMerchant = function(status) {
  return this.chargeMerchat[status];
}

// 收单订单类型
settlementCommon.acquiringOrderType = {'1' : '支付', '2' : '退款'};

settlementCommon.parseAcquiringOrderType = function(status) {
  return this.acquiringOrderType[status];
}


// 支付流水状态
settlementCommon.payStatus = 
  {'1' : '待支付', '2' : '支付成功', '3' : '支付失败', '4' : '退款中', '5' : '退款成功', '6' : '退款失败'};

settlementCommon.parsePayStatus = function(status) {
  return this.payStatus[status];
}


// 对账状态(收单和出货编码一样)
settlementCommon.reconciliationStatus = {'1' : '未对账', '2' : '对账不一致', '3' : '对账成功', '4' : '确认'};

settlementCommon.parseReconciliationStatus = function(status) {
  return this.reconciliationStatus[status];
}


// 收单对账失败原因
settlementCommon.reason = {'1' : '我方缺失', '2' : '对方缺失', '3' : '状态错误', '4' : '金额不符', '5' : '重复记录'};

settlementCommon.parseReason = function(status) {
  return this.reason[status];
}


// 出货对账失败原因
settlementCommon.outReason = 
  {'1' : '出货失败, 支付成功(未退款)', '2' : '退货失败, 退款成功(无承债方)', '3' : '退货成功, 退款失败(未退款)', '4' : '退货成功, 支付成功(未退款)', '5' : '金额不符', '6': '票类错误', '7': '出货成功, 支付失败(未扣款)'};

settlementCommon.parseOutReason = function(status) {
  return this.outReason[status];
}


// 支付渠道
settlementCommon.payTool = {'1' : '掌上生活', '2' : '手机银行', '3': '招联'};

settlementCommon.parsePayTool = function(status) {
  return this.payTool[status];
}


// 收单支付渠道
settlementCommon.acquiringPayTool = {'1' : 'O2O-卡中心', '2' : 'O2O-分行'};

settlementCommon.parseAcquiringPayTool = function(status) {
  if (status == void 0) {
    return '合计';
  } else {
    return this.acquiringPayTool[status];
  }
}


// 业务类别
settlementCommon.bizType = {'1' : '影票', '2' : '手续费'};

settlementCommon.parseBizType = function(status) {
  return this.bizType[status];
}

// 补贴付款方式
settlementCommon.subsidyType = {'0' : '无', '1' : '预付', '2' : '后付'};

settlementCommon.parseSubsidyType = function(status) {
  return this.subsidyType[status];
}

// 优惠方式
settlementCommon.discountType = {'1' : '活动', '2' : '优惠券', '9' : '无优惠'};

settlementCommon.parseDiscountType = function(status) {
  return this.discountType[status];
}


// 承债方
settlementCommon.partner = {'1' : 'O2O', '2' : 'TP方', '3' : '渠道方'};

settlementCommon.parsePartner = function(status) {
  return this.partner[status];
}


// 审核状态
settlementCommon.checkStatus = {'1' : '未修改', '2' : '待审核', '3' : '审核完成', '4' : '驳回', '5' : '已反审核'};

settlementCommon.parseCheckStatus = function(status) {
  return this.checkStatus[status];
}


// 出货状态
settlementCommon.shipmentStatus = 
  {'1' : '未出货(初始化状态)', '2' : '出货成功', '3' : '出货失败', '4' : '出货中', '5' : '待定', '6' : '待定', '7' : '退货成功', '8' : '退货失败'};

 settlementCommon.parseShipmentStatus = function(status) {
  return this.shipmentStatus[status];
 }

 // 出货订单类型
settlementCommon.shipmentOrderType = 
  {'0' : '无', '1' : '出货', '2' : '退货', '3' : '出货调整', '4' : '退货调整'};

 settlementCommon.parseShipmentOrderType = function(status) {
  return this.shipmentOrderType[status];
 }

 // 订单来源
settlementCommon.orderSource = 
  {'1' : '系统', '2' : '人工'};

 settlementCommon.parseOrderSource = function(status) {
  return this.orderSource[status];
 }


// 拨款状态
settlementCommon.moneyOutStatus = 
  // {'1' : '待拨款', '2' : '首次拨款成功', '3' : '暂停拨款', '4' : '银行退票', '5' : '待重拨', '6' : '生成拨款文件失败', '7' : '重拨成功'};
  {'1' : '待拨款', '3' : '正常拨款成功', '4' : '暂停拨款', '6' : '银行退票', '5' : '待重拨', '2' : '拨款失败', '7' : '重拨成功'};

settlementCommon.parseMoneyOutStatus = function(status) {
  return this.moneyOutStatus[status];
}


// 支付渠道
settlementCommon.channel = settlementCommon.payTool;

settlementCommon.parseChannel = function(status) {
  return this.channel[status];
}


// 拨款操作
settlementCommon.operation = {'1' : '银行退票', '2' : '重拨'};

settlementCommon.parseOperation = function(status) {
  return this.operation[status];
}

// 下载 -> 文件类型
settlementCommon.fileType = {'1' : '收单文件', '2' : '出货文件', '3' : '拨款文件'};
settlementCommon.parseFileType = function(status) {
  return this.fileType[status];
}

// 下载 -> 文件状态
settlementCommon.fileStatus = {'1' : '生成中', '2' : '可下载', '3' : '生成失败'};
settlementCommon.parseFileStatus = function(status) {
  return this.fileStatus[status];
}

// 对账批处理类型
settlementCommon.balanceFileType = {'1' : '收单状态', '2' : '出货状态', '3' : '收单商户信息', '4' : '出货商户信息', '5' : '出货调整', '6' : '退货调整'};
settlementCommon.parseBalanceFileType = function(status) {
  return this.balanceFileType[status];
}

// 对账批处理状态
settlementCommon.balanceFileStatus = {'1' : '操作中', '2' : '操作成功', '3' : '操作失败'};
settlementCommon.parseBalanceFileStatus = function(status) {
  return this.balanceFileStatus[status];
}

settlementCommon.reconciliationStatus = {'1' : '未对账', '2' : '对账不一致', '3' : '对账成功', '4' : '确认'};
settlementCommon.parseReconciliationStatus = function(status) {
  return this.reconciliationStatus[status];
}


/***************************************** 商户相关编码 **********************************************/

// 商户状态
settlementCommon.merchantStatus = 
  {'1' : '草稿', '2' : '已上线', '3' : '已下线', '4' : '审核驳回', '5' : '待审核', '6' : '已删除'};

settlementCommon.parseMerchantStatus = function(status) {
  return this.merchantStatus[status];
}

// 商户状态
settlementCommon.merchantInfoStatus = 
  {'2' : '已上线', '3' : '已下线', '4' : '审核驳回', '5' : '待审核', '6' : '已删除'};

settlementCommon.parseMerchantInfoStatus = function(status) {
  return this.merchantInfoStatus[status];
}

// 账户状态
settlementCommon.accountStatus = {'1' : '正常', '2' : '停用'};
settlementCommon.parseAccountStatus = function(status) {
  return this.accountStatus[status];
}

// TP方
settlementCommon.TP = {'1' : '百度', '2' : '万达', '3' : '微票'};
settlementCommon.parseTP = function(status) {
  return this.TP[status];
}

// 商户级别
settlementCommon.merchantLevel = {'1' : '总部', '2' : '区域'};
settlementCommon.parseMerchantLevel = function(status) {
  return this.merchantLevel[status];
}

// 责任部门使用状态
settlementCommon.departmentUseStatus = {'1' : '启用', '2' : '停用', '3' : '删除'};
settlementCommon.parseDepartmentUseStatus = function(status) {
  return this.departmentUseStatus[status];
}

/************************************************ Form / Table 的自动组装 ************************************************/
settlementCommon.formatTableWithData = function (table, data) {

  var $table = table.table, keyMap = table.keyMap, rowAttrs = table.rowAttrs;

  var html = '';
  html += '<thead><tr>';

  keyMap.forEach(function(map) {
    html += '<th>' + map.label + '</th>';
  });

  html += '</tr></thead>';
  html += '<tbody>'

  if (!data) data = '请点击“查询”按钮！';
  if (data.length === 0) data = '无满足条件的记录';

  if (typeof data === 'string') {
    html += '<tr><td colspan="' + keyMap.length + '" align="center">' + data + '</td></tr>';
  } else {
    if (Object.prototype.toString.call(data) !== '[object Array]') {
      data = [data];
    }

    data.forEach(function(item) {

      if (rowAttrs) {
        html += '<tr ' + rowAttrs(item) + '>'
      } else {
        html += '<tr>';
      }

      keyMap.forEach(function(map) {

        var value = map.key ? item[map.key] : '';

        var parseKey = map.parseKey;
        if (parseKey) {
          if (typeof parseKey === 'function') {
            value = parseKey(item);
          } else if (typeof parseKey === 'string') {
            if (parseKey === '.') {
              parseKey = map.key;
            }
            value = settlementCommon[parseKey][value];
          } else {
            value = parseKey[value];
          }
        }

        html += '<td>' + (value == null ? '' : value) + '</td>';
      });

      html += '</tr>';
    });
  }

  html += '</tbody>';

  $table.html(html);
}

settlementCommon.formatSearchForm = function (form, data) {
  var $container = form.container || form.form, fields = form.fields;
  form.data = form.data || {};

  // 和 detail 不同, 不用嵌套 row
  var html = '';
  var callbacks = [];
  var binds = [];
  var watchAndHandlers = [];

  fields.forEach(function (field, index) {
    var inputHTML = '';
    var value = (data && data[field.key || field.name]) || '';
    var customizedProp = ((typeof field.customizedProp === 'function') ? field.customizedProp(data) : field.customizedProp) || '';
    switch (field.type) {
      case 'input': 
        inputHTML += '<input type="text" class="form-control" name="' + field.name + '" value="' + value + '" ' + customizedProp + ' >';
        break;
      case 'select':
        inputHTML += '<select class="form-control" name="' + field.name + '" ' + (field.customizedProp || '') + ' >';
        var options;
        if (typeof field.options === 'string') {
          options = settlementCommon[field.options];
        } else {
          options = field.options;
        }
        inputHTML += settlementCommon.optionsHTML(options, true, value); // 这里和detail form不同, searchForm默认是true, options中带"全部"
        inputHTML += '</select>';
        break;
      default:
        throw new TypeError('Unknow input type: ' + field.type + '!');
        break;
    }

    // 和 detail 不同的地方, search form 一行 4 条, detail form 一行 2 条
    var before = '<div class="form-group col-sm-6 col-md-3"><div class="input-group"><div class="input-group-addon">' + field.label + '</div>';
    var after = '</div></div>';

    html += before + inputHTML + after;

    
    if (field.completion) {
      callbacks.push({name: field.name, func: field.completion});
    }

    if (field.bind = field.bind && field.bind.trim()) {
      binds.push({name: field.name, bindKey: field.bind});
    }

    if (field.watch) {
      field.watch.split(',').forEach(function(key) {
        if (key = key.trim()) {
          watchAndHandlers[key] = watchAndHandlers[key] || [];
          watchAndHandlers[key].push({name: field.name, handler: field.handler});
        }
      }); 
    }
  });

  // search form 是一次性渲染, 和 detail 不同
  $container.prepend(html);

  setTimeout(function() {
    // completion callback
    callbacks.forEach(function(callback) {
      callback.func.call($container.find(':input[name=' + callback.name + ']'), data);
    });

    // binding and watching
    binds.forEach(function(item, index) {
      var $input = $container.find(':input[name=' + item.name + ']');

      var handler = function(e) {
        form.data[item.bindKey] = $input.val();

        // notify all the watchers
        var watchers = watchAndHandlers[item.bindKey] || [];
        watchers.forEach(function(watcher) {
          var $input = $container.find(':input[name=' + watcher.name + ']');
          watcher.handler.call($input, form.data);
        });
      };

      handler();
      $input.on('change', handler);
    });
  }, 0);
};

settlementCommon.formatDetailForm = function (form, data) {
  var $container = form.container || form.form, fields = form.fields;
  form.data = form.data || {};

  var html = '<div class="row">';
  var callbacks = [];
  var binds = [];
  var watchAndHandlers = [];

  fields.forEach(function (field, index) {
    var inputHTML = '';
    var value = (data && data[field.key || field.name]) || '';
    var customizedProp = ((typeof field.customizedProp === 'function') ? field.customizedProp(data) : field.customizedProp) || '';
    switch (field.type) {
      case 'input': 
        inputHTML += '<input type="text" class="form-control" name="' + field.name + '" value="' + value + '" ' + customizedProp + ' >';
        break;
      case 'textarea':
        inputHTML  += '<textarea type="text" class="form-control" name="' + field.name + '" ' + customizedProp + ' >' + value + '</textarea>';
        break;
      case 'select':
        inputHTML += '<select class="form-control" name="' + field.name + '" ' + (field.customizedProp || '') + ' >';
        var options;
        if (typeof field.options === 'string') {
          options = settlementCommon[field.options];
        } else {
          options = field.options;
        }
        inputHTML += settlementCommon.optionsHTML(options, false, value);// 这里和searchForm不同, searchForm默认是true, options中带"全部"
        inputHTML += '</select>';
        break;
      default:
        throw new TypeError('Unknow input type: ' + field.type + '!');
        break;
    }

    var before = '<div class="form-group col-sm-6 col-md-6"><div class="input-group"><div class="input-group-addon">' + field.label + '</div>';
    var after = '</div></div>';

    html += before + inputHTML + after;

    
    if (field.completion) {
      callbacks.push({name: field.name, func: field.completion});
    }

    if (field.bind = field.bind && field.bind.trim()) {
      binds.push({name: field.name, bindKey: field.bind});
    }

    if (field.watch) {
      field.watch.split(',').forEach(function(key) {
        if (key = key.trim()) {
          watchAndHandlers[key] = watchAndHandlers[key] || [];
          watchAndHandlers[key].push({name: field.name, handler: field.handler});
        }
      }); 
    }
  });

  html += '</div>';

  $container.html(html);

  setTimeout(function() {
    // completion callback
    callbacks.forEach(function(callback) {
      callback.func.call($container.find(':input[name=' + callback.name + ']'), data);
    });

    // binding and watching
    binds.forEach(function(item, index) {
      var $input = $container.find(':input[name=' + item.name + ']');

      var handler = function(e) {
        form.data[item.bindKey] = $input.val();

        // notify all the watchers
        var watchers = watchAndHandlers[item.bindKey] || [];
        watchers.forEach(function(watcher) {
          var $input = $container.find(':input[name=' + watcher.name + ']');
          watcher.handler.call($input, form.data);
        });
      };

      handler();
      $input.on('change', handler);
    });
  }, 0);

  // search form 没有 auto submit
  // 防止重复绑定
  if (form.autoSubmit && !form.__autoSubmit) {
    form.__autoSubmit = function(e) {
      e.preventDefault();
      var data = $(this).queryParam();
      var modal = form.modal || $(this).closest('.modal');

      $.ajax({
        url: form.url,
        type: 'POST',
        dataType: 'json',
        data: data,
      })
      .done(function (res) {
        if (!!~~res.meta.result) {
          alert('提交成功');
          modal.modal('hide');
        } else {
          alert('接口错误：' + res.meta.msg);
        }
      });
    }
    // 奇怪的现象: 如果不动态绑定submit的话, 即使parsley表单验证失败还是会提交表单
    form.form.parent().on('submit', 'form', form.__autoSubmit);
  }
};


/**
 * 根据选项自动生成<option> html
 * 动态生成options可以使得状态编码如果修改的话, 只需要改一处即可, 所有select都会改过来
 * 
 * @param {Object} options 生成HTML的数据源
 * @param {Boolean} withAll 选项中是否有"全部"选项
 * 
 * @returns {String}
 */
settlementCommon.optionsHTML = function(options, withAll, selectedKey) {

  if (!options) return '';

  var html = withAll ? '<option value="">全部</option>' : '';

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      var value = options[key];
      html += '<option value="' + key + '" ' + (key == selectedKey ? 'selected' : '') + '>' + value + '</option>';
    }
  }

  return html;
}

// 自动生成表单提交参数
// Caution: this function is not fully tested. IT'S ERROR PRONE.
$.fn.queryParam = function() {

  // chosen.js 会把原先的 selet 隐藏, 所以要额外处理
  var $inputs = this.find(':input:not(:button):visible:not([skipsubmit])').add($('.chosen-container').closest('.form-group').filter(':visible').find('select'));

  var param = {};

  $inputs.each(function() {
    var key = $(this).attr('name');
    var value = $(this).val();

    if (key && (!$(this).is(':checkbox') || ($(this).is(':checked') && value)))  {
      var storedValue = param[key];
      if (!storedValue) {
        storedValue = value;
      } else if ($.isArray(storedValue)) {
        storedValue.push(value);
      } else {
        storedValue = [storedValue, value];
      }

      param[key] = storedValue;
    }
  });

  return param;
};


/**
 *  在编辑详情的地方我们会处理 'yyyy-MM-dd HH:mm' 格式的时间, 用这种格式的字符串直接初始化Date
 *  对于firefox来说会认为格式不合法, 经过测试发现firefox识别 'yyyy/MM/dd' 这种格式, 所以我们要做些处理
 */
settlementCommon.isValidTime = function(time) {
  var validFormat = time.replace(/-/g, '/');
  var date = new Date(validFormat);
  return !isNaN(date);
}


/****************************************** Utilities Method **********************************************/
// $.ajax 默认的对array(对象数组)的序列化不符合服务端需求, 我们自定义array的序列化
// Caution: only array is concerned in this function
settlementCommon.serializeParam = function(param) {

  var queryString = '';

  for (var key in param) {
    var value = param[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        var obj = value[i];

        var hasInnerKey = false;

        for (var innerKey in obj) {
          hasInnerKey = true;
          queryString += key + '[' + i + '].' + innerKey + '=' + encodeURIComponent(obj[innerKey]) + '&';
        }

        if (!hasInnerKey) {
          queryString += key + '[' + i + ']' + '=' + encodeURIComponent(obj) + '&';
        }
      }
    } else {
      queryString += key + '=' + encodeURIComponent(value) + '&';
    }
  }

  queryString = queryString.slice(0, queryString.length - 1);// remove last '&'

  return queryString;
}

// 下面是对字符串数组的自定义序列化, 以逗号(%2C)分隔
settlementCommon.toString = function(array) {
  var str = '';

  array.forEach(function(ele, index) {
    str += ele + (index === array.length - 1 ? '' : ',');
  });

  return str;
}

// 对返回数据错误的统一处理
settlementCommon.prehandleData = function(res) {

  // 接口错误, 弹alert
  // 内容错误(语义错误), 错误message显示在table里
  if (!!~~res.meta.result) {
    if (res.data == null || res.data.detail == null || res.data.detail.records == null || res.data.detail.records.length < 1) {
      // var errorMsg = res.meta.msg;
      var errorMsg = '查询成功，无满足条件记录';
      $('#dataTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#summaryTable tbody').html('<tr><td colspan="30" align="center">' + errorMsg + '</td></tr>');
      $('#pager').html('');
    } else {
      return true;
    }
  } else {
    // alert(res.meta.msg);
    var info = '<tr><td colspan="30" align="center">' + res.meta.msg + '</td></tr>';
    $('#dataTable tbody').html(info);
    $('#summaryTable tbody').html(info);
    $('#pager').html('');
  }
  return false;
}

settlementCommon.clone = function(objectToBeCloned) {
  // Basis.
  if (!(objectToBeCloned instanceof Object)) {
    return objectToBeCloned;
  }

  var objectClone;

  // Filter out special objects.
  var Constructor = objectToBeCloned.constructor;
  switch (Constructor) {
    // Implement other special objects here.
    case RegExp:
      objectClone = new Constructor(objectToBeCloned);
      break;
    case Date:
      objectClone = new Constructor(objectToBeCloned.getTime());
      break;
    default:
      objectClone = new Constructor();
  }

  // Clone each property.
  for (var prop in objectToBeCloned) {
    objectClone[prop] = this.clone(objectToBeCloned[prop]);
  }

  return objectClone;
}

settlementCommon.resetInput = function(input) {
  input.replaceWith(input.val('').clone(true));
}

settlementCommon.success = function (msg) {
  var alertHtml = '<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><div class="alert-content">' + msg + '</div></div>';
  $('.breadcrumb').after(alertHtml);
}

settlementCommon.warning = function (msg) {
  var alertHtml = '<div class="alert alert-warning alert-dismissible"><button type="button" class="close" data-dismiss="alert">&times;</button><div class="alert-content">' + msg + '</div></div>';
  $('.breadcrumb').after(alertHtml);
}

settlementCommon.fetchBasicData = function (callback, fetchFilter) {
  $.ajax({
    url: window.location.protocol + '//' + window.location.host + '/MovieOps/' + 'settlement/sign/allList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function(res) {
    if (!!~~res.meta.result) {

      // 处理标识
      var signObj = {};
      _(res.data.detail.sign).each(function(item) {
        signObj[item.id] = item.signName;
      });

      // 处理状态
      var disposeObj = {};
      _(res.data.detail.dispose).each(function(item) {
        disposeObj[item.id] = item.disposeName;
      });

      // 责任部门
      var departmentObj = {};
      _(res.data.detail.department).each(function(item) {
        departmentObj[item.id] = item.departmentName;
      });

      // 差异类型
      var typeObj = {};
      _(res.data.detail.type).each(function(item) {
        if (fetchFilter === 'diff-operation') {
          if (item.addStatus === 2) {
            typeObj[item.id] = item.differenceName;
          }
        } else if (fetchFilter === 'diff-query') {
          if (item.addStatus === 1) {
            typeObj[item.id] = item.differenceName; 
          }
        } else {
          typeObj[item.id] = item.differenceName;
        }
      });

      callback({"sign" : signObj, "dispose" : disposeObj, "department" : departmentObj, "type" : typeObj});

    } else {
      callback(null);
    }
  })
}

settlementCommon.setupDatetimePicker = function($datetimepicker) {
  $datetimepicker.datetimepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      minView: 2,
      todayHighlight: true,
      autoclose: true,
    }).on('changeDate', function (ev) {
      $datetimepicker.trigger('input');
    });
}

settlementCommon.datetimepickerRegister = function ($startTime, $endTime) {

  if ($startTime && $endTime) {
    $startTime.datetimepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      minView: 2,
      todayHighlight: true,
      autoclose: true,
    }).on('changeDate', function (ev) {
      var startDate = new Date(ev.date.valueOf());
      var endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);

      var currentEndDate = $endTime.datetimepicker('getDate');
      var correctEndDate = currentEndDate;

      if (currentEndDate < startDate) {
        correctEndDate = startDate;
      } else if (currentEndDate > endDate) {
        correctEndDate = endDate;
      }

      $endTime.datetimepicker('setDate', correctEndDate);
      // parsley 交互更友好
      $startTime.trigger('input');
      $endTime.trigger('input');
    });

    $endTime.datetimepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      minView: 2,
      todayHighlight: true,
      autoclose: true,
    }).on('changeDate', function (ev) {
      var endDate = new Date(ev.date.valueOf());
      var startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - 6);

      var currentStartDate = $startTime.datetimepicker('getDate');
      var correctStartDate = currentStartDate;

      if (currentStartDate < startDate) {
        correctStartDate = startDate;
      } else if (currentStartDate > endDate) {
        correctStartDate = endDate;
      }

      $startTime.datetimepicker('setDate', correctStartDate);
      // parsley 交互更友好
      $endTime.trigger('input');
      $startTime.trigger('input');
    });
  }

  if ($startTime && ($endTime === null)) {
    $startTime.datetimepicker({
      format: 'yyyy-mm-dd',
      language: 'zh-CN',
      minView: 2,
      todayHighlight: true,
      autoclose: true,
    });
  }
}

settlementCommon.addAsteriskToRequiredInputs = function() {

  var existingRequiredInputs = $(':input[required]:not(:button)');

  settlementCommon.toggleAsteriskToInputs(existingRequiredInputs);

  var isInput = function(node) {
    var tagName = node.tagName && node.tagName.toLowerCase();
    var inputs = ['input', 'select', 'textarea'];
    return (inputs.indexOf(tagName) >= 0);
  }

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  if (MutationObserver) {
    new MutationObserver(function(mutationRecords) {
      var $mutatedInputs = [];
      mutationRecords.forEach(function(record, index) {
        if (record.type === 'childList') {
          // node added
          if (record.addedNodes && record.addedNodes.length) {
            record.addedNodes.forEach(function(node, index) {
              if (node.nodeType === 1) {
                if (isInput(node)) {
                  $mutatedInputs.push(node);
                } else {
                  $mutatedInputs = $mutatedInputs.concat(Array.prototype.slice.call(node.querySelectorAll('input, select, textarea')));
                }
              }
            });
          }
        } else if (record.type === 'attributes') {
          // attributes changed
          if (isInput(record.target)) {
            $mutatedInputs.push(record.target);
          }
        }
      });
      settlementCommon.toggleAsteriskToInputs($mutatedInputs);
    }).observe(document.querySelector('body'), {childList: true, attributes: true, subtree: true, attributeFilter: ['required']});
  }
}

settlementCommon.toggleAsteriskToInputs = function(elements) {
  for (var i = 0; i < elements.length; ++i) {
    var $el = $(elements[i]);
    var $addon = $el.prevAll('.input-group-addon:first');
    var isRequired = $el.prop('required');
    var $asterisks = $addon.find('.required-asterisk');
    var hasAnAsterisk = $asterisks.length > 0;
    if (isRequired && !hasAnAsterisk) {
      $addon.append('<span class="required-asterisk" style="color: #D70F0F; font-size: 16px;"> *</span>');
    } else if (!isRequired && hasAnAsterisk) {
      $asterisks.remove();
    }
  }
}

/************************************************* 全局初始化处理 *****************************************************/

// 点击隐藏/显示左侧菜单栏 的按钮
$(function() {

  // 必填项添加*号标识
  settlementCommon.addAsteriskToRequiredInputs();

  // 查询日期的跨度小于等于7天
  settlementCommon.datetimepickerRegister($('#search_startTime'), $('#search_endTime'));

  $('<button class="glyphicon glyphicon-menu-left" style="position: absolute; top: -1px; left: 0px; width: 15px; height: 30px; padding: 0px; border-width: 0px; border-radius: 0px 6px 6px 0px; background-color: #E0E0E0; opacity: 0.6;" id="sidebar-switcher"></button>').prependTo('.main');

  $('#sidebar-switcher').click(function(e) {
    e.preventDefault();

    var $sidebar = $('.sidebar');
    var $content = $('.main');

    if ($sidebar.is(':visible')) {
      $sidebar.hide();
      $content.addClass('col-xs-12').removeClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2');
      $(this).removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
    } else {
      $sidebar.show();
      $content.removeClass('col-xs-12').addClass('col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2');
      $(this).removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
    }
  });
});
