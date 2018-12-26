var gulp = require('gulp');
var requireDir = require('require-dir');
var path = require('./build/paths');
var isProduction = 'build/development/';

path.isProduction = gulp.env.type === 'production';
isProduction = path.isProduction ? 'build/production/' : 'build/development/';

requireDir('build/base/');
requireDir(isProduction);
