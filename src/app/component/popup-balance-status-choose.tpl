<div class="modal fade" id="popup-status-choose" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body">
        	<div class="row">
        		<div class="form-group col-xs-6 col-xs-offset-3">
	            <div class="input-group">
	              <div class="input-group-addon">批量修改选中记录的收单状态为: </div>
	              <select class="form-control" id="targetStatus">
	                <option value="3">对账成功</option>
	                <option value="2">对账不一致</option>
	              </select>
	            </div>
	          </div>
        	</div>

          <div class="row">
          	<div class="col-xs-6 col-xs-offset-3">
	            <div class="col-xs-6">
	              <button type="button" class="btn btn-block btn-default btn-confirm-status-update">确定</button>
	            </div>
	            <div class="col-xs-6">
	              <button type="button" class="btn btn-block btn-default btn-status-update-cancel">取消</button>
	            </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>