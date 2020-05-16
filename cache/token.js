const Cache = require('./connection');

const KEY = {
    USERID_TOKEN: 'usertoken:id:',
    USER_TOKEN_INFO: 'usertoken:info:',
}

async function getTokenById(id) {
    let key = `${KEY.USERID_TOKEN}${id}`;
    let res = await Cache.get(key);
    return res;
}

async function setTokenById(params) {
    let { id, token, timeout } = params;
    let key = `${KEY.USERID_TOKEN}${id}`;
    await Cache.set(key, token, timeout);
}

async function getInfoByToken(token) {
    let key = `${KEY.USER_TOKEN_INFO}:${token}`;
    let res = await Cache.getJson(key);
    return res;
}

async function setTokenInfo(params) {
    let { token, info, timeout } = params;
    let key = `${KEY.USER_TOKEN_INFO}:${token}`;
    await Cache.setJson(key, info, timeout);
}

async function delTokenInfo(token) {
    let key = `${KEY.USER_TOKEN_INFO}:${token}`;
    await Cache.del(key);
}

module.exports = {
    getTokenById,
    setTokenById,
    getInfoByToken,
    setTokenInfo,
    delTokenInfo,
}