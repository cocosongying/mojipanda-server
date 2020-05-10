const redis = require('redis');
const { promisify } = require('util');
const config = require('../config');
const client = redis.createClient({
    host: config.redis.host,
    password: config.redis.password,
    db: config.redis.db,
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 100) {
            return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
    }
});

const expire = promisify(client.expire).bind(client);
const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);

class Cache {
    Timeout = {
        Default: 24 * 60 * 60
    };
    async get(key) {
        return await get(key);
    }
    async set(key, value, timeout) {
        let res = await set(key, value);
        if (timeout) {
            await expire(key, timeout);
        }
        return res;
    }
    async del(key) {
        await del(key);
    }
    async getJson(key) {
        let value = await get(key);
        if (value) {
            value = JSON.parse(value);
        }
        return value;
    }
    async setJson(key, value, timeout) {
        value = JSON.stringify(value);
        let res = await set(key, value);
        if (timeout) {
            await expire(key, timeout);
        }
        return res;
    }
}

module.exports = new Cache();
