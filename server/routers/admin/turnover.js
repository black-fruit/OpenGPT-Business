'use strict';

const a104_0x3fd81e = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a104_0x3fd81e);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/turnover", async function (_0x36e4d3, _0x215b05, _0x209a8d) {
  const _0x55977e = {
    "page": _0x36e4d3["query"]['page'],
    "page_size": _0x36e4d3['query']["page_size"]
  };
  const {
    "page": _0x3fb5ea,
    "page_size": _0x21acf4
  } = (0, utils_1['pagingData'])(_0x55977e),
        _0xe760b3 = {
    "page": _0x3fb5ea,
    "page_size": _0x21acf4
  };

  const _0x18f76f = await models_1['turnoverModel']["getTurnovers"](_0xe760b3);

  _0x215b05["json"]((0, utils_1["httpBody"])(0, _0x18f76f));
});
router["delete"]("/turnover/:id", async function (_0x28583f, _0x323772, _0x18b1bb) {
  const {
    "id": _0x27fe49
  } = _0x28583f["params"];

  if (!_0x27fe49) {
    _0x323772["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x1d3886 = await models_1["turnoverModel"]["delTurnover"](_0x27fe49);

  _0x323772["json"]((0, utils_1["httpBody"])(0, _0x1d3886));
});
router["put"]("/turnover", async function (_0x3480c0, _0x128d76, _0x99b33b) {
  const {
    "id": _0x454c20,
    "user_id": _0x12bf9e,
    "value": _0x493e71,
    "describe": _0x2fccf2
  } = _0x3480c0["body"];

  if (!_0x454c20 || !_0x493e71 || !_0x2fccf2 || !_0x12bf9e) {
    _0x128d76['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x290b3f = {
    'id': _0x454c20,
    "value": _0x493e71,
    "describe": _0x2fccf2,
    "user_id": _0x12bf9e
  };

  const _0x244ea5 = await models_1['turnoverModel']["editTurnover"](_0x290b3f);

  _0x128d76["json"]((0, utils_1["httpBody"])(0, _0x244ea5));
});
exports["default"] = router;