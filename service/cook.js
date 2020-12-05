const CookDB = require('../mongo/cook');

class Cook {
    // 分页查询获取列表
    async list(params) {
        let opts = {}
        return await CookDB.list(opts);
    }

    // 详情
    async detail(params) {
        return await CookDB.findById(params.id);
    }

    // 新增
    async add(params) {
        await CookDB.save(params);
    }

    // 修改
    async update(params) {
        let props = {}
        await CookDB.update(params.id, props);
    }

    // 删除
    async delete(params) {
        await CookDB.remove(params.id);
    }
}

module.exports = new Cook();