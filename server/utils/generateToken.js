'use strict';

const a127_0x45f469 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a127_0x45f469);

const tslib_1 = require("tslib"),
      crypto_1 = tslib_1["__importDefault"](require("crypto"));

function generateToken(_0x4e296, _0x5f97c5 = 'chatgpt') {
  const _0x1c147d = Date["now"]()["toString"](),
        _0x2cbad8 = JSON["stringify"](_0x4e296) + _0x1c147d + _0x5f97c5,
        _0x3c2b88 = crypto_1["default"]["createHash"]("sha256")["update"](_0x2cbad8)["digest"]("hex"),
        _0x33b7d7 = crypto_1["default"]["createHash"]("md5")['update'](_0x3c2b88)['digest']("hex");

  return _0x33b7d7;
}

exports["default"] = generateToken;