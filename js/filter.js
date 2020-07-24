'use strict';

(function () {

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
      return (pin.offer.price >= 10000 && pin.offer.price < 50000);
    } else if (housingPrice.value === 'low') {
      return (pin.offer.price < 10000);
    } else if (housingPrice.value === 'high') {
      return (pin.offer.price >= 50000);
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
    window.util.clearDomElements(window.pin.mapPins, 'button', 'map__pin--main');

    var dataFilterPins = dataPinsCopy.filter(function (itemPin) {
      return getFilter(itemPin);
    });
    window.pin.renderPins(dataFilterPins.slice(0, 5));
  };

  var onHousingTypeTimeOutChange = window.debounce(onFilterChange);

  window.map.mapFilters.addEventListener('change', onHousingTypeTimeOutChange);
})();

