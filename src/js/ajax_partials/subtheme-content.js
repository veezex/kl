$('.js-open-subtheme-content').on('click', function() {
  var $this = $( this );
  var link = $this.attr('data-attr');
  var text = $this.text();

  $('.side-modal__breadcrumbs').append('<li class="breadcrumbs__item">'+
  '<a href="#" class="breadcrumbs__link breadcrumbs__link--modal">'+text+'</a></li>');

  $.ajax({
    url: config.subthemeContent + link + '.html',             
    dataType : "html",                    
    success: function (data) {
      $('.side-modal__content').html( data );
      // $('.side-modal__content').attr('data-prev',link);
    } 
  });
});