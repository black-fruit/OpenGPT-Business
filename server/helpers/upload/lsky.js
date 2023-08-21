'use strict';

const a31_0x57171b = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a31_0x57171b);
exports['lsky'] = void 0;

const tslib_1 = require('tslib'),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      form_data_1 = tslib_1["__importDefault"](require("form-data")),
      operateFile_1 = tslib_1["__importDefault"](require('./operateFile')),
      utils_1 = require("../../utils");

async function lsky(_0x502a74, {
  "api_host": _0x3156de,
  "secret_key": _0x45a6e5
}) {
  const _0x2f12bb = (0, operateFile_1['default'])(_0x502a74),
        _0x1f6929 = new form_data_1["default"]();

  _0x1f6929["append"]("file", _0x2f12bb["buffer"], {
    'filename': _0x2f12bb["originalname"]
  });

  const _0x52ac65 = {
    'Authorization': "Bearer " + _0x45a6e5
  };
  const _0x440e33 = {
    "method": "post",
    "body": _0x1f6929,
    "headers": _0x52ac65
  };

  const _0x17dbc9 = await (0, node_fetch_1["default"])(_0x3156de + "/api/v1/upload", _0x440e33),
        _0x1883d6 = await _0x17dbc9["json"]();

  console["log"](_0x1883d6);

  if (!_0x1883d6["status"]) {
    return (0, utils_1["httpBody"])(500, {}, "上传失败");
  }

  const _0x529247 = { ..._0x2f12bb,
    'url': _0x1883d6['data']["links"]["url"]
  };
  return (0, utils_1["httpBody"])(0, _0x529247, "上传成功");
}

exports["lsky"] = lsky;