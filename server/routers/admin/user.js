'use strict';

const a105_0x12c5c9 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a105_0x12c5c9);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require('express')),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["post"]("/user", async function (_0x1af97e, _0x2d7651, _0x40c427) {
  const {
    "account": _0x20e458,
    "nickname": nickname = "ChatGpt",
    "avatar": avatar = "https://u1.dl0.cn/icon/1682426702646avatarf3db669b024fad66-1930929abe2847093.png",
    "status": status = 1,
    "role": role = "user",
    "superior_id": _0x5f068c,
    "password": _0x5a54e7,
    "integral": integral = 0,
    "vip_expire_time": vip_expire_time = "2020-02-02 22:02:02",
    "svip_expire_time": svip_expire_time = "2020-02-02 22:02:02"
  } = _0x1af97e["body"];

  if (!_0x20e458 || !_0x5a54e7) {
    _0x2d7651["status"](500)['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x39c3d2 = _0x1af97e['headers']["user-agent"] || '',
        _0x4bdddf = (0, utils_1['getClientIP'])(_0x1af97e),
        _0x365a1d = (0, utils_1['generateNowflakeId'])(1)(),
        _0x941020 = await models_1["userModel"]["addUserInfo"]((0, utils_1["filterObjectNull"])({
    'id': _0x365a1d,
    'account': _0x20e458,
    'ip': _0x4bdddf,
    'nickname': nickname,
    'avatar': avatar,
    'status': status,
    'role': role,
    'password': (0, utils_1["generateMd5"])(_0x5a54e7),
    'integral': integral,
    'vip_expire_time': vip_expire_time,
    'svip_expire_time': svip_expire_time,
    'invite_code': utils_1["generateCrc"]['crc32'](_0x365a1d + '_' + Date['now']()),
    'user_agent': _0x39c3d2,
    'superior_id': _0x5f068c
  }));

  _0x2d7651["json"]((0, utils_1["httpBody"])(0, _0x941020, "新增成功"));
});
router["get"]("/user", async function (_0x4ad4ca, _0xdc5426, _0x1e210e) {
  const _0x10c04e = {
    "page": _0x4ad4ca["query"]['page'],
    'page_size': _0x4ad4ca["query"]["page_size"]
  };
  const {
    "page": _0x53a6ce,
    "page_size": _0x3688a1
  } = (0, utils_1["pagingData"])(_0x10c04e),
        _0x20a248 = {
    "page": _0x53a6ce,
    "page_size": _0x3688a1
  };

  const _0x4e80df = await models_1["userModel"]['getUsers'](_0x20a248);

  _0xdc5426["json"]((0, utils_1['httpBody'])(0, _0x4e80df));
});
router["delete"]('/user/:id', async function (_0xb3d4e6, _0x41ff5a, _0x4b5f26) {
  const {
    "id": _0x4f2d9d
  } = _0xb3d4e6["params"];

  if (!_0x4f2d9d) {
    _0x41ff5a["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x3c4b7d = await models_1["userModel"]['delUser'](_0x4f2d9d);

  _0x41ff5a["json"]((0, utils_1['httpBody'])(0, _0x3c4b7d));
});
router['put']('/user', async function (_0x2bf2b4, _0x145fd6, _0x48fffc) {
  const {
    "id": _0x5bc57b,
    "account": _0x42970c,
    "status": _0xdf72ec,
    "avatar": _0x1c22d1,
    "integral": _0x4b0d44,
    "nickname": _0x1cbfb2,
    "role": _0x77593,
    "vip_expire_time": _0x171f71,
    "svip_expire_time": _0x34b097
  } = _0x2bf2b4["body"];

  if (!_0x5bc57b) {
    _0x145fd6['json']((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x45b511 = await models_1["userModel"]["editUserInfo"](_0x5bc57b, (0, utils_1["filterObjectNull"])({
    'id': _0x5bc57b,
    'account': _0x42970c,
    'avatar': _0x1c22d1,
    'integral': _0x4b0d44,
    'nickname': _0x1cbfb2,
    'status': _0xdf72ec,
    'role': _0x77593,
    'vip_expire_time': _0x171f71,
    'svip_expire_time': _0x34b097
  }));

  _0x145fd6["json"]((0, utils_1["httpBody"])(0, _0x45b511));
});
exports["default"] = router;