'use strict';

const a15_0x4e14f0 = {
  "value": true
};
Object['defineProperty'](exports, '__esModule', a15_0x4e14f0);

const tslib_1 = require('tslib'),
      models_1 = require("../../models"),
      utils_1 = require("../../utils"),
      function_1 = tslib_1["__importDefault"](require("./function")),
      AddCashbackQueue = (0, function_1["default"])("AddCashbackQueue");

async function addTask(_0x5468a1, _0x442e4b) {
  const _0x59fcc9 = await AddCashbackQueue["add"](_0x5468a1, _0x442e4b);

  return _0x59fcc9;
}

AddCashbackQueue["process"](async _0xf1da6a => {
  const {
    "user_id": _0x48c24a,
    "order_id": _0x47d62e,
    "product_id": _0x4e0070
  } = _0xf1da6a["data"];

  if (!_0x48c24a || !_0x4e0070) {
    return;
  }

  const _0x519d4c = {
    'id': _0x48c24a
  };

  const _0x35d3df = await models_1["userModel"]["getUserInfo"](_0x519d4c);

  if (!_0x35d3df['id'] || !_0x35d3df["superior_id"] || !_0x35d3df['invite_code']) {
    return;
  }

  const _0x50ade3 = await models_1["productModel"]["getProduct"](_0x4e0070),
        _0x3a981a = (await models_1["configModel"]['getConfigValue']("cashback_ratio")) || 0,
        _0x4debe5 = (0, utils_1['generateNowflakeId'])(1)();

  await models_1["cashbackModel"]["addCashback"]({
    'id': _0x4debe5,
    'user_id': _0x48c24a,
    'benefit_id': _0x35d3df["superior_id"],
    'pay_amount': _0x50ade3['price'],
    'commission_rate': _0x3a981a,
    'commission_amount': Math["floor"](_0x50ade3["price"] * Number(_0x3a981a) / 100),
    'remark': "等待审核",
    'statue': 3,
    'order_id': _0x47d62e
  });
  return;
});
const a15_0x11ba54 = {
  "addTask": addTask
};
exports["default"] = a15_0x11ba54;