'use strict';

const a60_0x1fbccb = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a60_0x1fbccb);

const tslib_1 = require("tslib"),
      db_1 = require("../db"),
      mysql_1 = tslib_1['__importDefault'](require('../user/mysql')),
      mysql_2 = tslib_1["__importDefault"](require("./mysql"));

async function addInviteRecord(_0x21880a) {
  const _0x580f16 = { ..._0x21880a
  },
        _0x266e51 = await mysql_2["default"]["create"](_0x580f16);

  return _0x266e51;
}

async function getInviteRecord(_0x326c99) {
  const _0x281052 = {
    "where": _0x326c99
  };

  const _0x46d8ec = await mysql_2["default"]["findOne"](_0x281052);

  if (_0x46d8ec) {
    return _0x46d8ec['toJSON']();
  }

  return _0x46d8ec;
}

async function getInviteRecordAll(_0x43d4b8) {
  const _0x138edb = {
    "where": _0x43d4b8
  };

  const _0x3a6168 = await mysql_2["default"]["findAll"](_0x138edb);

  return _0x3a6168;
}

async function getInviteRecords({
  "page": _0x23891f,
  "page_size": _0x510d99
}, _0x4c7a60) {
  const _0x344326 = {
    'foreignKey': "user_id",
    "targetKey": 'id'
  };
  mysql_2['default']["belongsTo"](mysql_1["default"], _0x344326);
  const _0x173ddd = {
    "model": mysql_1['default'],
    "required": false,
    'as': "user",
    'attributes': ['id', "account", 'avatar', "nickname"]
  };

  const _0x2543ce = await mysql_2["default"]['findAndCountAll']({
    'where': _0x4c7a60,
    'include': [_0x173ddd],
    'order': [["create_time", "DESC"]],
    'offset': _0x23891f * _0x510d99,
    'limit': _0x510d99
  }),
        _0x58f87b = await Promise["all"](_0x2543ce["rows"]["map"](async _0x35c0a9 => {
    const _0x4a8579 = await _0x35c0a9["toJSON"](),
          _0x10a494 = await mysql_1["default"]["findByPk"](_0x4a8579?.["superior_id"])['then'](_0x4d93f8 => _0x4d93f8?.['toJSON']());

    console["log"](_0x10a494);

    if (!_0x10a494) {
      const _0x3149d4 = { ..._0x4a8579,
        "superior": null
      };
      return _0x3149d4;
    }

    const _0x50b84f = {
      'id': _0x10a494['id'],
      "account": _0x10a494["account"],
      "avatar": _0x10a494["avatar"],
      "nickname": _0x10a494["nickname"]
    };
    const _0xaba8a3 = { ..._0x4a8579,
      "superior": _0x50b84f
    };
    return _0xaba8a3;
  })),
        _0x4fb209 = { ..._0x2543ce,
    "rows": _0x58f87b
  };

  return _0x4fb209;
}

async function delInviteRecord(_0x407faa) {
  const _0x10ce5e = {
    'id': _0x407faa
  };
  const _0x1f1e11 = {
    "where": _0x10ce5e
  };

  const _0x362e15 = await mysql_2["default"]["destroy"](_0x1f1e11);

  return _0x362e15;
}

async function editInviteRecord(_0x1f6e4f, _0x1928f7) {
  const _0x2eb938 = { ..._0x1928f7
  },
        _0x56fb73 = {
    'id': _0x1f6e4f
  };
  const _0x29ec8f = {
    "where": _0x56fb73
  };

  const _0x6e77d1 = await mysql_2["default"]["update"](_0x2eb938, _0x29ec8f);

  return _0x6e77d1;
}

async function getUserInviteCount(_0x249846, _0x355d16) {
  const _0xb76d36 = new Date();

  _0xb76d36["setHours"](0, 0, 0, 0);

  const _0x4d4f51 = new Date();

  _0x4d4f51["setHours"](23, 59, 59, 59);

  const _0x343508 = _0x355d16 && _0x355d16["length"] === 2 ? [..._0x355d16] : [_0xb76d36, _0x4d4f51],
        _0xc9ad3c = {
    [db_1['sequelize']['Op']["between"]]: [..._0x343508]
  },
        _0x113fae = {
    "superior_id": _0x249846,
    "create_time": _0xc9ad3c
  };

  const _0x61e62c = {
    "where": _0x113fae
  };

  const _0x3b5113 = await mysql_2["default"]["count"](_0x61e62c),
        _0x37fe72 = {
    "invite_count": _0x3b5113 || 0
  };

  return _0x37fe72;
}

const a60_0x87caa1 = {
  "addInviteRecord": addInviteRecord,
  "getInviteRecords": getInviteRecords,
  "delInviteRecord": delInviteRecord,
  "editInviteRecord": editInviteRecord,
  "getInviteRecord": getInviteRecord,
  "getInviteRecordAll": getInviteRecordAll,
  'getUserInviteCount': getUserInviteCount
};
exports["default"] = a60_0x87caa1;