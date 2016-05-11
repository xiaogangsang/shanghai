<div class="modal fade" id="popup-plan-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑计划</h4>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="edit-template" type="text/x-tmpl-mustache">
  {{#plan}}
  <input type="hidden" id="id" value="{{id}}">
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">计划名称</div>
        <input type="text" class="form-control" id="name" value="{{name}}" required placeholder="必填">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日金额预算</div>
        <input type="text" class="form-control" id="dailyAmount" value="{{dailyAmount}}" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日出票预算</div>
        <input type="text" class="form-control" id="dailyTicket" value="{{dailyTicket}}" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总金额预算</div>
        <input type="text" class="form-control" id="totalAmount" value="{{totalAmount}}" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总出票预算</div>
        <input type="text" class="form-control" id="totalTicket" value="{{totalTicket}}" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
  </div>
  {{/plan}}
</script>

<script id="create-template" type="text/x-tmpl-mustache">
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">计划名称</div>
        <input type="text" class="form-control" id="name" required  placeholder="必填">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日金额预算</div>
        <input type="text" class="form-control" id="dailyAmount" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日出票预算</div>
        <input type="text" class="form-control" id="dailyTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总金额预算</div>
        <input type="text" class="form-control" id="totalAmount" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总出票预算</div>
        <input type="text" class="form-control" id="totalTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
      </div>
    </div>
  </div>

</script>