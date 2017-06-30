'use strict;'

var common = require('common');
require('fineUploader');

var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _channels = {};
var _roles = {};
var _cities = [];
var _budgetSource = [];
var _querying = false;
var searchCache = {};
var useCache = false;
var _submitting = false;

$(function () {
  common.init('user');

  $('#btn-export').attr('href', common.API_HOST + 'security/user/exportUsers');

  var uploader = new qq.FineUploaderBasic({
    button: $('#fileupload')[0],
    request: {
      endpoint: common.API_HOST + 'security/user/importUsers',
      inputName: 'file',
      filenameParam: 'file',
    },
    callbacks: {
      onError: function (id, fileName, errorReason) {
        if (errorReason != 'Upload failure reason unknown') {
          console.log(errorReason);
          alert('上传失败');
        }
      },

      onComplete: function (id, fileName, responseJSON) {
        if (!!~~responseJSON.meta.result) {
          alert('导入成功！');
        } else {
          alert('接口错误：' + responseJSON.meta.msg);
        }
      },
    },
  });

  //set search form
  setRole();

  //cache data
  getChannels();
  getCities();
  getBudgetSource();

  $('#formSearch').trigger('submit');
});

//handle search form
$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  _pageIndex = 1;
  useCache = false;
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();
  var sendData = {
    realName: $.trim($('#search_realName').val()),
    loginId: $.trim($('#search_loginId').val()),
    city: $.trim($('#search_city').val()),
    department: $.trim($('#search_department').val()),
    roleId: $('#search_roleId').val(),
    createdBy: $.trim($('#search_createdBy').val()),
    pageSize: _pageSize,
  };
  if (!!_querying) {
    return false;
  }

  _querying = true;
  if (useCache) {
    sendData = searchCache;
  } else {
    searchCache = sendData;
  }

  sendData.pageIndex = _pageIndex;

  $.ajax({
    url: common.API_HOST + 'security/user/userList',
    type: 'POST',
    dataType: 'json',
    data: sendData,
  })
  .done(function (res) {
    _querying = false;
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="9" align="center">查不到相关数据，请修改查询条件！</td></tr>');
        $('#pager').html('');
      } else {
        useCache = true;
        _pageIndex = res.data.pageIndex;
        _pageTotal = Math.ceil(res.data.total / _pageSize);
        setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
        setTableData(res.data.rows);
      }
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$(document).on('click', '#btn-import', function (event) {
  event.preventDefault();
  $('#popup-user-import').modal('show');
});

$('#dataTable').on('click', '.btn-edit', function (e) {
  e.preventDefault();
  var userId = $(this).parents('tr').data('id');
  $.ajax({
    url: common.API_HOST + 'security/user/userDetail',
    type: 'POST',
    dataType: 'json',
    data: { id: userId },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      res.data.channelAuthority = res.data.channelAuthority != undefined ? res.data.channelAuthority : [];
      res.data.roles = res.data.roles != undefined ? res.data.roles : [];
      res.data.cityAuthority = res.data.cityAuthority != undefined ? res.data.cityAuthority : [];
      setModal(res.data);
      $('#popup-user-form').modal('show');
      $('#popup-user-form form').parsley();
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
});

$('#dataTable').on('click', '.btn-reset', function (e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要重置此用户的密码吗？')) {
    $.ajax({
      url: common.API_HOST + 'security/user/resetPassword',
      type: 'POST',
      dataType: 'json',
      data: { id: that.data('id') },
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        try {
          $('#reset-possword .modal-body b').text(res.data.password);
          $('#reset-possword').modal('show');
          // alert('密码已重置为：' + res.data.password + '\n请复制该密码并妥善保管！');
        } catch (err) {
          alert('接口错误：未生成密码！');
        }
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$('#dataTable').on('click', '.btn-delete', function (e) {
  e.preventDefault();
  var that = $(this).parents('tr');
  if (window.confirm('确定要删除此用户吗？')) {
    $.ajax({
      url: common.API_HOST + 'security/user/deleteUser',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify([that.data('id')]),
    })
    .done(function (res) {
      if (!!~~res.meta.result) {
        alert('删除成功！');
        that.fadeOut(500, function () {
          that.remove();
        });

        $('#formSearch').trigger('submit');
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('click', '#btn-create', function (e) {
  e.preventDefault();
  setModal(false);
  $('#popup-user-form').modal('show');
  $('#popup-user-form form').parsley();
});

$('#pager').on('click', '.prev,.next', function (e) {
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

  $('#formSearch').trigger('submit');
  return false;
});

$('#pager').on('click', '#btn-pager', function (e) {
  e.preventDefault();
  if (~~$('#pageNo').val() == 0) {
    return false;
  }

  var pageNo = parseInt($('#pageNo').val());
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }

  _pageIndex = pageNo;
  $('#formSearch').trigger('submit');
  return false;
});

$(document).on('click', '.multi-check-all', function () {
  var items = $(this).closest('table').find('.multi-check');
  if ($(this).prop('checked')) {
    items.prop('checked', true);
  } else {
    items.prop('checked', false);
  }
});

$(document).on('click', '#btn-delete-multi', function (e) {
  e.preventDefault();
  if ($('.multi-check:checked').length < 1) {
    alert('请至少选中一个用户！');
    return false;
  }

  if (window.confirm('确定要删除选中的用户吗？')) {
    var userIds = [];
    var $checkedItems = $('.multi-check:checked');
    $checkedItems.each(function (index, el) {
      userIds.push($(this).closest('tr').data('id'));
    });

    $.ajax({
      url: common.API_HOST + 'security/user/deleteUser',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(userIds),
    })
    .done(function (res) {
      ;
      if (!!~~res.meta.result) {
        alert('删除成功');
        $checkedItems.each(function (index, el) {
          $(this).closest('tr').fadeOut(1000, function () {
            $(this).remove();
          });
        });
      } else {
        alert('接口错误：' + res.meta.msg);
      }
    });
  }

  return false;
});

$(document).on('click', '#popup-user-form button[type=submit]', function (event) {
  // 这里不要preventDefalt, 要不然会截住submit和parsley
  $('.multi-selection option').prop('selected', true);
});
$(document).on('submit', '#popup-user-form form', function(event) {
  event.preventDefault();
  if (_submitting) {
    return false;
  }

  _submitting = true;
  var sendData = {
    realName: $.trim($('#popup-user-form #realName').val()),
    city: $.trim($('#popup-user-form #city').val()),
    department: $.trim($('#popup-user-form #department').val()),
    mobile: $.trim($('#popup-user-form #mobile').val()),
    email: $.trim($('#popup-user-form #email').val()),
  };
  sendData.cityNames = [];
  sendData.cities = [];
  $('#citySelect_to option').each(function (index, el) {
    if (!$(el).hasClass('hidden')) {
      sendData.cities.push($(el).val());
      sendData.cityNames.push($(el).text());
    }
  });

  sendData.roles = [];
  $('#roleSelect_to option').each(function (index, el) {
    if (!$(el).hasClass('hidden')) {
      sendData.roles.push($(el).val());
    }
  });

  sendData.budgetIds = [];
  $('#budgetSourceSelect_to option').each(function(index, el) {
    sendData.budgetIds.push($(el).val());
  });

  var checkedChannels = [];
  $('input[name="channel"]:checked').each(function () {
    checkedChannels.push($(this).val());
  });

  sendData.channels = checkedChannels;
  var ajaxUrl = common.API_HOST + 'security/user/saveUser';
  if ($('#userId').length > 0) {
    sendData.id = $('#popup-user-form #userId').val();
    ajaxUrl = common.API_HOST + 'security/user/updateUser';
  } else {
    sendData.loginId = $.trim($('#popup-user-form #loginId').val());
  }

  $.ajax({
    url: ajaxUrl,
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(sendData),
  })
  .done(function (res) {
    _submitting = false;
    if (!!~~res.meta.result) {
      if ($('#userId').length > 0) {
        alert('用户已更新！');
      } else {
        try {
          $('#allocated-possword .modal-body b').text(res.data.password);
          $('#allocated-possword').modal('show');
          // alert('用户已添加！分配的随机密码为：' + res.data.password + '\n请复制该密码并妥善保管！');
        } catch (err) {
          alert('接口错误：未生成密码！');
        }
      }

      $('#formSearch').trigger('submit');
      $('#popup-user-form').modal('hide');
    } else {
      alert('操作失败：' + res.meta.msg);
    }
  });

  return false;
});

function setModal(userData) {
  var data;
  var template;
  if (userData) {
    _(_channels).forEach(function (value, key) {
      _channels[key].selected = userData.channelAuthority.indexOf(value.channelId) > -1
      ? true
      : false;
    });

    delete userData.channelAuthority;
    _(_roles).forEach(function (value, key) {
      _roles[key].selected = userData.roles.indexOf(value.id) > -1 ? true : false;
    });

    delete userData.roles;
    _(_cities).forEach(function (value, key) {
      _cities[key].selected = userData.cityAuthority[0] == 0 || userData.cityAuthority.indexOf(value.cityId) > -1 ? true : false;
    });

    delete userData.cityAuthority;

    _(_budgetSource).forEach(function(value, key) {
      value.selected = (userData.budgetAuthority.indexOf(value.id) > -1);
    });
    delete userData.budgetAuthority;

    data = { user: userData, channels: _channels, roles: _roles, cities: _cities, budgetSources: _budgetSource };
    template = $('#edit-template').html();
    $('#popup-user-form .modal-title').html('编辑用户');
  } else {
    data = { channels: _channels, roles: _roles, cities: _cities, budgetSources: _budgetSource };
    template = $('#create-template').html();
    $('#popup-user-form .modal-title').html('新增用户');
  }

  Mustache.parse(template);
  var html = Mustache.render(template, data);

  $('#popup-user-form .modal-body').html(html);

  $('#roleSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#roleSelect_to',
    rightAll: '#roleSelect_all',
    rightSelected: '#roleSelect_right',
    leftSelected: '#roleSelect_left',
    leftAll: '#roleSelect_none',
  });

  $('#citySelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: '#citySelect_to',
    rightAll: '#citySelect_all',
    rightSelected: '#citySelect_right',
    leftSelected: '#citySelect_left',
    leftAll: '#citySelect_none',
  });

  $('#budgetSourceSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="候选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="已选..." />',
    },
    right: 'budgetSourceSelect_to',
    rightAll: '#budgetSourceSelect_all',
    rightSelected: '#budgetSourceSelect_right',
    leftSelected: '#budgetSourceSelect_left',
    leftAll: '#budgetSourceSelect_none',
  });
}

function setTableData(rows) {
  var data = { rows: rows };
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}

function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

function setRole() {
  $.ajax({
    url: common.API_HOST + 'security/role/roleList',
    type: 'POST',
    dataType: 'json',
    data: {
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _roles = res.data;
      var html = '';
      $.each(_roles, function (index, role) {
        html += '<option value="' + role.id + '">' + role.id + ':' + role.roleName + '</option>';
      });

      $('#search_roleId').append(html);
      $('#search_roleId').chosen({ disable_search_threshold: 6, allow_single_deselect: true });
    }
  });
}

function getChannels() {
  $.ajax({
    url: common.API_HOST + 'common/channelList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _channels = res.data;
    } else {
      alert('获取渠道列表失败：' + res.meta.msg);
    }
  });
}

function getCities() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function (group) {
        _(group).forEach(function (city) {
          _cities.push(city);
        });
      });
    } else {
      alert('获取城市列表失败：' + res.meta.msg);
    }
  });
}


function getBudgetSource() {
  $.ajax({
    url: common.API_HOST + 'common/budgetSourceList',
    type: 'POST',
    dataType: 'json',
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      _(res.data).forEach(function(group, key) {
        _budgetSource = _budgetSource.concat(group);
      })
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}

