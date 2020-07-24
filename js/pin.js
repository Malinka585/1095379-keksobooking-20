'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var getPinElements = function (template, pins) {
    for (var i = 0; i < pins.length; i++) {
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
    window.card.closeCard();
    getPinElements(mapPinTemplate, data);
    insertElements(mapPins);

    mapPins.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.type !== 'button' && target.tagName !== 'IMG') {
        return;
      }

      var imgSrc;

      if (target.tagName === 'IMG') {
        imgSrc = target.getAttribute('src');
      }

      if (target.type === 'button') {
        imgSrc = target.querySelector('img').getAttribute('src');
      }

      for (var i = 0; i < data.length; i++) {
        if (imgSrc === data[i].author.avatar) {


          window.card.closeCard();
          window.card.getCardElement(data[i]);

          var popupClose = document.querySelector('.popup__close');

          popupClose.addEventListener('click', function () {
            window.card.closeCard();
          });

          var onPopupEscPress = function (event) {
            window.util.isEscEvent(event, window.card.closeCard);
            document.removeEventListener('keydown', onPopupEscPress);
          };

          document.addEventListener('keydown', onPopupEscPress);
        }
      }

    });

  };

  var insertElements = function (location) {
    location.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    mapPins: mapPins
  };
})();
