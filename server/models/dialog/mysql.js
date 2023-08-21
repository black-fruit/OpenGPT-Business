'use strict';

const a54_0x4a212d = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a54_0x4a212d);
exports['dialogMysql'] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require("../db"),
      a54_0x387515 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};

const a54_0x29ebfa = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a54_0x43542b = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a54_0xd16435 = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a54_0x35dba4 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a54_0x5a35f4 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a54_0x1057ca = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a54_0x169492 = {
  'issue': a54_0x387515,
  "answer": a54_0x29ebfa,
  "models": a54_0x43542b,
  "delay": a54_0xd16435,
  'status': a54_0x35dba4,
  "create_time": a54_0x5a35f4,
  "update_time": a54_0x1057ca
};
const a54_0x1b29b2 = {
  'timestamps': false,
  'freezeTableName': true
};
exports['dialogMysql'] = db_1["sequelizeExample"]["define"]('dialog', a54_0x169492, a54_0x1b29b2);
exports['default'] = exports["dialogMysql"];