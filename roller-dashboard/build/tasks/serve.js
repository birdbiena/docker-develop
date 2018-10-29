var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var paths = require('../paths');

var proxyContext = [
  '/ecas/auth',
  '/ecas/api',
  '/ecas/static/horizon',
  '/ecas/media'
];

var proxyOptions = {
  target: 'http://roller-be:8888',
  changeOrigin: true,
  xfwd: true,
  autoRewrite: true
};


var serverOptions = {
  open: false,
  ui: false,
  notify: false,
  ghostMode: false,
  port: 9000,
  server: {
		baseDir: ['./'],
		index: "index.html",
		routes: {
			'/system.config.js': './system.config.js',
			'/jspm_packages': './jspm_packages',
			'/': './dev'
		},
		middleware: [
			proxy(proxyContext, proxyOptions),
			historyApiFallback()
		]
  }
};


gulp.task('serve', ['watch'], function (done) {

 browserSync.init(serverOptions, done);

});
