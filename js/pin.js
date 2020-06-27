'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var getPinElements = function (template, objectArray) {
    for (var i = 0; i < window.data.HOTELS_COUNT; i++) {
      var object = objectArray[i];
      var element = template.cloneNode(true);

      element.style.left = window.data.getArrPins()[i].location.x;
      element.style.top = window.data.getArrPins()[i].location.y;

      element.querySelector('img').setAttribute('src', object.author.avatar);
      element.querySelector('img').setAttribute('alt', object.offer.title);

      fragment.appendChild(element);
    }
    return element;
  };

  var getPins = function () {
    getPinElements(mapPinTemplate, window.data.getArrPins());
    insertElements(mapPins);
  };

  var insertElements = function (location) {
    location.appendChild(fragment);
  };

  window.pin = {
    getPins: getPins
  };
})();
