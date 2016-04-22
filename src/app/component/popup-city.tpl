<style>
  .modal-header label {
    padding-left: 20px;
  }
  .choosed-city .label {
    display: inline-block;
    margin: 0 2px 5px;
    background-color: #f0f0f0;
    color: #635f5b;
    border-radius: 4px;
    padding: 5px 10px;
  }
  .candidate-city {
    margin: 15px 0;
  }
  .candidate-city .nav-tabs {
    border-bottom: 1px solid #aaa;
  }
  .candidate-city .nav-tabs>li>a {
    padding: 10px 20px;
    color: #383838;
    border: 1px solid #dedede;
    border-bottom-color: transparent;
    margin-right: 15px;
  }
  .candidate-city .nav-tabs>li.active>a,
  .candidate-city .nav-tabs>li.active>a:focus,
  .candidate-city .nav-tabs>li.active>a:hover {
    color: #ff8903;
    border: 1px solid #aaa;
    border-bottom-color: transparent;
    background-color: #fff;
  }
  .candidate-city .nav-tabs>li>a:hover {
    color: #ff8903;
    background-color: transparent;
  }
  .candidate-city .tab-pane {
    max-height: 300px;
    overflow-y: scroll;
  }
  .candidate-city .input-group {
    margin: 15px 15px 0;
  }
  .candidate-city .input-group-addon {
    text-align: left;
    width: 30px;
    vertical-align: top;
    font-size: 18px;
  }
  .candidate-city label {
    margin: 0 5px 5px 5px;
    padding: 10px 0;
    cursor: pointer;
  }
  .candidate-city label>input {
    display: none;
  }
  .candidate-city label>span {
    border: 1px solid #dedede;
    padding: 10px 15px;
  }
  .candidate-city label>input:checked+span {
    border: 1px solid #ff8903;
    color: #ff8903;
  }
  .choosed-city .close {
    font-size: inherit;
    float: none;
  }
</style>
<div class="modal fade" id="popup-city">
  <div class="modal-dialog dialog-lg">
    <div class="modal-content">
      <form>
        <div class="modal-header">
          <h4 class="modal-title">选择城市</h4><label class="checkbox-inline"><input type="checkbox" id="chooseAll"><span>全选</span></label>
        </div>
        <div class="modal-body"></div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary">保存</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        </div>
      </form>
    </div>
  </div>
</div>

<script id="city-template" type="text/x-tmpl-mustache">
  <div class="input-group choosed-city">
    <div class="input-group-addon">已选：</div>&nbsp;{{&choosed}}</div>
    <div class="candidate-city">
      <ul class="nav nav-tabs" role="tablist">
        {{&tab}}
      </ul>
      <div class="tab-content">
        {{&pane}}
      </div>
    </div>
  </script>