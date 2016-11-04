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
            var validExts = ['.xls'];
            if (validExts.indexOf(fileExt) >= 0) {
                var input = $(el).parents('.input-group').find(':text');
                input.val(fileName);
                return true;
            } else {
                var input = $(el).parents('.input-group').find(':text');
                input.val('');
                alert('不支持的文件格式!  (仅支持 .xls)');
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





$('#btn-debug-record-in').click(function(e) {
    $('#popup-balance-in-record').modal('show');
});

$('#btn-debug-record-out').click(function(e) {
    $('#popup-balance-out-record').modal('show');
});

$(document).on('change', '#record_discountType', function(e) {
	e.preventDefault();
	
	// 若存在常规优惠活动时，以下字段必填
	var discountType = $('#record_discountType').val();
	$('#record_discountName').prop('required', (~~discountType > 0));	// 活动/优惠券名称
	$('#record_discountId').prop('required', (~~discountType > 0));		// 活动/优惠券ID
	$('#record_costCenter').prop('required', (~~discountType > 0));		// 常规补贴成本中心
	$('#record_signatureNo').prop('required', (~~discountType > 0));	// 签报号
	$('#record_costCenterTrd').prop('required', (~~discountType > 0));	// 支付活动成本中心
});

$(document).on('submit', '#formBalanceInRecord', function(e) {
	e.preventDefault();

	if (!$('#formBalanceInRecord').parsley().isValid()) {
		return false;
	}
	// 若收单订单类型为退款，则应收用户金额，应收用户积分应该为0或负值
	var acquiringOrderType = $('#record_acquiringOrderType').val();
	var payAmount = $('#record_payAmount').val();
	var receivablePoint = $('#record_receivablePoint').val();
	if (~~acquiringOrderType === 2) {
		if (~~payAmount > 0) {
			alert("若收单订单类型为退款，则应收用户金额应为0或负值");
			return false;
		}
		if (~~receivablePoint > 0) {
			alert("若收单订单类型为退款，则应收用户积分应为0或负值");
			return false;
		}
	}

	var param = {
		acquiringOrderType: $('#record_acquiringOrderType').val(),
		payTool: $('#record_payTool').val(),
		createTime: $('#search_startTime').val(),
		payStatus: $('#record_payStatus').val(),
		payAmount: $('#record_payAmount').val(),
		receivablePoint: $('#record_receivablePoint').val(),
		chargeMerchant: $('#record_chargeMerchant').val(),
		chargeMerchantNo: $('#record_chargeMerchantNo').val(),
		orderNo: $('#record_orderNo').val(),
		thdSerialNo: $('#record_thdSerialNo').val(),
		ticketAmount: $('#record_ticketAmount').val(),
		serviceAmount: $('#record_serviceAmount').val(),
		subsidyAmountO2o: $('#record_subsidyAmountO2o').val(),
		subsidyType: $('#record_subsidyType').val(),
		subsidyAmountTrd: $('#record_subsidyAmountTrd').val(),
		subsidyTypeTrd: $('#record_subsidyTypeTrd').val(),
		returnFee: $('#record_returnFee').val(),
		partner: $('#record_partner').val(),
		o2oReceivableAmount: $('#record_o2oReceivableAmount').val(),
		bankAmount: $('#record_bankAmount').val(),
		refundReason: $('#record_refundReason').val(),
		discountType: $('#record_discountType').val(),
		discountId: $('#record_discountId').val(),
		discountName: $('#record_discountName').val(),
		costCenter: $('#record_costCenter').val(),
		signatureNo: $('#record_signatureNo').val(),
		costCenterTrd: $('#record_costCenterTrd').val()
	};

	$.ajax({
		url: common.API_HOST + "settlement/acquiring/insertOnlyAcquiringInfo",
		type: 'GET',
		data: param
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			alert("录入成功，请至列表查看");
			$("#formBalanceInRecord button.close").trigger('click');
			$("#formBalanceInRecord :input").val("");
		} else {
			alert("录入失败，请检查数据后重试");
		}
	})	
});

$(document).on('blur', '#record_merhcantNo', function(e) {
	e.preventDefault();

	var merchantNo = $('#record_merhcantNo').val().trim();
	if (!merchantNo) return false;
	$.ajax({
		url: common.API_HOST + "settlement/merchantinfo/query",
		type: 'GET',
		data: {merchantId: merchantNo}
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			var merchantName = res.data.merchantName;
			if (merchantName) {
				$('#record_merchantName').val(merchantName);
			}
		}
	})	
});

$(document).on('submit', '#formBalanceOutRecord', function(e) {
	e.preventDefault();

	var merchantName = $('#record_merchantName').val();
	if (!merchantName) {
		alert("请输入正确的二级商户号，系统会根据商户号自动填充二级商户名，缺少二级商户名无法录入");
		return false;
	}
	
	if (!$('#formBalanceOutRecord').parsley().isValid()) {
		return false;
	}

	var param = {
		shipmentOrderType: $('#record_shipmentOrderType').val(),
		payTool: $('#record_payTool').val(),
		shipmentDate: $('#search_startTime').val(),
		movieName: $('#record_movieName').val(),
		cinemaName: $('#record_cinemaName').val(),
		merchantName: $('#record_merchantName').val(),
		merhcantNo: $('#record_merhcantNo').val(),
		orderNo: $('#record_orderNo').val(),
		thdOrderNo: $('#record_thdOrderNo').val(),
		payAmount: $('#record_payAmount').val(),
		receivablePoint: $('#record_receivablePoint').val(),
		settleAmount: $('#record_settleAmount').val(),
		subsidyType: $('#record_subsidyType').val(),
		subsidyAmountO2o: $('#record_subsidyAmountO2o').val(),
		subsidyTypeTrd: $('#record_subsidyTypeTrd').val(),
		subsidyAmountTrd: $('#record_subsidyAmountTrd').val(),
		returnFee: $('#record_returnFee').val(),
		acceptanceAppropriation: $('#record_acceptanceAppropriation').val(),
		finalSettlementAmount: $('#record_finalSettlementAmount').val(),
		partner: $('#record_partner').val(),
		discountType: $('#record_discountType').val(),
		discountId: $('#record_discountId').val(),
		discountName: $('#record_discountName').val(),
		costCenter: $('#record_costCenter').val(),
		signNum: $('#record_signNum').val(),
		costCenterTrd: $('#record_costCenterTrd').val(),
		shipmentStatus: $('#record_shipmentStatus').val()
	}

	$.ajax({
		url: common.API_HOST + "settlement/shipmentInfo/insertOnlyShipmentInfo",
		type: 'GET',
		data: param
	})
	.done(function(res) {
		if (!!~~res.meta.result) {
			alert("录入成功，请至列表查看");
			$("#formBalanceOutRecord button.close").trigger('click');
			$("#formBalanceOutRecord :input").val("");
		} else {
			alert("录入失败，请检查数据后重试");
		}
	})	
});
