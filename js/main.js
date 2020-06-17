'use strict';

var HOTELSCOUNT = 8;


var housings = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var conditions = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomNumber = function (min, max) {

  var randomNumber = min + Math.random() * (max + 1 - min);

  return Math.floor(randomNumber);
};

var getRandomValue = function (arr) {

  var randomValue = arr[Math.floor(Math.random() * arr.length)];

  return randomValue;
};

// Генерирует js объекты

var getArrPins = function () {
  var hotels = [];

  for (var i = 0; i < HOTELSCOUNT; i++) {
    hotels[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },

      'offer': {
        'title': 'Заголовок предложения' + (i + 1) + '',
        'adress': '' + getRandomNumber(50, 1150) + ', ' + getRandomNumber(130, 630) + '',
        'price': getRandomNumber(10000, 100000),
        'type': getRandomValue(housings),
        'rooms': getRandomNumber(1, 4),
        'guests': getRandomNumber(1, 6),
        'checkin': getRandomValue(times),
        'checkout': getRandomValue(times),
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

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getPins = function () {

  var getPinElements = function (template, objectArray) {

    for (var i = 0; i < HOTELSCOUNT; i++) {
      var object = objectArray[i];
      var element = template.cloneNode(true);
      element.style.left = getArrPins()[i].location.x;
      element.style.top = getArrPins()[i].location.y;
      element.querySelector('img').setAttribute('src', object.author.avatar);
      element.querySelector('img').setAttribute('alt', object.offer.title);

      fragment.appendChild(element);
    }
    return element;
  };

  getPinElements(mapPinTemplate, getArrPins());

};
getPins();

var insertElements = function (location) {
  location.appendChild(fragment);
};

insertElements(mapPins);
