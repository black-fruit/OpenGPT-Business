'use strict';

const a17_0x5de53f = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a17_0x5de53f);

const tslib_1 = require("tslib"),
      bull_1 = tslib_1['__importDefault'](require("bull")),
      config_1 = tslib_1["__importDefault"](require("../../config"));

function createQueue(_0x5f1d54) {
  const _0x38f2b6 = {
    "removeOnComplete": false,
    'removeOnFail': false
  };
  return new bull_1["default"](_0x5f1d54, {
    'redis': { ...config_1["default"]["getConfig"]("redis_config"),
      'db': 11
    },
    'defaultJobOptions': _0x38f2b6
  });
}

exports["default"] = createQueue;