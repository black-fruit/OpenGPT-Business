'use strict';

const a91_0x17bbf7 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a91_0x17bbf7);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require('../../models'),
      router = express_1['default']["Router"]();

router["get"]("/config", async function (_0x19c7dd, _0x3c1a96, _0x2276e9) {
  const _0x1c56ac = await models_1['configModel']['getConfig']();

  _0x3c1a96['json']((0, utils_1["httpBody"])(0, _0x1c56ac));
});
router['put']("/config", async function (_0x1fe2e1, _0x31484c, _0x333b0a) {
  const {
    "body": _0x4ce1f6
  } = _0x1fe2e1,
        _0x4f650c = await models_1["configModel"]['getConfig']();

  if (!_0x4ce1f6 || !_0x4f650c || _0x4f650c["length"] <= 0) {
    _0x31484c["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x30c94a = [];

  for (const _0x3aae5f of _0x4f650c) {
    const _0x964a44 = _0x3aae5f["toJSON"]();

    if (_0x4ce1f6[_0x964a44["name"]] || _0x4ce1f6[_0x964a44["name"]] === 0 || _0x4ce1f6[_0x964a44["name"]] === '') {
      const _0x4c4b26 = { ..._0x964a44,
        "create_time": null,
        "update_time": null
      };

      _0x30c94a["push"]({ ...(0, utils_1["filterObjectNull"])(_0x4c4b26),
        'value': _0x4ce1f6[_0x964a44["name"]]["toString"]()
      });
    }
  }

  if (_0x30c94a['length'] <= 0) {
    _0x31484c["json"]((0, utils_1['httpBody'])(-1, "无内容需要修改"));

    return;
  }

  const _0xe6a2d7 = await models_1["configModel"]["editConfigs"](_0x30c94a);

  _0x31484c["json"]((0, utils_1["httpBody"])(_0xe6a2d7['code'], "修改成功"));
});
exports["default"] = router;