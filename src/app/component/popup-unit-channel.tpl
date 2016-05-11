<div class="modal fade" id="popup-unit-channel" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">渠道</h4>
      </div>
      <form>
        <div class="modal-body">

          <div id="error-channel"></div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>
<script id="channel-template" type="text/x-tmpl-mustache">
  <div style="text-align: center;">
    {{#channels}}
    <div class="checkbox-inline"><label><input type="checkbox" name="channels" value="{{channelId}}" required data-parsley-errors-container="#error-channel"{{#checked}} checked{{/checked}}><span>{{channelName}}</span></label></div>
    {{/channels}}
  </div>
</script>