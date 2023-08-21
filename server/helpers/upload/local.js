'use strict';

const a29_0xd5a8cc = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a29_0xd5a8cc);
exports["local"] = void 0;

const tslib_1 = require('tslib'),
      fs_1 = tslib_1["__importDefault"](require('fs')),
      operateFile_1 = tslib_1['__importDefault'](require('./operateFile')),
      utils_1 = require('../../utils');

async function local(_0x344e92, {
  "host": _0x12c0e2
}) {
  const _0x40f4ee = (0, operateFile_1["default"])(_0x344e92);

  if (!fs_1['default']["existsSync"](_0x40f4ee["dirPath"])) {
    const _0x267e83 = {
      "recursive": true
    };
    fs_1["default"]["mkdirSync"](_0x40f4ee['dirPath'], _0x267e83);
  }

  try {
    await fs_1['default']["promises"]["writeFile"](_0x40f4ee["filePath"], _0x344e92["buffer"]);
    const _0x148907 = { ..._0x40f4ee,
      'url': _0x12c0e2 + _0x40f4ee["filePath"]
    };
    return (0, utils_1["httpBody"])(0, _0x148907);
  } catch (_0x12db72) {
    return (0, utils_1["httpBody"])(500, {}, "上传失败");
  }
}

exports["local"] = local;