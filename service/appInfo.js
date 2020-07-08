const AppVersion = require('../mysql/appVersion');

class AppInfo {
    async getListByName(params) {
        let opts = {
            start: params.pageStart || 0,
            size: params.pageSize || 20,
            name: params.name
        }
        let res = await AppVersion.getAll(opts);
        return res;
    }
    async count(params) {
        let opts = {
            name: params.name
        }
        let total = await AppVersion.count(opts);
        return total;
    }
    async getById(params) {
        let { id } = params;
        let res = await AppVersion.findById(id);
        return res;
    }
    async getByName(params) {
        let { name } = params;
        let res = await AppVersion.findByName(name);
        return res;
    }
}

module.exports = new AppInfo();