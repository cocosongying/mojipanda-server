-- 创建数据库
use moji;

-- 创建用户
db.createUser({
    user: 'panda',
    pwd: 'bamboo',
    roles: [{ role: 'dbOwner', db: 'moji' }]
});

-- 切换用户登录
db.auth('panda', 'bamboo');

-- 创建临时测试表
db.createCollection('demo');

-- 插入一条测试数据
db.demo.insert({name: 'demo', desc: '测试建表'});
