'use strict';

(function () {

  var roomNumber = window.map.adForm.querySelector('#room_number');
  var capacity = window.map.adForm.querySelector('#capacity');
  var adFormSubmit = window.map.adForm.querySelector('.ad-form__submit');
  var capacityValue = Number(capacity.value);
  var roomNumberValue = Number(roomNumber.value);

  roomNumber.addEventListener('change', function () {
    roomNumberValue = Number(roomNumber.value);
  });

  capacity.addEventListener('change', function () {
    capacityValue = Number(capacity.value);
  });

  var validateGasteCount = function () {
    if (capacityValue > roomNumberValue) {
      roomNumber.setCustomValidity('Выберете большее количество комнат');
    } else if (roomNumberValue === 100 && capacityValue !== 0) {
      roomNumber.setCustomValidity('100 комнат не для гостей');
    } else if (roomNumberValue !== 100 && capacityValue === 0) {
      capacity.setCustomValidity('Выберете 100 комнат');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  adFormSubmit.addEventListener('click', function () {
    validateGasteCount();
  });
})();