<div class="modal fade" id="popup-movie-detail">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">标准影院详情</h4>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>

<script id="detail-template" type="text/x-tmpl-mustache">
  <div class="movie-detail clearfix">
    <div class="col-xs-12 col-sm-6">
      <table>
        <tr>
          <td>影片名：</td>
          <td>{{name}}</td>
        </tr>
        <tr>
          <td>制片方：</td>
          <td>{{produceCorp}}</td>
        </tr>
        <tr>
          <td>上映日期：</td>
          <td>{{showDate}}</td>
        </tr>
        <tr>
          <td>上映状态：</td>
          <td>{{statusName}}</td>
        </tr>
        <tr>
          <td>导演：</td>
          <td>{{director}}</td>
        </tr>
        <tr>
          <td>主演：</td>
          <td>{{actor}}</td>
        </tr>
        <tr>
          <td>海报：</td>
          <td><img src="{{poster}}" width="160" style="max-width:100%"></td>
        </tr>
      </table>
    </div>
    <div class="col-xs-12 col-sm-6">
      <table>
        <tr>
          <td>影片制式：</td>
          <td>{{dimenName}}</td>
        </tr>
        <tr>
          <td>影片时长：</td>
          <td>{duration}}分钟</td>
        </tr>
        <tr>
          <td>题材：</td>
          <td>{{theme}}</td>
        </tr>
        <tr>
          <td>国家：</td>
          <td>{{area}}</td>
        </tr>
        <tr>
          <td>剧情介绍：</td>
          <td>{{description}}</td>
        </tr>
        <tr>
          <td>一句话影评：</td>
          <td>{{summary}}</td>
        </tr>
        <tr>
          <td>关联合作方影片数：</td>
          <td>{{associationFilmsNum}}</td>
        </tr>
      </table>
    </div>
  </div>
</script>