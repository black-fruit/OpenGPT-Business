'use strict';

const a68_0x420bbb = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a68_0x420bbb);

const tslib_1 = require("tslib"),
      db_1 = require("../db"),
      mysql_1 = tslib_1['__importDefault'](require('./mysql'));

async function getOnePayment(_0x432645) {
  const _0x2faf82 = {
    [db_1['sequelize']['Op']['or']]: [{
      'types': {
        [db_1["sequelize"]['Op']["like"]]: _0x432645 + ',%'
      }
    }, {
      'types': {
        [db_1["sequelize"]['Op']["like"]]: '%,' + _0x432645
      }
    }, {
      'types': {
        [db_1["sequelize"]['Op']["like"]]: '%,' + _0x432645 + ',%'
      }
    }, {
      'types': {
        [db_1['sequelize']['Op']['eq']]: _0x432645
      }
    }],
    'status': 1
  };

  const _0x308075 = await mysql_1["default"]["findOne"]({
    'where': _0x2faf82,
    'order': db_1['sequelize']["literal"]("RAND()")
  })["then"](_0x1931ac => _0x1931ac?.["toJSON"]());

  return _0x308075;
}

async function getPayments({
  "page": _0x4794bb,
  "page_size": _0x15f0c0
}, _0x58c6c6) {
  const _0x1d74e7 = await mysql_1["default"]['findAndCountAll']({
    'where': _0x58c6c6,
    'order': [["create_time", "DESC"]],
    'offset': _0x4794bb * _0x15f0c0,
    'limit': _0x15f0c0
  });

  return _0x1d74e7;
}

async function delPayment(_0x3c7750) {
  const _0x4881f7 = {
    'id': _0x3c7750
  };
  const _0x5f0c90 = {
    'where': _0x4881f7
  };

  const _0x2dae73 = await mysql_1["default"]["destroy"](_0x5f0c90);

  return _0x2dae73;
}

async function addPayment(_0x472139) {
  const _0x59fc24 = await mysql_1['default']["create"](_0x472139);

  return _0x59fc24;
}

async function editPayment(_0x2df8bb) {
  const _0x4dab1a = await mysql_1["default"]["upsert"](_0x2df8bb);

  return _0x4dab1a;
}

async function getPaymentInfo(_0x369da3) {
  const _0x1e6611 = await mysql_1["default"]["findByPk"](_0x369da3);

  if (!_0x1e6611) {
    return null;
  }

  return _0x1e6611["toJSON"]();
}

async function getPaymentTypes() {
  const _0x1a4933 = {
    'status': 1
  };
  const _0x568c7c = {
    "where": _0x1a4933
  };

  const _0x441e7e = await mysql_1["default"]["findAll"](_0x568c7c);

  let _0x1b8e9b = [];

  for (const _0xf0527c of _0x441e7e) {
    const _0x11b6bf = _0xf0527c["toJSON"](),
          _0x38a8f5 = _0x11b6bf["types"]["split"](',');

    _0x1b8e9b = _0x1b8e9b["concat"](_0x38a8f5);
  }

  return [...new Set([..._0x1b8e9b])];
}

const a68_0x4379af = {
  'getOnePayment': getOnePayment,
  'getPayments': getPayments,
  "delPayment": delPayment,
  "addPayment": addPayment,
  "editPayment": editPayment,
  "getPaymentInfo": getPaymentInfo,
  "getPaymentTypes": getPaymentTypes
};
exports["default"] = a68_0x4379af;