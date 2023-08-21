'use strict';

const a114_0x23095b = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a114_0x23095b);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      redis_1 = tslib_1["__importDefault"](require("../../helpers/redis")),
      models_1 = require("../../models"),
      utils_1 = require("../../utils"),
      utils_2 = require("../../utils"),
      queue_1 = require("../../helpers/queue"),
      pay_1 = require('../../helpers/pay'),
      router = express_1['default']["Router"]();

router["post"]('/login', async (_0x22fc2b, _0x3609f5, _0x1372c4) => {
  const {
    "account": _0x2273c2,
    "code": _0x4d6235,
    "password": _0x31f1ae,
    "invite_code": _0x85000
  } = _0x22fc2b['body'],
        _0x152eae = _0x22fc2b["headers"]["user-agent"] || '',
        _0x160a9c = (0, utils_1["getClientIP"])(_0x22fc2b);

  if (!_0x2273c2 || !_0x4d6235 && !_0x31f1ae) {
    _0x3609f5["status"](406)["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  let _0x175c98 = true;
  const _0x237ff0 = {
    "account": _0x2273c2
  };

  let _0x2c5999 = await models_1['userModel']["getUserInfo"](_0x237ff0);

  const _0x15ac9a = (await models_1["configModel"]['getConfigValue']("invite_reward")) || 0,
        _0x3ec6dc = {
    'invite_code': _0x85000
  };

  const _0x4d6550 = await models_1['userModel']['getUserInfo'](_0x3ec6dc),
        _0x4fb592 = (0, utils_1['generateNowflakeId'])(1)(),
        _0x59f0a3 = utils_1["generateCrc"]["crc32"](_0x4fb592 + '_' + Date['now']());

  if (_0x2273c2 && _0x4d6235) {
    const _0x451edd = await redis_1["default"]["select"](0)["get"]("code:" + _0x2273c2);

    if (!_0x451edd) {
      _0x3609f5['status'](406)["json"]((0, utils_1["httpBody"])(-1, "请先发送验证码"));

      return;
    }

    if (_0x4d6235 !== _0x451edd) {
      _0x3609f5['status'](406)["json"]((0, utils_1["httpBody"])(-1, "验证码不正确"));

      return;
    }

    await redis_1["default"]['select'](0)["del"]("code:" + _0x2273c2);
  }

  if (_0x2273c2 && _0x4d6235 && _0x31f1ae && !_0x2c5999) {
    try {
      const _0x130ddb = new Date(),
            _0x3d7e96 = new Date(_0x130ddb["getTime"]() - 86400000),
            _0x52a154 = (await models_1["configModel"]["getConfigValue"]("register_reward")) || 0;

      _0x2c5999 = await models_1["userModel"]['addUserInfo']((0, utils_1["filterObjectNull"])({
        'id': _0x4fb592,
        'account': _0x2273c2,
        'ip': _0x160a9c,
        'nickname': "Chat用户",
        'avatar': "https://u1.dl0.cn/icon/1682426702646avatarf3db669b024fad66-1930929abe2847093.png",
        'status': 1,
        'role': "user",
        'password': (0, utils_1["generateMd5"])(_0x31f1ae),
        'integral': Number(_0x52a154),
        'vip_expire_time': (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x3d7e96),
        'svip_expire_time': (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x3d7e96),
        'invite_code': _0x59f0a3,
        'user_agent': _0x152eae,
        'superior_id': _0x4d6550 ? _0x4d6550['id'] : null
      }))["then"](_0xd8c161 => {
        const _0x14a4a7 = (0, utils_1["generateNowflakeId"])(1)(),
              _0x333cf2 = {
          'id': _0x14a4a7,
          'user_id': _0x4fb592,
          "describe": "注册奖励",
          "value": _0x52a154 + '积分'
        };

        models_1['turnoverModel']["addTurnover"](_0x333cf2);

        if (_0x85000 && _0x4d6550 && _0x4d6550['id']) {
          const _0x344a4f = (0, utils_1["generateNowflakeId"])(2)(),
                _0x326447 = {
            'id': _0x344a4f,
            'user_id': _0x4fb592,
            "invite_code": _0x85000,
            'superior_id': _0x4d6550['id'],
            "reward": _0x15ac9a,
            'reward_type': "integral",
            "status": 3,
            "remark": "等待审核",
            'ip': _0x160a9c,
            "user_agent": _0x152eae
          };

          models_1["inviteRecordModel"]["addInviteRecord"](_0x326447);
        }

        return _0xd8c161;
      });
      _0x175c98 = false;
      models_1["actionModel"]["addAction"]({
        'id': (0, utils_1['generateNowflakeId'])(23)(),
        'user_id': _0x2c5999['id'],
        'ip': _0x160a9c,
        'type': "register",
        'describe': "注册账号"
      });
    } catch (_0x4d646c) {
      console["log"](_0x4d646c);

      _0x3609f5["status"](500)["json"]((0, utils_1['httpBody'])(-1, "服务器错误"));

      return;
    }
  } else {
    if (!_0x2c5999) {
      _0x3609f5['status'](406)['json']((0, utils_1["httpBody"])(-1, "用户不存在，请先注册账号"));

      return;
    } else {
      if (_0x2273c2 && _0x4d6235 && !_0x31f1ae) {
        models_1["actionModel"]["addAction"]({
          'id': (0, utils_1['generateNowflakeId'])(23)(),
          'user_id': _0x2c5999['id'],
          'ip': _0x160a9c,
          'type': "login_code",
          'describe': "邮箱验证码登录"
        });
      } else {
        if (_0x2273c2 && _0x31f1ae && !_0x4d6235) {
          const _0x206cf9 = (0, utils_1["generateMd5"])(_0x31f1ae);

          if (_0x2c5999['password'] !== _0x206cf9) {
            _0x3609f5["status"](406)['json']((0, utils_1["httpBody"])(-1, "密码不正确"));

            return;
          }

          models_1["actionModel"]["addAction"]({
            'id': (0, utils_1["generateNowflakeId"])(23)(),
            'user_id': _0x2c5999['id'],
            'ip': _0x160a9c,
            'type': "login_password",
            'describe': "账号密码登录"
          });
        } else {
          _0x3609f5["status"](406)["json"]((0, utils_1["httpBody"])(-1, "数据异常"));

          return;
        }
      }
    }
  }

  const _0x5d3ff8 = await (0, utils_1['generateToken'])(_0x2c5999),
        _0x128786 = (await redis_1["default"]["select"](1)["get"]('user:' + _0x2273c2)) || '';

  if (_0x128786) {
    await redis_1["default"]["select"](1)['del']('token:' + _0x128786);
    await redis_1['default']['select'](1)['del']("user:" + _0x2273c2);
  }

  await redis_1["default"]["select"](1)['setex']("token:" + _0x5d3ff8, JSON['stringify'](_0x2c5999), 2592000);
  await redis_1["default"]["select"](1)["setex"]("user:" + _0x2273c2, _0x5d3ff8, 2592000);

  if (_0x175c98) {
    const _0x12dc6b = new Date();

    _0x12dc6b["setHours"](0, 0, 0, 0);

    const _0x30d247 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x12dc6b);

    _0x175c98 = await models_1["signinModel"]['getUserDaySignin'](_0x2c5999['id'], _0x30d247);
  }

  const _0x35929d = {
    'ip': _0x160a9c,
    "user_agent": _0x152eae
  };

  let _0x247ec5 = _0x2c5999?.["invite_code"] || undefined;

  !_0x247ec5 && (_0x247ec5 = _0x59f0a3, _0x35929d["invite_code"] = _0x59f0a3);
  await models_1['userModel']["editUserInfo"](_0x2c5999['id'], _0x35929d);
  const _0x5dc983 = _0x2c5999['id'],
        {
    "invite_count": _0x4f4884
  } = await models_1["inviteRecordModel"]['getUserInviteCount'](_0x5dc983),
        _0x23530d = {
    "user_id": _0x5dc983,
    "status": 1
  };
  const {
    "current_amount": current_amount = 0
  } = await models_1["amountDetailsModel"]["getAmountDetail"](_0x23530d),
        _0x3b68cf = {
    "benefit_id": _0x5dc983
  };
  const {
    "pay_amount": _0x4fdc90
  } = await models_1['cashbackModel']["getUserCashbackAmount"]("pay_amount", _0x3b68cf),
        _0x3117c4 = {
    "benefit_id": _0x5dc983,
    'status': 1
  };
  const {
    "commission_amount": _0x2500e8
  } = await models_1["cashbackModel"]["getUserCashbackAmount"]("commission_amount", _0x3117c4, [new Date("2020-02-20"), new Date()]),
        _0x34b99d = { ..._0x2c5999,
    'ip': _0x160a9c,
    'user_agent': _0x152eae,
    "today_invite_count": _0x4f4884,
    "current_amount": current_amount,
    "subordinate_today_pay_amount": _0x4fdc90,
    "all_commission_amount": _0x2500e8,
    "invite_code": _0x247ec5,
    "is_signin": _0x175c98 ? 1 : 0
  };
  const _0x4be310 = {
    "user_info": _0x34b99d,
    "token": _0x5d3ff8
  };

  _0x3609f5['json']((0, utils_1["httpBody"])(0, _0x4be310, "登录成功"));
});
router["get"]("/user/info", async (_0x337ee8, _0x1b6eb7, _0x532b7d) => {
  const _0x1e9bab = _0x337ee8?.["user_id"];

  if (!_0x1e9bab) {
    _0x1b6eb7["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0xfa9bab = {
    'id': _0x1e9bab
  };

  const _0x2a8e8f = await models_1["userModel"]["getUserInfo"](_0xfa9bab),
        _0x36be51 = new Date();

  _0x36be51["setHours"](0, 0, 0, 0);

  const _0x88e80f = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x36be51),
        _0xcd3d88 = await models_1["signinModel"]["getUserDaySignin"](_0x2a8e8f['id'], _0x88e80f),
        {
    "invite_count": _0x2213c6
  } = await models_1["inviteRecordModel"]["getUserInviteCount"](_0x1e9bab),
        _0x43bc26 = {
    "user_id": _0x1e9bab,
    "status": 1
  };

  const {
    "current_amount": current_amount = 0
  } = await models_1["amountDetailsModel"]["getAmountDetail"](_0x43bc26),
        _0x4e7424 = {
    'benefit_id': _0x1e9bab
  };
  const {
    "pay_amount": _0x5f4619
  } = await models_1["cashbackModel"]["getUserCashbackAmount"]("pay_amount", _0x4e7424),
        _0x46e3d6 = {
    "benefit_id": _0x1e9bab,
    "status": 1
  };
  const {
    "commission_amount": _0x2afefb
  } = await models_1['cashbackModel']["getUserCashbackAmount"]("commission_amount", _0x46e3d6, [new Date("2020-02-20"), new Date()]),
        _0x4bc573 = { ..._0x2a8e8f,
    "today_invite_count": _0x2213c6,
    'current_amount': current_amount,
    "subordinate_today_pay_amount": _0x5f4619,
    "all_commission_amount": _0x2afefb,
    "is_signin": _0xcd3d88 ? 1 : 0
  };

  _0x1b6eb7['status'](200)["json"]((0, utils_1["httpBody"])(0, _0x4bc573));
});
router["get"]("/user/records", async (_0x1ccdd8, _0x22007c, _0x138fb0) => {
  const _0x54cce4 = _0x1ccdd8?.["user_id"];

  if (!_0x54cce4) {
    _0x22007c["status"](500)['json']((0, utils_1["httpBody"])(-1, "用户信息异常"));

    return;
  }

  const _0x3ad065 = {
    "count": 0,
    'rows': []
  };
  let _0x4d2f38 = _0x3ad065;
  const {
    "type": _0x354b47
  } = _0x1ccdd8["query"],
        _0x100133 = {
    'page': _0x1ccdd8['query']["page"],
    "page_size": _0x1ccdd8["query"]["page_size"]
  };
  const {
    "page": _0x739db5,
    "page_size": _0x437226
  } = (0, utils_1["pagingData"])(_0x100133);

  if (_0x354b47 === 'invitation_records') {
    const _0x386ca5 = {
      "page": _0x739db5,
      "page_size": _0x437226
    };
    const _0x5851c7 = {
      "superior_id": _0x54cce4
    };

    const _0x2b18cb = await models_1["inviteRecordModel"]["getInviteRecords"](_0x386ca5, _0x5851c7),
          _0x2a0b2d = { ..._0x2b18cb
    };

    _0x4d2f38 = _0x2a0b2d;
  }

  if (_0x354b47 === "consume_records") {
    const _0x2ab2d6 = {
      'page': _0x739db5,
      "page_size": _0x437226
    };
    const _0x38bc56 = {
      "benefit_id": _0x54cce4
    };

    const _0xa6aaf5 = await models_1['cashbackModel']["getCashback"](_0x2ab2d6, _0x38bc56),
          _0x4dc51f = { ..._0xa6aaf5
    };

    _0x4d2f38 = _0x4dc51f;
  }

  if (_0x354b47 === "withdrawal_records") {
    const _0x14f014 = {
      "page": _0x739db5,
      "page_size": _0x437226
    };
    const _0x2bbd0f = {
      "user_id": _0x54cce4
    };

    const _0x1b58fa = await models_1["withdrawalRecordModel"]["getWithdrawalRecords"](_0x14f014, _0x2bbd0f),
          _0x3cb6c5 = { ..._0x1b58fa
    };

    _0x4d2f38 = _0x3cb6c5;
  }

  _0x22007c['status'](200)["json"]((0, utils_1["httpBody"])(0, _0x4d2f38));
});
router["get"]("/user/messages", async (_0x15598f, _0x1b85a5, _0x5c531a) => {
  const _0x180b99 = _0x15598f?.['user_id'];

  if (!_0x180b99) {
    _0x1b85a5['status'](500)["json"]((0, utils_1["httpBody"])(-1, '用户信息异常'));

    return;
  }

  const _0x37ee95 = await models_1["messageModel"]['getUserMessages'](_0x180b99);

  _0x1b85a5["status"](200)['json']((0, utils_1["httpBody"])(0, _0x37ee95, "会话记录"));
});
router["delete"]("/user/messages", async (_0xe19526, _0x2f53c3, _0xa3e5f9) => {
  const _0x18ae10 = _0xe19526?.["user_id"],
        {
    "parent_message_id": _0x19cbb3
  } = _0xe19526["query"];

  if (!_0x18ae10) {
    _0x2f53c3["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x424032 = {
    "user_id": _0x18ae10,
    "parent_message_id": _0x19cbb3
  };
  await models_1["messageModel"]["updateChats"]((0, utils_1["filterObjectNull"])(_0x424032));

  _0x2f53c3["status"](200)["json"]((0, utils_1["httpBody"])(0, [], "删除会话记录成功"));
});
router["put"]('/user/password', async (_0x22a569, _0x1aa482, _0x40a829) => {
  const {
    "account": _0x414a95,
    "code": _0x47f7b2,
    "password": _0x12f25f
  } = _0x22a569["body"];

  if (!_0x414a95 || !_0x47f7b2 || !_0x12f25f) {
    _0x1aa482['status'](406)['json']((0, utils_1["httpBody"])(-1, '缺少必要参数'));

    return;
  }

  const _0xd882ae = _0x22a569?.["user_id"];

  if (!_0xd882ae) {
    _0x1aa482["status"](500)['json']((0, utils_1['httpBody'])(-1, "服务端错误"));

    return;
  }

  const _0x3268ff = await redis_1['default']["select"](0)["get"]('code:' + _0x414a95);

  if (_0x47f7b2 !== _0x3268ff) {
    _0x1aa482["status"](406)['json']((0, utils_1["httpBody"])(-1, '验证码不正确'));

    return;
  }

  await redis_1['default']['select'](0)["del"]("code:" + _0x414a95);

  const _0x2933e1 = (0, utils_1["getClientIP"])(_0x22a569);

  await models_1["userModel"]["editUserInfo"](_0xd882ae, {
    'password': (0, utils_1["generateMd5"])(_0x12f25f),
    'ip': _0x2933e1
  });
  models_1["actionModel"]["addAction"]({
    'user_id': _0xd882ae,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x2933e1,
    'type': "reset_password",
    'describe': "重置密码密码"
  });

  _0x1aa482['status'](200)["json"]((0, utils_1["httpBody"])(0, "重置密码成功"));
});
router["get"]("/signin/list", async (_0x496e9f, _0x47165a, _0x1e43d9) => {
  const _0x2775ca = _0x496e9f?.['user_id'];

  if (!_0x2775ca) {
    _0x47165a['status'](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x56161b = new Date(),
        _0x4a833b = (0, utils_2['formatTime'])("yyyy-MM-dd HH:mm:ss", new Date(_0x56161b['getFullYear'](), _0x56161b["getMonth"](), 1)),
        _0x1a0965 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", new Date(_0x56161b["getFullYear"](), _0x56161b['getMonth']() + 1, 1)),
        _0x248bc3 = {
    "start_time": _0x4a833b,
    "end_time": _0x1a0965
  };

  const _0x1c0fb1 = await models_1['signinModel']['getUserSigninList'](_0x2775ca, _0x248bc3);

  _0x47165a["status"](200)["json"]((0, utils_1["httpBody"])(0, _0x1c0fb1));
});
router["get"]('/persona', async (_0x348f18, _0xfeda25, _0xed7d6b) => {
  const _0x5538fa = await models_1["personaModel"]["getAllPersona"]();

  _0xfeda25["json"]((0, utils_1['httpBody'])(0, _0x5538fa));
});
router["post"]("/persona", async (_0x25baf6, _0x169e28, _0x286b75) => {
  const _0x44f350 = _0x25baf6?.["user_id"];

  if (!_0x44f350) {
    _0x169e28["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "title": _0x3d972d,
    "context": _0x160a6e,
    "description": _0x56a82e,
    "avatar": _0xb5b5c6
  } = _0x25baf6["body"];

  if (!_0x3d972d || !_0x160a6e || !_0xb5b5c6) {
    _0x169e28["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x2f9bf7 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x5d1f65 = {
    'id': _0x2f9bf7,
    "title": _0x3d972d,
    "description": _0x56a82e,
    "status": 4,
    "user_id": _0x44f350,
    "context": _0x160a6e,
    "avatar": _0xb5b5c6
  };

  const _0x5b2879 = await models_1["personaModel"]["addPersona"]((0, utils_1["filterObjectNull"])(_0x5d1f65));

  _0x169e28['json']((0, utils_1["httpBody"])(0, _0x5b2879));
});
router["post"]("/use_carmi", async (_0x3d9b17, _0xe4baa7, _0x370526) => {
  const _0x4f4d6e = _0x3d9b17?.["user_id"];

  if (!_0x4f4d6e) {
    _0xe4baa7["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "carmi": _0x5818b3
  } = _0x3d9b17["body"],
        _0x54fcd5 = {
    'key': _0x5818b3
  };

  const _0xa182dd = await models_1["carmiModel"]["getCarmiInfo"](_0x54fcd5)['then'](_0x1a5393 => _0x1a5393?.['toJSON']());

  if (!_0xa182dd) {
    _0xe4baa7["status"](400)['json']((0, utils_1["httpBody"])(-1, "卡密不存在"));

    return;
  }

  if (_0xa182dd["user_id"] || Number(_0xa182dd["status"]) === 1) {
    _0xe4baa7["status"](500)["json"]((0, utils_1["httpBody"])(-1, "卡密已被使用"));

    return;
  }

  if (Number(_0xa182dd['status']) === 2) {
    _0xe4baa7["status"](500)['json']((0, utils_1["httpBody"])(-1, "卡密已过期"));

    return;
  }

  const _0x480a2d = new Date()['setHours'](0, 0, 0, 0),
        _0x52178e = Date["parse"](_0xa182dd["end_time"]);

  if (_0xa182dd["end_time"] && _0x52178e < _0x480a2d) {
    _0xe4baa7['status'](500)["json"]((0, utils_1["httpBody"])(-1, "卡密已过期"));

    return;
  }

  const _0x14a361 = (0, utils_1["getClientIP"])(_0x3d9b17),
        _0x22cb22 = {
    "user_id": _0x4f4d6e,
    "status": 1,
    'ip': _0x14a361
  };

  const _0x89b547 = {
    'id': _0xa182dd['id'],
    "key": _0x5818b3
  };

  const _0x5eca22 = await models_1["carmiModel"]["updateCarmiInfo"](_0x22cb22, _0x89b547);

  if (!_0x5eca22[0]) {
    _0xe4baa7['status'](500)["json"]((0, utils_1["httpBody"])(-1, "使用卡密失败，请稍后再试"));

    return;
  }

  await models_1["actionModel"]["addAction"]({
    'user_id': _0x4f4d6e,
    'id': (0, utils_1["generateNowflakeId"])(23)(),
    'ip': _0x14a361,
    'type': "use_carmi",
    'describe': "使用卡密"
  });
  const _0x5655ca = {
    'id': _0x4f4d6e,
    'value': _0xa182dd['value'],
    "level": _0xa182dd["level"],
    'type': _0xa182dd["type"],
    "operate": "increment"
  };
  await models_1["userModel"]["updataUserVIP"](_0x5655ca);

  const _0x258eaf = (0, utils_1["generateNowflakeId"])(1)(),
        _0x388bb9 = {
    '1': "(会员)",
    '2': "(超级会员)",
    'default': "(积分)"
  };

  const _0x5d6348 = _0xa182dd['type'] === "day" ? _0x388bb9[_0xa182dd["level"]] || "(天数)" : "(积分)";

  await models_1["turnoverModel"]["addTurnover"]({
    'id': _0x258eaf,
    'user_id': _0x4f4d6e,
    'describe': "卡密充值 " + _0x5d6348,
    'value': '' + _0xa182dd["value"] + (_0xa182dd["type"] === "day" ? '天' : '积分')
  });

  _0xe4baa7["json"]((0, utils_1["httpBody"])(0, "使用卡密成功"));
});
router['get']("/turnover", async (_0x337b9a, _0x503685, _0x58c948) => {
  const _0x2c18d4 = _0x337b9a?.['user_id'];

  if (!_0x2c18d4) {
    _0x503685["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x63810 = {
    'page': _0x337b9a["query"]["page"],
    "page_size": _0x337b9a["query"]["page_size"]
  };
  const {
    "page": _0x34450e,
    "page_size": _0x50c6d1
  } = (0, utils_1["pagingData"])(_0x63810),
        _0x1930dd = {
    "page": _0x34450e,
    "page_size": _0x50c6d1
  };
  const _0x5794ec = {
    "user_id": _0x2c18d4
  };

  const _0x12864e = await models_1["turnoverModel"]['getUserTurnovers'](_0x1930dd, _0x5794ec);

  _0x503685["json"]((0, utils_1['httpBody'])(0, _0x12864e));
});
router["post"]('/signin', async (_0x5b724a, _0x499d48, _0x4c169c) => {
  const _0x51e003 = _0x5b724a?.["user_id"];

  if (!_0x51e003) {
    _0x499d48["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x5eb825 = new Date();

  _0x5eb825["setHours"](0, 0, 0, 0);

  const _0x25983c = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x5eb825),
        _0x528be0 = await models_1["signinModel"]["getUserDaySignin"](_0x51e003, _0x25983c);

  if (_0x528be0) {
    _0x499d48['status'](500)["json"]((0, utils_1['httpBody'])(-1, "今日已经签到了"));

    return;
  }

  const _0x4f099a = (await models_1["configModel"]["getConfigValue"]("signin_reward")) || 0,
        _0x25c04c = (0, utils_1['getClientIP'])(_0x5b724a),
        _0x2d2e9e = (0, utils_1["generateNowflakeId"])(1)(),
        _0x39f909 = (0, utils_1["generateNowflakeId"])(1)();

  models_1["actionModel"]["addAction"]({
    'user_id': _0x51e003,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x25c04c,
    'type': "signin",
    'describe': '签到'
  });
  const _0x40be51 = {
    'id': _0x2d2e9e,
    "user_id": _0x51e003,
    'ip': _0x25c04c
  };
  await models_1["signinModel"]['addSignin'](_0x40be51);
  await models_1["userModel"]["updataUserVIP"]({
    'id': _0x51e003,
    'value': Number(_0x4f099a),
    'type': "integral",
    'operate': 'increment'
  });
  const _0x570832 = {
    'id': _0x39f909,
    "user_id": _0x51e003,
    "describe": "签到奖励",
    "value": _0x4f099a + '积分'
  };
  await models_1["turnoverModel"]["addTurnover"](_0x570832);

  _0x499d48["json"]((0, utils_1["httpBody"])(0, "签到成功 +" + _0x4f099a + '积分'));
});
router["get"]("/product", async (_0x26c193, _0x2bb602, _0x73a04d) => {
  const _0x34340d = {
    'page': _0x26c193["query"]["page"],
    "page_size": 1000
  };
  const {
    "page": _0x2d7d24,
    "page_size": _0x491863
  } = (0, utils_1['pagingData'])(_0x34340d),
        _0xf30c2d = {
    "page": _0x2d7d24,
    'page_size': _0x491863
  };
  const _0x41e9c7 = {
    "status": 1
  };

  const _0x35bf52 = await models_1["productModel"]["getProducts"](_0xf30c2d, _0x41e9c7),
        _0x485512 = await models_1["paymentModel"]["getPaymentTypes"](),
        _0x38a030 = _0x35bf52["rows"]["sort"]((_0x44de48, _0x3dca6c) => {
    return _0x44de48["sort"] - _0x3dca6c["sort"];
  }),
        _0x5c574f = {
    'products': _0x38a030,
    'pay_types': _0x485512
  };

  _0x2bb602["json"]((0, utils_1["httpBody"])(0, _0x5c574f));
});
router['post']('/user/withdrawal', async (_0x57c5e2, _0xd9de1b, _0x199ef8) => {
  const _0x21b53d = _0x57c5e2?.["user_id"];

  if (!_0x21b53d) {
    _0xd9de1b["status"](500)["json"]((0, utils_1["httpBody"])(-1, "用户信息异常"));

    return;
  }

  const _0x54518e = {
    'user_id': _0x21b53d,
    'status': 3
  };

  const _0x9875f8 = await models_1['withdrawalRecordModel']["getWithdrawalRecord"](_0x54518e);

  if (_0x9875f8) {
    _0xd9de1b["status"](500)["json"]((0, utils_1["httpBody"])(-1, "已提交提现申请，请耐心等待"));

    return;
  }

  const _0xed8633 = _0x57c5e2["headers"]["user-agent"] || '',
        _0x30458d = (0, utils_1["getClientIP"])(_0x57c5e2),
        _0x534b1f = {
    "user_id": _0x21b53d,
    "status": 1
  };

  const _0x29edae = await models_1['amountDetailsModel']["getAmountDetail"](_0x534b1f);

  if (!_0x29edae || !_0x29edae?.['current_amount'] || _0x29edae?.["current_amount"] <= 0) {
    _0xd9de1b['status'](500)['json']((0, utils_1["httpBody"])(-1, '账户不存在或余额不足'));

    return;
  }

  const _0x471d66 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x5a10ed = (0, utils_1["generateNowflakeId"])(1)(),
        _0x1a4a30 = {
    'id': _0x5a10ed,
    "status": 1,
    "user_id": _0x21b53d,
    "type": "withdrawal",
    "correlation_id": _0x471d66,
    "operate_amount": _0x29edae?.["current_amount"],
    "current_amount": 0,
    "remarks": "申请提现",
    "original_amount": _0x29edae?.["original_amount"]
  };

  await models_1["amountDetailsModel"]['addAmountDetails'](_0x1a4a30);
  const {
    "name": _0x3f91d0,
    "account": _0x448656,
    "contact": _0x39a7f5,
    "message": _0xd8b4fb,
    "type": _0x47321d
  } = _0x57c5e2["body"],
        _0x4bf547 = {
    'id': _0x471d66,
    "user_id": _0x21b53d,
    "name": _0x3f91d0,
    "account": _0x448656,
    "contact": _0x39a7f5,
    "message": _0xd8b4fb,
    "type": _0x47321d,
    "status": 3,
    'remarks': "等待审核",
    "amount": _0x29edae?.["current_amount"],
    'ip': _0x30458d,
    "user_agent": _0xed8633
  };
  await models_1["withdrawalRecordModel"]["addWithdrawalRecord"](_0x4bf547);

  _0xd9de1b["status"](200)["json"]((0, utils_1["httpBody"])(0, "申请提现成功"));
});
router["post"]('/pay/precreate', async (_0x6ab7fa, _0x57db9b, _0x5725a6) => {
  const _0x24395a = _0x6ab7fa?.["user_id"];

  if (!_0x24395a) {
    _0x57db9b["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "quantity": quantity = 1,
    "pay_type": _0x21fbcd,
    "product_id": _0x31f35e
  } = _0x6ab7fa['body'];

  if (!_0x21fbcd || !_0x31f35e) {
    _0x57db9b['status'](406)["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x2e3afc = await models_1["productModel"]['getProduct'](_0x31f35e);

  if (!_0x2e3afc) {
    _0x57db9b["status"](406)["json"]((0, utils_1["httpBody"])(-1, "商品不存在"));

    return;
  }

  const _0x1e77b7 = await models_1["paymentModel"]["getOnePayment"](_0x21fbcd);

  if (!_0x1e77b7) {
    _0x57db9b["status"](406)["json"]((0, utils_1["httpBody"])(-1, "支付信息未配置"));

    return;
  }

  const _0x2993a5 = _0x6ab7fa['headers']["user-agent"] || '',
        _0x2709d0 = (0, utils_1["getBrowserType"])(_0x2993a5),
        _0x4977f9 = (0, utils_1['generateNowflakeId'])(1)(),
        _0x3e74d9 = {
    'channel': _0x1e77b7["channel"],
    "order_id": _0x4977f9,
    "pay_url": '',
    "pay_type": _0x21fbcd
  };

  const _0x5e761d = (0, utils_1["getClientIP"])(_0x6ab7fa),
        _0x45d5d3 = "https://" + _0x6ab7fa["get"]("host")?.["split"](':')[0] + "/api/pay/notify?channel=" + _0x1e77b7["channel"],
        _0x93379 = _0x2e3afc["price"] / 100,
        _0x5efc35 = JSON["parse"](_0x1e77b7["params"]),
        _0x446ba5 = {
    "order_id": _0x4977f9,
    'product_id': _0x31f35e,
    "user_id": _0x24395a,
    "payment_id": _0x1e77b7['id']
  };

  const _0x4a60d2 = JSON["stringify"](_0x446ba5);

  models_1["actionModel"]["addAction"]({
    'user_id': _0x24395a,
    'id': (0, utils_1["generateNowflakeId"])(23)(),
    'ip': _0x5e761d,
    'type': "pay_order",
    'describe': "创建支付订单"
  });

  if (_0x1e77b7["channel"] === "alipay") {
    const _0x18f3ff = {
      "config": _0x5efc35,
      'notify_url': _0x45d5d3,
      "out_trade_no": _0x4977f9,
      "total_amount": _0x93379,
      "subject": _0x2e3afc["title"],
      'body': _0x4a60d2,
      "goods_detail": {}
    };
    _0x18f3ff["goods_detail"]['goods_id'] = _0x2e3afc['id'];
    _0x18f3ff["goods_detail"]['goods_name'] = _0x2e3afc["title"];
    _0x18f3ff["goods_detail"]["price"] = _0x93379;
    _0x18f3ff["goods_detail"]['quantity'] = quantity;

    const _0xed49ac = await pay_1['alipay']["precreate"](_0x18f3ff);

    if (_0xed49ac["code"]) {
      _0x57db9b['status'](500)["json"]((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x3e74d9["order_id"] = _0xed49ac["outTradeNo"];
    _0x3e74d9["pay_url"] = _0xed49ac["qrCode"];
  }

  if (_0x1e77b7["channel"] === "yipay") {
    const _0x5e6463 = {
      "api": _0x5efc35['api'],
      "key": _0x5efc35["key"]
    };

    const _0x3f8aa9 = await pay_1["yipay"]['precreate'](_0x5e6463, {
      'pid': Number(_0x5efc35['pid']),
      'return_url': _0x5efc35?.["return_url"]
    }, {
      'type': _0x21fbcd,
      'out_trade_no': _0x4977f9,
      'notify_url': _0x45d5d3,
      'name': _0x2e3afc["title"],
      'money': _0x93379,
      'clientip': _0x5e761d,
      'device': _0x2709d0,
      'param': encodeURIComponent(_0x4a60d2)
    });

    if (_0x3f8aa9["code"]) {
      _0x57db9b['status'](500)["json"]((0, utils_1["httpBody"])(-1, "支付错误：" + _0x3f8aa9["msg"]));

      return;
    }

    _0x3e74d9['pay_url'] = _0x3f8aa9["pay_url"];
  }

  if (_0x1e77b7["channel"] === "jspay") {
    const _0x5923e0 = {
      'api': _0x5efc35["api"],
      "key": _0x5efc35['key']
    };
    const _0x40411d = {
      "mchid": _0x5efc35["mchid"],
      "total_fee": _0x93379 * 100,
      "out_trade_no": _0x4977f9,
      'body': _0x2e3afc["title"],
      "notify_url": _0x45d5d3,
      "type": _0x21fbcd,
      "attach": _0x4a60d2
    };

    const _0x4c39eb = await pay_1['jspay']['precreate'](_0x5923e0, _0x40411d);

    if (_0x4c39eb['code']) {
      _0x57db9b["status"](500)['json']((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x3e74d9["pay_url"] = _0x4c39eb["qrcode"];
  }

  if (_0x1e77b7['channel'] === "hpjpay") {
    const _0x1c3ca9 = {
      'api': _0x5efc35["api"],
      "key": _0x5efc35["key"]
    };

    const _0x221cdf = await pay_1["hpjpay"]['precreate'](_0x1c3ca9, {
      'version': "1.1",
      'appid': _0x5efc35["appid"],
      'total_fee': _0x93379,
      'trade_order_id': _0x4977f9,
      'title': _0x2e3afc["title"],
      'notify_url': _0x45d5d3,
      'type': _0x21fbcd === "wxpay" ? "WAP" : _0x21fbcd,
      'attach': _0x4a60d2,
      'return_url': _0x2e3afc?.['return_url'],
      'nonce_str': (0, utils_1['generateUUID'])() + Date["now"](),
      'time': Date["now"](),
      'wap_url': _0x2e3afc?.["return_url"] || "ChatGptAI",
      'wap_name': 'ChatGptAI'
    });

    if (_0x221cdf["code"]) {
      _0x57db9b['status'](500)["json"]((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x3e74d9['pay_url'] = _0x221cdf["pay_url"];
  }

  await models_1["orderModel"]["addOrder"]({
    'id': _0x4977f9,
    'pay_type': _0x21fbcd,
    'product_title': _0x2e3afc["title"],
    'product_id': _0x31f35e,
    'trade_status': "WAIT_BUYER_PAY",
    'user_id': _0x24395a,
    'product_info': JSON["stringify"](_0x2e3afc),
    'channel': _0x1e77b7['channel'],
    'payment_id': _0x1e77b7['id'],
    'payment_info': JSON["stringify"](_0x1e77b7),
    'money': _0x93379,
    'params': _0x4a60d2,
    'ip': _0x5e761d,
    'pay_url': _0x3e74d9['pay_url']
  });

  _0x57db9b["json"]((0, utils_1["httpBody"])(0, _0x3e74d9));
});
router["all"]("/pay/notify", async (_0x477ee8, _0x55a903, _0x5730a8) => {
  const _0x100fde = async (_0xed8f38, _0xea6275, _0x796100) => {
    const _0x40689c = await models_1["paymentModel"]["getPaymentInfo"](_0xed8f38);

    if (!_0x40689c) {
      return false;
    }

    const _0x3379ca = JSON['parse'](_0x40689c["params"]);

    if (_0x796100 === "alipay") {
      const _0x3ba821 = await pay_1["alipay"]["checkNotifySign"](_0x3379ca, _0xea6275);

      if (!_0x3ba821) {
        return false;
      }
    }

    if (_0x796100 === "yipay") {
      const _0x5bee57 = await pay_1['yipay']['checkNotifySign'](_0xea6275, _0x3379ca["key"]);

      if (!_0x5bee57) {
        return false;
      }
    }

    if (_0x796100 === "jspay") {
      const _0x472724 = await pay_1["jspay"]["checkNotifySign"](_0xea6275, _0x3379ca["key"]);

      if (!_0x472724) {
        return false;
      }
    }

    if (_0x796100 === "hpjpay") {
      const _0x1b88a8 = await pay_1["hpjpay"]["checkNotifySign"](_0xea6275, _0x3379ca["key"]);

      if (!_0x1b88a8) {
        return false;
      }
    }

    return true;
  },
        _0x1e87cc = async ({
    "order_id": _0x59db80,
    "trade_status": _0x3a5665,
    "trade_no": _0x46a612,
    "notify_info": _0x199e47,
    "user_id": _0x7b7137,
    "product_id": _0x5caf1f
  }) => {
    const _0x1c4f53 = await models_1["userModel"]['addUserProductQuota'](_0x7b7137, _0x5caf1f);

    if (_0x1c4f53['code']) {
      return false;
    }

    const _0x2a4fa8 = {
      'id': _0x59db80,
      "trade_status": _0x3a5665,
      "trade_no": _0x46a612,
      'notify_info': _0x199e47
    };
    await models_1["orderModel"]["editOrder"](_0x2a4fa8);

    const _0x170a39 = (0, utils_1["generateNowflakeId"])(1)(),
          _0x2070e9 = {
      'id': _0x170a39,
      "user_id": _0x7b7137,
      'describe': "购买-" + _0x1c4f53["data"]?.["title"],
      'value': _0x1c4f53["data"]?.['value']
    };

    await models_1["turnoverModel"]['addTurnover'](_0x2070e9);
    const _0x3f4e99 = {
      "user_id": _0x7b7137,
      "order_id": _0x59db80,
      "trade_no": _0x46a612,
      "product_id": _0x5caf1f
    };
    await queue_1["addCashbackQueue"]["addTask"](_0x3f4e99);
    return true;
  };

  try {
    if (_0x477ee8["body"]?.["channel"] && _0x477ee8['body']?.["channel"] === "alipay") {
      const {
        "body": _0x2be45b,
        "out_trade_no": _0x154fe4,
        "trade_status": _0x5ed888,
        "trade_no": _0x28ceef
      } = _0x477ee8["body"],
            _0x450697 = await models_1["orderModel"]["getOrderInfo"](_0x154fe4);

      if (!_0x450697 || _0x450697["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x55a903['status'](404)['json']("fail");

        return;
      }

      const {
        "payment_id": _0x2a9f54,
        "user_id": _0x4623ee,
        "product_id": _0x386680
      } = JSON["parse"](_0x2be45b),
            _0x171c4c = await _0x100fde(_0x2a9f54, _0x477ee8["body"], _0x477ee8["body"]?.["channel"]);

      if (!_0x171c4c) {
        _0x55a903["status"](404)['json']("fail");

        return;
      }

      const _0x4cb904 = await _0x1e87cc({
        'order_id': _0x154fe4,
        'trade_status': _0x5ed888,
        'trade_no': _0x28ceef,
        'notify_info': JSON["stringify"](_0x477ee8["body"]),
        'user_id': _0x4623ee,
        'product_id': _0x386680
      });

      if (!_0x4cb904) {
        _0x55a903['status'](404)["json"]("fail");

        return;
      }
    }

    if (_0x477ee8["query"]?.['channel'] && _0x477ee8["query"]?.["channel"] === "yipay") {
      const {
        "out_trade_no": _0x1aa057,
        "trade_status": _0x145fda,
        "trade_no": _0x5e1258
      } = _0x477ee8['query'],
            _0x4901d2 = await models_1['orderModel']["getOrderInfo"](_0x1aa057);

      if (!_0x4901d2 || _0x4901d2["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x1caccc,
        "user_id": _0x252e9a,
        "product_id": _0x2c2d25
      } = JSON["parse"](decodeURIComponent(_0x477ee8["query"]?.["param"])),
            _0x25568a = await _0x100fde(_0x1caccc, _0x477ee8["query"], _0x477ee8["query"]?.["channel"]);

      if (!_0x25568a) {
        _0x55a903['status'](404)["json"]("fail");

        return;
      }

      const _0x313fd8 = await _0x1e87cc({
        'order_id': _0x1aa057,
        'trade_status': _0x145fda,
        'trade_no': _0x5e1258,
        'notify_info': JSON["stringify"](_0x477ee8["query"]),
        'user_id': _0x252e9a,
        'product_id': _0x2c2d25
      });

      if (!_0x313fd8) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }
    }

    if (_0x477ee8['query']?.["channel"] && _0x477ee8["query"]?.["channel"] === "jspay") {
      const {
        "attach": _0x45984e,
        "return_code": _0x427960,
        "out_trade_no": _0x29037c,
        "trade_no": _0xbcbf38
      } = _0x477ee8["body"];

      if (Number(_0x427960) !== 1) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const _0x38c6fb = await models_1["orderModel"]["getOrderInfo"](_0x29037c);

      if (!_0x38c6fb || _0x38c6fb["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x454a6a,
        "user_id": _0x811269,
        "product_id": _0x360ce7
      } = JSON["parse"](_0x45984e),
            _0x4b1177 = await _0x100fde(_0x454a6a, _0x477ee8["body"], _0x477ee8["query"]?.['channel']);

      if (!_0x4b1177) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const _0x46c677 = await _0x1e87cc({
        'order_id': _0x29037c,
        'trade_status': Number(_0x427960) === 1 ? "TRADE_SUCCESS" : "WAIT_BUYER_PAY",
        'trade_no': _0xbcbf38,
        'notify_info': JSON['stringify'](_0x477ee8['body']),
        'user_id': _0x811269,
        'product_id': _0x360ce7
      });

      if (!_0x46c677) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }
    }

    if (_0x477ee8['query']?.["channel"] && _0x477ee8['query']?.["channel"] === "hpjpay") {
      const {
        "attach": _0x26384a,
        "status": _0x5e5398,
        "trade_order_id": _0x56ccb9,
        "open_order_id": _0x4c162a
      } = _0x477ee8['body'];

      if (_0x5e5398 !== 'OD') {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const _0x1bf569 = await models_1["orderModel"]["getOrderInfo"](_0x56ccb9);

      if (!_0x1bf569 || _0x1bf569["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x5858b2,
        "user_id": _0x69797f,
        "product_id": _0x44544d
      } = JSON["parse"](_0x26384a),
            _0x1ec339 = await _0x100fde(_0x5858b2, _0x477ee8["body"], _0x477ee8["query"]?.["channel"]);

      if (!_0x1ec339) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }

      const _0x5686c4 = await _0x1e87cc({
        'order_id': _0x56ccb9,
        'trade_status': _0x5e5398 !== 'OD' ? "TRADE_SUCCESS" : "WAIT_BUYER_PAY",
        'trade_no': _0x4c162a,
        'notify_info': JSON["stringify"](_0x477ee8["body"]),
        'user_id': _0x69797f,
        'product_id': _0x44544d
      });

      if (!_0x5686c4) {
        _0x55a903["status"](404)["json"]("fail");

        return;
      }
    }
  } catch (_0x4ea7e2) {
    console['log'](_0x4ea7e2);

    _0x55a903['status'](404)["json"]("fail");

    return;
  }

  _0x55a903["json"]("success");
});
exports["default"] = router;