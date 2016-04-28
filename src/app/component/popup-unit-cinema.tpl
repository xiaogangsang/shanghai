<div class="modal fade" id="popup-unit-cinema">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header"><h4 class="modal-title">影院限制</h4></div>

        <div class="modal-body">

          <table class="table">
            <tbody>
              <tr>
                <td width="45%" style="vertical-align: top;">
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-4">
                      <select class="form-control" id="search-cinema-brandId">
                        <option value="">选择院线</option>
                      </select>
                    </div>
                    <div class="col-xs-4">
                      <select class="form-control" id="search-cinema-provinceId">
                        <option value="">省</option>
                      </select>
                    </div>
                    <div class="col-xs-4">
                      <select class="form-control" id="search-cinema-cityId">
                        <option value="">城市</option>
                      </select>
                    </div>
                  </div>
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-8">
                      <input type="text" class="form-control" placeholder="输入影院名称" id="search-cinema-cinemaName">
                    </div>
                    <div class="col-xs-4">
                      <button type="button" class="btn btn-block btn-default" id="btn-search-cinema">搜索影院</button>
                    </div>
                  </div>
                  <div class="table-responsive" style="max-height: 300px;">
                    <table class="table table-bordered table-hover" id="search-cinema-candidate" style="margin-bottom: 0;">
                      <thead>
                        <tr>
                          <th>影院</th>
                          <th>城市</th>
                          <th>院线</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </td>
                <td width="100">
                  <button type="button" class="btn btn-block btn-default" id="search-cinema-add-all">添加全部</button>
                  <br>
                  <button type="button" class="btn btn-block btn-default" id="search-cinema-add">添加选中</button>
                  <br>
                  <button type="button" class="btn btn-block btn-default" id="search-cinema-remove">移除选中</button>
                  <br>
                  <button type="button" class="btn btn-block btn-default" id="search-cinema-remove-all">移除全部</button>
                </td>
                <td style="vertical-align: top;">
                  <h5>已选择影院（<span id="choosedCount">0</span>个）</h5>
                  <div class="row" style="margin-bottom: 5px;">
                    <div class="col-xs-8"><input type="text" class="form-control" id="input-cinema-filter" placeholder="输入关键字快速筛选"></div>
                    <div class="col-xs-4"><button type="button" class="btn btn-block btn-default" id="btn-cinema-filter">清除筛选</button></div>
                  </div>
                  <div class="table-responsive" style="max-height: 300px;">
                    <table class="table table-bordered" id="search-cinema-choosed" style="margin-bottom: 0;">
                      <thead>
                        <tr>
                          <th>影院</th>
                          <th>城市</th>
                          <th>院线</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
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