'use strict';

const a111_0x131eee = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a111_0x131eee);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      multer_1 = tslib_1["__importDefault"](require('multer')),
      models_1 = require("../../models"),
      draw_1 = tslib_1['__importDefault'](require("../../helpers/draw")),
      gpt_tokens_1 = require("gpt-tokens"),
      utils_1 = require("../../utils"),
      utils_2 = require('../../utils'),
      stream_1 = require("stream"),
      node_fetch_1 = tslib_1["__importDefault"](require('node-fetch')),
      textModeration_1 = tslib_1["__importDefault"](require('../../helpers/textModeration')),
      multerStorage = (0, multer_1["default"])({
  'storage': multer_1["default"]["memoryStorage"]()
}),
      router = express_1["default"]["Router"]();

router['post']('/images/generations', multerStorage["any"](), async (_0xa6e816, _0x19a25c, _0x22a90b) => {
  const _0x3c2e74 = new Date()["getTime"](),
        _0x5b8a2a = _0xa6e816?.["user_id"];

  if (!_0x5b8a2a) {
    _0x19a25c["status"](500)["json"]((0, utils_1['httpBody'])(-1, "服务端错误"));

    return;
  }

  const {
    "draw_type": _0x48b299,
    "quantity": _0x59429a,
    "width": _0x308921,
    "prompt": _0x2f0e60
  } = _0xa6e816["body"],
        _0x36e01f = {
    'id': _0x5b8a2a
  };

  const _0x3c50e1 = await models_1["userModel"]["getUserInfo"](_0x36e01f),
        _0x22f134 = (0, utils_1["getClientIP"])(_0xa6e816),
        _0x3f925b = (await models_1["configModel"]['getConfigValue']("draw_price")["then"](_0x5003d6 => {
    return _0x5003d6?.['toString']();
  })) || 0,
        _0x19eef3 = Number(_0x3f925b) * 7,
        _0x5991ee = new Date();

  _0x5991ee["setHours"](0, 0, 0, 0);

  const _0x51bfba = _0x5991ee["getTime"](),
        _0x4f108b = new Date(_0x3c50e1["vip_expire_time"])["getTime"]();

  if (!(_0x3c50e1['integral'] > _0x19eef3 || _0x4f108b >= _0x51bfba)) {
    _0x19a25c["status"](400)['json']((0, utils_1["httpBody"])(-1, [], "当前账户积分余额不足，绘画最低消耗" + _0x19eef3 + '积分'));

    return;
  }

  const _0x2e02d4 = new Date(_0x3c50e1['svip_expire_time'])["getTime"]();

  if (_0x48b299 === "stablediffusion" && _0x2e02d4 < _0x51bfba && _0x3c50e1['integral'] <= _0x19eef3) {
    _0x19a25c["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "当前账户积分不足或不是超级会员无法使用SD绘画"));

    return;
  }

  let _0x512127 = (0, utils_1["httpBody"])(-1, [], "生成失败");

  if (_0x48b299 === "openai") {
    const _0x3e8b07 = {
      "model": "dall-e",
      "type": "openai"
    };

    const _0x34b218 = await models_1["aikeyModel"]["getOneAikey"](_0x3e8b07);

    if (!_0x34b218 || !_0x34b218['id']) {
      _0x19a25c["status"](500)["json"]((0, utils_1['httpBody'])(-1, "未配置对应模型"));

      return;
    }

    const _0x1d443b = [256, 512, 1024];
    let _0x122323 = "256x256";

    if (_0x1d443b["includes"](Number(_0x308921))) {
      _0x122323 = _0x308921 + 'x' + _0x308921;
    }

    const _0xa8251e = {
      "prompt": _0x2f0e60,
      'size': _0x122323,
      'n': _0x59429a,
      "aikeyInfo": _0x34b218
    };
    _0x512127 = await draw_1["default"]["openAi"](_0xa8251e);
  }

  if (_0x48b299 === "stablediffusion") {
    const _0x4d461d = {
      'type': "stability"
    };

    const _0x501764 = await models_1["aikeyModel"]["getOneAikey"](_0x4d461d);

    if (!_0x501764 || !_0x501764['id']) {
      _0x19a25c["status"](500)["json"]((0, utils_1["httpBody"])(-1, "未配置对应模型"));

      return;
    }

    const _0x52ebb3 = _0xa6e816["files"]?.[0]?.["buffer"] || '',
          _0x352019 = {
      "prompt": _0x2f0e60,
      "width": _0x308921,
      'height': _0xa6e816["body"]["height"],
      "samples": _0xa6e816["body"]["quantity"],
      "cfg_scale": _0xa6e816['body']['quality'],
      "style_preset": _0xa6e816["body"]["style"],
      'steps': _0xa6e816["body"]["steps"],
      'init_image': _0x52ebb3
    };

    const _0x1e1d90 = {
      "request": _0x352019,
      "aikeyInfo": _0x501764
    };
    _0x512127 = await draw_1["default"]["stability"](_0x1e1d90);
  }

  _0x512127["code"] && _0x19a25c['status'](500)["json"](_0x512127);

  const _0x3b0e7e = new Date()["getTime"](),
        _0x1d2f9d = Math['ceil']((_0x3b0e7e - _0x3c2e74) / 1000) * Math["ceil"](Number(_0x3f925b));

  if (_0x4f108b < _0x51bfba) {
    const _0xa6f57e = {
      'id': _0x5b8a2a,
      "type": "integral",
      "value": _0x1d2f9d,
      "operate": "decrement"
    };
    models_1["userModel"]['updataUserVIP'](_0xa6f57e);

    const _0x418bc3 = (0, utils_1['generateNowflakeId'])(1)(),
          _0x6d58b8 = {
      'id': _0x418bc3,
      "user_id": _0x5b8a2a,
      'describe': '绘画',
      "value": '-' + _0x1d2f9d + '积分'
    };

    models_1["turnoverModel"]["addTurnover"](_0x6d58b8);
  }

  models_1['actionModel']["addAction"]({
    'user_id': _0x5b8a2a,
    'id': (0, utils_1['generateNowflakeId'])(23)(),
    'ip': _0x22f134,
    'type': "draw",
    'describe': '绘画'
  });

  _0x19a25c['json'](_0x512127);
});
router["post"]("/chat/completion", async (_0x25b104, _0x28c7e3, _0x4e2b63) => {
  const _0x576904 = _0x25b104?.["user_id"];

  if (!_0x576904) {
    _0x28c7e3["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "prompt": _0x4dea3d,
    "type": type = "draw"
  } = _0x25b104["body"],
        _0x4e311e = (0, utils_1["getClientIP"])(_0x25b104),
        _0x27fd1d = [],
        _0x43fc04 = {
    "status": 1,
    'system': 1
  };

  const _0x5316e3 = await models_1["personaModel"]["getPersonaContext"](_0x43fc04);

  _0x27fd1d['push'](..._0x5316e3);

  if (type === "draw") {
    const _0x111216 = {
      'role': "system",
      "content": "你需要为我生成AI绘画提示词，回答的形式是：(image we're prompting), (7 descriptivekeywords), (time of day), (Hd degree).这是一段段按照上述形式的示例问答：问题：参考以上midjoruney prompt formula写1个midjourney prompt内容，用英文回复，不要括号，内容：宫崎骏风格的春天小镇回答：英文：Miyazaki Hayao-style town,Green willow and red flowers, breeze coming, dreamy colors, fantastic elements, fairy-tale situation, warm breath, shooting in the evening, 4K ultra HD 现在严格参考以上的示例回答形式和风格（这很重要）。"
    };
    const _0x1d8272 = {
      "role": "user",
      "content": "请根据以下的内容生成提示词(直接以英文输出，需要补全):" + _0x4dea3d
    };

    _0x27fd1d["push"](_0x111216, _0x1d8272);
  } else {
    if (type === "mapping") {
      const _0x21965e = {
        'role': "system",
        "content": "You are ChatGPT, a large language model trained by OpenAI. Please carefully follow the user's instructions. I need to use the Xmind tool to create a mind map, and you need to provide text in Markdown format that is compatible with Xmind."
      };
      const _0x10dd04 = {
        "role": "user",
        "content": _0x4dea3d
      };

      _0x27fd1d["push"](_0x21965e, _0x10dd04);
    } else {
      const _0x5a672d = {
        'role': "user",
        'content': _0x4dea3d
      };

      _0x27fd1d["push"](_0x5a672d);
    }
  }

  const _0x85a997 = {
    'model': "gpt-3.5-turbo-16k"
  };
  const _0x1837a6 = {
    'id': _0x576904
  };

  const _0x52f8b7 = await models_1["userModel"]["getUserInfo"](_0x1837a6),
        _0x582209 = new Date();

  _0x582209['setHours'](0, 0, 0, 0);

  const _0x3a0519 = _0x582209["getTime"](),
        _0x1fb070 = new Date(_0x52f8b7["vip_expire_time"])["getTime"](),
        _0x17bd0e = new Date(_0x52f8b7["svip_expire_time"])["getTime"](),
        _0x15c658 = (await models_1["configModel"]["getConfigValue"]("ai3_ratio")) || 0,
        _0x29d3a7 = Number(_0x15c658),
        _0x39acec = {
    'model': "gpt-3.5-turbo-16k",
    "messages": [..._0x27fd1d]
  };

  const _0x101113 = new gpt_tokens_1["GPTTokens"](_0x39acec),
        _0x508e38 = _0x101113["usedTokens"],
        _0x2552d8 = _0x29d3a7 ? Math['ceil'](_0x508e38 / _0x29d3a7) : 0;

  if (!(_0x52f8b7["integral"] > _0x2552d8 || _0x1fb070 >= _0x3a0519 || _0x17bd0e >= _0x3a0519)) {
    _0x28c7e3["status"](400)['json']((0, utils_1["httpBody"])(-1, [], "账户积分余额不足, 请充值后在使用。"));

    return;
  }

  const _0x5c217d = {
    "model": "gpt-3.5-turbo-16k"
  };

  const _0x1072af = await models_1["aikeyModel"]['getOneAikey'](_0x5c217d);

  if (!_0x1072af || !_0x1072af['id']) {
    _0x28c7e3["status"](500)["json"]((0, utils_1["httpBody"])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x3dd9b8 = { ..._0x85a997,
    "messages": _0x27fd1d,
    "stream": true
  };

  const _0xc94289 = await (0, node_fetch_1["default"])(_0x1072af["host"] + '/v1/chat/completions', {
    'method': "POST",
    'body': JSON["stringify"](_0x3dd9b8),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x1072af["key"]
    }
  }),
        _0x1609eb = type === 'draw' ? "绘画文案优化" : type === "mapping" ? "生成思维导图" : '对话';

  if (_0xc94289["status"] === 200 && _0xc94289["headers"]['get']("content-type")?.["includes"]("text/event-stream")) {
    let _0x2aefb2 = '';

    _0x28c7e3['setHeader']("Content-Type", "text/event-stream;charset=utf-8");

    const _0x21ef3c = new stream_1["Transform"]({
      'objectMode': true,

      'transform'(_0x244a4d, _0x262c9f, _0x14802d) {
        const _0x3fc7f8 = Buffer["from"](_0x244a4d)["toString"](),
              _0x533bb4 = (0, utils_1["handleChatData"])(_0x3fc7f8, "assistantMessageId"),
              _0x1d91aa = _0x533bb4["split"]("\n\n");

        for (let _0x335389 = 0; _0x335389 < _0x1d91aa['length']; _0x335389++) {
          if (_0x1d91aa[_0x335389]) {
            const _0x41227a = JSON["parse"](_0x1d91aa[_0x335389]);

            if (_0x41227a["segment"] === "stop" && !(_0x17bd0e > _0x3a0519 || _0x1fb070 > _0x3a0519)) {
              const _0x15710e = {
                'role': "assistant",
                "content": _0x2aefb2
              };
              const _0xa2af71 = {
                "model": "gpt-3.5-turbo-16k",
                'messages': [..._0x27fd1d, _0x15710e]
              };

              const _0x10b520 = new gpt_tokens_1['GPTTokens'](_0xa2af71),
                    _0x14988c = _0x10b520["usedTokens"],
                    _0x5448a2 = _0x29d3a7 ? Math["ceil"](_0x14988c / _0x29d3a7) : 0,
                    _0x404fd6 = {
                'id': _0x576904,
                "type": "integral",
                "value": _0x5448a2,
                "operate": "decrement"
              };

              models_1['userModel']["updataUserVIP"](_0x404fd6);

              const _0x37ce14 = (0, utils_1['generateNowflakeId'])(1)(),
                    _0x56ab9f = {
                'id': _0x37ce14,
                'user_id': _0x576904,
                "describe": _0x1609eb,
                "value": '-' + _0x5448a2 + '积分'
              };

              models_1["turnoverModel"]["addTurnover"](_0x56ab9f);
              models_1['actionModel']['addAction']({
                'user_id': _0x576904,
                'id': (0, utils_1['generateNowflakeId'])(23)(),
                'ip': _0x4e311e,
                'type': "chat",
                'describe': '' + type + _0x1609eb + '(' + "gpt-3.5-turbo-16k" + ')'
              });
            } else {
              _0x2aefb2 += _0x41227a["content"];
            }
          }
        }

        _0x14802d(null, _0x533bb4);
      }

    });

    _0xc94289['body']?.["pipe"](_0x21ef3c)["pipe"](_0x28c7e3);
    return;
  }

  const _0x2cb48b = await _0xc94289['json']();

  _0x28c7e3["status"](_0xc94289["status"])["json"](_0x2cb48b);
});
router['post']("/chat/completions", async (_0x1a883f, _0x58e2d1, _0x2c8929) => {
  const _0xca4d66 = _0x1a883f?.['user_id'];

  if (!_0xca4d66) {
    _0x58e2d1["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0xbf331d = {
    'id': _0xca4d66
  };

  const _0x282fa9 = await models_1['userModel']["getUserInfo"](_0xbf331d),
        _0x2006aa = (0, utils_1['getClientIP'])(_0x1a883f),
        {
    "prompt": _0x5096f3,
    "parentMessageId": _0x6afb11,
    "persona_id": persona_id = null
  } = _0x1a883f["body"],
        _0x3b3707 = {
    'frequency_penalty': 0,
    'model': "gpt-3.5-turbo-16k",
    'presence_penalty': 0,
    'temperature': 0,
    ..._0x1a883f['body']["options"],
    'max_tokens': null
  };

  const _0xf8fbdc = {
    "status": 1,
    "system": 1
  };

  const _0x1d3bbd = await models_1['personaModel']['getPersonaContext'](_0xf8fbdc),
        _0x363ef6 = {
    'id': persona_id,
    "status": 1,
    "system": 0
  };

  const _0x51bbec = await models_1["personaModel"]['getPersonaContext'](_0x363ef6),
        _0x55aec7 = await models_1["configModel"]["getConfigValue"]("ai3_carry_count"),
        _0x646f7a = await models_1["configModel"]["getConfigValue"]("ai4_carry_count");

  let _0x7eac63 = Number(_0x55aec7) || 0;

  _0x3b3707["model"]["indexOf"]("gpt-4") !== -1 && (_0x7eac63 = Number(_0x646f7a) || 0);
  const _0x2f3ba8 = {
    "user_id": _0xca4d66,
    "parent_message_id": _0x6afb11,
    'status': 1
  };

  const _0x13af65 = await models_1["messageModel"]["getMessages"]({
    'page': 0,
    'page_size': Number(_0x7eac63)
  }, _0x2f3ba8),
        _0x77031b = _0x13af65["rows"]["map"](_0x335efc => {
    return {
      'role': _0x335efc["toJSON"]()['role'],
      'content': _0x335efc["toJSON"]()["content"]
    };
  })["reverse"](),
        _0x24c394 = {
    'role': "user",
    'content': _0x5096f3
  };

  const _0x379193 = [..._0x1d3bbd, ..._0x51bbec, ..._0x77031b, _0x24c394],
        _0x3fa024 = (await models_1["configModel"]['getConfigValue']("ai3_ratio")) || 0,
        _0x5d433d = (await models_1["configModel"]['getConfigValue']("ai4_ratio")) || 0,
        _0x1ee3ac = {
    "ai3_ratio": _0x3fa024,
    "ai4_ratio": _0x5d433d
  };

  const _0x27a74d = {
    "model": _0x3b3707["model"],
    'messages': [..._0x379193]
  };

  const _0x5f2bca = new gpt_tokens_1["GPTTokens"](_0x27a74d),
        _0x4d22a9 = _0x5f2bca["usedTokens"];

  let _0x34eab5 = Number(_0x1ee3ac["ai3_ratio"]);

  if (_0x3b3707['model']["indexOf"]("gpt-4") !== -1) {
    _0x34eab5 = Number(_0x1ee3ac["ai4_ratio"]);
  }

  const _0x504a74 = _0x34eab5 ? Math['ceil'](_0x4d22a9 / _0x34eab5) : 0,
        _0x4a367a = new Date();

  _0x4a367a["setHours"](0, 0, 0, 0);

  const _0x2411d5 = _0x4a367a['getTime'](),
        _0x56b30e = new Date(_0x282fa9["vip_expire_time"])["getTime"](),
        _0x323465 = new Date(_0x282fa9["svip_expire_time"])["getTime"]();

  if (!(_0x282fa9["integral"] > _0x504a74 || _0x56b30e >= _0x2411d5 || _0x323465 >= _0x2411d5)) {
    _0x58e2d1["status"](400)['json']((0, utils_1["httpBody"])(-1, [], "账户积分余额不足, 请充值后在使用。"));

    return;
  }

  if (_0x3b3707["model"]["includes"]("gpt-4") && _0x323465 < _0x2411d5) {
    _0x58e2d1["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "GPT4为超级会员使用或用积分"));

    return;
  }

  const _0x32bc90 = {
    'model': _0x3b3707["model"]
  };

  const _0x39ab35 = await models_1['aikeyModel']["getOneAikey"](_0x32bc90);

  if (!_0x39ab35 || !_0x39ab35['id']) {
    _0x58e2d1["status"](500)["json"]((0, utils_1["httpBody"])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x223821 = (0, utils_1["generateNowflakeId"])(2)(),
        _0x29212b = (0, utils_1['generateNowflakeId'])(1)(),
        _0xe2b389 = {
    'user_id': _0xca4d66,
    'id': _0x29212b,
    'role': "user",
    'content': _0x5096f3,
    'parent_message_id': _0x6afb11,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x3b3707
  },
        _0x1c9525 = {
    'user_id': _0xca4d66,
    'id': _0x223821,
    'role': "assistant",
    'content': '',
    'parent_message_id': _0x6afb11,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x3b3707
  },
        _0x46178b = await models_1['dialogModel']['getOneDialogInfo']({
    'issue': _0x5096f3,
    'model': _0x3b3707["model"]['substring'](0, 5)
  });

  if (_0x46178b && _0x46178b["answer"]) {
    const _0x394069 = _0x46178b?.["answer"] || '';

    _0x1c9525["content"] = _0x394069;
    const _0x136cba = {
      "Content-Type": "text/event-stream",
      'Cache-Control': "no-cache",
      "Connection": "keep-alive"
    };

    _0x58e2d1['writeHead'](200, _0x136cba);

    const _0x4bf8b1 = (0, utils_1["generateUUID"])(),
          _0x1bfd2a = _0x46178b["delay"] || 0,
          _0x2ba454 = async () => {
      for (let _0x427bf1 = 0; _0x427bf1 < _0x394069["length"]; _0x427bf1++) {
        await new Promise(_0x318ecc => setTimeout(_0x318ecc, Math["random"]() * _0x1bfd2a));

        const _0x484701 = JSON["stringify"]({
          'id': _0x4bf8b1,
          'role': "assistant",
          'segment': _0x427bf1 ? "text" : "start",
          'dateTime': (0, utils_2['formatTime'])(),
          'content': _0x394069[_0x427bf1],
          'parentMessageId': _0x6afb11
        }) + "\n\n";

        _0x58e2d1["write"](_0x484701);
      }

      const _0x591752 = JSON["stringify"]({
        'id': _0x4bf8b1,
        'role': "assistant",
        'segment': "end",
        'dateTime': (0, utils_2["formatTime"])(),
        'content': '',
        'parentMessageId': _0x6afb11
      }) + "\n\n";

      _0x58e2d1["write"](_0x591752);

      await models_1['messageModel']["addMessages"]([_0xe2b389, { ..._0x1c9525,
        'create_time': (0, utils_2["formatTime"])()
      }]);

      if (_0x3b3707["model"]["includes"]("gpt-4") && _0x323465 < _0x2411d5 || !_0x3b3707["model"]["includes"]("gpt-4") && _0x56b30e < _0x2411d5) {
        const _0x633708 = {
          "role": "assistant",
          "content": _0x1c9525['content']
        };
        const _0x57e5af = {
          'model': _0x3b3707["model"],
          'messages': [..._0x379193, _0x633708]
        };

        const _0x461a87 = new gpt_tokens_1["GPTTokens"](_0x57e5af),
              _0x51af6a = _0x461a87["usedTokens"],
              _0xf7cf83 = _0x34eab5 ? Math["ceil"](_0x51af6a / _0x34eab5) : 0,
              _0x41d806 = {
          'id': _0xca4d66,
          "type": "integral",
          "value": _0xf7cf83,
          "operate": "decrement"
        };

        models_1["userModel"]["updataUserVIP"](_0x41d806);

        const _0x40f493 = (0, utils_1['generateNowflakeId'])(1)(),
              _0x5ae2a1 = {
          'id': _0x40f493,
          "user_id": _0xca4d66,
          'describe': "对话(" + _0x3b3707['model'] + ')',
          "value": '-' + _0xf7cf83 + '积分'
        };

        models_1['turnoverModel']['addTurnover'](_0x5ae2a1);
      }

      _0x58e2d1["end"]();
    };

    await _0x2ba454();
    return;
  }

  const _0x451bfa = await models_1["configModel"]['getConfigValue']("tuputech_key"),
        _0x4b248c = await models_1['configModel']["getConfigValue"]("prohibited_words");

  if (_0x451bfa) {
    const {
      "action": _0x33df06,
      "details": _0x7f5bf4
    } = await textModeration_1["default"]['tuputech'](_0x451bfa, _0x5096f3),
          _0x58cfe9 = Array["isArray"](_0x7f5bf4) ? _0x7f5bf4?.["map"](_0x926548 => _0x926548['hint']) : [];

    if (_0x33df06 !== 'pass') {
      _0x58e2d1["status"](500)["json"]((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + _0x58cfe9["join"]("`、`") + '`'));

      return;
    }
  } else {
    if (_0x4b248c) {
      const {
        "action": _0x345b78,
        "matchedWords": matchedWords = []
      } = await (0, utils_1['checkProhibitedWords'])(_0x5096f3, _0x4b248c);

      if (_0x345b78 !== "pass") {
        _0x58e2d1["status"](500)["json"]((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + matchedWords["join"]("`、`") + '`'));

        return;
      }
    }
  }

  const _0x2ee639 = { ..._0x3b3707,
    "messages": _0x379193,
    "stream": true
  };

  const _0x431b78 = await (0, node_fetch_1['default'])(_0x39ab35["host"] + "/v1/chat/completions", {
    'method': "POST",
    'body': JSON["stringify"](_0x2ee639),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x39ab35["key"]
    }
  });

  if (_0x431b78["status"] === 200 && _0x431b78["headers"]['get']('content-type')?.['includes']('text/event-stream')) {
    _0x58e2d1["setHeader"]("Content-Type", 'text/event-stream;charset=utf-8');

    const _0x52cd12 = new stream_1["Transform"]({
      'objectMode': true,

      'transform'(_0x5b61de, _0x5aafee, _0x348eb7) {
        const _0x210a99 = Buffer["from"](_0x5b61de)["toString"](),
              _0x20cf99 = (0, utils_1["handleChatData"])(_0x210a99, _0x223821),
              _0x3f0cd6 = _0x20cf99["split"]("\n\n");

        for (let _0x1fd37c = 0; _0x1fd37c < _0x3f0cd6["length"]; _0x1fd37c++) {
          if (_0x3f0cd6[_0x1fd37c]) {
            const _0x56f551 = JSON["parse"](_0x3f0cd6[_0x1fd37c]);

            if (_0x56f551["segment"] === "stop") {
              if (_0x3b3707["model"]["includes"]("gpt-4") && _0x323465 < _0x2411d5 || !_0x3b3707["model"]["includes"]("gpt-4") && _0x56b30e < _0x2411d5) {
                const _0x2547d5 = {
                  "role": "assistant",
                  'content': _0x1c9525["content"]
                };
                const _0x38f77f = {
                  'model': _0x3b3707["model"],
                  "messages": [..._0x379193, _0x2547d5]
                };

                const _0x1c5c49 = new gpt_tokens_1['GPTTokens'](_0x38f77f),
                      _0x3dd645 = _0x1c5c49["usedTokens"],
                      _0x331d26 = _0x34eab5 ? Math["ceil"](_0x3dd645 / _0x34eab5) : 0,
                      _0x2777af = {
                  'id': _0xca4d66,
                  "type": "integral",
                  "value": _0x331d26,
                  "operate": "decrement"
                };

                models_1['userModel']["updataUserVIP"](_0x2777af);

                const _0x28956f = (0, utils_1['generateNowflakeId'])(1)(),
                      _0xa5594e = {
                  'id': _0x28956f,
                  "user_id": _0xca4d66,
                  "describe": "对话(" + _0x3b3707['model'] + ')',
                  'value': '-' + _0x331d26 + '积分'
                };

                models_1["turnoverModel"]['addTurnover'](_0xa5594e);
              }

              models_1["messageModel"]["addMessages"]([_0xe2b389, { ..._0x1c9525,
                'create_time': (0, utils_2["formatTime"])()
              }]);
              models_1["actionModel"]['addAction']({
                'user_id': _0xca4d66,
                'id': (0, utils_1['generateNowflakeId'])(23)(),
                'ip': _0x2006aa,
                'type': "chat",
                'describe': "对话(" + _0x3b3707["model"] + ')'
              });
            } else {
              _0x1c9525["content"] += _0x56f551['content'];
            }
          }
        }

        _0x348eb7(null, _0x20cf99);
      }

    });

    _0x431b78["body"]?.["pipe"](_0x52cd12)["pipe"](_0x58e2d1);
    return;
  }

  const _0x3f5ea8 = await _0x431b78["json"]();

  _0x58e2d1["status"](_0x431b78["status"])["json"](_0x3f5ea8);
});
router["get"]("/chat/test", async (_0x490425, _0x34a02d, _0x407732) => {
  const _0x1bd116 = {
    'frequency_penalty': 0,
    'model': "gpt-3.5-turbo-0613",
    'presence_penalty': 0,
    'temperature': 0,
    ..._0x490425["body"]["options"],
    'max_tokens': null
  };
  const _0xd62c99 = {
    "model": _0x1bd116["model"]
  };

  const _0x97b3bc = await models_1['aikeyModel']['getOneAikey'](_0xd62c99),
        _0x4eb206 = {
    "role": "user",
    "content": "What's the weather like in Boston?"
  };

  const _0x47a0ab = [_0x4eb206],
        _0xe1e0ce = {
    "name": "get_current_weather",
    "description": "Get the current weather in a given location",
    "parameters": {}
  };
  _0xe1e0ce["parameters"]["type"] = "object";
  _0xe1e0ce["parameters"]["properties"] = {};
  _0xe1e0ce["parameters"]["required"] = ["location"];
  _0xe1e0ce["parameters"]["properties"]["location"] = {};
  _0xe1e0ce["parameters"]["properties"]["unit"] = {};
  _0xe1e0ce["parameters"]["properties"]["location"]["type"] = "string";
  _0xe1e0ce["parameters"]["properties"]["location"]["description"] = "The city and state, e.g. San Francisco, CA";
  _0xe1e0ce["parameters"]["properties"]["unit"]["type"] = 'string';
  _0xe1e0ce["parameters"]["properties"]["unit"]["enum"] = ["celsius", "fahrenheit"];
  const _0x449e4d = [_0xe1e0ce],
        _0x14390c = { ..._0x1bd116,
    'messages': _0x47a0ab,
    "functions": _0x449e4d,
    "function_call": "auto"
  };

  const _0x50d437 = await (0, node_fetch_1["default"])(_0x97b3bc['host'] + "/v1/chat/completions", {
    'method': "POST",
    'body': JSON['stringify'](_0x14390c),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x97b3bc["key"]
    }
  }),
        _0x2681a0 = await _0x50d437["json"](),
        _0x3965eb = _0x2681a0["choices"][0]['message'];

  _0x47a0ab["push"](_0x3965eb);

  _0x47a0ab["push"]({
    'role': "function",
    'name': "get_current_weather",
    'content': JSON["stringify"]({
      'location': "Boston, MA",
      'temperature': '72',
      'unit': "fahrenheit",
      'forecast': ["sunny", "windy"]
    })
  });

  const _0x287db8 = { ..._0x1bd116,
    "messages": _0x47a0ab,
    "stream": true
  };

  const _0x5a608a = await (0, node_fetch_1["default"])(_0x97b3bc["host"] + "/v1/chat/completions", {
    'method': "POST",
    'body': JSON['stringify'](_0x287db8),
    'headers': {
      'Content-Type': "application/json",
      'Authorization': "Bearer " + _0x97b3bc["key"]
    }
  });

  _0x5a608a["body"]["pipe"](_0x34a02d);

  _0x5a608a["body"]['on']("end", () => {
    _0x34a02d['end']();
  });
});
exports['default'] = router;