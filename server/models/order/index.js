'use strict';

const a66_0x2ed0c4 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a66_0x2ed0c4);

const tslib_1 = require("tslib"),
      mysql_1 = tslib_1["__importDefault"](require('../user/mysql')),
      mysql_2 = tslib_1["__importDefault"](require("./mysql"));

async function getOrders({
  "page": _0x535b86,
  "page_size": _0x5bb5d3
}, _0x426162) {
  const _0x3f26cd = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2["default"]['belongsTo'](mysql_1["default"], _0x3f26cd);
  const _0x198743 = {
    'model': mysql_1["default"],
    'required': false
  };

  const _0x13949e = await mysql_2['default']['findAndCountAll']({
    'where': _0x426162,
    'include': [_0x198743],
    'order': [["create_time", "DESC"]],
    'offset': _0x535b86 * _0x5bb5d3,
    'limit': _0x5bb5d3
  });

  return _0x13949e;
}

async function getOrderInfo(_0x257db8) {
  const _0x1edddb = await mysql_2["default"]["findByPk"](_0x257db8);

  if (!_0x1edddb) {
    return null;
  }

  return _0x1edddb["toJSON"]();
}

async function delOrder(_0x1aeaa8) {
  const _0x273492 = {
    'id': _0x1aeaa8
  };
  const _0x579c4b = {
    "where": _0x273492
  };

  const _0x3ef2c4 = await mysql_2["default"]['destroy'](_0x579c4b);

  return _0x3ef2c4;
}

async function addOrder(_0x33d3ff) {
  const _0x14d302 = await mysql_2["default"]["create"](_0x33d3ff);

  return _0x14d302;
}

async function editOrder(_0x3a9a86) {
  const _0x467bea = await mysql_2["default"]['upsert'](_0x3a9a86);

  return _0x467bea;
}

const a66_0x24bd4f = {
  "getOrders": getOrders,
  "delOrder": delOrder,
  "addOrder": addOrder,
  "editOrder": editOrder,
  "getOrderInfo": getOrderInfo
};
exports['default'] = a66_0x24bd4f;