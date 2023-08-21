'use strict';

const a53_0x330e31 = {
  "value": true
};
Object["defineProperty"](exports, '__esModule', a53_0x330e31);

const tslib_1 = require("tslib"),
      db_1 = require('../db'),
      mysql_1 = tslib_1["__importDefault"](require('./mysql'));

async function getDialogs({
  "page": _0x35d3cd,
  "page_size": _0x400c75
}, _0x5b8361) {
  const _0x2964d7 = await mysql_1["default"]["findAndCountAll"]({
    'where': _0x5b8361,
    'order': [["create_time", "DESC"]],
    'offset': _0x35d3cd * _0x400c75,
    'limit': _0x400c75
  });

  return _0x2964d7;
}

async function delDialog(_0x318cd0) {
  const _0x4c820d = {
    'id': _0x318cd0
  };
  const _0x1ed6aa = {
    "where": _0x4c820d
  };

  const _0x5e7ebb = await mysql_1["default"]["destroy"](_0x1ed6aa);

  return _0x5e7ebb;
}

async function addDialog(_0x535d67) {
  const _0x27b50c = await mysql_1['default']["create"](_0x535d67);

  return _0x27b50c;
}

async function editDialog(_0x10e4ca, _0x2b6ce4) {
  const _0x2d6bb4 = {
    'id': _0x10e4ca
  };
  const _0x47e952 = {
    'where': _0x2d6bb4
  };

  const _0x1c2bdd = await mysql_1["default"]['update'](_0x2b6ce4, _0x47e952);

  return _0x1c2bdd;
}

async function getOneDialogInfo({
  "model": _0x43ea9b,
  "issue": _0x532279
}) {
  const _0xb39f26 = {
    [db_1['sequelize']['Op']['or']]: [{
      'models': {
        [db_1["sequelize"]['Op']["like"]]: _0x43ea9b + ',%'
      }
    }, {
      'models': {
        [db_1["sequelize"]['Op']['like']]: '%,' + _0x43ea9b
      }
    }, {
      'models': {
        [db_1["sequelize"]['Op']['like']]: '%,' + _0x43ea9b + ',%'
      }
    }, {
      'models': {
        [db_1['sequelize']['Op']['eq']]: _0x43ea9b
      }
    }],
    "status": 1,
    "issue": _0x532279
  };

  const _0x398a7a = await mysql_1["default"]['findOne']({
    'where': _0xb39f26,
    'order': db_1["sequelize"]["literal"]("RAND()")
  })["then"](_0x32f4e => _0x32f4e?.['toJSON']());

  return _0x398a7a;
}

const a53_0x4e4e04 = {
  "getDialogs": getDialogs,
  "delDialog": delDialog,
  "addDialog": addDialog,
  'editDialog': editDialog,
  "getOneDialogInfo": getOneDialogInfo
};
exports["default"] = a53_0x4e4e04;