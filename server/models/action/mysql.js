'use strict';

const a41_0x4103a3 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a41_0x4103a3);
exports['actionMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a41_0x4cdbd6 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};

const a41_0x23d4fa = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a41_0x16f168 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a41_0x2083d7 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a41_0x4e469f = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a41_0x50a29d = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a41_0x33369a = {
  "user_id": a41_0x4cdbd6,
  "type": a41_0x23d4fa,
  "describe": a41_0x16f168,
  'ip': a41_0x2083d7,
  "create_time": a41_0x4e469f,
  "update_time": a41_0x50a29d
};
const a41_0x57845e = {
  'timestamps': false,
  "freezeTableName": true
};
exports['actionMysql'] = db_1['sequelizeExample']["define"]("action", a41_0x33369a, a41_0x57845e);
exports['default'] = exports['actionMysql'];