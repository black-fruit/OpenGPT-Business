'use strict';

const a45_0x1ffb19 = {
  'value': true
};
Object["defineProperty"](exports, "__esModule", a45_0x1ffb19);
exports["amountDetailsMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a45_0x3a9ff3 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};

const a45_0x3d81d4 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a45_0x1b9692 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a45_0x55e68b = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a45_0x38ffec = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a45_0x30f91e = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a45_0x54756a = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a45_0xa8303a = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a45_0xab22c2 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a45_0x54026a = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a45_0x2bd6d2 = {
  "user_id": a45_0x3a9ff3,
  "correlation_id": a45_0x3d81d4,
  "original_amount": a45_0x1b9692,
  "operate_amount": a45_0x55e68b,
  'type': a45_0x38ffec,
  "current_amount": a45_0x30f91e,
  "remarks": a45_0x54756a,
  "status": a45_0xa8303a,
  "create_time": a45_0xab22c2,
  "update_time": a45_0x54026a
};
const a45_0x316a75 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["amountDetailsMysql"] = db_1["sequelizeExample"]["define"]("amount_details", a45_0x2bd6d2, a45_0x316a75);
exports["default"] = exports["amountDetailsMysql"];