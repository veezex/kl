$('.js-header-menu').on('click', function() {
  $('.header__side').addClass('isOpened');
})

$('.side-modal').on('click', function(e) {
  if ( !$(e.target).closest('.side-modal__wrapper').length) {
    $('.side-modal').removeClass('isOpened');
  }
})

$('#modal-close-menu').on('click', function(e) {
  var $this = $( this );
  $this.closest('.side-modal').removeClass('isOpened');
})