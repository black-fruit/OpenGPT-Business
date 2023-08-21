'use strict';

const a47_0x2d5784 = {
  "value": true
};
Object['defineProperty'](exports, '__esModule', a47_0x2d5784);
exports["carmiMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a47_0x2ead7b = {
  "type": sequelize_1['DataTypes']['STRING']
};

const a47_0x4d3d45 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a47_0x689d1 = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a47_0xa57a52 = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a47_0xdb7456 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a47_0x4003f4 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a47_0x537012 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a47_0x4dd82c = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a47_0x342f73 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a47_0x39aacd = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a47_0x5788b8 = {
  'user_id': a47_0x2ead7b,
  'ip': a47_0x4d3d45,
  "key": a47_0x689d1,
  "value": a47_0xa57a52,
  "type": a47_0xdb7456,
  "level": a47_0x4003f4,
  "end_time": a47_0x537012,
  'status': a47_0x4dd82c,
  "create_time": a47_0x342f73,
  "update_time": a47_0x39aacd
};
const a47_0xb5d112 = {
  "timestamps": false,
  "freezeTableName": true
};
exports['carmiMysql'] = db_1["sequelizeExample"]["define"]("carmi", a47_0x5788b8, a47_0xb5d112);
exports["default"] = exports["carmiMysql"];