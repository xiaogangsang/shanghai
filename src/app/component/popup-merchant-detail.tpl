
<script id="detail-template" type="text/x-tmpl-mustache">

  <div class="container-fluid detail-area">

    <div class="container-fluid">

      <div class="row">

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户名称</div>
            <input type="text" class="form-control" id="merchantName" value="{{merchantName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户号</div>
            <input type="text" class="form-control" id="" value="{{merchantId}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户状态</div>
            <input type="text" class="form-control" id="" value="{{merchantStatus}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户联系人</div>
            <input type="text" class="form-control" id="merchantContacter" value="{{merchantContacter}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">联系电话</div>
            <input type="text" class="form-control" id="merchantPhone" value="{{merchantPhone}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工姓名</div>
            <input type="text" class="form-control" id="" value="{{userName}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工编号</div>
            <input type="text" class="form-control" id="" value="{{userId}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户级别</div>
            <select class="form-control" id="detail-merchantClass">
            </select>
            <!-- <input type="text" class="form-control" id="" value="{{merchantClass}}"> -->
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">TP方</div>
            <select class="form-control" id="detail-tpId">
            </select>
            <!-- <input type="text" class="form-control" id="" value="{{tpId}}"> -->
          </div>
        </div>

      </div>
    </div>

    <div class="container-fluid">

      <div class="row">

        <div class="form-group col-sm-12">
          <div class="input-group">
            <div class="input-group-addon">商户类别</div>
            <div class="checkbox-inline">
              <label>
                <input type="checkbox" name="repeatedDay" value="1" required data-parsley-errors-container="#error-repeatedDay" checked>
                <span>在线选座</span>
              </label>
            </div>
            <div id="error-repeatedDay"></div>
          </div>
        </div>

      </div>

    </div>

    <div class="container-fluid">

      <div class="row"> 
        <div class="form-group col-md-12">
          <div class="input-group">
            <div class="input-group-addon">商户备注信息</div>
            <textarea class="form-control" id="merchantRemark">{{merchantRemark}}</textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">

      <div class="row">
        <span>拨款信息:</span>
      
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">拨款模式</div>
            <select class="form-control" id="select-allocation-type">
              <option value="">请选择</option>
              <option value="1">周期拨款模式</option>
              <option value="2">固定日期拨款</option>
            </select>
          </div>
        </div>

        <div class="col-sm-6 col-md-8 allocation-type1-input">
          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款周期</div>
              <input type="text" class="form-control" id="allocationPeriod" value="{{allocationPeriod}}">
            </div>
          </div>

          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款延迟天数</div>
              <input type="text" class="form-control" id="allocationDelay" value="{{allocationDelay}}">
            </div>
          </div>

        </div>

        <div class="col-sm-6 col-md-8 allocation-type2-input">
          <div class="form-group col-sm-6">
            <div class="input-group">
              <div class="input-group-addon">拨款日期</div>
              <select class="form-control" id="select-fixed-allocation-day">
                <option value="">请选择</option>
                <option value= "1"> 1</option>
                <option value= "2"> 2</option>
                <option value= "3"> 3</option>
                <option value= "4"> 4</option>
                <option value= "5"> 5</option>
                <option value= "6"> 6</option>
                <option value= "7"> 7</option>
                <option value= "8"> 8</option>
                <option value= "9"> 9</option>
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
            <input type="text" class="form-control" id="allocationRemark" value="{{allocationRemark}}">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6">
          <div class="input-group">
            <div class="input-group-addon">是否发送拨款明细</div>
            <div class="radio-inline"><label><input type="radio" name="allocation-detail-input" value="1" required data-parsley-errors-container="#error-allocation-detail-input" {{#allocationDetail}}checked{{/allocationDetail}}><span>是</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="allocation-detail-input" value="0" required data-parsley-errors-container="#error-allocation-detail-input" {{^allocationDetail}}checked{{/allocationDetail}}><span>否</span></label></div>
            <div id="error-allocation-detail-input"></div>
          </div>
        </div>
      </div>

      <div class="send-allocation-detail-container">
        <div class="row">
          <div class="form-group col-sm-12">
            <div class="input-group">
              <div class="input-group-addon">发送对象</div>
              <div class="checkbox-inline"><label><input type="checkbox" name="send-to" value="1" required data-parsley-errors-container="#error-send-to"><span>商户</span></label></div>
              <div class="checkbox-inline"><label><input type="checkbox" name="send-to" value="2" required data-parsley-errors-container="#error-send-to"><span>卡部</span></label></div>
              <div id="error-send-to"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-sm-6 col-md-4 merchant-email">
            <div class="input-group">
              <div class="input-group-addon">商户E-mail</div>
              <input type="text" class="form-control" value="{{email}}">
            </div>
          </div>

          <div class="form-group col-sm-6 col-md-4 branch-email">
            <div class="input-group">
              <div class="input-group-addon">卡部E-mail</div>
              <input type="text" class="form-control" value="{{departmentEmail}}">
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账户名</div>
            <input type="text" class="form-control" id="accountName" value="{{bankAccount}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账号</div>
            <input type="text" class="form-control" id="bankAccount" value="{{bankCode}}">
          </div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">开户行</div>
            <input type="text" class="form-control" id="bankName" value="{{bankAccount}}" readonly>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">联行行号</div>
            <input type="text" class="form-control" id="bankCode" value="{{bankCode}}" readonly>
          </div>
        </div>

        <div class="col-md-4">
          <button class="btn btn-default" id="select-bank">选择开户行, 户号</button>
        </div>

      </div>

    </div>

    <div class="container-fluid">
      <div class="row">
        <span>商户附件列表:</span>
        <div class="col-md-4">
          <button class="btn btn-default">上传附件</button>
        </div>
      </div>

      <div class="row">
        <div class="table-responsive">
            <table class="table table-hover" id="dataTable">
              <thead>
                <tr>
                  <th>附件名</th>
                  <th>上传时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              {{#attachments}}
                <tr>
                  <td>{{attachmentName}}</td>
                  <td>{{createTime}}</td>
                  <td>
                    <a class="download" data-fileurl="{{fileUrl}}">下载</button>
                  </td>
                </tr>
              {{/attachments}}
              </tbody>
            </table>
          </div>
      </div>
    </div>

  </div>

</script>