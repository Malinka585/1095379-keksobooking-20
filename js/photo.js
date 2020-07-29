'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');

  var uloadPhoto = function (fileInput) {
    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();
        fileInput.setCustomValidity('');

        reader.readAsDataURL(file);
      } else {
        fileInput.setCustomValidity('Загрузить можно только изображения форматов: GIF, JPEG, PNG');
      }
    });
  };

  uloadPhoto(fileChooserPhoto);
  uloadPhoto(fileChooserAvatar);
})();
