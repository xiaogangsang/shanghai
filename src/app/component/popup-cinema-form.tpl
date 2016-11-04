<div class="modal fade" id="popup-cinema-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑标准影院</h4>
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
  <input type="hidden" id="cinemaId" value="{{cinema.id}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="80">影院名</th>
          <td><input type="text" class="form-control" id="cinemaName" value="{{cinema.name}}" required></td>
        </tr>
        <tr>
          <th width="80">评分</th>
          <td><input type="text" class="form-control" id="cinemaScore" value="{{cinema.score}}" required data-parsley-pattern="10|^\d{1}$|^\d{1}.{1}\d{1}$"></td>
        </tr>
        <tr>
          <th>院线</th>
          <td>
            <select class="form-control" id="brandId" required data-parsley-errors-container="#error-brand">
              <option value=""></option>
              {{#brands}}
              <option value="{{id}}"{{#selected}} selected{{/selected}}>{{name}}</option>
              {{/brands}}
            </select>
            <div id="error-brand"></div>
          </td>
        </tr>
        <tr>
          <th>省份</th>
          <td>
            <select class="form-control" id="provinceId" required data-parsley-errors-container="#error-province">
              {{#provinces}}
              <option value="{{provinceId}}"{{#selected}} selected{{/selected}}>{{provinceName}}</option>
              {{/provinces}}
            </select>
            <div id="error-province"></div>
          </td>
        </tr>
        <tr>
          <th>城市</th>
          <td>
            <select class="form-control" id="cityId" required data-parsley-errors-container="#error-city">
              {{#cities}}
              <option value="{{cityId}}"{{#selected}} selected{{/selected}}>{{cityName}}</option>
              {{/cities}}
            </select>
            <div id="error-city"></div>
          </td>
        </tr>
        <tr>
          <th>行政区</th>
          <td>
            <select class="form-control" id="areaId" required data-parsley-errors-container="#error-area"></select>
            <div id="error-area"></div>
          </td>
        </tr>
        <tr>
          <th>商圈</th>
          <td>
            <select class="form-control" id="districtId" required data-parsley-errors-container="#error-district"></select>
            <div id="error-district"></div>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td><input type="text" class="form-control" id="address" value="{{cinema.address}}" required></td>
        </tr>
        <tr>
          <th>电话</th>
          <td><input type="text" class="form-control" id="tel" value="{{cinema.tel}}" required></td>
        </tr>
        <tr>
          <th>经度</th>
          <td><input type="text" class="form-control" id="longitude" value="{{cinema.longitude}}" required></td>
        </tr>
        <tr>
          <th>维度</th>
          <td><input type="text" class="form-control" id="latitude" value="{{cinema.latitude}}" required></td>
        </tr>
        <tr>
          <th>影院服务</th>
          <td>
            {{#services}}
            {{#selected}}
            <div class="edit-section service-item" data-id="{{id}}">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">服务类型</div>
                  <div class="input-group-addon">{{name}}</div>
                  <button type="button" class="btn btn-xs btn-primary pull-right btn-service-delete">删除</button>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-addon">服务详细</div>
                  <textarea class="form-control" required>{{content}}</textarea>
                </div>
              </div>
            </div>
            {{/selected}}
            {{/services}}
            <select class="btn btn-default" id="btn-service">
              <option value="">添加一项服务</option>
              {{#services}}
              {{^selected}}<option value="{{id}}">{{name}}</option>{{/selected}}
              {{/services}}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>

<script id="create-template" type="text/x-tmpl-mustache">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="80">影院名</th>
          <td><input type="text" class="form-control" id="cinemaName" required></td>
        </tr>
        <tr>
          <th width="80">评分</th>
          <td><input type="text" class="form-control" id="cinemaScore" required data-parsley-pattern="10|^\d{1}$|^\d{1}.{1}\d{1}$"></td>
        </tr>
        <tr>
          <th>院线</th>
          <td>
            <select class="form-control" id="brandId" required data-parsley-errors-container="#error-brand">
              <option value=""></option>
              {{#brands}}
              <option value="{{id}}">{{name}}</option>
              {{/brands}}
            </select>
            <div id="error-brand"></div>
          </td>
        </tr>
        <tr>
          <th>省份</th>
          <td>
            <select class="form-control" id="provinceId" required data-parsley-errors-container="#error-province">
              <option value=""></option>
              {{#provinces}}
              <option value="{{provinceId}}">{{provinceName}}</option>
              {{/provinces}}
            </select>
            <div id="error-province"></div>
          </td>
        </tr>
        <tr>
          <th>城市</th>
          <td>
            <select class="form-control" id="cityId" required data-parsley-errors-container="#error-city">
              <option value=""></option>
            </select>
            <div id="error-city"></div>
          </td>
        </tr>
        <tr>
          <th>行政区</th>
          <td>
            <select class="form-control" id="areaId" required data-parsley-errors-container="#error-area">
              <option value=""></option>
            </select>
            <div id="error-area"></div>
          </td>
        </tr>
        <tr>
          <th>商圈</th>
          <td>
            <select class="form-control" id="districtId" required data-parsley-errors-container="#error-district">
              <option value=""></option>
            </select>
            <div id="error-district"></div>
          </td>
        </tr>
        <tr>
          <th>地址</th>
          <td><input type="text" class="form-control" id="address" required></td>
        </tr>
        <tr>
          <th>电话</th>
          <td><input type="text" class="form-control" id="tel" required></td>
        </tr>
        <tr>
          <th>经度</th>
          <td><input type="text" class="form-control" id="longitude" required></td>
        </tr>
        <tr>
          <th>维度</th>
          <td><input type="text" class="form-control" id="latitude" required></td>
        </tr>
        <tr>
          <th>影院服务</th>
          <td>
            <select class="btn btn-default" id="btn-service">
              <option value="">添加一项服务</option>
              {{#services}}
              <option value="{{id}}">{{name}}</option>
              {{/services}}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>

<script id="service-template" type="text/x-tmpl-mustache">
  {{#service}}
  <div class="edit-section service-item" data-id="{{id}}">
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">服务类型</div>
        {{name}}<button type="button" class="btn btn-xs btn-primary pull-right btn-service-delete">删除</button>
      </div>
    </div>
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-addon">服务详细</div>
        <textarea class="form-control" required></textarea>
      </div>
    </div>
  </div>
  {{/service}}
</script>