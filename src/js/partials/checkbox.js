$('.benefits__item').on('click', function() {
  var $this = $( this );
  var checked = $this.attr('data-name');
  if ( !$this.hasClass('isActive')) {
    $this.closest('.filter__checkbox-wrap').find('#'+ checked).prop('checked',false);
  } else {
    $this.closest('.filter__checkbox-wrap').find('#'+ checked).prop('checked',true);
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