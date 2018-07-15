if (document.getElementById('map') !== null) {
//   function mapSize(){
//     var mapPos = $('#map').offset().top;
//     var winHeight = $(window).height();
//     var mapHeight = winHeight - mapPos;
//     // console.log(winHeight);
//     $('#map').css('height', mapHeight);
//   };

//   mapSize();

//   $( window ).resize(function() {
//     mapSize();
//   });

  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init(){ 
      // Создание карты.    
      var myMap = new ymaps.Map("map", {
          // Координаты центра карты.
          // Порядок по умолчнию: «широта, долгота».
          // Чтобы не определять координаты центра карты вручную,
          // воспользуйтесь инструментом Определение координат.
          center: [55.76, 37.64],
          // Уровень масштабирования. Допустимые значения:
          // от 0 (весь мир) до 19.
          zoom: 18,
          controls: []
      });
  }
}