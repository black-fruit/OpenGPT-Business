'use strict';

const a56_0x4b0a9f = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a56_0x4b0a9f);
exports["drawRecordMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require('../db'),
      a56_0x3898f7 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};

const a56_0x1cb208 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a56_0x36a62b = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a56_0x423c77 = {
  "type": sequelize_1["DataTypes"]['STRING']
};
const a56_0x32050b = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a56_0x14038d = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a56_0x99bed7 = {
  'type': sequelize_1['DataTypes']["STRING"]
};
const a56_0x4abd57 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a56_0x280d2a = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a56_0x32df99 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a56_0xc3bb6c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a56_0x38eb86 = {
  "user_id": a56_0x3898f7,
  'inset_image_url': a56_0x1cb208,
  'prompt': a56_0x36a62b,
  "model": a56_0x423c77,
  'images': a56_0x32050b,
  "params": a56_0x14038d,
  "take_time": a56_0x99bed7,
  "size": a56_0x4abd57,
  'status': a56_0x280d2a,
  'create_time': a56_0x32df99,
  "update_time": a56_0xc3bb6c
};
const a56_0x2beb09 = {
  "timestamps": false,
  "freezeTableName": true
};
exports["drawRecordMysql"] = db_1["sequelizeExample"]["define"]("draw_record", a56_0x38eb86, a56_0x2beb09);
exports["default"] = exports["drawRecordMysql"];