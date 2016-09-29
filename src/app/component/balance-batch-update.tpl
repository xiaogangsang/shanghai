<script id="file-upload-template" type="text/x-tmpl-mustache">
  <div class="content-area col-xs-4 col-xs-offset-4">
    <div class="row file-upload-container" style="margin: 12px 0px;">
      <div class="input-group">
        <span class="input-group-addon">数据文件</span>
        <input type="text" class="form-control" readonly>
        <span class="input-group-btn">
          <span class="btn btn-default btn-file">
            <span>选择文件</span>
            <input class="file-upload" type="file" name="file">
          </span>
        </span>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <button type="button" class="btn btn-block btn-default btn-upload">确定上传</button>
      </div>
      <div class="col-xs-12" style="font-size: 13px; margin-top: 15px">* 仅支持 <em>.xls</em> 和 <em>.xlsx</em> 格式. 最大支持1MB.</div>
    </div>
  </div>
</script>