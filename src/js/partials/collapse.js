$('.js-hide-filter').on('click',function(e) {
  e.preventDefault();
  var $this = $( this );
  if ( $('.filter__input-group--add').hasClass('js-isVisible') ) {
    $('.filter__input-group--add').removeClass('js-isVisible');
    $this.removeClass('iSopened');
  } else {
    $('.filter__input-group--add').addClass('js-isVisible');      
    $this.addClass('iSopened');
  }
});