'use strict';

const a43_0x32fffe = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a43_0x32fffe);
exports["aikeyMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require('../db'),
      a43_0x551057 = {
  'type': sequelize_1['DataTypes']["STRING"]
};

const a43_0x59df33 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a43_0x33362c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a43_0x538ae1 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a43_0x549db1 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a43_0x1caf6f = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a43_0x3dd61b = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a43_0x454de7 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a43_0x43f021 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a43_0x4f0074 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a43_0x581f3c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a43_0x374def = {
  "key": a43_0x551057,
  "host": a43_0x59df33,
  'remarks': a43_0x33362c,
  "models": a43_0x538ae1,
  "check": a43_0x549db1,
  "usage": a43_0x1caf6f,
  "limit": a43_0x3dd61b,
  'type': a43_0x454de7,
  "status": a43_0x43f021,
  'create_time': a43_0x4f0074,
  "update_time": a43_0x581f3c
};
const a43_0x316b9c = {
  "timestamps": false,
  "freezeTableName": true
};
exports["aikeyMysql"] = db_1['sequelizeExample']["define"]("aikey", a43_0x374def, a43_0x316b9c);
exports["default"] = exports["aikeyMysql"];