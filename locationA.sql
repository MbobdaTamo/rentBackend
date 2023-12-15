-- Adminer 4.8.0 MySQL 5.5.5-10.3.27-MariaDB-0+deb10u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Compte`;
CREATE TABLE `Compte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `bd` varchar(100) NOT NULL,
  `tel` int(11) NOT NULL,
  `password` varchar(30) NOT NULL,
  `origin` varchar(100) NOT NULL,
  `role` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2023-12-15 18:51:29
