'use strict;'

var common = require('common');

Parsley.addValidator('validateAmount', {
    messages: { 'zh-cn': '支付成功时，金额应该为0或正值。退款成功时，金额应该为0或负值。' },
    validate: function(value, requirement) {
        var acquiringOrderType = $('#record_acquiringOrderType').val();
        if (~~acquiringOrderType === 1) { //支付
            return (~~value < 0) ? false : true;
        } else if (~~acquiringOrderType === 2) {
            return (~~value > 0) ? false : true;
        }
    }
});

$('#record_createTime').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
});

$(document).on('change', '#record_discountType', function(e) {
    e.preventDefault();
    // 若存在常规优惠活动时，以下字段必填
    var discountType = $('#record_discountType').val();
    $('#record_discountName').prop('required', (~~discountType > 0)); // 活动/优惠券名称
    $('#record_discountId').prop('required', (~~discountType > 0)); // 活动/优惠券ID
    $('#record_costCenter').prop('required', (~~discountType > 0)); // 常规补贴成本中心
    $('#record_signatureNo').prop('required', (~~discountType > 0)); // 签报号
    $('#record_costCenterTrd').prop('required', (~~discountType > 0)); // 支付活动成本中心
});
$(document).on('change', '#record_subsidyAmountTrd', function(e) {
    e.preventDefault();
    var subsidyAmountTrd = $('#record_subsidyAmountTrd').val();
    $('#record_costCenterTrd').prop('required', (~~subsidyAmountTrd !== 0)); // 支付活动成本中心
});

$(document).on('change', '#record_payStatus', function(e) {
    e.preventDefault();
    var payStatus = $('#record_payStatus').val();
    $('#record_partner').prop('required', (~~payStatus === 5)); // 退款承债方
});

$(document).on('change', '#record_acquiringOrderType', function(e) {
    e.preventDefault();
    var acquiringOrderType = $('#record_acquiringOrderType').val();
    if (~~acquiringOrderType === 1) {
        $('#record_payStatus option[value="2"]').prop('selected', true);
    } else if (~~acquiringOrderType === 2) {
        $('#record_payStatus option[value="5"]').prop('selected', true);
    }
});
$(document).on('change', '#record_payStatus', function(e) {
    e.preventDefault();
    var payStatus = $('#record_payStatus').val();
    if (~~payStatus === 2) {
        $('#record_acquiringOrderType option[value="1"]').prop('selected', true);
    } else if (~~payStatus === 5) {
        $('#record_acquiringOrderType option[value="2"]').prop('selected', true);
    }
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
        createTime: $('#record_createTime').val(),
        payStatus: $('#record_payStatus').val(),
        payAmount: $('#record_payAmount').val(),
        receivablePoint: $('#record_receivablePoint').val(),
        chargeMerchant: $('#record_chargeMerchant').val(),
        merchantNo: $('#record_merchantNo').val(),
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
            var msg = res.meta.msg;
            if (msg) {
                alert(msg);
            } else {
                alert("录入失败，请检查数据后重试");
            }
        }
    })
});