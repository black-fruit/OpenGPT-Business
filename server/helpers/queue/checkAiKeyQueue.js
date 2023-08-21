'use strict';

const a16_0x13d35e = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a16_0x13d35e);

const tslib_1 = require("tslib"),
      models_1 = require("../../models"),
      keyUsage_1 = tslib_1['__importDefault'](require("../keyUsage")),
      function_1 = tslib_1['__importDefault'](require("./function")),
      CheckAiKeyQueue = (0, function_1["default"])("CheckAiKeyQueue");

async function addTask(_0x4e9ca2, _0x6adc83) {
  const _0x5b9a6a = await CheckAiKeyQueue["add"](_0x4e9ca2, _0x6adc83);

  return _0x5b9a6a;
}

CheckAiKeyQueue['process'](async _0x4df287 => {
  const {
    "id": _0x455f3e
  } = _0x4df287["data"],
        _0x3b697d = await (0, keyUsage_1['default'])(_0x4df287["data"]);

  let _0x4aa7e9 = 1;

  const _0x28de14 = Number(_0x3b697d["hard_limit_usd"]),
        _0x84a1f0 = Number(_0x3b697d["total_usage"]);

  _0x3b697d['status'] && (_0x4aa7e9 = 0);

  if (_0x28de14 <= _0x84a1f0) {
    _0x4aa7e9 = 0;
  }

  const _0x2ae351 = {
    'limit': _0x28de14,
    "usage": _0x84a1f0,
    "status": _0x4aa7e9
  };
  await models_1["aikeyModel"]['editAikey'](_0x455f3e, _0x2ae351);
  return;
});
const a16_0x48c793 = {
  'addTask': addTask
};
exports["default"] = a16_0x48c793;