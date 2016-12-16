<div class="modal fade" id="popup-tphall-create" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">新建标准影厅并关联</h4>
        </div>
        <div class="modal-body">
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
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>