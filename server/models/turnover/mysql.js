'use strict';

const a79_0x14f3a4 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a79_0x14f3a4);
exports["turnoverMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a79_0x381704 = {
  "type": sequelize_1['DataTypes']["STRING"]
};

const a79_0xc4201d = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};
const a79_0x19dd3c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a79_0x145dac = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a79_0x473dd1 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a79_0x546a66 = {
  "user_id": a79_0x381704,
  "value": a79_0xc4201d,
  "describe": a79_0x19dd3c,
  "create_time": a79_0x145dac,
  "update_time": a79_0x473dd1
};
const a79_0x30d151 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["turnoverMysql"] = db_1["sequelizeExample"]["define"]("turnover", a79_0x546a66, a79_0x30d151);
exports['default'] = exports["turnoverMysql"];