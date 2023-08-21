'use strict';

const a7_0xfdada6 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a7_0xfdada6);

const tslib_1 = require('tslib'),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      utils_1 = require("../../utils");

async function openai(_0x45d8ee, _0x5e6bc4) {
  const _0x2fee7d = _0x45d8ee + "/v1/dashboard/billing/subscription",
        _0x229f6b = {
    "Authorization": "Bearer " + _0x5e6bc4
  };

  const _0x22b941 = {
    "method": 'GET',
    "headers": _0x229f6b
  };

  const _0x23af57 = await (0, node_fetch_1["default"])(_0x2fee7d, _0x22b941);

  if (_0x23af57["status"] !== 200) {
    const _0xa9f260 = {
      "status": _0x23af57["status"],
      "hard_limit_usd": 0,
      "total_usage": 0
    };
    return _0xa9f260;
  }

  const _0x3a01da = await _0x23af57["json"](),
        _0x5da758 = _0x3a01da?.["hard_limit_usd"] || 0,
        _0x1c42f0 = new Date(),
        _0x1cccd4 = _0x45d8ee + "/v1/dashboard/billing/usage",
        _0x9b5d43 = new Date(_0x1c42f0['getTime']() - 7776000000),
        _0x2730b3 = new Date(_0x1c42f0["getTime"]() + 86400000),
        _0x1bb769 = await (0, node_fetch_1["default"])(_0x1cccd4 + "?start_date=" + (0, utils_1['formatTime'])("yyyy-MM-dd", new Date(_0x9b5d43)) + "&end_date=" + (0, utils_1["formatTime"])("yyyy-MM-dd", new Date(_0x2730b3)), {
    'headers': {
      'Authorization': "Bearer " + _0x5e6bc4
    }
  });

  let _0x3490d1 = 0;

  if (_0x1bb769["status"] === 200) {
    const _0x390291 = await _0x1bb769['json']();

    _0x3490d1 = _0x390291["total_usage"] ? (_0x390291["total_usage"] / 100)["toFixed"](2) : 0;
  }

  const _0x44c734 = {
    "status": 0,
    "hard_limit_usd": _0x5da758,
    "total_usage": _0x3490d1
  };
  return _0x44c734;
}

async function stability(_0x5ec370, _0x33f533) {
  const _0x15d5e0 = {
    "Authorization": "Bearer " + _0x33f533
  };
  const _0x4e4fc8 = {
    "method": "GET",
    'headers': _0x15d5e0
  };

  const _0x5c58bc = await (0, node_fetch_1["default"])(_0x5ec370 + '/v1/user/balance', _0x4e4fc8);

  if (!_0x5c58bc['ok'] || _0x5c58bc["status"] !== 200) {
    const _0xe15edd = {
      'status': -1,
      "hard_limit_usd": 0,
      "total_usage": 0
    };
    return _0xe15edd;
  }

  const {
    "credits": _0x3a373f
  } = await _0x5c58bc['json'](),
        _0x6df978 = {
    'status': 0,
    "hard_limit_usd": _0x3a373f,
    'total_usage': 0
  };
  return _0x6df978;
}

function keyUsage(_0x3248f6) {
  const {
    "host": _0x34bc9e,
    "key": _0x26663e,
    "type": _0x227f66
  } = _0x3248f6;

  if (_0x227f66 === "openai") {
    return openai(_0x34bc9e, _0x26663e);
  } else {
    if (_0x227f66 === "stability") {
      return stability(_0x34bc9e, _0x26663e);
    }
  }

  const _0x4ff4bf = {
    "status": -1,
    "hard_limit_usd": 0,
    "total_usage": 0
  };
  return _0x4ff4bf;
}

exports["default"] = keyUsage;