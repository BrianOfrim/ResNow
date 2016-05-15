/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  var app = new Angular2App(defaults, {
    vendorNpmFiles: [
      'angularfire2/**/*.js',
      'firebase/lib/*.js',
      'ng2-bootstrap/bundles/*.js',
      'moment/moment.js',
      'ng2-bootstrap/bundles/ng2-bootstrap.js',
      'es6-shim/es6-shim.js',
      'systemjs/dist/system.src.js',
      'rxjs/bundles/Rx.js',
      // 'angular2/bundles/angular2.dev.js',
      // 'angular2/bundles/router.dev.js',
      // 'angular2/bundles/angular2-polyfills.js',
      'systemjs/dist/system-polyfills.js',
      // 'angular2/bundles/http.dev.js',
      '@angular/core/**/*.js',
      // '@angular/core/src/*.js',
      // '@angular/core/src/**/*.js',
      '@angular/router-deprecated/**/*.js',
      '@angular/common/**/*.js',
      // '@angular/common/src/*.js',
      // '@angular/common/src/**/*.js',
      '@angular/compiler/**/*.js',
      '@angular/platform-browser/**/*.js',
      '@angular/platform-browser-dynamic/**/*.js',
      'reflect-metadata/Reflect.js',
      'zone.js/dist/*.js'
    ]
  });
  return app.toTree();
}