<style>
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
  overflow: scroll;
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
</style>
<div class="modal fade" id="popup-city">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h4 class="modal-title">选择城市</h4><label class="checkbox-inline"><input type="checkbox" id="chooseCityAll" value="0"> 全选</label>
      </div>

      <div class="modal-body">

        <div class="choosed-city">
          <div class="input-group">
            <div class="input-group-addon">已选</div>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
            <span class="label label-default">上海 &times;</span>
          </div>
        </div>

        <div class="candidate-city">
          <ul class="nav nav-tabs" role="tablist">
            <li class="active"><a href="#section1" aria-controls="section1" role="tab" data-toggle="tab">A B C D E</a></li>
            <li><a href="#section2" aria-controls="section2" role="tab" data-toggle="tab">F G H I J</a></li>
            <li><a href="#section3" aria-controls="section3" role="tab" data-toggle="tab">K L M N P</a></li>
            <li><a href="#section4" aria-controls="section4" role="tab" data-toggle="tab">Q R S T</a></li>
            <li><a href="#section5" aria-controls="section5" role="tab" data-toggle="tab">W S Y Z</a></li>
          </ul>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="section1">
              <div class="input-group">
                <div class="input-group-addon">A</div>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
              </div>
              <div class="input-group">
                <div class="input-group-addon">B</div>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
              </div>
              <div class="input-group">
                <div class="input-group-addon">C</div>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
              </div>
              <div class="input-group">
                <div class="input-group-addon">D</div>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
                <label><input type="checkbox" value=""><span>上海</span></label>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="section2">...</div>
            <div role="tabpanel" class="tab-pane" id="section3">...</div>
            <div role="tabpanel" class="tab-pane" id="section4">...</div>
            <div role="tabpanel" class="tab-pane" id="section5">...</div>

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