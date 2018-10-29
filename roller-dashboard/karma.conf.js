module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    
    autoWatch: false,
    nocache: false,
    
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],
    
    plugins: [
      'karma-systemjs',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],
    
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.spec.js'
    ],
    
    // list of files to exclude
    exclude: [
      // 'test/e2e/*'
    ],

    systemjs: {
      configFile: 'system.config.js',
      config: {
        transpiler: 'babel',
        // packages: 'jspm_packages',
        paths: {
          // "github:*": "/base/jspm_packages/github/*",
          // "npm:*": "/base/jspm_packages/npm/*",
          'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js',
          'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
          'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
          'systemjs': 'node_modules/systemjs/dist/system.js',
          'system-polyfills': 'node_modules/systemjs/dist/system-polyfills.js'
          // 'angular-mocks': 'node_modules/angular-mocks/angular-mocks.js'
          // 'phantomjs-polyfill': 'node_modules/phantomjs-polyfill/bind-polyfill.js'
        }
      },

      serveFiles: [
        'jspm_packages/**/*',
        'dev/**/*.js',
        'dev/**/*.css',
        'dev/**/*.json',
      ],
    },

    proxies: {
      // '/test': '/base/test',
      // '/dist': '/base/dist',
      // '/node_modules': '/base/node_modules'
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    'src/!(*spec).js': ['coverage'],
    },
    
    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta'
      }
    }

  });
};
