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
          <td class="release-date"><input type="text" class="form-control" id="releaseYear" value="{{movie.releaseYear}}" size="4" maxlength="4"> 年 <input type="text" class="form-control" id="releaseMonth" value="{{movie.releaseMonth}}" size="2" maxlength="2"> 月 <input type="text" class="form-control" id="releaseDay" value="{{movie.releaseDay}}"  size="2" maxlength="2"> 日 </td>
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
          <td><input type="text" class="form-control" id="produceCorp" value="{{movie.produceCorp}}"></td>
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
          <td colspan="3"><input type="text" class="form-control" id="score" value="{{movie.score}}" required data-parsley-pattern="10|^\d{1}$|^\d{1}.{1}\d{1}$"></td>
        </tr>
        <tr>
          <th>主演</th>
          <td colspan="3"><input type="text" class="form-control" id="actor" value="{{movie.actor}}" required></td>
        </tr>
        <tr>
          <th>影片制式</th>
          <td colspan="3">
            {{#dimens}}
            <div class="checkbox-inline"><label><input type="checkbox" name="dimen" value="{{name}}"{{#selected}} checked{{/selected}}><span>{{name}}</span></label></div>
            {{/dimens}}
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
            <img class="poster-preview" src="{{movie.preview}}" width="150">
            <input type="text" class="form-control poster" id="poster" value="{{movie.poster}}">
            <div class="btn btn-default fileupload">上传海报图</div>
          </td>
        </tr>
        <tr>
          <th>购票后分享1</th>
          <td colspan="3">
            <div class="form-group">
              <img class="poster-preview" src="{{movie.previewAfterBought[0]}}" width="150">
              <div class="input-group">
                <div class="input-group-addon fileupload">上传海报图</div>
                <input type="text" class="form-control poster" name="poster-after-bought" value="{{movie.posterAfterBought[0]}}" readonly>
                <div class="input-group-addon">删除</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>购票后分享2</th>
          <td colspan="3">
            <div class="form-group">
              <img class="poster-preview" src="{{movie.previewAfterBought[1]}}" width="150">
              <div class="input-group">
                <div class="input-group-addon fileupload">上传海报图</div>
                <input type="text" class="form-control poster" name="poster-after-bought" value="{{movie.posterAfterBought[1]}}" readonly>
                <div class="input-group-addon">删除</div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th>购票后分享3</th>
          <td colspan="3">
            <div class="form-group">
              <img class="poster-preview" src="{{movie.previewAfterBought[2]}}" width="150">
              <div class="input-group">
                <div class="input-group-addon fileupload">上传海报图</div>
                <input type="text" class="form-control poster" name="poster-after-bought" value="{{movie.posterAfterBought[2]}}" readonly>
                <div class="input-group-addon">删除</div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <style type="text/css">
    #popup-movie-form .input-group-addon {
      border: 1px solid #ff8903;
      color: #ff8903;
      border-radius: 4px;
      padding: 6px 12px;
    }

    #popup-movie-form .input-group {
      width: 100%;
    }

    #popup-movie-form .input-group-addon:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    #popup-movie-form .input-group-addon:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    #popup-movie-form input[readonly] {
      border: 1px solid #dedede;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    }
  </style>
</script>