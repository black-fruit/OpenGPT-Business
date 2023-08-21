'use strict';

const a99_0x2e6814 = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a99_0x2e6814);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/payment", async function (_0x568fdd, _0x35fbaf, _0x98edca) {
  const _0x5e3d33 = {
    "page": _0x568fdd['query']["page"],
    "page_size": _0x568fdd["query"]['page_size']
  };
  const {
    "page": _0x2a1a16,
    "page_size": _0x44842e
  } = (0, utils_1['pagingData'])(_0x5e3d33),
        _0x20a530 = {
    "page": _0x2a1a16,
    "page_size": _0x44842e
  };

  const _0x2b644d = await models_1["paymentModel"]["getPayments"](_0x20a530);

  _0x35fbaf['json']((0, utils_1["httpBody"])(0, _0x2b644d));
});
router["delete"]("/payment/:id", async function (_0x5ddc92, _0x2279f9, _0x13b5b1) {
  const {
    "id": _0x5d8110
  } = _0x5ddc92['params'];

  if (!_0x5d8110) {
    _0x2279f9["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x5bdd57 = await models_1["paymentModel"]["delPayment"](_0x5d8110);

  _0x2279f9["json"]((0, utils_1["httpBody"])(0, _0x5bdd57));
});
router["post"]("/payment", async function (_0x13046d, _0x329d3a, _0x46595e) {
  const {
    "channel": _0x28c4f7,
    "name": _0x4f562a,
    "params": _0x46bc8b,
    "types": _0x7eb934,
    "status": status = 1
  } = _0x13046d["body"];

  if (!_0x28c4f7 || !_0x4f562a || !_0x46bc8b || !_0x7eb934) {
    _0x329d3a["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x4845e0 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x17a437 = {
    'id': _0x4845e0,
    'channel': _0x28c4f7,
    "name": _0x4f562a,
    "params": _0x46bc8b,
    'types': _0x7eb934,
    'status': status
  };

  const _0x372c48 = await models_1['paymentModel']['addPayment']((0, utils_1["filterObjectNull"])(_0x17a437));

  _0x329d3a["json"]((0, utils_1["httpBody"])(0, _0x372c48));
});
router["put"]('/payment', async function (_0x528e11, _0x2cb9e1, _0x5e743b) {
  const {
    "id": _0x42dd54,
    "channel": _0x2eba0a,
    "name": _0x47b3dc,
    "params": _0x44db88,
    "types": _0x4066f1,
    "status": _0xce254c
  } = _0x528e11["body"];

  if (!_0x42dd54 || !_0x2eba0a || !_0x47b3dc || !_0x44db88 || !_0x4066f1) {
    _0x2cb9e1["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x501014 = {
    'id': _0x42dd54,
    'channel': _0x2eba0a,
    "name": _0x47b3dc,
    "params": _0x44db88,
    "types": _0x4066f1,
    "status": _0xce254c
  };

  const _0x5314af = await models_1["paymentModel"]["editPayment"]((0, utils_1["filterObjectNull"])(_0x501014));

  _0x2cb9e1["json"]((0, utils_1['httpBody'])(0, _0x5314af));
});
exports["default"] = router;