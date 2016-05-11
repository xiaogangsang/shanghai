<div class="modal fade" id="popup-unit-dimen" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">影厅制式</h4>
      </div>
      <form>
        <div class="modal-body">

          <div id="error-dimen"></div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>
<script id="dimen-template" type="text/x-tmpl-mustache">
  {{#dimens}}
  <div class="checkbox-inline"><label><input type="checkbox" name="dimen" value="{{id}}" required data-parsley-errors-container="#error-dimen"{{#checked}} checked{{/checked}}><span>{{name}}</span></label></div>
  {{/dimens}}
</script>