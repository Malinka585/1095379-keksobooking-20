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

  var clearDomElements = function (parentElement, tagElement) {
    var domElement = parentElement.querySelectorAll(tagElement);
    domElement.forEach(function (node) {
      if (!node.classList.contains('map__pin--main')) {
        node.parentNode.removeChild(node);
      }
    });
  };

  var dataPins = [];

  var onSuccess = function (data) {
    dataPins = data;
  };

  var housingType = document.querySelector('#housing-type');

  housingType.addEventListener('change', function () {
    var dataPinsCopy = dataPins.slice();
    clearDomElements(window.pin.mapPins, 'button');
    if (housingType.value !== 'any') {
      var dataPinsHousing = dataPinsCopy.filter(function (housingPins) {
        return housingPins.offer.type === housingType.value;
      });
      window.pin.renderPins(dataPinsHousing.slice(0, 5));
    } else {
      window.pin.renderPins(dataPinsCopy.slice(0, 5));
    }
  });

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
    window.pin.renderPins(dataPins.slice(0, 5));
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

  window.load(onSuccess);

  window.map = {
    adForm: adForm,
    dataPins: dataPins
  };

})();
