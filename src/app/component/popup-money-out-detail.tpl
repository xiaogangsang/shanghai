<script id="detail-template" type="text/x-tmpl-mustache">
	<div class="container-fluid">
		<div class="row">
			<form id="detailFormSearch" class="search-area clearfix">
				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">票类</div>
						<input type="text" class="form-control" id="search_ticketType">
					</div>
				</div>

				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">影票商品订单号</div>
						<input type="text" class="form-control" id="search_movieOrderNo">
					</div>
				</div>

				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">影票交易订单号</div>
						<input type="text" class="form-control" id="search_payOrderNo">
					</div>
				</div>

				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">合作方订单号</div>
						<input type="text" class="form-control" id="search_partnerOrderNo">
					</div>
				</div>

				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">渠道</div>
						<select class="form-control" id="search_channelType">
							<option value="">全部</option>
							<option value="1">掌上生活</option>
							<option value="2">手机银行</option>
						</select>
					</div>
				</div>

				<div class="form-group col-sm-6 col-md-4">
					<div class="input-group">
						<div class="input-group-addon">业务类别</div>
						<select class="form-control" id="search_businessType">
							<option value="">全部</option>
							<option value="1">影票</option>
							<option value="2">手续费</option>
						</select>
					</div>
				</div>

				<div class="col-xs-6 pull-right">
					<div class="col-xs-6">
						<button type="submit" class="btn btn-block btn-primary">查询</button>
					</div>

					<div class="col-xs-6">
						<button type="button" class="btn btn-block btn-default btn-detail-reset">重置</button>
					</div>
				</div>

			</form>

			<div class="detail-content-area">
				<div class="row" id="detailPager"></div>
				<div class="table-responsive">
					<table class="table table-hover" id="detailDataTable">
						<thead>
							<tr>
								<th>商品订单号</th>
                <th>合作方订单号</th>
                <th>交易订单号</th>
                <th>出/退货时间</th>
                <th>拨款时间</th>
                <th>票类</th>
                <th>渠道</th>
                <th>业务类别</th>
                <th>对应影票交易订单号</th>
                <th>出货状态</th>
                <th>支付状态</th>
                <th>退款承债方</th>
                <th>优惠方式</th>
                <th>优惠名称</th>
                <th>退货手续费</th>
                <th>实拨金额</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colspan="30" align="center">请点击“查询”按钮！</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

		</div>
	</div>
</script>