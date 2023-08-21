'use strict';

const a19_0x423eba = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a19_0x423eba);

const tslib_1 = require("tslib"),
      models_1 = require("../../models"),
      utils_1 = require('../../utils'),
      function_1 = tslib_1["__importDefault"](require("./function")),
      InviteRecordPassQueue = (0, function_1["default"])("InviteRecordPassQueue");

async function addTask(_0x5ea497, _0x23fd54) {
  const _0x2a93d9 = await InviteRecordPassQueue["add"](_0x5ea497, _0x23fd54);

  return _0x2a93d9;
}

InviteRecordPassQueue["process"](async _0x5a2c97 => {
  const {
    "id": _0x33d118,
    "superior_id": _0x3ccbad,
    "reward": _0x352c04,
    "reward_type": _0x1c59cf
  } = _0x5a2c97["data"],
        _0x41b877 = {
    "status": 1,
    "remark": '发放成功'
  };
  await models_1["inviteRecordModel"]["editInviteRecord"](_0x33d118, (0, utils_1["filterObjectNull"])(_0x41b877));

  const _0x5442a4 = (0, utils_1["generateNowflakeId"])(1)();

  await models_1["turnoverModel"]["addTurnover"]({
    'id': _0x5442a4,
    'user_id': _0x3ccbad,
    'describe': "邀请新用户奖励",
    'value': '' + _0x352c04 + (_0x1c59cf === "day" ? '天' : '积分')
  });
  await models_1['userModel']['updataUserVIP']({
    'id': _0x3ccbad,
    'value': Number(_0x352c04),
    'type': _0x1c59cf,
    'operate': "increment"
  });
  return;
});
const a19_0x11c1b7 = {
  'addTask': addTask
};
exports["default"] = a19_0x11c1b7;