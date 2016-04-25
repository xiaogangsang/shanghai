<div class="modal fade" id="popup-charge-form">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">编辑服务费</h4>
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
  <input type="hidden" id="channelId" value="{{channelId}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="100">渠道</th>
          <td>{{channelName}}</td>
        </tr>
        <tr>
          <th>服务费</th>
          <td><input type="text" class="form-control" id="fee" value="{{fee}}" required pattern="[0-9]+"></td>
        </tr>
      </tbody>
    </table>
  </div>
</script>