'use strict';

const a82_0xfe68e5 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a82_0xfe68e5);

const tslib_1 = require("tslib"),
      __1 = require('..'),
      utils_1 = require("../../utils"),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function getUserInfo(_0x2260ef) {
  const _0x4a7408 = {
    "where": _0x2260ef
  };

  const _0x7b5efc = await mysql_1["default"]['findOne'](_0x4a7408);

  if (!_0x7b5efc) {
    return null;
  }

  return _0x7b5efc?.["toJSON"]();
}

async function addUserInfo(_0x516679) {
  const _0xf92710 = await mysql_1['default']["create"](_0x516679)["then"](_0x53f4dd => _0x53f4dd['toJSON']());

  return _0xf92710;
}

async function updataUserVIP(_0x49a104) {
  const _0x1fa851 = await mysql_1["default"]["findByPk"](_0x49a104['id']),
        _0x1b570e = await _0x1fa851?.['toJSON']();

  if (_0x49a104["type"] === "integral") {
    if (_0x49a104['operate'] === "decrement") {
      const _0x51c8cb = {
        'by': _0x49a104["value"]
      };
      _0x1fa851?.["decrement"]('integral', _0x51c8cb);
    } else {
      if (_0x49a104["operate"] === "increment") {
        const _0x164c15 = {
          'by': _0x49a104['value']
        };
        _0x1fa851?.["increment"]("integral", _0x164c15);
      }
    }
  } else {
    if (_0x49a104["type"] === "day") {
      const _0x1ec209 = Date['parse'](_0x1b570e["vip_expire_time"]),
            _0x1c6b9b = Date["parse"](_0x1b570e["svip_expire_time"]),
            _0x5865fd = new Date()["getTime"](),
            _0x352115 = _0x49a104['value'] * 86400000;

      let _0x328dc9 = 0,
          _0x22d612 = _0x1c6b9b;

      if (_0x1ec209 < _0x5865fd) {
        _0x328dc9 = _0x5865fd + _0x352115;
      } else {
        _0x328dc9 = _0x1ec209 + _0x352115;
      }

      if (_0x49a104["level"] && _0x49a104['level'] === 2) {
        if (_0x1c6b9b < _0x5865fd) {
          _0x22d612 = _0x5865fd + _0x352115;
        } else {
          _0x22d612 = _0x1c6b9b + _0x352115;
        }
      }

      const _0x4f9132 = (0, utils_1["formatTime"])("yyyy-MM-dd HH:mm:ss", new Date(_0x328dc9)),
            _0x2873df = (0, utils_1["formatTime"])("yyyy-MM-dd HH:mm:ss", new Date(_0x22d612)),
            _0x29091b = {
        "vip_expire_time": _0x4f9132,
        'svip_expire_time': _0x2873df
      };

      const _0x3221bf = {
        'id': _0x49a104['id']
      };
      const _0x2611a8 = {
        'where': _0x3221bf
      };
      await mysql_1['default']["update"](_0x29091b, _0x2611a8);
    }
  }

  return true;
}

async function getUsers({
  "page": _0x4fa426,
  "page_size": _0x2a647e
}, _0x3f284d) {
  const _0x16081e = {
    "where": _0x3f284d,
    'order': [["create_time", "DESC"]],
    "offset": _0x4fa426 * _0x2a647e,
    'limit': _0x2a647e
  };

  const _0xeff955 = await mysql_1["default"]['findAndCountAll'](_0x16081e);

  return _0xeff955;
}

async function delUser(_0x4a8af4) {
  const _0x429ecc = {
    'id': _0x4a8af4
  };
  const _0x8e9ad = {
    'where': _0x429ecc
  };

  const _0x343bcd = await mysql_1['default']['destroy'](_0x8e9ad);

  return _0x343bcd;
}

async function editUser(_0x469390) {
  const _0x599c68 = await mysql_1['default']["upsert"](_0x469390);

  return _0x599c68;
}

async function editUserInfo(_0x551aca, _0x4080f4) {
  const _0x1cc26c = { ..._0x4080f4
  },
        _0x42b1aa = {
    'id': _0x551aca
  };
  const _0x2e835e = {
    "where": _0x42b1aa
  };

  const _0x476271 = await mysql_1["default"]['update'](_0x1cc26c, _0x2e835e);

  return _0x476271;
}

async function addUserProductQuota(_0x58a099, _0x827a38) {
  if (_0x827a38 && _0x58a099) {
    const _0x2580b6 = await __1["productModel"]["getProduct"](_0x827a38);

    if (!_0x2580b6) {
      return (0, utils_1["httpBody"])(-1, {}, "商品不存在");
    }

    let _0x2e2a66 = 0,
        _0x3c38fa = 0;

    if (_0x2580b6["type"] === "integral") {
      _0x3c38fa = _0x2580b6["value"];
    } else {
      _0x2580b6['type'] === "day" && (_0x2e2a66 = _0x2580b6['value']);
    }

    const _0x638726 = {
      'id': _0x58a099,
      "value": _0x3c38fa ? _0x3c38fa : _0x2e2a66,
      "type": _0x2580b6["type"],
      "level": _0x2580b6["level"],
      'operate': "increment"
    };
    await updataUserVIP(_0x638726);
    const _0x24f829 = { ..._0x2580b6,
      "value": _0x2e2a66 ? _0x2580b6["value"] + '天' : _0x2580b6["value"] + '积分'
    };
    return (0, utils_1['httpBody'])(0, _0x24f829, "充值成功");
  }

  return (0, utils_1["httpBody"])(-1, {}, "数据错误");
}

const a82_0x296506 = {
  'getUserInfo': getUserInfo,
  'addUserInfo': addUserInfo,
  "updataUserVIP": updataUserVIP,
  'getUsers': getUsers,
  "delUser": delUser,
  "editUser": editUser,
  "addUserProductQuota": addUserProductQuota,
  "editUserInfo": editUserInfo
};
exports["default"] = a82_0x296506;