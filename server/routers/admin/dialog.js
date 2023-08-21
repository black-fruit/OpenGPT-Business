'use strict';

const a92_0x42e54d = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a92_0x42e54d);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require('express')),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]('/dialog', async function (_0x484707, _0x1c3058, _0x43239d) {
  const _0x2b8174 = {
    'page': _0x484707["query"]['page'],
    "page_size": _0x484707['query']["page_size"]
  };
  const {
    "page": _0x7e1830,
    "page_size": _0x53553e
  } = (0, utils_1["pagingData"])(_0x2b8174),
        _0xaa75e9 = {
    'page': _0x7e1830,
    "page_size": _0x53553e
  };

  const _0x40526e = await models_1['dialogModel']['getDialogs'](_0xaa75e9);

  _0x1c3058["json"]((0, utils_1["httpBody"])(0, _0x40526e));
});
router["delete"]("/dialog/:id", async function (_0x2677d7, _0x431f43, _0x53020e) {
  const {
    "id": _0x37e146
  } = _0x2677d7["params"];

  if (!_0x37e146) {
    _0x431f43["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x8a6d1b = await models_1["dialogModel"]["delDialog"](_0x37e146);

  _0x431f43["json"]((0, utils_1["httpBody"])(0, _0x8a6d1b));
});
router['post']("/dialog", async function (_0x26ee4b, _0x186cd4, _0x5a9ef4) {
  const {
    "issue": _0xb2a7c5,
    "answer": _0x5cca2f,
    "models": _0x2660db,
    "status": status = 1,
    "delay": delay = 0
  } = _0x26ee4b['body'];

  if (!_0xb2a7c5 || !_0x5cca2f || !_0x2660db) {
    _0x186cd4["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x30d272 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x1c1dec = {
    'id': _0x30d272,
    "issue": _0xb2a7c5,
    "answer": _0x5cca2f,
    'delay': delay,
    'status': status,
    "models": _0x2660db
  };

  const _0x54e7e5 = await models_1["dialogModel"]["addDialog"](_0x1c1dec);

  _0x186cd4["json"]((0, utils_1["httpBody"])(0, _0x54e7e5));
});
router["put"]("/dialog", async function (_0x28be2a, _0x4441e3, _0x208ded) {
  const {
    "id": _0x1f0537,
    "issue": _0x3d417c,
    "answer": _0x52d09b,
    "models": _0x499ba1,
    "status": _0x38c717,
    "delay": delay = 0
  } = _0x28be2a["body"];

  if (!_0x1f0537 || !_0x3d417c || !_0x52d09b || !_0x499ba1) {
    _0x4441e3['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x397a2f = {
    "issue": _0x3d417c,
    "answer": _0x52d09b,
    "delay": delay,
    "models": _0x499ba1,
    'status': _0x38c717
  };

  const _0x43db45 = await models_1["dialogModel"]["editDialog"](_0x1f0537, (0, utils_1['filterObjectNull'])(_0x397a2f));

  _0x4441e3['json']((0, utils_1["httpBody"])(0, _0x43db45));
});
exports['default'] = router;