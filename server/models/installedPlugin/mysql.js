'use strict';

const a59_0x194daa = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a59_0x194daa);
exports['installedPluginMysql'] = void 0;

const sequelize_1 = require("sequelize"),
      db_1 = require("../db"),
      a59_0x3fd268 = {
  'type': sequelize_1['DataTypes']['NUMBER']
};

const a59_0x4cbf89 = {
  "type": sequelize_1["DataTypes"]["NUMBER"]
};
const a59_0x2acb9e = {
  "type": sequelize_1['DataTypes']["NUMBER"]
};
const a59_0x2affe9 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a59_0xd98c85 = {
  "type": sequelize_1["DataTypes"]["STRING"]
};
const a59_0x10fc70 = {
  "user_id": a59_0x3fd268,
  "plugin_id": a59_0x4cbf89,
  'status': a59_0x2acb9e,
  "create_time": a59_0x2affe9,
  "update_time": a59_0xd98c85
};
const a59_0x58cd4f = {
  'timestamps': false,
  'freezeTableName': true
};
exports["installedPluginMysql"] = db_1['sequelizeExample']["define"]("installed_plugin", a59_0x10fc70, a59_0x58cd4f);
exports['default'] = exports["installedPluginMysql"];