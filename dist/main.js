
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];
        const module = { exports: {} };
        fn(require, module, module.exports);
        return module.exports;
      }
      require('/Users/lyc/Desktop/D/sources/geeklyc/gl-web/gl-simplepack/src/index.js');
    })({'/Users/lyc/Desktop/D/sources/geeklyc/gl-web/gl-simplepack/src/index.js' : function (require, module, exports) { "use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('geeklyc')); },'./greeting.js' : function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'gl' + name;
} },})
    