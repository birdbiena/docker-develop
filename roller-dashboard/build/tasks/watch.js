var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

var watch = require('gulp-watch');

var paths = require('../paths');


function changed(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('watch', ['build'], function () {
    watch(paths.source).on('change', event => {
        changed(event);
        runSequence('es6', 'reload');
    });

    watch(paths.templates).on('change', event => {
        changed(event);
        runSequence('html', 'reload');
    });

    watch(paths.staticFiles).on('change', event => {
        changed(event);
        runSequence('move', 'reload');
    });

    watch(paths.sass, ['sass']).on('change', event => {
        changed(event);
    });
});
