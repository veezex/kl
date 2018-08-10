

$("#consult form,#form-otzyv").off('submit').on('submit', function(e) {
  e.preventDefault();
  var form = this;

  $.ajax({
    data: $(form).serialize(),
    method: form.method,
    url: form.action,     
    dataType: "html",
    success: function(data) {

      $($(form).data('cont') + ' .modal__content').html( data );
    },
    error: function (err) { 
      $($(form).data('cont') + ' .modal__content').html( data );
    }
  });
  return false;
})