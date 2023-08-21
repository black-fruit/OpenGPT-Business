'use strict';

const a85_0x3b26b5 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a85_0x3b26b5);
exports['withdrawalRecordMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a85_0x44dc19 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};

const a85_0x15a9c6 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x46d8e1 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x216c82 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a85_0x229b1c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x10194d = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a85_0x6450e1 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x25f03d = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x5e3b32 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a85_0x34e1fe = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x384806 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a85_0x44c579 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a85_0x231384 = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a85_0x18f082 = {
  "user_id": a85_0x44dc19,
  "amount": a85_0x15a9c6,
  "type": a85_0x46d8e1,
  'name': a85_0x216c82,
  "contact": a85_0x229b1c,
  "account": a85_0x10194d,
  "remarks": a85_0x6450e1,
  "message": a85_0x25f03d,
  'ip': a85_0x5e3b32,
  'user_agent': a85_0x34e1fe,
  'status': a85_0x384806,
  "create_time": a85_0x44c579,
  "update_time": a85_0x231384
};
const a85_0x569cb9 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["withdrawalRecordMysql"] = db_1["sequelizeExample"]["define"]("withdrawal_record", a85_0x18f082, a85_0x569cb9);
exports["default"] = exports['withdrawalRecordMysql'];