const TokenCache = require('../cache/token');

async function noCheck(params, request, response) {
    return true;
}

async function checkToken(params, request, response) {
    let { token } = params;
    if (!token) {
        return false;
    }
    // 根据 token 获取信息
    let tokenInfo = await TokenCache.getInfoByToken(token);
    if (!tokenInfo) {
        return false;
    }
    request.mojiToken = tokenInfo;
    return true;
}

module.exports = {
    noCheck,
    checkToken
}