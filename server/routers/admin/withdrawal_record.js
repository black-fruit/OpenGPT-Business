'use strict';

const a106_0x2889f8 = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a106_0x2889f8);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      router = express_1["default"]["Router"]();

router["get"]("/withdrawal_record", async function (_0x344a2d, _0x10baf1, _0x54e18d) {
  const _0x46be9a = {
    "page": _0x344a2d["query"]["page"],
    "page_size": _0x344a2d['query']['page_size']
  };
  const {
    "page": _0x4c1303,
    "page_size": _0x42d656
  } = (0, utils_1["pagingData"])(_0x46be9a),
        _0x1d6643 = {
    "page": _0x4c1303,
    "page_size": _0x42d656
  };

  const _0x1575cd = await models_1["withdrawalRecordModel"]["getWithdrawalRecords"](_0x1d6643);

  _0x10baf1["json"]((0, utils_1['httpBody'])(0, _0x1575cd));
});
router["delete"]("/withdrawal_record/:id", async function (_0x151ca3, _0x1e93e9, _0x3c9d0e) {
  const {
    "id": _0x26ccf8
  } = _0x151ca3["params"];

  if (!_0x26ccf8) {
    _0x1e93e9["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x1fbf6c = await models_1["withdrawalRecordModel"]["delWithdrawalRecord"](_0x26ccf8);

  _0x1e93e9['json']((0, utils_1["httpBody"])(0, _0x1fbf6c));
});
router["post"]("/withdrawal_record", async function (_0x3433ad, _0x149b11, _0x4a8d8a) {
  const {
    "user_id": _0x2f6438,
    "amount": _0x5d5cd4,
    "type": _0x301f40,
    "name": _0x20868d,
    "contact": _0x4ee77d,
    "account": _0x3b8a90
  } = _0x3433ad["body"];

  if (!_0x2f6438 || !_0x5d5cd4 || !_0x301f40 || !_0x20868d || !_0x4ee77d || !_0x3b8a90) {
    _0x149b11['json']((0, utils_1["httpBody"])(-1, '缺少必要参数'));

    return;
  }

  const _0x57228b = (0, utils_1["generateNowflakeId"])(1)(),
        _0x230d69 = { ..._0x3433ad["body"],
    'id': _0x57228b
  };

  const _0x5dc0f5 = await models_1["withdrawalRecordModel"]["addWithdrawalRecord"]((0, utils_1['filterObjectNull'])(_0x230d69));

  _0x149b11["json"]((0, utils_1["httpBody"])(0, _0x5dc0f5));
});
router['put']("/withdrawal_record", async function (_0x2171ac, _0xdb0e02, _0x127eae) {
  const {
    "id": _0x37cefd
  } = _0x2171ac["body"];

  if (!_0x37cefd) {
    _0xdb0e02['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x598489 = { ..._0x2171ac['body']
  },
        _0x87380e = await models_1['withdrawalRecordModel']["editWithdrawalRecord"](_0x37cefd, (0, utils_1["filterObjectNull"])(_0x598489));

  _0xdb0e02["json"]((0, utils_1["httpBody"])(0, _0x87380e));
});
router['put']("/withdrawal_record/operate", async function (_0x2d0e15, _0x8bebf8, _0x4dc74b) {
  const {
    "id": _0x2ef724,
    "status": _0x1ca09a,
    "remarks": _0x466b19
  } = _0x2d0e15["body"];

  if (!_0x2ef724 || !_0x466b19) {
    _0x8bebf8['json']((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  if (String(_0x1ca09a) === '0') {
    const _0x35a75e = {
      'id': _0x2ef724
    };
    const {
      "amount": _0xda3a4f,
      "user_id": _0x49dd0d
    } = await models_1["withdrawalRecordModel"]["getWithdrawalRecord"](_0x35a75e),
          _0x49a1a0 = {
      "user_id": _0x49dd0d,
      'status': 1
    };

    const _0x27bc37 = await models_1["amountDetailsModel"]["getAmountDetail"](_0x49a1a0),
          _0x4ff0ba = (0, utils_1["generateNowflakeId"])(1)();

    await models_1['amountDetailsModel']["addAmountDetails"]({
      'user_id': _0x49dd0d,
      'operate_amount': _0xda3a4f,
      'original_amount': _0x27bc37["current_amount"],
      'current_amount': Number(_0x27bc37['current_amount']) + Number(_0xda3a4f),
      'remarks': "提成失败",
      'status': 1,
      'type': "withdrawal",
      'id': _0x4ff0ba,
      'correlation_id': _0x2ef724
    });
  }

  const _0x267113 = {
    "status": _0x1ca09a,
    "remarks": _0x466b19
  };

  const _0x5ef4db = await models_1["withdrawalRecordModel"]['editWithdrawalRecord'](_0x2ef724, (0, utils_1["filterObjectNull"])(_0x267113));

  _0x8bebf8["json"]((0, utils_1["httpBody"])(0, _0x5ef4db));
});
exports["default"] = router;