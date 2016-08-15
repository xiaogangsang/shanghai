<div class="modal fade" id="popup-hall-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑标准影厅</h4>
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
  <input type="hidden" id="hallId" value="{{hall.id}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="80">影厅名</th>
          <td><input type="text" class="form-control" id="hallName" value="{{hall.name}}" required></td>
        </tr>
        <tr>
          <th>所属影院</th>
          <td><input type="text" class="form-control" id="storeId" data-id="{{hall.storeId}}" value="【{{hall.storeId}}】{{hall.storeName}}" readonly required></td>
        </tr>
        <tr>
          <th>座位数</th>
          <td><input type="text" class="form-control" id="seatNum" value="{{hall.seatNum}}" required></td>
        </tr>
        <tr>
          <th>屏幕类型</th>
          <td>
            <select class="form-control" id="screenType" required data-parsley-errors-container="#error-screenType">
              <option value=""></option>
              {{#screenTypes}}
              <option value="{{id}}" {{#selected}}selected{{/selected}}>{{name}}</option>
              {{/screenTypes}}
            </select>
            <div id="error-screenType"></div>
          </td>
        </tr>
        <tr>
          <th>特效</th>
          <td>
            <select class="form-control" id="effect" required data-parsley-errors-container="#error-effect">
              <option value=""></option>
              {{#effectTypes}}
              <option value="{{id}}" {{#selected}}selected{{/selected}}>{{name}}</option>
              {{/effectTypes}}
            </select>
            <div id="error-effect"></div>
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
          <th width="80">影厅名</th>
          <td><input type="text" class="form-control" id="hallName" value="" required></td>
        </tr>
        <tr>
          <th>所属影院</th>
          <td><input type="text" class="form-control" id="storeId" value="" readonly required></td>
        </tr>
        <tr>
          <th>座位数</th>
          <td><input type="text" class="form-control" id="seatNum" value="" required></td>
        </tr>
        <tr>
          <th>屏幕类型</th>
          <td>
            <select class="form-control" id="screenType" required data-parsley-errors-container="#error-screenType">
              <option value=""></option>
              {{#screenTypes}}
              <option value="{{id}}">{{name}}</option>
              {{/screenTypes}}
            </select>
            <div id="error-screenType"></div>
          </td>
        </tr>
        <tr>
          <th>特效</th>
          <td>
            <select class="form-control" id="effect" required data-parsley-errors-container="#error-effect">
              <option value=""></option>
              {{#effectTypes}}
              <option value="{{id}}">{{name}}</option>
              {{/effectTypes}}
            </select>
            <div id="error-effect"></div>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>