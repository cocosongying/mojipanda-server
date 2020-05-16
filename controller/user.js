const ApiReturn = require('../common/util/api_return');
const CryptoUtil = require('../common/util/crypto');
const UserService = require('../service/user');

class User {
    async doLogin(params) {
        let checkInfo = await UserService.check(params);
        if (checkInfo) {
            let data = await UserService.doLogin(checkInfo);
            return ApiReturn.success(data);
        }
        return ApiReturn.error();
    }
    async list(params) {
        let total = await UserService.count();
        let list = await UserService.list(params);
        let data = {
            total: total,
            list: list
        }
        return ApiReturn.success(data);
    }
    async getById(params) {
        let info = await UserService.getById(params);
        let data = {
            userInfo: info
        }
        return ApiReturn.success(data);
    }
    async add(params) {
        await UserService.add(params);
        return ApiReturn.success();
    }
    async updateById(params) {
        await UserService.updateById(params);
        return ApiReturn.success();
    }
}

module.exports = new User();