'use strict';

const a37_0x3cc540 = {
  "value": true
};
Object["defineProperty"](exports, "__esModule", a37_0x3cc540);

const tslib_1 = require('tslib'),
      express_1 = tslib_1["__importDefault"](require("express"));

require('express-async-errors');

const path_1 = tslib_1['__importDefault'](require('path')),
      cors_1 = tslib_1["__importDefault"](require("cors")),
      crypto_1 = tslib_1['__importDefault'](require("crypto")),
      routers_1 = tslib_1['__importDefault'](require("./routers")),
      db_1 = tslib_1["__importStar"](require("./models/db")),
      config_1 = tslib_1['__importDefault'](require("./config")),
      verify_1 = tslib_1["__importDefault"](require('./middlewares/verify')),
      schedule_1 = require("./helpers/schedule"),
      catchError_1 = tslib_1["__importDefault"](require("./middlewares/catchError")),
      utils_1 = require("./utils"),
      node_fetch_1 = tslib_1["__importDefault"](require("node-fetch")),
      app = (0, express_1["default"])();

app["use"]((0, cors_1["default"])());
app["use"](express_1['default']["static"](path_1['default']["join"](__dirname, "../dist")));
app["use"]("/static/uploads", express_1["default"]["static"](path_1["default"]["join"](__dirname, "../uploads")));
app["use"](express_1["default"]["json"]());
const a37_0x5c5213 = {
  "extended": false
};
app["use"](express_1['default']["urlencoded"](a37_0x5c5213));
const a37_0x2eb26b = {
  "type": "text/plain"
};
app["use"](express_1["default"]["text"](a37_0x2eb26b));

app["use"](verify_1["default"]);
(0, db_1['default'])();
(0, routers_1['default'])(app);
(0, schedule_1["globalScheduleJobs"])();
app["all"]("/api/*", (_0x1564a5, _0x1061c2) => {
  const _0x20b0af = {
    "code": -1,
    "data": [],
    "message": "The current access API address does not exist"
  };

  _0x1061c2["status"](404)['json'](_0x20b0af);
});
app["get"]('*', (_0x1984c6, _0x91e602) => {
  _0x91e602["sendFile"](path_1["default"]["join"](__dirname, "../dist", "index.html"));
});
app['use'](catchError_1["default"]);
const server = app["listen"](config_1['default']["getConfig"]("port"), () => {
  console["log"]("Server is running on port " + config_1["default"]["getConfig"]("port"));
});