///// Plugin Includes /////
var gulp = require('gulp');
//var merge = require('merge-stream');
//var babel = require('gulp-babel');
var uglify = require('gulp-uglifyes');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
//var browserSync = require('browser-sync');
var sass = require('gulp-sass');
//reload = browserSync.reload,

///// Compile/Validate JS /////
gulp.task('js', function () {
    return gulp.src(['./assets/js/src/ajax.js', './assets/js/src/scripts.js'/*, './assets/js/src/threejs.js'*/])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({
            mangle: false,
        }))
        .pipe(gulp.dest('./assets/js/dist/'));
});

///// Compile Sass /////
gulp.task('sass', function () {
    gulp.src('./assets/scss/styles.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass( {outputStyle: 'compressed'} ))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('./assets/css/'))
        //.pipe(browserSync.stream())
});


///// Get PHP /////
gulp.task('php', function () {
    gulp.src('./php/*.php')
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
    gulp.watch('./assets/scss/*.scss', ['sass']);
    gulp.watch('./assets/js/src/*.js', ['js']);
});
/*
///// Browser Sync /////
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "http://localhost/gjones.dev",
        notify: false
    });
    gulp.watch('./assets/scss/*.scss', ['sass']);
    gulp.watch('./assets/js/src/scripts.js', ['js']).on('change', browserSync.reload);
    gulp.watch('./php/*.php', ['php']).on('change', browserSync.reload);
});
*/
//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['watch']);