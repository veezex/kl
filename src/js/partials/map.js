if (document.getElementById('map') !== null) {
    var lng = $('#map').attr('data-lng');
    var lat = $('#map').attr('data-lat');
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
            // center: [55.76, 37.64],
            center: [lng, lat],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 10,
            controls: []
        }); 

        // Метка, содержимое балуна которой загружается с помощью AJAX.
        // var placemark = new ymaps.Placemark([55.760584, 37.639450], {}, {
        //     iconLayout: 'default#image',
        //     iconImageHref: 'images/map__baloon.png',
        //     iconImageSize: [57, 51],
        //     iconImageOffset: [-37, -50]
        // });

        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map__zoom-block u-jc-sbu-fd-col'>" +
        "<div id='zoom-in' class='map__zoom u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<g id='Group' ><rect id='Rectangle-3' x='0' y='5' width='12' height='2'></rect>" +
        "<rect id='Rectangle-3' transform='translate(6.000000, 6.000000) rotate(90.000000) translate(-6.000000, -6.000000) ' x='0' y='5' width='12' height='2'></rect></g>" +
        "</svg></div><br>" +
        "<div id='zoom-out' class='map__zoom map__zoom--minus u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='8px' height='2px' viewBox='0 0 8 2' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<rect id='map__minus' width='8' height='2'></rect>" +
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
        });

        // var ctrl = myMap.controls.get('zoomControl').options.get('left');
        // var obj = myMap.controls.get('zoomControl');
        // console.log(myMap, 'zoomControl', ctrl, obj);

        $( window ).on('resize', function() {   
        //определяем вертикальный центр карты
            var centerPos = ( document.getElementById("map").offsetHeight / 2 ) - 50;    
            // console.log(centerPos);  

            //задаем свойства кнопок зума
            // var zoomControl = new ymaps.control.ZoomControl({
            //     options: {
            //         layout: ZoomLayout,
            //         position: {
            //             left: 30,
            //             top: centerPos
            //         }
            //     }
            // });

            myMap.controls.remove('zoomControl');
            // Создадим пользовательский макет ползунка масштаба.
            myMap.controls.add('zoomControl', {
                layout: ZoomLayout,
                position: {
                    left: '30px',
                    top: centerPos
                }
            });        
        }).resize();
        
        // myMap.geoObjects.add(placemark);
        var linkToObjects = config.mapLinks;
        function addObjects(link) {
            function mapServerData(serverData) {
                return {
                    type: "FeatureCollection",
                    features: serverData.map(function(obj, index) {
                        return {
                            id: index,
                            type: "Feature",
                            geometry: { 
                                type: "Point", 
                                coordinates: [obj.lat, obj.long] 
                                },
                            properties: { 
                                iconCaption: obj.serialNumber,
                                balloonContent: '<a target="_blank" class="" href="' +
                                obj.link +
                                '">' +
                                '<div class="balloon__image-block"><div class="balloon__image" style="background-image:url(' +
                                obj.image +
                                ')">' +
                                '</div></div>' + 
                                '<div class="balloon__inner">' +
                                '<p class="balloon__price">' +
                                obj.price +
                                '</p>' +
                                '<ul class="balloon__list">' +
                                '<li class="balloon__item ">' + 
                                obj.rooms +
                                '</li>' +
                                '<li class="balloon__item ">' +
                                obj.square +    
                                '&nbsp;м<sup>2</sup></li>' +
                                '<li class="balloon__item ">' +
                                obj.floor +    
                                '</li>' +
                                '</ul>' +
                                '<p class="balloon__address">' +
                                obj.address +
                                '</p>' +
                                '</div>' +
                                '</a>'
                            }
                            // ,
                            // options: { 
                            //     preset: getObjectPreset(obj) 
                            // }
                        };
                    })
                };
            };
    
            function loadList() {
                return fetch(link)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        return mapServerData(data);
                    });
            }
    
            var objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 64,
                clusterIconLayout: 'default#pieChart',
                // clusterIconImageHref: 'images/map__baloon.png',
                clusterDisableClickZoom: false
                // geoObjectOpenBalloonOnClick: true,
                // geoObjectHideIconOnBalloonOpen: true,
            });
            
            // objectManager.clusters.options.set({
            //     clusterIconLayout: 'default#image',
            //     clusterIconImageHref: 'images/map__baloon.png',
            //     clusterIconImageSize: [57, 51],
            //     clusterIconImageOffset: [-37, -50]
            // });
            
            loadList().then(function(data) {
                objectManager.add(data);
            }),
            
            objectManager.objects.options.set({
                iconLayout: 'default#image',
                iconImageHref: config.mapBaloon,
                iconImageSize: [57, 51],
                iconImageOffset: [-18, -45]
            });
    
            myMap.geoObjects.add(objectManager);

        }; 
        addObjects(linkToObjects);

        $("#buy-form").submit(function() {
            var linkToNewObjects = config.mapNewLinks;

            myMap.geoObjects.removeAll();

            addObjects(linkToNewObjects);

            return false;
        })
    };

} else if (document.getElementById('item-map') !== null) {
    ymaps.ready(init);

    var lng = $('#item-map').attr('data-lng');
    var lat = $('#item-map').attr('data-lat');

    function init(){ 
        var myMap = new ymaps.Map("item-map", {
            center: [lng, lat],
            zoom: 13,
            controls: []
        }); 

        var placemark = new ymaps.Placemark([lng, lat], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map__baloon.png',
            iconImageSize: [57, 51],
            iconImageOffset: [-37, -50]
        });

        var ZoomLayout = ymaps.templateLayoutFactory.createClass("<div class='map__zoom-block u-jc-sbu-fd-col'>" +
        "<div id='zoom-in' class='map__zoom u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='12px' height='12px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<g id='Group' ><rect id='Rectangle-3' x='0' y='5' width='12' height='2'></rect>" +
        "<rect id='Rectangle-3' transform='translate(6.000000, 6.000000) rotate(90.000000) translate(-6.000000, -6.000000) ' x='0' y='5' width='12' height='2'></rect></g>" +
        "</svg></div><br>" +
        "<div id='zoom-out' class='map__zoom map__zoom--minus u-jc-ce u-ai-ce'>" +
        "<svg class='svg' width='8px' height='2px' viewBox='0 0 8 2' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>" +
        "<rect id='map__minus' width='8' height='2'></rect>" +
        "</svg></div>", {
            build: function () {
                ZoomLayout.superclass.build.call(this);

                this.zoomInCallback = ymaps.util.bind(this.zoomIn, this);
                this.zoomOutCallback = ymaps.util.bind(this.zoomOut, this);

                $('#zoom-in').bind('click', this.zoomInCallback);
                $('#zoom-out').bind('click', this.zoomOutCallback);
            },

            clear: function () {
                $('#zoom-in').unbind('click', this.zoomInCallback);
                $('#zoom-out').unbind('click', this.zoomOutCallback);

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
        });

        $( window ).on('resize', function() {   
            var centerPos = ( document.getElementById("item-map").offsetHeight / 2 ) - 50;    

            myMap.controls.remove('zoomControl');
            myMap.controls.add('zoomControl', {
                layout: ZoomLayout,
                position: {
                    left: '30px',
                    top: centerPos
                }
            });        
        }).resize();
        
        myMap.geoObjects.add(placemark);
    }
}
        