'use strict';

const a89_0x1bdb87 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a89_0x1bdb87);

const tslib_1 = require('tslib'),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/carmi", async function (_0x4b6d68, _0x4a38e7, _0x26eb06) {
  const _0x261c5a = {
    "page": _0x4b6d68["query"]["page"],
    "page_size": _0x4b6d68['query']["page_size"]
  };
  const {
    "page": _0x4dc32b,
    "page_size": _0x5dfb2e
  } = (0, utils_1["pagingData"])(_0x261c5a),
        _0x1dceb5 = {
    "page": _0x4dc32b,
    "page_size": _0x5dfb2e
  };

  const _0x3538d2 = await models_1['carmiModel']["getCarmis"](_0x1dceb5);

  _0x4a38e7["json"]((0, utils_1['httpBody'])(0, _0x3538d2));
});
router["delete"]("/carmi/:id", async function (_0x12660d, _0x5c7a36, _0x340dfd) {
  const {
    "id": _0x24e710
  } = _0x12660d["params"];

  if (!_0x24e710) {
    _0x5c7a36["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x6b8f8f = await models_1["carmiModel"]["delCarmi"](_0x24e710);

  _0x5c7a36['json']((0, utils_1['httpBody'])(0, _0x6b8f8f));
});
router["post"]("/carmi", async function (_0xe851, _0x5c4a39, _0x2a6b76) {
  const {
    "type": type = "integral",
    "end_time": end_time = '',
    "quantity": quantity = 1,
    "reward": reward = 10,
    "level": level = 1
  } = _0xe851["body"],
        _0x5977e6 = _0x4cf73d => {
    const _0x5c0bfa = [];

    for (let _0x3c24b5 = 0; _0x3c24b5 < _0x4cf73d; _0x3c24b5++) {
      const _0x1955a5 = (0, utils_1['generateUUID'])() + '_' + (0, utils_1["generateNowflakeId"])(_0x3c24b5 + 1)() + '_' + new Date()["getTime"](),
            _0x12e6e8 = (0, utils_1["generateMd5"])(_0x1955a5);

      _0x5c0bfa["push"](_0x12e6e8);
    }

    return _0x5c0bfa;
  },
        _0x294ab8 = _0x5977e6(quantity),
        _0x50d180 = _0x294ab8["map"]((_0x4aec8d, _0x1d484f) => {
    const _0x503657 = (0, utils_1["generateNowflakeId"])(_0x1d484f)(),
          _0x3e7326 = {
      'id': _0x503657,
      'key': _0x4aec8d,
      "type": type,
      'end_time': end_time,
      "value": reward,
      'status': 0,
      "level": level
    };

    return _0x3e7326;
  }),
        _0x39d4c4 = await models_1["carmiModel"]['addCarmis'](_0x50d180);

  _0x5c4a39["json"]((0, utils_1["httpBody"])(0, _0x39d4c4));
});
router["get"]("/carmi/check", async function (_0x49a42e, _0x134130, _0x52d45f) {
  const _0xb96c15 = (0, utils_1["formatTime"])("yyyy-MM-dd");

  models_1['carmiModel']["checkCarmiEndTime"](_0xb96c15);

  _0x134130["json"]((0, utils_1['httpBody'])(0));
});
exports['default'] = router;