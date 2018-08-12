$('.js-tab-change-value').on('click', function() {
    var $this = $( this );

    var buttons = $this.closest('.tab').find('.js-tab-change-value');
    // визуально это должно выглядеть как переключение табов
    buttons.removeClass('js-active');
    $this.addClass('js-active');

    var form = $($this.data('form'));
    form.removeClass()
        .addClass('mode-' + $this.data('value'))
        .find($this.data('input'))
        .val($this.data('value'));

});