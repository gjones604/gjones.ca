///// Plugin Includes /////
var gulp = require('gulp');
var path = require('path');
var uglify = require('gulp-uglifyes');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var fs = require('fs');

var paths = {
    sass: './assets/scss',
    js: './assets/js',
    css: './assets/css',
    twig: './templates'
}

var scriptsPath = 'assets/js/src/misc';

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('scripts', function () {
    var folders = getFolders(scriptsPath);
    if (folders.length === 0) return; // done(); // nothing to do!
    folders.map(function (folder) {
        return gulp.src(path.join(scriptsPath, folder, '/*.js'))
            .pipe(concat(folder + '.js'))
            .pipe(uglify())
            .pipe(rename(folder + '.min.js'))
            .pipe(gulp.dest(paths.js + '/dist'));
    });
});


// ##### GLOBAL JS #####
gulp.task('global-js', function () {
    return gulp.src([paths.js + '/src/global/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default', {
            verbose: true
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(paths.js + '/dist/'));
});


///// Compile Sass /////
gulp.task('sass', function () {
    return gulp.src(paths.sass + '/styles.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.css + '/'))
        .pipe(browserSync.stream())
});


///// Browser Sync /////
gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: "http://gjones.localhost",
        open: false,
    });
    gulp.watch(paths.sass + '/*.scss', ['sass']);
    gulp.watch(paths.sass + '/*/*.scss', ['sass']);
    gulp.watch(paths.js + '/src/global/*.js', ['global-js']).on('change', browserSync.reload);
    gulp.watch(paths.js + '/src/misc/**/*.js', ['scripts']).on('change', browserSync.reload);
});

//// SCSS-Lint ////
gulp.task('scss-lint', function () {
    return gulp.src(paths.sass + '/*/*.scss')
        .pipe(scsslint());
});

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['browser-sync']);