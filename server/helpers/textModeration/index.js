'use strict';

const a25_0x1bf2f3 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a25_0x1bf2f3);

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1['__importDefault'](require("node-fetch"));

async function tuputech(_0x2fb180, _0x59b756) {
  const _0xd79651 = {
    "content": _0x59b756
  };
  const _0x4373e0 = {
    "text": [_0xd79651]
  };

  const _0x39d789 = await (0, node_fetch_1["default"])("https://tupu.apistd.com/v3/recognition/text/text-moderation?key=" + _0x2fb180, {
    'method': "POST",
    'headers': {
      'Content-Type': "application/json"
    },
    'body': JSON["stringify"](_0x4373e0)
  });

  if (_0x39d789["status"] !== 200) {
    const _0x17a45d = {
      "action": "block"
    };
    return _0x17a45d;
  }

  const _0x483f9e = await _0x39d789['json']();

  if (_0x483f9e["code"] || _0x483f9e['data']["texts"]["length"] <= 0) {
    const _0x319ad2 = {
      "action": "block"
    };
    return _0x319ad2;
  }

  const [_0x2e7315] = _0x483f9e['data']["texts"],
        _0x2f6069 = { ..._0x2e7315
  };
  return _0x2f6069;
}

const a25_0x170da4 = {
  "tuputech": tuputech
};
