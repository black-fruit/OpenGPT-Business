'use strict';

const a118_0x3c7aa7 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a118_0x3c7aa7);

function checkProhibitedWords(_0x1812da, _0x1581e9) {
  const _0x275cf7 = _0x1581e9["split"](','),
        _0x3deee3 = new RegExp(_0x275cf7["join"]('|'), 'g'),
        _0x3ffb7a = [],
        _0xb69ebc = _0x3deee3["test"](_0x1812da) ? "block" : "pass";

  _0x1812da = _0x1812da["replace"](_0x3deee3, function (_0x11ac1b) {
    _0x3ffb7a["push"](_0x11ac1b);

    return '*'["repeat"](_0x11ac1b["length"]);
  });
  const _0x186c58 = {
    "action": _0xb69ebc,
    "text": _0x1812da,
    "matchedWords": _0x3ffb7a
  };
  return _0x186c58;
}

exports['default'] = checkProhibitedWords;