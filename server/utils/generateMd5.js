'use strict';

const a125_0x1d7d1d = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a125_0x1d7d1d);

const tslib_1 = require('tslib'),
      crypto_1 = tslib_1['__importDefault'](require("crypto"));

function generateMd5(_0x5e0fba) {
  const _0x232a7b = crypto_1["default"]["createHash"]("md5")["update"](_0x5e0fba)["digest"]("hex");

  return _0x232a7b;
}

exports["default"] = generateMd5;