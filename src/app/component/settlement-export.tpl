<div class="table-responsive" style="margin-bottom: 20px;">
  <table class="table table-hover" id="dataTable">
    <thead>
      <tr>
        <th>申请导出时间</th>
        <th>文件生成时间</th>
        <th>数据类型</th>
        <th>数据时间范围</th>
        <th>文件状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
      </tr>
    </tbody>
  </table>
</div>

<script id="table-template" type="text/x-tmpl-mustache">
  {{#rows}}
  <tr data-id="{{id}}" data-bannertype="{{bannerType}}">
    <td>{{createTime}}</td>
    <td>{{updateTime}}</td>
    <td>{{fileType}}</td>
    <td>{{period}}</td>
    <td>{{fileStatus}}</td>
    <td>{{#canDownload}}<a class="download" data-url="{{fileUrl}}">下载</a>{{/canDownload}}</td>
  </tr>
  {{/rows}}
</script>
