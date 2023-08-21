'use strict';

const a112_0x4865f5 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a112_0x4865f5);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require("express")),
      models_1 = require('../../models'),
      utils_1 = require('../../utils'),
      router = express_1["default"]['Router']();

router["get"]("/plugin", async (_0x583be2, _0x4c56a3, _0x394525) => {
  const _0x45e2b9 = _0x583be2?.["user_id"];

  let _0x1f858c = await models_1["pluginModel"]["getUserPluginAll"](_0x45e2b9);

  if (_0x45e2b9) {
    const _0x2cc617 = _0x1f858c["map"](async _0x1e93bb => {
      const _0x4dc270 = {
        'user_id': _0x45e2b9,
        "plugin_id": _0x1e93bb['id'],
        "status": 1
      };

      const _0x916b59 = await models_1["installedPluginModel"]['getInstalledPluginLog'](_0x4dc270),
            _0x39218c = { ..._0x1e93bb,
        "installed": !!_0x916b59
      };

      return _0x39218c;
    });

    _0x1f858c = (await Promise['all'](_0x2cc617))["map"](_0x37e916 => _0x37e916);
  }

  _0x4c56a3["json"]((0, utils_1["httpBody"])(0, _0x1f858c));
});
router["post"]("/plugin", async (_0x489130, _0x729845, _0x2cb884) => {
  _0x729845['json']((0, utils_1['httpBody'])(0, "发送成功"));
});
router["put"]("/plugin/installed/:id", async (_0x144c12, _0x4c5de8, _0xba163) => {
  const {
    "id": _0xaddb1d
  } = _0x144c12["params"],
        _0x3ed35d = _0x144c12?.['user_id'];

  if (!_0xaddb1d || !_0x3ed35d) {
    _0x4c5de8["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x10bb3a = {
    "user_id": _0x3ed35d,
    "plugin_id": _0xaddb1d,
    "status": 1
  };

  const _0x25b44b = await models_1['installedPluginModel']["getInstalledPluginLog"](_0x10bb3a);

  if (_0x25b44b) {
    _0x4c5de8["json"]((0, utils_1["httpBody"])(0, "安装成功"));

    return;
  }

  const _0x2e05e4 = {
    'user_id': _0x3ed35d,
    'plugin_id': _0xaddb1d,
    "status": 1
  };
  await models_1["installedPluginModel"]["addInstalledPlugin"](_0x2e05e4);

  _0x4c5de8["json"]((0, utils_1["httpBody"])(0, "安装成功"));
});
router["put"]("/plugin/uninstall/:id", async (_0x231da6, _0x338dc9, _0x5da364) => {
  const {
    "id": _0x2a4afd
  } = _0x231da6["params"],
        _0x46afe1 = _0x231da6?.["user_id"];

  if (!_0x2a4afd || !_0x46afe1) {
    _0x338dc9["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x247f67 = {
    "status": 0
  };
  const _0x5e554c = {
    "user_id": _0x46afe1,
    "plugin_id": _0x2a4afd,
    "status": 1
  };
  await models_1["installedPluginModel"]["editInstalledPlugin"](_0x247f67, _0x5e554c);

  _0x338dc9['json']((0, utils_1["httpBody"])(0, "操作成功"));
});
exports["default"] = router;