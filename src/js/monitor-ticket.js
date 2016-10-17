/*
* @Author: kyle
* @Date:   2016-08-29 10:37:39
* @Last Modified by:   kyle
* @Last Modified time: 2016-10-17 14:23:12
*/

'use strict';

var common = require('common');
var echarts = require('echarts');

var _productOrderStatus = ['未出票', '出票中', '已出票', '出票失败', '已退票'];
var _productPayStatus = ['', '待支付', '支付成功', '支付失败', '', '退款成功', '退款失败', '', '', '已关闭'];

var _queryDates = [];

$(function () {
  common.init('monitor-ticket');

  $('#search_beginTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var startDate = new Date(ev.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(ev.date.valueOf())));
    $('#search_endTime').datetimepicker('setStartDate', startDate);
  });

  $('#search_endTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
  }).on('changeDate', function (ev) {
    var FromEndDate = new Date(ev.date.valueOf());
    FromEndDate.setDate(FromEndDate.getDate(new Date(ev.date.valueOf())));
    $('#search_beginTime').datetimepicker('setEndDate', FromEndDate);
  });

  var todayDate = new Date();
  todayDate = common.getDate(todayDate);
  $('#search_beginTime').val(todayDate).datetimepicker('setEndDate', todayDate);
  $('#search_endTime').val(todayDate).datetimepicker('setEndDate', todayDate);
});

$('#formSearch').on('click', 'button[type=submit]', function (event) {
  event.preventDefault();
  $('#formSearch').trigger('submit');
});

$('#formSearch').on('submit', function (e) {
  e.preventDefault();

  $('#listDate').hide();
  $('#listDate select').html('');
  _queryDates = [];

  var beginTime = $('#search_beginTime').val();
  var endTime = $('#search_endTime').val();
  var type = $('#search_type').val();

  $.ajax({
    url: common.API_HOST + 'monitor/ticketFailRate',
    type: 'POST',
    dataType: 'json',
    data: {
      beginTime: beginTime,
      endTime: endTime,
      // type: type,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data.respData.xAxis.length < 1) {
        alert('查询成功，但无数据！');
        $('#chart').css('height', '0px');
        return false;
      }

      //查询订单数据
      var dateSpan = new Date(endTime).getTime() - new Date(beginTime).getTime();
      dateSpan = dateSpan / (1000 * 60 * 60 * 24);
      dateSpan = Math.floor(dateSpan);
      if (dateSpan > 0) {
        if (dateSpan > 3) {
          _queryDates = res.data.respData.xAxis;
        } else {
          var dateSplit = beginTime.split('-');
          for (var i = 0; i <= dateSpan; i++) {
            _queryDates.push(dateSplit[0] + '-' + dateSplit[1] + '-' + (parseInt(dateSplit[2]) + i));
          }
        }

        var html = '';
        _(_queryDates).forEach(function (item, key) {
          html += '<option value="' + item + '">' + item + '</option>';
        });

        $('#listDate select').html(html);
        $('#listDate').show();
      } else {
        _queryDates.push(beginTime);
      }

      queryOrder(type, _queryDates[0]);

      //生成图标
      $('#chart').css('height', '400px');
      var myChart = echarts.init(document.getElementById('chart'));
      myChart.setOption({
        grid: {
          left: 40,
          top: 20,
          right: 20,
          bottom: 80,
        },
        color: ['#ff8903'],
        xAxis: {
          data: res.data.respData.xAxis,
        },
        yAxis: {
          name: '失败率',
          nameLocation: 'middle',
          nameGap: 30,
        },
        title: {
          text: '最小：' + res.data.respData.min + '      平均：' + res.data.respData.avg + '      最大：' + res.data.respData.max + '      最新累计：' + res.data.respData.sum,
          left: 'center',
          bottom: 0,
        },
        tooltip: {
          formatter: '日期时间：{b}<br>失败率：{c}',
        },
        series: [{
          type: 'line',
          data: res.data.respData.yAxis,
          // markPoint: {
          //   symbolSize: 30,
          //   data: [
          //   { type: 'min', name: '最小值' },
          //   { type: 'max', name: '最大值' },
          //   ],
          // },
        }, ],
      });
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });

  return false;
});

$('#listDate').on('change click', 'select', function (event) {
  event.preventDefault();
  queryOrder($('#search_type').val(), $(this).val());
});

function queryOrder(type, queryDate) {
  $('#dataTable tbody').html('<tr><td colspan="12" align="center">查询中，请稍等...</td></tr>');
  $.ajax({
    url: common.API_HOST + 'monitor/page',
    type: 'POST',
    dataType: 'json',
    data: {
      beginTime: queryDate,
      type: type,
      pageIndex: 1,
      pageSize: 9999,
    },
  })
  .done(function (res) {
    if (!!~~res.meta.result) {
      if (res.data.rows.length < 1) {
        $('#dataTable tbody').html('<tr><td colspan="12" align="center">恭喜，' + queryDate + ' 没有异常数据！</td></tr>');
        return false;
      }

      var itemNum = 0;
      _(res.data.rows).forEach(function (item, key) {
        item.no = ++itemNum;
        item.createTime = common.getDate(new Date(item.createTime));
        item.payStatus = _productPayStatus[item.payStatus];
        item.shipStatus = _productOrderStatus[item.shipStatus];
      });

      var data = { rows: res.data.rows };
      var template = $('#table-template').html();
      Mustache.parse(template);
      var html = Mustache.render(template, data);
      $('#dataTable tbody').html(html);
    } else {
      alert('接口错误：' + res.meta.msg);
    }
  });
}
