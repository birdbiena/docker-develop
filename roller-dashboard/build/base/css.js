var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var paths = require('../paths');

gulp.task('sass', () => {
    return gulp.src(paths.sass, { base: 'src' })
        .pipe(gulpif(!paths.isProduction, plumber()))
        .pipe(changed(paths.output, { extension: '.css' }))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('/sourcemaps'))
        .pipe(gulp.dest(paths.output));
});
