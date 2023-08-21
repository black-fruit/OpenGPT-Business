'use strict';

const a75_0x3b66a0 = {
  'value': true
};
Object['defineProperty'](exports, "__esModule", a75_0x3b66a0);
exports["productMysql"] = void 0;

const sequelize_1 = require('sequelize'),
      db_1 = require('../db'),
      a75_0x1eab5d = {
  "type": sequelize_1["DataTypes"]["STRING"]
};

const a75_0x238b4a = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a75_0x53b8d3 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a75_0x2b76f2 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a75_0x2871b4 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a75_0x37ddc3 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a75_0x14ae8e = {
  'type': sequelize_1['DataTypes']["NUMBER"]
};
const a75_0x303c79 = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a75_0x2a88f2 = {
  "type": sequelize_1['DataTypes']['STRING']
};
const a75_0x48c35c = {
  'type': sequelize_1["DataTypes"]["NUMBER"]
};
const a75_0x337048 = {
  'type': sequelize_1["DataTypes"]["STRING"]
};
const a75_0x1b6b6e = {
  "type": sequelize_1['DataTypes']["STRING"]
};
const a75_0x2946af = {
  "title": a75_0x1eab5d,
  "price": a75_0x238b4a,
  "original_price": a75_0x53b8d3,
  'value': a75_0x2b76f2,
  "badge": a75_0x2871b4,
  "type": a75_0x37ddc3,
  "level": a75_0x14ae8e,
  'sort': a75_0x303c79,
  "describe": a75_0x2a88f2,
  "status": a75_0x48c35c,
  'create_time': a75_0x337048,
  "update_time": a75_0x1b6b6e
};
const a75_0x1c532a = {
  'timestamps': false,
  'freezeTableName': true
};
exports["productMysql"] = db_1["sequelizeExample"]["define"]("product", a75_0x2946af, a75_0x1c532a);
exports['default'] = exports["productMysql"];