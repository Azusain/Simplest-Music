/*
 Navicat Premium Data Transfer

 Source Server         : Azusaings
 Source Server Type    : MySQL
 Source Server Version : 80026
 Source Host           : host:3306
 Source Schema         : MMProj

 Target Server Type    : MySQL
 Target Server Version : 80026
 File Encoding         : 65001

 Date: 24/05/2023 17:24:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Course
-- ----------------------------
DROP TABLE IF EXISTS `Course`;
CREATE TABLE `Course`  (
  `cid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `num` int NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for DateLimit
-- ----------------------------
DROP TABLE IF EXISTS `DateLimit`;
CREATE TABLE `DateLimit`  (
  `assign_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `begin` datetime NULL DEFAULT NULL,
  `end` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`assign_id`) USING BTREE,
  CONSTRAINT `DateLimit_ibfk_1` FOREIGN KEY (`assign_id`) REFERENCES `Works` (`assign_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Student
-- ----------------------------
DROP TABLE IF EXISTS `Student`;
CREATE TABLE `Student`  (
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sid` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `institute` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`sid`) USING BTREE,
  CONSTRAINT `Student_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `Works` (`sid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for Works
-- ----------------------------
DROP TABLE IF EXISTS `Works`;
CREATE TABLE `Works`  (
  `sid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `is_submited` int NULL DEFAULT NULL,
  `is_viewed` int NULL DEFAULT NULL,
  `assign_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `score` int NULL DEFAULT NULL,
  `assign_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` enum('exam','dailywork') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'dailywork',
  PRIMARY KEY (`assign_id`) USING BTREE,
  INDEX `sid`(`sid` ASC) USING BTREE,
  INDEX `cid`(`cid` ASC) USING BTREE,
  CONSTRAINT `Works_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `Course` (`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
