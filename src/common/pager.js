'use strict;'

var pager = {};

pager.pageIndex = 1;
pager.pageTotal = 0;
pager.pageSize = 1;

pager.init = function ($element) {

  $element.on('click', '.prev,.next', function (e) {
    e.preventDefault();
    if ($(this).hasClass('prev')) {
      if (pager.pageIndex <= 1) {
        pager.pageIndex = 1;
        alert('已经是第一页！');
        return false;
      }
      pager.pageIndex--;

    } else {
      if (pager.pageIndex >= pager.pageTotal) {
        pager.pageIndex = pager.pageTotal;
        alert('已经是最后一页！');
        return false;
      }
      pager.pageIndex++;
    }

    $('#formSearch').trigger('submit');
    return false;
  });

  $element.on('click', '#btn-pager', function (e) {
    e.preventDefault();
    if (~~$('#pageNo').val() == 0) {
      return false;
    }

    var pageNo = parseInt($('#pageNo').val());
    if (NaN == pageNo || pageNo < 1 || pageNo > pager.pageTotal) {
      alert('要跳转的页码超过了范围！');
      return false;
    }

    pager.pageIndex = pageNo;
    $('#formSearch').trigger('submit');
    return false;
  });
}

pager.setPager = function (total, pageIndex, rowsSize, pageTotal) {
  var data = { total: total, pageIndex: pageIndex, rowsSize: rowsSize, pageTotal: pageTotal };
  var template = $('#pager-template').html();
  Mustache.parse(template);
  var html = Mustache.render(template, data);
  $('#pager').html(html);
}

module.exports = pager;
