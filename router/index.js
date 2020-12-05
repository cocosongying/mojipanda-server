const Checker = require('../common/checker');
const Filter = require('../common/filter');
const User = require('../controller/user');
const AppInfo = require('../controller/appInfo');
const Blog = require('../controller/blog');
const Mzitu = require('../controller/mzitu');
const Cook = require('../controller/cook');
const { Role } = require('../const/userattr');

const filters = [
    ["/user/login", Filter.noCheck],
    ["/app", Filter.noCheck],
    ["/blog", Filter.noCheck],
    ["/cook", Filter.noCheck],
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
    ["/checkVersion", AppInfo.checkVersion],
];

const blog = [
    ["/category", Blog.getCategories],
    ["/list", Blog.list],
];

const mzitu = [
    ["/list", Mzitu.list, { roles: [Role.Admin] }],
    ["/grid", Mzitu.grid, { roles: [Role.Admin] }],
]

const cook = [
    ["/add", Cook.add],
    ["/list", Cook.list],
    ["/detail", Cook.detail],
    ["/update", Cook.update],
    ["/delete", Cook.delete],
]

module.exports = [
    Checker(filters),
    [user, "/user"],
    [app, "/app"],
    [blog, "/blog"],
    [mzitu, "/mzitu"],
    [cook, "/cook"],
];