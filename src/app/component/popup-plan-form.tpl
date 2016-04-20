<div class="modal fade" id="popup-plan-form">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
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
        <input type="text" class="form-control" id="name" value="{{name}}">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日金额预算</div>
        <input type="number" class="form-control" pattern="/[0-9]+/" id="dailyAmount" value="{{dailyAmount}}">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">日出票预算</div>
        <input type="number" class="form-control" pattern="/[0-9]+/" id="dailyTicket" value="{{dailyTicket}}">
      </div>
    </div>
  </div>
  <div class="edit-section">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总金额预算</div>
        <input type="number" class="form-control" pattern="/[0-9]+/" id="totalAmount" value="{{totalAmount}}">
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">总出票预算</div>
        <input type="number" class="form-control" pattern="/[0-9]+/" id="totalTicket" value="{{totalTicket}}">
      </div>
    </div>
  </div>
  {{/plan}}
</script>

<script id="create-template" type="text/x-tmpl-mustache">

</script>