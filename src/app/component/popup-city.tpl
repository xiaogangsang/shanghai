<div class="modal fade" id="popup-city" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog dialog-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">选择城市</h4><label class="checkbox-inline"><input type="checkbox" id="chooseAll"><span>全选</span></label>
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

<script id="city-template" type="text/x-tmpl-mustache">
  <div class="input-group choosed-city">
    <div class="input-group-addon">已选：</div>&nbsp;{{&choosed}}</div>
    <div class="candidate-city">
      <ul class="nav nav-tabs" role="tablist">
        {{&tab}}
      </ul>
      <div class="tab-content">
        {{&pane}}
      </div>
    </div>
  </script>