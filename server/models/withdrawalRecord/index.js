'use strict';

const a84_0x3b3f58 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a84_0x3b3f58);

const tslib_1 = require("tslib"),
      mysql_1 = tslib_1["__importDefault"](require("../user/mysql")),
      mysql_2 = tslib_1["__importDefault"](require("./mysql"));

async function addWithdrawalRecord(_0x6cb77b) {
  const _0x16d52c = { ..._0x6cb77b
  },
        _0x2b3e80 = await mysql_2["default"]['create'](_0x16d52c);

  return _0x2b3e80;
}

async function getWithdrawalRecord(_0x4d16fc) {
  const _0x30a85a = {
    "where": _0x4d16fc
  };

  const _0x100f5b = await mysql_2['default']["findOne"](_0x30a85a);

  if (_0x100f5b) {
    return _0x100f5b["toJSON"]();
  }

  return _0x100f5b;
}

async function getWithdrawalRecords({
  "page": _0x3e0412,
  "page_size": _0x4b19e0
}, _0x377adf) {
  const _0x3e1a17 = {
    "foreignKey": 'user_id',
    "targetKey": 'id'
  };
  mysql_2["default"]["belongsTo"](mysql_1["default"], _0x3e1a17);
  const _0x55f590 = {
    'model': mysql_1["default"],
    "required": false,
    'as': "user",
    "attributes": ['id', "account", "avatar", 'nickname']
  };

  const _0x2e8572 = await mysql_2["default"]["findAndCountAll"]({
    'where': _0x377adf,
    'include': [_0x55f590],
    'order': [["create_time", "DESC"]],
    'offset': _0x3e0412 * _0x4b19e0,
    'limit': _0x4b19e0
  }),
        _0x5846e4 = { ..._0x2e8572
  };

  return _0x5846e4;
}

async function delWithdrawalRecord(_0x24a2bd) {
  const _0x311e4c = {
    'id': _0x24a2bd
  };
  const _0x5a5e17 = {
    'where': _0x311e4c
  };

  const _0x5cd8c0 = await mysql_2['default']["destroy"](_0x5a5e17);

  return _0x5cd8c0;
}

async function editWithdrawalRecord(_0x11cca2, _0x7ba5f5) {
  const _0x1de33e = { ..._0x7ba5f5
  },
        _0x5e1775 = {
    'id': _0x11cca2
  };
  const _0x301de5 = {
    "where": _0x5e1775
  };

  const _0x3df83b = await mysql_2["default"]['update'](_0x1de33e, _0x301de5);

  return _0x3df83b;
}

const a84_0x52d80b = {
  "addWithdrawalRecord": addWithdrawalRecord,
  "delWithdrawalRecord": delWithdrawalRecord,
  'editWithdrawalRecord': editWithdrawalRecord,
  'getWithdrawalRecord': getWithdrawalRecord,
  "getWithdrawalRecords": getWithdrawalRecords
};
exports["default"] = a84_0x52d80b;