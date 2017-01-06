
<script id="detail-template" type="text/x-tmpl-mustache">

	<div class="container-fluid">
		{{#detail.appendRecord}}
		<form>
			<div class="row" style="margin-bottom: 20px;">
				<div class="col-sm-4 pull-right">
					<button type="submit" class="form-control btn btn-default edit-submit">保存</button>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">结算日期</div>
						<input type="text" class="form-control" id="diff_settleDate" value="{{settleDate}}">
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">交易订单号</div>
						<input type="text" class="form-control" id="diff_orderNo" value="{{orderNo}}" data-parsley-pattern="[0-9]+">
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">差异编号</div>
						<input type="text" class="form-control" id="diff_number" value="{{number}}" data-parsley-pattern="[0-9]+">
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">差异类型</div>
						<select class="form-control" id="diff_differType" value="{{differType}}">
							<option value></option>
							<option value="0">收入</option>
							<option value="1">成本</option>
							<option value="2">待退款</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">渠道</div>
						<select class="form-control" id="diff_channelId" value="{{channelId}}">
							<option value></option>
							<option value="1">掌上生活</option>
							<option value="2">手机银行</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">处理标识</div>
						<select class="form-control" id="diff_processType" value="{{processType}}">
							<option value></option>
							<option value="0">活动限购</option>
							<option value="1">票类有误</option>
							<option value="2">待退款</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">批次号</div>
						<input type="text" class="form-control" id="diff_batchNo" value="{{batchNo}}">
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">差异金额</div>
						<input type="text" class="form-control" id="diff_amount" value="{{amount}}">
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">处理状态</div>
						<select class="form-control" id="diff_processStatus" value="{{processStatus}}">
							<option value></option>
							<option value="0">待处理</option>
							<option value="1">已处理</option>
							<option value="2">无需处理</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">责任部门</div>
						<select class="form-control" id="diff_departId" value="{{departId}}">
							<option value="0">影票</option>
							<option value="1">卡中心</option>
							<option value="2">其他</option>
						</select>
					</div>
				</div>
				<div class="form-group col-sm-12">
					<div class="input-group">
						<div class="input-group-addon">差异说明</div>
						<textarea class="form-control" style="resize: vertical;" id="diff_describ" value="{{describ}}"></textarea>
					</div>
				</div>
				<div class="form-group col-sm-12">
					<div class="input-group">
						<div class="input-group-addon">差异备注</div>
						<textarea class="form-control" style="resize: vertical;" id="diff_remarks" value="{{remarks}}"></textarea>
					</div>
				</div>
				<div class="form-group col-sm-12">
					<div class="input-group">
						<div class="input-group-addon">处理备注</div>
						<textarea class="form-control" style="resize: vertical;" id="diff_processRemarks" value="{{processRemarks}}"></textarea>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">处理人</div>
						<input type="text" class="form-control" id="diff_operatorName" value="{{operatorName}}" readonly>
					</div>
				</div>
				<div class="form-group col-sm-6">
					<div class="input-group">
						<div class="input-group-addon">处理时间</div>
						<input type="text" class="form-control" id="diff_updateTime" value="{{updateTime}}" readonly>
					</div>
				</div>
			</div>
		</form>
		{{/detail.appendRecord}}

		<div class="row">
			<h5 class="text-center" style="margin-top: 20px;">相关收单明细</h5>
			<div class="table-responsive">
				<table class="table table-hover table-condensed" id="diff_acquiringRecords">
					<thead>
						<tr>
							<th>ID</th>
							<th>交易订单号</th>
							<th>银行收单日期</th>
							<th>订单渠道</th>
							<th>收单订单类型</th>
							<th>常规补贴付款方式</th>
							<th>支付补贴付款方式</th>
							<th>退款承载方</th>
							<th>应收用户金额</th>
							<th>票价</th>
							<th>服务费</th>
							<th>退票手续费</th>
							<th>渠道方常规补贴金额</th>
							<th>支付活动补贴金额</th>
							<th>O2O应收金额</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<h5 class="text-center" style="margin-top: 20px;">相关出货明细</h5>
			<div class="table-responsive">
				<table class="table table-hover table-condensed" id="diff_shipmentRecords">
					<thead>
						<tr>
							<th>ID</th>
							<th>交易订单号</th>
							<th>结算日期</th>
							<th>订单渠道</th>
							<th>出货订单类型</th>
							<th>二级商户号</th>
							<th>二级商户名</th>
							<th>常规补贴付款方式</th>
							<th>支付补贴付款方式</th>
							<th>退款承载方</th>
							<th>结算金额</th>
							<th>退票手续费</th>
							<th>应付金额</th>
							<th>渠道方常规补贴金额</th>
							<th>支付活动补贴金额</th>
							<th>实付金额</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
		<div class="row">
			<h5 class="text-center" style="margin-top: 20px;">相关差异列表</h5>
			<div class="table-responsive">
				<table class="table table-hover table-condensed" id="diff_apendRecords">
					<thead>
						<tr>
							<th>差异编号</th>
							<th>结算日期</th>
							<th>交易订单号</th>
							<th>差异类型</th>
							<th>差异处理标识</th>
							<th>渠道</th>
							<th>常规补贴付款方式</th>
							<th>支付补贴付款方式</th>
							<th>常态活动补贴差额(收单-出货)</th>
							<th>支付活动补贴差额(收单-出货)</th>
							<th>差异金额</th>
							<th>差异说明</th>
							<th>差异处理状态</th>
							<th>批次号</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
</script>

<script id="shipment-table-template" type="text/x-tmpl-mustache">
	{{#rows}}
	<tr>
		<!-- ID -->
		<td>{{id}}</td>
		<!-- 交易订单号 -->
		<td>{{orderNo}}</td>
		<!-- 结算日期 -->
		<td>{{settleDate}}</td>
		<!-- 订单渠道 -->
		<td>{{payTool}}</td>
		<!-- 出货订单类型 -->
		<td>{{shipmentOrderType}}</td>
		<!-- 二级商户号 -->
		<td>{{merchantNo}}</td>
		<!-- 二级商户名 -->
		<td>{{merchantName}}</td>
		<!-- 常规补贴付款方式 -->
		<td>{{subsidyType}}</td>	
		<!-- 支付补贴付款方式 -->
		<td>{{subsidyTypeTrd}}</td>
		<!-- 退款承债方 -->
		<td>{{partner}}</td>
		<!-- 结算金额 -->
		<td>{{settleAmount}}</td>	
		<!-- 退票手续费 -->
		<td>{{returnFee}}</td>
		<!-- 应付金额 -->
		<td>{{acceptanceAppropriation}}</td>
		<!-- 渠道方常规补贴金额 -->
		<td>{{subsidyAmountO2o}}</td>
		<!-- 支付活动补贴金额 -->
		<td>{{subsidyAmountTrd}}</td>
		<!-- 实付金额 -->
		<td>{{finalSettleAmount}}</td>
	</tr>
	{{/rows}}
</script>
<script id="acquiring-table-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr>
     <!-- ID -->
    <td>{{id}}</td>
    <!-- 交易订单号 -->
    <td>{{orderNo}}</td>
    <!-- 银行收单日期 -->
    <td>{{settleDate}}</td>
    <!-- 订单渠道 -->
    <td>{{payTool}}</td>
    <!-- 收单订单类型 -->
    <td>{{acquiringOrderType}}</td>
    <!-- 常规补贴付款方式 -->
    <td>{{subsidyType}}</td>
    <!-- 支付补贴付款方式 -->
    <td>{{subsidyTypeTrd}}</td>
    <!-- 退款承债方 -->
    <td>{{partner}}</td>
    <!-- 应收用户金额 -->
    <td>{{payAmount}}</td>
    <!-- 票价 -->
    <td>{{ticketAmount}}</td>
    <!-- 服务费 -->
    <td>{{serviceAmount}}</td>
    <!-- 退票手续费 -->
    <td>{{returnFee}}</td>
    <!-- 渠道方常规补贴金额 -->
    <td>{{subsidyAmountO2o}}</td>
    <!-- 支付活动补贴金额 -->
    <td>{{subsidyAmountTrd}}</td>
    <!-- O2O应收金额 -->
    <td>{{o2oReceivableAmount}}</td>
  </tr>
  {{/rows}}
</script>
