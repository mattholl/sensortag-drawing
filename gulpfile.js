/*jshint node: true*/
'use strict';
var gulp  = require('gulp'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    del = require('del'),
    livereload = require('gulp-livereload'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    gutil = require('gulp-util');

gulp.task('jshint', function() {
    return gulp.src('./src/js/**/*.js')
    // .pipe(plumber({
    //     errorHandler: onError
    // }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
    // .pipe(notify({ message: 'JS Hinting task complete' }));
});

// mv 404 files to build etc
// mv index.html in build
// also move other static files
gulp.task('move-hbs-views', function() {
    gulp.src('src/views/**/*').pipe(gulp.dest('build/views'));
});

// Styles
gulp.task('sass', function () {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass({
            includePaths : ['_/sass/'],
            outputStyle: 'compressed',
            sourceComments: 'map'
        }))
        // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('build/css'));
        // .pipe(rename({suffix: '.min'}))
        // .pipe(minifycss())
        // .pipe(gulp.dest('build/css'));
        // .pipe(notify({ message: 'Styles task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['build/css', 'build/js', 'build/img', 'build/views'], cb);
});


    gulp.task('watch', ['sass'], function() {

    // Watch .scss files
    gulp.watch('src/**/*', ['sass']);

    livereload.listen();

    // Watch .js files
    // gulp.watch('src/scripts/**/*.js', ['scripts']);
    var bundler = watchify(browserify('./src/js/main.js', watchify.args));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./build/js'))
            // .pipe(notify({ message: 'browserify task complete' }))
            .pipe(livereload());
    }

    return rebundle();
});

gulp.task('default', ['clean'], function() {
    // gulp.start('move-hbs-views', 'sass');
    gulp.start('sass');
});