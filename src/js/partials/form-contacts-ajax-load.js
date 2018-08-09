$('#contacts').submit(function(e) {
  $('#contacts-modal').addClass('isOpened');
  event.preventDefault();
  $.ajax({
    url: config.contactsTemplate,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
}); 

$('#help').submit(function(e) {
  $('#help-modal').addClass('isOpened');
  event.preventDefault();
  $.ajax({
    url: config.helpTemplate,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
}); 
