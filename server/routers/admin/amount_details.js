'use strict';

const a88_0x20e67e = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a88_0x20e67e);

const tslib_1 = require('tslib'),
      express_1 = tslib_1['__importDefault'](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1['default']["Router"]();

router["get"]("/amount_details", async function (_0x58e5b0, _0x5b15ad, _0x159753) {
  const _0x591540 = {
    "page": _0x58e5b0["query"]["page"],
    "page_size": _0x58e5b0['query']['page_size']
  };
  const {
    "page": _0x5dbc6c,
    "page_size": _0x1c06f6
  } = (0, utils_1['pagingData'])(_0x591540),
        _0x356254 = {
    "page": _0x5dbc6c,
    'page_size': _0x1c06f6
  };

  const _0x1962f6 = await models_1["amountDetailsModel"]["getAmountDetails"](_0x356254);

  _0x5b15ad["json"]((0, utils_1['httpBody'])(0, _0x1962f6));
});
router['delete']("/amount_details/:id", async function (_0x2bb24b, _0xc2f57d, _0x2e3854) {
  const {
    "id": _0x18202a
  } = _0x2bb24b["params"];

  if (!_0x18202a) {
    _0xc2f57d["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x9f9e71 = await models_1["amountDetailsModel"]["delAmountDetail"](_0x18202a);

  _0xc2f57d["json"]((0, utils_1["httpBody"])(0, _0x9f9e71));
});
router["put"]("/amount_details", async function (_0x501844, _0x3a6660, _0x3c073a) {
  const {
    "id": _0x24e8c6
  } = _0x501844["body"];

  if (!_0x24e8c6) {
    _0x3a6660["json"]((0, utils_1["httpBody"])(-1, '缺少必要参数'));

    return;
  }

  const _0x2314ef = { ..._0x501844["body"]
  },
        _0x56014e = {
    'id': _0x24e8c6
  };

  const _0x4e661f = await models_1["amountDetailsModel"]["updateAmountDetail"]((0, utils_1['filterObjectNull'])(_0x2314ef), _0x56014e);

  _0x3a6660['json']((0, utils_1["httpBody"])(0, _0x4e661f));
});
router["post"]("/amount_details", async function (_0x493e31, _0x2804e9, _0x447b63) {
  const {
    "user_id": _0x3b7297,
    "operate_amount": _0x1ae510,
    "correlation_id": _0x4dc2f4
  } = _0x493e31["body"];

  if (!_0x3b7297 || !_0x1ae510 || !_0x4dc2f4) {
    _0x2804e9["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x446034 = (0, utils_1['generateNowflakeId'])(1)(),
        _0x394929 = { ..._0x493e31["body"]
  },
        _0x501426 = await models_1["amountDetailsModel"]["addAmountDetails"]({
    'user_id': _0x3b7297,
    'operate_amount': _0x1ae510,
    'correlation_id': _0x4dc2f4,
    ...(0, utils_1["filterObjectNull"])(_0x394929),
    'id': _0x446034
  });

  _0x2804e9["json"]((0, utils_1["httpBody"])(0, _0x501426));
});
exports["default"] = router;