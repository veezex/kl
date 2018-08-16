$('body').on('click', '.js-add_favorite', function(e) {
    e.preventDefault();
    var el = $(this);

    if (el.hasClass('is-favorite')) {
        var action = 'remove';
    } else {
        var action = 'add';
    }
    var item = el.data('item');

    $.ajax({
        data: {
            item: item,
            action: action
        },
        url: config.favoriteMod,
        method: 'POST',
        success: function(data) {
            if (data == 'true') {
                var els = $('.js-add_favorite[data-item=' + item + ']');

                if (action == 'add') {
                    els.addClass('is-favorite');
                }

                if (action == 'remove') {
                    els.removeClass('is-favorite');
                }
            }
        }
    });
});