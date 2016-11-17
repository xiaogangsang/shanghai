<div class="modal fade" id="popup-movie-tp-detail" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">合作方影片详情</h4>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>

<script id="detail-template" type="text/x-tmpl-mustache">
  <div class="movie-detail clearfix">
    <h2>{{filmName}}</h2>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>合作方影片ID：</span>{{sFilmId}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>上映日期：</span>{{releaseDate}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>影片制式：</span>{{dimen}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>影片时长：</span>{{duration}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>题材：</span>{{type}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>导演：</span>{{director}}
    </div>
    <div class="detail-item col-xs-12">
      <span>主演：</span>{{actor}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>一句话影评：</span>{{remark}}
    </div>
    <div class="detail-item col-xs-12">
      <span>剧情介绍：</span><br>{{description}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>海报：</span><img src="{{posterUrl}}" width="160" style="max-width:100%">
    </div>
  </div>
</script>