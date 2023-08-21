'use strict';

const a27_0x6b734a = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a27_0x6b734a);

const tslib_1 = require("tslib"),
      alioss_1 = require("./alioss"),
      lsky_1 = require('./lsky'),
      local_1 = require('./local'),
      tencent_1 = require('./tencent'),
      up_1 = require("./up"),
      utils_1 = require('../../utils'),
      models_1 = require("../../models"),
      operateFile_1 = tslib_1["__importDefault"](require("./operateFile")),
      a27_0x2df677 = {
  "user_id": ''
};

async function upload(_0x4f812d, _0x2869dd, _0x4964ee = a27_0x2df677) {
  let _0x1c95b1 = {};

  const _0x172e63 = (0, operateFile_1['default'])(_0x4f812d),
        _0x542972 = {
    "sha1": _0x172e63['sha1'],
    "md5": _0x172e63["md5"],
    "status": 1
  };

  const _0x3a744f = await models_1["uploadRecordModel"]["getUploadRecordOne"](_0x542972);

  if (_0x3a744f) {
    const _0x57c813 = { ..._0x172e63,
      ..._0x3a744f
    };
    return (0, utils_1['httpBody'])(0, _0x57c813, '上传成功');
  }

  _0x2869dd["type"] === "local" && (_0x1c95b1 = await (0, local_1["local"])(_0x4f812d, _0x2869dd));

  if (_0x2869dd["type"] === "lsky") {
    _0x1c95b1 = await (0, lsky_1["lsky"])(_0x4f812d, _0x2869dd);
  }

  if (_0x2869dd["type"] === "tencent") {
    _0x1c95b1 = await (0, tencent_1['tencent'])(_0x4f812d, _0x2869dd);
  }

  _0x2869dd["type"] === "alioss" && (_0x1c95b1 = await (0, alioss_1["alioss"])(_0x4f812d, _0x2869dd));

  if (_0x2869dd["type"] === "alioss") {
    _0x1c95b1 = await (0, alioss_1["alioss"])(_0x4f812d, _0x2869dd);
  }

  if (_0x2869dd["type"] === "upyun") {
    _0x1c95b1 = await (0, up_1['up'])(_0x4f812d, _0x2869dd);
  }

  if (Object['keys'](_0x1c95b1)["length"] > 0 && !_0x1c95b1['code']) {
    const {
      "data": _0x594fc1
    } = _0x1c95b1,
          _0x267f1f = {
      'user_id': _0x4964ee["user_id"],
      "mimetype": _0x594fc1["mimetype"],
      'sha1': _0x594fc1["sha1"],
      "md5": _0x594fc1["md5"],
      "url": _0x594fc1["url"],
      "originalname": _0x594fc1["originalname"],
      "name": _0x594fc1["fileName"],
      "size": _0x594fc1["size"],
      'type': _0x2869dd['type'],
      "status": 1
    };
    await models_1["uploadRecordModel"]["addUploadRecord"]((0, utils_1['filterObjectNull'])(_0x267f1f));
    return _0x1c95b1;
  } else {
    return (0, utils_1["httpBody"])(-1, [], "存储策略错误");
  }
}

exports["default"] = upload;