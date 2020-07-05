CREATE TABLE `app_version` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '应用名称',
  `version` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '版本号',
  `description` text COLLATE utf8mb4_general_ci COMMENT '升级描述',
  `createTime` bigint DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='应用版本记录';