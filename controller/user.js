const ApiReturn = require('../common/util/api_return');
const CryptoUtil = require('../common/util/crypto');
const UserAttr = require('../const/userattr');
const UserInfoDB = require('../mysql/user');

class User {
    async doLogin(params) {
        let { username } = params;
        let now = Date.now();
        let password = CryptoUtil.aesDecrypt(params.password);
        password = CryptoUtil.hmacSHA256(password);
        let opts = {
            username: username,
            password: password
        };
        let data = {};
        let res = await UserInfoDB.check(opts);
        if (res) {
            data.userInfo = {
                userId: res.id,
                username: res.username,
                nickname: res.nickname,
                avatar: res.avatar,
                description: res.description,
                menu: res.menu,
            }
            let updateInfo = {
                lastLogin: now
            }
            await UserInfoDB.updateById(res.id, updateInfo);
            return ApiReturn.success(data);
        }
        return ApiReturn.error(data);
    }
    async list(params) {
        let opts = {
            start: params.pageStart || 0,
            size: params.pageSize || 10
        }
        let total = await UserInfoDB.count();
        let items = ["id", "username", "nickname", "role"];
        let res = await UserInfoDB.list(opts, items);
        let data = {
            total: total,
            list: res
        }
        return ApiReturn.success(data);
    }
    async getById(params) {
        let { id } = params;
        let data = {};
        let res = await UserInfoDB.findById(id);
        if (res) {
            data.userInfo = {
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
        }
        return ApiReturn.success(data);
    }
    async add(params) {
        let now = Date.now();
        let password = CryptoUtil.aesDecrypt(params.password);
        password = CryptoUtil.hmacSHA256(password);
        let userInfo = {
            username: params.username,
            password: password,
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
        return ApiReturn.success();
    }
    async updateById(params) {
        let { token, id } = params;
        if (token.role == UserAttr.Role.Normal) {
            id = token.userId;
        }
        let now = Date.now();
        let userInfo = {
            username: params.username,
            nickname: params.nickname,
            description: params.description,
            avatar: params.avatar,
            active: params.active,
            menu: params.menu,
            updateTime: now,
        }
        await UserInfoDB.updateById(params.id, userInfo);
        return ApiReturn.success();
    }
}

module.exports = new User();