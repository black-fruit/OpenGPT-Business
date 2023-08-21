'use strict';

const a57_0x3db48c = {
  "value": true
};
Object['defineProperty'](exports, "__esModule", a57_0x3db48c);
exports["drawRecordModel"] = exports["uploadRecordModel"] = exports["installedPluginModel"] = exports['pluginModel'] = exports["personaModel"] = exports['dialogModel'] = exports["withdrawalRecordModel"] = exports["amountDetailsModel"] = exports["cashbackModel"] = exports["inviteRecordModel"] = exports['notificationModel'] = exports["actionModel"] = exports["orderModel"] = exports["paymentModel"] = exports["configModel"] = exports["aikeyModel"] = exports['messageModel'] = exports["signinModel"] = exports["turnoverModel"] = exports["carmiModel"] = exports["productModel"] = exports["userModel"] = void 0;

const tslib_1 = require("tslib"),
      user_1 = tslib_1["__importDefault"](require('./user'));

exports["userModel"] = user_1['default'];
const product_1 = tslib_1['__importDefault'](require('./product'));
exports["productModel"] = product_1["default"];
const carmi_1 = tslib_1["__importDefault"](require("./carmi"));
exports["carmiModel"] = carmi_1["default"];
const turnover_1 = tslib_1["__importDefault"](require("./turnover"));
exports["turnoverModel"] = turnover_1["default"];
const signin_1 = tslib_1['__importDefault'](require("./signin"));
exports['signinModel'] = signin_1["default"];
const message_1 = tslib_1["__importDefault"](require("./message"));
exports['messageModel'] = message_1["default"];
const aikey_1 = tslib_1["__importDefault"](require('./aikey'));
exports["aikeyModel"] = aikey_1["default"];
const config_1 = tslib_1['__importDefault'](require('./config'));
exports["configModel"] = config_1["default"];
const payment_1 = tslib_1["__importDefault"](require("./payment"));
exports["paymentModel"] = payment_1['default'];
const order_1 = tslib_1['__importDefault'](require('./order'));
exports["orderModel"] = order_1["default"];
const action_1 = tslib_1["__importDefault"](require('./action'));
exports['actionModel'] = action_1["default"];
const notification_1 = tslib_1["__importDefault"](require('./notification'));
exports["notificationModel"] = notification_1["default"];
const inviteRecord_1 = tslib_1["__importDefault"](require('./inviteRecord'));
exports['inviteRecordModel'] = inviteRecord_1['default'];
const cashback_1 = tslib_1["__importDefault"](require("./cashback"));
exports["cashbackModel"] = cashback_1["default"];
const amountDetails_1 = tslib_1["__importDefault"](require("./amountDetails"));
exports['amountDetailsModel'] = amountDetails_1["default"];
const withdrawalRecord_1 = tslib_1["__importDefault"](require("./withdrawalRecord"));
exports['withdrawalRecordModel'] = withdrawalRecord_1["default"];
const dialog_1 = tslib_1['__importDefault'](require("./dialog"));
exports["dialogModel"] = dialog_1["default"];
const persona_1 = tslib_1["__importDefault"](require("./persona"));
exports["personaModel"] = persona_1["default"];
const plugin_1 = tslib_1['__importDefault'](require("./plugin"));
exports["pluginModel"] = plugin_1["default"];
const installedPlugin_1 = tslib_1["__importDefault"](require("./installedPlugin"));
exports["installedPluginModel"] = installedPlugin_1["default"];
const uploadRecord_1 = tslib_1["__importDefault"](require("./uploadRecord"));
exports['uploadRecordModel'] = uploadRecord_1["default"];
const drawRecord_1 = tslib_1['__importDefault'](require("./drawRecord"));
exports['drawRecordModel'] = drawRecord_1["default"];