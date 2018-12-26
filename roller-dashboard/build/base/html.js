var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var babel = require('gulp-babel');
var htmlMin = require('gulp-htmlmin');
var ngHtml2Js = require('gulp-ng-html2js');
var gulpif = require('gulp-if');
var paths = require('../paths');

gulp.task('html', () => {
    let html2JsOptions = {
        template: `
            import angular from 'angular';
            export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {
                $templateCache.put('<%= template.url %>', '<%= template.prettyEscapedContent %>');
            }]);
        `
    };

    return gulp.src(paths.templates, { base: 'src' })
        .pipe(gulpif(paths.isProduction, plumber()))
        .pipe(changed(paths.output, { extension: '.html' }))
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(ngHtml2Js(html2JsOptions))
        .pipe(babel())
        .pipe(gulp.dest(paths.output));
});
