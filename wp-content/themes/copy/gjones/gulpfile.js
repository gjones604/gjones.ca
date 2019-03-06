///// Plugin Includes /////
var gulp = require('gulp');
var uglify = require('gulp-uglifyes');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
//reload = browserSync.reload,



var paths = {
    sass: './assets/scss',
    js: './assets/js',
    css: './assets/css',
    twig: './templates'
}

///// Compile/Validate JS /////
gulp.task('js', function () {
    return gulp.src([paths.js + '/src/*.js'])
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify({
            mangle: false,
        }))
        .pipe(gulp.dest( paths.js + '/dist/'));
});


///// Compile Sass /////
gulp.task('sass', function () {
  return gulp.src(paths.sass + '/styles.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(sass( {outputStyle: 'compressed'} ))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(concat('styles.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.css + '/'))
      .pipe(browserSync.stream())
});


///// Get PHP /////
// gulp.task('twig', function () {
//     gulp.src('./templates/*.twig')
//     .pipe(gulp.dest('./'))
// });



// gulp.task('watch', function(){
//     gulp.watch('./assets/scss/*.scss', ['sass']);
//     gulp.watch('./assets/scss/*/*.scss', ['sass']);
//     gulp.watch('./assets/js/src/*.js', ['js']);
// });


///// Browser Sync /////
gulp.task('browser-sync', function(){
    browserSync.init({
        proxy: "http://gjones.localhost",
        open: false,
    });
    gulp.watch(paths.twig + '/*.twig');
    gulp.watch(paths.sass + '/*.scss', ['sass']);
    gulp.watch(paths.sass + '/*/*.scss', ['sass']);
    gulp.watch(paths.js + '/src/*.js', ['js']).on('change', browserSync.reload);
});

//// SCSS-Lint ////
gulp.task('scss-lint', function () {
    return gulp.src(paths.sass + '/*/*.scss')
        .pipe(scsslint());
})

//////////////////////////////
// Default Task
//////////////////////////////
gulp.task('default', ['browser-sync']);