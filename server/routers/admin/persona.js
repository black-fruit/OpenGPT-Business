'use strict';

const a100_0x6fba2b = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a100_0x6fba2b);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require('express')),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router['get']("/persona", async function (_0x5a2a3e, _0x5b5728, _0x58c376) {
  const _0x3207e9 = {
    "page": _0x5a2a3e["query"]['page'],
    "page_size": _0x5a2a3e["query"]["page_size"]
  };
  const {
    "page": _0x5784c2,
    "page_size": _0x9ea05c
  } = (0, utils_1["pagingData"])(_0x3207e9),
        _0x41eec4 = {
    "page": _0x5784c2,
    "page_size": _0x9ea05c
  };

  const _0x435f02 = await models_1["personaModel"]["getPersonas"](_0x41eec4);

  _0x5b5728["json"]((0, utils_1["httpBody"])(0, _0x435f02));
});
router["delete"]('/persona/:id', async function (_0x33c81d, _0x4bd286, _0x327776) {
  const {
    "id": _0x115a72
  } = _0x33c81d['params'];

  if (!_0x115a72) {
    _0x4bd286["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x43e3d2 = await models_1["personaModel"]["delPersona"](_0x115a72);

  _0x4bd286['json']((0, utils_1['httpBody'])(0, _0x43e3d2, "删除成功"));
});
router["post"]('/persona', async function (_0x14227b, _0x114892, _0x292054) {
  const {
    "title": _0x367aae,
    "context": _0x2a08e4,
    "description": _0x45916b,
    "user_id": _0x5da873,
    "avatar": _0x35a4a7,
    "status": _0x402923,
    "system": _0x191526
  } = _0x14227b["body"];

  if (!_0x367aae || !_0x2a08e4 || !_0x35a4a7) {
    _0x114892["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x369a2c = (0, utils_1["generateNowflakeId"])(1)(),
        _0x5745b0 = {
    'id': _0x369a2c,
    "title": _0x367aae,
    "description": _0x45916b,
    "status": _0x402923,
    "user_id": _0x5da873,
    "context": _0x2a08e4,
    "avatar": _0x35a4a7,
    "system": _0x191526
  };

  const _0x3ce079 = await models_1["personaModel"]['addPersona']((0, utils_1["filterObjectNull"])(_0x5745b0));

  _0x114892["json"]((0, utils_1['httpBody'])(0, _0x3ce079));
});
router["put"]('/persona', async function (_0x5de5f2, _0x5d4cd0, _0x8b0c4f) {
  const {
    "id": _0x1cbd8a,
    "title": _0x50f282,
    "context": _0x1ad8cb,
    "description": _0x585fc9,
    "user_id": _0x1669dc,
    "avatar": _0x1f26c1,
    "status": _0x542440,
    "system": _0x422728
  } = _0x5de5f2["body"];

  if (!_0x1cbd8a || !_0x50f282 || !_0x1ad8cb || !_0x1f26c1) {
    _0x5d4cd0["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x5d09fb = {
    "title": _0x50f282,
    "description": _0x585fc9,
    'status': _0x542440,
    'user_id': _0x1669dc ? _0x1669dc : null,
    "context": _0x1ad8cb,
    'avatar': _0x1f26c1,
    'system': _0x422728
  };

  const _0x1fc09c = await models_1["personaModel"]["editPersona"](_0x1cbd8a, _0x5d09fb);

  _0x5d4cd0["json"]((0, utils_1['httpBody'])(0, _0x1fc09c));
});
exports['default'] = router;