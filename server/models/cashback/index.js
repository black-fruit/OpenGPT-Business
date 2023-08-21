'use strict';

const a48_0x474e0d = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a48_0x474e0d);

const tslib_1 = require("tslib"),
      db_1 = require('../db'),
      mysql_1 = tslib_1["__importDefault"](require("../user/mysql")),
      mysql_2 = tslib_1["__importDefault"](require('./mysql'));

async function addCashback(_0x5269a1) {
  const _0x49e3aa = await mysql_2['default']['create'](_0x5269a1);

  return _0x49e3aa;
}

async function getCashbackInfo(_0x5493ac) {
  const _0x55688c = {
    "where": _0x5493ac
  };

  const _0x33ecc6 = await mysql_2["default"]["findOne"](_0x55688c);

  if (_0x33ecc6) {
    return _0x33ecc6['toJSON']();
  }

  return _0x33ecc6;
}

async function getCashback({
  "page": _0x3a3f84,
  "page_size": _0xdcb123
}, _0x378136) {
  const _0x63f8c4 = {
    "foreignKey": "user_id",
    'targetKey': 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1["default"], _0x63f8c4);
  const _0x433160 = {
    "model": mysql_1['default'],
    "required": false,
    'as': "user",
    "attributes": ['id', "account", "avatar", "nickname"]
  };

  const _0x45eeee = await mysql_2["default"]["findAndCountAll"]({
    'where': _0x378136,
    'include': [_0x433160],
    'order': [["create_time", "DESC"]],
    'offset': _0x3a3f84 * _0xdcb123,
    'limit': _0xdcb123
  }),
        _0x40ceeb = await Promise["all"](_0x45eeee["rows"]['map'](async _0x12ef64 => {
    const _0x28de82 = await _0x12ef64["toJSON"](),
          _0x38e675 = await mysql_1['default']['findByPk'](_0x28de82?.["benefit_id"])["then"](_0x9efe33 => _0x9efe33?.["toJSON"]());

    if (!_0x38e675) {
      const _0x42d986 = { ..._0x28de82,
        'benefit': null
      };
      return _0x42d986;
    }

    const _0x5a88bf = {
      'id': _0x38e675['id'],
      "account": _0x38e675["account"],
      "avatar": _0x38e675["avatar"],
      "nickname": _0x38e675["nickname"]
    };
    const _0x121675 = { ..._0x28de82,
      'benefit': _0x5a88bf
    };
    return _0x121675;
  })),
        _0x389ace = { ..._0x45eeee,
    "rows": _0x40ceeb
  };

  return _0x389ace;
}

async function delCashback(_0x5e5609) {
  const _0x575b6b = {
    'id': _0x5e5609
  };
  const _0x2a6bf6 = {
    "where": _0x575b6b
  };

  const _0x33bc96 = await mysql_2["default"]['destroy'](_0x2a6bf6);

  return _0x33bc96;
}

async function editCashback(_0x4d43d7, _0x3075aa) {
  const _0x10b717 = { ..._0x3075aa
  },
        _0x241c4e = {
    'id': _0x4d43d7
  };
  const _0xd5392b = {
    "where": _0x241c4e
  };

  const _0x3792bc = await mysql_2["default"]["update"](_0x10b717, _0xd5392b);

  return _0x3792bc;
}

async function getUserCashbackAmount(_0x42be46, _0x4555e9, _0x1a2ae6) {
  const _0x6e350 = new Date();

  _0x6e350['setHours'](0, 0, 0, 0);

  const _0x113fde = new Date();

  _0x113fde["setHours"](23, 59, 59, 59);

  const _0x3b0964 = _0x1a2ae6 && _0x1a2ae6["length"] === 2 ? [..._0x1a2ae6] : [_0x6e350, _0x113fde],
        _0x3915dc = {
    [db_1["sequelize"]['Op']["between"]]: [..._0x3b0964]
  },
        _0x1fc469 = { ..._0x4555e9,
    "create_time": _0x3915dc
  };

  const _0x1cc633 = {
    "where": _0x1fc469
  };

  const _0x397a94 = await mysql_2["default"]['sum'](_0x42be46, _0x1cc633),
        _0x4bc016 = {};

  _0x4bc016[_0x42be46] = _0x397a94 || 0;
  return _0x4bc016;
}

const a48_0x5e8f00 = {
  "addCashback": addCashback,
  "getCashback": getCashback,
  "delCashback": delCashback,
  "editCashback": editCashback,
  "getCashbackInfo": getCashbackInfo,
  "getUserCashbackAmount": getUserCashbackAmount
};
exports["default"] = a48_0x5e8f00;