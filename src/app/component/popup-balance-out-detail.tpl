
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

      <span style="display: block; margin-top: 10px;">商品信息:</span>
      <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">订单渠道</div>
            <input type="text" class="form-control" id="payTool" value="{{payTool}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">出/退货时间</div>
            <input type="text" class="form-control oldValue" id="shipmentDate" value="{{shipmentDate}}" data-parsley-pattern="[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}">
            <input type="text" class="form-control newValue" id="shipmentDateNew" value="{{lastDetail.shipmentDate}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">影片</div>
            <input type="text" class="form-control" id="filmName" value="{{productInfo.filmName}}" readonly>
          </div>
        </div>

        <!-- 手机号不能显示, 审计通不过 -->
        <!-- <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">用户手机号</div>
            <input type="text" class="form-control" id="phone" value="{{phone}}" readonly>
          </div>
        </div> -->

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影院</div>
            <input type="text" class="form-control" id="cinemaName" value="{{productInfo.cinemaName}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影厅</div>
            <input type="text" class="form-control" id="hallName" value="{{productInfo.hallName}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">开场时间</div>
            <input type="text" class="form-control" id="startTime" value="{{productInfo.startTime}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">座位</div>
            <input type="text" class="form-control" id="seatNames" value="{{productInfo.seatNames}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">张数</div>
            <input type="text" class="form-control" id="countNum" value="{{countNum}}" readonly>
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
            <div class="input-group-addon">二级商户</div>
            <input type="text" class="form-control oldValue" id="merchantName" value="{{merchantName}}">
            <input type="text" class="form-control newValue" id="merchantNameNew" value="{{lastDetail.merchantName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户号</div>
            <input type="text" class="form-control oldValue" id="merchantNo" value="{{merchantNo}}">
            <input type="text" class="form-control newValue" id="merchantNoNew" value="{{lastDetail.merchantNo}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">商品订单号</div>
            <input type="text" class="form-control" id="bizOrderNo" value="{{bizOrderNo}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">交易订单号</div>
            <input type="text" class="form-control" id="orderNo" value="{{orderNo}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">商户订单号</div>
            <input type="text" class="form-control" id="thdOrderNo" value="{{thdOrderNo}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">票类</div>
            <input type="text" class="form-control" id="ticketName" value="{{ticketName}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">用户支付金额(元)</div>
            <input type="text" class="form-control" id="payAmount" value="{{payAmount}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">用户支付积分</div>
            <input type="text" class="form-control" id="payPoint" value="{{payPoint}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">交易金额(元)</div>
            <!-- <input type="text" class="form-control" id="settleAmount" value="{{settleAmount}}" readonly> -->
            <input type="text" class="form-control oldValue" id="settleAmount" value="{{settleAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="settleAmountNew" value="{{lastDetail.settleAmount}}">
          </div>
        </div>

        <!-- whb add -->
        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动渠道方补贴金额(元)</div>
            <input type="text" class="form-control" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动补贴付款方式</div>
            <input type="text" class="form-control" id="subsidyType" value="{{subsidyType}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">支付活动补贴金额(元)</div>
            <input type="text" class="form-control" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">支付活动补贴付款方式</div>
            <input type="text" class="form-control" id="subsidyType" value="{{subsidyType}}" readonly>
          </div>
        </div>


