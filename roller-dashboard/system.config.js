System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "app/*": "dev/app/*",
    "common/*": "dev/common/*",
    "assets/*": "dev/assets/*",
    "bundles/*": "dev/bundles/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  meta: {
    "*.scss": {
      "loader": "sass"
    },
    "**/*.tpl.html": {
      "loader": "text"
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.6.8",
    "angular-bootstrap": "github:angular-ui/bootstrap-bower@2.5.0",
    "angular-breadcrumb": "github:ncuillery/angular-breadcrumb@0.5.0",
    "angular-cookies": "github:angular/bower-angular-cookies@1.6.8",
    "angular-file-upload": "npm:angular-file-upload@2.5.0",
    "angular-gettext": "npm:angular-gettext@2.3.10",
    "angular-mocks": "github:angular/bower-angular-mocks@1.6.8",
    "angular-smart-table": "github:lorenzofox3/Smart-Table@2.1.11",
    "angular-ui-router": "github:angular-ui/ui-router@0.4.3",
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "css": "github:systemjs/plugin-css@0.1.36",
    "json": "github:systemjs/plugin-json@0.3.0",
    "ocLazyLoad": "github:ocombe/ocLazyLoad@1.1.0",
    "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.11",
    "text": "github:systemjs/plugin-text@0.0.11",
    "ui-router-extras": "npm:ui-router-extras@0.1.3",
    "github:angular/bower-angular-cookies@1.6.8": {
      "angular": "github:angular/bower-angular@1.6.8"
    },
    "github:angular/bower-angular-mocks@1.6.8": {
      "angular": "github:angular/bower-angular@1.6.8"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.2.1"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:angular-file-upload@2.5.0": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:angular-gettext@2.3.10": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@5.2.1": {
      "base64-js": "npm:base64-js@1.3.0",
      "ieee754": "npm:ieee754@1.1.12"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:ui-router-extras@0.1.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});