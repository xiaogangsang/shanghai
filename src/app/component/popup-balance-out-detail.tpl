
<script id="detail-template" type="text/x-tmpl-mustache">

  <div class="container-fluid detail-area readonly">

  {{#detail}}
    <div class="container-fluid">

      {{^currentDetail}}
      <div class="row">
        <div class="col-md-4 pull-right">
          <button class="form-control btn btn-default edit-submit" data-version="{{version}}" data-id="{{id}}">提交</button>
        </div>
      </div>
      {{/currentDetail}}

      <div class="row">

      <span style="display: block; margin-top: 10px;">商品信息:</span>
      <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">订单渠道</div>
            <input type="text" class="form-control" id="payTool" value="{{payTool}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">出/退货时间</div>
            <input type="text" class="form-control" id="shipmentDate" value="{{shipmentDate}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">影片</div>
            <input type="text" class="form-control" id="filmName" value="{{productInfo.filmName}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">用户手机号</div>
            <input type="text" class="form-control" id="phone" value="{{phone}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影院</div>
            <input type="text" class="form-control" id="cinemaName" value="{{productInfo.cinemaName}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影厅</div>
            <input type="text" class="form-control" id="hallName" value="{{productInfo.hallName}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">开场时间</div>
            <input type="text" class="form-control" id="startTime" value="{{productInfo.startTime}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">座位</div>
            <input type="text" class="form-control" id="seatNames" value="{{productInfo.seatNames}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">张数</div>
            <input type="text" class="form-control" id="countNum" value="{{countNum}}" disabled>
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
              <input type="text" class="form-control" id="bizType" value="{{bizType}}" disabled>
            </div>
          </div>
        </div>

      <div class="row">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户</div>
            <input type="text" class="form-control oldValue" id="merchantName" value="{{merchantName}}">
            <input type="text" class="form-control newValue" id="merchantNameNew" value="{{currentDetail.merchantName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户号</div>
            <input type="text" class="form-control oldValue" id="merchantNo" value="{{merchantNo}}">
            <input type="text" class="form-control newValue" id="merchantNoNew" value="{{currentDetail.merchantNo}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">商品订单号</div>
            <input type="text" class="form-control" id="bizOrderNo" value="{{bizOrderNo}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">交易订单号</div>
            <input type="text" class="form-control" id="orderNo" value="{{orderNo}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">商户订单号</div>
            <input type="text" class="form-control" id="thdOrderNo" value="{{thdOrderNo}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">票类</div>
            <input type="text" class="form-control" id="wandaTicketId" value="{{productInfo.wandaTicketId}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">用户支付金额(元)</div>
            <input type="text" class="form-control" id="payAmount" value="{{payAmount}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">用户支付积分</div>
            <input type="text" class="form-control" id="payPoint" value="{{payPoint}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">交易金额(元)</div>
            <input type="text" class="form-control oldValue" id="settleAmount" value="{{settleAmount}}">
            <input type="text" class="form-control newValue" id="settleAmountNew" value="{{currentDetail.settleAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">我方补贴金额(元)</div>
            <input type="text" class="form-control oldValue" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}">
            <input type="text" class="form-control newValue" id="subsidyAmountO2oNew" value="{{currentDetail.subsidyAmountO2o}}">
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
            <select class="form-control newValue" id="subsidyTypeNew" value="{{currentDetail.subsidyType}}">
              <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">应付金额(元)</div>
            <input type="text" class="form-control oldValue" id="acceptanceAppropriation" value="{{acceptanceAppropriation}}">
            <input type="text" class="form-control newValue" id="acceptanceAppropriationNew" value="{{currentDetail.acceptanceAppropriation}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退票手续费(元)</div>
            <input type="text" class="form-control oldValue" id="returnFee" value="{{returnFee}}">
            <input type="text" class="form-control newValue" id="returnFeeNew" value="{{currentDetail.returnFee}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退款承债方</div>
              <select class="form-control oldValue" id="partner" value="{{partner}}">
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
              <select class="form-control newValue" id="partnerNew" value="{{currentDetail.partner}}">
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">实付金额(元)</div>
            <input type="text" class="form-control oldValue" id="finalSettleAmount" value="{{finalSettleAmount}}">
            <input type="text" class="form-control newValue" id="finalSettleAmountNew" value="{{currentDetail.finalSettleAmount}}">
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
            <input type="text" class="form-control" id="discountType" value="{{discountType}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">活动/优惠券名称</div>
            <input type="text" class="form-control" id="discountName" value="{{discountName}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">补贴成本中心</div>
            <input type="text" class="form-control" id="costCenter" value="{{costCenter}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">签报号</div>
            <input type="text" class="form-control" id="signNum" value="{{signNum}}" disabled>
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
            <div class="input-group-addon">支付流水状态</div>
            <input type="text" class="form-control" id="payStatus" value="{{payStatus}}" disabled>
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
              <select class="form-control newValue" id="shipmentStatusNew" value="{{currentDetail.shipmentStatus}}">
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
            <input type="text" class="form-control" id="acquiringReconciliationStatus" value="{{acquiringReconciliationStatus}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">出货对账状态</div>
            <select class="form-control oldValue" id="reconciliationStatus" value="{{reconciliationStatus}}">
              <option value=""></option>
              <option value="1">未对账</option>
              <option value="2">对账不一致</option>
              <option value="3">对账成功</option>
              <option value="4">确认</option>
            </select>
            <select class="form-control newValue" id="reconciliationStatusNew" value="{{currentDetail.reconciliationStatus}}">
              <option value=""></option>
              <option value="1">未对账</option>
              <option value="2">对账不一致</option>
              <option value="3">对账成功</option>
              <option value="4">确认</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">出货对账时间</div>
            <input type="text" class="form-control" id="diffDate" value="{{diffDate}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">对账不一致原因</div>
            <select class="form-control oldValue" id="reason" value="{{reason}}">
              <option value=""></option>
              <option value="1">我方缺失</option>
              <option value="2">对方缺失</option>
              <option value="3">金额不符</option>
              <option value="3">状态错误</option>
            </select>
            <select class="form-control newValue" id="reasonNew" value="{{currentDetail.reason}}">
              <option value=""></option>
              <option value="1">我方缺失</option>
              <option value="2">对方缺失</option>
              <option value="3">金额不符</option>
              <option value="3">状态错误</option>
            </select>
          </div>
        </div>

      </div>
    </div>

    {{/detail}}

    <div class="container-fluid">

      <div class="row">
        <span style="display: block; margin-top: 10px;">历史记录:</span>
        <hr style="margin-top: 3px; margin-bottom: 0px;">
      </div>



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
                  <th>我方补贴金额(元)</th>
                  <th>补贴付款方式</th>
                  <th>应拨金额(元)</th>
                  <th>退票手续费(元)</th>
                  <th>退款承债方</th>
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
                  <td>{{subsidyAmountO2o}}</td>
                  <td>{{subsidyType}}</td>
                  <td>{{acceptanceAppropriation}}</td>
                  <td>{{returnFee}}</td>
                  <td>{{partner}}</td>
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
