'use strict';

const a130_0x5dabd5 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a130_0x5dabd5);

function getClientIP(_0x4cf9ef) {
  let _0x8a0e79 = _0x4cf9ef["headers"]["x-forwarded-for"] || _0x4cf9ef["headers"]["x-real-ip"] || _0x4cf9ef["headers"]['remote-host'] || _0x4cf9ef["socket"]['remoteAddress'] || _0x4cf9ef['ip'] || '';

  if (_0x8a0e79) {
    _0x8a0e79 = _0x8a0e79["replace"]("::ffff:", '');
  }

  return _0x8a0e79;
}

exports["default"] = getClientIP;