'use strict';

const a72_0x386cf2 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a72_0x386cf2);

const tslib_1 = require("tslib"),
      db_1 = require('../db'),
      mysql_1 = tslib_1['__importDefault'](require('../user/mysql')),
      mysql_2 = tslib_1["__importDefault"](require("./mysql")),
      utils_1 = require("../../utils");

async function getPlugins({
  "page": _0x47d1e4,
  "page_size": _0x386d7f
}, _0x47dd57) {
  const _0x2b66fa = {
    "foreignKey": "user_id",
    'targetKey': 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1['default'], _0x2b66fa);
  const _0x375317 = {
    "model": mysql_1['default'],
    "required": false,
    "attributes": ['id', "account", "avatar", "nickname"]
  };

  const _0x658c67 = await mysql_2["default"]["findAndCountAll"]({
    'where': _0x47dd57,
    'include': [_0x375317],
    'order': [["create_time", "DESC"]],
    'offset': _0x47d1e4 * _0x386d7f,
    'limit': _0x386d7f
  });

  return _0x658c67;
}

async function getUserPluginAll(_0x583703) {
  const _0x16947c = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1["default"], _0x16947c);
  const _0x104058 = {
    "user_id": _0x583703,
    "status": 1
  };
  const _0x49b961 = {
    [db_1["sequelize"]['Op']['or']]: _0x104058
  },
        _0x4c6bb2 = {
    "model": mysql_1["default"],
    "required": false,
    "attributes": ['id', "account", "avatar", "nickname"]
  };
  const _0x1f3bb2 = {
    "where": _0x49b961,
    "include": [_0x4c6bb2],
    'order': [["create_time", 'DESC']]
  };

  const _0x287776 = await mysql_2["default"]["findAll"](_0x1f3bb2),
        _0x8c6cc3 = _0x287776["map"](_0x570884 => {
    const _0x59ef36 = _0x570884["toJSON"]();

    if (_0x59ef36["user_id"] === _0x583703) {
      const _0x12a6e7 = { ..._0x59ef36
      };
      return _0x12a6e7;
    }

    const _0xce4bdc = { ..._0x59ef36,
      "function": null,
      'script': null,
      "variables": null
    };
    return (0, utils_1["filterObjectNull"])(_0xce4bdc);
  });

  return [..._0x8c6cc3];
}

async function delPlugin(_0x224f2c) {
  const _0x18f759 = {
    'id': _0x224f2c
  };
  const _0x4b74e0 = {
    "where": _0x18f759
  };

  const _0x19cd53 = await mysql_2["default"]["destroy"](_0x4b74e0);

  return _0x19cd53;
}

async function addPlugin(_0x193c4f) {
  const _0x1f3b55 = await mysql_2['default']["create"](_0x193c4f);

  return _0x1f3b55;
}

async function editPlugin(_0x352784, _0x47ab5a) {
  const _0x5a05b8 = {
    'id': _0x352784
  };
  const _0x34ffe2 = {
    'where': _0x5a05b8
  };

  const _0x51a5ab = await mysql_2["default"]["update"](_0x47ab5a, _0x34ffe2);

  return _0x51a5ab;
}

async function getInPlugins(_0x5bb994, _0x574859) {
  const _0x21d33f = {
    [db_1['sequelize']['Op']['in']]: [..._0x5bb994]
  },
        _0x412155 = {
    [db_1["sequelize"]['Op']['ne']]: 0
  },
        _0x2a0482 = {
    'id': _0x21d33f,
    'status': _0x412155,
    ..._0x574859
  },
        _0x57aeeb = {
    "where": _0x2a0482
  };

  const _0x12907f = await mysql_2["default"]["findAll"](_0x57aeeb);

  if (!_0x12907f) {
    return [];
  }

  return _0x12907f["map"](_0x50eafa => _0x50eafa["toJSON"]());
}

const a72_0x2daa22 = {
  "getPlugins": getPlugins,
  "delPlugin": delPlugin,
  "addPlugin": addPlugin,
  "editPlugin": editPlugin,
  "getUserPluginAll": getUserPluginAll,
  "getInPlugins": getInPlugins
};
exports["default"] = a72_0x2daa22;