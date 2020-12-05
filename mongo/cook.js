const CookSchema = require('./model/cook');

// 根据 ID 获取
async function findById(id) {
    await CookSchema.findById(id);
}

// 条件查询列表
async function list(opts) {
    await CookSchema.find(opts);
}

// 保存
async function save(info) {
    let now = Date.now();
    let schema = new CookSchema(info);
    schema.createTime = schema.createTime || now;
    schema.updateTime = schema.updateTime || now;
    await schema.save();
}

// 更新
async function update(id, props) {
    info.updateTime = Date.now();
    await CookSchema.updateOne({_id: id}, {$set: props});
}

// 删除
async function remove(id) {
    return await CookSchema.remove({_id: id});
}

module.exports = {
    findById,
    list,
    save,
    update,
    remove,
};