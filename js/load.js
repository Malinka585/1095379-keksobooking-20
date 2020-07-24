'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var REQUEST_TIMEOUT = 10000;
  var xhr;

  var getDataServer = function (onSuccess, onError) {
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;
  };

  window.load = function (onSuccess, onError) {
    getDataServer(onSuccess, onError);

    xhr.open('GET', URL);
    xhr.send();
  };

  window.post = function (data, onSuccess, error) {
    getDataServer(onSuccess, error);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
})();
