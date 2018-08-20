+function(){

    function modAction(item, action) {
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
    }

    function updateList() {
        $.ajax({
        url: config.favoriteList,             
        dataType : "html",                    
        success: function (data) {
            $('#izbrannoe .tab__block[data-content="list"]').html( data );
        } 
        }); 
    }

    // удаление из избранного (из всплывашки)
    $('body').on('click', '.js-remove_favorite', function(e) {
        e.preventDefault();
        var el = $(this);
        var item = el.data('item');

        modAction(item, 'remove');
        el.closest('.line').remove();

        if (!$('#izbrannoe .line').length) {
            $('.js-izbrannoe_empty').show();
        }
    });

    // показ всплывашки
    $('.js-modal__btn[data-modal="izbrannoe"]').on('click', updateList);

    // кнопка добавления в избранное
    $('body').on('click', '.js-add_favorite', function(e) {
        e.preventDefault();
        var el = $(this);

        if (el.hasClass('is-favorite')) {
            var action = 'remove';
        } else {
            var action = 'add';
        }
        var item = el.data('item');

        modAction(item, action);
    });
}(); 