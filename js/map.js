'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var inputAddress = document.querySelector('#address');

  var START_COORDINATE = {
    LEFT: 570,
    TOP: 375,
    GAP: 32,
    ARROW_GAP: 87
  };

  var dataPins = [];

  var onSuccess = function (data) {
    dataPins = data;
  };

  var disableAdForm = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].setAttribute('disabled', true);
    }
  };

  disableAdForm();

  var unlockAdForm = function () {
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled');
    }
  };

  var activeMap = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.pin.renderPins(dataPins);
    unlockAdForm();
  };

  mapPinMain.addEventListener('mousedown', function () {
    if (event.which === 1) {
      activeMap();
      setAddressValue(START_COORDINATE.LEFT, START_COORDINATE.TOP, START_COORDINATE.GAP, START_COORDINATE.ARROW_GAP);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });


  var setAddressValue = function (pinX, pinY, shiftX, shiftY) {
    var inputAddressValue = '' + (pinX + shiftX) + ', ' + (pinY + shiftY) + '';
    inputAddress.setAttribute('value', inputAddressValue);
  };

  setAddressValue(START_COORDINATE.LEFT, START_COORDINATE.TOP, START_COORDINATE.GAP, START_COORDINATE.GAP);

  window.map = {
    adForm: adForm
  };

  window.load(onSuccess);
})();
