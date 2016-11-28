<div class="modal fade" id="popup-movie-creat-tp" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">新建并关联 【<span id="sbindTpMovie"></span>】</h4>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">

          <button type="submit" class="btn btn-save" style=" background-color: #ff8903;border: 1px solid #ff8903;color: #fff;">保存</button>
          <!-- <button type="submit" class="btn btn-primary">保存</button> -->
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
          <td><input type="text" class="form-control" id="name" value="{{filmName}}" required></td>
          <th>上映日期</th>
          <!-- <td><input type="text" class="form-control" id="showDate" value="{{releaseDate}}" required></td> -->
         <!--  <td><input type="text" class="form-control" id="releaseYear" value="{{year}}" size="4" maxlength="4" required> 年 <input type="text" class="form-control" id="releaseMonth" value="{{month}}" size="2" maxlength="2"> 月 <input type="text" class="form-control" id="releaseDay" value="{{day}}"  size="2" maxlength="2"> 日 </td> -->

          <td class="release-date">
          <!-- <div class="row" > -->
           <input type="text" class="form-control" id="releaseYear" value="{{year}}" size="4" maxlength="4" required style="width: 64px; display: inline-block;" > 年 <input type="text" class="form-control" id="releaseMonth" value="{{month}}" size="2" maxlength="2" style="width: 54px;    display: inline-block;"> 月 <input type="text" class="form-control" id="releaseDay" value="{{day}}"  size="2" maxlength="2" style="width: 54px;    display: inline-block;"> 日 
          <!-- </div> -->
         </td>

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
          <td><input type="text" class="form-control" id="duration" value="{{duration}}" required></td>
          <th>国家</th>
          <td><input type="text" class="form-control" id="area" value="{{area}}" required></td>
        </tr>
        <tr>
          <th>题材</th>
          <td><input type="text" class="form-control" id="type" value="{{type}}" required></td>
          <th>导演</th>
          <td><input type="text" class="form-control" id="director" value="{{director}}" required></td>
        </tr>
        <tr>
          <th>评分</th>
          <td colspan="3"><input type="text" class="form-control" id="score" value="{{score}}" required data-parsley-pattern="10|^\d{1}$|^\d{1}.{1}\d{1}$"></td>
        </tr>
        <tr>
          <th>主演</th>
          <td colspan="3"><input type="text" class="form-control" id="actor" value="{{actor}}" required></td>
        </tr>
        <tr>
          <th>影片制式</th>
          <td colspan="3">
            <label class="checkbox-inline">
                <input type="checkbox" id="inlineCheckbox1" value="2D"> 2D
            </label>
            <label class="checkbox-inline">
                <input type="checkbox" id="inlineCheckbox2" value="3D"> 3D
            </label>
               
          </td>
        </tr>
        <tr>
          <th>一句话影评</th>
          <td colspan="3"><input type="text" class="form-control" maxlength="20" id="summary" value="{{remark}}" required></td>
        </tr>
        <tr>
          <th>剧情介绍</th>
          <td colspan="3"><textarea class="form-control" id="description" required>{{description}}</textarea></td>
        </tr>
        <tr>
         <!--  <th>海报</th>
          <td colspan="3">
            <img class="poster-preview" src="{{posterUrl}}" width="160" style="display: block;">
            <input type="text" class="form-control" id="poster" value="{{posterUrl}}">
            <button type="button" class="btn btn-xs btn-default" id="tpBtn-upload">上传图片</button> <span>图片大小不超过100k</span>
            
          </td> -->

           <th>海报</th>
          <td colspan="3">
            <img class="poster-preview" src="{{posterUrl}}" width="150">
            <input type="text" class="form-control" id="poster" value="{{posterUrl}}">
            <div class="btn btn-default" id="fileupload">上传海报图</div>
          </td>
        </tr>
        <tr>
          <input type="hidden" id="sourceId" value="{{sourceId}}">
          <input type="hidden" id="sFilmId" value="{{thirdPartyFilmId}}">
          <input type="hidden" id="filmId" value="{{filmId}}">
        </tr>
      </tbody>
    </table>
  </div>
</script>