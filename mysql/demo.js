const {client} = require('./connection');

async function getAll() {
    let sql = `select * from demo`;
    let res = await client.query(sql);
    return res[0];
}

module.exports = {
    getAll,
};