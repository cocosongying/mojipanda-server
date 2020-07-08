const Checker = require('../common/checker');
const Filter = require('../common/filter');
const User = require('../controller/user');
const AppInfo = require('../controller/appInfo');
const { Role } = require('../const/userattr');

const filters = [
    ["/user/login", Filter.noCheck],
    ["/app", Filter.noCheck],
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

const app = [
    ["/all", AppInfo.getListByName],
    ["/getById", AppInfo.getById],
    ["/getVersion", AppInfo.getVersionByName],
];

module.exports = [
    Checker(filters),
    [user, "/user"],
    [app, "/app"],
];