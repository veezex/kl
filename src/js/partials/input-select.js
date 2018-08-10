//when clicking/toggling dropdown menu btn
$('.js-select-btn').on('click', function() {
  var $this = $( this );
  var sybling = $this.closest('.filter__input-block').find('.js-select-block');
  if ( sybling.hasClass('isOpen') ) {
    $this.addClass('isClosed');
    $this.removeClass('isOpen');
    sybling.removeClass('isOpen');
  } else {
    $('.js-select-block').removeClass('isOpen');
    $('.js-select-btn').removeClass('isOpen');    
    $this.addClass('isOpen');
    sybling.addClass('isOpen');
  }

  var $block = $this.closest('.filter__input-block');
  var $exist = $block.find('.filter__empty');
  var empty = "<span class='filter__empty'>Поле обязательно для заполнения</span>"
  if ( !$exist.length ) {
    if ( $block.find('.js-filter-hidden').prop('required')) {
      if ( !$block.find('.js-filter-hidden').val() ) {
        $block.find('.filter__input-wrap').append( empty );
        $this.addClass('filter__danger');
      } else {
        $block.find('.filter__empty').remove();
        $this.removeClass('filter__danger');
      }
    }
  }  
});

//when clicking on item in dropdown menu
$('.js-select-item').on('click', function() {
  
  var $this = $( this );
  $this.addClass('js-selected');
  var text = $this.text();
  var group = $this.attr('data-group');
  $('.js-select-btn[data-group="' + group + '"]').text(text);
  $this.closest('.filter__input-block').find('.js-select-label').addClass('floated');
  $('.js-select-btn.isOpen').addClass('isClosed');
  $('.js-select-block.isOpen').removeClass('isOpen');
  $('.js-select-btn.isOpen').removeClass('isOpen');
  $('.js-filter-hidden[data-group="' + group + '"]').val(text);   
  
  var $block = $this.closest('.filter__input-block')
  if ( $block.find('.js-filter-hidden').prop('required')) {
    var empty = "<span class='filter__empty'>Поле обязательно для заполнения</span>"
    if ( !$block.find('.js-filter-hidden').val() ) {
      $block.find('.filter__input-wrap').append( empty );
      $('.js-select-btn[data-group="' + group + '"]').addClass('filter__danger');
    } else {
      $block.find('.filter__empty').remove();
      $('.js-select-btn[data-group="' + group + '"]').removeClass('filter__danger');
    }
  }
});

//when clicking outside the item in dropdown or dropdown btn 
if ( $('.js-select-btn.isOpen').length > 0 ) {
  $(document).on('click', function(e) {
    if ( !$(e.target).closest('.js-select-block.isOpen').length && !$(e.target).closest('.js-select-btn.isOpen').length) {
      $('.js-select-btn.isOpen').addClass('isClosed');
      $('.js-select-block.isOpen').removeClass('isOpen');
      $('.js-select-btn.isOpen').removeClass('isOpen');

      var $this = $('.js-select-btn.isClosed');
      var $block = $this.closest('.filter__input-block');
      var $exist = $block.find('.filter__empty');
      var empty = "<span class='filter__empty'>Поле обязательно для заполнения</span>"
      if ( !$exist.length ) {
        if ( $block.find('.js-filter-hidden').prop('required')) {
          if ( !$block.find('.js-filter-hidden').val() ) {
            $block.find('.filter__input-wrap').append( empty );
            $('.js-select-btn.isClosed').addClass('filter__danger');
          } else {
            $block.find('.filter__empty').remove();
            $('.js-select-btn.isClosed').removeClass('filter__danger');
          }
        }
      }
    }
  });
}

$('body').on('focus', '.filter__input', function() {
  var $this = $( this );
  $this.closest('.filter__input-wrap').find('.filter__floating-label').addClass('floated');
})

$('body').on('blur', '.filter__input', function() {
  var $this = $( this );
  var $parent = $this.closest('.filter__input-wrap');
  var $input = $parent.find('.filter__input');
  if ( !$this.val() ) {
    var empty = "<span class='filter__empty'>Поле обязательно для заполнения</span>";
    $parent.removeClass('validated');
    $parent.find('.filter__floating-label').removeClass('floated');
    if ( $this.prop('required')) {
      if ( !$input.hasClass('filter__danger') ) {
        $input.addClass('filter__danger');
        $parent.append( empty );
      }    
    }
  } 
  else {
    var name = $input.data('validate')
    if ( name === 'name' ) {
      if ( $input.val().indexOf(' ') > -1) {
        $parent.addClass('validated');
        if ( $input.hasClass('filter__danger') ) {
          $input.removeClass('filter__danger');
          $parent.find('.filter__empty').remove();
        } 
      }
      else {
        $parent.removeClass('validated');
        $parent.find('.filter__empty').remove();
        var empty = "<span class='filter__empty'>Поле должно содержать Имя и Фамилию через пробел</span>";
        $input.addClass('filter__danger');
        $parent.append( empty );
      }
    } else if ( name === 'email' ) {
      if( validateEmail($input.val())) {
        $parent.addClass('validated');
        if ( $input.hasClass('filter__danger') ) {
          $input.removeClass('filter__danger');
          $parent.find('.filter__empty').remove();
        }         
      }
      else {
        $parent.removeClass('validated');
        $parent.find('.filter__empty').remove();
        var empty = "<span class='filter__empty'>Email должен содержать латинские буквы, символы @ и .</span>";
        $input.addClass('filter__danger');
        $parent.append( empty );
      }
    } else if ( name === 'tel' ) {
      if( validatePhone($input.val())) {
        $parent.addClass('validated');
        if ( $input.hasClass('filter__danger') ) {
          $input.removeClass('filter__danger');
          $parent.find('.filter__empty').remove();
        }         
      }
      else {
        $parent.removeClass('validated');
        $parent.find('.filter__empty').remove();
        var empty = "<span class='filter__empty'>Номер телефона должен содержать от 10 до 14 цифр</span>";
        $input.addClass('filter__danger');
        $parent.append( empty );
      }
    } else {
      $input.removeClass('filter__danger');
      $parent.find('.filter__empty').remove();
    }
  }
}); 

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
};

function validatePhone($phone) {
  var phoneReg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10,14}$/;
  return phoneReg.test( $phone );
};