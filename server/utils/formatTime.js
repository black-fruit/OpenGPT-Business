'use strict';

const a122_0x2a41db = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a122_0x2a41db);

function formatTime(_0x4c59fa = "yyyy-MM-dd HH:mm:ss", _0x14bf21) {
  const _0x582702 = _0x14bf21 ? _0x14bf21 : new Date(),
        _0x4e9b00 = _0x130ab5 => _0x130ab5 < 10 ? '0' + _0x130ab5 : _0x130ab5,
        _0x5af4c7 = {
    'yyyy': _0x582702["getFullYear"](),
    'MM': _0x4e9b00(_0x582702["getMonth"]() + 1),
    'dd': _0x4e9b00(_0x582702["getDate"]()),
    'HH': _0x4e9b00(_0x582702["getHours"]()),
    'mm': _0x4e9b00(_0x582702["getMinutes"]()),
    'ss': _0x4e9b00(_0x582702["getSeconds"]()),
    'qq': Math['floor']((_0x582702['getMonth']() + 3) / 3),
    'S': _0x582702['getMilliseconds']()
  };

  Object['keys'](_0x5af4c7)["forEach"](_0x6dde20 => {
    if (_0x4c59fa["includes"](_0x6dde20)) {
      _0x4c59fa = _0x4c59fa?.["replace"](_0x6dde20, _0x5af4c7[_0x6dde20]);
    }
  });
  return _0x4c59fa;
}

exports["default"] = formatTime;