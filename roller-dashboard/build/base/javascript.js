var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var gulpif = require('gulp-if');
var paths = require('../paths');
var eslint = require('gulp-eslint');

gulp.task('es6', () => {
    return gulp.src(paths.source, { base: 'src' })
        .pipe(gulpif(!paths.isProduction, plumber()))
        .pipe(changed(paths.output, { extension: '.js' }))
        .pipe(gulpif(!paths.isProduction, eslint({ cache: true })))
        .pipe(gulpif(!paths.isProduction, eslint.format()))
        // .pipe(gulpif(!paths.isProduction, eslint.failAfterError()))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel())
        .pipe(sourcemaps.write('/sourcemaps'))
        .pipe(gulp.dest(paths.output));
});
