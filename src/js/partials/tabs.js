$('.js-tab__item').on('click',function(e) {
  var $this = $( this );

  $this.closest('.tab').find('.tab__item').removeClass('js-active');
  $this.addClass('js-active');

  var val = $this.attr('data-tab');    

  $this.closest('.section').find('.tab__block').removeClass('js-active');
  $("#"+val ).addClass('js-active');
}); 