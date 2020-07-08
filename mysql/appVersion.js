const { client } = require('./connection');
const { getFields } = require('../common/util/strs');
const fields = ['id', 'name', 'version', 'description', 'createTime'];

async function add(info) {
    let { name, version, description, createTime } = info;
    let args = [name, version, description, createTime];
    let sql = `insert into app_version(name, version, description, createTime)
        values (?,?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

async function count(opts) {
    let { name } = opts;
    let sql = `select count(1) as total from app_version where name = ?`;
    let args = [name];
    let res = await client.query(sql, args);
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

async function findByName(name, cols) {
    let sql = `select ?? from app_version where name = ?`;
    let args = [getFields(cols, fields), name];
    let res = await client.query(sql, args);
    return res[0][0];
}

module.exports = {
    add,
    count,
    getAll,
    findById,
    findByName,
};