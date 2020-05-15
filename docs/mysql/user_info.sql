CREATE TABLE `user_info` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) COLLATE utf8mb4_general_ci NOT NULL COMMENT '登录名',
  `password` varchar(128) COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '昵称',
  `description` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '简介',
  `avatar` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像',
  `role` tinyint NOT NULL DEFAULT '1' COMMENT '角色',
  `active` tinyint NOT NULL DEFAULT '1' COMMENT '是否有效',
  `menu` text COLLATE utf8mb4_general_ci COMMENT '菜单权限',
  `createTime` bigint DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint DEFAULT NULL COMMENT '修改时间',
  `lastLogin` bigint DEFAULT NULL COMMENT '上次登录',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;