'use strict';

(function () {

  var HOTELS_COUNT = 8;

  var housings = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var conditions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (min, max) {
    var randomNumber = min + Math.random() * (max + 1 - min);

    return Math.floor(randomNumber);
  };

  var getRandomElement = function (arr) {
    var randomValue = arr[Math.floor(Math.random() * arr.length)];

    return randomValue;
  };

  // Генерирует js объекты

  var getArrPins = function () {
    var hotels = [];

    for (var i = 0; i < HOTELS_COUNT; i++) {
      hotels[i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },

        'offer': {
          'title': 'Заголовок предложения' + (i + 1) + '',
          'adress': '' + getRandomNumber(50, 1150) + ', ' + getRandomNumber(130, 630) + '',
          'price': getRandomNumber(10000, 100000),
          'type': getRandomElement(housings),
          'rooms': getRandomNumber(1, 4),
          'guests': getRandomNumber(1, 6),
          'checkin': getRandomElement(times),
          'checkout': getRandomElement(times),
          'features': conditions,
          'description': 'Строка с описанием' + (i + 1) + '',
          'photos': photos
        },

        'location': {
          'x': getRandomNumber(50, 1150) + 'px',
          'y': getRandomNumber(130, 630) + 'px'
        }
      };
    }
    return hotels;
  };

  window.data = {
    HOTELS_COUNT: HOTELS_COUNT,
    getArrPins: getArrPins
  };
})();
