'use strict';

(function () {
  var load = function (onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('get', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
        for (var wiz in onLoad) {
          if (onLoad.hasOwnProperty(wiz)) {
            onLoad[wiz](xhr.response);
          }
        }
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания.');
    });
    xhr.timeout = 10000;

    xhr.send();
  };


  var save = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('post', URL);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200 && xhr.readyState === XMLHttpRequest.DONE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения.');
    });
    xhr.addEventListener('timeout', function () {
      onError('Истекло время ожидания.');
    });
    xhr.timeout = 10000;
    xhr.send(data);
  };


  window.backend = {
    load: load,
    save: save
  };
})();
