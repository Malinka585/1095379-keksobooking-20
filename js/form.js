'use strict';

(function () {
  var HOUSING_PRICE = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var avatar = window.map.adForm.querySelector('#avatar');
  var fileImage = window.map.adForm.querySelector('#images');
  var roomNumber = window.map.adForm.querySelector('#room_number');
  var capacity = window.map.adForm.querySelector('#capacity');

  var price = window.map.adForm.querySelector('#price');
  var type = window.map.adForm.querySelector('#type');
  var startPrice = price.placeholder;

  var validateHousingPrice = function () {
    var typeValue = type.value;

    var getMinPrice = function (minPrice) {
      price.placeholder = minPrice;
      price.setAttribute('min', minPrice);
    };

    if (typeValue === 'bungalo') {
      getMinPrice(HOUSING_PRICE.BUNGALO);
    } else if (typeValue === 'flat') {
      getMinPrice(HOUSING_PRICE.FLAT);
    } else if (typeValue === 'house') {
      getMinPrice(HOUSING_PRICE.HOUSE);
    } else if (typeValue === 'palace') {
      getMinPrice(HOUSING_PRICE.PALACE);
    }
  };

  type.addEventListener('change', function () {
    validateHousingPrice();
  });

  var validateGasteCount = function () {
    var capacityValue = Number(capacity.value);
    var roomNumberValue = Number(roomNumber.value);

    if (capacityValue > roomNumberValue) {
      roomNumber.setCustomValidity('Выберете большее количество комнат');
    } else if (roomNumberValue === 100 && capacityValue !== 0) {
      roomNumber.setCustomValidity('100 комнат не для гостей');
    } else if (roomNumberValue !== 100 && capacityValue === 0) {
      capacity.setCustomValidity('Выберете 100 комнат');
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  validateGasteCount();

  capacity.addEventListener('change', function () {
    validateGasteCount();
  });

  roomNumber.addEventListener('change', function () {
    validateGasteCount();
  });


  var timein = window.map.adForm.querySelector('#timein');
  var timeout = window.map.adForm.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var resetFormButton = window.map.adForm.querySelector('.ad-form__reset');

  var resetForm = function () {
    window.map.mapPinMain.style.left = window.map.START_COORDINATE.LEFT + 'px';
    window.map.mapPinMain.style.top = window.map.START_COORDINATE.TOP + 'px';
    window.map.adForm.reset();
    window.map.mapFilters.reset();
    avatar.value = null;
    fileImage.value = null;
    price.placeholder = startPrice;
    window.card.map.classList.add('map--faded');
    window.util.clearDomElements(window.pin.mapPins, 'button', 'map__pin--main');
    window.map.getStarCoordinate();
    window.map.adForm.classList.add('ad-form--disabled');
    window.map.disableAdForm();
  };

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.form = {
    resetForm: resetForm
  };
})();
