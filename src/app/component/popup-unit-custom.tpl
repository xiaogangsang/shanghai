<div class="modal fade" id="popup-unit-custom" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">客群</h4>
      </div>
      <form>
        <div class="modal-body">

          <div style="text-align: center;">
            <div class="checkbox-inline"><label><input type="checkbox" name="customerType" value="1" required data-parsley-errors-container="#error-customerType" checked><span>新户</span></label></div>
            <div class="checkbox-inline"><label><input type="checkbox" name="customerType" value="2" required data-parsley-errors-container="#error-customerType" checked><span>老户</span></label></div>
          </div>

          <div id="error-customerType"></div>

        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>