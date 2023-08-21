'use strict';

const a90_0x43b69e = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a90_0x43b69e);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require('../../utils'),
      models_1 = require('../../models'),
      router = express_1["default"]["Router"]();

router["get"]("/cashback", async function (_0x48762d, _0x5cea59, _0x53d51e) {
  const _0x478f01 = {
    "page": _0x48762d["query"]["page"],
    "page_size": _0x48762d["query"]['page_size']
  };
  const {
    "page": _0x12c6f1,
    "page_size": _0x31b377
  } = (0, utils_1['pagingData'])(_0x478f01),
        _0x121d1a = {
    'page': _0x12c6f1,
    "page_size": _0x31b377
  };

  const _0x36d78c = await models_1["cashbackModel"]['getCashback'](_0x121d1a);

  _0x5cea59["json"]((0, utils_1['httpBody'])(0, _0x36d78c));
});
router["delete"]("/cashback/:id", async function (_0x259d23, _0x134ce8, _0x4ce42f) {
  const {
    "id": _0x43505c
  } = _0x259d23["params"];

  if (!_0x43505c) {
    _0x134ce8["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x1622aa = await models_1["cashbackModel"]["delCashback"](_0x43505c);

  _0x134ce8['json']((0, utils_1["httpBody"])(0, _0x1622aa));
});
router["put"]("/cashback", async function (_0x421152, _0x335e58, _0x2601c4) {
  const {
    "id": _0x2a6a17,
    "status": _0x416892,
    "remarks": _0x1782f3
  } = _0x421152["body"];

  if (!_0x2a6a17) {
    _0x335e58["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x10fbd7 = {
    "status": _0x416892,
    "remarks": _0x1782f3
  };

  const _0x9dd9c = await models_1["cashbackModel"]["editCashback"](_0x2a6a17, (0, utils_1["filterObjectNull"])(_0x10fbd7));

  _0x335e58["json"]((0, utils_1['httpBody'])(0, _0x9dd9c));
});
router["put"]("/cashback/pass", async function (_0xd42a91, _0x32be27, _0x1ab6c2) {
  const {
    "id": _0x4cd05c
  } = _0xd42a91['body'];

  if (!_0x4cd05c) {
    _0x32be27['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x243875 = {
    'id': _0x4cd05c
  };

  const _0x519fac = await models_1['cashbackModel']["getCashbackInfo"](_0x243875),
        {
    "benefit_id": _0x458516,
    "commission_amount": _0x21f7d8,
    "order_id": _0x1ac3f6,
    "status": _0x3c3f43
  } = _0x519fac || {};

  if (_0x3c3f43 !== 3) {
    _0x32be27["status"](500)["json"]((0, utils_1["httpBody"])(-1, "已经审核通过"));

    return;
  }

  const _0x46f170 = {
    "user_id": _0x458516,
    "status": 1
  };

  const _0x1ad794 = await models_1["amountDetailsModel"]["getAmountDetail"](_0x46f170),
        _0x3acfc3 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x1e98b4 = {
    'id': _0x3acfc3,
    "status": 1,
    "user_id": _0x458516,
    "type": "cashback",
    "correlation_id": _0x1ac3f6,
    "operate_amount": _0x21f7d8,
    "current_amount": _0x21f7d8,
    "remarks": "消费提成",
    "original_amount": 0
  };

  _0x1ad794 && (_0x1e98b4["original_amount"] = _0x1ad794["current_amount"], _0x1e98b4["current_amount"] = Number(_0x1ad794["current_amount"]) + Number(_0x21f7d8));
  await models_1['amountDetailsModel']["addAmountDetails"](_0x1e98b4);
  const _0xdc50e5 = {
    "status": 1,
    'remarks': "提成下发成功"
  };
  await models_1["cashbackModel"]["editCashback"](_0x4cd05c, _0xdc50e5);

  _0x32be27["json"]((0, utils_1["httpBody"])(0));
});
exports["default"] = router;