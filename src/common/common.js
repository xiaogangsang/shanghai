var common = {};
// common.API_HOST = 'http://localhost:4000/';
common.API_HOST = 'http://180.169.45.105/MovieOps/';
common.setMenu = function(pageName){
  $('#menu-'+pageName).length > 0 && $('#menu-'+pageName).addClass('active').parents('.panel-collapse').collapse('show');
};
common.getDate = function(date){
  if (undefined == date || '' == date) {
    date = new Date();
  }
  var YYYY = date.getFullYear().toString();
  var MM = (date.getMonth()+1).toString();
  var DD = date.getDate().toString();
  MM = MM[1] ? MM : '0'+MM[0];
  DD = DD[1] ? DD : '0'+DD[0];
  return YYYY + '-' + MM + '-' + DD;
};
module.exports = common;