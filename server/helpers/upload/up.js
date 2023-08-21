'use strict';

const a35_0x242626 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a35_0x242626);
exports['up'] = void 0;

const tslib_1 = require("tslib"),
      upyun_1 = tslib_1["__importDefault"](require("upyun")),
      operateFile_1 = tslib_1["__importDefault"](require("./operateFile")),
      utils_1 = require("../../utils");

async function up(_0x1710e6, {
  "host": _0x37cd68,
  "bucket": _0x73df6c,
  "secret_id": _0x2e58ca,
  "secret_key": _0x191311
}) {
  const _0x271714 = new upyun_1['default']["Service"](_0x73df6c, _0x2e58ca, _0x191311),
        _0x24bda6 = new upyun_1["default"]["Client"](_0x271714),
        _0x3f1487 = (0, operateFile_1['default'])(_0x1710e6);

  await _0x24bda6["putFile"](_0x3f1487["filePath"], _0x3f1487["buffer"]);
  return (0, utils_1["httpBody"])(0, { ..._0x3f1487,
    'url': _0x37cd68 + _0x3f1487["filePath"]
  }, "上传成功");
}

exports['up'] = up;