'use strict';

const a49_0x4128ad = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a49_0x4128ad);
exports['cashbackMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a49_0x4c9c8d = {
  "type": sequelize_1["DataTypes"]["STRING"]
};

const a49_0x1e30de = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a49_0x158a88 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a49_0x526482 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a49_0xb62569 = {
  'type': sequelize_1['DataTypes']["NUMBER"]
};
const a49_0x1a7995 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a49_0x40f468 = {
  'type': sequelize_1["DataTypes"]['NUMBER']
};
const a49_0x38b158 = {
  "type": sequelize_1['DataTypes']['NUMBER']
};
const a49_0x528d79 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a49_0xc047f9 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a49_0x3c58ef = {
  "user_id": a49_0x4c9c8d,
  'benefit_id': a49_0x1e30de,
  "pay_amount": a49_0x158a88,
  "commission_rate": a49_0x526482,
  "commission_amount": a49_0xb62569,
  "remarks": a49_0x1a7995,
  'order_id': a49_0x40f468,
  "status": a49_0x38b158,
  "create_time": a49_0x528d79,
  "update_time": a49_0xc047f9
};
const a49_0x43dc28 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["cashbackMysql"] = db_1['sequelizeExample']["define"]("cashback", a49_0x3c58ef, a49_0x43dc28);
exports["default"] = exports["cashbackMysql"];