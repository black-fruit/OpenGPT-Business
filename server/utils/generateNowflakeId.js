'use strict';

const a126_0x46f3f2 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a126_0x46f3f2);

function generateSnowflakeId(_0x532c0a, _0x305834 = 1672502400000) {
  let _0x4de60d = 0,
      _0x2f1172 = 0;

  const _0x419e97 = _0x359274 => {
    let _0xe9e0dc = Date["now"]() - _0x305834;

    while (_0xe9e0dc <= _0x359274) {
      _0xe9e0dc = Date["now"]() - _0x305834;
    }

    return _0xe9e0dc;
  };

  return function () {
    let _0x328234 = Date["now"]() - _0x305834;

    if (_0x328234 < _0x2f1172) {
      throw new Error("Clock moved backwards!");
    }

    if (_0x328234 === _0x2f1172) {
      _0x4de60d = _0x4de60d + 1 & 4095;

      if (_0x4de60d === 0) {
        _0x328234 = _0x419e97(_0x328234);
      }
    } else {
      _0x4de60d = 0;
    }

    _0x2f1172 = _0x328234;

    const _0x313db6 = (BigInt(_0x328234) << 0x16n | BigInt(_0x532c0a) << 0xcn | BigInt(_0x4de60d))["toString"]();

    return _0x313db6;
  };
}

exports["default"] = generateSnowflakeId;