<div class="modal fade" id="popup-tphall-bind" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">选择要关联的标准影厅</h4>
      </div>
      <div class="modal-body">
        <form id="formSearchHall">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">搜索标准影厅</div>
              <input type="text" class="form-control" id="bindHallName">
            </div>
          </div>
        </form>
        <div class="table-responsive" style="max-height: 300px;">
          <table class="table table-bordered table-condensed table-hover" id="cinemaTable">
            <thead>
              <tr>
                <th width="60">ID</th>
                <th>标准影厅名</th>
                <th>影院</th>
                <th>院线</th>
                <th>城市</th>
                <th>座位数</th>
                <th>屏幕类型</th>
                <th>特效</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="8" align="center">输入要绑定的标准影厅名称，并按回车</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form id="formBindHall">
        <div class="modal-footer">
          <input type="hidden" id="cinemaId">
          <input type="hidden" id="thirdPartyCinemaId">
          <input type="hidden" id="sourceId">
          <button type="submit" class="btn btn-primary">设置</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="tr-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{hallId}}">
    <td>{{hallId}}</td>
    <td>{{hallName}}</td>
    <td>{{storeName}}</td>
    <td>{{brandName}}</td>
    <td>{{cityName}}</td>
    <td>{{seatNum}}</td>
    <td>{{screenType}}</td>
    <td>{{effect}}</td>
  </tr>
  {{/rows}}
</script>