<div class="modal fade" id="popup-cinema-bind-merchant" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">关联商户</h4>
      </div>
      <div class="modal-body">
        <h5></h5>
        <input type="hidden" id="bindStoreId">
        <div class="table-responsive">
          <table class="table table-condensed" id="merchantTable">
            <thead>
              <tr>
                <th>商户号</th>
                <th>商户名称</th>
                <th>TP方</th>
                <th>商户级别</th>
                <th>商户状态</th>
                <th>账户状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="7" align="center">暂无关联商户！</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
        <button type="button" class="btn btn-default" id="btn-listMerchant">添加商户 <span class="glyphicon glyphicon-chevron-down"></span></button>

        <div class="merchant-list">
          <form id="formSearchMerchant" class="row">
            <div class="form-group col-sm-6 col-md-4">
              <div class="input-group">
                <div class="input-group-addon">商户号</div>
                <input type="text" class="form-control" id="merchantId">
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-4">
              <div class="input-group">
                <div class="input-group-addon">商户名称</div>
                <input type="text" class="form-control" id="merchantName">
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-4">
              <div class="input-group">
                <div class="input-group-addon">TP方</div>
                <select class="form-control" id="tpId">
                  <option value="">全部</option>
                </select>
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-4">
              <div class="input-group">
                <div class="input-group-addon">商户级别</div>
                <select class="form-control" id="merchantType">
                  <option value="">全部</option>
                  <option value="1">总部</option>
                  <option value="2">区域</option>
                </select>
              </div>
            </div>
            <div class="form-group col-sm-6 col-md-4 pull-right">
              <div class="row">
                <div class="col-sm-6"><button type="submit" class="btn btn-block btn-primary">查询</button></div>
                <div class="col-sm-6"><button type="reset" class="btn btn-block btn-default">重置</button></div>
              </div>
            </div>
          </form>
          <div class="table-responsive" style="max-height: 300px;">
            <table class="table table-condensed" id="merchantList">
              <thead>
                <th>商户号</th>
                <th>商户名称</th>
                <th>TP方</th>
                <th>商户级别</th>
                <th>商户状态</th>
                <th width="60">操作</th>
              </thead>
              <tbody>
                <tr>
                  <td colspan="6" align="center">点击查询！</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<script id="bind-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}">
    <td>{{merchantId}}</td>
    <td>{{merchantName}}</td>
    <td>{{tpId}}</td>
    <td>{{merchantClass}}</td>
    <td>{{merchantStatus}}</td>
    <td>{{accountStatus}}</td>
    <td><button type="button" class="btn btn-primary btn-block btn-delMerchant">移除关联</button></td>
  </tr>
  {{/rows}}
</script>
<script id="unbind-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}">
    <td>{{merchantId}}</td>
    <td>{{merchantName}}</td>
    <td>{{tpId}}</td>
    <td>{{merchantClass}}</td>
    <td>{{merchantStatus}}</td>
    <td>{{#canBind}}<button type="button" class="btn btn-primary btn-block btn-addMerchant">关联</button>{{/canBind}}{{^canBind}}<p class="bg-primary">已关联</p>{{/canBind}}</td>
  </tr>
  {{/rows}}
</script>