<div class="modal fade" id="popup-unit-cinema">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header"><h4 class="modal-title">影院限制</h4></div>

        <div class="modal-body">

          <table class="table">
            <tbody>
              <tr>
                <td width="45%" valign="top">
                <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-4">
                      <select name="" class="form-control">
                        <option value="">选择院线</option>
                      </select>
                    </div>
                    <div class="col-xs-4">
                      <select name="" class="form-control">
                        <option value="">省</option>
                      </select>
                    </div>
                    <div class="col-xs-4">
                      <select name="" class="form-control">
                        <option value="">城市</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-8">
                      <input type="text" class="form-control" placeholder="输入影院名称">
                    </div>
                    <div class="col-xs-4">
                      <button type="button" class="btn btn-block btn-default">搜索影院</button>
                    </div>
                  </div>
                  <div class="table-responsive" style="max-height: 300px;">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>影院</th>
                          <th>城市</th>
                          <th>院线</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>上海影城SFC新华路店</td>
                          <td>上海</td>
                          <td>中影</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
                <td width="100">
                  <button type="button" class="btn btn-block btn-default">添加选中 &raquo;</button>
                  <br>
                  <button type="button" class="btn btn-block btn-default">&laquo; 移除选中</button>
                </td>
                <td valign="top">
                  <h5>已选择影院（X个）</h5>
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-9"><input type="text" class="form-control"></div>
                    <div class="col-xs-3"><button type="button" class="btn btn-block btn-default">筛选</button></div>
                  </div>
                  <div class="table-responsive" style="max-height: 300px;">
                    <table class="table table-bordered multi-check">
                      <thead>
                        <tr>
                          <th><input type="checkbox" class="multi-check-all"></th>
                          <th>影院</th>
                          <th>城市</th>
                          <th>院线</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><input type="checkbox"></td>
                          <td>上海影城SFC新华路店</td>
                          <td>上海</td>
                          <td>中影</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>