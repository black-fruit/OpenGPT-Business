'use strict';

const a11_0x5d002f = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a11_0x5d002f);

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      querystring_1 = tslib_1['__importDefault'](require('querystring')),
      utils_1 = require("../../utils");

async function precreate(_0x43b315, _0x430421) {
  const _0x2d632d = {
    'device': 'pc',
    ..._0x430421
  },
        _0x420836 = (0, utils_1['filterObjectNull'])(_0x2d632d),
        _0x502ddb = (0, utils_1["ksort"])(_0x420836),
        _0x9daccb = (0, utils_1["buildQueryString"])(_0x502ddb),
        _0x22b3ad = (0, utils_1["generateMd5"])(_0x9daccb + _0x43b315['key']),
        _0x306d9d = {
    'hash': _0x22b3ad,
    ..._0x420836
  },
        _0x19e932 = querystring_1["default"]['stringify'](_0x306d9d),
        _0x26b2d2 = _0x43b315["api"] + "/payment/do.html",
        _0xed8e5a = {
    "method": "POST",
    "headers": {},
    "body": _0x19e932
  };

  _0xed8e5a["headers"]['Content-Type'] = "application/x-www-form-urlencoded; charset=utf-8";

  const _0x67f33d = await (0, node_fetch_1["default"])(_0x26b2d2, _0xed8e5a),
        _0x23b8a5 = await _0x67f33d["json"]();

  console["log"]("支付返回：json", _0x23b8a5);
  const _0x3193b4 = {
    'code': _0x23b8a5["code"] === 1 ? 0 : _0x23b8a5["code"],
    'pay_url': _0x23b8a5?.["qrcode"] || _0x23b8a5["url"] || _0x23b8a5["url_qrcode"]
  };
  return _0x3193b4;
}

async function checkNotifySign(_0x51ff12, _0x3c8eb7) {
  const _0x32f58e = _0x51ff12["hash"],
        _0x6c96dc = { ..._0x51ff12,
    "channel": null,
    "hash": null
  };

  const _0x126865 = (0, utils_1["filterObjectNull"])(_0x6c96dc),
        _0x5ef93c = (0, utils_1["ksort"])(_0x126865),
        _0x3ae1c = (0, utils_1['buildQueryString'])(_0x5ef93c),
        _0x4b85af = (0, utils_1["generateMd5"])(_0x3ae1c + _0x3c8eb7);

  return _0x32f58e === _0x4b85af;
}

const a11_0x9bf1ca = {
  "precreate": precreate,
  "checkNotifySign": checkNotifySign
};
exports['default'] = a11_0x9bf1ca;