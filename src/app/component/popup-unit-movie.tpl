<div class="modal fade" id="popup-unit-movie" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">影片</h4>
        </div>

        <div class="modal-body">

          <div class="multi-selection table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    <select name="from[]" id="movieSelect" class="form-control" size="20" multiple="multiple"></select>
                  </td>
                  <td width="60">
                    <button type="button" id="movieSelect_all" class="btn btn-block btn-default">全选</button>
                    <button type="button" id="movieSelect_right" class="btn btn-block btn-default">添加</button>
                    <button type="button" id="movieSelect_left" class="btn btn-block btn-default">移除</button>
                    <button type="button" id="movieSelect_none" class="btn btn-block btn-default">反选</button>
                  </td>
                  <td>
                    <select name="to[]" id="movieSelect_to" class="form-control" size="20" multiple="multiple"></select>
                  </td>
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