'use strict';

const a46_0x3d2de9 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a46_0x3d2de9);

const tslib_1 = require("tslib"),
      db_1 = require("../db"),
      mysql_1 = tslib_1["__importDefault"](require("./mysql")),
      mysql_2 = tslib_1["__importDefault"](require("../user/mysql"));

async function getCarmiInfo(_0xe08573) {
  const _0x28f76e = {
    "where": _0xe08573
  };

  const _0x1fdb92 = await mysql_1['default']["findOne"](_0x28f76e);

  return _0x1fdb92;
}

async function updateCarmiInfo(_0x32f3b8, _0x32fabf) {
  const _0x4ee15f = { ..._0x32fabf
  },
        _0x5dd136 = {
    "where": _0x4ee15f
  };

  const _0x3088d3 = await mysql_1["default"]["update"](_0x32f3b8, _0x5dd136);

  return _0x3088d3;
}

async function getCarmis({
  "page": _0x227137,
  "page_size": _0x43ab59
}, _0x346f20) {
  const _0x12758c = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_1['default']['belongsTo'](mysql_2['default'], _0x12758c);
  const _0x496a98 = {
    "model": mysql_2["default"],
    "required": false
  };

  const _0x43aa9e = await mysql_1["default"]["findAndCountAll"]({
    'where': _0x346f20,
    'include': [_0x496a98],
    'order': [["create_time", "DESC"]],
    'offset': _0x227137 * _0x43ab59,
    'limit': _0x43ab59
  });

  return _0x43aa9e;
}

async function delCarmi(_0x515fa3) {
  const _0x547371 = {
    'id': _0x515fa3
  };
  const _0x3edf75 = {
    "where": _0x547371
  };

  const _0x179322 = await mysql_1['default']["destroy"](_0x3edf75);

  return _0x179322;
}

async function addCarmis(_0x10ffa0) {
  const _0x5d0f77 = await mysql_1['default']["bulkCreate"]([..._0x10ffa0]);

  return _0x5d0f77;
}

async function checkCarmiEndTime(_0x310399) {
  const _0x8326a2 = {
    "status": 2
  };
  const _0x5587fc = {
    [db_1["sequelize"]['Op']['lt']]: _0x310399,
    [db_1["sequelize"]['Op']['ne']]: ''
  },
        _0x2ad1f2 = {
    "end_time": _0x5587fc,
    "status": 0
  };
  const _0x43dc8a = {
    "where": _0x2ad1f2
  };

  const _0x458bab = await mysql_1["default"]['update'](_0x8326a2, _0x43dc8a);

  return _0x458bab;
}

const a46_0x2d7307 = {
  'getCarmiInfo': getCarmiInfo,
  'updateCarmiInfo': updateCarmiInfo,
  'getCarmis': getCarmis,
  "delCarmi": delCarmi,
  "addCarmis": addCarmis,
  "checkCarmiEndTime": checkCarmiEndTime
};
exports['default'] = a46_0x2d7307;