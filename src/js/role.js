$(function(){
  $('#abilitySelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#abilitySelect_to',
    rightAll: '#abilitySelect_all',
    rightSelected: '#abilitySelect_right',
    leftSelected: '#abilitySelect_left',
    leftAll: '#abilitySelect_none'
  });
  $('#userSelect').multiselect({
    search: {
      left: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
      right: '<input type="text" name="q" class="form-control" placeholder="筛选..." />',
    },
    right: '#userSelect_to',
    rightAll: '#userSelect_all',
    rightSelected: '#userSelect_right',
    leftSelected: '#userSelect_left',
    leftAll: '#userSelect_none'
  });
});