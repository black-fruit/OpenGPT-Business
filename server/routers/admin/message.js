'use strict';

const a96_0x4129d8 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a96_0x4129d8);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require('../../models'),
      router = express_1["default"]["Router"]();

router["get"]("/messages", async function (_0x3d4e57, _0x1d7d6c, _0x472c19) {
  const _0x4247b5 = {
    "page": _0x3d4e57["query"]["page"],
    "page_size": _0x3d4e57["query"]["page_size"]
  };
  const {
    "page": _0x397582,
    "page_size": _0x559c98
  } = (0, utils_1["pagingData"])(_0x4247b5),
        _0x5d80ce = {
    "page": _0x397582,
    'page_size': _0x559c98
  };

  const _0x2e7bd5 = await models_1["messageModel"]["getMessages"](_0x5d80ce);

  _0x1d7d6c["json"]((0, utils_1["httpBody"])(0, _0x2e7bd5));
});
router['delete']("/messages/:id", async function (_0x1e5485, _0x1b1865, _0x32ad7f) {
  const {
    "id": _0x51d3e0
  } = _0x1e5485["params"];

  if (!_0x51d3e0) {
    _0x1b1865["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x74851c = {
    'id': _0x51d3e0
  };
  await models_1["messageModel"]["delMessage"](_0x74851c);

  _0x1b1865["json"]((0, utils_1["httpBody"])(0, "删除成功"));
});
router["put"]("/messages", async function (_0x18bca6, _0x38f04c, _0xa5980c) {
  const {
    "id": _0x345ad0,
    "status": _0x254114
  } = _0x18bca6["body"];

  if (!_0x345ad0) {
    _0x38f04c['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x11bba4 = {
    "status": _0x254114
  };
  const _0x5dcb06 = {
    'id': _0x345ad0
  };
  await models_1["messageModel"]["updateMessage"](_0x11bba4, _0x5dcb06);

  _0x38f04c['json']((0, utils_1["httpBody"])(0, "修改成功"));
});
exports["default"] = router;