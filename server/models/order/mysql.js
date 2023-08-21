'use strict';

const a67_0x2dcf27 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a67_0x2dcf27);
exports["orderMysql"] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require("../db"),
      a67_0x20a5e8 = {
  "type": sequelize_1['DataTypes']["STRING"]
};

const a67_0x40ae4a = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x32d931 = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};
const a67_0x1ca2c9 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x33e60b = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x4a4dd2 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a67_0x1fa037 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a67_0x4156ec = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x2d1166 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x209f37 = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};
const a67_0x521525 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x2f7fc5 = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};
const a67_0x573903 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a67_0x4a0868 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x442f25 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a67_0x192971 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a67_0x11d15f = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a67_0xa25ba8 = {
  "trade_no": a67_0x20a5e8,
  "pay_type": a67_0x40ae4a,
  "product_id": a67_0x32d931,
  "product_title": a67_0x1ca2c9,
  "trade_status": a67_0x33e60b,
  "user_id": a67_0x4a4dd2,
  "product_info": a67_0x1fa037,
  "channel": a67_0x4156ec,
  'params': a67_0x2d1166,
  'payment_id': a67_0x209f37,
  'payment_info': a67_0x521525,
  "money": a67_0x2f7fc5,
  "notify_info": a67_0x573903,
  "pay_url": a67_0x4a0868,
  'ip': a67_0x442f25,
  "create_time": a67_0x192971,
  'update_time': a67_0x11d15f
};
const a67_0x3b0d79 = {
  'timestamps': false,
  "freezeTableName": true
};
exports["orderMysql"] = db_1['sequelizeExample']["define"]("order", a67_0xa25ba8, a67_0x3b0d79);
exports["default"] = exports["orderMysql"];