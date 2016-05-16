<div class="modal fade" id="popup-unit-priority" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">活动优先级</h4>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control" required data-parsley-type="number" min="1" max="9999" maxlength="4" placeholder="填写优先级">
          <h5>当前已有活动单元:</h5>
          <div class="table-responsive" style="height: 300px;">
            <table class="table table-bordered" id="priorityTable">
              <thead>
                <tr>
                  <th>优先级</th>
                  <th>活动单元</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2" align="center">载入中...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" disabled>设置</button>
        </div>
      </form>
    </div>
  </div>
</div>