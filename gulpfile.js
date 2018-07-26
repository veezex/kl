'use strict';

var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    uglify      = require('gulp-uglify'),
    prefixer    = require('gulp-autoprefixer'),
    sass        = require('gulp-sass'),
    sourcemaps  = require('gulp-sourcemaps'),
    rigger      = require('gulp-rigger'),
    cssmin      = require('gulp-clean-css'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    rimraf      = require('rimraf'),
    replace     = require('gulp-replace'),
    svgstore    = require('gulp-svgstore'),
    svgmin      = require('gulp-svgmin'),
    inject      = require('gulp-inject'),
    pathmod     = require('path'),
    browserSync = require("browser-sync"),
    reload      = browserSync.reload;

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/images/',
        svgforcss: 'build/images/svg/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/[^_]*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html, а [^_] значит что нужно избегать файлов начинающихся с нижнего подчеркивания
        js: 'src/js/*.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/scss/[^_]*.scss',
        img: 'src/images/*.{jpg,jpeg,png}', 
        svg: 'src/images/*.svg',
        svgforcss: 'src/images/svg/*.svg', 
        fonts: 'src/fonts/**/*.*' //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.{scss,css}',
        img: 'src/images/*.*',
        fonts: 'src/fonts/*.*',
        svgforcss: 'src/images/svg/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "kp"
};

gulp.task('internalsvg', function () {
    gulp.src('src/images/*.svg')
      .pipe(svgstore())
      .pipe(gulp.dest('build/images'));
});

gulp.task('externalsvg', function () {
    function fileContents (filePath, file) {
      return file.contents.toString('utf8')
    };
    var svgs = gulp
      .src('src/images/*.svg')
      .pipe(svgstore({ inlineSvg: true }));
    gulp.src('src/_svg.html')
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest('src'));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        // .pipe(gulp.dest(path.wp.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наши *.scss
        .pipe(rigger()) //Прогоним через rigger
        // .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer({
            browsers: ['last 4 versions']
        })) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            /*svgoPlugins: [
                {removeViewBox: false},
                {removeUselessStrokeAndFill: false},
                {removeUselessDefs: false},
                {cleanupIDs: false},
                {minifyStyles: false}
            ],*/
            // use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('copysvg', function() {
    gulp.src(path.src.svgforcss)
        .pipe(gulp.dest(path.build.svgforcss));
});

gulp.task('copyjson', function() {
    gulp.src('./src/js/**/*.json')
        .pipe(gulp.dest('build/js/'))
});

gulp.task('build', [
    'internalsvg',
    'externalsvg',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'copyjson',
    'copysvg'
    // 'svgstore'
    // 'copysvg',
    // 'copycss'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
