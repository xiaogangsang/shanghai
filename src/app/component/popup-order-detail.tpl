<div class="modal fade" id="popup-order-detail">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">订单详情</h4>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>

<script id="detail-template" type="text/x-tmpl-mustache">
  {{#order}}
  <input type="hidden" id="transOrderNo" value="{{transOrderNo}}">
  <input type="hidden" id="productOrderNo" value="{{productOrderNo}}">
  <section class="order-detail">
    <div class="col-lg-4">
      <h3>交易订单</h3>
      <div class="edit-section">
        <div class="col-xs-12"><label>客户ID：</label>{{shanchenchen}}</div>
        <div class="col-xs-12"><label>手机号：</label>{{mobile}}</div>
      </div>
      <div class="edit-section">
        <div class="col-xs-12"><label>交易订单号：</label>{{transOrderNo}}</div>
        <div class="col-xs-12"><label>招行订单号：</label>{{cmbOrderNo}}</div>
        <div class="col-xs-12"><label>下单时间：</label>{{placeOrderTime}}</div>
        <div class="col-xs-12"><label>订单完成时间：</label>{{finishOrderTime}}</div>
        <div class="col-xs-12"><label>交易订单状态：</label>{{transOrderStatus}}</div>
        {{#canRefund}}
        <div class="col-xs-12"><button class="btn btn-default pull-right" id="btn-refund">仅退款</button></div>
        {{/canRefund}}
      </div>
      <div class="edit-section">
        <div class="col-xs-12"><label>应付金额：</label>{{shouldPayAmount}}</div>
        <div class="col-xs-12"><label>实付金额：</label>{{actualPayAmount}}</div>
        <div class="col-xs-12"><label>实付积分：</label>xxxxxx</div>
      </div>
      <div class="edit-section">
        <h4 style="margin-top: 0;">交易明细</h4>
        <table class="table table-bordered" style="margin-bottom: 0;">
          <thead>
            <tr>
              <th>交易类型</th>
              <th>交易金额</th>
              <th>交易积分</th>
              <th>交易状态</th>
              <th>交易时间</th>
            </tr>
          </thead>
          <tbody>
            {{#transDetailList}}
            <tr>
              <td>{{transType}}</td>
              <td>{{transAmount}}</td>
              <td>{{transPoint}}</td>
              <td>{{transStatus}}</td>
              <td>{{transDate}}</td>
            </tr>
          </tbody>
        </table>
        {{/transDetailList}}
      </div>
    </div>

    <div class="col-lg-8">
      <h3>商品订单</h3>
      <div class="edit-section">
        <div class="col-xs-12 col-sm-6"><label>商品订单号：</label>{{productOrderNo}}</div>
        <div class="col-xs-12 col-sm-6"><label>第三方订单号：</label>{{tpOrderNo}}</div>
        <div class="col-xs-12 col-sm-6"><label>商品订单状态：</label>{{productOrderStatus}}</div>
      </div>

      <div class="edit-section">
        <div class="col-xs-12 col-sm-6"><label>合作方：</label>{{thirdParty}}</div>
        <div class="col-xs-12 col-sm-6"><label>渠道：</label>{{channelId}}</div>
        <div class="col-xs-12 col-sm-6"><label>城市：</label>{{cityName}}</div>
        <div class="col-xs-12 col-sm-6"><label>影院：</label>{{cinemaName}}</div>
        <div class="col-xs-12 col-sm-6"><label>影院地址：</label>{{cinemaAddress}}</div>
        <div class="col-xs-12 col-sm-6"><label>影片：</label>{{filmName}}</div>
        <div class="col-xs-12 col-sm-6"><label>影片制式：</label>{{dimen}}</div>
        <div class="col-xs-12 col-sm-6"><label>影厅：</label>{{hall}}</div>
        <div class="col-xs-12 col-sm-6"><label>座位：</label>{{seat}}</div>
        <div class="col-xs-12 col-sm-6"><label>开场时间：</label>{{playTime}}</div>
        {{#canReturnTicket}}
        <div class="col-xs-12"><button class="btn btn-default pull-right" id="btn-returnTicket">退票并退款</button></div>
        {{/canReturnTicket}}
      </div>

      <div class="edit-section">
        <div class="col-xs-12 col-sm-6"><label>原价(单价)：</label>{{unitPrice}}</div>
        <div class="col-xs-12 col-sm-6"><label>张数：</label>{{ticketNum}}</div>
        <div class="col-xs-12 col-sm-6"><label>结算总价：</label>{{finalTotalSettleAmount}}</div>
        <div class="col-xs-12 col-sm-6"><label>总补贴金额：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>补贴金额(预付)：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>活动ID：</label>{{activityId}}</div>
        <div class="col-xs-12 col-sm-6"><label>活动名称：</label>{{activityName}}</div>
        <div class="col-xs-12 col-sm-6"><label>票类ID：</label>{{wandaTicketId}}</div>
        <div class="col-xs-12 col-sm-6"><label>优惠券规则ID：</label>{{couponId}}</div>
        <div class="col-xs-12 col-sm-6"><label>优惠券名称：</label>{{couponName}}</div>
        <div class="col-xs-12 col-sm-6"><label>优惠券码：</label>{{couponCode}}</div>
        <div class="col-xs-12 col-sm-6"><label>实际拨款金额：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>商户号：</label>{{merchantNo}}</div>
        {{#canReturnCoupon}}
        <div class="col-xs-12"><button class="btn btn-default pull-right" id="btn-returnCoupon">退优惠券</button></div>
        {{/canReturnCoupon}}
      </div>

      <div class="edit-section">
        <div class="col-xs-12 col-sm-6"><label>序列号：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>前台取票码：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>第三方取票码：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>取票号：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>前台取票验证码：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>第三方取票验证码：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>短信发送状态：</label>xxxxxx</div>
        <div class="col-xs-12 col-sm-6"><label>短信发送时间：</label>xxxxxx</div>
        <div class="col-xs-12"><label>短信发送内容：</label>xxxxxx xxxxxx</div>
        <div class="col-xs-12"><button class="btn btn-default pull-right" id="btn-sendsms">重发短信</button></div>
      </div>
    </div>
  </section>
  {{/order}}
</script>