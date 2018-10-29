var gulp = require('gulp');
var karma = require('karma');
var paths = require('../paths');

gulp.task('test', [], function(done) {
  new karma.Server({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, (exitCode) => {
        console.log(exitCode);
        done();
  }).start();
});
