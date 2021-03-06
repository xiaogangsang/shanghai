<div class="modal fade" id="popup-unit-budget" data-keyboard="false" data-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">活动预算</h4>
      </div>

      <form>

        <div class="modal-body">
          <div class="row">
            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总金额预算</div>
                <input type="text" class="form-control" id="totalAmount" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
              </div>
            </div>
            <div class="form-group col-sm-6">
              <div class="input-group">
                <div class="input-group-addon">总出票预算</div>
                <input type="text" class="form-control" id="totalTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$">
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
    <td><input type="text" class="form-control startDate" required readonly placeholder="YYYY-MM-DD"></td>
    <td><input type="text" class="form-control endDate" required readonly placeholder="YYYY-MM-DD"></td>
    <td><input type="text" class="form-control dailyAmount" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$"></td>
    <td><input type="text" class="form-control dailyTicket" placeholder="不限" data-parsley-pattern="^[1-9]{1}\d*$"></td>
    <td><button type="button" class="btn btn-xs btn-primary btn-delete">删除</button></td>
  </tr>
</script>