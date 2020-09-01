const { client } = require('./connection');
const { getFields } = require('../common/util/strs');
const gridFields = ['id', 'parentId', 'url', 'createTime'];
const fields = ['id', 'url', 'title', 'type', 'createTime'];

async function add(info) {
    let { url, title, type, createTime } = info
    let args = [url, title, type, createTime];
    let sql = `insert into mzitu(url, title, type, createTime) 
        values (?,?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

async function addGrid(info) {
    let { parentId, url, createTime } = info
    let args = [parentId, url, createTime];
    let sql = `insert into mzitu_grid(parentId, url, createTime) 
        values (?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

// 获取详细数据
async function findByParentId(parentId, cols) {
    let sql = `select ?? from mzitu_grid where parentId = ? and isDeleted = 0`;
    let args = [getFields(cols, gridFields), parentId];
    let res = await client.query(sql, args);
    return res[0];
}

// 获取列表数据
async function fingByType(opts, cols) {
    let { type, start, limit } = opts;
    let sql = `select ?? from mzitu where isDeleted = 0 `;
    let args = [getFields(cols, fields)];
    if (type > 0) {
        sql += `and type = ? `;
        args.push(type);
    }
    sql += `order by createTime desc limit ?,?`;
    start = parseInt(start);
    limit = parseInt(limit);
    args.push(start * limit, limit);
    let res = await client.query(sql, args);
    return res[0];
}

module.exports = {
    add,
    addGrid,
    findByParentId,
    fingByType,
}