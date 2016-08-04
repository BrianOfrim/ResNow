/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  var app = new Angular2App(defaults, {
    vendorNpmFiles: [
      'angularfire2/**/*.js',
      'firebase/*.js',
      'ng2-bootstrap/**/*.js',
      'moment/**',
      'es6-shim/es6-shim.js',
      'systemjs/dist/system.src.js',
      'rxjs/**/*.js',
      'systemjs/dist/system-polyfills.js',
      '@angular/core/**/*.js',
      '@angular/router-deprecated/**/*.js',
      '@angular/common/**/*.js',
      '@angular/router/**/*.js',
      '@angular/compiler/**/*.js',
      '@angular/forms/**/*.js',
      '@angular/platform-browser/**/*.js',
      '@angular/platform-browser-dynamic/**/*.js',
      'reflect-metadata/Reflect.js',
      'zone.js/dist/*.js',
      'bootstrap/dist/css/bootstrap.css',
      'bootstrap/dist/fonts/*',
      'primeui/primeui-ng-all.min.js',
      'primeui/primeui-ng-all.min.css',
      'primeui/themes/delta/**',
      'primeng/primeng.js',
      'primeng/components/**/*.js',
      'fullcalendar/dist/*.js',
      'fullcalendar/dist/*.css',
      'angular2-modal/**',
      'firebase/**/*.js'
    ]
  });
  return app.toTree();
}