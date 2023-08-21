'use strict';

const a55_0x31b1df = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a55_0x31b1df);

const tslib_1 = require("tslib"),
      db_1 = require("../db"),
      mysql_1 = tslib_1["__importDefault"](require("./mysql")),
      mysql_2 = tslib_1["__importDefault"](require('../user/mysql'));

async function addDrawRecord(_0x1d9676) {
  const _0x2c86bd = await mysql_1["default"]["create"](_0x1d9676);

  return _0x2c86bd;
}

async function getDrawRecord({
  "page": _0x42d3b2,
  "page_size": _0x44d893,
  "user_id": _0x14f9a0,
  "type": _0x299cde,
  "status": status = 1
}) {
  const _0x3d05e4 = {
    "status": status
  };
  let _0x3b55d5 = _0x3d05e4;

  if (_0x299cde === 'me' && _0x14f9a0) {
    const _0x2b6160 = {
      [db_1["sequelize"]['Op']['gte']]: 1
    },
          _0x120ce8 = {
      "status": _0x2b6160,
      "user_id": _0x14f9a0
    };
    _0x3b55d5 = _0x120ce8;
  }

  const _0x21bec1 = await mysql_1["default"]["findAndCountAll"]({
    'where': _0x3b55d5,
    'order': [["create_time", "DESC"]],
    'offset': _0x42d3b2 * _0x44d893,
    'limit': _0x44d893
  }),
        _0x32220c = [];

  for (const _0x1e560a of _0x21bec1['rows']) {
    const _0xd31b17 = await _0x1e560a["toJSON"]();

    _0x32220c["push"]({ ..._0xd31b17,
      'images': JSON["parse"](_0xd31b17["images"])
    });
  }

  const _0x4ddce7 = {
    'count': _0x21bec1['count'],
    "rows": _0x32220c
  };
  return _0x4ddce7;
}

async function getDrawRecords({
  "page": _0x4aa39c,
  "page_size": _0x32b2ad
}) {
  const _0x4f3af0 = {
    'foreignKey': "user_id",
    "targetKey": 'id'
  };
  mysql_1["default"]["belongsTo"](mysql_2["default"], _0x4f3af0);
  const _0x5570f7 = {
    "model": mysql_2["default"],
    "required": false
  };

  const _0x59b97f = await mysql_1['default']["findAndCountAll"]({
    'where': {},
    'include': [_0x5570f7],
    'order': [["create_time", "DESC"]],
    'offset': _0x4aa39c * _0x32b2ad,
    'limit': _0x32b2ad
  }),
        _0x1cc0f8 = [];

  for (const _0x54cc29 of _0x59b97f["rows"]) {
    const _0x592113 = await _0x54cc29['toJSON']();

    _0x1cc0f8["push"]({ ..._0x592113,
      'images': JSON["parse"](_0x592113["images"])
    });
  }

  const _0x4988c4 = {
    "count": _0x59b97f["count"],
    "rows": _0x1cc0f8
  };
  return _0x4988c4;
}

async function setDrawRecord({
  "id": _0x113579,
  "status": _0x2e9a86,
  "user_id": _0x19630b
}) {
  const _0x40acb3 = {
    [db_1['sequelize']['Op']['gt']]: 0
  },
        _0x4a1339 = {
    "status": _0x40acb3,
    "user_id": _0x19630b
  };
  _0x113579 && (_0x4a1339['id'] = _0x113579);
  const _0x40dcfc = {
    'status': _0x2e9a86
  };
  const _0xd594d3 = {
    "where": _0x4a1339
  };

  const _0x142721 = await mysql_1["default"]['update'](_0x40dcfc, _0xd594d3);

  return _0x142721;
}

async function delDrawRecord(_0x590e47) {
  const _0x410c41 = {
    'id': _0x590e47
  };
  const _0x385196 = {
    'where': _0x410c41
  };

  const _0x5c6459 = await mysql_1["default"]["destroy"](_0x385196);

  return _0x5c6459;
}

async function editDrawRecord(_0x198132, _0xf6b9fb) {
  const _0x2e455d = {
    'id': _0x198132
  };
  const _0x13fe85 = {
    "where": _0x2e455d
  };

  const _0x45a217 = await mysql_1["default"]["update"](_0xf6b9fb, _0x13fe85);

  return _0x45a217;
}

const a55_0x227bb2 = {
  'getDrawRecord': getDrawRecord,
  "addDrawRecord": addDrawRecord,
  "setDrawRecord": setDrawRecord,
  'getDrawRecords': getDrawRecords,
  'delDrawRecord': delDrawRecord,
  "editDrawRecord": editDrawRecord
};
exports["default"] = a55_0x227bb2;