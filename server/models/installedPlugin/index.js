'use strict';

const a58_0x230cfa = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a58_0x230cfa);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function getInstalledPluginLog(_0x2d4c6e) {
  const _0x5dd4b2 = { ..._0x2d4c6e
  },
        _0x5ff3a6 = {
    'where': _0x5dd4b2
  };

  const _0x5b6152 = await mysql_1["default"]["findOne"](_0x5ff3a6);

  return _0x5b6152;
}

async function addInstalledPlugin(_0x174015) {
  const _0x1bea01 = { ..._0x174015
  },
        _0x14a57c = await mysql_1["default"]["create"](_0x1bea01);

  return _0x14a57c;
}

async function editInstalledPlugin(_0x3dedbe, _0x202cbd) {
  const _0x1ddeea = {
    "where": _0x202cbd
  };

  const _0x507856 = await mysql_1['default']['update'](_0x3dedbe, _0x1ddeea);

  return _0x507856;
}

async function getInstalledPluginCount(_0x5116f8) {
  const _0x3f3efc = { ..._0x5116f8
  },
        _0x5968f1 = {
    'where': _0x3f3efc
  };

  const _0x4d617a = await mysql_1['default']["findAndCountAll"](_0x5968f1);

  return _0x4d617a;
}

async function getUserInstalledPluginIds(_0x37d798, _0x12b45c, _0x1fc04b) {
  const _0x43f375 = {
    'user_id': _0x37d798,
    'status': 1,
    ..._0x12b45c
  },
        _0x3de452 = {
    'where': _0x43f375
  };

  const _0x4d0eac = await mysql_1["default"]["findAll"](_0x3de452);

  if (_0x1fc04b) {
    const _0x3e08b7 = _0x4d0eac['map'](_0x35c7ad => _0x35c7ad["toJSON"]())["map"](_0x2af9e3 => _0x2af9e3["plugin_id"]);

    return _0x3e08b7;
  }

  return _0x4d0eac;
}

const a58_0x436359 = {
  'getInstalledPluginLog': getInstalledPluginLog,
  'addInstalledPlugin': addInstalledPlugin,
  "editInstalledPlugin": editInstalledPlugin,
  'getUserInstalledPluginIds': getUserInstalledPluginIds,
  "getInstalledPluginCount": getInstalledPluginCount
};
exports["default"] = a58_0x436359;