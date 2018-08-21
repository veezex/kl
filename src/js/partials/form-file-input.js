//dropzone-previews
$('.dropzone-images').each(function() {
    var area = $(this);
    var param = area.data('param');

    area.addClass("dropzone").dropzone({
        addRemoveLinks: true, 
        acceptedFiles: 'image/*',
        clickable: true,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        maxFiles: area.data('maxfiles'), // максимальное кол-во файлов
        createImageThumbnails: true,
        paramName: 'file', // The name that will be used to transfer the file
        url: area.data('upload'),
        dictRemoveFile: 'Удаление фотографии',
        dictDefaultMessage: 'Перетащите сюда фотографии или кликните для загрузки файлов<br><br>\
            (максимум ' + area.data('maxfiles') + ' фотографий)',
        dictFileTooBig: 'Превышен допустимый размер файла: {{maxFilesize}} Мб',
        dictMaxFilesExceeded: 'Превышено максимальное кол-во фотографий для загрузки: {{maxFiles}}',
        dictInvalidFileType: 'Вы не можете добавить файлы этого типа',
        maxFilesize: 2, // mb
        success: function(file, response) {
            var pe = $(file.previewElement);

            response.added.forEach(function(id) {
                pe.append('<input type="hidden" name="' + param + '[]" value="' + id + '">');
            });
        }
    });
});