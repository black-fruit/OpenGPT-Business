'use strict';

const a34_0x3c918f = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a34_0x3c918f);
exports["tencentCos"] = void 0;

const tslib_1 = require('tslib'),
      cos_nodejs_sdk_v5_1 = tslib_1["__importDefault"](require("cos-nodejs-sdk-v5")),
      operateFile_1 = tslib_1['__importDefault'](require("./operateFile"));

async function tencentCos(_0x1aba04) {
  const {
    "fileName": _0x4e946c,
    "buffer": _0x390e08
  } = (0, operateFile_1["default"])(_0x1aba04),
        _0x557d98 = {
    "SecretId": "AKIDugGclhPglenkV3OfeQziFbljU2MUQ9fx",
    "SecretKey": "CD1bw50f5LPGtKYYLuKWUHrBKAqIbhcN"
  };

  const _0x2a4e60 = new cos_nodejs_sdk_v5_1["default"](_0x557d98);

  console['log']('', _0x1aba04);
  const _0x5e0362 = {
    "Bucket": "upload-1305179234",
    "Region": "ap-beijing",
    "Key": _0x4e946c,
    "Body": _0x390e08
  };

  const _0x35206d = await _0x2a4e60['putObject'](_0x5e0362);

  console["log"](_0x35206d['Location']);
  return '';
}

exports['tencentCos'] = tencentCos;