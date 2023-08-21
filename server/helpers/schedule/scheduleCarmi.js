'use strict';

const a22_0x1501ae = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a22_0x1501ae);

const models_1 = require('../../models'),
      utils_1 = require("../../utils");

async function scheduleCarmi() {
  const _0x1a52f7 = (0, utils_1["formatTime"])("yyyy-MM-dd");

  models_1['carmiModel']["checkCarmiEndTime"](_0x1a52f7);
}

exports["default"] = scheduleCarmi;