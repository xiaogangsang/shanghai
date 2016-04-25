<div class="modal fade" id="popup-class-form">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">编辑角色</h4>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="edit-template" type="text/x-handlebars-template">
  <input type="hidden" id="id" value="{{class.id}}">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">名称</th>
            <td><input type="text" class="form-control" id="ticketName" value="{{class.ticketName}}" required></td>
          </tr>
          <tr>
            <th>渠道</th>
            <td>
              {{#channels}}
              <div class="checkbox-inline"><label><input type="checkbox" name="channelId" value="{{channelId}}" {{#selected}}checked{{/selected}} required data-parsley-errors-container="#error-channel"><span>{{channelName}}</span></label></div>
              {{/channels}}
              <div id="error-channel"></div>
            </td>
          </tr>
          <tr>
            <th><button type="button" class="btn btn-default" id="btn-popup-cinema" onclick="$('#popup-cinema').modal('show');">影院</button><input type="hidden" id="cinema" value="{{cinema}}"></th>
            <td>点击左侧按钮选择影院</td>
          </tr>
          <tr>
            <th>开始日期</th>
            <td><input type="text" class="form-control" id="beginTime" value="{{class.beginTimeStr}}"></td>
          </tr>
          <tr>
            <th>结束日期</th>
            <td><input type="text" class="form-control" id="endTime" value="{{class.endTimeStr}}"></td>
          </tr>
          <tr>
            <th>价格规则</th>
            <td><textarea class="form-control" maxlength="50" id="ticketRule">{{class.ticketRule}}</textarea></td>
          </tr>
          <tr>
            <th>票类类型</th>
            <td>
              <label class="radio-inline"><input type="radio" name="type"{{#class.type}} checked{{/class.type}} value="1"><span>日常票类</span></label>
              <label class="radio-inline"><input type="radio" name="type"{{^class.type}} checked{{/class.type}} value="2"><span>活动票类</span></label>
            </td>
          </tr>
          <tr>
            <th>票类级别</th>
            <td>
              <label class="radio-inline"><input type="radio" name="settleType"{{#class.settleType}} checked{{/class.settleType}} value="1"><span>万达总部</span></label>
              <label class="radio-inline"><input type="radio" name="settleType"{{^class.settleType}} checked{{/class.settleType}} value="2"><span>万达区域</span></label>
            </td>
          </tr>
          <tr>
            <th>可否退票</th>
            <td>
              <label class="radio-inline"><input type="radio" name="isSupportRefund"{{#class.isSupportRefund}} checked{{/class.isSupportRefund}} value="1"><span>支持退票</span></label>
              <label class="radio-inline"><input type="radio" name="isSupportRefund"{{^class.isSupportRefund}} checked{{/class.isSupportRefund}} value="0"><span>不支持退票</span></label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>

<script id="create-template" type="text/x-handlebars-template">

    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">名称</th>
            <td><input type="text" class="form-control" id="ticketName" required></td>
          </tr>
          <tr>
            <th>渠道</th>
            <td>
              {{#channels}}
              <div class="checkbox-inline"><label><input type="checkbox" name="channelId" value="{{channelId}}" required data-parsley-errors-container="#error-channel"><span>{{channelName}}</span></label></div>
              {{/channels}}
              <div id="error-channel"></div>
            </td>
          </tr>
          <tr>
            <th><button type="button" class="btn btn-default" id="btn-popup-cinema" onclick="$('#popup-cinema').modal('show');">影院</button><input type="hidden" id="cinema"></th>
            <td>点击左侧按钮选择影院</td>
          </tr>
          <tr>
            <th>开始日期</th>
            <td><input type="text" class="form-control" id="beginTime"></td>
          </tr>
          <tr>
            <th>结束日期</th>
            <td><input type="text" class="form-control" id="endTime"></td>
          </tr>
          <tr>
            <th>价格规则</th>
            <td><textarea class="form-control" maxlength="50" id="ticketRule"></textarea></td>
          </tr>
          <tr>
            <th>票类类型</th>
            <td>
              <label class="radio-inline"><input type="radio" name="ticketType" value="1"><span>日常票类</span></label>
              <label class="radio-inline"><input type="radio" name="ticketType" value="2"><span>活动票类</span></label>
            </td>
          </tr>
          <tr>
            <th>票类级别</th>
            <td>
              <label class="radio-inline"><input type="radio" name="settleType" value="1"><span>万达总部</span></label>
              <label class="radio-inline"><input type="radio" name="settleType" value="2"><span>万达区域</span></label>
            </td>
          </tr>
          <tr>
            <th>可否退票</th>
            <td>
              <label class="radio-inline"><input type="radio" name="isSupportRefund" value="1"><span>支持退票</span></label>
              <label class="radio-inline"><input type="radio" name="isSupportRefund" value="0"><span>不支持退票</span></label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</script>