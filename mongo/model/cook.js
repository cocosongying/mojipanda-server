const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    cover: String,
    detail: String,
    createTime: Number,
    updateTime: Number,
});

const db = mongoose.model('cook', schema, 'cook');
module.exports = db;