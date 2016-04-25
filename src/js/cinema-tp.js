var common = require('common');
var _sources = {};
var _brands = {};
var _cities = [];
var _pageIndex = 1;
var _pageSize = 10;
var _pageTotal = 0;
var _querying = false;
var _bindCinemaName = '';

$(function() {
  common.setMenu('cinema-tp');
  //set search form
  setSource();
  setBrand();
  setCity();

  $.fn.datetimepicker.dates['zh-CN'] = {
    days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
    daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
    months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    today: "今天",
    suffix: [],
    meridiem: ["上午", "下午"]
  };
  $('#search_beginDate,#search_endDate').datetimepicker({format: 'yyyy-mm-dd', language: 'zh-CN', minView: 2, todayHighlight: true, autoclose: true});
});

//handle search form
$('#formSearch').on('change', '#search_associationStatus', function(e) {
  e.preventDefault();
  if ( 1 == $(this).val() ) {
    $('#association').show();
  } else {
    $('#association').hide();
  }
});
$('#formSearch').on('submit', function(e) {
  e.preventDefault();
  var sendData = {
    associationStatus: $('#search_associationStatus').val(),
    sourceId: $('#search_sourceId').val(),
    thirdPartyCinemaName: $.trim( $('#search_thirdPartyCinemaName').val() ),
    pageIndex: _pageIndex,
    pageSize: _pageSize
  };
  if ( 1 == $('#search_associationStatus').val() ) {
    sendData.cinemaName = $.trim( $('#search_cinemaName').val() );
    sendData.brandId = $('#search_brandId').val();
    sendData.cityId = $('#search_cityId').val();
    sendData.beginDate = $.trim( $('#search_beginDate').val() );
    sendData.endDate = $.trim( $('#search_endDate').val() );
  }
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    _querying = false;
    console.log(res);
    if (true == res.meta.result) {
      if (res.data.rows.length <= 0 ) {
        $('#dataTable tbody').html('<tr><td colspan="10" align="center">请点击“查询”按钮！</td></tr>');
        alert('暂无数据！');
        return false;
      }
      _pageIndex = res.data.pageIndex;
      _pageTotal = Math.ceil(res.data.total/_pageSize);
      setPager(res.data.total, _pageIndex, res.data.rows.length, _pageTotal);
      _(res.data.rows).forEach(function(value, key){
        var source = _.find(_sources, { sourceId: parseInt(value.thirdParty) });
        if (source) {
          res.data.rows[key].thirdPartyName = source.sourceName;
        }
      });
      setTableData(res.data.rows);
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
  return false;
});
$('#formSearch').on('click', 'button[type=submit]', function(event) {
  event.preventDefault();
  _pageIndex = 1;
  $("#formSearch").trigger('submit');
});
$('#pager').on('click', '.prev,.next', function(e) {
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
    _pageIndex++
  }
  $("#formSearch").trigger('submit');
  return false;
});
$('#pager').on('click', '#btn-pager', function(e) {
  e.preventDefault();
  if ('' ==$('#pageNo').val()) {
    return false;
  }
  var pageNo = parseInt( $('#pageNo').val() );
  if (NaN == pageNo || pageNo < 1 || pageNo > _pageTotal) {
    alert('要跳转的页码超过了范围！');
    return false;
  }
  _pageIndex = pageNo;
  $("#formSearch").trigger('submit');
  return false;
});
$('#dataTable').on('click', '.btn-detail', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/cinemaDetail',
    type: 'POST',
    dataType: 'json',
    data: {
      thirdPartyCinemaId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid')
    }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      // var data = res.data;
      // var template = $('#detail-template').html();
      // Mustache.parse(template);
      // var html = Mustache.render(template, data);
      var html = '<div class="cinema-detail clearfix">';
      _(res.data).forEach(function(value, key){
        if ('' != value && undefined != value && null != value) {
          html += '<div class="detail-item"><span>'+key+'：</span>'+value+'</div>';
        }
      });
      html += '</div>';
      $('#popup-cinema-tp-detail .modal-body').html(html);
      $('#popup-cinema-tp-detail').modal('show');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$('#dataTable').on('click', '.btn-bind', function(e) {
  e.preventDefault();
  var tpCinemaName = $(this).closest('tr').find('td:nth-child(2)').text();
  var tpCinemaId = $(this).closest('tr').data('id');
  var sourceId = $(this).closest('tr').data('sourceid');
  console.log($(this).closest('tr').data('sourceid'));
  $('#bindCinemaName').val(tpCinemaName);
  $('#bindTpCinema').text(tpCinemaName);
  $('#cinemaId').val();
  $('#thirdPartyCinemaId').val(tpCinemaId);
  $('#sourceId').val(sourceId);
  $('#formSearchCinema').trigger('submit');
  $('#popup-cinema-bind').modal('show');
});
$('#dataTable').on('click', '.btn-bind-create', function(e) {
  e.preventDefault();
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/createAndBind',
    type: 'POST',
    dataType: 'json',
    data: {
      tpCinemaId: $(this).closest('tr').data('id'),
      sourceId: $(this).closest('tr').data('sourceid'),
      associationStatus: 1
    }
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      alert('新建标准影院，并关联成功！');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
$(document).on('submit', '#formSearchCinema', function(e) {
  e.preventDefault();
  var bindCinemaName = $.trim( $('#bindCinemaName').val() );
  if ('' == bindCinemaName || undefined == bindCinemaName || _bindCinemaName == bindCinemaName) {
    if ('' == bindCinemaName) {
      alert('搜索关键词不能为空！');
    }
    return false;
  }
  _bindCinemaName = bindCinemaName;
  // console.log(sendData);
  if (true == _querying) {
    return false;
  }
  _querying = true;
  $.ajax({
    url: common.API_HOST + 'common/cinemaList',
    type: 'POST',
    dataType: 'json',
    data: {cinemaName: bindCinemaName}
  })
  .done(function(res) {
// console.log(res);
_querying = false;
if (true == res.meta.result) {
  if (res.data.length <= 0 ) {
    $('#popup-cinema-bind tbody').html('<tr><td colspan="5" align="center">暂无匹配，请尝试搜索其他影院名</td></tr>');
    return false;
  }
  var data = {rows:res.data};
  var template = $('#tr-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#popup-cinema-bind tbody').html(html);
  $('#popup-cinema-bind').on('click', '#cinemaTable tbody tr', function(e) {
    e.preventDefault();
    $('#cinemaTable tbody tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#cinemaId').val( $(this).data('id') );
  });
} else {
  alert('接口错误：'+res.meta.msg);
}
});
});
$(document).on('submit', '#formBindCinema', function(e) {
  e.preventDefault();
  var sendData = {
    cinemaId: $('#cinemaId').val(),
    sourceId: $('#sourceId').val(),
    thirdPartyCinemaId: $('#thirdPartyCinemaId').val(),
    status: 1,
    associationStatus: 1
  };
  console.log(sendData);
  $.ajax({
    url: common.API_HOST + 'cinema/thirdParty/updateAssociationStatus',
    type: 'POST',
    dataType: 'json',
    data: sendData
  })
  .done(function(res) {
    console.log(res);
    if (true == res.meta.result) {
      alert('绑定成功！');
      $('#popup-cinema-bind').modal('hide');
      $('#formSearch').trigger('submit');
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
});
function setTableData(rows) {
  var data = {rows:rows};
  var template = $('#table-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#dataTable tbody').html(html);
}
function setModal(cinemaData) {
  var data, template, cities, districts;
  if (cinemaData) {
    _(_brands).forEach(function(value, key){
      _brands[key].selected = cinemaData.brandId==value.id ? true : false;
    });
    _(_provinces).forEach(function(value, key){
      if (cinemaData.provinceId==value.provinceId) {
        _provinces[key].selected = true;
        cities = _provinces[key].cityList;
      } else {
        _provinces[key].selected = false;
      }
    });
    var availableServices = JSON.parse(cinemaData.service);
    _(_services).forEach(function(value, key){
      var availableService = _.find(availableServices, { 'serviceTypeId': value.id });
      if (availableService && availableService.serviceContent != undefined) {
        _services[key].selected = true;
        _services[key].content = availableService.serviceContent;
      } else {
        _services[key].selected = false;
      }
    });

    data = {cinema:cinemaData, brands: _brands, provinces:_provinces, cities: cities, services: _services};
    template = $('#edit-template').html();
    Mustache.parse(template);
    var html = Mustache.render(template, data);
    setArea(cinemaData.cityId, cinemaData.areaId, cinemaData.districtId);
    $('#popup-cinema-form .modal-title').html('编辑标准影院');
  } else {
    data = {brands: _brands, provinces:_provinces, services: _services};
    template = $('#create-template').html();
    $('#popup-cinema-form .modal-title').html('新增标准影院');
    Mustache.parse(template);
    var html = Mustache.render(template, data);
  }
  $('#popup-cinema-form .modal-body').html(html);
}
function setSource() {
  $.ajax({
    url: common.API_HOST + 'common/sourceList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      _sources = res.data;
      _(_sources).forEach(function(source){
        $('#search_sourceId').append($('<option></option>').attr('value', source.sourceId).text(source.sourceName));
      });
      $("#search_sourceId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setBrand() {
  $.ajax({
    url: common.API_HOST + 'common/brandList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res.data);
    if (true == res.meta.result) {
      _brands = res.data;
      _(_brands).forEach(function(brand){
        $('#search_brandId').append($('<option></option>').attr('value', brand.id).text(brand.name));
      });
      $("#search_brandId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setCity() {
  $.ajax({
    url: common.API_HOST + 'common/cityList',
    type: 'GET',
    dataType: 'json'
  })
  .done(function(res) {
    // console.log(res);
    if (true == res.meta.result) {
      _(res.data).forEach(function(group){
        _(group).forEach(function(city){
          _cities.push( city );
        });
      });
      $.each(_cities, function(index, item) {
        $('#search_cityId').append($('<option></option>').attr('value', item.cityId).text(item.cityName));
      });
      $("#search_cityId").chosen({disable_search_threshold: 10,allow_single_deselect: true});
    } else {
      alert('接口错误：'+res.meta.msg);
    }
  });
}
function setPager(total, pageIndex, rowsSize, pageTotal) {
  var data = {total:total,pageIndex:pageIndex,rowsSize:rowsSize,pageTotal:pageTotal};
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}