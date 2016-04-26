var common = {};
// common.API_HOST = 'http://localhost:4000/';
common.API_HOST = 'http://180.169.45.105/MovieOps/';
common.setMenu = function(pageName){
  $('#menu-'+pageName).length > 0 && $('#menu-'+pageName).addClass('active').parents('.panel-collapse').collapse('show');
};
common.setLoginName = function(){
  var loginName = Cookies.get('name');
  if (loginName != undefined && loginName != '') {
    $('#loginName').text(loginName);
  }
}
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
common.getUrlParam = function() {
  var param_arr = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (typeof param_arr[pair[0]] === "undefined") {
      param_arr[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof param_arr[pair[0]] === "string") {
      var arr = [ param_arr[pair[0]],decodeURIComponent(pair[1]) ];
      param_arr[pair[0]] = arr;
    } else {
      param_arr[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return param_arr;
};

module.exports = common;