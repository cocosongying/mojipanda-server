const initVal = {
    host: '0.0.0.0',
    port: 2001,
    log: {
        dir: 'logs/node'
    }
}
// 外部配置文件地址
const conf = "/mojipanda/conf/api.js";
module.exports = require('./common/util/config')(initVal, conf);
