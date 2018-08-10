$('#contacts').off('submit').on('submit', function(e) {
  $('#contacts-modal').addClass('isOpened');
  e.preventDefault();
  $.ajax({
    data: $(this).serialize(),
    method: this.method,
    url: this.action,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
}); 

$('#help_sidebar_form').off('submit').on('submit', function(e) {
  $('#help-modal').addClass('isOpened');
  e.preventDefault();
  $.ajax({
    data: $(this).serialize(),
    method: this.method,
    url: this.action,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
}); 
