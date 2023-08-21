'use strict';

const a32_0x5d61aa = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a32_0x5d61aa);

const tslib_1 = require("tslib"),
      path_1 = tslib_1["__importDefault"](require("path")),
      crypto_1 = tslib_1["__importDefault"](require("crypto"));

function operateFile(_0x59502c) {
  const _0x309194 = crypto_1["default"]["createHash"]("sha1")["update"](_0x59502c['buffer'])["digest"]("hex"),
        _0x22f715 = crypto_1["default"]["createHash"]("md5")["update"](_0x59502c["buffer"])["digest"]("hex"),
        _0x2b3463 = new Date(),
        _0x30b12c = _0x2b3463['getFullYear'](),
        _0x1b91e8 = _0x2b3463["getMonth"]() + 1,
        _0x4febe3 = _0x2b3463['getDate'](),
        _0x108459 = "uploads/" + _0x30b12c + '/' + _0x1b91e8 + '/' + _0x4febe3,
        _0x5ed6b6 = crypto_1["default"]["createHash"]("md5")["update"](Date['now']() + '_' + _0x59502c['originalname'])["digest"]("hex"),
        _0x1aa712 = _0x5ed6b6 + '.' + _0x59502c["originalname"]["split"]('.')["pop"](),
        _0x252cc3 = path_1["default"]["join"](_0x108459, _0x1aa712),
        _0x1294b9 = { ..._0x59502c,
    "filePath": _0x252cc3,
    "fileName": _0x1aa712,
    'sha1': _0x309194,
    "md5": _0x22f715,
    "dirPath": _0x108459
  };

  return _0x1294b9;
}

exports["default"] = operateFile;