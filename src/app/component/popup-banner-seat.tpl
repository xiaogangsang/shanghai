<div class="modal fade" id="popup-banner-seat" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
  <input type="hidden" id="id" value="{{banner.id}}">
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
          <th>区域类型</th>
          <td>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="0"{{^banner.areaType}} checked{{/banner.areaType}} disabled><span>全国</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="1"{{#banner.areaType}} checked{{/banner.areaType}} disabled><span>区域</span></label></div>
          </td>
        </tr>
        <tr{{^banner.areaType}} style="display:none;"{{/banner.areaType}}>
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date" readonly> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date" readonly>
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
          <td><input type="text" class="form-control" id="position" value="{{banner.position}}" required data-parsley-pattern="^[1-9]{1}\d*$"></td>
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
  <input type="hidden" id="id" value="{{banner.id}}">
  <input type="hidden" id="bannerType" value="2">
  <input type="hidden" id="filmId" value="{{banner.filmId}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th>配置名称</th>
          <td><input type="text" class="form-control" id="bannerName" value="{{banner.bannerName}}" required></td>
        </tr>
        <tr>
          <th>影片</th>
          <td>{{banner.filmName}}</td>
        </tr>
        <tr>
          <th>区域类型</th>
          <td>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="0"{{^banner.areaType}} checked{{/banner.areaType}} disabled><span>全国</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="1"{{#banner.areaType}} checked{{/banner.areaType}} disabled><span>区域</span></label></div>
          </td>
        </tr>
        <tr{{^banner.areaType}} style="display:none;"{{/banner.areaType}}>
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date" readonly> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date" readonly>
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
          <td><input type="text" class="form-control" id="position" value="{{banner.position}}" required data-parsley-pattern="^[1-9]{1}\d*$"></td>
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

<script id="salling-template" type="text/x-tmpl-mustache">
  <input type="hidden" id="id" value="{{banner.id}}">
  <input type="hidden" id="bannerType" value="3">
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
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date" readonly> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date" readonly>
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
              <option value="3">交叉销售位</option>
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
            <select class="form-control" id="filmId" data-placeholder="选择一个影片" data-parsley-errors-container="#error-film">
              <option value=""></option>
              {{#movies}}
              <option value="{{filmId}}">{{filmName}}</option>
              {{/movies}}
            </select>
            <div id="error-film"></div>
          </td>
        </tr>
        <tr class="type-1 type-3">
          <th><button type="button" class="btn btn-default" id="btn-upload">上传图片</button></th>
          <td><input type="text" class="form-control" id="imageUrl" required></td>
        </tr>
        <tr class="type-1 type-3">
          <th>跳转链接</th>
          <td><input type="text" class="form-control" id="link" required></td>
        </tr>
        <tr class="type-1 type-2">
          <th>区域类型</th>
          <td>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="0" checked><span>全国</span></label></div>
            <div class="radio-inline"><label><input type="radio" name="areaType" value="1"><span>区域</span></label></div>
          </td>
        </tr>
        <tr style="display:none;">
          <th><button type="button" class="btn btn-default" id="btn-city">选择城市</button></th>
          <td>点击左侧按钮查看/选择城市</td>
        </tr>
        <tr>
          <th>生效日期</th>
          <td>
            <input type="text" class="form-control" style="display:inline-block;width:auto;" id="startTime" value="{{banner.startTime}}" size="10" required data-parsley-errors-container="#error-date" readonly> - <input type="text" class="form-control" style="display:inline-block;width:auto;" id="endTime" value="{{banner.endTime}}" size="10" required data-parsley-errors-container="#error-date" readonly>
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
        <tr class="type-1 type-2">
          <th>顺序</th>
          <td><input type="text" class="form-control" id="position" required data-parsley-pattern="^[1-9]{1}\d*$"></td>
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