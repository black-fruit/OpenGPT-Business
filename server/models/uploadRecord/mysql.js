'use strict';

const a81_0x4f1ab6 = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a81_0x4f1ab6);
exports["uploadRecordMysql"] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require('../db'),
      a81_0x5259be = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};

const a81_0xcd4ae7 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a81_0x5955c8 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x312050 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x22307a = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x24a4c2 = {
  'type': sequelize_1['DataTypes']['STRING']
};
const a81_0x150d14 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x2c2dd4 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a81_0x5cdb8c = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x3ac48b = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a81_0x50d299 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a81_0x24c765 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a81_0x3f4c02 = {
  "user_id": a81_0x5259be,
  'mimetype': a81_0xcd4ae7,
  "sha1": a81_0x5955c8,
  "md5": a81_0x312050,
  "url": a81_0x22307a,
  "originalname": a81_0x24a4c2,
  "name": a81_0x150d14,
  'size': a81_0x2c2dd4,
  'type': a81_0x5cdb8c,
  "status": a81_0x3ac48b,
  "create_time": a81_0x50d299,
  "update_time": a81_0x24c765
};
const a81_0x7d1c37 = {
  'timestamps': false,
  "freezeTableName": true
};
exports["uploadRecordMysql"] = db_1["sequelizeExample"]["define"]('upload_record', a81_0x3f4c02, a81_0x7d1c37);
exports['default'] = exports['uploadRecordMysql'];