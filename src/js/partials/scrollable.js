$( window ).on('resize', function() {   
  if ($('.scrollable-inner') !== null) {
    for (var i = 0; i <  $('.scrollable-inner').length; i ++) {
      var scrIn = $('.scrollable-inner')[i];
      var scrEl = $(scrIn).attr('data-iscroll');
      var scrPar = $('.scrollable-parent[data-pscroll="' + scrEl + '"]')
      var scrHeight = scrIn.clientHeight;
      // console.log(scrHeight);
      scrPar.height(scrHeight);
    };
  };
}).resize();