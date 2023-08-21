"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getConfig(key) {
    const config = {
        port: 3200,
        mysql_config: {
            dialect: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'gpt-web',
            password: 'z2892274Z!',
            database: 'gpt-web',
            timezone: '+08:00',
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            }
        },
        redis_config: {
            type: 'redis',
            host: '127.0.0.1',
            port: 6379,
            password: 'z2892274'
        },
    };
    if (key) {
        return config[key];
    }
    return config;
}
exports.default = {
    getConfig
};
//# sourceMappingURL=index.js.map