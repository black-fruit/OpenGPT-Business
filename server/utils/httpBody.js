'use strict';

const a133_0x177319 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a133_0x177319);

function httpBody(_0xf2d68f, ..._0x5e6a7c) {
  const _0x45595c = {
    "code": _0xf2d68f,
    "data": [],
    "message": ''
  };

  if (_0x5e6a7c['length'] === 1 && typeof _0x5e6a7c[0] === "string") {
    _0x45595c["message"] = _0x5e6a7c[0];
  } else {
    if (_0x5e6a7c['length'] === 2 && typeof _0x5e6a7c[0] !== "string" && typeof _0x5e6a7c[1] === "string") {
      _0x45595c["data"] = _0x5e6a7c[0];
      _0x45595c["message"] = _0x5e6a7c[1];
    } else {
      _0x5e6a7c["length"] === 1 && typeof _0x5e6a7c[0] !== "string" && (_0x45595c["data"] = _0x5e6a7c[0]);
    }
  }

  return _0x45595c;
}

exports["default"] = httpBody;