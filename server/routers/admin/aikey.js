'use strict';

const a87_0x56bba2 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a87_0x56bba2);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require('express')),
      utils_1 = require('../../utils'),
      models_1 = require("../../models"),
      keyUsage_1 = tslib_1['__importDefault'](require("../../helpers/keyUsage")),
      queue_1 = require("../../helpers/queue"),
      router = express_1["default"]["Router"]();

router["get"]("/aikey", async function (_0x439b55, _0x3fa80d, _0x4ebe36) {
  const _0x45bdce = {
    "page": _0x439b55["query"]["page"],
    "page_size": _0x439b55['query']["page_size"]
  };
  const {
    "page": _0x2efbc6,
    "page_size": _0x565619
  } = (0, utils_1['pagingData'])(_0x45bdce),
        _0x11a47e = {
    "page": _0x2efbc6,
    "page_size": _0x565619
  };

  const _0xfcfd6c = await models_1["aikeyModel"]["getAikeys"](_0x11a47e);

  _0x3fa80d['json']((0, utils_1["httpBody"])(0, _0xfcfd6c));
});
router["delete"]("/aikey/:id", async function (_0x5a45e0, _0x4165e9, _0x4dc369) {
  const {
    "id": _0x520def
  } = _0x5a45e0["params"];

  if (!_0x520def) {
    _0x4165e9['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x131a6c = await models_1['aikeyModel']["delAikey"](_0x520def);

  _0x4165e9["json"]((0, utils_1['httpBody'])(0, _0x131a6c));
});
router["post"]('/aikey', async function (_0x5ac785, _0x5f5a84, _0x517e85) {
  const {
    "key": _0x3762d7,
    "host": _0xfda37f,
    "remarks": _0x380b39,
    "models": _0x104e9c,
    "type": _0x353c1c,
    "check": check = 1,
    "status": _0x25c5f0
  } = _0x5ac785["body"];

  if (!_0x3762d7 || !_0xfda37f || !_0x104e9c) {
    _0x5f5a84["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x49161f = (0, utils_1['generateNowflakeId'])(1)(),
        _0x262db1 = {
    'id': _0x49161f,
    "key": _0x3762d7,
    "host": _0xfda37f,
    'remarks': _0x380b39,
    "status": _0x25c5f0,
    "models": _0x104e9c,
    "type": _0x353c1c,
    'check': check
  };

  const _0xaaccba = await models_1["aikeyModel"]["addAikey"](_0x262db1);

  _0x5f5a84["json"]((0, utils_1['httpBody'])(0, _0xaaccba));
});
router["put"]("/aikey", async function (_0x2fc788, _0x46e86a, _0x1c5bd6) {
  const {
    "id": _0x2a546e,
    "key": _0x9e62f9,
    "host": _0x4a0014,
    "remarks": _0x2f8c9e,
    "models": _0x2defd1,
    "type": _0x3e586e,
    "status": _0x2222a3,
    "check": _0x423d3d
  } = _0x2fc788['body'];

  if (!_0x2a546e || !_0x9e62f9 || !_0x4a0014 || !_0x2defd1) {
    _0x46e86a["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x48659c = {
    'key': _0x9e62f9,
    "host": _0x4a0014,
    "remarks": _0x2f8c9e,
    "status": _0x2222a3,
    'models': _0x2defd1,
    'type': _0x3e586e,
    "check": _0x423d3d
  };

  const _0x279cc6 = await models_1["aikeyModel"]["editAikey"](_0x2a546e, _0x48659c);

  _0x46e86a["json"]((0, utils_1["httpBody"])(0, _0x279cc6));
});
router["post"]('/aikey/check', async function (_0x48a0a8, _0x400a13, _0x3e39d5) {
  const {
    "key": _0x1697c3,
    "host": _0x145b61,
    "all": _0x46e40b,
    "type": _0x5c2173
  } = _0x48a0a8["body"];

  if (_0x46e40b) {
    const _0x5fe650 = {
      "page": 0,
      'page_size': 1000
    };
    const _0x30a5e9 = {
      "status": 1,
      "check": 1
    };

    const _0x1ba462 = await models_1['aikeyModel']["getAikeys"](_0x5fe650, _0x30a5e9),
          _0x31ed9c = _0x1ba462["rows"];

    _0x31ed9c["forEach"](_0x376710 => {
      queue_1['checkAiKeyQueue']["addTask"]({ ..._0x376710["toJSON"]()
      });
    });

    _0x400a13["json"]((0, utils_1["httpBody"])(0, "提交成功"));

    return;
  }

  if (!_0x1697c3 || !_0x145b61) {
    _0x400a13["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x232c87 = {
    "host": _0x145b61,
    "key": _0x1697c3,
    "type": _0x5c2173
  };

  const _0x171434 = await (0, keyUsage_1["default"])(_0x232c87);

  _0x400a13['json']((0, utils_1["httpBody"])(0, _0x171434));
});
exports["default"] = router;