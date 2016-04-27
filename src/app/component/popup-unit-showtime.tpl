<div class="modal fade" id="popup-unit-showtime">
  <div class="modal-dialog">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">场次限制</h4>
        </div>

        <div class="modal-body">

          <div class="table-responsive" id="showtimeTable">
            <table class="table">
              <thead>
                <tr>
                  <th>开始日期</th>
                  <th>结束日期</th>
                  <th>每日开始时间</th>
                  <th>每日结束时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <button type="button" class="btn btn-default" id="btn-showtime" style="margin-bottom: 15px;">添加场次</button>

        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="showtime-template" type="text/x-tmpl-mustache">
  <tr>
    <td><input type="text" class="form-control startDate" required></td>
    <td><input type="text" class="form-control endDate" required></td>
    <td><input type="number" class="form-control beginTime" required></td>
    <td><input type="number" class="form-control endTime" required></td>
    <td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td>
  </tr>
</script>