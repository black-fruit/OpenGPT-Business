'use strict';

const a69_0xeb16cb = {
  "value": true
};
Object['defineProperty'](exports, '__esModule', a69_0xeb16cb);
exports["paymentMysql"] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require("../db"),
      a69_0x18078c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};

const a69_0x29213d = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a69_0x5774bf = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a69_0x4b0b16 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a69_0x55d451 = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a69_0x1cc700 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a69_0x4beb5f = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a69_0x1cb0cc = {
  "name": a69_0x18078c,
  "channel": a69_0x29213d,
  "types": a69_0x5774bf,
  "params": a69_0x4b0b16,
  "status": a69_0x55d451,
  "create_time": a69_0x1cc700,
  "update_time": a69_0x4beb5f
};
const a69_0x44e463 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["paymentMysql"] = db_1["sequelizeExample"]["define"]("payment", a69_0x1cb0cc, a69_0x44e463);
exports["default"] = exports['paymentMysql'];