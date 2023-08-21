'use strict';

const a33_0x52ae94 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a33_0x52ae94);
exports['tencent'] = void 0;

const tslib_1 = require("tslib"),
      cos_nodejs_sdk_v5_1 = tslib_1["__importDefault"](require('cos-nodejs-sdk-v5')),
      operateFile_1 = tslib_1['__importDefault'](require("./operateFile")),
      utils_1 = require('../../utils');

async function tencent(_0x243992, {
  "secret_id": _0x25e045,
  "secret_key": _0x3c35e2,
  "bucket": _0x2d920f,
  "region": _0x10952c
}) {
  const _0x308669 = (0, operateFile_1["default"])(_0x243992),
        _0x3a28cf = {
    "SecretId": _0x25e045,
    "SecretKey": _0x3c35e2
  };

  const _0x2a8cc9 = new cos_nodejs_sdk_v5_1['default'](_0x3a28cf),
        _0x40a87a = {
    "Bucket": _0x2d920f,
    "Region": _0x10952c,
    'Key': _0x308669['fileName'],
    'Body': _0x308669["buffer"]
  };

  const _0x187129 = await _0x2a8cc9["putObject"](_0x40a87a);

  if (_0x187129["statusCode"] !== 200) {
    return (0, utils_1['httpBody'])(500, {}, "上传失败");
  }

  return (0, utils_1["httpBody"])(0, { ..._0x308669,
    'url': '//' + _0x187129["Location"]
  }, "上传成功");
}

exports['tencent'] = tencent;