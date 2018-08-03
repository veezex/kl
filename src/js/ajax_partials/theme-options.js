$('.js-btn-yes').on('click', function() {
  $.ajax({
    url: config.formHelpYes,             
    dataType : "html",                    
    success: function (data) {
      $('.subtheme__block').html( data );
    } 
  });
});

$('.js-btn-no').on('click', function() {
  $.ajax({
    url: config.formHelpForm,             
    dataType : "html",                    
    success: function (data) {
      $('.subtheme__block').html( data );
    } 
  });
});


$('.js-breadcrumbs__link-topic').on('click', function() {
  var $this = $( this );
  var text = $this.text();
  var previous = $this.attr('data-prev');
  $.ajax({
    url: config.subthemeList + previous + '.json',
    dataType : "json",                    
    success: function (data) {
      $('.side-modal__content').html('<ul class="side-modal__list side-modal__list--help"></ul>');
      $.each(data, function(i, val) { 
        $('.side-modal__list--help')
          .append('<li class="side-modal__theme js-open-subtheme-content" data-attr="' +
            config.subthemeLink +
            val.id +
            '"><a href="javascript:;" class="side-modal__theme-link ">'+
            val.theme +
            '</a></li>')
      });
      var breadcrumbs = '<ul class="breadcrumbs__list side-modal__breadcrumbs u-jc-fs">'+
      '<li class="breadcrumbs__item"><a href="javascript:;" class="breadcrumbs__link js-breadcrumbs__link-main breadcrumbs__link--modal">Юридическая помощь</a></li>' +
      '</ul>';
      $('.side-modal__header-wrapper').html(breadcrumbs);

      $('.side-modal__breadcrumbs').append('<li class="breadcrumbs__item">'+
      '<a href="#" class="breadcrumbs__link breadcrumbs__link--modal js-breadcrumbs__link-topic" data-prev="' +
      previous +
      '">'+text+'</a></li>');
    } 
  });
})