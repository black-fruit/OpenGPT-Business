'use strict';

const a121_0x2c715e = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a121_0x2c715e);

function filterObjectNull(_0x1c6a72) {
  const _0xea2aae = Object["keys"](_0x1c6a72)["filter"](_0x48ab22 => _0x1c6a72[_0x48ab22] !== null && _0x1c6a72[_0x48ab22] !== undefined && _0x1c6a72[_0x48ab22] !== 'undefined')["reduce"]((_0x36730f, _0x481916) => ({ ..._0x36730f,
    [_0x481916]: _0x1c6a72[_0x481916]
  }), {}),
        _0x1ed0ca = { ..._0xea2aae
  };

  return _0x1ed0ca;
}

exports["default"] = filterObjectNull;