'use strict';

const a36_0x127312 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a36_0x127312);
exports["upa"] = void 0;

const tslib_1 = require("tslib"),
      upyun_1 = tslib_1["__importDefault"](require("upyun")),
      operateFile_1 = tslib_1["__importDefault"](require("./operateFile"));

async function upa(_0x7f9fb8) {
  const _0x59a96a = new upyun_1["default"]['Service']("files-storage", "upload", "cC5HndWsWTXG5seD00FY7XjrY576tD1k"),
        {
    "dirPath": _0x1c0ed2,
    "filePath": _0x328032
  } = await (0, operateFile_1['default'])(_0x7f9fb8);

  return '';
}

exports["upa"] = upa;