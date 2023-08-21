'use strict';

const a108_0xdfd883 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a108_0xdfd883);

const tslib_1 = require("tslib"),
      express_1 = tslib_1["__importDefault"](require("express")),
      models_1 = require("../../models"),
      chat_1 = tslib_1["__importDefault"](require("../../helpers/chat")),
      gpt_tokens_1 = require("gpt-tokens"),
      utils_1 = require("../../utils"),
      utils_2 = require("../../utils"),
      textModeration_1 = tslib_1["__importDefault"](require("../../helpers/textModeration")),
      jsvm_1 = tslib_1['__importDefault'](require("../../helpers/jsvm")),
      router = express_1['default']["Router"]();

router["post"]("/chat/completion", async (_0x3e3030, _0x427edd, _0x298353) => {
  const _0x621b2b = _0x3e3030?.["user_id"];

  if (!_0x621b2b) {
    _0x427edd["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const {
    "prompt": _0x2726b7,
    "type": type = "draw"
  } = _0x3e3030["body"],
        _0x124b89 = (0, utils_1["getClientIP"])(_0x3e3030),
        _0x347aae = [],
        _0x21e3e5 = {
    "status": 1,
    "system": 1
  };

  const _0x2fd00a = await models_1["personaModel"]["getPersonaContext"](_0x21e3e5);

  _0x347aae["push"](..._0x2fd00a);

  if (type === "draw") {
    const _0xd97e34 = {
      "role": "system",
      "content": "你需要为我生成AI绘画提示词，回答的形式是：(image we're prompting), (7 descriptivekeywords), (time of day), (Hd degree).这是一段段按照上述形式的示例问答：问题：参考以上midjoruney prompt formula写1个midjourney prompt内容，用英文回复，不要括号，内容：宫崎骏风格的春天小镇回答：英文：Miyazaki Hayao-style town,Green willow and red flowers, breeze coming, dreamy colors, fantastic elements, fairy-tale situation, warm breath, shooting in the evening, 4K ultra HD 现在严格参考以上的示例回答形式和风格（这很重要）。"
    };
    const _0x3dcb4a = {
      'role': "user",
      "content": '请根据以下的内容生成提示词(直接以英文输出，需要补全):' + _0x2726b7
    };

    _0x347aae["push"](_0xd97e34, _0x3dcb4a);
  } else {
    if (type === "mapping") {
      const _0x25e96e = {
        "role": "system",
        'content': "You are ChatGPT, a large language model trained by OpenAI. Please carefully follow the user's instructions. I need to use the Xmind tool to create a mind map, and you need to provide text in Markdown format that is compatible with Xmind."
      };
      const _0x502bb1 = {
        "role": "user",
        "content": _0x2726b7
      };

      _0x347aae['push'](_0x25e96e, _0x502bb1);
    } else {
      const _0x3529ef = {
        "role": "user",
        'content': _0x2726b7
      };

      _0x347aae["push"](_0x3529ef);
    }
  }

  const _0x205542 = {
    'model': "gpt-3.5-turbo-16k"
  };
  const _0x2bef87 = {
    'id': _0x621b2b
  };

  const _0x31b00d = await models_1['userModel']["getUserInfo"](_0x2bef87),
        _0x434568 = new Date();

  _0x434568["setHours"](0, 0, 0, 0);

  const _0x363b2e = _0x434568["getTime"](),
        _0x3ebde2 = new Date(_0x31b00d["vip_expire_time"])["getTime"](),
        _0x1b4e9d = new Date(_0x31b00d["svip_expire_time"])["getTime"](),
        _0x2d5e94 = (await models_1['configModel']["getConfigValue"]("ai3_ratio")) || 0,
        _0x1606fe = Number(_0x2d5e94),
        _0x37a2b4 = {
    "model": "gpt-3.5-turbo-16k",
    "messages": [..._0x347aae]
  };

  const _0x2186a2 = new gpt_tokens_1["GPTTokens"](_0x37a2b4),
        _0x1ea2d7 = _0x2186a2["usedTokens"],
        _0x57661e = _0x1606fe ? Math["ceil"](_0x1ea2d7 / _0x1606fe) : 0;

  if (!(_0x31b00d['integral'] > _0x57661e || _0x3ebde2 >= _0x363b2e || _0x1b4e9d >= _0x363b2e)) {
    _0x427edd["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "账户积分余额不足, 请充值后在使用。"));

    return;
  }

  const _0x26816a = {
    'model': "gpt-3.5-turbo-16k"
  };

  const _0x1bb24b = await models_1["aikeyModel"]['getOneAikey'](_0x26816a);

  if (!_0x1bb24b || !_0x1bb24b['id']) {
    _0x427edd["status"](500)["json"]((0, utils_1["httpBody"])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x1f13d1 = { ..._0x205542,
    "messages": _0x347aae,
    "stream": true
  };
  await chat_1["default"]["streamChatCompletions"](_0x1bb24b, _0x1f13d1, _0x427edd, _0x5cdd0d => {
    const _0x22d5ca = type === "draw" ? "绘画文案优化" : type === "mapping" ? "生成思维导图" : '对话';

    console["log"]();

    if (!(_0x1b4e9d > _0x363b2e || _0x3ebde2 > _0x363b2e)) {
      const _0x59628d = {
        "role": "assistant",
        "content": _0x5cdd0d
      };
      const _0x376a79 = {
        'model': "gpt-3.5-turbo-16k",
        "messages": [..._0x347aae, _0x59628d]
      };

      const _0x52370a = new gpt_tokens_1["GPTTokens"](_0x376a79),
            _0x134352 = _0x52370a["usedTokens"],
            _0x3025ec = _0x1606fe ? Math["ceil"](_0x134352 / _0x1606fe) : 0,
            _0x52154d = {
        'id': _0x621b2b,
        "type": "integral",
        "value": _0x3025ec,
        'operate': "decrement"
      };

      models_1["userModel"]["updataUserVIP"](_0x52154d);

      const _0x4ede09 = (0, utils_1["generateNowflakeId"])(1)(),
            _0x95cadf = {
        'id': _0x4ede09,
        'user_id': _0x621b2b,
        "describe": _0x22d5ca,
        "value": '-' + _0x3025ec + '积分'
      };

      models_1['turnoverModel']["addTurnover"](_0x95cadf);
      models_1["actionModel"]['addAction']({
        'user_id': _0x621b2b,
        'id': (0, utils_1["generateNowflakeId"])(23)(),
        'ip': _0x124b89,
        'type': "chat",
        'describe': '' + type + _0x22d5ca + '(' + "gpt-3.5-turbo-16k" + ')'
      });
    }
  });
});
router["post"]("/chat/completions", async (_0x3d7372, _0x552b9c, _0x2481ca) => {
  const _0xe32a58 = _0x3d7372?.['user_id'];

  if (!_0xe32a58) {
    _0x552b9c["status"](500)["json"]((0, utils_1["httpBody"])(-1, "服务端错误"));

    return;
  }

  const _0x546b6f = {
    'id': _0xe32a58
  };

  const _0x4ac311 = await models_1["userModel"]["getUserInfo"](_0x546b6f),
        _0x619649 = (0, utils_1["getClientIP"])(_0x3d7372),
        {
    "prompt": _0xcb75c0,
    "parentMessageId": _0x58e670,
    "persona_id": persona_id = null
  } = _0x3d7372["body"],
        _0x25cc25 = {
    'frequency_penalty': 0,
    'model': "gpt-3.5-turbo-16k",
    'presence_penalty': 0,
    'temperature': 0,
    ..._0x3d7372["body"]["options"],
    "max_tokens": null
  };

  const _0x55b761 = {
    "status": 1,
    "system": 1
  };

  const _0x567cbb = await models_1["personaModel"]["getPersonaContext"](_0x55b761),
        _0x409e84 = {
    'id': persona_id,
    "status": 1,
    'system': 0
  };

  const _0xf8abd0 = await models_1["personaModel"]["getPersonaContext"](_0x409e84),
        _0xe4bee5 = await models_1["configModel"]["getConfigValue"]("ai3_carry_count"),
        _0x3a9286 = await models_1['configModel']["getConfigValue"]("ai4_carry_count");

  let _0x217212 = Number(_0xe4bee5) || 0;

  if (_0x25cc25["model"]["indexOf"]("gpt-4") !== -1) {
    _0x217212 = Number(_0x3a9286) || 0;
  }

  const _0x4bf420 = {
    "user_id": _0xe32a58,
    "parent_message_id": _0x58e670,
    "status": 1
  };

  const _0x29b743 = await models_1["messageModel"]["getMessages"]({
    'page': 0,
    'page_size': Number(_0x217212)
  }, _0x4bf420),
        _0x1487cf = _0x29b743["rows"]["map"](_0xcc00bd => {
    return {
      'role': _0xcc00bd["toJSON"]()['role'],
      'content': _0xcc00bd["toJSON"]()["content"]
    };
  })["reverse"](),
        _0x57990b = {
    "role": "user",
    "content": _0xcb75c0
  };

  const _0x12ff57 = [..._0x567cbb, ..._0xf8abd0, ..._0x1487cf, _0x57990b],
        _0x400504 = (await models_1["configModel"]['getConfigValue']("ai3_ratio")) || 0,
        _0x36efa2 = (await models_1["configModel"]['getConfigValue']("ai4_ratio")) || 0,
        _0x13731e = {
    'ai3_ratio': _0x400504,
    "ai4_ratio": _0x36efa2
  };

  const _0x41a766 = {
    'model': _0x25cc25['model'],
    "messages": [..._0x12ff57]
  };

  const _0x55a214 = new gpt_tokens_1["GPTTokens"](_0x41a766),
        _0x2607fb = _0x55a214["usedTokens"];

  let _0x26c4cb = Number(_0x13731e["ai3_ratio"]);

  if (_0x25cc25["model"]["indexOf"]("gpt-4") !== -1) {
    _0x26c4cb = Number(_0x13731e['ai4_ratio']);
  }

  const _0xea0182 = _0x26c4cb ? Math['ceil'](_0x2607fb / _0x26c4cb) : 0,
        _0x16bd25 = new Date();

  _0x16bd25["setHours"](0, 0, 0, 0);

  const _0x3a1e6d = _0x16bd25['getTime'](),
        _0x3edf3b = new Date(_0x4ac311["vip_expire_time"])["getTime"](),
        _0x5149e4 = new Date(_0x4ac311["svip_expire_time"])["getTime"]();

  if (!(_0x4ac311["integral"] > _0xea0182 || _0x3edf3b >= _0x3a1e6d || _0x5149e4 >= _0x3a1e6d)) {
    _0x552b9c["status"](400)['json']((0, utils_1['httpBody'])(-1, [], "账户积分余额不足, 请充值后在使用。"));

    return;
  }

  if (_0x25cc25["model"]["includes"]("gpt-4") && _0x5149e4 < _0x3a1e6d && _0x4ac311["integral"] <= 0) {
    _0x552b9c["status"](400)["json"]((0, utils_1["httpBody"])(-1, [], "GPT4为超级会员使用或用积分"));

    return;
  }

  const _0x4d5243 = {
    "model": _0x25cc25["model"]
  };

  const _0x3370ae = await models_1['aikeyModel']["getOneAikey"](_0x4d5243);

  if (!_0x3370ae || !_0x3370ae['id']) {
    _0x552b9c["status"](500)["json"]((0, utils_1['httpBody'])(-1, "管理员未配置对应AI模型"));

    return;
  }

  const _0x1b1db2 = (0, utils_1["generateNowflakeId"])(2)(),
        _0x4caf77 = (0, utils_1["generateNowflakeId"])(1)(),
        _0x324dc3 = {
    'user_id': _0xe32a58,
    'id': _0x4caf77,
    'role': "user",
    'content': _0xcb75c0,
    'parent_message_id': _0x58e670,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x25cc25
  },
        _0x440a99 = {
    'user_id': _0xe32a58,
    'id': _0x1b1db2,
    'role': "assistant",
    'content': '',
    'parent_message_id': _0x58e670,
    'persona_id': persona_id ? persona_id : null,
    'create_time': (0, utils_2["formatTime"])(),
    ..._0x25cc25
  },
        _0x55d126 = await models_1["dialogModel"]['getOneDialogInfo']({
    'issue': _0xcb75c0,
    'model': _0x25cc25["model"]['substring'](0, 5)
  });

  if (_0x55d126 && _0x55d126["answer"]) {
    const _0x5e5e5d = _0x55d126?.['answer'] || '';

    _0x440a99["content"] = _0x5e5e5d;
    const _0x32645b = {
      "Content-Type": "text/event-stream",
      'Cache-Control': "no-cache",
      'Connection': 'keep-alive'
    };

    _0x552b9c["writeHead"](200, _0x32645b);

    const _0x557e30 = (0, utils_1["generateUUID"])(),
          _0x5dc68a = _0x55d126["delay"] || 0,
          _0x225e8c = async () => {
      for (let _0x4250d2 = 0; _0x4250d2 < _0x5e5e5d["length"]; _0x4250d2++) {
        await new Promise(_0x150210 => setTimeout(_0x150210, Math['random']() * _0x5dc68a));

        const _0x465761 = JSON["stringify"]({
          'id': _0x557e30,
          'role': "assistant",
          'segment': _0x4250d2 ? "text" : 'start',
          'dateTime': (0, utils_2["formatTime"])(),
          'content': _0x5e5e5d[_0x4250d2],
          'parentMessageId': _0x58e670
        }) + "\n\n";

        _0x552b9c["write"](_0x465761);
      }

      const _0x1e92d1 = JSON['stringify']({
        'id': _0x557e30,
        'role': "assistant",
        'segment': 'end',
        'dateTime': (0, utils_2["formatTime"])(),
        'content': '',
        'parentMessageId': _0x58e670
      }) + "\n\n";

      _0x552b9c['write'](_0x1e92d1);

      await models_1["messageModel"]["addMessages"]([_0x324dc3, { ..._0x440a99,
        'create_time': (0, utils_2["formatTime"])()
      }]);

      if (_0x25cc25["model"]["includes"]('gpt-4') && _0x5149e4 < _0x3a1e6d || !_0x25cc25["model"]['includes']("gpt-4") && _0x3edf3b < _0x3a1e6d) {
        const _0x1c9070 = {
          "role": "assistant",
          "content": _0x440a99['content']
        };
        const _0x35b5e4 = {
          'model': _0x25cc25["model"],
          "messages": [..._0x12ff57, _0x1c9070]
        };

        const _0x4805b1 = new gpt_tokens_1["GPTTokens"](_0x35b5e4),
              _0x278938 = _0x4805b1["usedTokens"],
              _0x16fe28 = _0x26c4cb ? Math["ceil"](_0x278938 / _0x26c4cb) : 0,
              _0x4a76a3 = {
          'id': _0xe32a58,
          'type': "integral",
          'value': _0x16fe28,
          "operate": "decrement"
        };

        models_1["userModel"]["updataUserVIP"](_0x4a76a3);

        const _0x108036 = (0, utils_1['generateNowflakeId'])(1)(),
              _0x3215c8 = {
          'id': _0x108036,
          "user_id": _0xe32a58,
          "describe": "对话(" + _0x25cc25["model"] + ')',
          'value': '-' + _0x16fe28 + '积分'
        };

        models_1["turnoverModel"]["addTurnover"](_0x3215c8);
      }

      _0x552b9c["end"]();
    };

    await _0x225e8c();
    return;
  }

  const _0x3a3f27 = await models_1['configModel']['getConfigValue']("tuputech_key"),
        _0x1929f9 = await models_1["configModel"]['getConfigValue']("prohibited_words");

  if (_0x3a3f27) {
    const {
      "action": _0xf9be69,
      "details": _0x32e004
    } = await textModeration_1["default"]["tuputech"](_0x3a3f27, _0xcb75c0),
          _0x4ccba6 = Array['isArray'](_0x32e004) ? _0x32e004?.['map'](_0x2d78be => _0x2d78be["hint"]) : [];

    if (_0xf9be69 !== "pass") {
      _0x552b9c['status'](500)['json']((0, utils_1["httpBody"])(-1, '很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`' + _0x4ccba6["join"]("`、`") + '`'));

      return;
    }
  } else {
    if (_0x1929f9) {
      const {
        "action": _0x44dc90,
        "matchedWords": matchedWords = []
      } = await (0, utils_1["checkProhibitedWords"])(_0xcb75c0, _0x1929f9);

      if (_0x44dc90 !== "pass") {
        _0x552b9c['status'](500)["json"]((0, utils_1["httpBody"])(-1, "很抱歉，您发送的内容违反了我们的规定，请修改后重新尝试。涉及敏感词：`" + matchedWords["join"]("`、`") + '`'));

        return;
      }
    }
  }

  const _0x2450ed = [],
        _0x55dee2 = await models_1["installedPluginModel"]["getUserInstalledPluginIds"](_0xe32a58, {}, true);

  let _0x351af1 = undefined,
      _0x4f38b7 = undefined;

  if (_0x55dee2 && _0x55dee2['length'] > 0) {
    _0x4f38b7 = _0x25cc25["model"]['includes']("gpt-4") ? "gpt-4-0613" : "gpt-3.5-turbo-0613";

    const _0x1ab0dc = await models_1["pluginModel"]["getInPlugins"](_0x55dee2),
          _0x2bb751 = {
      'role': "user",
      "content": _0xcb75c0
    };

    const _0x3839d3 = await chat_1['default']["fetchChatFunction"](_0x3370ae, {
      'messages': [_0x2bb751],
      'functions': _0x1ab0dc["map"](_0x158782 => JSON['parse'](_0x158782['function'])),
      'model': _0x4f38b7
    });

    if (_0x3839d3?.["function_call"]) {
      const _0x368c40 = _0x3839d3["function_call"]["name"] || '';

      let _0x2ab23f = _0x3839d3["function_call"]['arguments'] || undefined;

      _0x2ab23f = _0x2ab23f["replace"](/\n/g, '')["replace"](/\\/g, '');
      _0x2ab23f = JSON["parse"](_0x2ab23f);
      _0x351af1 = _0x1ab0dc["filter"](_0x37597c => {
        const _0x422310 = JSON["parse"](_0x37597c['function']);

        if (_0x422310['name'] === _0x368c40) {
          return true;
        }

        return false;
      })[0] || undefined;

      if (_0x351af1) {
        const _0x1a9c71 = JSON["parse"](_0x351af1["variables"]),
              _0x3b5faf = {};

        if (_0x1a9c71 && Array["isArray"](_0x1a9c71)) {
          _0x1a9c71["forEach"](_0x26f41e => {
            _0x3b5faf[_0x26f41e["label"]] = _0x26f41e['value'];
          });
        }

        const _0x53bab5 = {
          "script": _0x351af1["script"],
          "scriptName": _0x368c40,
          "env": _0x3b5faf,
          "params": _0x2ab23f
        };

        const _0x54733a = await jsvm_1["default"]["safeRunScript"](_0x53bab5);

        _0x54733a && (_0x2450ed["push"](_0x3839d3), _0x2450ed["push"]({
          'role': "function",
          'name': _0x368c40,
          'content': JSON["stringify"](_0x54733a)
        }));
      }
    }
  }

  const _0x55f918 = { ..._0x25cc25,
    "model": _0x4f38b7 || _0x25cc25["model"],
    "messages": [..._0x12ff57, ..._0x2450ed],
    "stream": true
  };
  await chat_1["default"]['streamChatCompletions'](_0x3370ae, _0x55f918, _0x552b9c, _0x3fbd26 => {
    _0x440a99["content"] = _0x3fbd26;

    if (_0x25cc25["model"]["includes"]("gpt-4") && _0x5149e4 < _0x3a1e6d || !_0x25cc25["model"]["includes"]("gpt-4") && _0x3edf3b < _0x3a1e6d) {
      const _0x49a609 = {
        "role": 'assistant',
        'content': _0x3fbd26
      };
      const _0x3048c6 = {
        'model': _0x25cc25["model"],
        'messages': [..._0x12ff57, _0x49a609]
      };

      const _0x5b4047 = new gpt_tokens_1['GPTTokens'](_0x3048c6),
            _0x31635d = _0x5b4047["usedTokens"],
            _0x4c2d40 = _0x26c4cb ? Math["ceil"](_0x31635d / _0x26c4cb) : 0,
            _0x2d2423 = {
        'id': _0xe32a58,
        'type': "integral",
        "value": _0x4c2d40,
        "operate": "decrement"
      };

      models_1['userModel']["updataUserVIP"](_0x2d2423);

      const _0x1731ec = (0, utils_1["generateNowflakeId"])(1)(),
            _0x2157a3 = {
        'id': _0x1731ec,
        'user_id': _0xe32a58,
        "describe": "对话(" + _0x25cc25["model"] + ')',
        "value": '-' + _0x4c2d40 + '积分'
      };

      models_1["turnoverModel"]["addTurnover"](_0x2157a3);
    }

    models_1["messageModel"]['addMessages']([_0x324dc3, { ..._0x440a99,
      'plugin_id': _0x351af1?.['id'] || null,
      'create_time': (0, utils_2['formatTime'])()
    }]);
    models_1['actionModel']["addAction"]({
      'user_id': _0xe32a58,
      'id': (0, utils_1["generateNowflakeId"])(23)(),
      'ip': _0x619649,
      'type': "chat",
      'describe': '对话(' + _0x25cc25["model"] + ')'
    });
  }, {
    'pluginInfo': _0x351af1 ? {
      'id': _0x351af1?.['id'],
      'name': _0x351af1?.["name"],
      'avatar': _0x351af1?.['avatar'],
      'description': _0x351af1?.["description"]
    } : undefined
  });
});
exports['default'] = router;