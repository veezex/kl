$('#modal-close-btn').on('click',function() {
  var $this = $( this );

  $this.closest('.js-modal').removeClass('isOpened');
}); 