$('body').on('click', '.js-add_favorite', function(e) {
    e.preventDefault();
    var el = $(this);

    if (el.hasClass('is-favorite')) {
        action = 'remove';
    } else {
        action = 'add';
    }

    $.ajax({
        data: {
            item: el.data('item'),
            action: action
        },
        url: config.favoriteMod,
        method: 'POST',
        success: function(data) {
            if (data == 'true') {
                if (action == 'add') {
                    el.addClass('is-favorite');
                }

                if (action == 'remove') {
                    el.removeClass('is-favorite');
                }
            }
        }
    });
});