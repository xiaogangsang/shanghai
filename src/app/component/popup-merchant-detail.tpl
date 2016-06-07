<div class="modal fade" id="popup-merchant-detail" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">商户详情</h4>
        </div>
        <div class="modal-body"></div>
      </form>
    </div>
  </div>
</div>

<script id="detail-template" type="text/x-tmpl-mustache">

  <div class="container-fluid">

    <div class="container-fluid" style="border: solid 1px; padding-top: 15px; margin-top: 15px;">

      <div class="row">

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户名称</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户号</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户状态</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户联系人</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">联系电话</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工姓名</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工编号</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>

      </div>
    </div>

    <div class="container-fluid" style="border: solid 1px; padding-top: 15px; margin-top: 15px;">

      <div class="row">

        <div class="form-group col-sm-12">
          <div class="input-group">
            <div class="input-group-addon">商户类别</div>
            <div class="checkbox-inline"><label><input type="checkbox" name="repeatedDay" value="1" required data-parsley-errors-container="#error-repeatedDay"><span>在线选座</span></label></div>
            <div id="error-repeatedDay"></div>
          </div>
        </div>

      </div>

    </div>

    <div class="container-fluid" style="border: solid 1px; padding-top: 15px; margin-top: 15px;">

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户备注信息</div>
            <textarea class="form-control" style="max-width: 100%;"></textarea>
          </div>
        </div>
      </div>

    </div>

    <div class="container-fluid" style="border: solid 1px; padding-top: 15px; margin-top: 15px;">

      <div class="row">
        <span style="display: block;">拨款信息:&nbsp;&nbsp;&nbsp;&nbsp;</span>

      
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">拨款模式</div>
            <select class="form-control" id="">
              <option value="">请选择</option>
              <option value="2">周期拨款模式</option>
              <option value="3">固定日期拨款</option>
            </select>
          </div>
        </div>

        <div class="col-sm-6 col-md-8">
          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款周期</div>
              <input type="text" class="form-control" id="">
            </div>
          </div>

          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款延迟天数</div>
              <input type="text" class="form-control" id="">
            </div>
          </div>

        </div>

        <div class="col-sm-6 col-md-8">
          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款日期</div>
              <select class="form-control" id="">
                <option value="">请选择</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-8">
          <div class="input-group">
            <div class="input-group-addon">拨款摘要</div>
            <input type="text" class="form-control" id="">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6">
          <div class="input-group">
            <div class="input-group-addon">是否发送拨款明细</div>
            <div class="radio-inline"><label><input type="radio" name="advancePayment" value="NO" required data-parsley-errors-container="#error-advancePayment" checked><span>是</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="advancePayment" value="ALL" required data-parsley-errors-container="#error-advancePayment"><span>否</span></label></div>
            <div id="error-advancePayment"></div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-12">
          <div class="input-group">
            <div class="input-group-addon">发送对象</div>
            <div class="checkbox-inline"><label><input type="checkbox" name="repeatedDay" value="1" required data-parsley-errors-container="#error-repeatedDay"><span>商户</span></label></div>
            <div class="checkbox-inline"><label><input type="checkbox" name="repeatedDay" value="2" required data-parsley-errors-container="#error-repeatedDay"><span>卡部</span></label></div>
            <div id="error-repeatedDay"></div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户E-mail</div>
            <input type="text" class="form-control">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">卡部E-mail</div>
            <input type="text" class="form-control">
          </div>
        </div>

      </div>

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账户名</div>
            <input type="text" class="form-control" disabled="disabled">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账号</div>
            <input type="text" class="form-control" disabled="disabled">
          </div>
        </div>

        <div class="col-md-4">
          <button class="btn btn-default">选择开户行, 户号</button>
        </div>
      </div>

    </div>

    <div class="container-fluid" style="border: solid 1px; padding-top: 15px; margin-top: 15px;">
      <div class="row">
        <span style="display: block;">商户附件列表:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div class="col-md-4">
          <button class="btn btn-default">上传附件</button>
        </div>
      </div>

      <div class="row">
        <div class="table-responsive">
            <table class="table table-hover" id="dataTable">
              <thead>
                <tr>
                  <th>商户名称</th>
                  <th>附件名</th>
                  <th>上传时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>万达</td>
                  <td>我想骂产品.avi</td>
                  <td>2013.09.99</td>
                  <td>
                    <button type="button" class="btn btn-xs btn-default btn-edit">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>

    <div class="container-fluid" style="margin-top: 15px;">
      <div class="row">
        <div class="col-md-3 col-md-push-2">
          <button class="btn btn-default form-control">提交审核</button>
        </div>
        <div class="col-md-3 col-md-push-4">
          <button class="btn btn-default form-control">保存草稿</button>
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
      <button type="button" class="btn btn-xs btn-default btn-edit">删除</button>
    </td>
  </tr>
  {{/rows}}
</script>