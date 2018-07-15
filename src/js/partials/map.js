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
        }), 

        // Метка, содержимое балуна которой загружается с помощью AJAX.
        placemark = new ymaps.Placemark([55.760584, 37.639450], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map__baloon.png',
            iconImageSize: [40, 50],
            iconImageOffset: [-20, -50]
        }),

        // Создадим пользовательский макет ползунка масштаба.
        ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map__zoom-block u-jc-sbu-fd-col'>" +
        "<div id='zoom-in' class='map__zoom map__zoom--minus u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='8px' height='2px' viewBox='0 0 8 2' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<rect id='map__minus' width='8' height='2'></rect>" +
        "</svg></div><br>" +
        "<div id='zoom-out' class='map__zoom u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<g id='Group' ><rect id='Rectangle-3' x='0' y='5' width='12' height='2'></rect>" +
        "<rect id='Rectangle-3' transform='translate(6.000000, 6.000000) rotate(90.000000) translate(-6.000000, -6.000000) ' x='0' y='5' width='12' height='2'></rect></g>" +
        "</svg></div>", {

        // Переопределяем методы макета, чтобы выполнять дополнительные действия
        // при построении и очистке макета.
        build: function () {
            // Вызываем родительский метод build.
            ZoomLayout.superclass.build.call(this);

            // Привязываем функции-обработчики к контексту и сохраняем ссылки
            // на них, чтобы потом отписаться от событий.
            this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
            this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

            // Начинаем слушать клики на кнопках макета.
            $('#zoom-in').bind('click', this.zoomInCallback);
            $('#zoom-out').bind('click', this.zoomOutCallback);
        },

        clear: function () {
            // Снимаем обработчики кликов.
            $('#zoom-in').unbind('click', this.zoomInCallback);
            $('#zoom-out').unbind('click', this.zoomOutCallback);

            // Вызываем родительский метод clear.
            ZoomLayout.superclass.clear.call(this);
        },

        zoomIn: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() + 1, {checkZoomRange: true});
        },

        zoomOut: function () {
            var map = this.getData().control.getMap();
            map.setZoom(map.getZoom() - 1, {checkZoomRange: true});
        }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                layout: ZoomLayout,
                position: {
                    left: 30,
                    top: 465 //temp
                }
            }
        });
        myMap.controls.add(zoomControl);
        myMap.geoObjects.add(placemark);
    }
}
        