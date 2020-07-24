'use strict';

(function () {

  var cardFragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');

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

    cardFragment.appendChild(cardElement);
    map.insertBefore(cardFragment, mapFilterContainer);

    return cardElement;
  };

  var closeCard = function () {
    window.util.clearDomElements(map, '.map__card', 'map__pin--main');
  };

  window.card = {
    map: map,
    getCardElement: getCardElement,
    closeCard: closeCard
  };

})();
