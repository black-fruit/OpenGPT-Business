'use strict';

const a10_0x67f73a = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a10_0x67f73a);
exports['precreate'] = void 0;

const tslib_1 = require("tslib"),
      alipay_sdk_1 = tslib_1["__importDefault"](require("alipay-sdk")),
      utils_1 = require('../../utils');

async function precreate({
  "config": _0x5b6d70,
  "notify_url": _0x3bcba6,
  "out_trade_no": _0x3b1f01,
  "total_amount": _0x443d1b,
  "subject": _0x5219fc,
  "body": _0xee3f60,
  "goods_detail": _0x47ab09
}) {
  const _0x10e793 = new alipay_sdk_1["default"](_0x5b6d70),
        _0xb0388c = await _0x10e793["exec"]("alipay.trade.precreate", {
    'notify_url': _0x3bcba6,
    'bizContent': {
      'out_trade_no': _0x3b1f01,
      'subject': _0x5219fc,
      'goods_detail': [_0x47ab09],
      'body': _0xee3f60,
      'total_amount': _0x443d1b,
      'product_code': "FACE_TO_FACE_PAYMENT"
    }
  }),
        _0x217421 = { ..._0xb0388c,
    "code": _0xb0388c["code"] === "10000" ? 0 : _0xb0388c["code"]
  };

  return _0x217421;
}

exports["precreate"] = precreate;

async function checkNotifySign(_0x40d38e, _0x28adce) {
  const _0x57f81 = new alipay_sdk_1["default"](_0x40d38e),
        _0x3bf862 = { ..._0x28adce,
    'channel': null
  };

  const _0x15697b = (0, utils_1['filterObjectNull'])(_0x3bf862);

  return _0x57f81["checkNotifySign"](_0x15697b);
}

const a10_0x3f68f8 = {
  'precreate': precreate,
  "checkNotifySign": checkNotifySign
};
exports["default"] = a10_0x3f68f8;