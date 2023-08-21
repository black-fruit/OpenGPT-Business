'use strict';

const a102_0x7e81f3 = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a102_0x7e81f3);

const tslib_1 = require("tslib"),
      express_1 = tslib_1['__importDefault'](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]['Router']();

router["get"]("/products", async function (_0x380491, _0x1de196, _0xfeca50) {
  const _0x8714a = {
    "page": _0x380491['query']["page"],
    'page_size': _0x380491["query"]['page_size']
  };
  const {
    "page": _0x6054b3,
    "page_size": _0x805f8c
  } = (0, utils_1['pagingData'])(_0x8714a),
        _0x27f545 = {
    "page": _0x6054b3,
    "page_size": _0x805f8c
  };

  const _0x28ee06 = await models_1["productModel"]["getProducts"](_0x27f545);

  _0x1de196['json']((0, utils_1["httpBody"])(0, _0x28ee06));
});
router["delete"]("/products/:id", async function (_0x155140, _0x2a0ca3, _0x5c2167) {
  const {
    "id": _0x1ad9bf
  } = _0x155140["params"];

  if (!_0x1ad9bf) {
    _0x2a0ca3['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x2263e9 = await models_1['productModel']["delProduct"](_0x1ad9bf);

  _0x2a0ca3['json']((0, utils_1["httpBody"])(0, _0x2263e9));
});
router["post"]('/products', async function (_0x26791e, _0x2326a5, _0x9e39e8) {
  const {
    "title": _0x28d9a0,
    "price": _0x357368,
    "original_price": _0x5cbca1,
    "value": _0x1b7fb2,
    "badge": _0x4c0532,
    "type": _0x41491e,
    "level": _0x7f3abd,
    "describe": _0x59895a,
    "status": _0x153481,
    "sort": _0x1529a8
  } = _0x26791e["body"];

  if (!_0x28d9a0 || !_0x357368 || !_0x1b7fb2 || !_0x41491e || !_0x1529a8) {
    _0x2326a5['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x3f2aab = (0, utils_1["generateNowflakeId"])(1)(),
        _0xd7df48 = {
    'id': _0x3f2aab,
    'title': _0x28d9a0,
    "price": _0x357368,
    "original_price": _0x5cbca1,
    "value": _0x1b7fb2,
    "type": _0x41491e,
    "badge": _0x4c0532,
    "level": _0x7f3abd,
    "describe": _0x59895a,
    "status": _0x153481,
    "sort": _0x1529a8
  };

  const _0x3eeaf5 = await models_1['productModel']["addProduct"]((0, utils_1["filterObjectNull"])(_0xd7df48));

  _0x2326a5["json"]((0, utils_1["httpBody"])(0, _0x3eeaf5));
});
router['put']("/products", async function (_0x3306a3, _0x263ceb, _0x1ab189) {
  const {
    "id": _0x6c5a74,
    "title": _0x271a00,
    "price": _0x1de893,
    "original_price": _0xa027ba,
    "value": _0x1583c9,
    "badge": _0x5bfbe1,
    "type": _0x1781d5,
    "level": _0x8a75cd,
    "describe": _0x5ca14b,
    "status": _0x3371b5,
    "sort": _0x196ac1
  } = _0x3306a3['body'];
  console["log"](_0x3306a3["body"]);

  if (!_0x6c5a74 || !_0x271a00 || !_0x1de893 || !_0x1583c9 || !_0x1781d5 || !_0x196ac1) {
    _0x263ceb["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x574298 = {
    'id': _0x6c5a74,
    "title": _0x271a00,
    'price': _0x1de893,
    'original_price': _0xa027ba,
    "value": _0x1583c9,
    "badge": _0x5bfbe1,
    "type": _0x1781d5,
    "level": _0x8a75cd,
    "describe": _0x5ca14b,
    "status": _0x3371b5,
    "sort": _0x196ac1
  };

  const _0x5a2386 = await models_1['productModel']['editProduct'](_0x574298);

  _0x263ceb["json"]((0, utils_1['httpBody'])(0, _0x5a2386));
});
exports['default'] = router;