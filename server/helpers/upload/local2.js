'use strict';

const a30_0x13e1d5 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a30_0x13e1d5);
exports["local2"] = void 0;

const tslib_1 = require("tslib"),
      fs_1 = tslib_1["__importDefault"](require('fs')),
      operateFile_1 = tslib_1["__importDefault"](require('./operateFile'));

async function local2(_0x3bd08c) {
  const {
    "dirPath": _0x2db95b,
    "filePath": _0x28a993
  } = await (0, operateFile_1['default'])(_0x3bd08c);

  if (!fs_1['default']["existsSync"](_0x2db95b)) {
    const _0x268919 = {
      "recursive": true
    };
    fs_1["default"]["mkdirSync"](_0x2db95b, _0x268919);
  }

  try {
    await fs_1["default"]["promises"]['writeFile'](_0x28a993, _0x3bd08c["buffer"]);
    return _0x28a993;
  } catch (_0x23099d) {
    return null;
  }
}

exports["local2"] = local2;