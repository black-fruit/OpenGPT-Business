'use strict';

const a9_0x27b281 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a9_0x27b281);
exports["sendMail"] = void 0;

const tslib_1 = require("tslib"),
      nodemailer_1 = tslib_1["__importDefault"](require("nodemailer")),
      utils_1 = require("../../utils"),
      sendMailPromise = (_0x1fb6a2, _0x4d7e7c) => {
  return new Promise((_0x1fbb35, _0x250232) => {
    _0x1fb6a2["sendMail"](_0x4d7e7c, (_0x4b177d, _0x22e955) => {
      if (_0x4b177d) {
        _0x250232((0, utils_1['httpBody'])(-1, "邮件服务配置错误"));
      } else {
        _0x1fbb35((0, utils_1["httpBody"])(0, "邮件发送成功"));
      }
    });
  });
};

function sendMail({
  "to": _0x1605ad,
  "body": _0x49aed1,
  "options": _0x59fe79,
  "fromTitle": fromTitle = "ChatGpt",
  "subject": subject = "通知邮件"
}) {
  const _0x524378 = Number(_0x59fe79['port']) === 465 ? true : false,
        _0x570c7b = {
    'secure': _0x524378,
    'ignoreTLS': true,
    ..._0x59fe79
  },
        _0x33c3c8 = nodemailer_1['default']["createTransport"](_0x570c7b),
        _0x4f0f36 = {
    "from": "\"" + fromTitle + "\" <" + _0x59fe79['auth']["user"] + '>',
    'to': _0x1605ad,
    "subject": subject,
    "html": _0x49aed1
  };

  return sendMailPromise(_0x33c3c8, _0x4f0f36);
}

exports['sendMail'] = sendMail;