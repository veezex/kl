$(window).on("scroll load",function(){
  var stickblock = $('.js-header');

  if ( $(window).scrollTop() >= 60) {
    stickblock.addClass('sticked'); 
  } else {
    stickblock.removeClass('sticked'); 
  };
})