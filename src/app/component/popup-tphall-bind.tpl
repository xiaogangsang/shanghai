<div class="modal fade" id="popup-tphall-bind" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">关联到对应标准影院下的影厅</h4>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
          <table class="table table-bordered table-condensed table-hover" id="hallTable">
            <thead>
              <tr>
                <th width="60">ID</th>
                <th>标准影厅名</th>
                <th>标准影院ID</th>
                <th>座位数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8" align="center">请搜索要绑定的标准影厅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form id="formBindHall">
        <div class="modal-footer">
          <input type="hidden" id="hallId">
          <input type="hidden" id="tpHallId">
          <input type="hidden" id="tpStoreId">
          <button type="submit" class="btn btn-primary">设置</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="tp-tr-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}">
    <td>{{id}}</td>
    <td>{{name}}</td>
    <td>{{storeId}}</td>
    <td>{{seatNum}}</td>
  </tr>
  {{/rows}}
</script>