'use strict';

const a70_0x5e1ab9 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a70_0x5e1ab9);

const tslib_1 = require('tslib'),
      db_1 = require('../db'),
      mysql_1 = tslib_1["__importDefault"](require("../user/mysql")),
      mysql_2 = tslib_1["__importDefault"](require('./mysql'));

async function getPersonas({
  "page": _0x50e75b,
  "page_size": _0x265a54
}, _0x533a24) {
  const _0x2a1f50 = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2['default']['belongsTo'](mysql_1["default"], _0x2a1f50);
  const _0x55b6b5 = {
    "model": mysql_1['default'],
    "required": false,
    'attributes': ['id', "account", "avatar", "nickname"]
  };
  const _0x3e4de5 = {
    "where": _0x533a24,
    "include": [_0x55b6b5],
    'order': [["create_time", "DESC"]],
    "offset": _0x50e75b * _0x265a54,
    "limit": _0x265a54
  };

  const _0x74efb6 = await mysql_2["default"]['findAndCountAll'](_0x3e4de5);

  return _0x74efb6;
}

async function getAllPersona() {
  const _0x4c02ef = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2['default']['belongsTo'](mysql_1["default"], _0x4c02ef);
  const _0x6a4bfd = {
    "status": 1,
    "system": 0
  };
  const _0x21c80f = {
    "model": mysql_1["default"],
    "required": false,
    "attributes": ['id', "account", "avatar", "nickname"]
  };
  const _0x2e3339 = {
    "where": _0x6a4bfd,
    "include": [_0x21c80f],
    "order": [["create_time", "DESC"]]
  };

  const _0x3a5fc1 = await mysql_2["default"]["findAll"](_0x2e3339);

  return _0x3a5fc1;
}

async function getRandomPersonas(_0x1b30c8 = 9) {
  const _0x212246 = {
    "status": 1,
    "system": 0
  };

  const _0x1acf80 = await mysql_2["default"]["findAll"]({
    'order': db_1["sequelize"]["literal"]("rand()"),
    'limit': _0x1b30c8,
    'where': _0x212246
  });

  return _0x1acf80;
}

async function delPersona(_0x506e1b) {
  const _0x28017d = {
    'id': _0x506e1b
  };
  const _0x2a9c18 = {
    "where": _0x28017d
  };

  const _0x41a0d9 = await mysql_2["default"]["destroy"](_0x2a9c18);

  return _0x41a0d9;
}

async function addPersona(_0x346f04) {
  const _0x3f102a = await mysql_2["default"]["create"](_0x346f04);

  return _0x3f102a;
}

async function editPersona(_0x6e53b7, _0x33fa60) {
  const _0x47f3b5 = {
    'id': _0x6e53b7
  };
  const _0x3aa546 = {
    'where': _0x47f3b5
  };

  const _0x26d88b = await mysql_2["default"]["update"](_0x33fa60, _0x3aa546);

  return _0x26d88b;
}

async function getPersonaContext(_0x21d04e) {
  const _0x9b9d82 = { ..._0x21d04e
  },
        _0xe39c41 = {
    "where": _0x9b9d82
  };

  const _0x30aba0 = await mysql_2["default"]['findOne'](_0xe39c41);

  let _0x1fbd64 = [];

  if (!_0x30aba0) {
    return _0x1fbd64;
  }

  const _0x426d61 = await _0x30aba0["toJSON"]();

  try {
    _0x1fbd64 = JSON["parse"](_0x426d61["context"]);
  } catch (_0x2283c5) {
    _0x1fbd64 = [];
  }

  return _0x1fbd64["map"](_0x3345d6 => {
    const _0x83fba = {
      "role": _0x3345d6['role'],
      "content": _0x3345d6["content"]
    };
    return _0x83fba;
  })["reverse"]();
}

const a70_0x578ce8 = {
  'getPersonas': getPersonas,
  "delPersona": delPersona,
  "addPersona": addPersona,
  "editPersona": editPersona,
  "getRandomPersonas": getRandomPersonas,
  "getPersonaContext": getPersonaContext,
  "getAllPersona": getAllPersona
};
exports["default"] = a70_0x578ce8;