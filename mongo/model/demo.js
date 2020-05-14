const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demoSchema = new Schema({
    name: String,
    desc: String,
})

const db = mongoose.model('demo', demoSchema, 'demo');
module.exports = db;