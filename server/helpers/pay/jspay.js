'use strict';

const a13_0x134b6f = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a13_0x134b6f);

const tslib_1 = require('tslib'),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      querystring_1 = tslib_1["__importDefault"](require('querystring')),
      utils_1 = require('../../utils');

async function precreate(_0x625655, _0x5bbc10) {
  const _0x57ba44 = { ..._0x5bbc10
  },
        _0x3ad1f1 = (0, utils_1["filterObjectNull"])(_0x57ba44),
        _0x3cf7db = (0, utils_1['ksort'])(_0x3ad1f1),
        _0x8716ae = { ..._0x3cf7db,
    'key': _0x625655['key']
  };

  const _0x5371b1 = (0, utils_1["buildQueryString"])(_0x8716ae),
        _0x5bb2f2 = (0, utils_1["generateMd5"])(_0x5371b1)["toUpperCase"](),
        _0x3e11c4 = {
    'sign': _0x5bb2f2,
    ..._0x3ad1f1
  },
        _0x5cc76e = querystring_1["default"]["stringify"](_0x3e11c4),
        _0x475269 = _0x625655["api"] + "/api/native",
        _0x23014e = {
    'method': "POST",
    'headers': {},
    "body": _0x5cc76e
  };

  _0x23014e['headers']["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";

  const _0x3977cd = await (0, node_fetch_1['default'])(_0x475269, _0x23014e),
        _0x3d043a = await _0x3977cd['json']();

  return {
    'code': _0x3d043a["return_code"] === 1 ? 0 : 500,
    'qrcode': _0x3d043a["code_url"] || _0x3d043a["qrcode"],
    'message': _0x3d043a["return_msg"]
  };
}

async function checkNotifySign(_0x5cbfbb, _0x576eda) {
  const _0x2c5c13 = _0x5cbfbb["sign"],
        _0x4b0056 = { ..._0x5cbfbb,
    "channel": null,
    "sign": null,
    "sign_type": null
  };

  const _0x21cb19 = (0, utils_1["filterObjectNull"])(_0x4b0056),
        _0x56b582 = (0, utils_1["ksort"])(_0x21cb19),
        _0x2ca524 = { ..._0x56b582,
    "key": _0x576eda
  };

  const _0xd450ca = (0, utils_1["buildQueryString"])(_0x2ca524),
        _0x3269aa = (0, utils_1['generateMd5'])(_0xd450ca)['toUpperCase']();

  return _0x2c5c13 === _0x3269aa;
}

const a13_0x3445f8 = {
  'precreate': precreate,
  "checkNotifySign": checkNotifySign
};
exports["default"] = a13_0x3445f8;