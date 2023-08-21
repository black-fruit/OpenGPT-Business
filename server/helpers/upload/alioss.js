'use strict';

const a26_0x3c4161 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a26_0x3c4161);
exports["alioss"] = void 0;

const tslib_1 = require("tslib"),
      ali_oss_1 = tslib_1["__importDefault"](require("ali-oss")),
      operateFile_1 = tslib_1['__importDefault'](require("./operateFile")),
      utils_1 = require("../../utils");

async function alioss(_0x9c1d4e, {
  "region": _0x59bc8d,
  "bucket": _0x43c369,
  "access_key_id": _0x7eb400,
  "access_key_secret": _0x3db798
}) {
  const _0x49c312 = (0, operateFile_1["default"])(_0x9c1d4e),
        _0x3f936a = {
    'region': _0x59bc8d,
    "accessKeyId": _0x7eb400,
    "accessKeySecret": _0x3db798,
    'bucket': _0x43c369
  };

  const _0x2d68d2 = new ali_oss_1["default"](_0x3f936a),
        _0x173eab = await _0x2d68d2["put"](_0x49c312["fileName"], _0x49c312["buffer"]);

  if (!_0x173eab?.["url"]) {
    return (0, utils_1["httpBody"])(500, {}, "上传失败");
  }

  const _0x382542 = { ..._0x49c312,
    "url": _0x173eab["url"]
  };
  return (0, utils_1["httpBody"])(0, _0x382542, "上传成功");
}

exports["alioss"] = alioss;
exports['default'] = alioss;