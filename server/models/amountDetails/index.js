'use strict';

const a44_0x27490f = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a44_0x27490f);

const tslib_1 = require("tslib"),
      mysql_1 = tslib_1['__importDefault'](require("./mysql")),
      mysql_2 = tslib_1['__importDefault'](require("../user/mysql"));

async function getAmountDetail(_0x56251c) {
  const _0x1078a2 = {
    'where': _0x56251c,
    'order': [["create_time", "DESC"]],
    "limit": 1
  };

  const _0x588213 = await mysql_1["default"]['findOne'](_0x1078a2);

  if (_0x588213) {
    return _0x588213["toJSON"]();
  }

  const _0x3ef0f8 = {
    'current_amount': 0
  };
  return _0x588213 || _0x3ef0f8;
}

async function updateAmountDetail(_0x17f4e0, _0x3d8e38) {
  const _0x5e2419 = { ..._0x3d8e38
  },
        _0x3d8db7 = {
    'where': _0x5e2419
  };

  const _0x7529ee = await mysql_1["default"]["update"](_0x17f4e0, _0x3d8db7);

  return _0x7529ee;
}

async function getAmountDetails({
  "page": _0x5552af,
  "page_size": _0x17f869
}, _0x5c2035) {
  const _0x3c7fbb = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_1["default"]['belongsTo'](mysql_2["default"], _0x3c7fbb);
  const _0x5460fa = {
    "model": mysql_2["default"],
    "required": false,
    "attributes": ['id', "account", "avatar", "nickname"]
  };

  const _0x28d7bc = await mysql_1["default"]["findAndCountAll"]({
    'where': _0x5c2035,
    'include': [_0x5460fa],
    'order': [["create_time", "DESC"]],
    'offset': _0x5552af * _0x17f869,
    'limit': _0x17f869
  });

  return _0x28d7bc;
}

async function delAmountDetail(_0x383f5e) {
  const _0x2a21f4 = {
    'id': _0x383f5e
  };
  const _0x20e205 = {
    "where": _0x2a21f4
  };

  const _0x280ed7 = await mysql_1['default']["destroy"](_0x20e205);

  return _0x280ed7;
}

async function addAmountDetails(_0x44d58b) {
  const _0xed5e51 = { ..._0x44d58b
  },
        _0x103fec = await mysql_1["default"]["create"](_0xed5e51);

  return _0x103fec;
}

const a44_0x361687 = {
  "getAmountDetail": getAmountDetail,
  "addAmountDetails": addAmountDetails,
  "getAmountDetails": getAmountDetails,
  'delAmountDetail': delAmountDetail,
  "updateAmountDetail": updateAmountDetail
};
exports["default"] = a44_0x361687;