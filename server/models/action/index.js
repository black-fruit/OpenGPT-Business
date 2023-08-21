'use strict';

const a40_0x2f1464 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a40_0x2f1464);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1["__importDefault"](require('../user/mysql')),
      mysql_2 = tslib_1["__importDefault"](require("./mysql"));

async function addAction(_0x9ea096) {
  const _0x3144dd = await mysql_2["default"]["create"](_0x9ea096);

  return _0x3144dd;
}

async function getActions({
  "page": _0x4d5169,
  "page_size": _0x3c5aeb
}, _0x161df2) {
  const _0x106568 = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2['default']["belongsTo"](mysql_1["default"], _0x106568);
  const _0x59bacc = {
    "model": mysql_1['default'],
    'required': false
  };
  const _0x2ae610 = {
    "where": _0x161df2,
    'include': [_0x59bacc],
    'order': [["create_time", "DESC"]],
    "offset": _0x4d5169 * _0x3c5aeb,
    "limit": _0x3c5aeb
  };

  const _0x42a592 = await mysql_2['default']["findAndCountAll"](_0x2ae610);

  return _0x42a592;
}

const a40_0x25566 = {
  "addAction": addAction,
  "getActions": getActions
};
exports["default"] = a40_0x25566;