<script id="pager-template" type="text/x-tmpl-mustache">
  <div class="col xs-12 col-sm-6 rowStatics">共 <span id="total">{{total}}</span> 条数据，当前显示 <span id="rowsSize">{{rowsSize}}</span> 条</div>
  {{#pageTotal}}
  <div class="col xs-12 col-sm-6">
    <nav>
      <ul class="pagination pagination-sm">
        <li><a href="#" class="prev"><span>&lt;</span></a></li>
        <li><span id="pageIndex">{{pageIndex}}</span> / <span id="pageTotal">{{pageTotal}}</span></li>
        <li><a href="#" class="next"><span>&gt;</span></a></li>
        <li><input type="number" name="pageNo" id="pageNo" pattern="[0-9]+"></li>
        <li><button type="button" class="btn" id="btn-pager">跳转</button></li>
      </ul>
    </nav>
  </div>
  {{/pageTotal}}
</script>