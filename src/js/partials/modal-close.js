$('#modal-close').on('click',function(e) {
  var $this = $( this );

  $this.closest('.js-modal').removeClass('isOpened');
}); 