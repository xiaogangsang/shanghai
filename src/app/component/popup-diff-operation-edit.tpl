<div class="container-fluid">
	<form>
		
		<div class="row" style="margin-bottom: 20px;">
			<div class="col-sm-4 pull-right">
				<button type="sumbit" class="form-control btn btn-default edit-submit">保存</button>
			</div>
		</div>

		<div class="row">

			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">结算日期</div>
					<input type="text" class="form-control" id="">
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">订单号</div>
					<input type="text" class="form-control" id="">
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">差异编号</div>
					<input type="text" class="form-control" id="">
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">差异类型</div>
					<select class="form-control" id="">
						<option value="0">收入</option>
						<option value="1">成本</option>
						<option value="2">待退款</option>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">渠道</div>
					<select class="form-control" id="">
						<option value="1">掌上生活</option>
						<option value="2">手机银行</option>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">处理标识</div>
					<select class="form-control" id="">
						<option value="0">活动限购</option>
						<option value="1">票类有误</option>
						<option value="2">待退款</option>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">批次号</div>
					<input type="text" class="form-control" id="">
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">差异金额</div>
					<input type="text" class="form-control" id="">
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">处理状态</div>
					<select class="form-control" id="">
						<option value="0">待处理</option>
						<option value="1">已处理</option>
						<option value="2">无需处理</option>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">责任部门</div>
					<select class="form-control" id="">
						<option value="0">影票</option>
						<option value="1">卡中心</option>
						<option value="2">其他</option>
					</select>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<div class="input-group">
					<div class="input-group-addon">差异说明</div>
					<textarea class="form-control" style="resize: vertical;" id=""></textarea>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<div class="input-group">
					<div class="input-group-addon">差异备注</div>
					<textarea class="form-control" style="resize: vertical;" id=""></textarea>
				</div>
			</div>
			<div class="form-group col-sm-12">
				<div class="input-group">
					<div class="input-group-addon">处理备注</div>
					<textarea class="form-control" style="resize: vertical;" id=""></textarea>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">处理人</div>
					<input type="text" class="form-control" id="" readonly>
				</div>
			</div>
			<div class="form-group col-sm-6">
				<div class="input-group">
					<div class="input-group-addon">处理时间</div>
					<input type="text" class="form-control" id="" readonly>
				</div>
			</div>

		</div>

	</form>

	<div class="row">
		<h5 class="text-center" style="margin-top: 20px;">相关收单明细</h5>
		<div class="table-responsive">
			<table class="table table-hover table-condensed" id="">
				<thead>
					<tr>
						<th>ID</th>
						<th>银行收单日期</th>
						<th>收单订单类型</th>
						<th>退款类型</th>
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
			</table>
		</div>
	</div>

	<div class="row">
		<h5 class="text-center" style="margin-top: 20px;">相关出货明细</h5>
		<div class="table-responsive">
			<table class="table table-hover table-condensed" id="">
				<thead>
					<tr>
						<th>ID</th>
						<th>结算日期</th>
						<th>出货订单类型</th>
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
			</table>
		</div>
	</div>

	<div class="row">
		<h5 class="text-center" style="margin-top: 20px;">相关差异列表</h5>
		<div class="table-responsive">
			<table class="table table-hover table-condensed" id="">
				<thead>
					<tr>
						<th>差异编号</th>
						<th>结算日期</th>
						<th>交易订单号</th>
						<th>差异类型</th>
						<th>差异处理标识</th>
						<th>渠道</th>
						<th>二级商户号</th>
						<th>二级商户名</th>
						<th>差异金额</th>
						<th>差异说明</th>
						<th>差异处理状态</th>
						<th>批次号</th>
						<th>操作</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>

</div>