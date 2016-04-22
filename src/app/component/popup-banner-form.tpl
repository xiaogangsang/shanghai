<div class="modal fade" id="popup-banner-form">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">编辑</h4>
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

<script id="index-template" type="text/x-tmpl-mustache">
  <input type="hidden" id="configId" value="{{banner.configId}}">
  <input type="hidden" id="infoId" value="{{banner.infoId}}">
  <input type="hidden" id="bannerType" value="1">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th>配置名称</th>
          <td><input type="text" class="form-control" id="bannerName" value="{{banner.bannerName}}" required></td>
        </tr>
        <tr>
          <th><button type="button" class="btn btn-default" id="btn-upload">上传图片</button></th>
          <td><input type="text" class="form-control" id="imageUrl" value="{{banner.imageUrl}}" required></td>
        </tr>
        <tr>
          <th>跳转链接</th>
          <td><input type="text" class="form-control" id="link" value="{{banner.link}}" required></td>
        </tr>
        <tr>
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date"> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date">
            <div id="error-date"></div>
          </td>
        </tr>
        <tr>
          <th>渠道</th>
          <td>
            <select class="form-control" id="channelId">
              {{#channels}}
              <option value="{{channelId}}"{{#selected}} selected{{/selected}}>{{channelName}}</option>
              {{/channels}}
            </select>
          </td>
        </tr>
        <tr>
          <th>展示顺序</th>
          <td><input type="number" class="form-control" id="position" value="{{banner.position}}" required></td>
        </tr>
        <tr>
          <th>是否显示</th>
          <td>
            <select class="form-control" id="status">
              <option value="1"{{#banner.status}} selected{{/banner.status}}>是</option>
              <option value="0"{{^banner.status}} selected{{/banner.status}}>否</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>

<script id="movie-template" type="text/x-tmpl-mustache">
  <input type="hidden" id="configId" value="{{banner.configId}}">
  <input type="hidden" id="infoId" value="{{banner.infoId}}">
  <input type="hidden" id="bannerType" value="2">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th>配置名称</th>
          <td><input type="text" class="form-control" id="bannerName" required></td>
        </tr>
        <tr>
          <th>影片</th>
          <td>{{filmName}}</td>
        </tr>
        <tr>
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date"> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date">
            <div id="error-date"></div>
          </td>
        </tr>
        <tr>
          <th>渠道</th>
          <td>
            <select class="form-control" id="channelId">
              {{#channels}}
              <option value="{{channelId}}"{{#selected}} selected{{/selected}}>{{channelName}}</option>
              {{/channels}}
            </select>
          </td>
        </tr>
        <tr>
          <th>展示顺序</th>
          <td><input type="number" class="form-control" id="position" value="{{banner.position}}" required></td>
        </tr>
        <tr>
          <th>是否显示</th>
          <td>
            <select class="form-control" id="status">
              <option value="1"{{#banner.status}} selected{{/banner.status}}>是</option>
              <option value="0"{{^banner.status}} selected{{/banner.status}}>否</option>
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
          <th width="80">配置类型</th>
          <td>
            <select class="form-control" id="bannerType">
              <option value="1">首页</option>
              <option value="2">热门影片</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>配置名称</th>
          <td><input type="text" class="form-control" id="bannerName" required></td>
        </tr>
        <tr class="type-2" style="display:none;">
          <th>影片</th>
          <td>
            <select class="form-control" id="filmId">
              <option value=""></option>
              {{#movies}}
              <option value="{{filmId}}">{{filmName}}</option>
              {{/movies}}
            </select>
          </td>
        </tr>
        <tr class="type-1">
          <th><button type="button" class="btn btn-default" id="btn-upload">上传图片</button></th>
          <td><input type="text" class="form-control" id="imageUrl" required></td>
        </tr>
        <tr class="type-1">
          <th>跳转链接</th>
          <td><input type="text" class="form-control" id="link" required></td>
        </tr>
        <tr>
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date"> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date">
            <div id="error-date"></div>
          </td>
        </tr>
        <tr>
          <th>渠道</th>
          <td>
            <select class="form-control" id="channelId">
              {{#channels}}
              <option value="{{channelId}}">{{channelName}}</option>
              {{/channels}}
            </select>
          </td>
        </tr>
        <tr>
          <th>顺序</th>
          <td><input type="number" class="form-control" id="position" required></td>
        </tr>
        <tr>
          <th>是否显示</th>
          <td>
            <select class="form-control" id="status">
              <option value="1">是</option>
              <option value="0">否</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>