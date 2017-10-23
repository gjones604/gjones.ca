///// Plugin Includes /////
var gulp = require('gulp'),
uglify = require('gulp-uglify'),
plumber = require('gulp-plumber'),
concat = require('gulp-concat'),
jshint = require('gulp-jshint'),
autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync'),
reload = browserSync.reload,
sass = require('gulp-sass');

///// Compile/Validate JS /////
gulp.task('js', function () {
    gulp.src('./assets/js/src/scripts.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/dist/'))
});

///// Compile Sass /////
gulp.task('sass', function () {
    gulp.src('./assets/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass( {outputStyle: 'compressed'} ))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream())
});

/*
///// Get PHP /////
gulp.task('php', function () {
    gulp.src('./php/*.php')
    .pipe(gulp.dest('./'))
});
*/

///// Browser Sync /////
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "http://localhost/gjones.dev",
        notify: false
    });
    gulp.watch('./assets/scss/*.scss', ['sass']);
    gulp.watch('./assets/js/src/scripts.js', ['js']).on('change', browserSync.reload);
    //gulp.watch('./php/*.php', ['php']).on('change', browserSync.reload);
});

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['browser-sync']);