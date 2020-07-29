'use strict';

(function () {

  var LABEL_GAP_X = 25;
  var LABEL_GAP_Y = 70;

  var mapLabels = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var getPinElements = function (template, pins) {
    for (var i = 0; i < pins.length; i++) {
      var pin = pins[i];
      var pinElement = template.cloneNode(true);

      pinElement.style.left = (pin.location.x - LABEL_GAP_X) + 'px';
      pinElement.style.top = (pin.location.y - LABEL_GAP_Y) + 'px';

      pinElement.querySelector('img').setAttribute('src', pin.author.avatar);
      pinElement.querySelector('img').setAttribute('alt', pin.offer.title);

      fragment.appendChild(pinElement);
    }
    return pinElement;
  };

  var renderLabels = function (data) {
    window.card.closeCard();
    getPinElements(mapPinTemplate, data);
    insertElements(mapLabels);

    var pinButtons = mapLabels.querySelectorAll('.map__pin');

    var activeLabel = function (activeElement) {
      for (var i = 0; i < pinButtons.length; i++) {
        pinButtons[i].classList.remove('map__pin--active');
      }

      if (!activeElement.classList.contains('map__pin--main')) {
        activeElement.classList.add('map__pin--active');
      }
    };

    mapLabels.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.type !== 'button' && target.tagName !== 'IMG') {
        return;
      }

      var imgSrc;

      if (target.tagName === 'IMG') {
        imgSrc = target.getAttribute('src');

        activeLabel(target.parentNode);
      }

      if (target.type === 'button') {
        imgSrc = target.querySelector('img').getAttribute('src');

        activeLabel(target);
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
          break;
        }
      }

    });

  };

  var insertElements = function (location) {
    location.appendChild(fragment);
  };

  window.pin = {
    renderLabels: renderLabels,
    mapLabels: mapLabels
  };
})();
