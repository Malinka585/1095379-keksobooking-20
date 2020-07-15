'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var mapFilterContainer = map.querySelector('.map__filters-container');

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


  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderFeatures = function (featuresLocation, featuresArray) {
    window.util.clearDomElements(featuresLocation, 'li');

    for (var i = 0; i < featuresArray.length; i++) {
      featuresLocation.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + featuresArray[i] + '"></li>');
    }
  };

  var getCardElement = function (card) {

    var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.addres;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typesMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', ' + 'выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', card.author.avatar);

    var popupFeatures = cardElement.querySelector('.popup__features');
    renderFeatures(popupFeatures, card.offer.features);

    var renderPhotos = function () {
      var popupPhotos = cardElement.querySelector('.popup__photos');
      var photosFragment = document.createDocumentFragment();
      var photo = cardElement.querySelector('.popup__photo');

      for (var i = 0; i < card.offer.photos.length; i++) {
        var photoElement = photo.cloneNode(true);

        photoElement.src = card.offer.photos[i];
        photosFragment.appendChild(photoElement);
      }

      popupPhotos.appendChild(photosFragment);
      photo.remove();
    };

    renderPhotos();

    fragment.appendChild(cardElement);
    map.insertBefore(fragment, mapFilterContainer);

    return cardElement;
  };

  var closeCard = function () {
    window.util.clearDomElements(map, '.map__card');
  };

  var renderPins = function (data) {
    closeCard();
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


          closeCard();
          getCardElement(data[i]);

          var popupClose = document.querySelector('.popup__close');

          popupClose.addEventListener('click', function () {
            closeCard();
          });

          var onPopupEscPress = function (event) {
            window.util.isEscEvent(event, closeCard);
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
    mapPins: mapPins,
    map: map
  };
})();
