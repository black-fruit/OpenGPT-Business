'use strict';

const a86_0x48454a = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a86_0x48454a);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/action", async function (_0xd89ebf, _0x32db51, _0x17435c) {
  const _0x1256ae = {
    "page": _0xd89ebf["query"]["page"],
    "page_size": _0xd89ebf["query"]['page_size']
  };
  const {
    "page": _0x4dee0f,
    "page_size": _0x47e692
  } = (0, utils_1["pagingData"])(_0x1256ae),
        _0x45bb1c = {
    "page": _0x4dee0f,
    "page_size": _0x47e692
  };

  const _0x1d666f = await models_1["actionModel"]["getActions"](_0x45bb1c);

  _0x32db51["json"]((0, utils_1["httpBody"])(0, _0x1d666f));
});
exports["default"] = router;