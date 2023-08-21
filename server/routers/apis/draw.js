'use strict';

const a109_0x29acfc = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a109_0x29acfc);

const tslib_1 = require('tslib'),
      express_1 = tslib_1["__importDefault"](require("express")),
      multer_1 = tslib_1["__importDefault"](require('multer')),
      models_1 = require("../../models"),
      draw_1 = tslib_1["__importDefault"](require("../../helpers/draw")),
      textModeration_1 = tslib_1["__importDefault"](require("../../helpers/textModeration")),
      utils_1 = require("../../utils"),
      upload_1 = tslib_1['__importDefault'](require('../../helpers/upload')),
      multerStorage = (0, multer_1["default"])({
  'storage': multer_1["default"]["memoryStorage"]()
}),
      router = express_1["default"]["Router"]();

router['post']('/images/generations', multerStorage["any"](), async (_0x5695b4, _0xb9455f, _0x1fdc90) => {
  const _0x5ae565 = new Date()["getTime"](),
        _0x11de36 = _0x5695b4?.["user_id"];

  if (!_0x11de36) {
    _0xb9455f["status"](500)['json']((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "draw_type": _0x3360f5,
    "quantity": _0xfeea3b,
    "width": _0x5ecd89,
    "prompt": _0x275fcc
  } = _0x5695b4["body"],
        _0x245f56 = {
    'id': _0x11de36
  };

  const _0x5e583d = await models_1["userModel"]["getUserInfo"](_0x245f56),
        _0x58709d = await models_1["configModel"]["getConfigValue"]("cloud_storage"),
        _0x1e070f = _0x58709d ? JSON['parse'](_0x58709d) : {},
        _0x5cb273 = _0x5695b4["files"]?.[0] || '';

  let _0x20e243 = null;

  if (_0x5cb273) {
    const _0x222976 = {
      'user_id': _0x11de36
    };

    const _0x47e2d5 = await (0, upload_1['default'])(_0x5cb273, {
      'host': _0x5695b4["get"]("host"),
      ..._0x1e070f
    }, _0x222976);

    if (!_0x47e2d5["code"]) {
      const _0x30eb9b = { ..._0x47e2d5["data"]
      };
      _0x20e243 = _0x30eb9b;
    }
  }

  const _0x58c4cd = (0, utils_1["getClientIP"])(_0x5695b4),
        _0x5854fe = (await models_1['configModel']["getConfigValue"]("draw_price")["then"](_0x54466e => {
    return _0x54466e?.["toString"]();
  })) || 0,
        _0x5af722 = Number(_0x5854fe) * 7,
        _0x160c0a = new Date();

  _0x160c0a['setHours'](0, 0, 0, 0);

  const _0x5ce69f = _0x160c0a["getTime"](),
        _0x5ee613 = new Date(_0x5e583d["vip_expire_time"])['getTime']();

  if (!(_0x5e583d["integral"] > _0x5af722 || _0x5ee613 >= _0x5ce69f)) {
    _0xb9455f['status'](400)["json"]((0, utils_1["httpBody"])(-1, [], '当前账户积分余额不足，绘画最低消耗' + _0x5af722 + '积分'));

    return;
  }

  const _0x30a075 = new Date(_0x5e583d["svip_expire_time"])["getTime"]();

  if (_0x3360f5 === "stablediffusion" && _0x30a075 < _0x5ce69f && _0x5e583d["integral"] <= _0x5af722) {
    _0xb9455f["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "当前账户积分不足或不是超级会员无法使用SD绘画"));

    return;
  }

  const _0x3763c5 = await models_1["configModel"]["getConfigValue"]("tuputech_key"),
        _0x26510a = await models_1["configModel"]['getConfigValue']("prohibited_words");

  if (_0x3763c5) {
    const {
      "action": _0x1a480c,
      "details": _0x1f435c
    } = await textModeration_1["default"]["tuputech"](_0x3763c5, _0x275fcc),
          _0x230403 = Array['isArray'](_0x1f435c) ? _0x1f435c?.["map"](_0x9d6100 => _0x9d6100["hint"]) : [];

    if (_0x1a480c !== "pass") {
      _0xb9455f["status"](500)['json']((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + _0x230403["join"]("`、`") + '`'));

      return;
    }
  } else {
    if (_0x26510a) {
      const {
        "action": _0x3e2286,
        "matchedWords": matchedWords = []
      } = await (0, utils_1["checkProhibitedWords"])(_0x275fcc, _0x26510a);

      if (_0x3e2286 !== "pass") {
        _0xb9455f["status"](500)['json']((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + matchedWords["join"]("`、`") + '`'));

        return;
      }
    }
  }

  let _0x380994 = (0, utils_1["httpBody"])(-1, [], "生成失败");

  if (_0x3360f5 === "openai") {
    const _0x3df5ba = {
      'model': "dall-e",
      "type": "openai"
    };

    const _0x47fc4d = await models_1["aikeyModel"]["getOneAikey"](_0x3df5ba);

    if (!_0x47fc4d || !_0x47fc4d['id']) {
      _0xb9455f["status"](500)['json']((0, utils_1['httpBody'])(-1, "未配置对应模型"));

      return;
    }

    const _0x2ed490 = [256, 512, 1024];
    let _0x2020a6 = "256x256";

    if (_0x2ed490["includes"](Number(_0x5ecd89))) {
      _0x2020a6 = _0x5ecd89 + 'x' + _0x5ecd89;
    }

    const _0x3fe46a = {
      "prompt": _0x275fcc,
      "size": _0x2020a6,
      'n': _0xfeea3b,
      "aikeyInfo": _0x47fc4d
    };
    _0x380994 = await draw_1["default"]["openAi"](_0x3fe46a);
  }

  if (_0x3360f5 === "stablediffusion") {
    const _0x54443f = {
      "type": "stability"
    };

    const _0x290ca8 = await models_1["aikeyModel"]["getOneAikey"](_0x54443f);

    if (!_0x290ca8 || !_0x290ca8['id']) {
      _0xb9455f["status"](500)["json"]((0, utils_1["httpBody"])(-1, '未配置对应模型'));

      return;
    }

    const _0xe0aafc = {
      "prompt": _0x275fcc,
      "width": _0x5ecd89,
      'height': _0x5695b4["body"]["height"],
      "samples": _0x5695b4["body"]["quantity"],
      "cfg_scale": _0x5695b4["body"]["quality"],
      "style_preset": _0x5695b4["body"]['style'],
      'steps': _0x5695b4["body"]["steps"],
      'init_image': _0x20e243?.['buffer'] || ''
    };
    const _0x19b922 = {
      "request": _0xe0aafc,
      'aikeyInfo': _0x290ca8
    };
    _0x380994 = await draw_1['default']["stability"](_0x19b922);
  }

  if (_0x380994['code'] || !_0x380994["data"]) {
    _0xb9455f["status"](500)["json"](_0x380994);

    return;
  }

  const _0x2e1ef3 = [];

  for (const _0x216e33 of _0x380994["data"]) {
    const _0x584e11 = (0, utils_1["dataURItoFile"])(_0x216e33?.["url"]),
          _0x41d120 = {
      "user_id": _0x11de36
    };

    const _0x2d0517 = await (0, upload_1["default"])(_0x584e11, {
      'host': _0x5695b4["get"]("host"),
      ..._0x1e070f
    }, _0x41d120),
          _0x3a0c73 = { ..._0x2d0517["data"]
    };

    _0x2e1ef3["push"](_0x3a0c73);
  }

  if (_0x2e1ef3["length"] > 0) {
    const _0x36c32f = (0, utils_1["generateNowflakeId"])(1)();

    _0x380994['data'] = [{
      'id': _0x36c32f,
      'user_id': _0x11de36,
      'inset_image_url': _0x20e243?.["url"],
      'images': _0x2e1ef3["map"](_0x49e5d6 => _0x49e5d6["url"]),
      'prompt': _0x275fcc,
      'size': _0x5695b4["body"]["height"] ? _0x5ecd89 + 'x' + _0x5695b4["body"]["height"] : _0x5ecd89 + 'x' + _0x5ecd89,
      'status': 4,
      'take_time': Math["ceil"]((new Date()['getTime']() - _0x5ae565) / 1000),
      'model': _0x3360f5,
      'create_time': (0, utils_1["formatTime"])()
    }];
    await models_1["drawRecordModel"]['addDrawRecord']({
      'id': _0x36c32f,
      'user_id': _0x11de36,
      'inset_image_url': _0x20e243?.["url"],
      'images': JSON['stringify'](_0x2e1ef3["map"](_0x3dc111 => _0x3dc111["url"])),
      'prompt': _0x275fcc,
      'size': _0x5695b4["body"]['height'] ? _0x5ecd89 + 'x' + _0x5695b4["body"]["height"] : _0x5ecd89 + 'x' + _0x5ecd89,
      'status': 4,
      'take_time': Math['ceil']((new Date()["getTime"]() - _0x5ae565) / 1000),
      'model': _0x3360f5,
      'params': JSON["stringify"]((0, utils_1['filterObjectNull'])({ ..._0x5695b4["body"],
        'image': null
      }))
    });
  }

  const _0x38d3a8 = new Date()["getTime"](),
        _0x525e60 = Math["ceil"]((_0x38d3a8 - _0x5ae565) / 1000) * Math["ceil"](Number(_0x5854fe));

  if (_0x5ee613 < _0x5ce69f) {
    const _0x59d70b = {
      'id': _0x11de36,
      "type": "integral",
      "value": _0x525e60,
      "operate": "decrement"
    };
    models_1["userModel"]['updataUserVIP'](_0x59d70b);

    const _0x49b4c3 = (0, utils_1["generateNowflakeId"])(1)(),
          _0x226ab4 = {
      'id': _0x49b4c3,
      'user_id': _0x11de36,
      'describe': '绘画',
      "value": '-' + _0x525e60 + '积分'
    };

    models_1["turnoverModel"]['addTurnover'](_0x226ab4);
  }

  models_1["actionModel"]["addAction"]({
    'user_id': _0x11de36,
    'id': (0, utils_1["generateNowflakeId"])(23)(),
    'ip': _0x58c4cd,
    'type': "draw",
    'describe': '绘画'
  });

  _0xb9455f["json"](_0x380994);
});
router["get"]('/images', async (_0x55119a, _0x5d26e6, _0x478a18) => {
  const _0x1dfa73 = {
    'page': _0x55119a["query"]["page"],
    'page_size': _0x55119a["query"]["page_size"]
  };

  const {
    "page": _0x58734f,
    "page_size": _0xa6c24b
  } = (0, utils_1["pagingData"])(_0x1dfa73),
        {
    "type": type = "gallery"
  } = _0x55119a["query"],
        _0x21f0e9 = _0x55119a?.['user_id'];

  if (type === 'me' && !_0x21f0e9) {
    _0x5d26e6["status"](401)['json']((0, utils_1["httpBody"])(4001, "请登陆后重试！"));

    return;
  }

  const _0xe3d34 = {
    "page": _0x58734f,
    "page_size": _0xa6c24b,
    "type": type,
    'user_id': _0x21f0e9
  };

  const _0xae7500 = await models_1["drawRecordModel"]["getDrawRecord"](_0xe3d34);

  _0x5d26e6["json"]((0, utils_1["httpBody"])(0, _0xae7500));
});
router['put']("/images", async (_0x3cec05, _0x558ebf, _0x4af45c) => {
  const {
    "id": _0x2790ef,
    "status": status = 0
  } = _0x3cec05["body"],
        _0xdbe142 = _0x3cec05?.['user_id'];

  if (!_0xdbe142) {
    _0x558ebf["status"](401)["json"]((0, utils_1['httpBody'])(4001, "请登陆后重试！"));

    return;
  }

  const _0x402a2b = {
    "status": status,
    'id': _0x2790ef,
    "user_id": _0xdbe142
  };
  await models_1["drawRecordModel"]["setDrawRecord"](_0x402a2b);

  _0x558ebf['json']((0, utils_1["httpBody"])(0, "清理成功"));
});
exports["default"] = router;