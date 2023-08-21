'use strict';

const a64_0x31c855 = {
  'value': true
};
Object["defineProperty"](exports, '__esModule', a64_0x31c855);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function getNotification({
  "page": _0x1b2633,
  "page_size": _0x124867
}, _0x2a688a) {
  const _0x17819b = await mysql_1['default']['findAndCountAll']({
    'where': _0x2a688a,
    'order': [["create_time", "DESC"]],
    'offset': _0x1b2633 * _0x124867,
    'limit': _0x124867
  });

  return _0x17819b;
}

async function delNotification(_0x4f58cc) {
  const _0x3de671 = {
    'id': _0x4f58cc
  };
  const _0x1e4f32 = {
    'where': _0x3de671
  };

  const _0x3cc425 = await mysql_1['default']['destroy'](_0x1e4f32);

  return _0x3cc425;
}

async function addNotification(_0x5dc8e3) {
  const _0x384b73 = await mysql_1["default"]["create"](_0x5dc8e3);

  return _0x384b73;
}

async function editNotification(_0x13d069, _0x410263) {
  const _0x265375 = {
    'id': _0x13d069
  };
  const _0x4d6a45 = {
    "where": _0x265375
  };

  const _0x349dcf = await mysql_1["default"]['update'](_0x410263, _0x4d6a45);

  return _0x349dcf;
}

const a64_0x498fbb = {
  "getNotification": getNotification,
  "delNotification": delNotification,
  "addNotification": addNotification,
  "editNotification": editNotification
};
exports['default'] = a64_0x498fbb;