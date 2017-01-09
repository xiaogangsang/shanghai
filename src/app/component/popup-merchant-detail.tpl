
<script id="detail-template" type="text/x-tmpl-mustache">

  <h4 class="modal-title" id="edit-merchantNoTitle" hidden="true">商户号：<span id="edit-merchantNo"></span></h4>

  <div class="container-fluid detail-area">

  <form id="detail_formSearch" class="container-fluid">

    <div class="container-fluid">

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户名称</div>
            <input type="text" class="form-control" id="merchantName" value="{{merchantName}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户号</div>
            <input required type="text" class="form-control" id="merchantNo" value="{{merchantId}}">
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户状态</div>
            <!-- <input type="text" class="form-control" id="merchanrStatus" value="{{merchantStatus}}"> -->
            <select class="form-control" id="detail-merchantStatus" required>
            </select>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户联系人</div>
            <input type="text" class="form-control" id="merchantContacter" value="{{merchantContacter}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">联系电话</div>
            <input type="text" class="form-control" id="merchantPhone" value="{{merchantPhone}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工姓名</div>
            <input type="text" class="form-control" id="userName" value="{{userName}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">员工编号</div>
            <input type="text" class="form-control" id="userId" value="{{userId}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">商户级别</div>
            <select class="form-control" id="detail-merchantClass" value="{{merchantClass}}" required>
               <option value=""></option>
              <option value="1">预付</option>
              <option value="2">后付</option>
            </select>
            <!-- <input type="text" class="form-control" id="" value="{{merchantClass}}"> -->
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">TP方</div>
            <select class="form-control" id="detail-tpId" required>
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
                <input type="checkbox" name="repeatedDay" value="1" required data-parsley-errors-container="#error-repeatedDay" id="merchantTypeCheckbox" checked>
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
            <select class="form-control" id="select-allocation-type" required>
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
            <div class="radio-inline"><label><input type="radio" name="allocation-detail-input" value="1" id="inlineCheckbox1"  data-parsley-errors-container="#error-allocation-detail-input" {{#allocationDetail}}checked{{/allocationDetail}}><span>是</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="allocation-detail-input" value="0" id="inlineCheckbox2" data-parsley-errors-container="#error-allocation-detail-input" {{^allocationDetail}}checked{{/allocationDetail}}><span>否</span></label></div>
            <div id="error-allocation-detail-input"></div>
          </div>
        </div>
      </div>

      <div class="send-allocation-detail-container">
        <div class="row">
          <div class="form-group col-sm-12">
            <div class="input-group">
              <div class="input-group-addon">发送对象</div>
              <div class="checkbox-inline"><label><input type="checkbox" name="send-to" value="1" data-parsley-errors-container="#error-send-to" id="allocationDetailReceiver1"><span>商户</span></label></div>
              <div class="checkbox-inline"><label><input type="checkbox" name="send-to" value="2" data-parsley-errors-container="#error-send-to" id="allocationDetailReceiver2"><span>卡部</span></label></div>
              <div id="error-send-to"></div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="form-group col-sm-6 col-md-4 merchant-email">
            <div class="input-group">
              <div class="input-group-addon">商户E-mail</div>
              <input type="text" class="form-control" value="{{email}}" id="email" required data-parsley-pattern="/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/" data-parsley-error-message="邮箱格式不正确">
            </div>
          </div>

          <div class="form-group col-sm-6 col-md-4 branch-email" id="cardEmailDiv">
            <div class="input-group">
              <div class="input-group-addon">卡部E-mail</div>
              <input type="text" class="form-control" value="{{departmentEmail}}" id="cardEmail" required data-parsley-pattern="/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/" data-parsley-error-message="邮箱格式不正确">
            </div>
          </div>

        </div>
      </div>

      <div class="row">
        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账户名</div>
            <input type="text" class="form-control" id="accountName" value="{{bankAccount}}" required>
          </div>
        </div>

        <div class="form-group col-sm-6 col-md-4">
          <div class="input-group">
            <div class="input-group-addon">账号</div>
            <input type="text" class="form-control" id="bankAccount" value="{{bankCode}}" required>
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

    <div class="container-fluid" id="attachments-container">
      <div class="row">
        <span>商户附件列表:</span>
    </div>
    <div class="row" id="attachment-table">
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
                    <a type="button" class="download" data-fileurl="{{filePath}}">下载</button>
                    <!-- {{#isShow}}
                     <a type="button" class="lookMore" data-fileurl="{{filePath}}">查看</button>
                      <button type="button" class="btn btn-xs btn-default btn-delete" data-merchantid="{{merchantId}}">删除</button>
                    {{/isShow}} -->
                  </td>
                </tr>
              {{/attachments}}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>

    </div>
  <!-- <div class="container-fluid" style="margin-top: 15px;"> -->
          <div class="row" style="margin-top: 15px;">
            <div class="col-md-3 col-md-push-4" id="commitBtnDiv">
              <button type="button" class="btn btn-default submit form-control" id="commitBtn">提交审核</button>
            </div>
            <!-- <div class="col-md-3 col-md-push-4 save">
              <button class="btn btn-default form-control">保存草稿</button>
            </div> -->
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>

</script>