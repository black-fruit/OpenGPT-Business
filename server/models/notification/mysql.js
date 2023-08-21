'use strict';

const a65_0x368bcd = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a65_0x368bcd);
exports["notificationMysql"] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require("../db"),
      a65_0x1d6431 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};

const a65_0x55da29 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a65_0x2aa4b7 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a65_0x574fd6 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a65_0x52a5b2 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a65_0x491e52 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a65_0x2ed8f9 = {
  "title": a65_0x1d6431,
  'content': a65_0x55da29,
  "sort": a65_0x2aa4b7,
  'status': a65_0x574fd6,
  "create_time": a65_0x52a5b2,
  "update_time": a65_0x491e52
};
const a65_0xab10a2 = {
  "timestamps": false,
  'freezeTableName': true
};
exports["notificationMysql"] = db_1["sequelizeExample"]["define"]('notification', a65_0x2ed8f9, a65_0xab10a2);
exports['default'] = exports['notificationMysql'];