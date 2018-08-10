$("#otzyv form").submit(function() {
  $.ajax({
    url: config.formOtzyv,
    dataType: "json",
    success: function(data) {
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__success">' +
      data.header +
      '</p></div>';
      $('#otzyv .modal__content').html( thanks );
    },
    error: function (err) { 
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__error">' +
      data.header +
      '</p></div>';
      $('#otzyv .modal__content').html( thanks );
    }
  });
  return false;
})

$("#consult form").off('submit').on('submit', function(e) {
  e.preventDefault();
  var form = this;

  $.ajax({
    data: $(form).serialize(),
    method: form.method,
    url: form.action,     
    dataType: "html",
    success: function(data) {

      $('#consult .modal__content').html( data );
    },
    error: function (err) { 
      $('#consult .modal__content').html( data );
    }
  });
  return false;
})