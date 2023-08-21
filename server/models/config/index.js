'use strict';

const a50_0x434e80 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a50_0x434e80);

const tslib_1 = require('tslib'),
      db_1 = require("../db"),
      mysql_1 = tslib_1['__importDefault'](require("./mysql"));

async function getConfig() {
  const _0x23dbda = await mysql_1["default"]["findAll"]();

  return _0x23dbda;
}

async function getConfigValue(_0x1ef129) {
  const _0x4adf75 = await mysql_1['default']['findAll']();

  if (_0x1ef129 && _0x4adf75 && _0x4adf75["length"] > 0) {
    let _0x101b95 = null;

    for (const _0x5d333b of _0x4adf75) {
      const _0x3a2219 = await _0x5d333b["toJSON"]();

      if (_0x3a2219['name'] === _0x1ef129) {
        _0x101b95 = _0x3a2219["value"];
      }
    }

    return _0x101b95;
  }

  return null;
}

async function editConfigs(_0x23d4ca) {
  return db_1["sequelizeExample"]["transaction"](async _0x13aa94 => {
    for (const _0x29a1f0 of _0x23d4ca) {
      const _0x40f93b = {
        "value": _0x29a1f0["value"]
      };
      const _0x595391 = {
        'id': _0x29a1f0['id'],
        "name": _0x29a1f0["name"]
      };
      const _0x152a7d = {
        "where": _0x595391,
        "transaction": _0x13aa94
      };
      await mysql_1["default"]["update"](_0x40f93b, _0x152a7d);
    }
  })["then"](_0x591945 => {
    const _0x3f862f = {
      'code': 0,
      "data": _0x591945
    };
    return _0x3f862f;
  })["catch"](_0x181194 => {
    const _0x4146fd = {
      "code": -1,
      "error": _0x181194
    };
    return _0x4146fd;
  });
}

const a50_0x1fb0f6 = {
  "getConfig": getConfig,
  "editConfigs": editConfigs,
  "getConfigValue": getConfigValue
};
exports['default'] = a50_0x1fb0f6;