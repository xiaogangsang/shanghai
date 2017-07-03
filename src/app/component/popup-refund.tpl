<div class="modal fade" id="popup-refund" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">退款</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">选择退款承担方</div>
              <div class="radio-inline"><label><input type="radio" name="refundAmountUndertaker" value="0" required data-parsley-errors-container="#error-refundAmountUndertaker"><span>无</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="refundAmountUndertaker" value="1" required data-parsley-errors-container="#error-refundAmountUndertaker"><span>O2O</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="refundAmountUndertaker" value="2" required data-parsley-errors-container="#error-refundAmountUndertaker"><span>合作方</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="refundAmountUndertaker" value="3" required data-parsley-errors-container="#error-refundAmountUndertaker"><span>渠道</span></label></div>
              <div id="error-refundAmountUndertaker"></div>
            </div>
          </div>
          <div id="return-coupon" class="form-group">
            <div class="input-group">
              <div class="input-group-addon">是否退券</div>
              <div class="radio-inline"><label><input type="radio" name="returnCouponSelect" value="true" required data-parsley-errors-container="#error-returnCouponSelect"><span>是</span></label></div>
              <div class="radio-inline"><label><input type="radio" name="returnCouponSelect" value="false" required data-parsley-errors-container="#error-returnCouponSelect"><span>否</span></label></div>
              <div id="error-returnCouponSelect"></div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">退款原因</div>
              <select class="form-control" id="dropdown-reason">
                <option value="">快速选择一个原因</option>
                <option value="百度申请退款">百度申请退款</option>
                <option value="微票申请退款">微票申请退款</option>
              </select>
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