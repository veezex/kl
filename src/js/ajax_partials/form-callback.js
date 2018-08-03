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

$("#consult form").submit(function() {
  $.ajax({
    url: config.formConsult,
    dataType: "json",
    success: function(data) {
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__success">' +
      data.header +
      '</p></div>';
      $('#consult .modal__content').html( thanks );
    },
    error: function (err) { 
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__success">' +
      data.header +
      '</p></div>';
      $('#consult .modal__content').html( thanks );
    }
  });
  return false;
})

$("#sell form").submit(function() {
  $.ajax({
    url: config.formSell,
    dataType: "json",
    success: function(data) {
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__success">' +
      data.header +
      '</p></div>';
      $('#sell .js-tab-load').html( thanks );
    },
    error: function (err) { 
      var thanks = '<div class="modal__success-block"><p class="modal__success">'+
      data.text +
      '</p><p class="modal__success">' +
      data.header +
      '</p></div>';
      $('#sell .js-tab-load').html( thanks );
    }
  });
  return false;
})