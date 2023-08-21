'use strict';

const a98_0xdb730d = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a98_0xdb730d);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require('../../utils'),
      models_1 = require("../../models"),
      router = express_1["default"]['Router']();

router["get"]('/orders', async function (_0x1fff1e, _0x5e9156, _0x31a6d5) {
  const _0x538c62 = {
    'page': _0x1fff1e["query"]["page"],
    "page_size": _0x1fff1e['query']['page_size']
  };
  const {
    "page": _0x3d8459,
    "page_size": _0x321633
  } = (0, utils_1["pagingData"])(_0x538c62),
        _0x2fdf5e = {
    "page": _0x3d8459,
    'page_size': _0x321633
  };

  const _0x29cc0d = await models_1["orderModel"]["getOrders"](_0x2fdf5e);

  _0x5e9156["json"]((0, utils_1["httpBody"])(0, _0x29cc0d));
});
exports['default'] = router;