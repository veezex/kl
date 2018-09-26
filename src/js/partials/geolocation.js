$(document).ready(function(){
    var currentCity = window.config.currentCity;
    $('.current-city').text(currentCity.name); // Ставим актуальный город по геолокации
    $('.your-city span').text(currentCity.name + '?'); // Ставим актуальный город по геолокации

    //выводим табличку с подтвержденим актуального города
    setTimeout(function() {
      $('.current-city-choose').addClass('current-city-choose--active');
    }, 700)

    //скрываем табличку
    $('.submit-city').click(function(e) {
      e.preventDefault();
      $('.current-city-choose').removeClass('current-city-choose--active');
    });

    // открываем модалку с выбором города
    $('.other-city').click(function(e) {
      e.preventDefault();
      $('.current-city-choose').removeClass('current-city-choose--active');
      $('.modal-item').addClass('modal-item--active');
      $('body').addClass('overflow');

      regionsLoad();
      citiesLoad();
    });

    $('.close-modal').click(function(e) {
      e.preventDefault();
      $('.modal-item').removeClass('modal-item--active');
      $('body').removeClass('overflow');
    });

    $('.modal-overlay').click(function(e) {
      e.preventDefault();
      $('.modal-item').removeClass('modal-item--active');
      $('body').removeClass('overflow');
    })

    function asc_sort(a, b){
      return (b.name) < (a.name) ? 1 : -1;
    }

    // загружаем список регионов
    function regionsLoad() {
      var regions;
      if (!localStorage.getItem('regions')) { // если locaStorage пустой, отправляем запрос, записываем данные
        $.ajax({
          url: window.config.geoRegions,
          dataType: "json",
          success: function (data) {
            localStorage.setItem('regions', JSON.stringify(data));
            regionsRender(data);
          }
        });
      } else {
        regions = JSON.parse(localStorage.getItem('regions'));
        regionsRender(regions);
      }
    }

    // отображаем список регионов
    function regionsRender(regions) {
      regions.sort(asc_sort);
      var regionsArray = [];

      $.each(regions, function(i, val) {
        var item = {};
        var letter = val.name.charAt(0);
        item.title = letter;
        item.items = regions.filter(item => item.name.charAt(0) == letter);
        regionsArray.push(item);
      });

      var nextRegions = regionsArray.sort(function(a,b){return a.title < b.title ? -1 : 1;}).reduce(function(arr, el){
        if(!arr.length || arr[arr.length - 1].title != el.title) {
          arr.push(el);
        }
        return arr;
      }, []);

      $.each(nextRegions, function(i, val) {
        $('.all-regions').append(
          '<div class="region-row"><div class="first-letter">' + val.title + '</div><ul class="region-list" data-letter="' + val.title + '"></ul></div>'
        );

        $.each(val.items, function(i, val) {
          var letter = val.name.charAt(0);
          $('.region-list[data-letter="' + letter + '"]').append(
            '<li class="region" data-region="' + val.id + '"><span>' + val.name + '</span></li>'
          );
        });
      });

      $('.region').click(function(){
        var id = $(this).data('region');
        var citiesData = JSON.parse(localStorage.getItem('cities'));
        $('.cities').html('');
        citiesByRegion(citiesData, id);
      });
    }

    function citiesLoad() {
      var cities;
      if (!localStorage.getItem('cities')) { // если locaStorage пустой, отправляем запрос, записываем данные
        $.ajax({
          url: window.config.geoCities,
          dataType: "json",
          success: function (data) {
            localStorage.setItem('cities', JSON.stringify(data));
            citiesRender(data);
          }
        });
      } else {
        cities = JSON.parse(localStorage.getItem('cities'));
        citiesRender(cities);
      }
    }

    // загружаем список городов
    function citiesRender(cities) {
      cities.sort(asc_sort);
      var citiesArray = [];

      $.each(cities, function(i, val) {
        var item = {};
        var letter = val.name.charAt(0);
        item.title = letter;
        item.items = cities.filter(item => item.name.charAt(0) == letter);
        citiesArray.push(item);
      });

      var nextCities = citiesArray.sort(function(a,b){return a.title < b.title ? -1 : 1;}).reduce(function(arr, el){
        if(!arr.length || arr[arr.length - 1].title != el.title) {
          arr.push(el);
        }
        return arr;
      }, []);

      $.each(nextCities, function(i, val) {
        $('.cities').append(
          '<div class="cities-row"><div class="first-letter">' + val.title + '</div><ul class="cities-list" data-letter="' + val.title + '"></ul></div>'
        )

        $.each(val.items, function(i, val) {
          var letter = val.name.charAt(0);
          $('.cities-list[data-letter="'+ letter +'"]').append(
            '<li class="city" data-region="' + val.id + '"><span>' + val.name + '</span></li>'
          )
        });
      });

      //выбераем город
      $('.city').click(function () {
        var city = $(this).text();
        $('.current-city').text(city);
        $('.modal-item').removeClass('modal-item--active');
      });
    }

    // отображаем города в зависимости от региона
    function citiesByRegion(cities, id) {
      cities.sort(asc_sort);
      var filteredCities = [];
      var citiesArray = [];

      $.each(cities, function(i, val) {
        if (val.rid == id) {
          filteredCities.push(val);
        }
      });

      $.each(filteredCities, function (i, val) {
          var item = {};
          var letter = val.name.charAt(0);
          item.title = letter;
          item.items = filteredCities.filter(item => item.name.charAt(0) == letter);
          citiesArray.push(item);
      })

      var nextCities = citiesArray.sort(function(a,b){return a.title < b.title ? -1 : 1;}).reduce(function(arr, el){
        if(!arr.length || arr[arr.length - 1].title != el.title) {
          arr.push(el);
        }
        return arr;
      }, []);

      $.each(nextCities, function(i, val) {
        $('.cities').append(
          '<div class="cities-row"><div class="first-letter">' + val.title + '</div><ul class="cities-list" data-letter="' + val.title + '"></ul></div>'
        )

        $.each(val.items, function(i, val) {
          var letter = val.name.charAt(0);
          $('.cities-list[data-letter="'+ letter +'"]').append(
            '<li class="city" data-region="' + val.id + '"><span>' + val.name + '</span></li>'
          )

          //выбераем город
          $('.city').click(function(){
            var city = $(this).text();
            $('.current-city').text(city);
            $('.modal-item').removeClass('modal-item--active');
          });
        });
      });
    }

    // Открываем выбор города
    $('.current-city').click(function(){
      $('.modal-item').addClass('modal-item--active');
      $('body').addClass('overflow');

      $('.all-regions').html('');
      $('.cities').html('');

      regionsLoad();
      citiesLoad();
    });

    $('.all-cities').click(function(){
      $('.cities').html('');
      citiesLoad();
    });

  $('.city-search-input').on('input', function () {
    var cityValue = $(this).val();
    if (cityValue.length >= 3) {
      setTimeout(function () {
        $.ajax({
          url: window.config.geoCities + '?q=' + cityValue + '',
          dataType: "json",
          success: function (data) {
            $('.cities').html('');
            citiesRender(data);
          }
        });
      }, 500);
    }
    if (cityValue.length == 0) {
      $('.cities').html('');
      var data = JSON.parse(localStorage.getItem('cities'));
      citiesRender(data);
    }
  });
});
