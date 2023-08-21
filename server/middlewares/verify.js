'use strict';

const a39_0x3bb302 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a39_0x3bb302);

const tslib_1 = require('tslib'),
      redis_1 = tslib_1['__importDefault'](require("../helpers/redis")),
      utils_1 = require('../utils'),
      verifyPath = ["post:/api/login", 'get:/api/send_sms', "get:/api/pay/notify", 'post:/api/pay/notify', 'get:/api/config', 'get:/api/persona', "get:/api/images"];

async function verify(_0x2e180c, _0x255ba5, _0x12a640) {
  const {
    "token": _0x446821
  } = _0x2e180c["headers"],
        {
    "path": _0x3a507c,
    "method": _0x54c577
  } = _0x2e180c,
        _0x1a2f8d = verifyPath["filter"](_0x151552 => _0x151552["toUpperCase"]() === (_0x54c577 + ':' + _0x3a507c)["toUpperCase"]());

  if ((_0x1a2f8d["length"] || _0x3a507c["indexOf"]("/api") === -1) && !_0x446821) {
    await _0x12a640();
    return;
  }

  const _0x361cd1 = 'token:' + _0x446821;

  let _0x5d1475 = (await redis_1["default"]["select"](1)["get"](_0x361cd1)) || null;

  console['log'](_0x5d1475);

  if (_0x5d1475) {
    try {
      _0x5d1475 = JSON["parse"](_0x5d1475);
    } catch (_0x9350ba) {
      redis_1["default"]["select"](1)["del"](_0x361cd1);

      _0x255ba5["status"](401)["json"]((0, utils_1["httpBody"])(4001, "用户token失效，请重新登录！"));

      return;
    }
  } else {
    _0x255ba5['status'](401)["json"]((0, utils_1["httpBody"])(4001, "请登录账户后重新尝试！"));

    return;
  }

  if (_0x3a507c['indexOf']("/api/admin") !== -1 && _0x5d1475?.['role'] !== "administrator") {
    _0x255ba5["status"](403)["json"]((0, utils_1["httpBody"])(-1, "拒绝访问，请联系网站管理员！"));

    return;
  }

  _0x2e180c['user_id'] = _0x5d1475?.['id'];

  _0x12a640();
}

exports["default"] = verify;