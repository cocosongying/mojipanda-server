const Checker = require('../common/checker');
const Filter = require('../common/filter');
const User = require('../controller/user');
const { Role } = require('../const/userattr');

const filters = [
    ["/user/login", Filter.noCheck],
    ["/", Filter.checkToken],
];

const user = [
    ["/login", User.doLogin],
    ["/list", User.list, { roles: [Role.Admin] }],
    ["/getById", User.getById],
    ["/add", User.add, { roles: [Role.Admin] }],
    ["/updateById", User.updateById, { roles: [Role.Admin, Role.Normal] }],
    ["/resetPasswd", User.resetPasswd, { roles: [Role.Admin] }],
    ["/modifyPasswd", User.modifyPasswd, { roles: [Role.Admin, Role.Normal] }],
];

module.exports = [
    Checker(filters),
    [user, "/user"],
];