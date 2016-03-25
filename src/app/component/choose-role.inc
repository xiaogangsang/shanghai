<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">选择角色</h4>
      </div>

      <div class="modal-body">

        <div class="role-selection row">
          <div class="col-xs-12 col-sm-5">
            <select name="from[]" id="multiselect" class="form-control" size="8" multiple="multiple">
              <option value="1">Item 1</option>
              <option value="3">Item 3</option>
              <option value="2">Item 2</option>
              <option value="4">Item 4</option>
              <option value="5">Item 5</option>
              <option value="6">Item 6</option>
              <option value="7">Item 7</option>
              <option value="8">Item 8</option>
              <option value="9">Item 9</option>
              <option value="10">Item 10</option>
              <option value="11">Item 11</option>
              <option value="12">Item 12</option>
            </select>
          </div>
          <div class="col-xs-12 col-sm-2">
            <button type="button" id="multiselect_rightAll" class="btn btn-default">全选</button>
            <button type="button" id="multiselect_rightSelected" class="btn btn-default">添加</button>
            <button type="button" id="multiselect_leftSelected" class="btn btn-default">移除</button>
            <button type="button" id="multiselect_leftAll" class="btn btn-default">反选</button>
          </div>
          <div class="col-xs-12 col-sm-5">
            <select name="to[]" id="multiselect_to" class="form-control" size="8" multiple="multiple"></select>
          </div>
        </div>

      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-primary">保存</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>

    </div>
  </div>
</div>