<div class="modal fade" id="popup-tphall-bind" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">关联到标准影厅</h4>
      </div>
      <div class="modal-body">
        <form id="formSearchHall">
          <div class="row">
            <div class="form-group col-xs-6 col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">标准影厅名</div>
                <input type="text" class="form-control" id="bindHallName">
              </div>
            </div>
            <div class="form-group col-xs-6 col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">标准影院名</div>
                <input type="text" class="form-control" id="bindHallCinema">
              </div>
            </div>
            <div class="form-group col-xs-6 col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">城市</div>
                <input type="text" class="form-control" id="bindHallCity">
              </div>
            </div>
            <div class="form-group col-xs-6 col-sm-4 pull-right">
              <input type="submit" class="btn btn-primary btn-block" value="搜索">
            </div>
          </div>
        </form>
        <div class="table-responsive" style="max-height: 300px;">
          <table class="table table-bordered table-condensed table-hover" id="hallTable">
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
                <td colspan="8" align="center">请搜索要绑定的标准影厅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form id="formBindHall">
        <div class="modal-footer">
          <input type="hidden" id="hallId">
          <input type="hidden" id="tpHallId">
          <input type="hidden" id="tpStoreId">
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