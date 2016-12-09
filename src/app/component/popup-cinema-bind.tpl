<div class="modal fade" id="popup-cinema-bind" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">关联 [<span id="bindTpCinema"></span>]</h4>
      </div>
      <div class="modal-body">
        <form id="formSearchCinema">
          <h4>搜索标准影院：</h4>
          <div class="row">
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">影院名</div>
                <input type="text" class="form-control" id="filter_cinemaName">
              </div>
            </div>
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">院线</div>
                <select class="form-control" id="filter_brandId">
                  <option value="">全部</option>
                </select>
              </div>
            </div>
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">城市</div>
                <select class="form-control" id="filter_cityId">
                  <option value="">全部</option>
                </select>
              </div>
            </div>
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">电话</div>
                <input type="text" class="form-control" id="filter_tel">
              </div>
            </div>
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">经度</div>
                <input type="text" class="form-control" id="filter_longitude">
              </div>
            </div>
            <div class="form-group col-sm-4">
              <div class="input-group">
                <div class="input-group-addon">纬度</div>
                <input type="text" class="form-control" id="filter_latitude">
              </div>
            </div>
            <div class="form-group col-sm-10">
              <div class="input-group">
                <div class="input-group-addon">地址</div>
                <input type="text" class="form-control" id="filter_address">
              </div>
            </div>
            <div class="form-group col-sm-2">
              <button type="submit" class="btn btn-block btn-primary">搜素</button>
            </div>
          </div>
        </form>

        <hr>

        <div class="table-responsive" style="max-height: 300px;">
          <table class="table table-bordered table-condensed table-hover" id="cinemaTable">
            <thead>
              <tr>
                <th width="60">ID</th>
                <th>标准影院名</th>
                <th>地址</th>
                <th width="80">城市</th>
                <th>电话号码</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="5" align="center">点击搜索</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <form id="formBindCinema">
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
  <tr data-id="{{id}}">
    <td>{{id}}</td>
    <td>{{name}}</td>
    <td>{{address}}</td>
    <td>{{cityName}}</td>
    <td>{{tel}}</td>
  </tr>
  {{/rows}}
</script>