<!-- 
        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">渠道方补贴金额(元)</div>
            <input type="text" class="form-control" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}" readonly> -->
            <!-- <input type="text" class="form-control oldValue" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}">
            <input type="text" class="form-control newValue" id="subsidyAmountO2oNew" value="{{lastDetail.subsidyAmountO2o}}"> -->
         <!--  </div>
        </div> -->

        <!-- <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">补贴付款方式</div>
            <input type="text" class="form-control" id="subsidyType" value="{{subsidyType}}" readonly> -->
            <!-- <select class="form-control oldValue" id="subsidyType" value="{{subsidyType}}">
              <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
            <select class="form-control newValue" id="subsidyTypeNew" value="{{lastDetail.subsidyType}}">
              <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select> -->
         <!--  </div>
        </div> -->

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">应付金额(元)</div>
            <input type="text" class="form-control oldValue" id="acceptanceAppropriation" value="{{acceptanceAppropriation}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="acceptanceAppropriationNew" value="{{lastDetail.acceptanceAppropriation}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退票手续费(元)</div>
            <input type="text" class="form-control" id="returnFee" value="{{returnFee}}" readonly>
            <!-- <input type="text" class="form-control oldValue" id="returnFee" value="{{returnFee}}">
            <input type="text" class="form-control newValue" id="returnFeeNew" value="{{lastDetail.returnFee}}"> -->
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退款承债方</div>
            <input type="text" class="form-control" id="partner" value="{{partner}}" readonly>
              <!-- <select class="form-control oldValue" id="partner" value="{{partner}}">
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
              <select class="form-control newValue" id="partnerNew" value="{{lastDetail.partner}}">
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select> -->
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">实付金额(元)</div>
            <input type="text" class="form-control oldValue" id="finalSettleAmount" value="{{finalSettleAmount}}" data-parsley-pattern="(-)?[0-9]{0,6}(\.[0-9]{0,2})?">
            <input type="text" class="form-control newValue" id="finalSettleAmountNew" value="{{lastDetail.finalSettleAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">O2O应收金额</div>
            <input type="text" class="form-control" id="o2oReceivableAmount" value="{{o2oReceivableAmount}}" readonly>
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
            <div class="input-group-addon" style="color: red;">常规活动优惠方式</div>
            <input type="text" class="form-control" id="discountType" value="{{discountType}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动/优惠券名称</div>
            <input type="text" class="form-control" id="discountName" value="{{discountName}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动补贴成本中心</div>
            <input type="text" class="form-control" id="costCenter" value="{{costCenter}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动签报号</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div>

         <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">常规活动/优惠券ID</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div>

         <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">支付活动ID</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div>

         <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">支付活动名称</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div>

         <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon" style="color: red;">支付活动补贴成本中心</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div>
        

        <!-- <div class="form-group col-sm-6 col-md-6">
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
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" readonly>
          </div>
        </div> -->

      </div>
    </div>

    <div class="container-fluid">
      <div class="row">
        <span style="display: block; margin-top: 10px;">状态信息:</span>
        <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">支付流水状态</div>
            <input type="text" class="form-control" id="payStatus" value="{{payStatus}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
            <div class="input-group">
              <div class="input-group-addon">出货状态</div>
              <select class="form-control oldValue" id="shipmentStatus" value="{{shipmentStatus}}">
                <option value=""></option>
                <option value="4">出货中</option>
                <option value="3">出货失败</option>
                <option value="2">出货成功</option>
                <option value="8">退货失败</option>
                <option value="7">退货成功</option>
              </select>
              <select class="form-control newValue" id="shipmentStatusNew" value="{{lastDetail.shipmentStatus}}">
                <option value=""></option>
                <option value="4">出货中</option>
                <option value="3">出货失败</option>
                <option value="2">出货成功</option>
                <option value="8">退货失败</option>
                <option value="7">退货成功</option>
              </select>
            </div>
          </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">收单对账状态</div>
            <input type="text" class="form-control" id="acquiringReconciliationStatus" value="{{acquiringReconciliationStatus}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">出货对账状态</div>
            <select class="form-control oldValue" id="reconciliationStatus" value="{{reconciliationStatus}}">
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
            <div class="input-group-addon">出货操作时间</div>
            <input type="text" class="form-control" id="diffTime" value="{{updateTime}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">对账不一致原因</div>
            <select class="form-control oldValue" id="reason" value="{{reason}}">
              <option value=""></option>
              <option value="1">出货失败, 支付成功(未退款)</option>
              <option value="2">退货失败, 退款成功(无承债方)</option>
              <option value="3">退货成功, 退款失败(未退款)</option>
              <option value="4">退货成功, 支付成功(未退款)</option>
              <option value="5">金额不符</option>
              <option value="6">票类错误</option>
              <option value="7">出货成功, 支付失败(未扣款)</option>
            </select>
            <select class="form-control newValue" id="reasonNew" value="{{lastDetail.reason}}">
              <option value=""></option>
              <option value="1">出货失败, 支付成功(未退款)</option>
              <option value="2">退货失败, 退款成功(无承债方)</option>
              <option value="3">退货成功, 退款失败(未退款)</option>
              <option value="4">退货成功, 支付成功(未退款)</option>
              <option value="5">金额不符</option>
              <option value="6">票类错误</option>
              <option value="7">出货成功, 支付失败(未扣款)</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    <div class="container-fluid">

      <div class="row"> 
        <span style="display: block; margin-top: 10px;">备注信息:</span>
        <hr style="margin-top: 3px;">
        
        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">备注</div>
            <textarea class="form-control oldValue" id="remarks">{{remarks}}</textarea>
            <textarea class="form-control newValue" id="remarksNew">{{lastDetail.remarks}}</textarea>
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

      <!-- 注释部分是以前可以修改, 现在不行了 -->
      <div class="row">
        <div class="table-responsive">
            <table class="table table-hover" id="dataTable">
              <thead>
                <tr>
                  <th>操作时间</th>
                  <th>操作人</th>
                  <th>二级商户</th>
                  <th>二级商户号</th>
                  <th>交易金额(元)</th>
                  <!-- <th>渠道方补贴金额(元)</th> -->
                  <!-- <th>补贴付款方式</th> -->
                  <th>应拨金额(元)</th>
                  <!-- <th>退票手续费(元)</th> -->
                  <!-- <th>退款承债方</th> -->
                  <th>净拨款金额(元)</th>
                  <th>出货状态</th>
                  <th>出货对账状态</th>
                  <th>对账不一致原因</th>
                  <!-- <th>修改状态</th> -->
                </tr>
              </thead>
              <tbody>
                {{#operate}}
                <tr>
                  <td>{{operateTime}}</td>
                  <td>{{operatorId}}</td>
                  <td>{{merchantName}}</td>
                  <td>{{merchantNo}}</td>
                  <td>{{settleAmount}}</td>
                  <!-- <td>{{subsidyAmountO2o}}</td> -->
                  <!-- <td>{{subsidyType}}</td> -->
                  <td>{{acceptanceAppropriation}}</td>
                  <!-- <td>{{returnFee}}</td> -->
                  <!-- <td>{{partner}}</td> -->
                  <td>{{finalSettleAmount}}</td>
                  <td>{{shipmentStatus}}</td>
                  <td>{{reconciliationStatus}}</td>
                  <td>{{reason}}</td>
                  <!-- <td>{{}}</td> -->
                </tr>
                {{/operate}}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  </div>
</script>
