var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');

runSequence.options.ignoreUndefinedTasks = true;

gulp.task('move', () => {
    return gulp.src(paths.staticFiles, { base: 'src' })
        .pipe(gulp.dest(paths.output));
});

gulp.task('build', callback => {
    console.log('Build...');
    return runSequence('clean', ['sass', 'html', 'es6', 'move'], callback);
});
