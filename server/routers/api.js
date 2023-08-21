'use strict';

const a107_0x5d81e5 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a107_0x5d81e5);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      multer_1 = tslib_1["__importDefault"](require("multer")),
      redis_1 = tslib_1['__importDefault'](require("../helpers/redis")),
      models_1 = require("../models"),
      mailer_1 = require("../helpers/mailer"),
      draw_1 = tslib_1["__importDefault"](require("../helpers/draw")),
      gpt_tokens_1 = require("gpt-tokens"),
      utils_1 = require("../utils"),
      utils_2 = require("../utils"),
      stream_1 = require("stream"),
      node_fetch_1 = tslib_1["__importDefault"](require('node-fetch')),
      queue_1 = require('../helpers/queue'),
      pay_1 = require('../helpers/pay'),
      textModeration_1 = tslib_1["__importDefault"](require('../helpers/textModeration')),
      emailTemplate_1 = tslib_1["__importDefault"](require("../helpers/mailer/emailTemplate")),
      sms_1 = require('../helpers/sms'),
      multerStorage = (0, multer_1["default"])({
  'storage': multer_1["default"]["memoryStorage"]()
}),
      router = express_1["default"]["Router"]();

router["get"]("/config", async (_0x212d45, _0x5485b5, _0x1d40b7) => {
  const _0x38b43e = await models_1["configModel"]["getConfigValue"]("shop_introduce"),
        _0x1efb9f = await models_1["configModel"]["getConfigValue"]("user_introduce"),
        _0x8f8011 = await models_1["configModel"]["getConfigValue"]("invite_introduce"),
        _0x5b1532 = await models_1["configModel"]["getConfigValue"]("website_title"),
        _0x19cdec = await models_1["configModel"]["getConfigValue"]("website_description"),
        _0x1318ed = await models_1["configModel"]['getConfigValue']("website_keywords"),
        _0x43eef = await models_1["configModel"]["getConfigValue"]("website_logo"),
        _0x38d05b = await models_1["configModel"]["getConfigValue"]('website_footer'),
        _0x2a75bb = {
    'page': 0,
    'page_size': 1000
  };

  const _0x27dac4 = {
    'status': 1
  };

  const _0x1952af = await models_1["notificationModel"]["getNotification"](_0x2a75bb, _0x27dac4),
        _0x3f9759 = _0x1952af['rows']["sort"]((_0x688b61, _0x3f66d1) => {
    return _0x688b61["sort"] - _0x3f66d1["sort"];
  }),
        _0x26cda1 = await models_1["personaModel"]["getRandomPersonas"](),
        _0x4c88b8 = {
    "shop_introduce": _0x38b43e,
    "user_introduce": _0x1efb9f,
    "notifications": _0x3f9759,
    "website_title": _0x5b1532,
    "website_description": _0x19cdec,
    "website_keywords": _0x1318ed,
    'website_logo': _0x43eef,
    "website_footer": _0x38d05b,
    "invite_introduce": _0x8f8011,
    "random_personas": _0x26cda1
  };

  _0x5485b5['json']((0, utils_1["httpBody"])(0, _0x4c88b8));
});
router["get"]("/send_sms", async (_0x407268, _0x143a57, _0x45d692) => {
  const _0x520474 = Array["isArray"](_0x407268['query']["source"]) ? String(_0x407268["query"]["source"][0]) : String(_0x407268["query"]["source"]),
        _0x1377de = (0, utils_1["getClientIP"])(_0x407268),
        _0x1e46d9 = async (_0xc3b772, _0x1ec54b = "code", _0x5c75c5 = 6) => {
    const _0x4b77a2 = "limit:" + _0x1ec54b + ':' + _0xc3b772,
          _0xfe5c0c = await redis_1['default']['select']()['get'](_0x4b77a2),
          _0xea0236 = (0, utils_1['distanceTime'])() || 1;

    if (_0xfe5c0c && Number(_0xfe5c0c) >= _0x5c75c5) {
      redis_1["default"]["select"]()["expire"](_0x4b77a2, 86400);
      return (0, utils_1["httpBody"])(-1, "请求次数过多，请稍后再试！");
    }

    if (_0xfe5c0c && Number(_0xfe5c0c) < _0x5c75c5) {
      const _0x47a21a = Number(_0xfe5c0c) + 1;

      redis_1["default"]["select"]()["setex"](_0x4b77a2, _0x47a21a, _0xea0236);
      return (0, utils_1["httpBody"])(0);
    }

    redis_1["default"]["select"]()['setex'](_0x4b77a2, 1, _0xea0236);
    return (0, utils_1["httpBody"])(0);
  },
        _0x436f1f = await _0x1e46d9(_0x1377de);

  if (_0x436f1f["code"]) {
    _0x143a57["json"](_0x436f1f);

    return;
  }

  const _0x3ffb57 = await (0, utils_1["generateCode"])();

  let _0x36b0d9;

  const _0x1c9008 = /^1[3456789]\d{9}$/;

  if (_0x1c9008["test"](_0x520474)) {
    let _0x3bdca0 = {};

    try {
      const _0x267045 = (await models_1["configModel"]["getConfigValue"]("sms")) || '';

      _0x3bdca0 = JSON["parse"](_0x267045);
    } catch (_0x53a395) {
      _0x143a57["json"]((0, utils_1["httpBody"])(-1, "短信服务配置错误"));

      return;
    }

    const {
      "sign": _0x5688f9,
      "template": _0x368c84,
      "password": _0x56a125,
      "user": _0x2afb19
    } = _0x3bdca0,
          _0x126ca1 = _0x368c84["replace"]("{code}", _0x3ffb57)["replace"]("{time}", '10'),
          _0x252c77 = {
      "user": _0x2afb19,
      'password': _0x56a125,
      "content": '【' + _0x5688f9 + '】' + _0x126ca1,
      "phone": _0x520474
    };

    _0x36b0d9 = await (0, sms_1['sendSms'])(_0x252c77);
  }

  const _0xb806d4 = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (_0xb806d4['test'](_0x520474)) {
    let _0x42444d = {};

    try {
      const _0x5012c8 = (await models_1['configModel']["getConfigValue"]("email")) || '';

      _0x42444d = JSON['parse'](_0x5012c8);
    } catch (_0x410af5) {
      _0x143a57['json']((0, utils_1["httpBody"])(-1, "邮件服务配置错误"));

      return;
    }

    const {
      "host": _0x5c78cd,
      "port": _0x34e484,
      "user": _0x3da510,
      "pass": _0x1ba9d7,
      "subject": _0x2882f3,
      "from_title": _0x3312f2
    } = _0x42444d,
          _0x2f4618 = {
      'user': _0x3da510,
      "pass": _0x1ba9d7
    };
    const _0x20b5c5 = {
      "host": _0x5c78cd,
      'port': _0x34e484,
      "auth": _0x2f4618
    };
    _0x36b0d9 = await (0, mailer_1['sendMail'])({
      'to': _0x520474,
      'body': emailTemplate_1['default']['code'](_0x3ffb57, _0x3312f2),
      'subject': _0x2882f3,
      'fromTitle': _0x3312f2,
      'options': _0x20b5c5
    });
  }

  if (_0x36b0d9?.["code"]) {
    _0x143a57['json'](_0x36b0d9);

    return;
  }

  await redis_1["default"]["select"](0)["setex"]("code:" + _0x520474, _0x3ffb57, 600);

  _0x143a57["json"]((0, utils_1["httpBody"])(0, "发送成功"));
});
router["post"]('/login', async (_0x3b642d, _0x4c19d6, _0x2fded3) => {
  const {
    "account": _0x58757c,
    "code": _0x4ad278,
    "password": _0x1b0236,
    "invite_code": _0x5118b8
  } = _0x3b642d["body"],
        _0x3ddc19 = _0x3b642d["headers"]["user-agent"] || '',
        _0x40b2ca = (0, utils_1["getClientIP"])(_0x3b642d);

  if (!_0x58757c || !_0x4ad278 && !_0x1b0236) {
    _0x4c19d6["status"](406)["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  let _0x1d2033 = true;
  const _0x324418 = {
    "account": _0x58757c
  };

  let _0x17cab6 = await models_1["userModel"]['getUserInfo'](_0x324418);

  const _0x21090c = (await models_1["configModel"]["getConfigValue"]("invite_reward")) || 0,
        _0x49166f = {
    "invite_code": _0x5118b8
  };

  const _0x46d53c = await models_1["userModel"]["getUserInfo"](_0x49166f),
        _0x493390 = (0, utils_1['generateNowflakeId'])(1)(),
        _0x2cc806 = utils_1['generateCrc']["crc32"](_0x493390 + '_' + Date["now"]());

  if (_0x58757c && _0x4ad278 && _0x1b0236 && !_0x17cab6) {
    try {
      const _0x518d79 = new Date(),
            _0x48815a = new Date(_0x518d79["getTime"]() - 86400000),
            _0x41909a = (await models_1["configModel"]["getConfigValue"]("register_reward")) || 0;

      _0x17cab6 = await models_1["userModel"]["addUserInfo"]((0, utils_1["filterObjectNull"])({
        'id': _0x493390,
        'account': _0x58757c,
        'ip': _0x40b2ca,
        'nickname': "Chat用户",
        'avatar': "https://u1.dl0.cn/icon/1682426702646avatarf3db669b024fad66-1930929abe2847093.png",
        'status': 1,
        'role': "user",
        'password': (0, utils_1["generateMd5"])(_0x1b0236),
        'integral': Number(_0x41909a),
        'vip_expire_time': (0, utils_2['formatTime'])("yyyy-MM-dd HH:mm:ss", _0x48815a),
        'svip_expire_time': (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0x48815a),
        'invite_code': _0x2cc806,
        'user_agent': _0x3ddc19,
        'superior_id': _0x46d53c ? _0x46d53c['id'] : null
      }))["then"](_0x471ca8 => {
        const _0x2cb149 = (0, utils_1["generateNowflakeId"])(1)(),
              _0x5dee0c = {
          'id': _0x2cb149,
          "user_id": _0x493390,
          "describe": "注册奖励",
          "value": _0x41909a + '积分'
        };

        models_1["turnoverModel"]["addTurnover"](_0x5dee0c);

        if (_0x5118b8 && _0x46d53c && _0x46d53c['id']) {
          const _0x5d0f5e = (0, utils_1["generateNowflakeId"])(2)(),
                _0x590c35 = {
            'id': _0x5d0f5e,
            "user_id": _0x493390,
            'invite_code': _0x5118b8,
            'superior_id': _0x46d53c['id'],
            "reward": _0x21090c,
            'reward_type': "integral",
            'status': 3,
            "remark": "等待审核",
            'ip': _0x40b2ca,
            'user_agent': _0x3ddc19
          };

          models_1["inviteRecordModel"]["addInviteRecord"](_0x590c35);
        }

        return _0x471ca8;
      });
      _0x1d2033 = false;
      models_1["actionModel"]["addAction"]({
        'id': (0, utils_1["generateNowflakeId"])(23)(),
        'user_id': _0x17cab6['id'],
        'ip': _0x40b2ca,
        'type': "register",
        'describe': "注册账号"
      });
    } catch (_0x34ceaa) {
      console['log'](_0x34ceaa);

      _0x4c19d6['status'](500)["json"]((0, utils_1["httpBody"])(-1, "服务器错误"));

      return;
    }
  } else {
    if (!_0x17cab6) {
      _0x4c19d6["status"](406)["json"]((0, utils_1['httpBody'])(-1, "用户不存在，请先注册账号"));

      return;
    } else {
      if (_0x58757c && _0x4ad278) {
        const _0x3c4edc = await redis_1["default"]["select"](0)["get"]("code:" + _0x58757c);

        if (!_0x3c4edc) {
          _0x4c19d6['status'](406)["json"]((0, utils_1["httpBody"])(-1, "请先发送验证码"));

          return;
        }

        if (_0x4ad278 !== _0x3c4edc) {
          _0x4c19d6["status"](406)['json']((0, utils_1["httpBody"])(-1, "验证码不正确"));

          return;
        }

        await redis_1['default']["select"](0)['del']("code:" + _0x58757c);
        models_1['actionModel']["addAction"]({
          'id': (0, utils_1["generateNowflakeId"])(23)(),
          'user_id': _0x17cab6['id'],
          'ip': _0x40b2ca,
          'type': "login_code",
          'describe': "邮箱验证码登录"
        });
      } else {
        if (_0x58757c && _0x1b0236) {
          const _0x545bb7 = (0, utils_1['generateMd5'])(_0x1b0236);

          if (_0x17cab6["password"] !== _0x545bb7) {
            _0x4c19d6["status"](406)['json']((0, utils_1["httpBody"])(-1, "密码不正确"));

            return;
          }

          models_1["actionModel"]['addAction']({
            'id': (0, utils_1["generateNowflakeId"])(23)(),
            'user_id': _0x17cab6['id'],
            'ip': _0x40b2ca,
            'type': "login_password",
            'describe': "账号密码登录"
          });
        }
      }
    }
  }

  const _0x30ca13 = await (0, utils_1["generateToken"])(_0x17cab6),
        _0x52c5c6 = (await redis_1["default"]["select"](1)["get"]("user:" + _0x58757c)) || '';

  if (_0x52c5c6) {
    await redis_1["default"]["select"](1)["del"]('token:' + _0x52c5c6);
    await redis_1["default"]["select"](1)["del"]('user:' + _0x58757c);
  }

  await redis_1["default"]["select"](1)["setex"]("token:" + _0x30ca13, JSON["stringify"](_0x17cab6), 2592000);
  await redis_1["default"]["select"](1)["setex"]("user:" + _0x58757c, _0x30ca13, 2592000);

  if (_0x1d2033) {
    const _0xef04ee = new Date();

    _0xef04ee["setHours"](0, 0, 0, 0);

    const _0x3e962c = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0xef04ee);

    _0x1d2033 = await models_1['signinModel']["getUserDaySignin"](_0x17cab6['id'], _0x3e962c);
  }

  const _0x172057 = {
    'ip': _0x40b2ca,
    "user_agent": _0x3ddc19
  };

  let _0x505de6 = _0x17cab6?.["invite_code"] || undefined;

  if (!_0x505de6) {
    _0x505de6 = _0x2cc806;
    _0x172057["invite_code"] = _0x2cc806;
  }

  await models_1["userModel"]["editUserInfo"](_0x17cab6['id'], _0x172057);
  const _0x532abf = _0x17cab6['id'],
        {
    "invite_count": _0x369d51
  } = await models_1["inviteRecordModel"]["getUserInviteCount"](_0x532abf),
        _0x3a6d8a = {
    "user_id": _0x532abf,
    "status": 1
  };
  const {
    "current_amount": current_amount = 0
  } = await models_1["amountDetailsModel"]["getAmountDetail"](_0x3a6d8a),
        _0xca8f77 = {
    'benefit_id': _0x532abf
  };
  const {
    "pay_amount": _0x60f4c0
  } = await models_1["cashbackModel"]['getUserCashbackAmount']("pay_amount", _0xca8f77),
        _0xbc831d = {
    'benefit_id': _0x532abf,
    "status": 1
  };
  const {
    "commission_amount": _0x14b03d
  } = await models_1['cashbackModel']["getUserCashbackAmount"]("commission_amount", _0xbc831d, [new Date("2020-02-20"), new Date()]),
        _0x44e601 = { ..._0x17cab6,
    'ip': _0x40b2ca,
    "user_agent": _0x3ddc19,
    "today_invite_count": _0x369d51,
    "current_amount": current_amount,
    "subordinate_today_pay_amount": _0x60f4c0,
    "all_commission_amount": _0x14b03d,
    "invite_code": _0x505de6,
    "is_signin": _0x1d2033 ? 1 : 0
  };
  const _0x4d1aa6 = {
    "user_info": _0x44e601,
    "token": _0x30ca13
  };

  _0x4c19d6["json"]((0, utils_1['httpBody'])(0, _0x4d1aa6, "登录成功"));
});
router["get"]('/user/info', async (_0x35dbec, _0x145714, _0x2475cf) => {
  const _0x515d74 = _0x35dbec?.["user_id"];

  if (!_0x515d74) {
    _0x145714["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x23af36 = {
    'id': _0x515d74
  };

  const _0x5e407f = await models_1["userModel"]["getUserInfo"](_0x23af36),
        _0xead7d4 = new Date();

  _0xead7d4['setHours'](0, 0, 0, 0);

  const _0x400e19 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0xead7d4),
        _0x2d78fa = await models_1["signinModel"]["getUserDaySignin"](_0x5e407f['id'], _0x400e19),
        {
    "invite_count": _0x5f4c7a
  } = await models_1['inviteRecordModel']['getUserInviteCount'](_0x515d74),
        _0x5726ae = {
    "user_id": _0x515d74,
    "status": 1
  };

  const {
    "current_amount": current_amount = 0
  } = await models_1["amountDetailsModel"]["getAmountDetail"](_0x5726ae),
        _0xb40e69 = {
    'benefit_id': _0x515d74
  };
  const {
    "pay_amount": _0x3a8c66
  } = await models_1["cashbackModel"]["getUserCashbackAmount"]("pay_amount", _0xb40e69),
        _0x58acd6 = {
    "benefit_id": _0x515d74,
    'status': 1
  };
  const {
    "commission_amount": _0x3da20c
  } = await models_1["cashbackModel"]['getUserCashbackAmount']("commission_amount", _0x58acd6, [new Date("2020-02-20"), new Date()]),
        _0x4bfdee = { ..._0x5e407f,
    "today_invite_count": _0x5f4c7a,
    "current_amount": current_amount,
    "subordinate_today_pay_amount": _0x3a8c66,
    "all_commission_amount": _0x3da20c,
    "is_signin": _0x2d78fa ? 1 : 0
  };

  _0x145714["status"](200)['json']((0, utils_1['httpBody'])(0, _0x4bfdee));
});
router["get"]("/user/records", async (_0x44e623, _0x4e0a7c, _0x2167d2) => {
  const _0x2f3610 = _0x44e623?.["user_id"];

  if (!_0x2f3610) {
    _0x4e0a7c['status'](500)["json"]((0, utils_1["httpBody"])(-1, "用户信息异常"));

    return;
  }

  const _0x32e06e = {
    "count": 0,
    "rows": []
  };
  let _0x4b9159 = _0x32e06e;
  const {
    "type": _0x5bc932
  } = _0x44e623["query"],
        _0x3ed898 = {
    'page': _0x44e623["query"]["page"],
    "page_size": _0x44e623["query"]["page_size"]
  };
  const {
    "page": _0x158428,
    "page_size": _0x16dc82
  } = (0, utils_1["pagingData"])(_0x3ed898);

  if (_0x5bc932 === 'invitation_records') {
    const _0x1a7c01 = {
      "page": _0x158428,
      'page_size': _0x16dc82
    };
    const _0x4ce277 = {
      "superior_id": _0x2f3610
    };

    const _0x5a30f6 = await models_1["inviteRecordModel"]['getInviteRecords'](_0x1a7c01, _0x4ce277),
          _0xed73f2 = { ..._0x5a30f6
    };

    _0x4b9159 = _0xed73f2;
  }

  if (_0x5bc932 === "consume_records") {
    const _0x17f0f2 = {
      "page": _0x158428,
      'page_size': _0x16dc82
    };
    const _0x4be01b = {
      "benefit_id": _0x2f3610
    };

    const _0x135dff = await models_1['cashbackModel']['getCashback'](_0x17f0f2, _0x4be01b),
          _0x20abcb = { ..._0x135dff
    };

    _0x4b9159 = _0x20abcb;
  }

  if (_0x5bc932 === "withdrawal_records") {
    const _0xc708ed = {
      "page": _0x158428,
      "page_size": _0x16dc82
    };
    const _0x3a0a4d = {
      "user_id": _0x2f3610
    };

    const _0xa6a6a = await models_1["withdrawalRecordModel"]["getWithdrawalRecords"](_0xc708ed, _0x3a0a4d),
          _0x4b10c3 = { ..._0xa6a6a
    };

    _0x4b9159 = _0x4b10c3;
  }

  _0x4e0a7c["status"](200)['json']((0, utils_1["httpBody"])(0, _0x4b9159));
});
router['get']("/user/messages", async (_0x107b5f, _0x17374, _0x24544f) => {
  const _0x30cc66 = _0x107b5f?.["user_id"];

  if (!_0x30cc66) {
    _0x17374["status"](500)["json"]((0, utils_1["httpBody"])(-1, "用户信息异常"));

    return;
  }

  const _0xe23f8a = await models_1['messageModel']['getUserMessages'](_0x30cc66);

  _0x17374["status"](200)["json"]((0, utils_1["httpBody"])(0, _0xe23f8a, "会话记录"));
});
router['delete']("/user/messages", async (_0x559420, _0xd821a5, _0x25cdf6) => {
  const _0x461438 = _0x559420?.["user_id"],
        {
    "parent_message_id": _0x5adc33
  } = _0x559420["query"];

  if (!_0x461438) {
    _0xd821a5["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x1a9afc = {
    "user_id": _0x461438,
    "parent_message_id": _0x5adc33
  };
  await models_1["messageModel"]["updateChats"]((0, utils_1["filterObjectNull"])(_0x1a9afc));

  _0xd821a5["status"](200)["json"]((0, utils_1['httpBody'])(0, [], "删除会话记录成功"));
});
router["post"]("/user/withdrawal", async (_0x5dd54c, _0x28b98b, _0x9f7745) => {
  const _0x2fd2bb = _0x5dd54c?.["user_id"];

  if (!_0x2fd2bb) {
    _0x28b98b['status'](500)["json"]((0, utils_1["httpBody"])(-1, "用户信息异常"));

    return;
  }

  const _0x2b7bb2 = {
    'user_id': _0x2fd2bb,
    "status": 3
  };

  const _0x35e68b = await models_1["withdrawalRecordModel"]["getWithdrawalRecord"](_0x2b7bb2);

  if (_0x35e68b) {
    _0x28b98b["status"](500)['json']((0, utils_1['httpBody'])(-1, "已提交提现申请，请耐心等待"));

    return;
  }

  const _0x562f39 = _0x5dd54c["headers"]["user-agent"] || '',
        _0x58b172 = (0, utils_1['getClientIP'])(_0x5dd54c),
        _0x41f85e = {
    "user_id": _0x2fd2bb,
    "status": 1
  };

  const _0x30d043 = await models_1["amountDetailsModel"]['getAmountDetail'](_0x41f85e);

  if (!_0x30d043 || !_0x30d043?.["current_amount"] || _0x30d043?.["current_amount"] <= 0) {
    _0x28b98b["status"](500)["json"]((0, utils_1["httpBody"])(-1, "账户不存在或余额不足"));

    return;
  }

  const _0x166351 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x27a12b = (0, utils_1['generateNowflakeId'])(1)(),
        _0x4b3b13 = {
    'id': _0x27a12b,
    'status': 1,
    'user_id': _0x2fd2bb,
    "type": "withdrawal",
    "correlation_id": _0x166351,
    'operate_amount': _0x30d043?.["current_amount"],
    "current_amount": 0,
    "remarks": "申请提现",
    "original_amount": _0x30d043?.['original_amount']
  };

  await models_1['amountDetailsModel']['addAmountDetails'](_0x4b3b13);
  const {
    "name": _0x529164,
    "account": _0x40626d,
    "contact": _0x488b37,
    "message": _0x2a918b,
    "type": _0x39f61c
  } = _0x5dd54c["body"],
        _0x55078a = {
    'id': _0x166351,
    'user_id': _0x2fd2bb,
    'name': _0x529164,
    'account': _0x40626d,
    "contact": _0x488b37,
    "message": _0x2a918b,
    "type": _0x39f61c,
    "status": 3,
    'remarks': '等待审核',
    'amount': _0x30d043?.['current_amount'],
    'ip': _0x58b172,
    'user_agent': _0x562f39
  };
  await models_1["withdrawalRecordModel"]["addWithdrawalRecord"](_0x55078a);

  _0x28b98b["status"](200)['json']((0, utils_1["httpBody"])(0, "申请提现成功"));
});
router["put"]("/user/password", async (_0x1ba922, _0xb4c3b9, _0x8d39ce) => {
  const {
    "account": _0x142094,
    "code": _0x34c817,
    "password": _0x41f374
  } = _0x1ba922["body"];

  if (!_0x142094 || !_0x34c817 || !_0x41f374) {
    _0xb4c3b9["status"](406)["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x266f8e = _0x1ba922?.["user_id"];

  if (!_0x266f8e) {
    _0xb4c3b9['status'](500)['json']((0, utils_1['httpBody'])(-1, "服务端错误"));

    return;
  }

  const _0x775be3 = await redis_1["default"]["select"](0)['get']("code:" + _0x142094);

  if (_0x34c817 !== _0x775be3) {
    _0xb4c3b9["status"](406)["json"]((0, utils_1['httpBody'])(-1, "验证码不正确"));

    return;
  }

  await redis_1["default"]["select"](0)["del"]("code:" + _0x142094);

  const _0x15278c = (0, utils_1['getClientIP'])(_0x1ba922);

  await models_1["userModel"]["editUserInfo"](_0x266f8e, {
    'password': (0, utils_1['generateMd5'])(_0x41f374),
    'ip': _0x15278c
  });
  models_1["actionModel"]["addAction"]({
    'user_id': _0x266f8e,
    'id': (0, utils_1["generateNowflakeId"])(23)(),
    'ip': _0x15278c,
    'type': "reset_password",
    'describe': "重置密码密码"
  });

  _0xb4c3b9["status"](200)["json"]((0, utils_1["httpBody"])(0, "重置密码成功"));
});
router["get"]('/signin/list', async (_0x570a66, _0x52f9a4, _0xdf29c5) => {
  const _0x164c54 = _0x570a66?.["user_id"];

  if (!_0x164c54) {
    _0x52f9a4['status'](500)['json']((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x537511 = new Date(),
        _0x4a71d9 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", new Date(_0x537511["getFullYear"](), _0x537511["getMonth"](), 1)),
        _0x220c26 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", new Date(_0x537511['getFullYear'](), _0x537511["getMonth"]() + 1, 1)),
        _0x3fa8f0 = {
    'start_time': _0x4a71d9,
    "end_time": _0x220c26
  };

  const _0x1df74b = await models_1["signinModel"]["getUserSigninList"](_0x164c54, _0x3fa8f0);

  _0x52f9a4["status"](200)["json"]((0, utils_1['httpBody'])(0, _0x1df74b));
});
router["get"]("/persona", async (_0x233455, _0xf4d340, _0x5b40f9) => {
  const _0x596697 = await models_1["personaModel"]['getAllPersona']();

  _0xf4d340["json"]((0, utils_1["httpBody"])(0, _0x596697));
});
router['post']('/persona', async (_0x5aa55e, _0x249ae5, _0x187b41) => {
  const _0x402060 = _0x5aa55e?.["user_id"];

  if (!_0x402060) {
    _0x249ae5['status'](500)["json"]((0, utils_1["httpBody"])(-1, '服务端错误'));

    return;
  }

  const {
    "title": _0x2bec18,
    "context": _0x13b439,
    "description": _0x2b1901,
    "emoji": _0x26d769
  } = _0x5aa55e['body'];

  if (!_0x2bec18 || !_0x13b439 || !_0x26d769) {
    _0x249ae5["json"]((0, utils_1["httpBody"])(-1, "缺少必要参数"));

    return;
  }

  const _0x424aed = (0, utils_1["generateNowflakeId"])(1)(),
        _0x1ed05f = {
    'id': _0x424aed,
    "title": _0x2bec18,
    "description": _0x2b1901,
    "status": 4,
    "user_id": _0x402060,
    "context": _0x13b439,
    "emoji": _0x26d769
  };

  const _0x36f2e8 = await models_1['personaModel']["addPersona"]((0, utils_1["filterObjectNull"])(_0x1ed05f));

  _0x249ae5["json"]((0, utils_1["httpBody"])(0, _0x36f2e8));
});
router["post"]("/images/generations", multerStorage["any"](), async (_0x2e41a7, _0x152fbf, _0xfeb633) => {
  const _0x51d302 = new Date()["getTime"](),
        _0x1e2214 = _0x2e41a7?.["user_id"];

  if (!_0x1e2214) {
    _0x152fbf['status'](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "draw_type": _0xa9144d,
    "quantity": _0x4169cd,
    "width": _0x2d5667,
    "prompt": _0xb3994b
  } = _0x2e41a7["body"],
        _0x5b70ef = {
    'id': _0x1e2214
  };

  const _0x969295 = await models_1['userModel']["getUserInfo"](_0x5b70ef),
        _0x40bfdb = (0, utils_1['getClientIP'])(_0x2e41a7),
        _0x194d9e = (await models_1["configModel"]["getConfigValue"]("draw_price")["then"](_0x4caf90 => {
    return _0x4caf90?.["toString"]();
  })) || 0,
        _0x437cb6 = Number(_0x194d9e) * 7,
        _0x467bfc = new Date();

  _0x467bfc["setHours"](0, 0, 0, 0);

  const _0x2af0b7 = _0x467bfc["getTime"](),
        _0x49196d = new Date(_0x969295['vip_expire_time'])["getTime"]();

  if (!(_0x969295['integral'] > _0x437cb6 || _0x49196d >= _0x2af0b7)) {
    _0x152fbf["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], '当前账户积分余额不足，绘画最低消耗' + _0x437cb6 + '积分'));

    return;
  }

  const _0x3a5a84 = new Date(_0x969295["svip_expire_time"])["getTime"]();

  if (_0xa9144d === "stablediffusion" && _0x3a5a84 < _0x2af0b7 && _0x969295["integral"] <= _0x437cb6) {
    _0x152fbf["status"](400)["json"]((0, utils_1['httpBody'])(-1, [], "当前账户积分不足或不是超级会员无法使用SD绘画"));

    return;
  }

  let _0x52736a = (0, utils_1['httpBody'])(-1, [], "生成失败");

  if (_0xa9144d === "openai") {
    const _0x59a392 = {
      "model": "dall-e",
      "type": "openai"
    };

    const _0x68c53d = await models_1["aikeyModel"]["getOneAikey"](_0x59a392);

    if (!_0x68c53d || !_0x68c53d['id']) {
      _0x152fbf['status'](500)['json']((0, utils_1["httpBody"])(-1, "未配置对应模型"));

      return;
    }

    const _0x3dd20d = [256, 512, 1024];
    let _0x1accb1 = "256x256";
    _0x3dd20d["includes"](Number(_0x2d5667)) && (_0x1accb1 = _0x2d5667 + 'x' + _0x2d5667);
    const _0x5ddf33 = {
      'prompt': _0xb3994b,
      "size": _0x1accb1,
      'n': _0x4169cd,
      "aikeyInfo": _0x68c53d
    };
    _0x52736a = await draw_1['default']["openAi"](_0x5ddf33);
  }

  if (_0xa9144d === "stablediffusion") {
    const _0x1c478f = {
      "type": "stability"
    };

    const _0x358e08 = await models_1['aikeyModel']["getOneAikey"](_0x1c478f);

    if (!_0x358e08 || !_0x358e08['id']) {
      _0x152fbf['status'](500)["json"]((0, utils_1["httpBody"])(-1, "未配置对应模型"));

      return;
    }

    const _0x1c5130 = _0x2e41a7["files"]?.[0]?.["buffer"] || '',
          _0x5d71cc = {
      "prompt": _0xb3994b,
      "width": _0x2d5667,
      "height": _0x2e41a7["body"]['height'],
      "samples": _0x2e41a7["body"]["quantity"],
      'cfg_scale': _0x2e41a7['body']['quality'],
      "style_preset": _0x2e41a7['body']["style"],
      "steps": _0x2e41a7["body"]["steps"],
      'init_image': _0x1c5130
    };

    const _0x8686f6 = {
      "request": _0x5d71cc,
      "aikeyInfo": _0x358e08
    };
    _0x52736a = await draw_1["default"]["stability"](_0x8686f6);
  }

  if (_0x52736a["code"]) {
    _0x152fbf["status"](500)['json'](_0x52736a);
  }

  const _0xb9ca44 = new Date()["getTime"](),
        _0x22bfbe = Math["ceil"]((_0xb9ca44 - _0x51d302) / 1000) * Math["ceil"](Number(_0x194d9e));

  if (_0x49196d < _0x2af0b7) {
    const _0x314b4b = {
      'id': _0x1e2214,
      "type": "integral",
      'value': _0x22bfbe,
      "operate": 'decrement'
    };
    models_1["userModel"]["updataUserVIP"](_0x314b4b);

    const _0x81517b = (0, utils_1['generateNowflakeId'])(1)(),
          _0x371cd4 = {
      'id': _0x81517b,
      "user_id": _0x1e2214,
      "describe": '绘画',
      "value": '-' + _0x22bfbe + '积分'
    };

    models_1["turnoverModel"]['addTurnover'](_0x371cd4);
  }

  models_1["actionModel"]["addAction"]({
    'user_id': _0x1e2214,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x40bfdb,
    'type': "draw",
    'describe': '绘画'
  });

  _0x152fbf["json"](_0x52736a);
});
router["post"]("/chat/completion", async (_0x1494be, _0x257390, _0x29a80e) => {
  const _0x2b5be1 = _0x1494be?.['user_id'];

  if (!_0x2b5be1) {
    _0x257390["status"](500)["json"]((0, utils_1['httpBody'])(-1, "服务端错误"));

    return;
  }

  const {
    "prompt": _0x3a739e,
    "type": type = 'draw'
  } = _0x1494be["body"],
        _0x57506f = (0, utils_1["getClientIP"])(_0x1494be);

  let _0x2c471b = [];

  if (type === "draw") {
    const _0x2d7c53 = {
      "role": "system",
      "content": "你需要为我生成AI绘画提示词，回答的形式是：(image we're prompting), (7 descriptivekeywords), (time of day), (Hd degree).这是一段段按照上述形式的示例问答：问题：参考以上midjoruney prompt formula写1个midjourney prompt内容，用英文回复，不要括号，内容：宫崎骏风格的春天小镇回答：英文：Miyazaki Hayao-style town,Green willow and red flowers, breeze coming, dreamy colors, fantastic elements, fairy-tale situation, warm breath, shooting in the evening, 4K ultra HD 现在严格参考以上的示例回答形式和风格（这很重要）。"
    };
    const _0x104331 = {
      'role': "user",
      "content": '请根据以下的内容生成提示词(直接以英文输出，需要补全):' + _0x3a739e
    };
    _0x2c471b = [_0x2d7c53, _0x104331];
  } else {
    if (type === "mapping") {
      const _0x5689fb = {
        "role": "system",
        "content": "You are ChatGPT, a large language model trained by OpenAI. Please carefully follow the user's instructions. I need to use the Xmind tool to create a mind map, and you need to provide text in Markdown format that is compatible with Xmind."
      };
      const _0x56e2c0 = {
        "role": "user",
        'content': _0x3a739e
      };
      _0x2c471b = [_0x5689fb, _0x56e2c0];
    } else {
      const _0x269141 = {
        "role": "user",
        "content": _0x3a739e
      };
      _0x2c471b = [_0x269141];
    }
  }

  const _0xb794f1 = {
    "model": "gpt-3.5-turbo-16k"
  };
  const _0x24ccfb = {
    'id': _0x2b5be1
  };

  const _0x228ccf = await models_1["userModel"]['getUserInfo'](_0x24ccfb),
        _0x2ca29f = new Date();

  _0x2ca29f["setHours"](0, 0, 0, 0);

  const _0x1bed3a = _0x2ca29f["getTime"](),
        _0x2a5e4c = new Date(_0x228ccf['vip_expire_time'])["getTime"](),
        _0x1363d7 = new Date(_0x228ccf['svip_expire_time'])["getTime"](),
        _0x2715aa = (await models_1["configModel"]["getConfigValue"]("ai3_ratio")) || 0,
        _0x498dce = Number(_0x2715aa),
        _0x1e2ec2 = await models_1["aikeyModel"]["getOneAikey"]({
    'model': "gpt-3.5-turbo-16k"['substring'](0, 5)
  });

  if (!_0x1e2ec2 || !_0x1e2ec2['id']) {
    _0x257390["status"](500)["json"]((0, utils_1["httpBody"])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x7e99aa = { ..._0xb794f1,
    "messages": _0x2c471b,
    "stream": true
  };

  const _0x4cc773 = await (0, node_fetch_1["default"])(_0x1e2ec2["host"] + "/v1/chat/completions", {
    'method': "POST",
    'body': JSON["stringify"](_0x7e99aa),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x1e2ec2["key"]
    }
  }),
        _0x2ccb0d = type === "draw" ? "绘画文案优化" : type === "mapping" ? "生成思维导图" : '对话';

  if (_0x4cc773["status"] === 200 && _0x4cc773["headers"]['get']("content-type")?.["includes"]("text/event-stream")) {
    let _0x37a118 = '';

    _0x257390["setHeader"]('Content-Type', "text/event-stream;charset=utf-8");

    const _0x414f55 = new stream_1["Transform"]({
      'objectMode': true,

      'transform'(_0x245eb6, _0x1cd161, _0x496b62) {
        const _0x433f41 = Buffer["from"](_0x245eb6)["toString"](),
              _0x5a1c73 = (0, utils_1["handleChatData"])(_0x433f41, "assistantMessageId"),
              _0x6b97aa = _0x5a1c73["split"]("\n\n");

        for (let _0x598fd5 = 0; _0x598fd5 < _0x6b97aa["length"]; _0x598fd5++) {
          if (_0x6b97aa[_0x598fd5]) {
            const _0x589501 = JSON["parse"](_0x6b97aa[_0x598fd5]);

            if (_0x589501['segment'] === "stop" && !(_0x1363d7 > _0x1bed3a || _0x2a5e4c > _0x1bed3a)) {
              const _0x57d8d9 = {
                "role": "assistant",
                'content': _0x37a118
              };
              const _0x9a55f2 = {
                "model": "gpt-3.5-turbo-16k",
                'messages': [..._0x2c471b, _0x57d8d9]
              };

              const _0x5621ef = new gpt_tokens_1['GPTTokens'](_0x9a55f2),
                    _0x5179bf = _0x5621ef['usedTokens'],
                    _0x377da6 = _0x498dce ? Math["ceil"](_0x5179bf / _0x498dce) : 0,
                    _0x8a314 = {
                'id': _0x2b5be1,
                'type': "integral",
                "value": _0x377da6,
                "operate": "decrement"
              };

              models_1["userModel"]["updataUserVIP"](_0x8a314);

              const _0x4bd51c = (0, utils_1["generateNowflakeId"])(1)(),
                    _0x58bc83 = {
                'id': _0x4bd51c,
                'user_id': _0x2b5be1,
                "describe": _0x2ccb0d,
                'value': '-' + _0x377da6 + '积分'
              };

              models_1["turnoverModel"]["addTurnover"](_0x58bc83);
              models_1['actionModel']["addAction"]({
                'user_id': _0x2b5be1,
                'id': (0, utils_1['generateNowflakeId'])(23)(),
                'ip': _0x57506f,
                'type': "chat",
                'describe': '' + type + _0x2ccb0d + '(' + "gpt-3.5-turbo-16k" + ')'
              });
            } else {
              _0x37a118 += _0x589501["content"];
            }
          }
        }

        _0x496b62(null, _0x5a1c73);
      }

    });

    _0x4cc773["body"]?.["pipe"](_0x414f55)["pipe"](_0x257390);
    return;
  }

  const _0xbc6d38 = await _0x4cc773['json']();

  _0x257390["status"](_0x4cc773["status"])["json"](_0xbc6d38);
});
router["post"]("/chat/completions", async (_0x2df2a0, _0x287900, _0x2d368c) => {
  const _0x2dbbc0 = _0x2df2a0?.["user_id"];

  if (!_0x2dbbc0) {
    _0x287900["status"](500)['json']((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x8ea6de = {
    'id': _0x2dbbc0
  };

  const _0x101dea = await models_1["userModel"]["getUserInfo"](_0x8ea6de),
        _0x257804 = (0, utils_1["getClientIP"])(_0x2df2a0),
        {
    "prompt": _0x32c9e0,
    "parentMessageId": _0x5efc7d,
    "persona_id": persona_id = null
  } = _0x2df2a0["body"],
        _0x54d38b = {
    'frequency_penalty': 0,
    'model': "gpt-3.5-turbo-16k",
    'presence_penalty': 0,
    'temperature': 0,
    ..._0x2df2a0["body"]['options'],
    'max_tokens': null
  };

  const _0x1db20c = await models_1["personaModel"]["getPersonaContext"](persona_id),
        _0x17c0d3 = await models_1["configModel"]["getConfigValue"]("ai3_carry_count"),
        _0x5bf8b5 = await models_1["configModel"]["getConfigValue"]("ai4_carry_count");

  let _0xaf68d1 = Number(_0x17c0d3) || 0;

  if (_0x54d38b['model']['indexOf']("gpt-4") !== -1) {
    _0xaf68d1 = Number(_0x5bf8b5) || 0;
  }

  const _0x5d60dc = {
    "parent_message_id": _0x5efc7d,
    "status": 1
  };

  const _0x16014f = await models_1["messageModel"]["getMessages"]({
    'page': 0,
    'page_size': Number(_0xaf68d1)
  }, _0x5d60dc),
        _0x59cb5d = _0x16014f["rows"]["map"](_0xdd21b8 => {
    return {
      'role': _0xdd21b8['toJSON']()["role"],
      'content': _0xdd21b8['toJSON']()["content"]
    };
  })["reverse"](),
        _0x32cf53 = {
    'role': "user",
    "content": _0x32c9e0
  };

  const _0x1da110 = [..._0x1db20c, ..._0x59cb5d, _0x32cf53],
        _0x2f768f = (await models_1["configModel"]['getConfigValue']("ai3_ratio")) || 0,
        _0x19a05f = (await models_1['configModel']["getConfigValue"]("ai4_ratio")) || 0,
        _0x9f5c67 = {
    "ai3_ratio": _0x2f768f,
    'ai4_ratio': _0x19a05f
  };

  const _0x376ca3 = {
    'model': _0x54d38b['model'],
    "messages": [..._0x1da110]
  };

  const _0x1b833d = new gpt_tokens_1["GPTTokens"](_0x376ca3),
        _0x5c22e6 = _0x1b833d["usedTokens"];

  let _0x303672 = Number(_0x9f5c67["ai3_ratio"]);

  if (_0x54d38b["model"]["indexOf"]("gpt-4") !== -1) {
    _0x303672 = Number(_0x9f5c67["ai4_ratio"]);
  }

  const _0x1a814f = _0x303672 ? Math["ceil"](_0x5c22e6 / _0x303672) : 0,
        _0x9f0a06 = new Date();

  _0x9f0a06["setHours"](0, 0, 0, 0);

  const _0x5e6c32 = _0x9f0a06["getTime"](),
        _0x3de4b3 = new Date(_0x101dea["vip_expire_time"])["getTime"](),
        _0x290094 = new Date(_0x101dea["svip_expire_time"])['getTime']();

  if (!(_0x101dea['integral'] > _0x1a814f || _0x3de4b3 >= _0x5e6c32)) {
    _0x287900["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "账户积分余额不足, 请充值后在使用。"));

    return;
  }

  if (_0x54d38b['model']['includes']("gpt-4") && _0x290094 < _0x5e6c32 && _0x101dea["integral"] <= 0) {
    _0x287900["status"](400)["json"]((0, utils_1['httpBody'])(-1, [], "GPT4为超级会员使用或用积分"));

    return;
  }

  const _0x37fa4c = await models_1["aikeyModel"]["getOneAikey"]({
    'model': _0x54d38b["model"]["substring"](0, 5)
  });

  if (!_0x37fa4c || !_0x37fa4c['id']) {
    _0x287900["status"](500)["json"]((0, utils_1["httpBody"])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x4e19a2 = (0, utils_1["generateNowflakeId"])(2)(),
        _0x1d44aa = (0, utils_1["generateNowflakeId"])(1)(),
        _0x528fd9 = {
    'user_id': _0x2dbbc0,
    'id': _0x1d44aa,
    'role': "user",
    'content': _0x32c9e0,
    'parent_message_id': _0x5efc7d,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x54d38b
  },
        _0x1bf973 = {
    'user_id': _0x2dbbc0,
    'id': _0x4e19a2,
    'role': "assistant",
    'content': '',
    'parent_message_id': _0x5efc7d,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x54d38b
  },
        _0x2d6c32 = await models_1['dialogModel']["getOneDialogInfo"]({
    'issue': _0x32c9e0,
    'model': _0x54d38b["model"]["substring"](0, 5)
  });

  if (_0x2d6c32 && _0x2d6c32["answer"]) {
    const _0x1de482 = _0x2d6c32?.["answer"] || '';

    _0x1bf973["content"] = _0x1de482;
    const _0x1ccf94 = {
      "Content-Type": "text/event-stream",
      'Cache-Control': "no-cache",
      "Connection": "keep-alive"
    };

    _0x287900["writeHead"](200, _0x1ccf94);

    const _0x5ac355 = (0, utils_1["generateUUID"])(),
          _0xf231d3 = _0x2d6c32["delay"] || 0,
          _0x3ee5e0 = async () => {
      for (let _0x171c58 = 0; _0x171c58 < _0x1de482["length"]; _0x171c58++) {
        await new Promise(_0x2cad0e => setTimeout(_0x2cad0e, Math['random']() * _0xf231d3));

        const _0x55c46b = JSON["stringify"]({
          'id': _0x5ac355,
          'role': 'assistant',
          'segment': _0x171c58 ? "text" : "start",
          'dateTime': (0, utils_2["formatTime"])(),
          'content': _0x1de482[_0x171c58],
          'parentMessageId': _0x5efc7d
        }) + "\n\n";

        _0x287900["write"](_0x55c46b);
      }

      const _0xdf4ae6 = JSON["stringify"]({
        'id': _0x5ac355,
        'role': "assistant",
        'segment': "end",
        'dateTime': (0, utils_2["formatTime"])(),
        'content': '',
        'parentMessageId': _0x5efc7d
      }) + "\n\n";

      _0x287900['write'](_0xdf4ae6);

      await models_1["messageModel"]["addMessages"]([_0x528fd9, { ..._0x1bf973,
        'create_time': (0, utils_2['formatTime'])()
      }]);

      if (_0x54d38b["model"]['includes']("gpt-4") && _0x290094 < _0x5e6c32 || !_0x54d38b['model']["includes"]("gpt-4") && _0x3de4b3 < _0x5e6c32) {
        const _0x2adb7a = {
          "role": "assistant",
          "content": _0x1bf973["content"]
        };
        const _0x4c9ab4 = {
          "model": _0x54d38b['model'],
          "messages": [..._0x1da110, _0x2adb7a]
        };

        const _0x24a2c7 = new gpt_tokens_1["GPTTokens"](_0x4c9ab4),
              _0x14e1c0 = _0x24a2c7['usedTokens'],
              _0x519309 = _0x303672 ? Math["ceil"](_0x14e1c0 / _0x303672) : 0,
              _0x392e26 = {
          'id': _0x2dbbc0,
          "type": "integral",
          "value": _0x519309,
          "operate": "decrement"
        };

        models_1["userModel"]["updataUserVIP"](_0x392e26);

        const _0x3a41d2 = (0, utils_1["generateNowflakeId"])(1)(),
              _0x2cc672 = {
          'id': _0x3a41d2,
          "user_id": _0x2dbbc0,
          "describe": "对话(" + _0x54d38b['model'] + ')',
          'value': '-' + _0x519309 + '积分'
        };

        models_1['turnoverModel']["addTurnover"](_0x2cc672);
      }

      _0x287900["end"]();
    };

    await _0x3ee5e0();
    return;
  }

  const _0x21be27 = await models_1['configModel']['getConfigValue']("tuputech_key"),
        _0x462540 = await models_1["configModel"]["getConfigValue"]("prohibited_words");

  if (_0x21be27) {
    const {
      "action": _0x711a71,
      "details": _0x538890
    } = await textModeration_1['default']["tuputech"](_0x21be27, _0x32c9e0),
          _0x20acf7 = Array["isArray"](_0x538890) ? _0x538890?.['map'](_0x2cfa2a => _0x2cfa2a["hint"]) : [];

    if (_0x711a71 !== 'pass') {
      _0x287900['status'](500)["json"]((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + _0x20acf7["join"]("`、`") + '`'));

      return;
    }
  } else {
    if (_0x462540) {
      const {
        "action": _0x544430,
        "matchedWords": matchedWords = []
      } = await (0, utils_1['checkProhibitedWords'])(_0x32c9e0, _0x462540);

      if (_0x544430 !== "pass") {
        _0x287900['status'](500)["json"]((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + matchedWords["join"]("`、`") + '`'));

        return;
      }
    }
  }

  const _0x32efcc = { ..._0x54d38b,
    "messages": _0x1da110,
    'stream': true
  };

  const _0x3ec567 = await (0, node_fetch_1["default"])(_0x37fa4c["host"] + "/v1/chat/completions", {
    'method': "POST",
    'body': JSON["stringify"](_0x32efcc),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x37fa4c["key"]
    }
  });

  if (_0x3ec567["status"] === 200 && _0x3ec567["headers"]["get"]("content-type")?.["includes"]('text/event-stream')) {
    _0x287900["setHeader"]("Content-Type", "text/event-stream;charset=utf-8");

    const _0x30eb3f = new stream_1["Transform"]({
      'objectMode': true,

      'transform'(_0x27fb64, _0x5f1ed4, _0x4463de) {
        const _0x24c97e = Buffer["from"](_0x27fb64)["toString"](),
              _0x3698d2 = (0, utils_1["handleChatData"])(_0x24c97e, _0x4e19a2),
              _0x1a872c = _0x3698d2["split"]("\n\n");

        for (let _0xf80471 = 0; _0xf80471 < _0x1a872c["length"]; _0xf80471++) {
          if (_0x1a872c[_0xf80471]) {
            const _0x131d3c = JSON['parse'](_0x1a872c[_0xf80471]);

            if (_0x131d3c['segment'] === "stop") {
              if (_0x54d38b["model"]['includes']("gpt-4") && _0x290094 < _0x5e6c32 || !_0x54d38b["model"]['includes']("gpt-4") && _0x3de4b3 < _0x5e6c32) {
                const _0x2eaca8 = {
                  "role": "assistant",
                  "content": _0x1bf973["content"]
                };
                const _0xf2e3f2 = {
                  "model": _0x54d38b["model"],
                  "messages": [..._0x1da110, _0x2eaca8]
                };

                const _0x293981 = new gpt_tokens_1["GPTTokens"](_0xf2e3f2),
                      _0x5e6f7f = _0x293981["usedTokens"],
                      _0x1994a4 = _0x303672 ? Math["ceil"](_0x5e6f7f / _0x303672) : 0,
                      _0x4b6b70 = {
                  'id': _0x2dbbc0,
                  "type": "integral",
                  "value": _0x1994a4,
                  "operate": "decrement"
                };

                models_1['userModel']["updataUserVIP"](_0x4b6b70);

                const _0x5d0ce5 = (0, utils_1["generateNowflakeId"])(1)(),
                      _0x5f3411 = {
                  'id': _0x5d0ce5,
                  "user_id": _0x2dbbc0,
                  "describe": '对话(' + _0x54d38b["model"] + ')',
                  "value": '-' + _0x1994a4 + '积分'
                };

                models_1['turnoverModel']['addTurnover'](_0x5f3411);
              }

              models_1["messageModel"]["addMessages"]([_0x528fd9, { ..._0x1bf973,
                'create_time': (0, utils_2['formatTime'])()
              }]);
              models_1["actionModel"]["addAction"]({
                'user_id': _0x2dbbc0,
                'id': (0, utils_1["generateNowflakeId"])(23)(),
                'ip': _0x257804,
                'type': "chat",
                'describe': '对话(' + _0x54d38b["model"] + ')'
              });
            } else {
              _0x1bf973["content"] += _0x131d3c["content"];
            }
          }
        }

        _0x4463de(null, _0x3698d2);
      }

    });

    _0x3ec567['body']?.["pipe"](_0x30eb3f)["pipe"](_0x287900);
    return;
  }

  const _0x58a339 = await _0x3ec567["json"]();

  _0x287900["status"](_0x3ec567["status"])['json'](_0x58a339);
});
router["get"]('/product', async (_0x1c94f5, _0x2cf4e0, _0x11545e) => {
  const _0x2a6d85 = {
    "page": _0x1c94f5["query"]['page'],
    'page_size': 1000
  };
  const {
    "page": _0x26679d,
    "page_size": _0x51290a
  } = (0, utils_1["pagingData"])(_0x2a6d85),
        _0x13e90e = {
    "page": _0x26679d,
    "page_size": _0x51290a
  };
  const _0x5e7537 = {
    "status": 1
  };

  const _0x70404d = await models_1['productModel']['getProducts'](_0x13e90e, _0x5e7537),
        _0x1c5150 = await models_1["paymentModel"]["getPaymentTypes"](),
        _0x2bc6b4 = _0x70404d["rows"]["sort"]((_0x209db6, _0x469305) => {
    return _0x209db6['sort'] - _0x469305["sort"];
  }),
        _0x4f554c = {
    "products": _0x2bc6b4,
    "pay_types": _0x1c5150
  };

  _0x2cf4e0["json"]((0, utils_1['httpBody'])(0, _0x4f554c));
});
router["post"]("/use_carmi", async (_0x4cac81, _0x47d173, _0xb9b8a6) => {
  const _0x4137de = _0x4cac81?.["user_id"];

  if (!_0x4137de) {
    _0x47d173["status"](500)["json"]((0, utils_1['httpBody'])(-1, "服务端错误"));

    return;
  }

  const {
    "carmi": _0x49b7ff
  } = _0x4cac81["body"],
        _0x577bac = {
    "key": _0x49b7ff
  };

  const _0x55509f = await models_1['carmiModel']["getCarmiInfo"](_0x577bac)["then"](_0x2f0d99 => _0x2f0d99?.["toJSON"]());

  if (!_0x55509f) {
    _0x47d173["status"](400)["json"]((0, utils_1["httpBody"])(-1, "卡密不存在"));

    return;
  }

  if (_0x55509f['user_id'] || Number(_0x55509f["status"]) === 1) {
    _0x47d173["status"](500)["json"]((0, utils_1["httpBody"])(-1, "卡密已被使用"));

    return;
  }

  if (Number(_0x55509f['status']) === 2) {
    _0x47d173['status'](500)["json"]((0, utils_1["httpBody"])(-1, "卡密已过期"));

    return;
  }

  const _0x1e997c = new Date()['setHours'](0, 0, 0, 0),
        _0x3af59 = Date["parse"](_0x55509f["end_time"]);

  if (_0x55509f['end_time'] && _0x3af59 < _0x1e997c) {
    _0x47d173['status'](500)["json"]((0, utils_1["httpBody"])(-1, "卡密已过期"));

    return;
  }

  const _0x403e4f = (0, utils_1['getClientIP'])(_0x4cac81),
        _0x538793 = {
    "user_id": _0x4137de,
    "status": 1,
    'ip': _0x403e4f
  };

  const _0x3720a4 = {
    'id': _0x55509f['id'],
    "key": _0x49b7ff
  };

  const _0x48a2c9 = await models_1['carmiModel']["updateCarmiInfo"](_0x538793, _0x3720a4);

  if (!_0x48a2c9[0]) {
    _0x47d173["status"](500)['json']((0, utils_1["httpBody"])(-1, "使用卡密失败，请稍后再试"));

    return;
  }

  await models_1["actionModel"]['addAction']({
    'user_id': _0x4137de,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x403e4f,
    'type': "use_carmi",
    'describe': "使用卡密"
  });
  const _0x5bbef6 = {
    'id': _0x4137de,
    'value': _0x55509f["value"],
    "level": _0x55509f["level"],
    "type": _0x55509f["type"],
    'operate': "increment"
  };
  await models_1["userModel"]["updataUserVIP"](_0x5bbef6);

  const _0x23d30e = (0, utils_1['generateNowflakeId'])(1)(),
        _0x254e79 = {
    '1': "(会员)",
    '2': "(超级会员)",
    "default": "(积分)"
  };

  const _0x4032a1 = _0x55509f["type"] === "day" ? _0x254e79[_0x55509f["level"]] || "(天数)" : "(积分)";

  await models_1["turnoverModel"]["addTurnover"]({
    'id': _0x23d30e,
    'user_id': _0x4137de,
    'describe': "卡密充值 " + _0x4032a1,
    'value': '' + _0x55509f["value"] + (_0x55509f["type"] === "day" ? '天' : '积分')
  });

  _0x47d173['json']((0, utils_1['httpBody'])(0, "使用卡密成功"));
});
router['get']("/turnover", async (_0x130512, _0x24afee, _0x570a6b) => {
  const _0x3be6a4 = _0x130512?.['user_id'];

  if (!_0x3be6a4) {
    _0x24afee['status'](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x3ac8da = {
    "page": _0x130512['query']["page"],
    "page_size": _0x130512['query']["page_size"]
  };
  const {
    "page": _0x23e572,
    "page_size": _0x4cd265
  } = (0, utils_1["pagingData"])(_0x3ac8da),
        _0x437036 = {
    "page": _0x23e572,
    "page_size": _0x4cd265
  };
  const _0x786e8a = {
    "user_id": _0x3be6a4
  };

  const _0xf97347 = await models_1['turnoverModel']['getUserTurnovers'](_0x437036, _0x786e8a);

  _0x24afee["json"]((0, utils_1["httpBody"])(0, _0xf97347));
});
router["post"]("/signin", async (_0x321a4a, _0x4197f9, _0x358a33) => {
  const _0x5eea8e = _0x321a4a?.["user_id"];

  if (!_0x5eea8e) {
    _0x4197f9["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0xf3207a = new Date();

  _0xf3207a["setHours"](0, 0, 0, 0);

  const _0x193da3 = (0, utils_2["formatTime"])("yyyy-MM-dd HH:mm:ss", _0xf3207a),
        _0xad7325 = await models_1["signinModel"]["getUserDaySignin"](_0x5eea8e, _0x193da3);

  if (_0xad7325) {
    _0x4197f9["status"](500)["json"]((0, utils_1["httpBody"])(-1, "今日已经签到了"));

    return;
  }

  const _0x7a9d83 = (await models_1["configModel"]["getConfigValue"]("signin_reward")) || 0,
        _0x311bcc = (0, utils_1['getClientIP'])(_0x321a4a),
        _0x4c2f4d = (0, utils_1['generateNowflakeId'])(1)(),
        _0xb89f0 = (0, utils_1["generateNowflakeId"])(1)();

  models_1["actionModel"]["addAction"]({
    'user_id': _0x5eea8e,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x311bcc,
    'type': "signin",
    'describe': '签到'
  });
  const _0x376415 = {
    'id': _0x4c2f4d,
    'user_id': _0x5eea8e,
    'ip': _0x311bcc
  };
  await models_1["signinModel"]["addSignin"](_0x376415);
  await models_1["userModel"]["updataUserVIP"]({
    'id': _0x5eea8e,
    'value': Number(_0x7a9d83),
    'type': "integral",
    'operate': "increment"
  });
  const _0xc0f9fc = {
    'id': _0xb89f0,
    "user_id": _0x5eea8e,
    "describe": "签到奖励",
    "value": _0x7a9d83 + '积分'
  };
  await models_1["turnoverModel"]["addTurnover"](_0xc0f9fc);

  _0x4197f9["json"]((0, utils_1["httpBody"])(0, "签到成功 +" + _0x7a9d83 + '积分'));
});
router["post"]('/pay/precreate', async (_0x2c4870, _0xc963aa, _0x13e73c) => {
  const _0x2eab13 = _0x2c4870?.["user_id"];

  if (!_0x2eab13) {
    _0xc963aa["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "quantity": quantity = 1,
    "pay_type": _0x5846a4,
    "product_id": _0x2e0a73
  } = _0x2c4870['body'];

  if (!_0x5846a4 || !_0x2e0a73) {
    _0xc963aa["status"](406)["json"]((0, utils_1['httpBody'])(-1, "缺少必要参数"));

    return;
  }

  const _0x4528dc = await models_1['productModel']["getProduct"](_0x2e0a73);

  if (!_0x4528dc) {
    _0xc963aa["status"](406)['json']((0, utils_1['httpBody'])(-1, "商品不存在"));

    return;
  }

  const _0x5747f4 = await models_1["paymentModel"]["getOnePayment"](_0x5846a4);

  if (!_0x5747f4) {
    _0xc963aa['status'](406)["json"]((0, utils_1["httpBody"])(-1, "支付信息未配置"));

    return;
  }

  const _0x56367d = _0x2c4870["headers"]['user-agent'] || '',
        _0x551c29 = (0, utils_1["getBrowserType"])(_0x56367d),
        _0x2ff12c = (0, utils_1["generateNowflakeId"])(1)(),
        _0x1ecf79 = {
    'channel': _0x5747f4['channel'],
    "order_id": _0x2ff12c,
    'pay_url': '',
    "pay_type": _0x5846a4
  };

  const _0x33393e = (0, utils_1['getClientIP'])(_0x2c4870),
        _0x122387 = "https://" + _0x2c4870["get"]("host")?.['split'](':')[0] + "/api/pay/notify?channel=" + _0x5747f4['channel'],
        _0x1c8511 = _0x4528dc['price'] / 100,
        _0xe839f0 = JSON["parse"](_0x5747f4['params']),
        _0x1d8b07 = {
    'order_id': _0x2ff12c,
    "product_id": _0x2e0a73,
    'user_id': _0x2eab13,
    'payment_id': _0x5747f4['id']
  };

  const _0x13f6e5 = JSON["stringify"](_0x1d8b07);

  models_1['actionModel']["addAction"]({
    'user_id': _0x2eab13,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x33393e,
    'type': "pay_order",
    'describe': "创建支付订单"
  });

  if (_0x5747f4["channel"] === "alipay") {
    const _0x54eb62 = {
      'config': _0xe839f0,
      'notify_url': _0x122387,
      "out_trade_no": _0x2ff12c,
      "total_amount": _0x1c8511,
      "subject": _0x4528dc["title"],
      "body": _0x13f6e5,
      "goods_detail": {}
    };
    _0x54eb62["goods_detail"]["goods_id"] = _0x4528dc['id'];
    _0x54eb62["goods_detail"]["goods_name"] = _0x4528dc['title'];
    _0x54eb62["goods_detail"]['price'] = _0x1c8511;
    _0x54eb62["goods_detail"]['quantity'] = quantity;

    const _0x3ac29c = await pay_1["alipay"]["precreate"](_0x54eb62);

    if (_0x3ac29c["code"]) {
      _0xc963aa["status"](500)['json']((0, utils_1['httpBody'])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x1ecf79["order_id"] = _0x3ac29c["outTradeNo"];
    _0x1ecf79["pay_url"] = _0x3ac29c["qrCode"];
  }

  if (_0x5747f4["channel"] === "yipay") {
    const _0x2f981c = {
      "api": _0xe839f0["api"],
      "key": _0xe839f0["key"]
    };

    const _0x16b9db = await pay_1["yipay"]['precreate'](_0x2f981c, {
      'pid': Number(_0xe839f0['pid']),
      'return_url': _0xe839f0?.["return_url"]
    }, {
      'type': _0x5846a4,
      'out_trade_no': _0x2ff12c,
      'notify_url': _0x122387,
      'name': _0x4528dc["title"],
      'money': _0x1c8511,
      'clientip': _0x33393e,
      'device': _0x551c29,
      'param': encodeURIComponent(_0x13f6e5)
    });

    if (_0x16b9db["code"]) {
      _0xc963aa["status"](500)['json']((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x1ecf79["pay_url"] = _0x16b9db["pay_url"];
  }

  if (_0x5747f4["channel"] === 'jspay') {
    const _0x427c02 = {
      "api": _0xe839f0["api"],
      "key": _0xe839f0["key"]
    };

    const _0x2c5873 = await pay_1["jspay"]["precreate"](_0x427c02, {
      'mchid': _0xe839f0["mchid"],
      'total_fee': _0x1c8511 * 100,
      'out_trade_no': _0x2ff12c,
      'body': _0x4528dc["title"],
      'notify_url': _0x122387,
      'type': _0x5846a4,
      'attach': _0x13f6e5
    });

    if (_0x2c5873["code"]) {
      _0xc963aa["status"](500)["json"]((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x1ecf79["pay_url"] = _0x2c5873["qrcode"];
  }

  if (_0x5747f4["channel"] === "hpjpay") {
    const _0xeaa1e0 = {
      "api": _0xe839f0["api"],
      "key": _0xe839f0["key"]
    };

    const _0x33cba1 = await pay_1["hpjpay"]["precreate"](_0xeaa1e0, {
      'version': "1.1",
      'appid': _0xe839f0["appid"],
      'total_fee': _0x1c8511,
      'trade_order_id': _0x2ff12c,
      'title': _0x4528dc["title"],
      'notify_url': _0x122387,
      'type': _0x5846a4 === "wxpay" ? "WAP" : _0x5846a4,
      'attach': _0x13f6e5,
      'return_url': _0x4528dc?.['return_url'],
      'nonce_str': (0, utils_1["generateUUID"])() + Date["now"](),
      'time': Date["now"](),
      'wap_url': _0x4528dc?.["return_url"] || "ChatGptAI",
      'wap_name': "ChatGptAI"
    });

    if (_0x33cba1['code']) {
      _0xc963aa["status"](500)["json"]((0, utils_1["httpBody"])(-1, "支付错误，稍后再试"));

      return;
    }

    _0x1ecf79["pay_url"] = _0x33cba1["pay_url"];
  }

  await models_1['orderModel']["addOrder"]({
    'id': _0x2ff12c,
    'pay_type': _0x5846a4,
    'product_title': _0x4528dc["title"],
    'product_id': _0x2e0a73,
    'trade_status': "WAIT_BUYER_PAY",
    'user_id': _0x2eab13,
    'product_info': JSON['stringify'](_0x4528dc),
    'channel': _0x5747f4["channel"],
    'payment_id': _0x5747f4['id'],
    'payment_info': JSON["stringify"](_0x5747f4),
    'money': _0x1c8511,
    'params': _0x13f6e5,
    'ip': _0x33393e,
    'pay_url': _0x1ecf79["pay_url"]
  });

  _0xc963aa["json"]((0, utils_1["httpBody"])(0, _0x1ecf79));
});
router["all"]("/pay/notify", async (_0x2c1781, _0x4d32fc, _0x1db331) => {
  const _0x3de285 = async (_0x5b5b99, _0x595ba4, _0x11d308) => {
    const _0x2fcdbb = await models_1["paymentModel"]["getPaymentInfo"](_0x5b5b99);

    if (!_0x2fcdbb) {
      return false;
    }

    const _0x5b5765 = JSON["parse"](_0x2fcdbb["params"]);

    if (_0x11d308 === "alipay") {
      const _0x1eaf8e = await pay_1["alipay"]['checkNotifySign'](_0x5b5765, _0x595ba4);

      if (!_0x1eaf8e) {
        return false;
      }
    }

    if (_0x11d308 === "yipay") {
      const _0x15d9f3 = await pay_1["yipay"]["checkNotifySign"](_0x595ba4, _0x5b5765["key"]);

      if (!_0x15d9f3) {
        return false;
      }
    }

    if (_0x11d308 === "jspay") {
      const _0x3a38b3 = await pay_1['jspay']["checkNotifySign"](_0x595ba4, _0x5b5765['key']);

      if (!_0x3a38b3) {
        return false;
      }
    }

    if (_0x11d308 === "hpjpay") {
      const _0x12f2e5 = await pay_1["hpjpay"]["checkNotifySign"](_0x595ba4, _0x5b5765["key"]);

      if (!_0x12f2e5) {
        return false;
      }
    }

    return true;
  },
        _0x6cd20b = async ({
    "order_id": _0xbe51c0,
    "trade_status": _0x4a1e24,
    "trade_no": _0x1441a3,
    "notify_info": _0x2beaca,
    "user_id": _0xa31e2d,
    "product_id": _0x5674d9
  }) => {
    const _0x148f90 = await models_1["userModel"]["addUserProductQuota"](_0xa31e2d, _0x5674d9);

    if (_0x148f90["code"]) {
      return false;
    }

    const _0x2c0f7e = {
      'id': _0xbe51c0,
      "trade_status": _0x4a1e24,
      "trade_no": _0x1441a3,
      "notify_info": _0x2beaca
    };
    await models_1["orderModel"]["editOrder"](_0x2c0f7e);

    const _0x27684a = (0, utils_1['generateNowflakeId'])(1)(),
          _0x2797c2 = {
      'id': _0x27684a,
      "user_id": _0xa31e2d,
      'describe': "购买-" + _0x148f90['data']?.["title"],
      "value": _0x148f90["data"]?.['value']
    };

    await models_1["turnoverModel"]["addTurnover"](_0x2797c2);
    const _0x31c7b0 = {
      "user_id": _0xa31e2d,
      "order_id": _0xbe51c0,
      "trade_no": _0x1441a3,
      "product_id": _0x5674d9
    };
    await queue_1["addCashbackQueue"]["addTask"](_0x31c7b0);
    return true;
  };

  try {
    if (_0x2c1781["body"]?.["channel"] && _0x2c1781["body"]?.["channel"] === "alipay") {
      const {
        "body": _0x359460,
        "out_trade_no": _0x989908,
        "trade_status": _0x1c1979,
        "trade_no": _0x637ae7
      } = _0x2c1781['body'],
            _0x51bf1d = await models_1['orderModel']["getOrderInfo"](_0x989908);

      if (!_0x51bf1d || _0x51bf1d["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x4d32fc["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x496cd4,
        "user_id": _0x3d4957,
        "product_id": _0x4b4487
      } = JSON["parse"](_0x359460),
            _0x5c2a3a = await _0x3de285(_0x496cd4, _0x2c1781["body"], _0x2c1781["body"]?.["channel"]);

      if (!_0x5c2a3a) {
        _0x4d32fc["status"](404)['json']("fail");

        return;
      }

      const _0x294bf3 = await _0x6cd20b({
        'order_id': _0x989908,
        'trade_status': _0x1c1979,
        'trade_no': _0x637ae7,
        'notify_info': JSON["stringify"](_0x2c1781["body"]),
        'user_id': _0x3d4957,
        'product_id': _0x4b4487
      });

      if (!_0x294bf3) {
        _0x4d32fc["status"](404)['json']('fail');

        return;
      }
    }

    if (_0x2c1781['query']?.["channel"] && _0x2c1781['query']?.["channel"] === "yipay") {
      const {
        "out_trade_no": _0x417cb9,
        "trade_status": _0x415acf,
        "trade_no": _0x27ea02
      } = _0x2c1781["query"],
            _0xe734cd = await models_1["orderModel"]["getOrderInfo"](_0x417cb9);

      if (!_0xe734cd || _0xe734cd["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x4d32fc["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x3276d6,
        "user_id": _0x1f760b,
        "product_id": _0x307244
      } = JSON["parse"](decodeURIComponent(_0x2c1781["query"]?.["param"])),
            _0x3a700c = await _0x3de285(_0x3276d6, _0x2c1781["query"], _0x2c1781["query"]?.["channel"]);

      if (!_0x3a700c) {
        _0x4d32fc["status"](404)['json']("fail");

        return;
      }

      const _0x5848d7 = await _0x6cd20b({
        'order_id': _0x417cb9,
        'trade_status': _0x415acf,
        'trade_no': _0x27ea02,
        'notify_info': JSON["stringify"](_0x2c1781['query']),
        'user_id': _0x1f760b,
        'product_id': _0x307244
      });

      if (!_0x5848d7) {
        _0x4d32fc['status'](404)["json"]("fail");

        return;
      }
    }

    if (_0x2c1781["query"]?.['channel'] && _0x2c1781["query"]?.['channel'] === "jspay") {
      const {
        "attach": _0x51073d,
        "return_code": _0x145899,
        "out_trade_no": _0x2eefe5,
        "trade_no": _0x4ad4f2
      } = _0x2c1781['body'];

      if (Number(_0x145899) !== 1) {
        _0x4d32fc["status"](404)["json"]("fail");

        return;
      }

      const _0x35748c = await models_1["orderModel"]['getOrderInfo'](_0x2eefe5);

      if (!_0x35748c || _0x35748c["trade_status"] !== "WAIT_BUYER_PAY") {
        _0x4d32fc["status"](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x40c831,
        "user_id": _0x1bed37,
        "product_id": _0x297c4b
      } = JSON['parse'](_0x51073d),
            _0xff35be = await _0x3de285(_0x40c831, _0x2c1781["body"], _0x2c1781["query"]?.['channel']);

      if (!_0xff35be) {
        _0x4d32fc["status"](404)["json"]("fail");

        return;
      }

      const _0x43ae9e = await _0x6cd20b({
        'order_id': _0x2eefe5,
        'trade_status': Number(_0x145899) === 1 ? "TRADE_SUCCESS" : "WAIT_BUYER_PAY",
        'trade_no': _0x4ad4f2,
        'notify_info': JSON['stringify'](_0x2c1781["body"]),
        'user_id': _0x1bed37,
        'product_id': _0x297c4b
      });

      if (!_0x43ae9e) {
        _0x4d32fc['status'](404)["json"]("fail");

        return;
      }
    }

    if (_0x2c1781["query"]?.["channel"] && _0x2c1781["query"]?.["channel"] === "hpjpay") {
      const {
        "attach": _0x42e532,
        "status": _0x132523,
        "trade_order_id": _0xc7fa5a,
        "open_order_id": _0x3c5f89
      } = _0x2c1781['body'];

      if (_0x132523 !== 'OD') {
        _0x4d32fc['status'](404)['json']("fail");

        return;
      }

      const _0x426312 = await models_1["orderModel"]["getOrderInfo"](_0xc7fa5a);

      if (!_0x426312 || _0x426312["trade_status"] !== 'WAIT_BUYER_PAY') {
        _0x4d32fc['status'](404)["json"]("fail");

        return;
      }

      const {
        "payment_id": _0x5981b6,
        "user_id": _0x4132f3,
        "product_id": _0x240b85
      } = JSON["parse"](_0x42e532),
            _0xae5eb3 = await _0x3de285(_0x5981b6, _0x2c1781['body'], _0x2c1781['query']?.["channel"]);

      if (!_0xae5eb3) {
        _0x4d32fc["status"](404)['json']("fail");

        return;
      }

      const _0x431848 = await _0x6cd20b({
        'order_id': _0xc7fa5a,
        'trade_status': _0x132523 !== 'OD' ? "TRADE_SUCCESS" : "WAIT_BUYER_PAY",
        'trade_no': _0x3c5f89,
        'notify_info': JSON["stringify"](_0x2c1781["body"]),
        'user_id': _0x4132f3,
        'product_id': _0x240b85
      });

      if (!_0x431848) {
        _0x4d32fc['status'](404)["json"]("fail");

        return;
      }
    }
  } catch (_0x27f21e) {
    console["log"](_0x27f21e);

    _0x4d32fc['status'](404)["json"]("fail");

    return;
  }

  _0x4d32fc["json"]("success");
});
exports['default'] = router;