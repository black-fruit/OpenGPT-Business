'use strict';

const a77_0x46c75a = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a77_0x46c75a);
exports["signinMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require('../db'),
      a77_0x4ed513 = {
  'type': sequelize_1["DataTypes"]['STRING']
};

const a77_0xbdbcba = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a77_0xb6dd9e = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};
const a77_0x2a2f72 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a77_0x485963 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a77_0x57de25 = {
  "user_id": a77_0x4ed513,
  'ip': a77_0xbdbcba,
  'status': a77_0xb6dd9e,
  'create_time': a77_0x2a2f72,
  'update_time': a77_0x485963
};
const a77_0x4761dc = {
  "timestamps": false,
  "freezeTableName": true
};
exports["signinMysql"] = db_1["sequelizeExample"]["define"]("signin", a77_0x57de25, a77_0x4761dc);
exports['default'] = exports["signinMysql"];