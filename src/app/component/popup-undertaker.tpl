<div class="modal fade" id="popup-undertaker" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">退票</h4>
        </div>
        <div class="modal-body">
          <!-- <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">选择手续费承担方</div>
              <div class="radio-inline"><label><input type="radio" name="chargeUndertaker" value="1" required data-parsley-errors-container="#error-chargeUndertaker"><span>渠道客户</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="chargeUndertaker" value="2" required data-parsley-errors-container="#error-chargeUndertaker"><span>渠道方</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="chargeUndertaker" value="3" required data-parsley-errors-container="#error-chargeUndertaker"><span>电影平台</span></label></div>
              <div id="error-chargeUndertaker"></div>
            </div>
          </div> -->
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">退票原因</div>
              <textarea class="form-control" id="reason" required></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">提交</button>
        </div>
      </form>
    </div>
  </div>
</div>