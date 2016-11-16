<div class="modal fade" id="popup-movie-detail" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h4 class="modal-title">标准影片详情</h4>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>

<script id="detail-template" type="text/x-tmpl-mustache">
  <div class="movie-detail clearfix">
    <h2>{{name}}</h2>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>上映日期：</span>{{showDate}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>上映状态：</span>{{statusName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>影片制式：</span>{{dimen}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>影片时长：</span>{{duration}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>题材：</span>{{theme}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>国家：</span>{{area}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>制片方：</span>{{produceCorp}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>导演：</span>{{director}}
    </div>
    <div class="detail-item col-xs-12">
      <span>主演：</span>{{actor}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>一句话影评：</span>{{summary}}
    </div>
    <div class="detail-item col-xs-12">
      <span>剧情介绍：</span><br>{{description}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>海报：</span><img src="{{poster}}" width="160" style="max-width:100%">
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>关联合作方影片数：</span>{{associationFilmsNum}}
    </div>
  </div>
</script>