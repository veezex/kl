$(document).ready(function () {
  $('.js-tab__item').on('click',function(e) {
    e.preventDefault();

    $( this ).closest('.tab').find('.tab__item').removeClass('js-active');
    $( this ).addClass('js-active');

    var val = $( this ).attr('href');    
    $( this ).closest('.section').find('.tab__block').removeClass('js-active');
    $( val ).addClass('js-active');
  });

  $('.js-hide-filter').on('click',function(e) {
    e.preventDefault();

    if ( $('.filter__input-group--add').hasClass('js-isVisible') ) {
      $('.filter__input-group--add').removeClass('js-isVisible');
      $( this ).text('Все параметры');
    } else {
      $('.filter__input-group--add').addClass('js-isVisible');      
      $( this ).text('Скрыть параметры');
    }
  });
})