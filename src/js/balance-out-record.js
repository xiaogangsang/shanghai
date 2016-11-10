'use strict;'

var common = require('common');

Parsley.addValidator('validateAmount', {
    messages: { 'zh-cn': '出货调整时，金额应该为0或正值。退货调整时，金额应该为0或负值。' },
    validate: function(value, requirement) {
        var shipmentOrderType = $('#record_shipmentOrderType').val();
        if (~~shipmentOrderType === 3) { // 出货
            return (~~value < 0) ? false : true;
        } else if (~~shipmentOrderType === 4) { // 退货
            return (~~value > 0) ? false : true;
        }
    }
});

$('#record_shipmentDate').datetimepicker({
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    minView: 2,
    todayHighlight: true,
    autoclose: true,
    startDate: new Date(),
});

$('#record_discountType').on('change', function(e) {
    e.preventDefault();
    // 若存在常规优惠活动时，以下字段必填
    var discountType = $('#record_discountType').val();
    $('#record_discountName').prop('required', (~~discountType > 0)); // 活动/优惠券名称
    $('#record_discountId').prop('required', (~~discountType > 0)); // 活动/优惠券ID
    $('#record_costCenter').prop('required', (~~discountType > 0)); // 常规补贴成本中心
    
    queryActivityInfo();
});

$('#record_subsidyAmountTrd').on('change', function(e) {
    e.preventDefault();
    var subsidyAmountTrd = $('#record_subsidyAmountTrd').val();
    $('#record_costCenterTrd').prop('required', (~~subsidyAmountTrd !== 0)); // 支付活动成本中心
});


$('#record_shipmentOrderType').on('change', function(e) {
    e.preventDefault();
    var shipmentOrderType = $('#record_shipmentOrderType').val();
    if (~~shipmentOrderType === 3) {
        $('#record_shipmentStatus option[value="2"]').prop('selected', true);
    } else if (~~shipmentOrderType === 4) {
        $('#record_shipmentStatus option[value="7"]').prop('selected', true);
    }
});
$('record_shipmentStatus').on('change', function(e) {
    e.preventDefault();
    var shipmentStatus = $('#record_shipmentStatus').val();
    if (~~shipmentStatus === 2) {
        $('#record_shipmentOrderType option[value="3"]').prop('selected', true);
    } else if (~~shipmentStatus === 7) {
        $('#record_shipmentOrderType option[value="4"]').prop('selected', true);
    }
});

$('#record_merchantNo').on('blur', function(e) {
    e.preventDefault();

    var merchantNo = $('#record_merchantNo').val().trim();
    if (!merchantNo) return false;
    $.ajax({
        url: common.API_HOST + "settlement/merchantinfo/query",
        type: 'GET',
        data: { merchantId: merchantNo }
    })
    .done(function(res) {
        if (!!~~res.meta.result) {
            $('#record_merchantName').val(res.data.merchantName);
        }
    })
});

$('#record_discountId').on('blur', function(e) {
    e.preventDefault();
    queryActivityInfo();
});

function queryActivityInfo () {
    var discountType = $('#record_discountType').val();
    var discountId = $('#record_discountId').val();

    if (~~discountType !== 0 && discountId) {
        $.ajax({
            url: common.API_HOST + "settlement/shipmentInfo/selectActivity",
            type: 'GET',
            data: {discountType: discountType, discountId: discountId},
        })
        .done(function(res) {
            if (!!~~res.meta.result) {
                var rec = res.data.record;
                if (rec) {
                    $('#record_discountName').val(rec.discountName);
                    $('#record_costCenter').val(rec.costCenter);
                    $('#record_signNum').val(rec.signNum);
                } else {
                    $('#record_discountName').val('');
                    $('#record_costCenter').val('');
                    $('#record_signNum').val('');
                }
            }
        })       
    }
}

$('#formBalanceOutRecord').on('submit', function(e) {
    e.preventDefault();

    $('#formBalanceOutRecord').parsley().validate();
    if (!$('#formBalanceOutRecord').parsley().isValid()) {
        return false;
    }

    var partner = $('#record_partner').val();
    if (~~partner === 0) {
        partner = '';
    }
    var param = {
        shipmentOrderType: $('#record_shipmentOrderType').val(),
        payTool: $('#record_payTool').val(),
        shipmentDate: $('#record_shipmentDate').val(),
        movieName: $('#record_movieName').val(),
        cinemaName: $('#record_cinemaName').val(),
        countNum: $('#record_countNum').val(),
        merchantName: $('#record_merchantName').val(),
        merchantNo: $('#record_merchantNo').val(),
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
        finalSettleAmount: $('#record_finalSettleAmount').val(),
        partner: partner,
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
            var msg = res.meta.msg;
            if (msg) {
                alert(msg);
            } else {
                alert("录入失败，请检查数据后重试");
            }
        }
    })
});