'use strict';

const a74_0x2f5fcb = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a74_0x2f5fcb);

const tslib_1 = require('tslib'),
      mysql_1 = tslib_1["__importDefault"](require("./mysql"));

async function getProducts({
  "page": _0x311721,
  "page_size": _0x37ca5b
}, _0x8ba5dd) {
  const _0x20fb9b = await mysql_1['default']["findAndCountAll"]({
    'where': _0x8ba5dd,
    'order': [["create_time", "DESC"]],
    'offset': _0x311721 * _0x37ca5b,
    'limit': _0x37ca5b
  });

  return _0x20fb9b;
}

async function getProduct(_0x2f2fea) {
  const _0x33887b = await mysql_1["default"]['findByPk'](_0x2f2fea);

  if (!_0x33887b) {
    return null;
  }

  return _0x33887b["toJSON"]();
}

async function delProduct(_0x5078a1) {
  const _0x418518 = {
    'id': _0x5078a1
  };
  const _0x156bfc = {
    'where': _0x418518
  };

  const _0x5ae463 = await mysql_1['default']["destroy"](_0x156bfc);

  return _0x5ae463;
}

async function addProduct(_0x140936) {
  const _0x18eaf5 = await mysql_1["default"]["create"](_0x140936);

  return _0x18eaf5;
}

async function editProduct(_0xc9cb7a) {
  const _0x4f2f61 = await mysql_1["default"]["upsert"](_0xc9cb7a);

  return _0x4f2f61;
}

const a74_0x364251 = {
  "getProducts": getProducts,
  "delProduct": delProduct,
  "addProduct": addProduct,
  "editProduct": editProduct,
  "getProduct": getProduct
};
exports["default"] = a74_0x364251;