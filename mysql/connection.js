const mysql = require('mysql2');
const config = require('../config');
const pool = mysql.createPool(config.mysql);
const client = pool.promise();

module.exports = {
    pool,
    client
};