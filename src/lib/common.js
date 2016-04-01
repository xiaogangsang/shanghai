var common = {};
common.API_HOST = 'http://localhost:4000/';
common.setMenu = function(pageName){
  $('#menu-'+pageName).length > 0 && $('#menu-'+pageName).addClass('active').parents('.panel-collapse').collapse('show');
};
module.exports = common;