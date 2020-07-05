const ApiReturn = require('../common/util/api_return');
const StatusCode = require('../const/statusCode');
const AppInfoService = require('../service/appInfo');

class AppInfo {
    async getListByName(params) {
        let total = await AppInfoService.count();
        let list = await AppInfoService.getListByName(params);
        let data = {
            total: total,
            list: list
        }
        return ApiReturn.success(data);
    }

    async getById(params) {
        let res = await AppInfoService.getById(params);
        let data = {
            appInfo: res
        }
        return ApiReturn.success(data);
    }
}

module.exports = new AppInfo();