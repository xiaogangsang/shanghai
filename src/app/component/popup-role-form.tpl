<div class="modal fade" id="popup-role-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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

<script id="edit-template" type="text/x-tmpl-mustache">
  <input type="hidden" id="roleId" value="{{role.id}}">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">角色类型</th>
            <td>
              <select id="roleType" class="form-control">
                <option value="">暂时无效</option>
              </select>
            </td>
          </tr>
          <tr>
            <th width="80">角色名称</th>
            <td><input type="text" class="form-control" id="roleName" value="{{role.roleName}}" size="10" required></td>
          </tr>
          <tr>
            <th>角色备注</th>
            <td><input type="text" class="form-control" id="desc" value="{{role.desc}}"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="edit-section">
    <h5>可分配的角色</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="assignedRoleSelect" class="form-control" size="8" multiple="multiple">
                {{#assignedRoles}}
                {{^selected}}<option value="{{id}}">{{id}}:{{roleName}}</option>{{/selected}}
                {{/assignedRoles}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="assignedRoleSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="assignedRoleSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="assignedRoleSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="assignedRoleSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="assignedRoleSelect_to" class="form-control" size="8" multiple="multiple">
                {{#assignedRoles}}
                {{#selected}}<option value="{{id}}">{{id}}:{{roleName}}</option>{{/selected}}
                {{/assignedRoles}}
              </select>
            </td>
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
                {{#hasUnSelected}}
                {{#group}}<optgroup label="{{name}}">{{#function}}{{^selected}}<option value="{{id}}">{{name}}</option>{{/selected}}{{/function}}</optgroup>{{/group}}
                {{^group}}<option value="{{id}}">{{name}}</option>{{/group}}
                {{/hasUnSelected}}
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
                {{#hasSelected}}
                {{#group}}<optgroup label="{{name}}">{{#function}}{{#selected}}<option value="{{id}}">{{name}}</option>{{/selected}}{{/function}}</optgroup>{{/group}}
                {{^group}}<option value="{{id}}">{{name}}</option>{{/group}}
                {{/hasSelected}}
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
                <option value="{{id}}">{{id}}:{{realName}}</option>
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
              <select name="to[]" id="userSelect_to" class="form-control" size="8" multiple="multiple">
                {{#users}}
                {{#selected}}
                <option value="{{id}}">{{id}}:{{realName}}</option>
                {{/selected}}
                {{/users}}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>

<script id="create-template" type="text/x-tmpl-mustache">
  <div class="edit-section">
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <th width="80">角色类型</th>
            <td>
              <select id="roleType" class="form-control">
                <option value="">暂时无效</option>
              </select>
            </td>
          </tr>
          <tr>
            <th width="80">角色名称</th>
            <td><input type="text" class="form-control" id="roleName" value="{{role.roleName}}" size="10" required></td>
          </tr>
          <tr>
            <th>角色备注</th>
            <td><input type="text" class="form-control" id="desc" value="{{role.desc}}"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="edit-section">
    <h5>可分配的角色</h5>
    <div class="table-responsive multi-selection">
      <table class="table">
        <tbody>
          <tr>
            <td>
              <select name="from[]" id="assignedRoleSelect" class="form-control" size="8" multiple="multiple">
                {{#assignedRoles}}
                <option value="{{id}}">{{id}}:{{roleName}}</option>
                {{/assignedRoles}}
              </select>
            </td>
            <td width="60">
              <button type="button" id="assignedRoleSelect_all" class="btn btn-block btn-default">全选</button>
              <button type="button" id="assignedRoleSelect_right" class="btn btn-block btn-default">添加</button>
              <button type="button" id="assignedRoleSelect_left" class="btn btn-block btn-default">移除</button>
              <button type="button" id="assignedRoleSelect_none" class="btn btn-block btn-default">反选</button>
            </td>
            <td>
              <select name="to[]" id="assignedRoleSelect_to" class="form-control" size="8" multiple="multiple"></select>
            </td>
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
                {{#group}}<optgroup label="{{name}}">{{#function}}<option value="{{id}}">{{name}}</option>{{/function}}</optgroup>{{/group}}
                {{^group}}<option value="{{id}}">{{name}}</option>{{/group}}
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
              <select name="to[]" id="resourceSelect_to" class="form-control" size="8" multiple="multiple" data-parsley-required data-parsley-errors-container="#error-resource"></select>
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
                <option value="{{id}}">{{id}}:{{realName}}</option>
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
              <select name="to[]" id="userSelect_to" class="form-control" size="8" multiple="multiple"></select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</script>