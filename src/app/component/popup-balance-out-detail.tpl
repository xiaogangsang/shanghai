
<script id="detail-template" type="text/x-tmpl-mustache">

  <div class="container-fluid detail-area readonly">

  {{#detail}}
    <div class="container-fluid">

      <div class="row">
        <div class="col-md-4 pull-right">
          <button class="form-control btn btn-default edit-submit" data-version="{{version}}">提交</button>
        </div>
      </div>

      <div class="row">

      <span style="display: block; margin-top: 10px;">商品信息:</span>
      <hr style="margin-top: 3px;">

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">订单渠道</div>
            <input type="text" class="form-control" id="chargeMerchant" value="{{chargeMerchant}}" disabled>
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
            <input type="text" class="form-control" id="filmName" value="{{filmName}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">用户手机号...</div>
            <input type="text" class="form-control" id="payStatus" value="{{payStatus}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影院</div>
            <input type="text" class="form-control" id="cinemaName" value="{{cinemaName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">影厅</div>
            <input type="text" class="form-control" id="hallName" value="{{hallName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">开场时间</div>
            <input type="text" class="form-control" id="startTime" value="{{startTime}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">座位</div>
            <input type="text" class="form-control" id="seatNames" value="{{seatNames}}" disabled>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">张数...</div>
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
            <input type="text" class="form-control" id="merchantName" value="{{merchantName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">二级商户号</div>
            <input type="text" class="form-control" id="merhcantNo" value="{{merhcantNo}}">
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
            <div class="input-group-addon">票类...</div>
            <input type="text" class="form-control" id="thdOrderNo" value="{{thdOrderNo}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">用户支付金额</div>
            <input type="text" class="form-control" id="serviceAmount" value="{{serviceAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">我方补贴金额</div>
            <input type="text" class="form-control" id="subsidyAmountO2o" value="{{subsidyAmountO2o}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">补贴付款方式</div>
            <select class="form-control" id="subsidyType" value="{{subsidyType}}">
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退票手续费</div>
            <input type="text" class="form-control" id="returnFee" value="{{returnFee}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">退款承债方</div>
              <select class="form-control" id="search_partner">
                <option value=""></option>
                <option value="1">O2O</option>
                <option value="2">TP方</option>
                <option value="3">渠道方</option>
              </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6 editable">
          <div class="input-group">
            <div class="input-group-addon">O2O应收金额</div>
            <input type="text" class="form-control" id="o2oReceivableAmount" value="{{o2oReceivableAmount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">实收金额</div>
            <input type="text" class="form-control" id="bankAmount" value="{{bankAmount}}" disabled>
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
            <input type="text" class="form-control" id="signatureNo" value="{{signatureNo}}" disabled>
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
            <select class="form-control" id="reconciliationStatus" value="reconciliationStatus">
              <option value=""></option>
              <option value="1">未对账</option>
              <option value="2">对账不一致</option>
              <option value="3">收单对账成功</option>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-6">
          <div class="input-group">
            <div class="input-group-addon">对账不一致原因</div>
            <select class="form-control" id="reason" value="reason">
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
                  <th>票价</th>
                  <th>退票手续费</th>
                  <th>服务费</th>
                  <th>我方补贴金额</th>
                  <th>应收金额</th>
                  <th>承债方</th>
                  <th>优惠方式</th>
                  <th>活动/优惠券名称</th>
                  <th>收单对账状态</th>
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
                </tr>
                {{/operateRecords}}
              </tbody>
            </table>
          </div>
      </div>
    </div>

  </div>

</script>

<!-- TODO: 配置table数据 -->
<script id="table-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}" data-bannertype="{{bannerType}}">
    <td>{{merchantId}}</td>
    <td>{{merchantName}}</td>
    <td>{{createTime}}</td>
    <td>{{userName}}</td>
    <td>{{department}}</td>
    <td>{{merchantStatus}}</td>
    <td>{{accountStatus}}</td>
    <td>
      <a href="#" type="button" class="btn btn-xs btn-default btn-edit">查看</a>
    </td>
  </tr>
  {{/rows}}
</script>