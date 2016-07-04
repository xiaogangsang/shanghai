<div class="modal fade" id="popup-movie-form" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">编辑标准影片</h4>
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
  <input type="hidden" id="id" value="{{movie.id}}">
  <div class="table-responsive">
    <table class="table">
      <tbody>
        <tr>
          <th width="100">影片名称</th>
          <td><input type="text" class="form-control" id="name" value="{{movie.name}}" required></td>
          <th>上映日期</th>
          <td><input type="text" class="form-control" id="showDate" value="{{movie.showDate}}" required></td>
        </tr>
        <tr>
          <th>上映状态</th>
          <td>
            <select class="form-control" id="status" required>
              {{#status}}
              <option value="{{id}}"{{#selected}} selected{{/selected}}>{{name}}</option>
              {{/status}}
            </select>
          </td>
          <th>制片方</th>
          <td><input type="text" class="form-control" id="produceCorp" value="{{movie.produceCorp}}" required></td>
        </tr>
        <tr>
          <th>时长</th>
          <td><input type="text" class="form-control" id="duration" value="{{movie.duration}}" required></td>
          <th>国家</th>
          <td><input type="text" class="form-control" id="area" value="{{movie.area}}" required></td>
        </tr>
        <tr>
          <th>题材</th>
          <td>{{movie.theme}}</td>
          <th>导演</th>
          <td><input type="text" class="form-control" id="director" value="{{movie.director}}" required></td>
        </tr>
        <tr>
          <th>评分</th>
          <td colspan="3"><input type="text" class="form-control" id="score" value="{{movie.score}}" required></td>
        </tr>
        <tr>
          <th>主演</th>
          <td colspan="3"><input type="text" class="form-control" id="actor" value="{{movie.actor}}" required></td>
        </tr>
        <tr>
          <th>影片制式</th>
          <td colspan="3">
            {{#versions}}
            <div class="checkbox-inline"><label><input type="checkbox" name="dimenId" value="{{id}}"{{#selected}} checked{{/selected}}><span>{{name}}</span></label></div>
            {{/versions}}
          </td>
        </tr>
        <tr>
          <th>一句话影评</th>
          <td colspan="3"><input type="text" class="form-control" maxlength="20" id="summary" value="{{movie.summary}}" required></td>
        </tr>
        <tr>
          <th>剧情介绍</th>
          <td colspan="3"><textarea class="form-control" id="description" required>{{movie.description}}</textarea></td>
        </tr>
        <tr>
          <th>海报</th>
          <td colspan="3">
            <input type="text" class="form-control" id="poster" value="{{movie.poster}}">
            <button type="button" class="btn btn-xs btn-default" id="btn-upload">上传图片</button> <span>图片大小不超过100k</span>
            <img class="poster-preview" src="{{movie.poster}}" width="160" style="display: block;">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</script>