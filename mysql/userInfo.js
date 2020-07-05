const { client } = require('./connection');
const { getFields } = require('../common/util/strs');
const fields = ['id', 'username', 'nickname', 'description', 'avatar', 'role',
    'active', 'menu', 'createTime', 'updateTime', 'lastLogin'];

async function add(info) {
    let { username, password, nickname,
        description, avatar, role, active, menu, createTime,
        updateTime, lastLogin } = info
    let args = [username, password, nickname,
        description, avatar, role, active, menu, createTime,
        updateTime, lastLogin];
    let sql = `insert into user_info(username, password, nickname, 
        description, avatar, role, active, menu, createTime, 
        updateTime, lastLogin) values (?,?,?,?,?,?,?,?,?,?,?)`;
    let res = await client.query(sql, args);
    return res[0];
}

async function findById(id, cols) {
    let sql = `select ?? from user_info where id = ?`;
    let args = [getFields(cols, fields), id];
    let res = await client.query(sql, args);
    return res[0][0];
}

async function count() {
    let sql = `select count(1) as total from user_info where 1 = 1`;
    let res = await client.query(sql);
    return res[0][0].total;
}

async function list(opts, cols) {
    let { start, size } = opts;
    let sql = `select ?? from user_info where 1 = 1 order by active desc limit ?,?`;
    let args = [getFields(cols, fields), start, size];
    let res = await client.query(sql, args);
    return res[0];
}

async function updateById(id, items) {
    let sql = `update user_info set ? where id = ?`;
    let args = [items, id];
    let res = await client.query(sql, args);
    return res[0];
}

async function check(opts, cols) {
    let { username, password } = opts;
    let sql = `select ?? from user_info
        where active = 1 and username = ? and password = ?`;
    let args = [getFields(cols, fields), username, password];
    let res = await client.query(sql, args);
    return res[0][0];
}

module.exports = {
    add,
    findById,
    count,
    list,
    updateById,
    check,
};