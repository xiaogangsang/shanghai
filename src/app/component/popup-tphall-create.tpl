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
                <tr>
                  <th>座位数</th>
                  <td><input type="text" class="form-control" id="seatNum" required></td>
                </tr>
                <tr>
                  <th>屏幕类型</th>
                  <td>
                    <select class="form-control" id="screenType" required data-parsley-errors-container="#error-screenType">
                      <option value=""></option>
                      <option value="1">IMAX</option>
                      <option value="2">DMAX</option>
                      <option value="3">巨幕</option>
                      <option value="4">普通</option>
                    </select>
                    <div id="error-screenType"></div>
                  </td>
                </tr>
                <tr>
                  <th>特效</th>
                  <td>
                    <select class="form-control" id="effect" required data-parsley-errors-container="#error-effect">
                      <option value=""></option>
                      <option value="1">4D</option>
                      <option value="2">5D</option>
                      <option value="3">普通</option>
                    </select>
                    <div id="error-effect"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <input type="hidden" id="sourceId">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>