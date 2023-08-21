'use strict';

const a61_0xd412c2 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a61_0xd412c2);
exports["inviteRecordMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a61_0x1f5d89 = {
  "type": sequelize_1["DataTypes"]['NUMBER']
};

const a61_0x2a663e = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a61_0x5cec0a = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a61_0x91c5dc = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a61_0x4de074 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a61_0x13f5bb = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a61_0x4f0732 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a61_0x3e49a5 = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a61_0x2b4a48 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a61_0x166774 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a61_0x249f38 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a61_0x39a64e = {
  "user_id": a61_0x1f5d89,
  "invite_code": a61_0x2a663e,
  "superior_id": a61_0x5cec0a,
  "reward": a61_0x91c5dc,
  "reward_type": a61_0x4de074,
  "user_agent": a61_0x13f5bb,
  "remarks": a61_0x4f0732,
  'ip': a61_0x3e49a5,
  'status': a61_0x2b4a48,
  "create_time": a61_0x166774,
  'update_time': a61_0x249f38
};
const a61_0x4f8d01 = {
  "timestamps": false,
  'freezeTableName': true
};
exports["inviteRecordMysql"] = db_1["sequelizeExample"]['define']("invite_record", a61_0x39a64e, a61_0x4f8d01);
exports["default"] = exports["inviteRecordMysql"];