'use strict';

const a71_0x3a8439 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a71_0x3a8439);
exports['personaMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a71_0x5f1abf = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};

const a71_0x1c9c1d = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a71_0x53bed8 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a71_0x54fc9e = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a71_0xcc4207 = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a71_0x33596f = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a71_0x38788d = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a71_0x325b40 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a71_0x47782d = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a71_0x2c1ef1 = {
  "user_id": a71_0x5f1abf,
  "system": a71_0x1c9c1d,
  "title": a71_0x53bed8,
  "avatar": a71_0x54fc9e,
  "description": a71_0xcc4207,
  'context': a71_0x33596f,
  "status": a71_0x38788d,
  'create_time': a71_0x325b40,
  "update_time": a71_0x47782d
};
const a71_0x5d9253 = {
  "timestamps": false,
  'freezeTableName': true
};
exports['personaMysql'] = db_1["sequelizeExample"]["define"]("persona", a71_0x2c1ef1, a71_0x5d9253);
exports["default"] = exports["personaMysql"];