'use strict';

(function () {
  var main = document.querySelector('main');

  var showMessageWindow = function (result) {
    var onWindowClick = function (evt) {
      var target = evt.target;
      if (target.classList.contains(result + '__message')) {
        return;
      }
      window.util.clearDomElements(main, '.' + result);
      document.removeEventListener('keydown', onWindowClick);
    };

    var onMessageEscPress = function (evt) {
      window.util.isEscEvent(evt, closeMessage);
      document.removeEventListener('keydown', onMessageEscPress);
    };

    var successTemplate = document.querySelector('#' + result).content.querySelector('.' + result);
    var element = successTemplate.cloneNode(true);
    main.appendChild(element);

    var closeMessage = function () {
      window.util.clearDomElements(main, '.' + result);
    };

    document.addEventListener('keydown', onMessageEscPress);
    document.addEventListener('click', onWindowClick);
  };

  var onSuccess = function () {
    showMessageWindow('success');
    window.form.resetForm();
    window.card.closeCard();
    window.form.getMinPrice(window.form.housingPriceFlat);
  };

  var onError = function () {
    showMessageWindow('error');
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.post(new FormData(window.map.adForm), onSuccess, onError);
  };

  window.map.adForm.addEventListener('submit', onFormSubmit);
})();
