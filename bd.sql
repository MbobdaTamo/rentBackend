-- Adminer 4.8.0 MySQL 5.5.5-10.3.27-MariaDB-0+deb10u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Object`;
CREATE TABLE `Object` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(40) NOT NULL,
  `owner` varchar(40) NOT NULL,
  `description` varchar(400) NOT NULL,
  `Country` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `quater` varchar(40) NOT NULL,
  `place` varchar(40) NOT NULL,
  `when1` date NOT NULL,
  `when2` date NOT NULL,
  `kind` varchar(10) NOT NULL COMMENT 'lost or found',
  `state` int(11) NOT NULL DEFAULT 0 COMMENT '0=pending',
  `imgName` varchar(300) NOT NULL,
  `img0` varchar(300) NOT NULL DEFAULT '',
  `img1` varchar(300) NOT NULL DEFAULT '',
  `img2` varchar(300) NOT NULL DEFAULT '',
  `img3` varchar(300) NOT NULL DEFAULT '',
  `creationDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted` int(11) NOT NULL DEFAULT 0,
  `creator` int(11) NOT NULL,
  `referent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `creator` (`creator`),
  KEY `referent` (`referent`),
  CONSTRAINT `Object_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `User` (`id`),
  CONSTRAINT `Object_ibfk_3` FOREIGN KEY (`referent`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `tel` int(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2023-07-24 11:33:21
