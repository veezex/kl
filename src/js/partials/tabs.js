$('.js-tab__item').on('click',function(e) {
  var $this = $( this );

  $this.closest('.tab').find('.js-tab__item').removeClass('js-active');
  $this.addClass('js-active');

  var val = $this.attr('data-tab');    

  $this.closest('.tab').find('.tab__block').removeClass('js-active');
  $('[data-content="'+val+'"]').addClass('js-active');
}); 