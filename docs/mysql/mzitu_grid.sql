CREATE TABLE `mzitu_grid` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `parentId` int unsigned NOT NULL DEFAULT '0' COMMENT '父级ID',
  `url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '链接地址',
  `isDeleted` tinyint NOT NULL DEFAULT '0' COMMENT '是否删除',
  `createTime` bigint DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;