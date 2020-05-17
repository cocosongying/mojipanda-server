const ApiReturn = require('../common/util/api_return');
const StatusCode = require('../const/statusCode');
const CryptoUtil = require('../common/util/crypto');
const UserService = require('../service/user');
const UserAttr = require('../const/userattr');

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
        let { mojiToken, id } = params;
        if (mojiToken.role != UserAttr.Role.Admin) {
            id = mojiToken.userId;
        } else if (mojiToken.role == UserAttr.Role.Admin && id == undefined) {
            id = mojiToken.userId;
        }
        let info = {
            id: id
        }
        let res = await UserService.getById(info);
        let data = {
            userInfo: res
        }
        return ApiReturn.success(data);
    }
    async add(params) {
        await UserService.add(params);
        return ApiReturn.success();
    }
    async updateById(params) {
        let { mojiToken, id } = params;
        if (mojiToken.role == UserAttr.Role.Normal) {
            id = mojiToken.userId;
        } else if (mojiToken.role == UserAttr.Role.Admin && id == undefined) {
            id = mojiToken.userId;
        }
        let info = {
            id: id,
            nickname: params.nickname,
            description: params.description,
            avatar: params.avatar
        }
        if (mojiToken.role == UserAttr.Role.Admin) {
            info.menu = params.menu;
            info.active = params.active;
        }
        await UserService.updateById(info);
        return ApiReturn.success();
    }
    async resetPasswd(params) {
        if (!params.id) {
            return ApiReturn.error(StatusCode.INPUT_DATA_ERR);
        }
        let info = {
            id: params.id,
            password: "123456"
        }
        await UserService.modifyPasswd(info);
        return ApiReturn.success();
    }
    async modifyPasswd(params) {
        let { mojiToken, oldpassword, newpassword, newpassword2 } = params;
        let password = CryptoUtil.aesDecrypt(newpassword);
        let password2 = CryptoUtil.aesDecrypt(newpassword2);
        if (password != password2) {
            return ApiReturn.error();
        }
        let checkInfo = {
            username: mojiToken.username,
            password: oldpassword
        }
        let res = await UserService.check(checkInfo);
        if (!res) {
            return ApiReturn.error();
        }
        let info = {
            id: mojiToken.userId,
            password: password
        }
        await UserService.modifyPasswd(info);
        return ApiReturn.success();
    }
}

module.exports = new User();