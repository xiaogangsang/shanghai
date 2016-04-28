<div class="modal fade" id="popup-undertaker">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">退票</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">选择手续费承担方</div>
              <div class="checkbox-inline"><label><input type="radio" name="chargeUndertaker" value="1" required data-parsley-errors-container="#error-chargeUndertaker" checked><span>渠道客户</span></label></div>
              <div class="checkbox-inline"><label><input type="radio" name="chargeUndertaker" value="2" required data-parsley-errors-container="#error-chargeUndertaker"><span>渠道方</span></label></div>
              <div class="checkbox-inline"><label><input type="radio" name="chargeUndertaker" value="3" required data-parsley-errors-container="#error-chargeUndertaker"><span>电影平台</span></label></div>
              <div id="error-chargeUndertaker"></div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">退票原因</div>
              <textarea class="form-control" id="refundReason" required></textarea>
            </div>
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