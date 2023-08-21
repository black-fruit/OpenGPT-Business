'use strict';

const a6_0xc1cbb1 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a6_0xc1cbb1);

const tslib_1 = require("tslib"),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      vm2_1 = require("vm2");

async function safeRunScript(_0x3677fc) {
  const _0x461f95 = {
    "fetch": node_fetch_1['default'],
    "URLSearchParams": URLSearchParams
  };
  const _0x146cce = {
    'external': true,
    "builtin": ['fs', "path", "crypto"]
  };
  const _0xb06932 = {
    "console": "inherit",
    "sandbox": _0x461f95,
    "eval": false,
    "wasm": false,
    'require': _0x146cce,
    'env': _0x3677fc['env'],
    "wrapper": "commonjs"
  };

  const _0x37ef88 = new vm2_1["NodeVM"](_0xb06932),
        _0x32cbc8 = "\n\t  " + _0x3677fc["script"] + "\n\t  module.exports = { " + _0x3677fc["scriptName"] + " };\n\t",
        _0x13f8b1 = _0x37ef88["run"](_0x32cbc8),
        _0x7bd285 = await _0x13f8b1[_0x3677fc["scriptName"]](_0x3677fc['params']);

  return _0x7bd285;
}

const a6_0x1fbd76 = {
  "safeRunScript": safeRunScript
};
exports["default"] = a6_0x1fbd76;