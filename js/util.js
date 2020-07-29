'use strict';

window.util = (function () {

  var KeyCode = {

    ENTER: 13,
    ESC: 27

  };

  return {

    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    },

    clearDomElements: function (parentElement, tagElement, exception) {
      var domElements = parentElement.querySelectorAll(tagElement);
      domElements.forEach(function (node) {

        if (!node.classList.contains(exception)) {
          node.parentNode.removeChild(node);
        }
      });
    }

  };

})();
