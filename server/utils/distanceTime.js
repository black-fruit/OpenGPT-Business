'use strict';

const a120_0x1248a1 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a120_0x1248a1);

function distanceTime(_0x52a74b = null, _0x12980f = null) {
  if (_0x52a74b && typeof _0x52a74b === "string") {
    const _0x188e55 = _0x52a74b["replace"](/-/g, '/');

    _0x52a74b = new Date(_0x188e55);
  } else {
    if (!_0x52a74b) {
      _0x52a74b = new Date();
    }
  }

  if (_0x12980f && typeof _0x12980f === "string") {
    const _0x8abaa9 = _0x12980f["replace"](/-/g, '/');

    _0x12980f = new Date(_0x8abaa9);
  } else {
    !_0x12980f && (_0x12980f = new Date(new Date(new Date()["toLocaleDateString"]())["getTime"]() + 86400000 - 1));
  }

  const _0x4608a9 = Date["parse"](_0x12980f['toString']()) / 1000,
        _0x23435f = Date["parse"](_0x52a74b["toString"]()) / 1000;

  return _0x4608a9 - _0x23435f;
}

exports["default"] = distanceTime;