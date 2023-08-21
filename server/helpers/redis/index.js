'use strict';

const a20_0x29d053 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a20_0x29d053);

const tslib_1 = require("tslib"),
      ioredis_1 = tslib_1["__importDefault"](require("ioredis")),
      config_1 = tslib_1["__importDefault"](require("../../config")),
      ioredis = new ioredis_1["default"]({ ...config_1["default"]["getConfig"]("redis_config")
});

class Redis {
  ["ioredis"];

  constructor(_0x319be5) {
    this["ioredis"] = _0x319be5;
    this["select"](0);
  }

  ["select"](_0x27b95b = 0) {
    this["ioredis"]["select"](_0x27b95b);
    return this;
  }

  ["expire"](_0x106ab6, _0x56a39e = 0) {
    if (_0x56a39e) {
      ioredis["expire"](_0x106ab6, _0x56a39e);
    }

    return this;
  }

  ['pexpire'](_0x45ca06, _0x4f30ae = 0) {
    if (_0x4f30ae) {
      ioredis["pexpire"](_0x45ca06, _0x4f30ae);
    }

    return this;
  }

  async ['get'](_0x2f9937) {
    const _0x8383fc = await ioredis['get'](_0x2f9937);

    return _0x8383fc;
  }

  ['set'](_0x1f8d3d, _0x5653bb) {
    ioredis["set"](_0x1f8d3d, _0x5653bb);
    return this;
  }

  ["setex"](_0x18d2bd, _0xfcfabc, _0x462593) {
    ioredis["setex"](_0x18d2bd, _0x462593, _0xfcfabc);
    return this;
  }

  ["sadd"](_0x318a1c, _0x52af87, _0x1ea75c) {
    ioredis['sadd'](_0x318a1c, _0x52af87);

    if (_0x1ea75c) {
      ioredis['expire'](_0x318a1c, _0x1ea75c);
    }

    return this;
  }

  ["srem"](_0x27eaff, _0x15a722) {
    return ioredis['srem'](_0x27eaff, _0x15a722);
  }

  ["sismember"](_0x51bf48, _0x400313) {
    return ioredis["sismember"](_0x51bf48, _0x400313);
  }

  ["smembers"](_0x3d946c) {
    return ioredis["smembers"](_0x3d946c);
  }

  async ["del"](..._0x407de4) {
    const _0x2a2227 = await ioredis["del"](_0x407de4);

    return _0x2a2227;
  }

}

exports["default"] = new Redis(ioredis);