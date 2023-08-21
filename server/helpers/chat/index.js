'use strict';

const a1_0x5bdd60 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a1_0x5bdd60);

const tslib_1 = require('tslib'),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      stream_1 = require("stream"),
      utils_1 = require("../../utils");

async function fetchChatCompletions(_0x2de923, _0x5526bf) {
  const _0x7275c8 = { ..._0x5526bf
  },
        _0x21704c = await (0, node_fetch_1["default"])(_0x2de923["host"] + "/v1/chat/completions", {
    'method': 'POST',
    'body': JSON['stringify'](_0x7275c8),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x2de923["key"]
    }
  });

  return _0x21704c;
}

async function fetchChatFunction(_0x99959f, _0x597ded) {
  try {
    const _0x53279c = await (0, node_fetch_1["default"])(_0x99959f["host"] + '/v1/chat/completions', {
      'method': "POST",
      'body': JSON["stringify"]({
        'model': "gpt-3.5-turbo-0613",
        'stream': false,
        'function_call': "auto",
        ..._0x597ded
      }),
      'headers': {
        'Content-Type': "application/json",
        'Authorization': "Bearer " + _0x99959f["key"]
      }
    });

    if (_0x53279c['status'] !== 200) {
      return false;
    }

    const _0x664e69 = await _0x53279c["json"](),
          _0x13943d = _0x664e69["choices"][0]["message"];

    return _0x13943d;
  } catch (_0x452e7c) {
    return false;
  }
}

async function streamChatCompletions(_0x173f37, _0x433b8d, _0x5b28eb, _0x3ed479, _0xd1da36) {
  const _0xeeed33 = await fetchChatCompletions(_0x173f37, _0x433b8d);

  if (_0xeeed33["status"] === 200 && _0xeeed33["headers"]["get"]("content-type")?.['includes']("text/event-stream")) {
    let _0x538787 = '';

    _0x5b28eb["setHeader"]("Content-Type", "text/event-stream;charset=utf-8");

    const _0x36170b = new stream_1["Transform"]({
      'objectMode': true,

      'transform'(_0x2c8c65, _0xda01ef, _0x2722fa) {
        const _0x1f281e = Buffer["from"](_0x2c8c65)['toString'](),
              _0x3cecb4 = {
          "parentMessageId": 'assistantMessageId',
          'content': _0xd1da36
        };

        const _0x476805 = (0, utils_1["handleChatData"])(_0x1f281e, _0x3cecb4),
              _0x52ff33 = _0x476805["split"]("\n\n");

        for (let _0x4e0c56 = 0; _0x4e0c56 < _0x52ff33["length"]; _0x4e0c56++) {
          if (_0x52ff33[_0x4e0c56]) {
            const _0x1c7ecc = JSON["parse"](_0x52ff33[_0x4e0c56]);

            if (_0x1c7ecc["segment"] === "stop") {
              _0x3ed479(_0x538787);
            } else {
              _0x538787 += _0x1c7ecc["content"];
            }
          }
        }

        _0x2722fa(null, _0x476805);
      }

    });

    _0xeeed33["body"]?.["pipe"](_0x36170b)['pipe'](_0x5b28eb);
    return;
  }

  const _0x57b590 = await _0xeeed33["json"]();

  _0x5b28eb['status'](_0xeeed33["status"])["json"]((0, utils_1['httpBody'])(-1, _0x57b590, ''));
}

const a1_0x336e25 = {
  "fetchChatCompletions": fetchChatCompletions,
  "streamChatCompletions": streamChatCompletions,
  "fetchChatFunction": fetchChatFunction
};
exports["default"] = a1_0x336e25;