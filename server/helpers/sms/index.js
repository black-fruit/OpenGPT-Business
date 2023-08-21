'use strict';

const a24_0x496722 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a24_0x496722);
exports["sendSms"] = void 0;

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1["__importDefault"](require('node-fetch')),
      querystring_1 = tslib_1['__importDefault'](require("querystring")),
      crypto_1 = tslib_1["__importDefault"](require("crypto")),
      utils_1 = require("../../utils");

function sendSms({
  "user": _0x4ee714,
  "password": _0x34b2cc,
  "content": _0x5d8286,
  "phone": _0x366cb9
}) {
  const _0x41f919 = crypto_1["default"]["createHash"]("md5"),
        _0x8cc6c0 = _0x41f919["update"](_0x34b2cc)["digest"]("hex"),
        _0x15c938 = {
    'u': _0x4ee714,
    'p': _0x8cc6c0,
    'm': _0x366cb9,
    'c': _0x5d8286
  };

  const _0x57820f = querystring_1['default']['stringify'](_0x15c938);

  return (0, node_fetch_1["default"])("https://api.smsbao.com/sms?" + _0x57820f)["then"](statusStr)['catch'](() => (0, utils_1["httpBody"])(-5, "短信服务异常，请稍后重试"));
}

exports['sendSms'] = sendSms;

async function statusStr(_0x58a126) {
  const _0x576859 = await _0x58a126["json"](),
        _0x240da8 = {
    '0': "短信发送成功",
    '-1': "短信发送参数不全",
    '-2': '服务器空间不支持,请确认支持curl或者fsocket，联系您的空间商解决或者更换空间！',
    '30': "短信发送参数不全",
    '40': "账户不存在",
    '41': "余额不足",
    '42': "账户已过期",
    '43': "IP地址限制",
    '50': '内容含有敏感字'
  };

  return (0, utils_1["httpBody"])(_0x576859, _0x240da8[_0x576859] || "短信异常错误码");
}