'use strict';

const a97_0x363843 = {
  "value": true
};
Object['defineProperty'](exports, '__esModule', a97_0x363843);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1['default']["Router"]();

router['get']("/notification", async function (_0x470222, _0x347ea3, _0x1409d9) {
  const _0x2eff7a = {
    "page": _0x470222['query']['page'],
    "page_size": _0x470222["query"]["page_size"]
  };
  const {
    "page": _0x5ec412,
    "page_size": _0x3ff00b
  } = (0, utils_1["pagingData"])(_0x2eff7a),
        _0xfa6df1 = {
    'page': _0x5ec412,
    "page_size": _0x3ff00b
  };

  const _0x227d87 = await models_1["notificationModel"]["getNotification"](_0xfa6df1);

  _0x347ea3["json"]((0, utils_1["httpBody"])(0, _0x227d87));
});
router["delete"]('/notification/:id', async function (_0x18fb90, _0x44ccdf, _0x5dae93) {
  const {
    "id": _0x566c8c
  } = _0x18fb90["params"];

  if (!_0x566c8c) {
    _0x44ccdf["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x4fb40b = await models_1["notificationModel"]["delNotification"](_0x566c8c);

  _0x44ccdf["json"]((0, utils_1["httpBody"])(0, _0x4fb40b));
});
router["post"]("/notification", async function (_0x3dec8e, _0x28ccb7, _0x34f39f) {
  const {
    "title": _0x3cbaac,
    "content": _0x2d2c42,
    "sort": _0x1134f4,
    "status": _0x1d0ea4
  } = _0x3dec8e["body"];

  if (!_0x3cbaac || !_0x2d2c42) {
    _0x28ccb7["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x5222c5 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x26da85 = {
    'id': _0x5222c5,
    "title": _0x3cbaac,
    "content": _0x2d2c42,
    "sort": _0x1134f4,
    "status": _0x1d0ea4
  };

  const _0x4093c7 = await models_1['notificationModel']["addNotification"](_0x26da85);

  _0x28ccb7["json"]((0, utils_1["httpBody"])(0, _0x4093c7));
});
router["put"]('/notification', async function (_0x5a107f, _0x54983a, _0xcf45f3) {
  const {
    "id": _0x2f8127,
    "title": _0x5712e7,
    "content": _0x1f788b,
    "sort": _0x5d5c84,
    "status": _0x3e0006
  } = _0x5a107f["body"];

  if (!_0x2f8127 || !_0x5712e7 || !_0x1f788b) {
    _0x54983a['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x2c5c46 = {
    'title': _0x5712e7,
    'content': _0x1f788b,
    'sort': _0x5d5c84,
    'status': _0x3e0006
  };

  const _0x4a42ed = await models_1["notificationModel"]["editNotification"](_0x2f8127, (0, utils_1["filterObjectNull"])(_0x2c5c46));

  _0x54983a["json"]((0, utils_1["httpBody"])(0, _0x4a42ed));
});
exports['default'] = router;