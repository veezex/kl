$('.benefits__item').on('click', function() {
  var $this = $( this );
  var checked = $this.attr('data-name');

  var input = $this.closest('.filter__checkbox-wrap').find('#'+ checked);
  if ( !$this.hasClass('isActive')) {
    input.val(input.data('n'));
  } else {
    input.val(input.data('y'));
  }
  // console.log($('#school').is(':checked'));
  // console.log($('#kinder').is(':checked'));
  // console.log($('#drugstore').is(':checked'));
  // console.log($('#hospital').is(':checked'));
  // console.log($('#shop').is(':checked'));
  // console.log($('#bank').is(':checked'));
  // console.log($('#cafe').is(':checked'));
  // console.log($('#rest').is(':checked'));
})