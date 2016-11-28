<div class="modal fade" id="popup-movie-bind" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">关联合作方影片 [<span id="bindTpMovie"></span>]</h4>
      </div>
      <div class="modal-body">
        <form id="formSearchMovie">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">搜索标准影片名</div>
              <input type="text" class="form-control" id="bindMovieName">
            </div>
          </div>
        </form>
        <div class="table-responsive" style="max-height: 300px;">
          <table class="table table-bordered table-condensed table-hover" id="movieTable">
            <thead>
              <tr>
                <th width="60">ID</th>
                <th>标准影片名</th>
                <th>制式</th>
                <th width="80">上映日期</th>
                <th>导演</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" align="center">暂无匹配，请尝试搜索其他影片名</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form id="formBindMovie">
        <div class="modal-footer">
          <input type="hidden" id="cinemaId">
          <input type="hidden" id="thirdPartyFilmId">
          <input type="hidden" id="thirdPartyId">
          <button type="submit" class="btn btn-primary">设置</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="tr-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}">
    <td>{{id}}</td>
    <td>{{name}}</td>
    <td>{{dimen}}</td>
    <td>{{showDate}}</td>
    <td>{{director}}</td>
  </tr>
  {{/rows}}
</script>