'use strict';

const a2_0xb84431 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a2_0xb84431);

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      form_data_1 = tslib_1["__importDefault"](require('form-data'));

async function decodeUrlToText(_0x3202cc) {
  if (!_0x3202cc) {
    return '';
  }

  const _0x5f1b6e = new form_data_1["default"]();

  _0x5f1b6e['append']("data", _0x3202cc);

  const _0x487a8a = await (0, node_fetch_1["default"])("https://cli.im/Api/Browser/deqr", {
    'method': "POST",
    'body': _0x5f1b6e
  }),
        _0x9fd498 = await _0x487a8a['json']();

  return _0x9fd498;
}

const a2_0x444186 = {
  'decodeUrlToText': decodeUrlToText
};
exports["default"] = a2_0x444186;