<script id="select-bank-template" type="text/x-tmpl-mustache">

	<div class="container-fluid">

    <form id="bank_formSearch">
		<div class="row">
			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">清算银行名称</div>
          <input type="text" class="form-control" id="bank_Name" required>
        </div>
			</div>

			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">清算银行网点</div>
          <input type="text" class="form-control" id="networkName">
        </div>
			</div>

			<div class="form-group col-md-4">
				<div class="input-group">
          <div class="input-group-addon">所在城市名称</div>
          <input type="text" class="form-control" id="cityName" required>
        </div>
			</div>

		</div>

		<div class="row">
			<div class="col-xs-4 col-xs-push-4">
				<button type="submit" class="btn btn-default form-control" id="bank_search">查询</button>
			</div>
			<div class="col-xs-4 col-xs-push-4">
				<button class="btn btn-default form-control" id="bank_reset">重置</button>
			</div>
		</div>

 <div class="content-area">
		<div class="row" id="bank_pager" style="margin-top: 10px"></div>

      <div class="table-responsive">
        <table class="table table-hover" id="bank_dataTable">
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

  </form>
</div>
</script>

<script id="bank-table-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}" data-bannertype="{{bannerType}}">
    <td>{{code}}</td>
    <td>{{city}}</td>
    <td>{{bankName}}</td>
    <td>{{name}}</td>
    <td>
      <a href="#" class="btn btn-xs btn-default btn-select">选择</a>
    </td>
  </tr>
  {{/rows}}
</script>

<script id="bank-pager-template" type="text/x-tmpl-mustache">
    <div class="col xs-12 col-sm-6 rowStatics" style="margin-top: 30px">共 <span id="total">{{total}}</span> 条数据，当前显示 <span id="rowsSize">{{rowsSize}}</span> 条</div>
    {{#pageTotal}}
    <div class="col xs-12 col-sm-6" style="margin-top: 30px">
      <nav>
        <ul class="pagination pagination-sm">
          <li><a href="#" class="prev"><span>&lt;</span></a></li>
          <li><span id="pageIndex">{{pageIndex}}</span> / <span id="pageTotal">{{pageTotal}}</span></li>
          <li><a href="#" class="next"><span>&gt;</span></a></li>
          <li><input type="number" name="pageNo" id="pageNo" pattern="[0-9]+"></li>
          <li><button type="button" class="btn" id="btn-pager">跳转</button></li>
        </ul>
      </nav>
    </div>
    {{/pageTotal}}
  </script>