'use strict';

const a131_0x4334ce = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a131_0x4334ce);

function getRandomChars(_0x3d4053, _0x3c3321 = 8) {
  const _0x2bb808 = _0x3d4053["split"](''),
        _0x2890e0 = new Set();

  while (_0x2890e0['size'] < _0x3c3321) {
    _0x2890e0["add"](Math['floor'](Math['random']() * _0x2bb808["length"]));
  }

  return Array["from"](_0x2890e0)['sort']()["map"](_0x2a1066 => _0x2bb808[_0x2a1066])['join']('');
}

exports["default"] = getRandomChars;