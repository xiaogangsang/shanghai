<script id="history-template" type="text/x-tmpl-mustache">

  <div class="content-area" style="margin-top: 30px;">
    <h4>操作记录</h4>
    <div class="row" id="pager"></div>

    <div class="table-responsive" id="dataTable">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>操作时间</th>
            <th>操作人</th>
            <th>操作内容</th>
            <th>备注</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
        {{#history}}
          <tr data-id="{{id}}">
            <td>{{id}}</td>
            <td>{{createTime}}</td>
            <td>{{operatorName}}</td>
            <td>{{action}}</td>
            <td>{{remark}}</td>
            <td>
              <a href="{{url}}?hid={{id}}&ref={{ref}}" class="btn btn-xs btn-default" target="_blank">查看</a>
            </td>
          </tr>
        {{/history}}
        </tbody>
      </table>
    </div>
  </div>

</script>