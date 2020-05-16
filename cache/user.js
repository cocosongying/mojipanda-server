const Cache = require('./connection');

const KEY = {
    USERID_INFO: 'userinfo:id:'
}

async function getInfoById(method, params) {
    let { id } = params;
    let key = `${KEY.USERID_INFO}${id}`;
    let info = await Cache.getJson(key);
    if (!info) {
        info = await method(params);
        if (info) {
            await Cache.setJson(key, info, Cache.Timeout.Default);
        }
    }
    return info;
}

async function delInfo(id) {
    let key = `${KEY.USERID_INFO}${id}`;
    await Cache.del(key);
}

module.exports = {
    getInfoById,
    delInfo
}