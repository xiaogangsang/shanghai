<div class="modal fade" id="popup-unit-budget">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header"><h4 class="modal-title">活动预算</h4></div>

      <form>

        <div class="modal-body">
          <div class="row">
            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总金额预算</div>
                <input type="number" class="form-control" id="totalAmount" required>
              </div>
            </div>
            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总出票预算</div>
                <input type="number" class="form-control" id="totalTicket" required>
              </div>
            </div>
          </div>
          <div class="table-responsive" id="dailyBudgetTable">
            <table class="table">
              <thead>
                <tr>
                  <th>开始日期</th>
                  <th>结束日期</th>
                  <th>日金额预算</th>
                  <th>日出票预算</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <button type="button" class="btn btn-default" id="btn-daily" style="margin-bottom: 15px;">添加日预算</button>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>

      </form>

    </div>
  </div>
</div>

<script id="daily-template" type="text/x-tmpl-mustache">
  <tr>
    <td><input type="text" class="form-control startDate" required></td>
    <td><input type="text" class="form-control endDate" required></td>
    <td><input type="number" class="form-control dailyAmount" required></td>
    <td><input type="number" class="form-control dailyTicket" required></td>
    <td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td>
  </tr>
</script>