<div class="modal fade" id="popup-user-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑用户</h4>
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

<script id="edit-template" type="text/x-tmpl-mustache">
  <input type="hidden" id="userId" value="{{user.id}}">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">登录ID</th>
            <td>{{user.loginId}}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td><input type="text" class="form-control" name="realName" id="realName" value="{{user.realName}}" required data-parsley-minlength="2"></td>
          </tr>
          <tr>
            <th>所在城市</th>
            <td><input type="text" class="form-control" name="city" id="city" value="{{user.city}}" required></td>
          </tr>
          <tr>
            <th>所在单位</th>
            <td><input type="text" class="form-control" name="department" id="department" value="{{user.department}}" required></td>
          </tr>
          <tr>
            <th>手机号码</th>
            <td><input type="number" class="form-control" name="mobile" id="mobile" maxlength="11" value="{{user.mobile}}" required data-parsley-type="digits"></td>
          </tr>
          <tr>
            <th>邮箱地址</th>
            <td><input type="email" class="form-control" name="email" id="email" value="{{user.email}}" required></td>
          </tr>
          <tr>
            <th>配置渠道</th>
            <td>
              {{#channels}}
              <div class="checkbox-inline"><label><input type="checkbox" name="channel" value="{{channelId}}" {{#selected}}checked{{/selected}} required data-parsley-errors-container="#error-channel"><span>{{channelName}}</span></label></div>
              {{/channels}}
              <div id="error-channel"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>

  <div class="edit-section">

    <h5>配置角色</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="roleSelect" class="form-control" size="8" multiple="multiple">
                {{#roles}}
                {{^selected}}
                <option value="{{id}}">{{id}}:{{roleName}}</option>
                {{/selected}}
                {{/roles}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="roleSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="roleSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="roleSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="roleSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="roleSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-role">
                {{#roles}}
                {{#selected}}
                <option selected value="{{id}}">{{id}}:{{roleName}}</option>
                {{/selected}}
                {{/roles}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-role"></div>
    </div>

  </div>

  <div class="edit-section">

    <h5>配置城市</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="citySelect" class="form-control" size="8" multiple="multiple">
                {{#cities}}
                {{^selected}}
                <option value="{{cityId}}">{{cityName}}</option>
                {{/selected}}
                {{/cities}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="citySelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="citySelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="citySelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="citySelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="citySelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-city">
                {{#cities}}
                {{#selected}}
                <option selected value="{{cityId}}">{{cityName}}</option>
                {{/selected}}
                {{/cities}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-city"></div>
    </div>

  </div>

</script>

<script id="create-template" type="text/x-tmpl-mustache">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">登录ID</th>
            <td><input type="text" class="form-control" id="loginId" required data-parsley-minlength="6"></td>
          </tr>
          <tr>
            <th>密码</th>
            <td><input type="password" class="form-control" id="password" required data-parsley-minlength="5"></td>
          </tr>
          <tr>
            <th>确认密码</th>
            <td><input type="password" class="form-control" required data-parsley-equalto="#password"></td>
          </tr>
          <tr>
            <th width="80">姓名</th>
            <td><input type="text" class="form-control" id="realName" required data-parsley-minlength="2"></td>
          </tr>
          <tr>
            <th>所在城市</th>
            <td><input type="text" class="form-control" id="city" required></td>
          </tr>
          <tr>
            <th>所在单位</th>
            <td><input type="text" class="form-control" id="department" required></td>
          </tr>
          <tr>
            <th>手机号码</th>
            <td><input type="number" class="form-control" id="mobile" maxlength="11" required data-parsley-type="digits"></td>
          </tr>
          <tr>
            <th>邮箱地址</th>
            <td><input type="email" class="form-control" id="email" required></td>
          </tr>
          <tr>
            <th>配置渠道</th>
            <td>
              {{#channels}}
              <div class="checkbox-inline"><label><input type="checkbox" name="channel" id="channel" value="{{channelId}}" required data-parsley-errors-container="#error-channel"><span>{{channelName}}</span></label></div>
              {{/channels}}
              <div id="error-channel"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="edit-section">
    <h5>配置角色</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="roleSelect" class="form-control" size="8" multiple="multiple">
                {{#roles}}
                <option value="{{id}}">{{roleName}}</option>
                {{/roles}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="roleSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="roleSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="roleSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="roleSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="roleSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-role"></select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-role"></div>
    </div>
  </div>
  <div class="edit-section">
    <h5>配置城市</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="citySelect" class="form-control" size="8" multiple="multiple">
                {{#cities}}
                <option value="{{cityId}}">{{cityName}}</option>
                {{/cities}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="citySelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="citySelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="citySelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="citySelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="citySelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-city"></select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-city"></div>
    </div>
  </div>
</script>