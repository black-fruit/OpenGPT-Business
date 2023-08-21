'use strict';

const a62_0x4087dd = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a62_0x4087dd);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1['__importDefault'](require("../user/mysql")),
      mysql_2 = tslib_1["__importDefault"](require("../persona/mysql")),
      mysql_3 = tslib_1["__importDefault"](require("./mysql")),
      mysql_4 = tslib_1["__importDefault"](require("../plugin/mysql"));

async function addMessages(_0x5c49ff) {
  const _0x4ab9dc = await mysql_3["default"]["bulkCreate"]([..._0x5c49ff]);

  return _0x4ab9dc;
}

async function getMessages({
  "page": _0x2bd00a,
  "page_size": _0x5013ef
}, _0x3c2a45) {
  const _0xa89f4f = {
    "foreignKey": "user_id",
    "targetKey": 'id'
  };
  mysql_3["default"]["belongsTo"](mysql_1["default"], _0xa89f4f);
  const _0x2240db = {
    "foreignKey": "persona_id",
    "targetKey": 'id'
  };
  mysql_3["default"]["belongsTo"](mysql_2["default"], _0x2240db);
  const _0x476db1 = {
    "foreignKey": 'plugin_id',
    "targetKey": 'id'
  };
  mysql_3["default"]["belongsTo"](mysql_4["default"], _0x476db1);
  const _0x171dcb = {
    'model': mysql_1["default"],
    "required": false
  };
  const _0x1efd9b = {
    "model": mysql_2['default'],
    "required": false
  };
  const _0x417281 = {
    "model": mysql_4['default'],
    "required": false
  };
  const _0x65596e = {
    "where": _0x3c2a45,
    "include": [_0x171dcb, _0x1efd9b, _0x417281],
    "order": [["create_time", "DESC"]],
    "offset": _0x2bd00a * _0x5013ef,
    'limit': _0x5013ef
  };

  const _0x5a1455 = await mysql_3['default']["findAndCountAll"](_0x65596e);

  return _0x5a1455;
}

async function getUserMessages(_0x201f7d) {
  const _0x2cbd21 = {
    "foreignKey": "plugin_id",
    'targetKey': 'id'
  };
  mysql_3["default"]["belongsTo"](mysql_4["default"], _0x2cbd21);
  const _0x120894 = {
    "user_id": _0x201f7d,
    'status': 1
  };
  const _0x185bd5 = {
    "model": mysql_4['default'],
    "attributes": ['id', "name", "avatar", "description"],
    "required": false
  };
  const _0x6e9a29 = {
    "where": _0x120894,
    "include": [_0x185bd5],
    "order": [["create_time", "ASC"]]
  };
  return await mysql_3["default"]["findAll"](_0x6e9a29)["then"](_0x38ecb0 => {
    const _0x1c5a9c = [];
    let _0x827071 = [],
        _0x5ac6ca = undefined;

    _0x38ecb0["forEach"](_0x1ded36 => {
      _0x1ded36["parent_message_id"] !== _0x5ac6ca && (_0x827071["length"] > 0 && _0x1c5a9c["push"](_0x827071), _0x827071 = [], _0x5ac6ca = _0x1ded36["parent_message_id"]);
      const _0x426f91 = {
        'user_id': _0x1ded36['user_id'],
        "dateTime": _0x1ded36["create_time"],
        "role": _0x1ded36['role'],
        "status": 'pass',
        'text': _0x1ded36["content"],
        "persona_id": _0x1ded36["persona_id"],
        "plugin_id": _0x1ded36["plugin_id"],
        "plugin_info": _0x1ded36['plugin'],
        "requestOptions": {}
      };
      _0x426f91["requestOptions"]['parentMessageId'] = _0x1ded36["parent_message_id"];
      _0x426f91["requestOptions"]["prompt"] = _0x1ded36["content"];
      _0x426f91["requestOptions"]["options"] = {};
      _0x426f91["requestOptions"]["options"]["frequency_penalty"] = _0x1ded36["frequency_penalty"];
      _0x426f91["requestOptions"]["options"]["max_tokens"] = _0x1ded36["max_tokens"];
      _0x426f91["requestOptions"]["options"]["model"] = _0x1ded36["model"];
      _0x426f91["requestOptions"]["options"]["presence_penalty"] = _0x1ded36["presence_penalty"];
      _0x426f91["requestOptions"]["options"]['temperature'] = _0x1ded36["temperature"];

      _0x827071['push'](_0x426f91);
    });

    _0x827071["length"] > 0 && _0x1c5a9c["push"](_0x827071);

    const _0x32fc07 = _0x1c5a9c["map"](_0x39c784 => {
      const _0x3c8b5e = {
        "data": _0x39c784,
        'id': _0x39c784[0]["requestOptions"]["parentMessageId"],
        'path': _0x39c784[0]["requestOptions"]["parentMessageId"],
        "name": _0x39c784[0]['text'],
        "persona_id": _0x39c784[0]["persona_id"]
      };
      return _0x3c8b5e;
    });

    return _0x32fc07['reverse']();
  });
}

async function updateChats(_0x3705cd) {
  const _0xf7d9cb = {
    "status": 0
  };
  const _0x41f2d5 = {
    'where': _0x3705cd
  };

  const _0x8f8230 = await mysql_3["default"]['update'](_0xf7d9cb, _0x41f2d5);

  return _0x8f8230;
}

async function updateMessage(_0x3a898c, _0x3a696e) {
  const _0x177ca7 = { ..._0x3a898c
  },
        _0x1feef8 = {
    'where': _0x3a696e
  };

  const _0x38f8bb = await mysql_3["default"]['update'](_0x177ca7, _0x1feef8);

  return _0x38f8bb;
}

async function delMessage(_0x48a420) {
  const _0x1f57ec = { ..._0x48a420
  },
        _0xfa0abc = {
    "where": _0x1f57ec
  };

  const _0x565ab4 = await mysql_3["default"]["destroy"](_0xfa0abc);

  return _0x565ab4;
}

const a62_0x22b04a = {
  "addMessages": addMessages,
  "getMessages": getMessages,
  'getUserMessages': getUserMessages,
  "updateChats": updateChats,
  'delMessage': delMessage,
  "updateMessage": updateMessage
};
exports["default"] = a62_0x22b04a;