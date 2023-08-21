'use strict';

const a113_0x20715b = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a113_0x20715b);

const tslib_1 = require('tslib'),
      express_1 = tslib_1["__importDefault"](require('express')),
      redis_1 = tslib_1["__importDefault"](require("../../helpers/redis")),
      models_1 = require("../../models"),
      utils_1 = require("../../utils"),
      mailer_1 = require("../../helpers/mailer"),
      emailTemplate_1 = tslib_1["__importDefault"](require("../../helpers/mailer/emailTemplate")),
      sms_1 = require("../../helpers/sms"),
      router = express_1["default"]['Router']();

router["get"]('/config', async (_0x5241d1, _0x276a2b, _0x449270) => {
  const _0x526a54 = await models_1["configModel"]["getConfigValue"]("shop_introduce"),
        _0x206918 = await models_1["configModel"]["getConfigValue"]("user_introduce"),
        _0x359d3a = await models_1['configModel']["getConfigValue"]("invite_introduce"),
        _0x36521a = await models_1["configModel"]["getConfigValue"]("website_title"),
        _0x272389 = await models_1["configModel"]["getConfigValue"]("website_description"),
        _0x57c441 = await models_1["configModel"]["getConfigValue"]("website_keywords"),
        _0x3ca40a = await models_1["configModel"]["getConfigValue"]('website_logo'),
        _0x3383ff = await models_1["configModel"]["getConfigValue"]("website_footer"),
        _0x440ee0 = {
    "page": 0,
    "page_size": 1000
  };

  const _0x51cf7c = {
    "status": 1
  };

  const _0x206606 = await models_1["notificationModel"]["getNotification"](_0x440ee0, _0x51cf7c),
        _0x313dc9 = _0x206606['rows']["sort"]((_0x3820f4, _0x2f12f2) => {
    return _0x3820f4['sort'] - _0x2f12f2["sort"];
  }),
        _0x438c8f = {
    "type": "openai",
    "status": 1
  };

  const _0xe006c2 = await models_1['aikeyModel']["getAiKeyModels"](_0x438c8f),
        _0x3526ae = await models_1['personaModel']["getRandomPersonas"](),
        _0x20797a = {
    "shop_introduce": _0x526a54,
    'user_introduce': _0x206918,
    "notifications": _0x313dc9,
    "website_title": _0x36521a,
    "website_description": _0x272389,
    "website_keywords": _0x57c441,
    'website_logo': _0x3ca40a,
    "website_footer": _0x3383ff,
    "invite_introduce": _0x359d3a,
    'random_personas': _0x3526ae,
    'models': _0xe006c2
  };

  _0x276a2b['json']((0, utils_1['httpBody'])(0, _0x20797a));
});
router["get"]('/send_sms', async (_0x2723e8, _0x87b76c, _0x3bcf90) => {
  const _0x3312b1 = Array["isArray"](_0x2723e8["query"]["source"]) ? String(_0x2723e8["query"]["source"][0]) : String(_0x2723e8["query"]["source"]),
        _0x83a0b5 = (0, utils_1["getClientIP"])(_0x2723e8),
        _0x4754d5 = async (_0x3ef626, _0x3ef4ca = "code", _0x1ec502 = 6) => {
    const _0x2870cd = 'limit:' + _0x3ef4ca + ':' + _0x3ef626,
          _0x33b721 = await redis_1["default"]["select"]()["get"](_0x2870cd),
          _0x198e3c = (0, utils_1["distanceTime"])() || 1;

    if (_0x33b721 && Number(_0x33b721) >= _0x1ec502) {
      redis_1['default']["select"]()['expire'](_0x2870cd, 86400);
      return (0, utils_1['httpBody'])(-1, '请求次数过多，请稍后再试！');
    }

    if (_0x33b721 && Number(_0x33b721) < _0x1ec502) {
      const _0x472050 = Number(_0x33b721) + 1;

      redis_1['default']["select"]()["setex"](_0x2870cd, _0x472050, _0x198e3c);
      return (0, utils_1["httpBody"])(0);
    }

    redis_1['default']['select']()["setex"](_0x2870cd, 1, _0x198e3c);
    return (0, utils_1["httpBody"])(0);
  },
        _0x73c878 = await _0x4754d5(_0x83a0b5);

  if (_0x73c878["code"]) {
    _0x87b76c["json"](_0x73c878);

    return;
  }

  const _0x118ff7 = await (0, utils_1["generateCode"])();

  let _0x240540;

  const _0x51810d = /^1[3456789]\d{9}$/;

  if (_0x51810d["test"](_0x3312b1)) {
    let _0x3dee61 = {};

    try {
      const _0x4351dc = (await models_1["configModel"]["getConfigValue"]("sms")) || '';

      _0x3dee61 = JSON["parse"](_0x4351dc);
    } catch (_0x15e1d3) {
      _0x87b76c['json']((0, utils_1['httpBody'])(-1, "短信服务配置错误"));

      return;
    }

    const {
      "sign": _0x1f15f6,
      "template": _0x3bef4b,
      "password": _0x234ce0,
      "user": _0x67e2dc
    } = _0x3dee61,
          _0x53abcf = _0x3bef4b["replace"]("{code}", _0x118ff7)['replace']("{time}", '10'),
          _0x15035e = {
      "user": _0x67e2dc,
      "password": _0x234ce0,
      "content": '【' + _0x1f15f6 + '】' + _0x53abcf,
      "phone": _0x3312b1
    };

    _0x240540 = await (0, sms_1['sendSms'])(_0x15035e);
  }

  const _0xb258ac = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (_0xb258ac['test'](_0x3312b1)) {
    let _0x54a64b = {};

    try {
      const _0x5ddece = (await models_1["configModel"]["getConfigValue"]('email')) || '';

      _0x54a64b = JSON["parse"](_0x5ddece);
    } catch (_0x240214) {
      _0x87b76c["json"]((0, utils_1["httpBody"])(-1, "邮件服务配置错误"));

      return;
    }

    const {
      "host": _0x4603f9,
      "port": _0x5729e0,
      "user": _0x27b91c,
      "pass": _0x1ae16e,
      "subject": _0x18e304,
      "from_title": _0x2c8f94
    } = _0x54a64b,
          _0x51f7ff = {
      'user': _0x27b91c,
      "pass": _0x1ae16e
    };
    const _0x9a1483 = {
      "host": _0x4603f9,
      "port": _0x5729e0,
      "auth": _0x51f7ff
    };
    _0x240540 = await (0, mailer_1["sendMail"])({
      'to': _0x3312b1,
      'body': emailTemplate_1['default']['code'](_0x118ff7, _0x2c8f94),
      'subject': _0x18e304,
      'fromTitle': _0x2c8f94,
      'options': _0x9a1483
    });
  }

  if (_0x240540?.["code"]) {
    _0x87b76c["json"](_0x240540);

    return;
  }

  await redis_1['default']['select'](0)['setex']('code:' + _0x3312b1, _0x118ff7, 600);

  _0x87b76c["json"]((0, utils_1["httpBody"])(0, "发送成功"));
});
const upload_1 = tslib_1['__importDefault'](require("../../helpers/upload")),
      multer_1 = tslib_1["__importDefault"](require("multer")),
      multerStorage = (0, multer_1['default'])();
router["post"]("/upload", multerStorage["single"]('file'), async (_0x34467b, _0x19b86e, _0x594e94) => {
  const _0x39d527 = _0x34467b?.['user_id'];

  if (!_0x39d527) {
    _0x19b86e["status"](500)["json"]((0, utils_1["httpBody"])(-1, "请重新登录后重试"));

    return;
  }

  const _0x2b95d9 = _0x34467b['file'];

  if (!_0x2b95d9) {
    _0x19b86e["json"]((0, utils_1["httpBody"])(401, [], "缺少必要文件（file）"));

    return;
  }

  const _0x4c9c7b = await models_1['configModel']["getConfigValue"]("cloud_storage"),
        _0x42b31d = _0x4c9c7b ? JSON['parse'](_0x4c9c7b) : {},
        _0x40de1c = {
    "user_id": _0x39d527
  };

  const _0x375147 = await (0, upload_1['default'])(_0x2b95d9, {
    'host': _0x34467b['get']("host"),
    ..._0x42b31d
  }, _0x40de1c);

  _0x19b86e['json'](_0x375147);
});
exports["default"] = router;