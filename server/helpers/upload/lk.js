'use strict';

const a28_0x4fcf02 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a28_0x4fcf02);
exports['lk'] = void 0;

const tslib_1 = require('tslib'),
      node_fetch_1 = tslib_1["__importDefault"](require('node-fetch')),
      form_data_1 = tslib_1['__importDefault'](require("form-data")),
      operateFile_1 = tslib_1["__importDefault"](require("./operateFile"));

async function lk(_0x23d38f) {
  const {
    "buffer": _0x2d3218,
    "originalname": _0x340496
  } = await (0, operateFile_1["default"])(_0x23d38f),
        _0x4f5978 = new form_data_1["default"](),
        _0x5d3b26 = {
    "filename": _0x340496
  };

  _0x4f5978['append']("file", _0x2d3218, _0x5d3b26);

  const _0x50d76d = {
    "method": "post",
    "body": _0x4f5978,
    "headers": {}
  };
  _0x50d76d["headers"]["Authorization"] = "Bearer 1|t2xiQZVf2JsXRbeD3tB2aKgTKrWL621dLSIPijHB";

  const _0x16a745 = await (0, node_fetch_1["default"])("https://t.dl0.cn/api/v1/upload", _0x50d76d),
        _0x170537 = await _0x16a745['json']();

  console["log"](_0x170537);
  return '';
}

exports['lk'] = lk;