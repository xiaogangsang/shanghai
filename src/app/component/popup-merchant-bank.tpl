<script id="select-bank-template" type="text/x-tmpl-mustache">
	<div class="container-fluid">
		<div class="row">

			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">清算银行名称</div>
          <input type="text" class="form-control" id="search_startTime">
        </div>
			</div>

			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">清算银行网点</div>
          <input type="text" class="form-control" id="search_startTime">
        </div>
			</div>

			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">所在城市名称</div>
          <input type="text" class="form-control" id="search_startTime">
        </div>
			</div>

		</div>

		<div class="row">
			<div class="col-xs-4 col-xs-push-4">
				<button class="btn btn-default form-control">查询</button>
			</div>
			<div class="col-xs-4 col-xs-push-4">
				<button class="btn btn-default form-control">重置</button>
			</div>
		</div>

		<div class="row" id="pager"></div>

      <div class="table-responsive">
        <table class="table table-hover" id="dataTable">
          <thead>
            <tr>
              <th>联行行号</th>
              <th>所在城市</th>
              <th>银行名称</th>
              <th>银行网点</th>
              <th width="100">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="9" align="center">请点击“查询”按钮！</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
	</div>
</script>

<script id="table-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}" data-bannertype="{{bannerType}}">
    <td>{{merchantId}}</td>
    <td>{{merchantName}}</td>
    <td>{{createTime}}</td>
    <td>{{userName}}</td>
    <td>
      <a href="#" class="btn btn-xs btn-default btn-edit">选择</a>
    </td>
  </tr>
  {{/rows}}
</script>