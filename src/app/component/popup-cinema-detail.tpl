<div class="modal fade" id="popup-cinema-detail">
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
  <div class="cinema-detail clearfix">
    <h2>{{name}}</h2>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>院线：</span>{{brandName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>关联影院数量：</span>{{associationNum}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>省：</span>{{provinceName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>城市：</span>{{cityName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>行政区：</span>{{areaName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>商圈：</span>{{districtName}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>地址：</span>{{address}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>电话：</span>{{tel}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>经度：</span>{{longitude}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>维度：</span>{{latitude}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <span>创建时间：</span>{{createDate}}
    </div>
    <div class="detail-item col-xs-12 col-sm-6">
      <table>
        <tr>
          <td><span>影院服务：</span></td>
          <td>
            {{#service}}
            <p>{{serviceTypeName}}：{{serviceContent}}</p>
            {{/service}}
          </td>
        </tr>
      </table>
    </div>
  </div>
</script>