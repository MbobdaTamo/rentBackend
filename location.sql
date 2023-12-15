-- Adminer 4.8.0 MySQL 5.5.5-10.3.27-MariaDB-0+deb10u1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Access`;
CREATE TABLE `Access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager` int(11) NOT NULL,
  `cite` int(11) NOT NULL,
  `isActive` int(11) NOT NULL DEFAULT 1 COMMENT '1 = yes, 0= no',
  PRIMARY KEY (`id`),
  KEY `manager` (`manager`),
  KEY `cite` (`cite`),
  CONSTRAINT `Access_ibfk_1` FOREIGN KEY (`manager`) REFERENCES `Manager` (`id`),
  CONSTRAINT `Access_ibfk_2` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Chambre`;
CREATE TABLE `Chambre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `location` varchar(300) DEFAULT NULL,
  `loyerParDefaut` varchar(100) DEFAULT NULL,
  `cite` int(11) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `cite` (`cite`),
  CONSTRAINT `Chambre_ibfk_1` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`),
  CONSTRAINT `Chambre_ibfk_2` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`),
  CONSTRAINT `Chambre_ibfk_3` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Charge`;
CREATE TABLE `Charge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` int(11) NOT NULL,
  `raison` varchar(3000) NOT NULL,
  `manager` int(11) NOT NULL,
  `managerNom` varchar(40) NOT NULL,
  `contrat` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contrat` (`contrat`),
  CONSTRAINT `Charge_ibfk_2` FOREIGN KEY (`contrat`) REFERENCES `ContratLocation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Cite`;
CREATE TABLE `Cite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) NOT NULL,
  `location` varchar(400) NOT NULL,
  `description` varchar(400) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `ContratLocation`;
CREATE TABLE `ContratLocation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `locataire` int(11) NOT NULL,
  `chambre` int(11) NOT NULL,
  `date_debut` datetime NOT NULL,
  `loyer` int(11) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `totalPayer` int(11) NOT NULL DEFAULT 0,
  `totalCharge` int(11) NOT NULL DEFAULT 0,
  `nbrMoisPayer` int(11) NOT NULL DEFAULT 0,
  `payDebutMois` int(11) NOT NULL COMMENT '0 = non 1= oui',
  `deleted` int(11) NOT NULL DEFAULT 0,
  `stopped` datetime NOT NULL DEFAULT '2100-01-01 00:00:00',
  PRIMARY KEY (`id`),
  KEY `locataire` (`locataire`),
  KEY `chambre` (`chambre`),
  CONSTRAINT `ContratLocation_ibfk_1` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  CONSTRAINT `ContratLocation_ibfk_2` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`),
  CONSTRAINT `ContratLocation_ibfk_3` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  CONSTRAINT `ContratLocation_ibfk_4` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`),
  CONSTRAINT `ContratLocation_ibfk_5` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  CONSTRAINT `ContratLocation_ibfk_6` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Locataire`;
CREATE TABLE `Locataire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(35) NOT NULL,
  `prenom` varchar(35) NOT NULL,
  `tel1` varchar(35) NOT NULL,
  `tel2` varchar(35) NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT 'default.png',
  `age` varchar(30) DEFAULT NULL,
  `sexe` varchar(30) NOT NULL,
  `situation_matrimonial` varchar(20) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `infos` text NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Manager`;
CREATE TABLE `Manager` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(35) NOT NULL,
  `tel` int(30) NOT NULL,
  `password` varchar(35) NOT NULL,
  `role` varchar(35) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Payment`;
CREATE TABLE `Payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `manager` int(11) NOT NULL,
  `managerNom` varchar(40) NOT NULL,
  `contratLocation` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contraLocation` (`contratLocation`),
  CONSTRAINT `Payment_ibfk_3` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`),
  CONSTRAINT `Payment_ibfk_6` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`),
  CONSTRAINT `Payment_ibfk_7` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


DROP TABLE IF EXISTS `Variants`;
CREATE TABLE `Variants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `montant` int(11) NOT NULL,
  `startMonth` datetime NOT NULL,
  `description` varchar(70) NOT NULL DEFAULT '',
  `contrat` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contrat` (`contrat`),
  CONSTRAINT `Variants_ibfk_1` FOREIGN KEY (`contrat`) REFERENCES `ContratLocation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 2023-12-15 18:50:46
