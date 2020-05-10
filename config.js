const initVal = {
    host: '0.0.0.0',
    port: 2001,
    log: {
        dir: 'logs/node'
    },
    redis: {
        host: 'localhost',
        password: '123456',
        db: 1,
    }
}
// 外部配置文件地址
const conf = "/conf/api.js";
module.exports = require('./common/util/config')(initVal, conf);
