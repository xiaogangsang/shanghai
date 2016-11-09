
<div class="modal fade" id="popup-balance-out-record" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form id="formBalanceOutRecord">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">出货纪录手工录入</h5>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">出货订单类型</div>
                                    <select class="form-control" id="record_shipmentOrderType" required>
                                        <option value="3">出货调整</option>
                                        <option value="4">退货调整</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">订单来源</div>
                                    <select class="form-control">
                                        <option value>人工</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top :10px;">
                            
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">支付信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
                    
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">订单渠道</div>
                                    <select class="form-control" id="record_payTool" required>
                                        <option value="1">掌上生活</option>
                                        <option value="2">手机银行</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">出/退货时间</div>
                                    <input type="text" class="form-control" id="record_shipmentDate" required data-parsley-pattern="[0-9]{4}?-[0-9]{2}?-[0-9]{2}?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">影片</div>
                                    <input type="text" id="record_movieName" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">影院</div>
                                    <input type="text" id="record_cinemaName" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">张数</div>
                                    <input type="text" id="record_countNum" class="form-control" required data-parsley-pattern="[0-9]{0,4}">
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top :10px;">
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">结算信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">

                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">二级商户名</div>
                                    <input type="text" id="record_merchantName" class="form-control" style="border: none; background: transparent; cursor: text" readonly>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">二级商户号</div>
                                    <input type="text" id="record_merchantNo" class="form-control" required data-parsley-error-msg="请输入正确的二级商户号，系统会根据商户号自动填充二级商户名，缺少二级商户名无法录入">
                                </div>
                            </div>
                            <div class="col-sm-12" style="padding-left: 0px; padding-right: 0px;">
                                <div class="form-group col-sm-6">
                                    <div class="input-group">
                                        <div class="input-group-addon">二级商户订单号</div>
                                        <input type="text" id="record_thdOrderNo" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">用户支付金额(元)</div>
                                    <input type="text" id="record_payAmount" class="form-control" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">用户支付积分</div>
                                    <input type="text" id="record_receivablePoint" class="form-control" required data-parsley-pattern="(-)?[0-9]{0,6}" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="col-sm-12" style="padding-left :0px; padding-right: 0px;">
                                <div class="form-group col-sm-6">
                                    <div class="input-group">
                                        <div class="input-group-addon">交易金额(元)</div>
                                        <input type="text" id="record_settleAmount" class="form-control" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">常规补贴付款方式</div>
                                    <select class="form-control" id="record_subsidyType" required>
                                        <option value="1">预付</option>
                                        <option value="2">后付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">渠道方常规补贴金额(元)</div>
                                    <input type="text" class="form-control" id="record_subsidyAmountO2o" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付补贴付款方式</div>
                                    <select class="form-control" id="record_subsidyTypeTrd" required>
                                        <option value="1">预付</option>
                                        <option value="2">后付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付活动补贴金额(元)</div>
                                    <input type="text" class="form-control" id="record_subsidyAmountTrd" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">退票手续费(元)</div>
                                    <input type="text" class="form-control" id="record_returnFee" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">应付金额(元)</div>
                                    <input type="text" class="form-control" id="record_acceptanceAppropriation" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">实付金额(元)</div>
                                    <input type="text" class="form-control" id="record_finalSettlementAmount" required data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?" data-parsley-validate-amount>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">退款承债方</div>
                                    <select class="form-control" id="record_partner" required>
                                        <option value="0">无承债方</option>
                                        <option value="1">O2O承债</option>
                                        <option value="2">商户承债</option>                                    
                                    </select>
                                </div>
                            </div>
                        </div>
        
                        <div class="row" style="margin-top :10px;">
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">优惠信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
                            
                            <div class="col-sm-12" style="padding-left: 0px; padding-right: 0px;">
                                <div class="form-group col-sm-6">
                                    <div class="input-group">
                                        <div class="input-group-addon">常规优惠方式</div>
                                        <select class="form-control" id="record_discountType" required>
                                            <option value="0">无优惠</option>
                                            <option value="1">活动</option>
                                            <option value="2">优惠券</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">活动/优惠券名称</div>
                                    <input type="text" id="record_discountName" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">活动/优惠券ID</div>
                                    <input type="text" id="record_discountId" class="form-control" data-parsley-pattern="[0-9]{1,21}">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">常规补贴成本中心</div>
                                    <input type="text" id="record_costCenter" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">常规活动签报号</div>
                                    <input type="text" id="record_signNum" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付活动成本中心</div>
                                    <input type="text" id="record_costCenterTrd" class="form-control">
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top :10px;">
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">状态信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">

                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">出货状态</div>
                                    <select class="form-control" id="record_shipmentStatus">
                                        <option value="1">未出货</option>
                                        <option value="2">出货成功</option>
                                        <option value="3">出货失败</option>
                                        <option value="7">退货成功</option>
                                        <option value="8">退货失败</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
                            <div class="col-sm-4 col-sm-offset-4">
                                <button type="submit" class="form-control btn btn-default edit-submit">提交</button>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#record_shipmentDate').datetimepicker({
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
      $('#record_discountId').prop('required', (~~discountType > 0));   // 活动/优惠券ID
      $('#record_costCenter').prop('required', (~~discountType > 0));   // 常规补贴成本中心
      $('#record_signatureNo').prop('required', (~~discountType > 0));  // 签报号
      $('#record_costCenterTrd').prop('required', (~~discountType > 0));  // 支付活动成本中心
    });
    $(function () {
        Parsley.addValidator('validateAmount', {
            messages: {'zh-cn': '出货调整时，金额应该为0或正值。退货调整时，金额应该为0或负值。'},
            validate: function (value, requirement) {
                var shipmentOrderType = $('#record_shipmentOrderType').val();
                if (~~shipmentOrderType === 3) {
                    return (~~value < 0) ? false : true;
                } else if (~~shipmentOrderType === 4) {
                    return (~~value > 0) ? false : true;
                }
            }
        });
    });
</script>
