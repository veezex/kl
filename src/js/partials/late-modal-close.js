$('#modal-close-help').on('click', function(e) {
  // console.log('not happens');
  var $this = $( this );
  $this.closest('.js-modal').removeClass('isOpened');
})