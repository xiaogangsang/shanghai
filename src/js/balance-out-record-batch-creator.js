'use stricts;'

var common = require('common');
var settlementCommon = require('settlementCommon');

$(function() {
    common.init("balance-out-record-batch-creator");


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

	$('body').append('<div id="hud-overlay" style="display: none"><div class="hud"><img src="images/loader.gif"><p>上传附件中...</p></div></div>');
});

function fileChangeHandler(e, el) {
    e.preventDefault();

    var files = $(el).prop('files');
    if (files) {
        var file = files[0];
        var size = file.size;
        if (size < 1024576 * 50) {
            var fileName = file.name;
            var fileExt = fileName.substring(fileName.lastIndexOf('.'));
            var validExts = ['.xls', '.xlsx'];
            if (validExts.indexOf(fileExt) >= 0) {
                var input = $(el).parents('.input-group').find(':text');
                input.val(fileName);
                return true;
            } else {
                var input = $(el).parents('.input-group').find(':text');
                input.val('');
                alert('不支持的文件格式!  (仅支持 .xls .xlsx)');
            }
        } else {
            alert('文件大小超过50MB!');
        }
    }

    settlementCommon.resetInput($(el));
    return false;
}

// 确定上传
$('body').on('click', '.btn-upload', function(e) {

    e.preventDefault();

    var formData = new FormData();

    var file = $('.file-upload').prop('files')[0];
    var operateType = $('#order_type').val();
    if (file && operateType) {
        if (!confirm('上传后将更新对账数据，请仔细核对，保证数据文件的准确性。')) {
            return;
        }

        formData.append('file', file);
        formData.append('operateType', operateType);

        $('#hud-overlay').show();

        $.ajax({
	        url: common.API_HOST + 'settlement/batchUploadFileRecord/batchUploadOperate',
	        type: 'POST',
	        contentType: false,
	        processData: false,
	        data: formData
	    })
	    .done(function(res) {
	        $('#hud-overlay').hide();
	        if (!!~~res.meta.result == true) {
	            alert('上传成功！');
	        } else {
	            alert('接口错误：' + res.meta.msg);
	        }
	    });
    } else {
        alert('请先选择文件');
    }
});
