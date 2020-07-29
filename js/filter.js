'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var MAX_HOUSING_PRICE = 50000;
  var MIN_HOUSING_PRICE = 10000;
  var lastTimeout;
  var housingType = window.map.mapFilters.querySelector('#housing-type');
  var housingPrice = window.map.mapFilters.querySelector('#housing-price');
  var housingRooms = window.map.mapFilters.querySelector('#housing-rooms');
  var housingGuests = window.map.mapFilters.querySelector('#housing-guests');
  var housingFeatures = window.map.mapFilters.querySelector('#housing-features');


  var changeHousing = function (pin) {
    if (housingType.value !== 'any') {
      return pin.offer.type === housingType.value;
    } else {
      return true;
    }
  };

  var changePrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    } else if (housingPrice.value === 'middle') {
      return (pin.offer.price >= MIN_HOUSING_PRICE && pin.offer.price < MAX_HOUSING_PRICE);
    } else if (housingPrice.value === 'low') {
      return (pin.offer.price < MIN_HOUSING_PRICE);
    } else if (housingPrice.value === 'high') {
      return (pin.offer.price >= MAX_HOUSING_PRICE);
    }
    return false;
  };

  var changeRooms = function (pin) {
    if (housingRooms.value === 'any') {
      return true;
    }
    return pin.offer.rooms === Number(housingRooms.value);
  };

  var changeGuests = function (pin) {
    if (housingGuests.value === 'any') {
      return true;
    }
    return pin.offer.guests === Number(housingGuests.value);
  };


  var changeFeatures = function (pin) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return pin.offer.features.includes(element.value);
    });
  };


  var getFilter = function (pin) {
    return changeHousing(pin) && changePrice(pin) && changeRooms(pin) && changeGuests(pin) && changeFeatures(pin);
  };

  var onFilterChange = function () {
    var dataPinsCopy = window.dataPins.slice();
    window.util.clearDomElements(window.pin.mapLabels, 'button', 'map__pin--main');

    var dataFilterPins = dataPinsCopy.filter(function (itemPin) {
      return getFilter(itemPin);
    });

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      window.pin.renderLabels(dataFilterPins.slice(0, 5));
    }, DEBOUNCE_INTERVAL);
  };

  var activeCheckbox = function (checkbox) {
    if (!checkbox.getAttribute('checked', true)) {
      checkbox.setAttribute('checked', true);
    } else {
      checkbox.removeAttribute('checked');
    }
  };

  var checkHousingFeatures = function (checkbox) {
    activeCheckbox(checkbox);
    onFilterChange();
  };

  var onFilterCheckboxClick = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.tagName !== 'LABEL') {
      return;
    }

    var featureCheckbox = housingFeatures.querySelector('#' + target.getAttribute('for'));
    checkHousingFeatures(featureCheckbox);
  };


  var onFilterCheckboxEnterDown = function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      var target = evt.target;
      if (target.tagName !== 'INPUT') {
        return;
      }

      checkHousingFeatures(target);
    });
  };

  housingFeatures.addEventListener('click', onFilterCheckboxClick);
  housingFeatures.addEventListener('keydown', onFilterCheckboxEnterDown);
  window.map.mapFilters.addEventListener('change', onFilterChange);

  window.filter = {
    activeCheckbox: activeCheckbox
  };
})();

