$('.js-map__btn').on('click',function(e) {
  var val = $( this ).attr('data-modal');
  
  // var styles = {
  //   display : "block",
  //   width: "100%",
  //   top: -headeHeight
  // };
  
  $('#'+val).addClass('isOpened');
}); 