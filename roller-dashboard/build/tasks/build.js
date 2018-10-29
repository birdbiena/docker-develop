var gulp = require('gulp');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');
var htmlMin = require('gulp-htmlmin');
var ngHtml2Js = require("gulp-ng-html2js");
var gettext = require('gulp-angular-gettext');

var paths = require('../paths');


var htmlMinOptions = {
  collapseWhitespace: true
};
var html2JsOptions = {
  template: "import angular from 'angular';\n" +
    "export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n" +
    "   $templateCache.put('<%= template.url %>',\n    '<%= template.prettyEscapedContent %>');\n" +
    "}]);\n"
};

gulp.task('sass', function () {
  return gulp.src(paths.sass, { base: 'src' })
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.css'}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.output))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('es6', function () {
  return gulp.src(paths.source, { base: 'src' })
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.js' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(sourcemaps.write('/sourcemaps'))
    .pipe(gulp.dest(paths.output));
});

gulp.task('html', function () {
  return gulp.src(paths.templates, { base: 'src' })
    .pipe(plumber())
    .pipe(changed(paths.output, { extension: '.html' }))
    // .pipe(htmlMin(htmlMinOptions))
    // .pipe(ngHtml2Js(html2JsOptions))
    // .pipe(babel())
    .pipe(gulp.dest(paths.output));
});

gulp.task('move', function () {
  return gulp.src(paths.staticFiles, { base: 'src' })
    .pipe(gulp.dest(paths.output));
});

// gulp.task('pot', function () {
//   return gulp.src(paths.templates, { base: 'src' })
//       .pipe(gettext.extract('po/template.pot', {
//           // options to pass to angular-gettext-tools...
//       }))
//       .pipe(gulp.dest(paths.output));
// });

// gulp.task('translations', function () {
// return gulp.src('po/**/*.po')
//   .pipe(gettext.compile({
//       // options to pass to angular-gettext-tools...
//       format: 'javascript'
//       }))
//   .pipe(gulp.dest('dev/translations/'));
// });

gulp.task('build', function (callback) {
  console.log('build...');
  return runSequence(
    'clean',
    ['sass', 'html', 'es6', 'move'],
    callback
  );
});
