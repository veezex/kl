$('.js-modal__btn[data-modal="izbrannoe"]').on('click', function(){
  $.ajax({
    url: config.izbrannoeTemplateList,             
    dataType : "html",                    
    success: function (data) {
      $('.tab__block[data-content="list"]').html( data );
    } 
  });
  $.ajax({
    url: config.izbrannoeTemplateCard,             
    dataType : "html",                    
    success: function (data) {
      $('.tab__block[data-content="card"]').html( data );
    } 
  });
});

$('.js-modal__btn[data-modal="sell"]').on('click', function(){
  $.ajax({
    url: config.sellTemplateSell,             
    dataType : "html",                    
    success: function (data) {
      $('.js-tab-load').html( data );
    }
  });
});

$('.js-modal__btn[data-modal="consult"]').on('click', function(){
  $.ajax({
    url: config.consultTemplate,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
});


$('.js-modal__btn[data-modal="otzyv"]').on('click', function(){
  $.ajax({
    url: config.otzyvTemplate,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
});

$('#form-egrn .js-modal__btn').on('click', function(){
  $.ajax({
    url: config.egrnTemplate,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
});

$('.js-modal__btn[data-modal="employee"]').on('click', function(){
  var $this = $( this );
  var name = $this.attr("data-name");
  $.ajax({
    url: config.empName + name,             
    dataType : "html",                    
    success: function (data) {
      $('.modal__content').html( data );
    }
  });
});

