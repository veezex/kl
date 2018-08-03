$('.js-open-subtheme').on('click', function() {
  var $this = $( this );
  var link = $this.attr('data-attr');
  var text = $this.text();
  var breadcrumbs = '<ul class="breadcrumbs__list side-modal__breadcrumbs u-jc-fs">'+
  '<li class="breadcrumbs__item"><a href="javascript:;" class="breadcrumbs__link js-breadcrumbs__link-main breadcrumbs__link--modal">Юридическая помощь</a></li>' +
  '</ul>';
  
  $('.side-modal__header-wrapper').html(breadcrumbs);
  
  $('.side-modal__breadcrumbs').append('<li class="breadcrumbs__item">'+
  '<a href="#" class="breadcrumbs__link breadcrumbs__link--modal js-breadcrumbs__link-topic" data-prev="' +
  link +
  '">'+text+'</a></li>');

  $.ajax({
    url: config.subthemeList + link + '.json',
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
    } 
  });
});


$('.js-breadcrumbs__link-main').on('click', function(){
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
      var breadcrumbs = '<li class="breadcrumbs__item"><span class="breadcrumbs__link js-breadcrumbs__link-main breadcrumbs__link--modal">Юридическая помощь</span></li>';  
      $('.side-modal__breadcrumbs').html(breadcrumbs);
    } 
  });
}