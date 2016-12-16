<div class="modal fade" id="popup-hall-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑标准影厅</h4>
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
  <input type="hidden" id="hallId" value="{{hall.id}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="80">影厅名</th>
          <td><input type="text" class="form-control" id="hallName" value="{{hall.name}}" required></td>
        </tr>
        <tr>
          <th>所属影院</th>
          <td><input type="text" class="form-control" id="storeId" data-id="{{hall.storeId}}" value="【{{hall.storeId}}】{{hall.storeName}}" readonly required></td>
        </tr>
      </tbody>
    </table>
  </div>
</script>

<script id="create-template" type="text/x-tmpl-mustache">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="80">影厅名</th>
          <td><input type="text" class="form-control" id="hallName" required></td>
        </tr>
        <tr>
          <th>所属影院</th>
          <td><input type="text" class="form-control" id="storeId" readonly required></td>
        </tr>
      </tbody>
    </table>
  </div>
</script>