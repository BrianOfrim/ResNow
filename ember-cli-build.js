/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  var app = new Angular2App(defaults, {
    vendorNpmFiles: [
      'angularfire2/**/*.js',
      'firebase/lib/*.js',
      'ng2-bootstrap/bundles/*.js',
      'moment/moment.js'
    ]
  });
  return app.toTree();
}