$('.item__img').click(function(){
  var imgSrc = $( this ).attr('src');

  console.log( imgSrc );
  
  $('.image__container').css('background-image', 'url(' + imgSrc + ')' );
});