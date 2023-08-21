'use strict';

const a83_0x499566 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a83_0x499566);
exports["userMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a83_0x1b9d28 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};

const a83_0x47ae08 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x2922a1 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a83_0x1f139d = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x54f2cb = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a83_0x289b80 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x413f41 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x427182 = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a83_0x32d240 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x381768 = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a83_0x3debc4 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a83_0x58aabd = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a83_0x276c04 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a83_0x567c42 = {
  'type': sequelize_1["DataTypes"]['STRING']
};
const a83_0x462965 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a83_0x4b9995 = {
  "account": a83_0x1b9d28,
  "nickname": a83_0x47ae08,
  "avatar": a83_0x2922a1,
  "role": a83_0x1f139d,
  "integral": a83_0x54f2cb,
  "vip_expire_time": a83_0x289b80,
  "svip_expire_time": a83_0x413f41,
  "password": a83_0x427182,
  'ip': a83_0x32d240,
  "invite_code": a83_0x381768,
  "superior_id": a83_0x3debc4,
  "user_agent": a83_0x58aabd,
  "status": a83_0x276c04,
  "create_time": a83_0x567c42,
  "update_time": a83_0x462965
};
const a83_0x213ec9 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["userMysql"] = db_1['sequelizeExample']["define"]('user', a83_0x4b9995, a83_0x213ec9);
exports["default"] = exports["userMysql"];