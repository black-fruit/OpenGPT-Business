'use strict';

const a51_0xe3957d = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a51_0xe3957d);
exports["configMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a51_0x4f6394 = {
  'type': sequelize_1["DataTypes"]['STRING']
};

const a51_0x42504e = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a51_0x506a6e = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a51_0x54d9f4 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a51_0x904f48 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a51_0x312dcb = {
  "name": a51_0x4f6394,
  "value": a51_0x42504e,
  "remarks": a51_0x506a6e,
  "create_time": a51_0x54d9f4,
  "update_time": a51_0x904f48
};
const a51_0x58ab92 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["configMysql"] = db_1["sequelizeExample"]["define"]("config", a51_0x312dcb, a51_0x58ab92);
exports["default"] = exports['configMysql'];