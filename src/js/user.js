$(function(){
  $('#roleSelect').multiselect({
    right: '#roleSelect_to',
    rightAll: '#roleSelect_all',
    rightSelected: '#roleSelect_right',
    leftSelected: '#roleSelect_left',
    leftAll: '#roleSelect_none'
  });
  $('#citySelect').multiselect({
    right: '#citySelect_to',
    rightAll: '#citySelect_all',
    rightSelected: '#citySelect_right',
    leftSelected: '#citySelect_left',
    leftAll: '#citySelect_none'
  });
});