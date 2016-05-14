<div class="modal fade" id="popup-unit-dimen" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">影厅制式</h4>
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
<script id="dimen-template" type="text/x-tmpl-mustache">
  <div class="form-group">
    <div class="input-group">
      <div class="input-group-addon">影片制式</div>
      {{#filmType}}
      <div class="checkbox-inline"><label><input type="checkbox" name="filmType" value="{{id}}" required data-parsley-errors-container="#error-filmType" {{#checked}} checked{{/checked}}><span>{{name}}</span></label></div>
      {{/filmType}}
      <div id="error-filmType"></div>
    </div>
  </div>
  <div class="form-group">
    <div class="input-group">
      <div class="input-group-addon">屏幕规格</div>
      {{#screenType}}
      <div class="checkbox-inline"><label><input type="checkbox" name="screenType" value="{{id}}" required data-parsley-errors-container="#error-screenType" {{#checked}} checked{{/checked}}><span>{{name}}</span></label></div>
      {{/screenType}}
      <div id="error-screenType"></div>
    </div>
  </div>
  <div class="form-group">
    <div class="input-group">
      <div class="input-group-addon">特殊影厅</div>
      {{#hallType}}
      <div class="checkbox-inline"><label><input type="checkbox" name="hallType" value="{{id}}" required data-parsley-errors-container="#error-hallType" {{#checked}} checked{{/checked}}><span>{{name}}</span></label></div>
      {{/hallType}}
      <div id="error-hallType"></div>
    </div>
  </div>
</script>