<div class="modal fade" id="popup-unit-restriction" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">单户限购</h4>
      </div>
      <form>
        <div class="modal-body">

          <div class="row">

            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">每日限购（张）</div>
                <input type="text" class="form-control" id="saleLimit_dailyTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
              </div>
            </div>

            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总共限购（张）</div>
                <input type="text" class="form-control" id="saleLimit_totalTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">每日限购（笔）</div>
                <input type="text" class="form-control" id="saleLimit_dailyOrder" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
              </div>
            </div>

            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总共限购（笔）</div>
                <input type="text" class="form-control" id="saleLimit_totalOrder" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
              </div>
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