$('.item__img').click(function(){
  var imgSrc = $( this ).attr('src');

  // console.log( imgSrc );

  $('.carousel__image_content').css('background-image', 'url(' + imgSrc + ')' );
});

$('.carousel-btn .item-count').text($('.carousel-item-image .item').length);
$('.carousel-content-container').click(function () {
  $('.carousel-overlay').addClass('active');
});

$('.carousel-close').click(function () {
  $('.carousel-overlay').removeClass('active');
});
