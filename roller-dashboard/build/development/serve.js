var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');
var proxy = require('http-proxy-middleware');
var runSequence = require('run-sequence');
var paths = require('../paths');

var proxyContext = [
    '/ecas/auth',
    '/ecas/api',
    '/ecas/static/horizon',
    '/ecas/media'
];

var proxyOptions = {
    target: 'http://127.0.0.1:8888', // local development model
    // target: 'http://roller-be:8888', // docker-composer development mode
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

var watchOptions = {
    ignoreInitial: true
};

gulp.task('serve', ['build'], done => {
    browserSync.init(serverOptions, done);

    browserSync.watch(paths.sass, watchOptions, (event, file) => {
        runSequence('sass', () => {
            console.log('File ' + file + ' was ' + event + ', running tasks...');
            browserSync.reload('*.css');
        });
    });

    browserSync.watch(paths.source, watchOptions, (event, file) => {
        runSequence('es6', () => {
            console.log('File ' + file + ' was ' + event + ', running tasks...');
            browserSync.reload();
        });
    });

    browserSync.watch(paths.templates, watchOptions, (event, file) => {
        runSequence('html', () => {
            console.log('File ' + file + ' was ' + event + ', running tasks...');
            browserSync.reload();
        });
    });

    browserSync.watch(paths.staticFiles, watchOptions, (event, file) => {
        runSequence('move', () => {
            console.log('File ' + file + ' was ' + event + ', running tasks...');
            browserSync.reload();
        });
    });
});
