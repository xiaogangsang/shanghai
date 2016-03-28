$('.unit-limitation th').on('click', '.btn', function(e) {
  e.preventDefault();
  if(!!$(this).attr('id') ) {
    var eleName = $(this).attr('id').substring(4);
    $('#'+eleName).modal('show');
  }
});