const mongoose = require('mongoose');
const config = require('../config');
const log = require('../common/util/log')(__filename);

mongoose.Promise = global.Promise;

function getOptions() {
    return {
        useCreateIndex: true,
        useMongoClient: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        reconnectTries: Number.MAX_VALUE
    };
}

const client = mongoose.createConnection(config.mongo.url, getOptions());
client.on('connected', () => { log.debug("mongo connected") });
client.on('reconnected', () => { log.debug("mongo reconnected") });
client.on('disconnected', () => { log.debug("mongo disconnected") });
client.on('error', (error) => { log.error("connect to " + config.mongo.url + "failed") });

function close() {
    client.close();
}

module.exports = {
    client,
    close
};