const HelloWorld = require('../controller/helloworld');
const User = require('../controller/user');

const hello = [
    ["/hello", HelloWorld.content],
];

const user = [
    ["/login", User.doLogin],
    ["/list", User.list],
    ["/getById", User.getById],
    ["/add", User.add],
    ["/updateById", User.updateById]
];

module.exports = [
    [hello, "/hello"],
    [user, "/user"],
];