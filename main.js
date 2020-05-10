const config = require('./config');
const Log = require('./common/util/log');
Log.setName(config.log.dir, Log.LogLevel.Debug);
const log = new Log(__filename);

const init = require('./common/servlet');
const app = init(require('./router'));
const server = app.listen(config.port, config.host, () => {
    log.info(`mojipanda api server is starting at port ${config.port}`);
});
server.timeout = 30 * 60 * 1000;
server.keepAliveTimeout = 5 * 60 * 1000;

process.on('uncaughtException', err => log.error(err));
process.on('unhandledRejection', event => log.error(event));
