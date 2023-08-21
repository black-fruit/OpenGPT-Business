'use strict';

const a128_0x39d11a = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a128_0x39d11a);

function generateUUID() {
  let _0x8feffe = new Date()["getTime"]();

  if (typeof performance !== "undefined" && typeof performance['now'] === "function") {
    _0x8feffe += performance["now"]();
  }

  const _0x2c71fd = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"["replace"](/[xy]/g, function (_0x5e0210) {
    const _0x4cf28c = (_0x8feffe + Math["random"]() * 16) % 16 | 0;

    _0x8feffe = Math["floor"](_0x8feffe / 16);
    return (_0x5e0210 == 'x' ? _0x4cf28c : _0x4cf28c & 3 | 8)["toString"](16);
  });

  return _0x2c71fd;
}

exports["default"] = generateUUID;