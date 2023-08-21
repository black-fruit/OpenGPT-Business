'use strict';

const a52_0x10301a = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a52_0x10301a);
exports["sequelizeExample"] = exports["sequelize"] = void 0;

const tslib_1 = require('tslib'),
      sequelize_1 = tslib_1["__importStar"](require("sequelize"));

exports['sequelize'] = sequelize_1["default"];
const config_1 = tslib_1["__importDefault"](require('../config')),
      sequelizeExample = new sequelize_1["Sequelize"]({ ...config_1["default"]["getConfig"]("mysql_config"),
  'logging': (_0x4d28ae, _0x196d05) => {
    console["log"](_0x4d28ae);
  }
});
exports['sequelizeExample'] = sequelizeExample;

const initMysql = async () => {
  try {
    await sequelizeExample["authenticate"](), console['log']("MySQL database connection succeeded.");
  } catch (_0x4e6604) {
    console['log']("MySQL database link error: " + _0x4e6604);
  }

  return sequelizeExample;
},
      initDB = async () => {
  await initMysql();
};

exports["default"] = initDB;