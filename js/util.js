'use strict';

window.util = (function () {

  var KEY_CODE = {

    ENTER: 13,
    ESC: 27

  };

  return {

    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE.ENTER) {
        action();
      }
    },

    clearDomElements: function (parentElement, tagElement, exception) {
      var domElement = parentElement.querySelectorAll(tagElement);
      domElement.forEach(function (node) {

        if (!node.classList.contains(exception)) {
          node.parentNode.removeChild(node);
        }
      });
    }

  };

})();
