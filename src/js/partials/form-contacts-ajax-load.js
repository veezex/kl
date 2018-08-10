$('#contacts').off('submit').on('submit', function(e) {
  $('#contacts-modal').addClass('isOpened');
  e.preventDefault();
  var form = this;

  $.ajax({
    data: $(form).serialize(),
    method: form.method,
    url: form.action,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
      form.reset();
    }
  });
}); 

$('#help_sidebar_form').off('submit').on('submit', function(e) {
  $('#help-modal').addClass('isOpened');
  e.preventDefault();
  var form = this;

  $.ajax({
    data: $(form).serialize(),
    method: form.method,
    url: form.action,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
      form.reset();
    }
  });
}); 
