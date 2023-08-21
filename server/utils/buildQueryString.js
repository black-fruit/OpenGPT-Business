'use strict';

var a117_0x3f127b = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a117_0x3f127b);

function buildQueryString(_0x58703a) {
  return Object['keys'](_0x58703a)["map"](function (_0x40ab16) {
    return _0x40ab16 + '=' + _0x58703a[_0x40ab16];
  })['join']('&');
}

exports["default"] = buildQueryString;