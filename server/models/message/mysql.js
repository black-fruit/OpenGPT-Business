'use strict';

const a63_0x9ded52 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a63_0x9ded52);
exports['messageMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a63_0x460dec = {
  "type": sequelize_1["DataTypes"]['STRING']
};

const a63_0x58853f = {
  'type': sequelize_1['DataTypes']['NUMBER']
};
const a63_0x18fe50 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a63_0xbed127 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a63_0x440276 = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a63_0x1fed67 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a63_0x120964 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a63_0x3aba6c = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a63_0x572fa0 = {
  'type': sequelize_1["DataTypes"]['NUMBER']
};
const a63_0x599c29 = {
  'type': sequelize_1['DataTypes']["NUMBER"]
};
const a63_0x4e1ad7 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a63_0x4ce033 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a63_0x439e1f = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a63_0x4315e4 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a63_0xcfa134 = {
  "content": a63_0x460dec,
  "persona_id": a63_0x58853f,
  "user_id": a63_0x18fe50,
  "plugin_id": a63_0xbed127,
  "role": a63_0x440276,
  "frequency_penalty": a63_0x1fed67,
  "max_tokens": a63_0x120964,
  "model": a63_0x3aba6c,
  "presence_penalty": a63_0x572fa0,
  "temperature": a63_0x599c29,
  "parent_message_id": a63_0x4e1ad7,
  "status": a63_0x4ce033,
  'create_time': a63_0x439e1f,
  'update_time': a63_0x4315e4
};
const a63_0x5a0607 = {
  "timestamps": false,
  'freezeTableName': true
};
exports["messageMysql"] = db_1["sequelizeExample"]['define']("message", a63_0xcfa134, a63_0x5a0607);
exports['default'] = exports["messageMysql"];