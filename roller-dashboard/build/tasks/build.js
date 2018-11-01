const gulp = require('gulp'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint');

const paths = require('../paths');

gulp.task('sass', () => {
    return gulp
        .src(paths.sass, { base: 'src' })
        .pipe(plumber())
        .pipe(changed(paths.output, { extension: '.css' }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.output))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('es6', () => {
    return gulp
        .src(paths.source, { base: 'src' })
        .pipe(plumber())
        .pipe(changed(paths.output, { extension: '.js' }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(babel())
        .pipe(sourcemaps.write('/sourcemaps'))
        .pipe(gulp.dest(paths.output));
});

gulp.task('html', () => {
    return gulp
        .src(paths.templates, { base: 'src' })
        .pipe(plumber())
        .pipe(changed(paths.output, { extension: '.html' }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('move', () => {
    return gulp
        .src(paths.staticFiles, { base: 'src' })
        .pipe(plumber())
        .pipe(gulp.dest(paths.output));
});

gulp.task('build', callback => {
    console.log('build...');
    return runSequence('clean', ['sass', 'html', 'es6', 'move'], callback);
});
