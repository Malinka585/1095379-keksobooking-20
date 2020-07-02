'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var getPinElements = function (template, pins) {
    for (var i = 0; i < window.data.HOTELS_COUNT; i++) {
      var pin = pins[i];
      var pinElement = template.cloneNode(true);

      pinElement.style.left = pin.location.x + 'px';
      pinElement.style.top = pin.location.y + 'px';

      pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', pin.offer.title);

      fragment.appendChild(pinElement);
    }
    return pinElement;
  };

  var renderPins = function (data) {
    getPinElements(mapPinTemplate, data);
    insertElements(mapPins);
  };

  var insertElements = function (location) {
    location.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins
  };
})();
