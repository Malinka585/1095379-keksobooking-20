'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');

  var inputAddress = document.querySelector('#address');

  var START_COORDINATE = {
    LEFT: 570,
    TOP: 375,
    GAP: 32,
    ARROW_GAP: 87
  };

  var X_MAX = document.querySelector('.map').getBoundingClientRect().width - START_COORDINATE.GAP;
  var X_MIN = (-START_COORDINATE.GAP);
  var Y_MAX = 630;
  var Y_MIN = 130;


  window.dataPins = [];

  var onSuccess = function (data) {
    window.dataPins = data;
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
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.clearDomElements(window.pin.mapPins, 'button', 'map__pin--main');
    window.pin.renderPins(window.dataPins.slice(0, 5));
    unlockAdForm();
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mapPinMainTop = (mapPinMain.offsetTop - shift.y);
        var mapPinMainLeft = (mapPinMain.offsetLeft - shift.x);

        if (mapPinMainTop >= Y_MIN && mapPinMainTop <= Y_MAX && mapPinMainLeft >= X_MIN && mapPinMainLeft <= X_MAX) {
          mapPinMain.style.top = mapPinMainTop + 'px';
          mapPinMain.style.left = mapPinMainLeft + 'px';
          setAddressValue(mapPinMainLeft, mapPinMainTop, START_COORDINATE.GAP, START_COORDINATE.ARROW_GAP);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        activeMap();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeMap();
    }
  });

  var setAddressValue = function (pinX, pinY, shiftX, shiftY) {
    var inputAddressValue = '' + (pinX + shiftX) + ', ' + (pinY + shiftY) + '';
    inputAddress.value = inputAddressValue;
    return inputAddress.value;
  };

  var getStarCoordinate = function () {
    setAddressValue(START_COORDINATE.LEFT, START_COORDINATE.TOP, START_COORDINATE.GAP, START_COORDINATE.GAP);
  };

  getStarCoordinate();

  window.load(onSuccess);

  window.map = {
    adForm: adForm,
    mapFilters: mapFilters,
    START_COORDINATE: START_COORDINATE,
    mapPinMain: mapPinMain,
    getStarCoordinate: getStarCoordinate,
    disableAdForm: disableAdForm
  };
})();
