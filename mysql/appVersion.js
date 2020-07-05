const { client } = require('./connection');
const { getFields } = require('../common/util/strs');
const fields = ['id', 'name', 'version', 'description', 'createTime'];

async function add(info) {
    let {} = info;
    let args = [];
    let sql = `insert into app_version(name, version, description, createTime)
        values (?,?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

async function count() {
    let sql = `select count(1) as total from app_version`;
    let res = await client.query(sql);
    return res[0][0].total;
}

async function getAll(opts, cols) {
    let { start, size, name } = opts;
    let sql = `select ?? from app_version where name = ? 
        order by createTime desc limit ?,?`;
    let args = [getFields(cols, fields), name, start, size];
    let res = await client.query(sql, args);
    return res[0];
}

async function findById(id, cols) {
    let sql = `select ?? from app_version where id = ?`;
    let args = [getFields(cols, fields), id];
    let res = await client.query(sql, args);
    return res[0][0];
}

module.exports = {
    add,
    count,
    getAll,
    findById,
};