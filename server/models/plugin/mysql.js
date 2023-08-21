'use strict';

const a73_0x23e2a2 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a73_0x23e2a2);
exports["pluginMysql"] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require('../db'),
      a73_0x4fa720 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};

const a73_0x2c2f31 = {
  'type': sequelize_1['DataTypes']["NUMBER"]
};
const a73_0x256c1d = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a73_0x85ee6 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a73_0x5e6ae9 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a73_0x3f2262 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a73_0x165222 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a73_0x1cf729 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a73_0x18f7b3 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a73_0x2164fb = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a73_0x255910 = {
  'user_id': a73_0x4fa720,
  "name": a73_0x2c2f31,
  'description': a73_0x256c1d,
  'avatar': a73_0x85ee6,
  'variables': a73_0x5e6ae9,
  "function": a73_0x3f2262,
  'script': a73_0x165222,
  'status': a73_0x1cf729,
  "create_time": a73_0x18f7b3,
  "update_time": a73_0x2164fb
};
const a73_0x45db6c = {
  "timestamps": false,
  "freezeTableName": true
};
exports["pluginMysql"] = db_1["sequelizeExample"]["define"]("plugin", a73_0x255910, a73_0x45db6c);
exports["default"] = exports['pluginMysql'];