'use strict';

const a93_0x2ab05d = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a93_0x2ab05d);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/draw_record", async function (_0x3e8513, _0x334ec6, _0x189eb2) {
  const _0x65c315 = {
    "page": _0x3e8513["query"]['page'],
    "page_size": _0x3e8513['query']["page_size"]
  };
  const {
    "page": _0x5ac737,
    "page_size": _0x2c8556
  } = (0, utils_1["pagingData"])(_0x65c315),
        _0x4e4d78 = {
    'page': _0x5ac737,
    "page_size": _0x2c8556
  };

  const _0x55a88e = await models_1["drawRecordModel"]["getDrawRecords"](_0x4e4d78);

  _0x334ec6["json"]((0, utils_1["httpBody"])(0, _0x55a88e));
});
router["delete"]("/draw_record/:id", async function (_0x408f7c, _0x294079, _0x4c4097) {
  const {
    "id": _0x1f24a4
  } = _0x408f7c['params'];

  if (!_0x1f24a4) {
    _0x294079['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x109f87 = await models_1["drawRecordModel"]["delDrawRecord"](_0x1f24a4);

  _0x294079["json"]((0, utils_1["httpBody"])(0, _0x109f87));
});
router["put"]("/draw_record", async function (_0x111f7b, _0xcdc7af, _0x4d83ef) {
  const {
    "id": _0x5c4d90,
    "status": _0x3d0f19
  } = _0x111f7b['body'];

  if (!_0x5c4d90) {
    _0xcdc7af["json"]((0, utils_1["httpBody"])(-1, '缺少必要参数'));

    return;
  }

  const _0x133674 = {
    "status": _0x3d0f19
  };

  const _0x5ce0a4 = await models_1["drawRecordModel"]['editDrawRecord'](_0x5c4d90, _0x133674);

  _0xcdc7af["json"]((0, utils_1['httpBody'])(0, _0x5ce0a4));
});
exports['default'] = router;