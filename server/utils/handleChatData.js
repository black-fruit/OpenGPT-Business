'use strict';

const a132_0x143f54 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a132_0x143f54);

const tslib_1 = require('tslib'),
      formatTime_1 = tslib_1["__importDefault"](require("./formatTime"));

function handleOpenChatData(_0x501fd3, _0x386b20) {
  let _0x2008be = _0x501fd3['toString']()["split"](/\n{2}/g);

  _0x2008be = _0x2008be["filter"](_0x54ee00 => _0x54ee00["trim"]());
  const _0x5934be = [];

  for (let _0x1bbf8f = 0; _0x1bbf8f < _0x2008be["length"]; _0x1bbf8f++) {
    const _0x590e5d = _0x2008be[_0x1bbf8f];

    let _0x2cfe3b = _0x590e5d["replace"](/^data: /, '');

    _0x2cfe3b === "[DONE]" && _0x5934be["push"](JSON['stringify']({
      'id': '',
      'role': "assistant",
      'segment': "stop",
      'dateTime': (0, formatTime_1["default"])(),
      'content': '',
      'parentMessageId': _0x386b20['parentMessageId'],
      ..._0x386b20?.["content"]
    }));

    try {
      _0x2cfe3b = JSON["parse"](_0x2cfe3b);
    } catch (_0x11238e) {
      continue;
    }

    const _0x27bd97 = _0x2cfe3b["choices"]?.[0]?.["delta"]?.["content"] || '',
          _0x55781e = _0x2cfe3b["choices"]?.[0]?.["delta"]?.["role"],
          _0x459463 = _0x2cfe3b === "[DONE]" ? "stop" : _0x55781e === "assistant" ? "start" : "text";

    _0x5934be["push"](JSON['stringify']({
      'id': _0x2cfe3b['id'],
      'role': "assistant",
      'segment': _0x459463,
      'dateTime': (0, formatTime_1["default"])(),
      'content': _0x27bd97,
      'parentMessageId': _0x386b20["parentMessageId"],
      ..._0x386b20?.["content"]
    }) + "\n\n");
  }

  return _0x5934be["join"]('');
}

exports["default"] = handleOpenChatData;