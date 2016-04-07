<div class="modal fade" id="popup-role-form">
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
  <input type="hidden" name="roleId" id="userId" value="{{role.id}}">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">角色名称</th>
            <td><input type="text" class="form-control" id="roleName" value="{{role.roleName}}" required></td>
          </tr>
          <tr>
            <th>角色备注</th>
            <td><input type="text" class="form-control" id="desc" value="{{role.desc}}" required></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="edit-section">
    <h5>配置功能</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="resourceSelect" class="form-control" size="8" multiple="multiple">
                {{#resources}}
                {{^selected}}
                <option value="{{id}}">{{name}}</option>
                {{/selected}}
                {{/resources}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="resourceSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="resourceSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="resourceSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="resourceSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="resourceSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-resource">
                {{#resources}}
                {{#selected}}
                <option value="{{id}}">{{name}}</option>
                {{/selected}}
                {{/resources}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-resource"></div>
    </div>
  </div>

  <div class="edit-section">
    <h5>分配用户</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="userSelect" class="form-control" size="8" multiple="multiple">
                {{#users}}
                {{^selected}}
                <option value="{{id}}">{{realName}}</option>
                {{/selected}}
                {{/users}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="userSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="userSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="userSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="userSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="userSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-user">
                {{#users}}
                {{#selected}}
                <option value="{{id}}">{{realName}}</option>
                {{/selected}}
                {{/users}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-user"></div>
    </div>
  </div>
</script>

<script id="create-template" type="text/x-handlebars-template">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">角色名称</th>
            <td><input type="text" class="form-control" id="roleName" value="{{role.roleName}}" required></td>
          </tr>
          <tr>
            <th>角色备注</th>
            <td><input type="text" class="form-control" id="desc" value="{{role.desc}}" required></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="edit-section">
    <h5>配置功能</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="resourceSelect" class="form-control" size="8" multiple="multiple">
                {{#resources}}
                {{^selected}}
                <option value="{{id}}">{{name}}</option>
                {{/selected}}
                {{/resources}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="resourceSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="resourceSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="resourceSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="resourceSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="resourceSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-resource">
                {{#resources}}
                {{#selected}}
                <option value="{{id}}">{{name}}</option>
                {{/selected}}
                {{/resources}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-resource"></div>
    </div>
  </div>

  <div class="edit-section">
    <h5>分配用户</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="userSelect" class="form-control" size="8" multiple="multiple">
                {{#users}}
                {{^selected}}
                <option value="{{id}}">{{realName}}</option>
                {{/selected}}
                {{/users}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="userSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="userSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="userSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="userSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="userSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-user">
                {{#users}}
                {{#selected}}
                <option value="{{id}}">{{realName}}</option>
                {{/selected}}
                {{/users}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="error-user"></div>
    </div>
  </div>
</script>