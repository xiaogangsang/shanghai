
<script id="detail-template" type="text/x-tmpl-mustache">

  <div class="container-fluid detail-area">

  {{#detail}}
    <div class="container-fluid">

      {{^lastDetail}}
      <div class="row">
        <div class="col-md-4 pull-right">
          <button type="submit" class="form-control btn btn-default edit-submit" data-version="{{version}}" data-id="{{id}}">提交</button>
        </div>
      </div>
      {{/lastDetail}}

      {{#lastDetail}}
        <p style="font-size: 13px;">* 注：左侧是现值，黑色显示<b>；</b>右侧是修改前的值(原值)，红色显示，未修改的字段不显示(若未发现红色字段，说明可能有些字段原值为空，现值是新增的)</p>
      {{/lastDetail}}

      <div class="row">

      <span style="display: block; margin-top: 10px;">支付信息:</span>
      <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">订单渠道</div>
            <input type="text" class="form-control" id="payTool" value="{{payTool}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">支付时间</div>
            <input type="text" class="form-control oldValue" id="createTime" value="{{createTime}}" data-parsley-pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}">
            <input type="text" class="form-control newValue" id="createTimeNew" value="{{lastDetail.createTime}}">
          </div>
        </div>

        <!-- 手机号不能显示, 审计通不过 -->
        <!-- <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">用户手机号</div>
            <input type="text" class="form-control" id="phoneNo" value="{{phoneNo}}" readonly>
          </div>
        </div> -->

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">支付流水状态</div>
            <select class="form-control oldValue" id="payStatus" value="{{payStatus}}">
              <option value="1">待支付</option>
              <option value="2">支付成功</option>
              <option value="3">支付失败</option>
              <option value="4">退款中</option>
              <option value="5">退款成功</option>
              <option value="6">退款失败</option>
            </select>
            <select class="form-control newValue" id="payStatusNew" value="{{lastDetail.payStatus}}">
              <option value="1">待支付</option>
              <option value="2">支付成功</option>
              <option value="3">支付失败</option>
              <option value="4">退款中</option>
              <option value="5">退款成功</option>
              <option value="6">退款失败</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">应收用户金额(元)</div>
            <input type="text" class="form-control oldValue" id="payAmount" value="{{payAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="payAmountNew" value="{{lastDetail.payAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">应收用户积分</div>
            <input type="text" class="form-control oldValue" id="receivablePoint" value="{{receivablePoint}}" data-parsley-pattern="(-)?[0-9]{0,6}">
            <input type="text" class="form-control newValue" id="receivablePointNew" value="{{lastDetail.receivablePoint}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">支付流水号</div>
            <input type="text" class="form-control" id="paySequenceNo" value="{{paySequenceNo}}" readonly>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
        <div class="row">

        <span style="display: block; margin-top: 10px;">结算信息:</span>
        <hr style="margin-top: 3px;">

          <div class="form-group col-sm-6 col-md-6">
            <div class="input-group">
              <div class="input-group-addon">业务类别</div>
              <input type="text" class="form-control" id="bizType" value="{{bizType}}" readonly>
            </div>
          </div>
        </div>

      <div class="row">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">收单商户</div>
            <input type="text" class="form-control" id="chargeMerchant" value="{{chargeMerchant}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">收单商户号</div>
            <input type="text" class="form-control" id="chargeMerchantNo" value="{{chargeMerchantNo}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">交易订单号</div>
            <input type="text" class="form-control" id="orderNo" value="{{orderNo}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">收单方支付订单号</div>
            <input type="text" class="form-control oldValue" id="thdSerialNo" value="{{thdSerialNo}}">
            <input type="text" class="form-control newValue" id="thdSerialNoNew" value="{{lastDetail.thdSerialNo}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">票价(元)</div>
            <input type="text" class="form-control oldValue" id="ticketAmount" value="{{ticketAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="ticketAmountNew" value="{{lastDetail.ticketAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">服务费(元)</div>
            <input type="text" class="form-control oldValue" id="serviceAmount" value="{{serviceAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="serviceAmountNew" value="{{lastDetail.serviceAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">渠道方补贴金额(元)</div>
            <input type="text" class="form-control oldValue" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="subsidyAmountO2oNew" value="{{lastDetail.subsidyAmountO2o}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">补贴付款方式</div>
            <select class="form-control oldValue" id="subsidyType" value="{{subsidyType}}">
              <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
            <select class="form-control newValue" id="subsidyTypeNew" value="{{lastDetail.subsidyType}}">
              <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退票手续费(元)</div>
            <input type="text" class="form-control oldValue" id="returnFee" value="{{returnFee}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="returnFeeNew" value="{{lastDetail.returnFee}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退款承债方</div>
              <select class="form-control oldValue" id="partner" value={{partner}}>
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
              <select class="form-control newValue" id="partnerNew" value={{lastDetail.partner}}>
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">O2O应收金额(元)</div>
            <input type="text" class="form-control oldValue" id="o2oReceivableAmount" value="{{o2oReceivableAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="o2oReceivableAmountNew" value="{{lastDetail.o2oReceivableAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">实收金额(元)</div>
            <input type="text" class="form-control" id="bankAmount" value="{{bankAmount}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">退款原因</div>
            <input type="text" class="form-control" id="refundReason" value="{{refundReason}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户</div>
            <input type="text" class="form-control" id="merchant2" value="{{merchant2}}" >
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户号</div>
            <input type="text" class="form-control" id="merchant2No" value="{{merchant2No}}" >
          </div>
        </div>

      </div>

    </div>

    <div class="container-fluid">

      <div class="row"> 
        <span style="display: block; margin-top: 10px;">优惠信息:</span>
        <hr style="margin-top: 3px;">
        

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">优惠方式</div>
            <input type="text" class="form-control" id="discountType" value="{{discountType}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">活动/优惠券名称</div>
            <input type="text" class="form-control" id="discountName" value="{{discountName}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">补贴成本中心</div>
            <input type="text" class="form-control" id="costCenter" value="{{costCenter}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">签报号</div>
            <input type="text" class="form-control" id="signatureNo" value="{{signatureNo}}" readonly>
          </div>
        </div>

      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <span style="display: block; margin-top: 10px;">状态信息:</span>
        <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">收单对账状态</div>
            <select class="form-control oldValue" id="reconciliationStatus" value="{{reconciliationStatus}}" data-value="{{reconciliationStatus}}">
              <!-- <option value=""></option> -->
              <option value="1">未对账</option>
              <option value="2">对账不一致</option>
              <option value="3">对账成功</option>
              <option value="4">确认</option>
            </select>
            <select class="form-control newValue" id="reconciliationStatusNew" value="{{lastDetail.reconciliationStatus}}">
              <!-- <option value=""></option> -->
              <option value="1">未对账</option>
              <option value="2">对账不一致</option>
              <option value="3">对账成功</option>
              <option value="4">确认</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">对账不一致原因</div>
            <select class="form-control oldValue" id="reason" value="{{reason}}">
              <option value=""></option>
              <option value="1">我方缺失</option>
              <option value="2">对方缺失</option>
              <option value="3">状态错误</option>
              <option value="4">金额不符</option>
            </select>
            <select class="form-control newValue" id="reasonNew" value="{{lastDetail.reason}}">
              <option value=""></option>
              <option value="1">我方缺失</option>
              <option value="2">对方缺失</option>
              <option value="3">状态错误</option>
              <option value="4">金额不符</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">

      <div class="row"> 
        <span style="display: block; margin-top: 10px;">备注信息:</span>
        <hr style="margin-top: 3px;">
        

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">备注</div>
            <textarea class="form-control" id="remake" value="{{remake}}" ></textarea>
          </div>
        </div>
      </div>
    </div>

    {{/detail}}

    <div class="container-fluid detail-history">

      <div class="row">
        <span style="display: block; margin-top: 10px;">历史记录:</span>
        <hr style="margin-top: 3px; margin-bottom: 0px;">
      </div>


<!-- 漏了修改状态 状态码->状态名称 -->
      <div class="row">
        <div class="table-responsive">
            <table class="table table-hover" id="dataTable">
              <thead>
                <tr>
                  <th>操作时间</th>
                  <th>交易订单号</th>
                  <th>收单商户</th>
                  <th>收单商户号</th>
                  <th>业务类别</th>
                  <th>支付流水状态</th>
                  <th>票价(元)</th>
                  <th>退票手续费(元)</th>
                  <th>服务费(元)</th>
                  <th>渠道方补贴金额(元)</th>
                  <th>应收金额(元)</th>
                  <th>承债方</th>
                  <th>优惠方式</th>
                  <th>活动/优惠券名称</th>
                  <th>收单对账状态</th>
                  <th>对账不一致原因</th>
                </tr>
              </thead>
              <tbody>
                {{#operateRecords}}
                <tr>
                  <td>{{operateTime}}</td>
                  <td>{{orderNo}}</td>
                  <td>{{chargeMerchant}}</td>
                  <td>{{chargeMerchantNo}}</td>
                  <td>{{bizType}}</td>
                  <td>{{payStatus}}</td>
                  <td>{{ticketAmount}}</td>
                  <td>{{returnFee}}</td>
                  <td>{{serviceAmount}}</td>
                  <td>{{subsidyAmountO2o}}</td>
                  <td>{{o2oReceivableAmount}}</td>
                  <td>{{partner}}</td>
                  <td>{{discountType}}</td>
                  <td>{{discountName}}</td>
                  <td>{{reconciliationStatus}}</td>
                  <td>{{reason}}</td>
                </tr>
                {{/operateRecords}}
              </tbody>
            </table>
          </div>
      </div>
    </div>

  </div>

</script>