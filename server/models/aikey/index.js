'use strict';

const a42_0xdd7493 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a42_0xdd7493);

const tslib_1 = require("tslib"),
      db_1 = require('../db'),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function getOneAikey({
  "model": _0x410c55,
  "type": _0xec60e6
}) {
  const _0x2d1ffc = {
    'status': 1
  };
  _0xec60e6 && (_0x2d1ffc["type"] = _0xec60e6);
  _0x410c55 && (_0x2d1ffc[db_1["sequelize"]['Op']['or']] = [{
    'models': {
      [db_1["sequelize"]['Op']["like"]]: _0x410c55 + ',%'
    }
  }, {
    'models': {
      [db_1["sequelize"]['Op']["like"]]: '%,' + _0x410c55
    }
  }, {
    'models': {
      [db_1["sequelize"]['Op']["like"]]: '%,' + _0x410c55 + ',%'
    }
  }, {
    'models': {
      [db_1['sequelize']['Op']['eq']]: _0x410c55
    }
  }]);

  const _0x49eead = await mysql_1["default"]["findOne"]({
    'where': _0x2d1ffc,
    'order': db_1["sequelize"]["literal"]("RAND()")
  })['then'](_0x57577d => _0x57577d?.["toJSON"]());

  return _0x49eead;
}

async function getAikeys({
  "page": _0x41001d,
  "page_size": _0x225711
}, _0x529689) {
  const _0x38ead4 = {
    'where': _0x529689,
    "order": [["create_time", "DESC"]],
    "offset": _0x41001d * _0x225711,
    "limit": _0x225711
  };

  const _0x4b4247 = await mysql_1["default"]["findAndCountAll"](_0x38ead4);

  return _0x4b4247;
}

async function getAiKeyModels(_0x31316c) {
  const _0x2fd0f9 = {
    'where': _0x31316c
  };

  const _0x1ab8c0 = await mysql_1["default"]["findAll"](_0x2fd0f9),
        _0x4f0efe = [];

  _0x1ab8c0["forEach"](_0x28d799 => {
    const _0x21588a = _0x28d799['toJSON'](),
          _0x22aa2d = _0x21588a['models']["split"](',');

    _0x4f0efe["push"](..._0x22aa2d);
  });

  const _0x12dbd7 = [...new Set(_0x4f0efe)]["filter"](_0x5537ab => _0x5537ab !== "dall-e")["map"](_0x3f123b => ({
    'label': _0x3f123b,
    'value': _0x3f123b
  }));

  return _0x12dbd7;
}

async function delAikey(_0x3ca75b) {
  const _0x34c649 = {
    'id': _0x3ca75b
  };
  const _0x53c83b = {
    "where": _0x34c649
  };

  const _0x28cee9 = await mysql_1['default']["destroy"](_0x53c83b);

  return _0x28cee9;
}

async function addAikey(_0x22ae2c) {
  const _0x5946e0 = await mysql_1["default"]['create'](_0x22ae2c);

  return _0x5946e0;
}

async function editAikey(_0x5786f5, _0x2510c2) {
  const _0x20fd5c = {
    'id': _0x5786f5
  };
  const _0x6fd37e = {
    'where': _0x20fd5c
  };

  const _0x58716d = await mysql_1["default"]['update'](_0x2510c2, _0x6fd37e);

  return _0x58716d;
}

const a42_0x504635 = {
  "getOneAikey": getOneAikey,
  "getAikeys": getAikeys,
  "delAikey": delAikey,
  "addAikey": addAikey,
  "editAikey": editAikey,
  "getAiKeyModels": getAiKeyModels
};
exports["default"] = a42_0x504635;