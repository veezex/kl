$('.js-modal__btn[data-modal="help"]').on('click', function(){
  themesLoad();
})

function themesLoad(){
  $.ajax({
    url: config.themesList,             
    dataType : "json",  
    success: function (data) {
      $('.side-modal__content').empty();
      $('.side-modal__content').append('<ul class="side-modal__list side-modal__list--help"></ul>');
      $.each(data, function(i, val) { 
        $('.side-modal__list--help')
          .append('<li class="side-modal__theme js-open-subtheme" data-attr="' + 
          config.themeLink +
          val.id +
          '"><a href="javascript:;" class="side-modal__theme-link">'+
          val.theme +
          '</a></li>')
      });
    } 
  });
}