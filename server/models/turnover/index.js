'use strict';

const a78_0x3526fb = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a78_0x3526fb);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1["__importDefault"](require("../user/mysql")),
      mysql_2 = tslib_1['__importDefault'](require("./mysql"));

async function addTurnover(_0x227ed7) {
  const _0x190311 = await mysql_2["default"]['create'](_0x227ed7);

  return _0x190311;
}

async function getUserTurnovers({
  "page": _0x4269b1,
  "page_size": _0x1e4ed8
}, _0x95d0e7) {
  const _0x50ecc8 = await mysql_2["default"]['findAndCountAll']({
    'where': _0x95d0e7,
    'order': [['create_time', "DESC"]],
    'offset': _0x4269b1 * _0x1e4ed8,
    'limit': _0x1e4ed8
  });

  return _0x50ecc8;
}

async function getTurnovers({
  "page": _0xe8035b,
  "page_size": _0x4b1fb5
}, _0xe35416) {
  const _0x2203aa = {
    "foreignKey": "user_id",
    'targetKey': 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1['default'], _0x2203aa);
  const _0x192a83 = {
    'model': mysql_1["default"],
    "required": false
  };

  const _0x5854e4 = await mysql_2['default']['findAndCountAll']({
    'where': _0xe35416,
    'include': [_0x192a83],
    'order': [["create_time", "DESC"]],
    'offset': _0xe8035b * _0x4b1fb5,
    'limit': _0x4b1fb5
  });

  return _0x5854e4;
}

async function delTurnover(_0x21530c) {
  const _0x201c02 = {
    'id': _0x21530c
  };
  const _0x5f283d = {
    'where': _0x201c02
  };

  const _0x2acc22 = await mysql_2["default"]["destroy"](_0x5f283d);

  return _0x2acc22;
}

async function editTurnover(_0xd13840) {
  const _0x6d7877 = { ..._0xd13840
  },
        _0x50b81c = await mysql_2["default"]["upsert"](_0x6d7877);

  return _0x50b81c;
}

const a78_0x2d51a1 = {
  "addTurnover": addTurnover,
  "getUserTurnovers": getUserTurnovers,
  "delTurnover": delTurnover,
  "getTurnovers": getTurnovers,
  'editTurnover': editTurnover
};
exports["default"] = a78_0x2d51a1;