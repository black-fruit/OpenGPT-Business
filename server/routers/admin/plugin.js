'use strict';

const a101_0x5f4d33 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a101_0x5f4d33);

const tslib_1 = require('tslib'),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require('../../models'),
      router = express_1["default"]["Router"]();

router["get"]("/plugins", async function (_0x483691, _0x52ae3d, _0x35fb11) {
  const _0x148ce = {
    "page": _0x483691["query"]["page"],
    "page_size": _0x483691["query"]["page_size"]
  };
  const {
    "page": _0x209132,
    "page_size": _0x2e66b0
  } = (0, utils_1["pagingData"])(_0x148ce),
        _0x1a184c = {
    "page": _0x209132,
    "page_size": _0x2e66b0
  };

  const _0x251777 = await models_1["pluginModel"]["getPlugins"](_0x1a184c);

  _0x52ae3d["json"]((0, utils_1["httpBody"])(0, _0x251777));
});
router["delete"]("/plugin/:id", async function (_0xda9a7a, _0x167efb, _0x157fe1) {
  const {
    "id": _0x5f4ef4
  } = _0xda9a7a['params'];

  if (!_0x5f4ef4) {
    _0x167efb['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x2397b4 = await models_1["pluginModel"]["delPlugin"](_0x5f4ef4);

  _0x167efb["json"]((0, utils_1['httpBody'])(0, _0x2397b4));
});
router['post']("/plugin", async function (_0x91938a, _0x116129, _0x4dbd20) {
  const {
    "name": _0x2f76c9,
    "description": _0x4f070b,
    "avatar": _0x290aaf,
    "variables": _0x10a7f3,
    "function": _0x1dd617,
    "script": _0x14c776,
    "status": _0xd8d6b7,
    "user_id": _0x536aef
  } = _0x91938a["body"];

  if (!_0x2f76c9 || !_0x4f070b || !_0x290aaf || !_0x1dd617 || !_0x14c776) {
    _0x116129["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x445fba = (0, utils_1["generateNowflakeId"])(1)(),
        _0x5ef994 = {
    'id': _0x445fba,
    'name': _0x2f76c9,
    'description': _0x4f070b,
    "avatar": _0x290aaf,
    "variables": _0x10a7f3,
    "function": _0x1dd617,
    "script": _0x14c776,
    "status": _0xd8d6b7,
    "user_id": _0x536aef
  };

  const _0x405854 = await models_1["pluginModel"]["addPlugin"]((0, utils_1['filterObjectNull'])(_0x5ef994));

  _0x116129['json']((0, utils_1["httpBody"])(0, _0x405854));
});
router["put"]("/plugin", async function (_0x2570c2, _0xbb1c77, _0x2d6fb8) {
  const {
    "id": _0x5c43c2,
    "name": _0x258c85,
    "description": _0x551a9e,
    "avatar": _0x127bda,
    "variables": _0x1a15ea,
    "function": _0x31b871,
    "script": _0x168d47,
    "status": _0xad74cd,
    "user_id": _0x246a0a
  } = _0x2570c2['body'];

  if (!_0x5c43c2 || !_0x258c85 || !_0x551a9e || !_0x127bda || !_0x31b871 || !_0x168d47) {
    _0xbb1c77['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x148844 = await models_1["pluginModel"]["editPlugin"](_0x5c43c2, {
    'id': _0x5c43c2,
    'name': _0x258c85,
    'description': _0x551a9e,
    'avatar': _0x127bda,
    'variables': _0x1a15ea,
    'function': _0x31b871,
    'script': _0x168d47,
    'status': _0xad74cd,
    'user_id': _0x246a0a
  });

  _0xbb1c77["json"]((0, utils_1["httpBody"])(0, _0x148844));
});
exports['default'] = router;