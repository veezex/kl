

$('#form-egrn').off('submit').on('submit', function(e) {
  $('#egrn').addClass('isOpened');
  e.preventDefault();
  var form = this;

  $.ajax({
    data: $(form).serialize(),
    method: form.method,
    url: form.action,             
    dataType : "html",                        
    success: function (data) {
      $('#egrn .modal__content').html( data );
      form.reset();
    }
  });
});


$('.js-modal__btn[data-modal="employee"]').on('click', function(){
  var $this = $( this );
  var name = $this.attr("data-name");
  $.ajax({
    url: config.empName + name,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
});

