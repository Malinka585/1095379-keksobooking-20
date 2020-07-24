'use strict';

(function () {
  var main = document.querySelector('main');

  var messageWindow = function (result) {
    var onWindowClick = function () {
      window.util.clearDomElements(main, '.' + result);
      document.removeEventListener('keydown', onWindowClick);
    };

    var onMessageEscPress = function (event) {
      window.util.isEscEvent(event, closeMessage);
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
    messageWindow('success');
    window.form.resetForm();
  };

  var onError = function () {
    messageWindow('error');
  };

  window.map.adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.post(new FormData(window.map.adForm), onSuccess, onError);
  });
})();
