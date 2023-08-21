'use strict';

const a23_0x56816d = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a23_0x56816d);

const models_1 = require("../../models"),
      queue_1 = require("../queue");

async function scheduleToken() {
  const _0x157c7a = {
    "page": 0,
    "page_size": 100
  };
  const _0x181022 = {
    "status": 1,
    "check": 1
  };

  const _0x2f7b15 = await models_1["aikeyModel"]['getAikeys'](_0x157c7a, _0x181022),
        _0x163c9b = _0x2f7b15["rows"];

  _0x163c9b["forEach"](_0x539e74 => {
    queue_1['checkAiKeyQueue']["addTask"]({ ..._0x539e74["toJSON"]()
    });
  });
}

exports["default"] = scheduleToken;