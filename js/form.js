'use strict';

(function () {
  var MAX_ROOM_NUMBER = 100;
  var MIN_CAPACITY = 0;

  var HousingPrice = {
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

  var adFormFeatures = window.map.adForm.querySelector('.features');
  var adFormCheckboxes = adFormFeatures.querySelectorAll('input[type=checkbox]');
  var filterCheckboxes = window.map.mapFilters.querySelectorAll('input[type=checkbox]');

  var ressetCheckboxes = function (checkboxСollection) {
    for (var i = 0; i < checkboxСollection.length; i++) {
      checkboxСollection[i].removeAttribute('checked');
    }
  };

  adFormFeatures.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      var target = evt.target;
      if (target.tagName !== 'INPUT') {
        return;
      }

      window.filter.activeCheckbox(target);
    });
  });

  adFormFeatures.addEventListener('click', function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.tagName !== 'LABEL') {
      return;
    }

    var featureCheckbox = adFormFeatures.querySelector('#' + target.getAttribute('for'));
    window.filter.activeCheckbox(featureCheckbox);
  });

  var getMinPrice = function (minPrice) {
    price.placeholder = minPrice;
    price.setAttribute('min', minPrice);
    price.value = '';
  };

  getMinPrice(HousingPrice.FLAT);

  var validateHousingPrice = function () {
    var typeValue = type.value;

    if (typeValue === 'bungalo') {
      getMinPrice(HousingPrice.BUNGALO);
    } else if (typeValue === 'flat') {
      getMinPrice(HousingPrice.FLAT);
    } else if (typeValue === 'house') {
      getMinPrice(HousingPrice.HOUSE);
    } else if (typeValue === 'palace') {
      getMinPrice(HousingPrice.PALACE);
    }
  };

  type.addEventListener('change', function () {
    validateHousingPrice();
  });

  var validateGuestCount = function () {
    var capacityValue = Number(capacity.value);
    var roomNumberValue = Number(roomNumber.value);

    if (capacityValue > roomNumberValue) {
      roomNumber.setCustomValidity('Выберете большее количество комнат');
    } else if (roomNumberValue === MAX_ROOM_NUMBER && capacityValue !== MIN_CAPACITY) {
      roomNumber.setCustomValidity('100 комнат не для гостей');
    } else if (roomNumberValue !== MAX_ROOM_NUMBER && capacityValue === MIN_CAPACITY) {
      capacity.setCustomValidity('Выберете 100 комнат');
    } else {
      roomNumber.setCustomValidity('');
      capacity.setCustomValidity('');
    }
  };

  validateGuestCount();

  capacity.addEventListener('change', function () {
    validateGuestCount();
  });

  roomNumber.addEventListener('change', function () {
    validateGuestCount();
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
    window.map.mapPinMain.style.left = window.map.StartCoordinate.LEFT + 'px';
    window.map.mapPinMain.style.top = window.map.StartCoordinate.TOP + 'px';
    window.map.mapPinMain.classList.remove('pinFlag');
    window.map.adForm.reset();
    window.map.mapFilters.reset();
    avatar.value = null;
    fileImage.value = null;
    price.placeholder = startPrice;
    window.card.map.classList.add('map--faded');
    window.util.clearDomElements(window.pin.mapLabels, 'button', 'map__pin--main');
    window.map.getStarCoordinate();
    window.map.adForm.classList.add('ad-form--disabled');
    window.map.disableAdForm(window.map.adFormFieldsets);
    window.map.disableAdForm(window.map.mapFilterSelects);
    window.map.disableAdForm(window.map.mapFilterCheckboxes);
    getMinPrice(HousingPrice.FLAT);
    ressetCheckboxes(adFormCheckboxes);
    ressetCheckboxes(filterCheckboxes);
    validateGuestCount();
  };

  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.form = {
    resetForm: resetForm,
    getMinPrice: getMinPrice,
    housingPriceFlat: HousingPrice.FLAT
  };
})();
