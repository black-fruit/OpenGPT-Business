'use strict';

const a115_0x33bedf = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a115_0x33bedf);

const tslib_1 = require('tslib'),
      apis_1 = tslib_1["__importDefault"](require('./apis')),
      admin_1 = tslib_1["__importDefault"](require("./admin"));

exports["default"] = _0x556a88 => {
  _0x556a88["use"]("/api", [...apis_1["default"]]);

  _0x556a88["use"]('/api/admin', [...admin_1["default"]]);

  return _0x556a88;
};