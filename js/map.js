'use strict';

(function () {
  var StartCoordinate = {
    LEFT: 570,
    TOP: 375,
    GAP: 32,
    ARROW_GAP: 87
  };

  var Y_MAX = 543;
  var Y_MIN = 43;
  var xMax = document.querySelector('.map').getBoundingClientRect().width - StartCoordinate.GAP;
  var xMin = (-StartCoordinate.GAP);

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterSelects = mapFilters.querySelectorAll('select');
  var mapFilterCheckboxes = mapFilters.querySelectorAll('input[type=checkbox]');

  var inputAddress = document.querySelector('#address');

  window.dataPins = [];

  var onSuccess = function (data) {
    window.dataPins = data;
  };

  var disableAdForm = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', true);
    }
  };

  disableAdForm(adFormFieldsets);
  disableAdForm(mapFilterSelects);
  disableAdForm(mapFilterCheckboxes);

  var unlockAdForm = function (formElements) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  var activeMap = function () {
    window.card.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.clearDomElements(window.pin.mapLabels, 'button', 'map__pin--main');
    window.pin.renderLabels(window.dataPins.slice(0, 5));
    unlockAdForm(adFormFieldsets);
    unlockAdForm(mapFilterSelects);
    unlockAdForm(mapFilterCheckboxes);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var getCoordinate = function (actionEvt, yGap) {

        var shift = {
          x: startCoords.x - actionEvt.clientX,
          y: startCoords.y - actionEvt.clientY
        };

        startCoords = {
          x: actionEvt.clientX,
          y: actionEvt.clientY
        };

        var mapPinMainTop = (mapPinMain.offsetTop - shift.y);
        var mapPinMainLeft = (mapPinMain.offsetLeft - shift.x);

        if (mapPinMainTop >= Y_MIN && mapPinMainTop <= Y_MAX && mapPinMainLeft >= xMin && mapPinMainLeft <= xMax) {
          mapPinMain.style.top = mapPinMainTop + 'px';
          mapPinMain.style.left = mapPinMainLeft + 'px';
          setAddressValue(mapPinMainLeft, mapPinMainTop, StartCoordinate.GAP, yGap);
        }
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (mapPinMain.classList.contains('pinFlag')) {
          getCoordinate(moveEvt, StartCoordinate.ARROW_GAP);
        } else {
          getCoordinate(moveEvt, StartCoordinate.GAP);
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (!mapPinMain.classList.contains('pinFlag')) {
          activeMap();
        }

        getCoordinate(upEvt, StartCoordinate.ARROW_GAP);
        mapPinMain.classList.add('pinFlag');

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
    setAddressValue(StartCoordinate.LEFT, StartCoordinate.TOP, StartCoordinate.GAP, StartCoordinate.GAP);
  };

  getStarCoordinate();

  window.load(onSuccess);

  window.map = {
    adForm: adForm,
    mapFilters: mapFilters,
    StartCoordinate: StartCoordinate,
    mapPinMain: mapPinMain,
    getStarCoordinate: getStarCoordinate,
    disableAdForm: disableAdForm,
    adFormFieldsets: adFormFieldsets,
    mapFilterSelects: mapFilterSelects,
    mapFilterCheckboxes: mapFilterCheckboxes
  };
})();
