'use strict';

const a38_0x44c141 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a38_0x44c141);

const utils_1 = require("../utils"),
      catchError = (_0x3f4bb0, _0x2597bc, _0x1335f8, _0x2c20f2) => {
  console["log"]('[' + _0x2597bc["method"] + '][' + _0x2597bc["path"] + ']:' + _0x3f4bb0['message'] + " [body]:" + JSON["stringify"](_0x2597bc['body']) + " [query]:" + JSON['stringify'](_0x2597bc['query']));

  try {
    const _0x3eb340 = JSON["parse"](_0x3f4bb0['message']);

    _0x1335f8['status'](500)["json"](_0x3eb340);
  } catch (_0x3e6675) {
    _0x1335f8["status"](500)["json"]((0, utils_1["httpBody"])(5000, _0x3f4bb0['message']));
  }

  _0x2c20f2(_0x3f4bb0);
};

exports['default'] = catchError;