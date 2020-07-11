const CryptoUtil = require('../common/util/crypto');
const RandomUtil = require('../common/util/random');
const UserAttr = require('../const/userattr');
const UserInfoDB = require('../mysql/userInfo');
const TokenCache = require('../cache/token');
const UserCache = require('../cache/user');

async function findById(params) {
    let { id } = params;
    let res = await UserInfoDB.findById(id);
    if (res) {
        let userInfo = {
            id: res.id,
            username: res.username,
            nickname: res.nickname,
            description: res.description,
            avatar: res.avatar,
            role: res.role,
            menu: res.menu,
            active: res.active,
            lastLogin: res.lastLogin
        }
        return userInfo;
    }
    return null;
}

class User {
    async check(params) {
        let { username } = params;
        let password = CryptoUtil.aesDecrypt(params.password);
        if (!password) {
            return null;
        }
        password = CryptoUtil.hmacSHA1(password);
        if (!password) {
            return null;
        }
        let opts = {
            username: username,
            password: password
        };
        let res = await UserInfoDB.check(opts);
        return res
    }
    async doLogin(params) {
        let { id, username, nickname, role, avatar, description, menu } = params;
        let now = Date.now();
        let random = RandomUtil.genStr(18);
        let token = `${id}_${now}_${random}`;
        let userInfo = {
            userId: id,
            username: username,
            nickname: nickname,
            role: role,
            avatar: avatar,
            description: description,
            menu: menu,
        }
        let data = {
            userInfo: userInfo,
            token: token,
        }
        let oToken = await TokenCache.getTokenById(id);
        if (oToken) {
            await TokenCache.delTokenInfo(oToken);
        }
        await TokenCache.setTokenById({ id: id, token: token, timeout: 24 * 60 * 60 });
        await TokenCache.setTokenInfo({ token: token, info: userInfo, timeout: 24 * 60 * 60 });
        let updateInfo = {
            lastLogin: now
        }
        await UserInfoDB.updateById(id, updateInfo);
        return data;
    }
    async count() {
        let total = await UserInfoDB.count();
        return total;
    }
    async list(params) {
        let opts = {
            start: params.pageStart || 0,
            size: params.pageSize || 10
        }
        let items = ["id", "username", "nickname", "role", "active", "lastLogin"];
        let res = await UserInfoDB.list(opts, items);
        return res;
    }
    async getById(params) {
        let res = await UserCache.getInfoById(findById, params);
        return res;
    }
    async updateById(params) {
        let { id } = params;
        let now = Date.now();
        let userInfo = {
            updateTime: now,
        }
        if (params.nickname !== undefined) {
            userInfo.nickname = params.nickname;
        }
        if (params.description !== undefined) {
            userInfo.description = params.description;
        }
        if (params.avatar !== undefined) {
            userInfo.avatar = params.avatar;
        }
        if (params.menu !== undefined) {
            userInfo.menu = params.menu;
        }
        if (params.active !== undefined) {
            userInfo.active = params.active ? 1 : 0;
        }
        await UserInfoDB.updateById(id, userInfo);
        await UserCache.delInfo(id);
    }
    async add(params) {
        let now = Date.now();
        let userInfo = {
            username: params.username,
            password: CryptoUtil.hmacSHA1("123456"),
            nickname: params.nickname,
            description: params.description,
            avatar: params.avatar,
            role: UserAttr.Role.Normal,
            active: UserAttr.State.Active,
            menu: params.menu,
            createTime: now,
            updateTime: now,
            lastLogin: 0,
        }
        await UserInfoDB.add(userInfo);
    }
    async modifyPasswd(params) {
        let { id, password } = params;
        let now = Date.now();
        let info = {
            password: CryptoUtil.hmacSHA1(password),
            updateTime: now
        }
        await UserInfoDB.updateById(id, info);
    }
}

module.exports = new User();