if ($('.history__wrapper').length) {
    var ax = 0;
    var handler = function() {
        var oTop = $('.history__wrapper').offset().top - window.innerHeight;
        if (ax == 0 && $(window).scrollTop() > oTop) {
            setTimeout(function() {
                $('.history__card-header').addClass('isAnimated');

                setTimeout(function() {
                    $('.history__card-text').addClass('isAnimated');
                }, 1000);
            }, 500);

            ax = 1;
        }
      };

    $(window).scroll(handler);
    handler();
}