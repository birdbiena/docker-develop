var gulp = require('gulp');
var runSequence = require('run-sequence');
var routeBundler = require('systemjs-route-bundler');
var insert = require('gulp-insert');
var merge2 = require('merge2');
var concatFile = require('gulp-concat');
var replace = require('gulp-replace-task');
var filter = require('gulp-filter');
var uglify = require('gulp-uglify');
var paths = require('../paths');


gulp.task('cache-bust', function() {
    var cacheBust = "var systemLocate = System.locate; System.locate = function(load) { var cacheBust = '?bust=' + " + Math.round(new Date() / 1000) + "; return Promise.resolve(systemLocate.call(this, load)).then(function(address) { if (address.indexOf('bust') > -1 || address.indexOf('css') > -1 || address.indexOf('json') > -1) return address; return address + cacheBust; });}\n"
    return gulp.src(paths.releasePath + 'app/app.js')
        .pipe(insert.prepend("window.prod = true;\n"))
        .pipe(insert.prepend(cacheBust))
        .pipe(gulp.dest(paths.releasePath + 'app'));
});

gulp.task('inline-systemjs', function() {
    var systemjs = gulp.src('./jspm_packages/system.js');

    var config = gulp.src('./system.config.js')
        .pipe(replace({
            usePrefix: false,
            patterns: [{
                match: 'baseURL: "/"',
                replacement: 'baseURL: "' + paths.prodBaseURL + '"'
            }, {
                match: 'dev/',
                replacement: ""
            }]
        }))
        .pipe(uglify());

    var appMain = gulp.src(paths.releasePath + 'app/app.js');

    return merge2(systemjs, config, appMain)
        .pipe(concatFile('app/app.js'))
        .pipe(gulp.dest(paths.releasePath));
});

gulp.task('bundle', function() {
    var routes = require('../../dev/app/routes.json');
    routes = routes.map(function(r) {
        return r.src;
    });

    var config = {
        dest: 'dev',
        main: 'app/app.js',
        destMain: 'dev/app',
        routes: routes,
        bundleThreshold: 0.6,
        jspmConfigPath: './system.config.js',
        sourceMaps: false,
        minify: true,
        mangle: true,
        verboseOutput: true,
        ignoredPaths: [
            'jspm_packages',
            'npm:',
            'github:'
        ]
    };

    return routeBundler.build(config);
});

gulp.task('collect-bundle-files', function() {
    var jsFilter = filter('**/*.js', {
        restore: true
    });

    return gulp.src(paths.releaseFiles, {
            base: 'dev'
        })
        .pipe(jsFilter)
        .pipe(replace({
            usePrefix: false,
            patterns: [{
                match: /\/?dev\/(.+?\/|)assets/g,
                replacement: paths.prodBaseURL + 'assets'
            }, {
                match: /(\.\/|\/|)assets\/img/g,
                replacement: paths.prodBaseURL + 'assets/img'
            }, {
                match: /\/\*#\s+sourceMappingURL=.*?\s+\*\//g,
                replacement: ''
            }]
        }))
        .pipe(gulp.dest(paths.releasePath))
        .pipe(jsFilter.restore)
        .pipe(gulp.dest(paths.releasePath));
});

gulp.task('replaceJSLink', function() {
    return gulp.src(paths.releasePath + 'index.html')
        .pipe(replace({
            usePrefix: false,
            patterns: [{
                match: /\/?dev\/(.+?\/|)assets/g,
                replacement: paths.prodBaseURL + 'assets'
            }, {
                match: '<script src="jspm_packages/system.js"></script>',
                replacement: '<!-- <script src="jspm_packages/system.js"></script> -->'
            }, {
                match: '<script src="system.config.js"></script>',
                replacement: '<!-- <script src="system.config.js"></script> -->'
            }, {
                match: '<!-- <script src="app/app.js?bust={{date}}"></script> -->',
                replacement: '<script src="' + paths.prodBaseURL + 'app/app.js?bust={{date}}"></script>'
            }, {
                match: '{{date}}',
                replacement: Math.round(new Date() / 1000)
            }]
        }))
        .pipe(gulp.dest(paths.releasePath));
});

gulp.task('release', function(callback) {
    return runSequence(
        'build',
        'bundle',
        'collect-bundle-files',
        'cache-bust',
        'inline-systemjs',
        'replaceJSLink',
        callback
    );
});
