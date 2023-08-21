'use strict';

const a124_0x2eef9d = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a124_0x2eef9d);

const tslib_1 = require("tslib"),
      crypto_1 = tslib_1['__importDefault'](require("crypto")),
      getRandomChars_1 = tslib_1["__importDefault"](require("./getRandomChars"));

function crc32(_0x1d986b) {
  const _0x4d3db4 = crypto_1['default']["createHash"]("sha256")['update'](_0x1d986b)["digest"]("hex"),
        _0x195adc = (0, getRandomChars_1["default"])(_0x4d3db4);

  return _0x195adc;
}

const a124_0x3e15e5 = {
  "crc32": crc32
};
exports['default'] = a124_0x3e15e5;