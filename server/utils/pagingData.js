'use strict';

var a136_0x268ff1 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a136_0x268ff1);

function pagingData({
  "page": _0x1e7dd0,
  "page_size": _0x17fa07
}, _0x32f868 = true) {
  _0x1e7dd0 = Number(_0x1e7dd0) || 1;
  _0x17fa07 = Number(_0x17fa07) || 10;
  (_0x1e7dd0 <= 0 || typeof _0x1e7dd0 != "number") && (_0x1e7dd0 = 1);

  if (_0x32f868 && (_0x1e7dd0 > 0 || typeof _0x1e7dd0 != "number")) {
    _0x1e7dd0 -= 1;
  }

  typeof _0x17fa07 != "number" && (_0x17fa07 = 10);
  var _0x4e21f9 = {
    'page': _0x1e7dd0,
    "page_size": _0x17fa07
  };
  return _0x4e21f9;
}

exports["default"] = pagingData;