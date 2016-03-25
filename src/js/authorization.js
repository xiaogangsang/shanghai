$(function(){
  $("#channelSelect").chosen();
  $('#userSelect_1').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#userSelect_1_to',
    rightAll: '#userSelect_1_all',
    rightSelected: '#userSelect_1_right',
    leftSelected: '#userSelect_1_left',
    leftAll: '#userSelect_1_none'
  });

  $("#citySelect").chosen();
  $('#userSelect_2').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#userSelect_2_to',
    rightAll: '#userSelect_2_all',
    rightSelected: '#userSelect_2_right',
    leftSelected: '#userSelect_2_left',
    leftAll: '#userSelect_2_none'
  });
});