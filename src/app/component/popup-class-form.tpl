<div class="modal fade" id="popup-class-form">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">编辑万达票类</h4>
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
            <td><input type="text" class="form-control" id="ticketName" value="{{class.ticketId}}" required></td>
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
            <th>影院</th>
            <td>
              <div class="multi-selection table-responsive">
                <table class="table" style="max-width: 100%;">
                  <tbody>
                    <tr>
                      <td width="45%">
                        <select name="from[]" id="cinemaSelect" class="form-control" size="8" multiple="multiple">
                          {{#cinemas}}
                          {{^selected}}<option value="{{cinemaId}}">{{cinemaName}}</option>{{/selected}}
                          {{/cinemas}}
                        </select>
                      </td>
                      <td width="60">
                        <button type="button" id="cinemaSelect_all" class="btn btn-block btn-default">全选</button>
                        <button type="button" id="cinemaSelect_right" class="btn btn-block btn-default">添加</button>
                        <button type="button" id="cinemaSelect_left" class="btn btn-block btn-default">移除</button>
                        <button type="button" id="cinemaSelect_none" class="btn btn-block btn-default">反选</button>
                      </td>
                      <td>
                        <select name="to[]" id="cinemaSelect_to" class="form-control" size="8" multiple="multiple" required data-parsley-errors-container="#error-cinema">
                          {{#cinemas}}
                          {{#selected}}<option value="{{cinemaId}}">{{cinemaName}}</option>{{/selected}}
                          {{/cinemas}}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="error-cinema"></div>
              </div>
            </td>
          </tr>
          <tr>
            <th>开始日期</th>
            <td><input type="text" class="form-control" id="beginTime" value="{{class.beginTimeStr}}" required></td>
          </tr>
          <tr>
            <th>结束日期</th>
            <td><input type="text" class="form-control" id="endTime" value="{{class.endTimeStr}}" required></td>
          </tr>
          <tr>
            <th>价格规则</th>
            <td><textarea class="form-control" maxlength="50" id="ticketRule">{{class.ticketRule}}</textarea></td>
          </tr>
          <tr>
            <th>票类类型</th>
            <td>
              <label class="radio-inline"><input type="radio" name="ticketType"{{#class.type}} checked{{/class.type}} value="1"><span>日常票类</span></label>
              <label class="radio-inline"><input type="radio" name="ticketType"{{^class.type}} checked{{/class.type}} value="2"><span>活动票类</span></label>
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
              <label class="radio-inline"><input type="radio" name="isSupportRefund"{{^class.isSupportRefund}} checked{{/class.isSupportRefund}} value="2"><span>不支持退票</span></label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>

<script id="create-template" type="text/x-handlebars-template">
  <div class="edit-section">
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
            <th>影院</th>
            <td>
              <div class="multi-selection table-responsive">
                <table class="table" style="max-width: 100%;">
                  <tbody>
                    <tr>
                      <td width="45%">
                        <select name="from[]" id="cinemaSelect" class="form-control" size="8" multiple="multiple">
                          {{#cinemas}}
                          <option value="{{cinemaId}}">{{cinemaName}}</option>
                          {{/cinemas}}
                        </select>
                      </td>
                      <td width="60">
                        <button type="button" id="cinemaSelect_all" class="btn btn-block btn-default">全选</button>
                        <button type="button" id="cinemaSelect_right" class="btn btn-block btn-default">添加</button>
                        <button type="button" id="cinemaSelect_left" class="btn btn-block btn-default">移除</button>
                        <button type="button" id="cinemaSelect_none" class="btn btn-block btn-default">反选</button>
                      </td>
                      <td>
                        <select name="to[]" id="cinemaSelect_to" class="form-control" size="8" multiple="multiple" required data-parsley-errors-container="#error-cinema"></select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div id="error-cinema"></div>
              </div>
            </td>
          </tr>
          <tr>
            <th>开始日期</th>
            <td><input type="text" class="form-control" id="beginTime" required></td>
          </tr>
          <tr>
            <th>结束日期</th>
            <td><input type="text" class="form-control" id="endTime" required></td>
          </tr>
          <tr>
            <th>价格规则</th>
            <td><textarea class="form-control" maxlength="50" id="ticketRule"></textarea></td>
          </tr>
          <tr>
            <th>票类类型</th>
            <td>
              <label class="radio-inline"><input type="radio" name="ticketType" value="1" checked><span>日常票类</span></label>
              <label class="radio-inline"><input type="radio" name="ticketType" value="2"><span>活动票类</span></label>
            </td>
          </tr>
          <tr>
            <th>票类级别</th>
            <td>
              <label class="radio-inline"><input type="radio" name="settleType" value="1" checked><span>万达总部</span></label>
              <label class="radio-inline"><input type="radio" name="settleType" value="2"><span>万达区域</span></label>
            </td>
          </tr>
          <tr>
            <th>可否退票</th>
            <td>
              <label class="radio-inline"><input type="radio" name="isSupportRefund" value="1" checked><span>支持退票</span></label>
              <label class="radio-inline"><input type="radio" name="isSupportRefund" value="2"><span>不支持退票</span></label>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>