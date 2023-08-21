'use strict';

const a14_0x10ebe8 = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a14_0x10ebe8);

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1['__importDefault'](require('node-fetch')),
      querystring_1 = tslib_1['__importDefault'](require("querystring")),
      utils_1 = require("../../utils");

async function precreate(_0x3541ab, _0x453775, _0x489375) {
  const _0x463261 = {
    'device': 'pc',
    ..._0x453775,
    ..._0x489375
  },
        _0x312c71 = (0, utils_1["filterObjectNull"])(_0x463261),
        _0x299bb6 = (0, utils_1["ksort"])(_0x312c71),
        _0x524f50 = (0, utils_1['buildQueryString'])(_0x299bb6),
        _0x49e9db = (0, utils_1["generateMd5"])(_0x524f50 + _0x3541ab['key']);

  console['log'](_0x49e9db);

  const _0x44c5bc = {
    'sign': _0x49e9db,
    'sign_type': "MD5",
    ..._0x312c71
  },
        _0x84d000 = querystring_1["default"]['stringify'](_0x44c5bc),
        _0x49b88a = _0x3541ab["api"] + "/mapi.php",
        _0x39efba = {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  };

  const _0x57a142 = {
    "method": 'POST',
    "headers": _0x39efba,
    'body': _0x84d000
  };

  const _0x553ce9 = await (0, node_fetch_1["default"])(_0x49b88a, _0x57a142),
        _0x2a2bdd = await _0x553ce9["json"]();

  return { ..._0x2a2bdd,
    'code': _0x2a2bdd["code"] === 1 ? 0 : _0x2a2bdd["code"],
    'pay_url': _0x2a2bdd["payurl"] || _0x2a2bdd["qrcode"] || _0x2a2bdd["urlscheme"]
  };
}

async function checkNotifySign(_0x2fdaf9, _0x459eb3) {
  const _0x55bf25 = _0x2fdaf9['sign'],
        _0x20db8c = { ..._0x2fdaf9,
    "channel": null,
    "sign": null,
    "sign_type": null
  };

  const _0x5d6d7d = (0, utils_1["filterObjectNull"])(_0x20db8c),
        _0x50d246 = (0, utils_1["ksort"])(_0x5d6d7d),
        _0x3bc58f = (0, utils_1['buildQueryString'])(_0x50d246),
        _0x188e02 = (0, utils_1["generateMd5"])(_0x3bc58f + _0x459eb3);

  return _0x55bf25 === _0x188e02;
}

const a14_0x11617c = {
  "precreate": precreate,
  "checkNotifySign": checkNotifySign
};
exports['default'] = a14_0x11617c;