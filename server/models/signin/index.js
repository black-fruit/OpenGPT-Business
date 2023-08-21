'use strict';

const a76_0x5b74c1 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a76_0x5b74c1);

const tslib_1 = require("tslib"),
      db_1 = require('../db'),
      mysql_1 = tslib_1["__importDefault"](require("../user/mysql")),
      mysql_2 = tslib_1["__importDefault"](require('./mysql'));

async function addSignin(_0x328ee8) {
  const _0x4f2633 = { ..._0x328ee8
  },
        _0x40376f = await mysql_2["default"]['create'](_0x4f2633);

  return _0x40376f;
}

async function getUserDaySignin(_0x2288a9, _0x3c9ad0) {
  const _0x33bbd4 = {
    [db_1["sequelize"]['Op']['gte']]: _0x3c9ad0
  },
        _0x3cd944 = {
    "user_id": _0x2288a9,
    "create_time": _0x33bbd4
  };
  const _0x5218ec = {
    "where": _0x3cd944
  };

  const _0x6385b2 = await mysql_2["default"]['findOne'](_0x5218ec);

  if (_0x6385b2) {
    return true;
  }

  return false;
}

async function getSignins({
  "page": _0x377c1c,
  "page_size": _0x2e80c4
}, _0x35f18b) {
  const _0x4e3428 = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1["default"], _0x4e3428);
  const _0x2a4678 = {
    "model": mysql_1["default"],
    "required": false
  };

  const _0x54c0fd = await mysql_2["default"]["findAndCountAll"]({
    'where': _0x35f18b,
    'include': [_0x2a4678],
    'order': [["create_time", "DESC"]],
    'offset': _0x377c1c * _0x2e80c4,
    'limit': _0x2e80c4
  });

  return _0x54c0fd;
}

async function getUserSigninList(_0x1448d4, {
  "start_time": _0x110278,
  "end_time": _0x3518e2
}) {
  const _0x3be12d = {
    [db_1['sequelize']['Op']['gte']]: _0x110278,
    [db_1["sequelize"]['Op']['lt']]: _0x3518e2
  },
        _0x1a83ff = {
    "user_id": _0x1448d4,
    'status': 1,
    "create_time": _0x3be12d
  };
  const _0x52f0d9 = {
    "where": _0x1a83ff
  };

  const _0x1a3be7 = await mysql_2['default']["findAll"](_0x52f0d9);

  return _0x1a3be7;
}

const a76_0x27cd59 = {
  "addSignin": addSignin,
  "getUserDaySignin": getUserDaySignin,
  "getSignins": getSignins,
  "getUserSigninList": getUserSigninList
};
exports["default"] = a76_0x27cd59;