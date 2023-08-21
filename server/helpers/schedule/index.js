'use strict';

const a21_0x12b903 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a21_0x12b903);
exports["globalScheduleJobs"] = void 0;

const tslib_1 = require("tslib"),
      node_schedule_1 = tslib_1["__importDefault"](require("node-schedule")),
      scheduleCarmi_1 = tslib_1["__importDefault"](require("./scheduleCarmi")),
      scheduleToken_1 = tslib_1["__importDefault"](require("./scheduleToken")),
      globalScheduleJobs = () => {
  const _0x505bd5 = {
    "second": 1,
    "minute": 0,
    "hour": 0
  };
  node_schedule_1["default"]["scheduleJob"](_0x505bd5, _0x17c392 => {
    (0, scheduleCarmi_1["default"])();
  });
  const _0x5d4873 = {
    "second": 0,
    'minute': 0,
    "hour": 1
  };
  node_schedule_1["default"]["scheduleJob"](_0x5d4873, _0x51fc9e => {
    (0, scheduleToken_1["default"])();
  });
};

exports["globalScheduleJobs"] = globalScheduleJobs;
exports["default"] = {
  'schedule'(_0x5afe98, _0x2e6ee4) {
    return node_schedule_1['default']["scheduleJob"](_0x5afe98, _0x321bf9 => {
      typeof _0x2e6ee4 === "function" && _0x2e6ee4(_0x321bf9);
    });
  },

  'reschedule'(_0x1ee534, _0x40a12e) {
    return node_schedule_1["default"]['rescheduleJob'](_0x1ee534, _0x40a12e);
  },

  'cancel'(_0xbf719a) {
    return node_schedule_1["default"]["cancelJob"](_0xbf719a);
  },

  'cancelAll'() {
    return node_schedule_1["default"]["gracefulShutdown"]();
  }

};