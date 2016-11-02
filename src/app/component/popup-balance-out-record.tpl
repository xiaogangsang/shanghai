
<div class="modal fade" id="popup-balance-out-record" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <form>
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
                                    <select class="form-control" required>
                                        <option value="1">出货调整</option>
                                        <option value="2">退货调整</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">订单来源</div>
                                    <input type="text" class="form-control" value="人工" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top :10px;">
                            
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">支付信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
                            
                    
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">订单渠道</div>
                                    <select class="form-control" required>
                                        <option value="1">掌上生活</option>
                                        <option value="2">手机银行</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">交易日期</div>
                                    <input type="text" class="form-control" id="search_startTime" required data-parsley-pattern="[0-9]{4}?-[0-9]{2}?-[0-9]{2}?">
                                </div>
                            </div>
                            
                            <div class="form-group col-sm-12">
                                <div class="col-sm-6" style="padding-left :0px;">
                                    <div class="input-group">
                                        <div class="input-group-addon">支付流水状态</div>
                                        <select class="form-control" required>
                                            <option value="1">待支付</option>
                                            <option value="2">支付成功</option>
                                            <option value="2">支付失败</option>
                                            <option value="2">退款成功</option>
                                            <option value="2">退款失败</option>
                                            <option value="2">已关闭</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                                    
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">应收用户金额(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">应收用户积分</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}">
                                </div>
                            </div>
                        </div>

                        <div class="row" style="margin-top :10px;">
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">结算信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">

                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">收单商户</div>
                                    <select class="form-control" required>
                                        <option value="1">O2O_卡中心</option>
                                        <option value="2">O2O_总行</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">收单商户号</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">交易订单号</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">收单方支付订单号</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">票价(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">服务费(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">渠道方常规补贴金额(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">常规补贴付款方式</div>
                                    <select class="form-control" required>
                                        <option value="1">预付</option>
                                        <option value="2">后付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付活动补贴金额(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付补贴付款方式</div>
                                    <select class="form-control" required>
                                        <option value="1">预付</option>
                                        <option value="2">后付</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">退票手续费(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">退款承债方</div>
                                    <select class="form-control" required>
                                        <option value="1">无承债方</option>
                                        <option value="2">商户承债</option>
                                        <option value="3">O2O承债</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">O2O应收金额(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                             <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">实收金额(元)</div>
                                    <input type="text" class="form-control" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
                                </div>
                            </div>
                            <div class="form-group col-sm-12">
                                <div class="input-group">
                                    <div class="input-group-addon">退款原因</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                        </div>
        
                        <div class="row" style="margin-top :10px;">
                            <span style="display: block; padding-left: 15px; padding-right: 15px;">优惠信息</span>
                            <hr style="margin-left: 15px; margin-right: 15px; margin-top: 10px;">
                            
                            <div class="col-sm-12" style="padding-left: 0px;">
                                <div class="form-group col-sm-6">
                                    <div class="input-group">
                                        <div class="input-group-addon">常规优惠方式</div>
                                        <select class="form-control" required>
                                            <option value="1">优惠券</option>
                                            <option value="2">活动</option>
                                            <option value="2">无优惠</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">活动/优惠券名称</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">活动/优惠券ID</div>
                                    <input type="text" class="form-control" data-parsley-pattern="[0-9]{1,21}">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">常规补贴成本中心</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">签报号</div>
                                    <input type="text" class="form-control">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                <div class="input-group">
                                    <div class="input-group-addon">支付活动成本中心</div>
                                    <input type="text" class="form-control">
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
