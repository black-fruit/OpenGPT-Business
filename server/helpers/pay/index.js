'use strict';

const a12_0x2dd87d = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a12_0x2dd87d);
exports['hpjpay'] = exports['jspay'] = exports["yipay"] = exports['alipay'] = void 0;

const tslib_1 = require("tslib"),
      alipay_1 = tslib_1["__importDefault"](require("./alipay"));

exports["alipay"] = alipay_1["default"];
const yipay_1 = tslib_1["__importDefault"](require("./yipay"));
exports["yipay"] = yipay_1['default'];
const jspay_1 = tslib_1["__importDefault"](require("./jspay"));
exports["jspay"] = jspay_1["default"];
const hpjpay_1 = tslib_1["__importDefault"](require('./hpjpay'));
exports['hpjpay'] = hpjpay_1["default"];