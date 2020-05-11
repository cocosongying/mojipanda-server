-- 创建数据库
create database if not exists moji default charset utf8mb4 collate utf8mb4_general_ci;

-- 创建用户
create user 'panda'@'%' identified by 'bamboo';

-- 给用户授权
grant all privileges on moji.* to 'panda'@'%';
