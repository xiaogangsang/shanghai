var common = {};
// common.API_HOST = 'http://localhost:4000/';
common.API_HOST = 'http://180.169.45.105/MovieOps/';
common.setMenu = function(pageName){
  $('#menu-'+pageName).length > 0 && $('#menu-'+pageName).addClass('active').parents('.panel-collapse').collapse('show');
};
module.exports = common;