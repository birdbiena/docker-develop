var routes = require('../src/app/routes.json');

var releaseFiles = routes.map(function (r) {
  return 'dev/' + r.src;
});

releaseFiles = releaseFiles.concat([
  'dev/**/*.html',
  'dev/app/app.js',
  'dev/**/*.json',
  'dev/bundles/**',
  'dev/**/*.{png,ico,jpg,gif}',
  'dev/**/*.{eot,svg,woff,woff2,ttf}'
]);

module.exports = {
  source: 'src/**/!(*spec).js',
  templates: ['src/**/*.tpl.html'],
  sass: ['src/**/*.scss'],
  output: 'dev/',
  outputCss: 'dev/**/*.css',
  staticFiles: [
    'src/**/*.html',
    'src/**/*.json',
    'src/**/*.{png,ico,jpg,gif}',
    'src/**/*.{eot,svg,woff,woff2,ttf}'
  ],
  prodBaseURL: '/ecas/static/roller/',
  releasePath: 'dist/',
  releaseFiles: releaseFiles
};
