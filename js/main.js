'use strict';

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

var mapPins = document.querySelector('.map__pins');

// map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

var getPinElements = function (template, objectArray) {
  for (var i = 0; i < HOTELS_COUNT; i++) {
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

var getPins = function () {
  getPinElements(mapPinTemplate, getArrPins());
  insertElements(mapPins);
};

var insertElements = function (location) {
  location.appendChild(fragment);
};

// активация карты

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

var inputAdress = document.querySelector('#address');

var START_COORDINATE = {
  LEFT: 570,
  TOP: 375,
  GAP: 32,
  ARROW_GAP: 87
};

var disableAdForm = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', true);
  }
};

disableAdForm();

var unlockAdForm = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }
};

var activeMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  getPins();
  unlockAdForm();
};

mapPinMain.addEventListener('mousedown', function () {
  if (event.which === 1) {
    activeMap();
    getAdressValue(START_COORDINATE.LEFT, START_COORDINATE.TOP, START_COORDINATE.GAP, START_COORDINATE.ARROW_GAP);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activeMap();
  }
});


var getAdressValue = function (pinX, pinY, shiftX, shiftY) {
  var inputAdressValue = '' + (pinX + shiftX) + ', ' + (pinY + shiftY) + '';
  inputAdress.setAttribute('value', inputAdressValue);
};

getAdressValue(START_COORDINATE.LEFT, START_COORDINATE.TOP, START_COORDINATE.GAP, START_COORDINATE.GAP);

// валидация

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');
var capacityValue = Number(capacity.value);
var roomNumberValue = Number(roomNumber.value);

roomNumber.addEventListener('change', function () {
  roomNumberValue = Number(roomNumber.value);
});

capacity.addEventListener('change', function () {
  capacityValue = Number(capacity.value);
});

var validateGasteCount = function () {
  if (capacityValue > roomNumberValue) {
    roomNumber.setCustomValidity('Выберете большее количество комнат');
  } else if (roomNumberValue === 100 && capacityValue !== 0) {
    roomNumber.setCustomValidity('100 комнат не для гостей');
  } else if (roomNumberValue !== 100 && capacityValue === 0) {
    capacity.setCustomValidity('Выберете 100 комнат');
  } else {
    roomNumber.setCustomValidity('');
  }
};

adFormSubmit.addEventListener('click', function () {
  // evt.preventDefault();
  validateGasteCount();
});
