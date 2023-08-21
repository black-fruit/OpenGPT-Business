'use strict';

var a129_0x3bf152 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a129_0x3bf152);

function getBrowserType(_0x2dec09) {
  if (!_0x2dec09) {
    return 'pc';
  }

  if (/AlipayClient/["test"](_0x2dec09)) {
    return "alipay";
  } else {
    if (/MicroMessenger/["test"](_0x2dec09)) {
      return "wechat";
    } else {
      if (/QQ\//["test"](_0x2dec09)) {
        return 'qq';
      } else {
        if (/Mobile/["test"](_0x2dec09)) {
          return "mobile";
        } else {
          return 'pc';
        }
      }
    }
  }
}

exports["default"] = getBrowserType;