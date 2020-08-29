const { client } = require('./connection');
const { getFields } = require('../common/util/strs');
const fields = ['id', 'parentId', 'url', 'title', 'type', 'createTime'];

async function add(info) {
    let { parentId, url, title, type, createTime } = info
    let args = [parentId, url, title, type, createTime];
    let sql = `insert into mzitu(parentId, url, title, type, createTime) 
        values (?,?,?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

async function findByParentId(parentId, cols) {
    let sql = `select ?? from mzitu where parentId = ? and isDeleted = 0`;
    let args = [getFields(cols, fields), parentId];
    let res = await client.query(sql, args);
    return res[0];
}

async function fingByType(opts, cols) {
    let { type, start, limit } = opts;
    let sql = `select ?? from mzitu where parentId = 0 and isDeleted = 0 `;
    let args = [getFields(cols, fields)];
    if (type) {
        sql += `and type = ? `;
        args.push(type);
    }
    sql += `order by createTime desc limit ?,?`;
    args.push(start, limit);
    let res = await client.query(sql, args);
    return res[0];
}

module.exports = {
    add,
    findByParentId,
    fingByType,
}