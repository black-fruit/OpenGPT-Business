'use strict';

const a95_0x325e4d = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a95_0x325e4d);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require('express')),
      utils_1 = require("../../utils"),
      models_1 = require("../../models"),
      queue_1 = require("../../helpers/queue"),
      router = express_1["default"]["Router"]();

router['get']("/invite_record", async function (_0x298d40, _0x17a947, _0x4e487c) {
  const _0x485391 = {
    "page": _0x298d40["query"]["page"],
    'page_size': _0x298d40["query"]["page_size"]
  };
  const {
    "page": _0x49ae8e,
    "page_size": _0x4f0e4b
  } = (0, utils_1['pagingData'])(_0x485391),
        _0x2624f4 = {
    "page": _0x49ae8e,
    "page_size": _0x4f0e4b
  };

  const _0x5001bd = await models_1['inviteRecordModel']["getInviteRecords"](_0x2624f4);

  _0x17a947["json"]((0, utils_1["httpBody"])(0, _0x5001bd));
});
router['delete']("/invite_record/:id", async function (_0x58908e, _0x246582, _0x25012c) {
  const {
    "id": _0x5de2a4
  } = _0x58908e["params"];

  if (!_0x5de2a4) {
    _0x246582["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x2cd151 = await models_1["inviteRecordModel"]["delInviteRecord"](_0x5de2a4);

  _0x246582['json']((0, utils_1["httpBody"])(0, _0x2cd151));
});
router["put"]("/invite_record", async function (_0x30c4fb, _0x2c2172, _0x282a11) {
  const {
    "id": _0x298c57,
    "status": _0x2c8515,
    "remarks": _0x3889cb
  } = _0x30c4fb["body"];

  if (!_0x298c57) {
    _0x2c2172["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x328cc2 = {
    "status": _0x2c8515,
    'remarks': _0x3889cb
  };

  const _0x380a0e = await models_1["inviteRecordModel"]['editInviteRecord'](_0x298c57, (0, utils_1["filterObjectNull"])(_0x328cc2));

  _0x2c2172['json']((0, utils_1["httpBody"])(0, _0x380a0e));
});
router["put"]("/invite_record/pass", async function (_0x5cf8fd, _0x5a5fca, _0x360351) {
  const {
    "id": _0x225916
  } = _0x5cf8fd["body"];

  if (!_0x225916) {
    const _0x57acef = {
      'status': 3
    };

    const _0x53f7 = await models_1["inviteRecordModel"]['getInviteRecordAll'](_0x57acef);

    _0x53f7['map'](_0x26f9ae => {
      const _0x453623 = _0x26f9ae['toJSON'](),
            _0xa6a05c = { ..._0x453623
      };

      queue_1["inviteRecordPassQueue"]["addTask"](_0xa6a05c);
    });
  } else {
    const _0x17c2f9 = {
      'id': _0x225916
    };

    const _0x3fefd4 = await models_1['inviteRecordModel']["getInviteRecord"](_0x17c2f9);

    if (!_0x3fefd4) {
      _0x5a5fca["json"]((0, utils_1['httpBody'])(-1, '邀请记录异常'));

      return;
    }

    const {
      "superior_id": _0x220b6a,
      "reward": _0x3ad56e,
      "reward_type": _0x4facaa
    } = _0x3fefd4,
          _0x42e9af = {
      'id': _0x225916,
      'superior_id': _0x220b6a,
      'reward': _0x3ad56e,
      'reward_type': _0x4facaa,
      ..._0x3fefd4
    };
    queue_1["inviteRecordPassQueue"]["addTask"](_0x42e9af);
  }

  _0x5a5fca["json"]((0, utils_1["httpBody"])(0, '操作成功'));
});
exports["default"] = router;