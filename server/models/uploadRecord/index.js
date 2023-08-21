'use strict';

const a80_0x36ef2e = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a80_0x36ef2e);

const tslib_1 = require("tslib"),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function addUploadRecord(_0x4c4cdb) {
  const _0x35f9f6 = await mysql_1["default"]['create'](_0x4c4cdb);

  return _0x35f9f6;
}

async function getUploadRecordOne(_0x52c215) {
  const _0x45bd0d = {
    "where": _0x52c215
  };

  const _0x2cb91a = await mysql_1["default"]["findOne"](_0x45bd0d);

  return _0x2cb91a;
}

const a80_0x290f0d = {
  "addUploadRecord": addUploadRecord,
  'getUploadRecordOne': getUploadRecordOne
};
exports["default"] = a80_0x290f0d;