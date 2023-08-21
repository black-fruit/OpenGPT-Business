'use strict';

const a103_0x827e9f = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a103_0x827e9f);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]['Router']();

router["get"]("/signin", async function (_0x558fa1, _0x4bcfd4, _0x27ce91) {
  const _0xd4debb = {
    'page': _0x558fa1["query"]['page'],
    "page_size": _0x558fa1["query"]["page_size"]
  };
  const {
    "page": _0xc4c8fc,
    "page_size": _0x3762f8
  } = (0, utils_1["pagingData"])(_0xd4debb),
        _0x4ec434 = {
    "page": _0xc4c8fc,
    "page_size": _0x3762f8
  };

  const _0x39a19e = await models_1["signinModel"]["getSignins"](_0x4ec434);

  _0x4bcfd4['json']((0, utils_1["httpBody"])(0, _0x39a19e));
});
exports["default"] = router;