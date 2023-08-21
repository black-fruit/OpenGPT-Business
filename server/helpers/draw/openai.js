'use strict';

const a4_0x3687ee = {
  "value": true
};
Object['defineProperty'](exports, '__esModule', a4_0x3687ee);
exports["openAiTextToImage"] = exports["openAi"] = void 0;

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1["__importDefault"](require('node-fetch')),
      utils_1 = require('../../utils');

async function openAi(_0x22fbdf) {
  const _0x1fe147 = { ..._0x22fbdf
  };
  return openAiTextToImage(_0x1fe147);
}

exports["openAi"] = openAi;

async function openAiTextToImage(_0x211091) {
  const {
    "n": n = 1,
    "size": size = "256x256",
    "response_format": response_format = "b64_json",
    "aikeyInfo": _0x4ee894
  } = _0x211091,
        _0x2d960e = await (0, node_fetch_1["default"])(_0x4ee894["host"] + "/v1/images/generations", {
    'method': "POST",
    'body': JSON["stringify"]({
      'prompt': _0x211091['prompt'],
      'n': Number(n),
      'size': size,
      'response_format': response_format
    }),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x4ee894["key"]
    }
  });

  if (_0x2d960e["status"] !== 200) {
    return (0, utils_1["httpBody"])(-1, [], "生成失败");
  }

  const _0x2690d7 = await _0x2d960e["json"](),
        _0x38e4cd = _0x2690d7['data']['map'](_0x3a4ed4 => {
    return { ..._0x3a4ed4,
      'base64': "data:image/png;base64," + _0x3a4ed4['b64_json'],
      'url': "data:image/png;base64," + _0x3a4ed4["b64_json"]
    };
  });

  return (0, utils_1['httpBody'])(0, [..._0x38e4cd], '生成成功');
}

exports['openAiTextToImage'] = openAiTextToImage;