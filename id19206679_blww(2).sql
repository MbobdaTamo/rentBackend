-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 24 mai 2023 à 20:07
-- Version du serveur :  10.5.16-MariaDB
-- Version de PHP : 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `id19206679_blww`
--

-- --------------------------------------------------------

--
-- Structure de la table `Chambre`
--

CREATE TABLE `Chambre` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `location` varchar(300) DEFAULT NULL,
  `loyerParDefaut` varchar(100) DEFAULT NULL,
  `cite` int(11) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Chambre`
--

INSERT INTO `Chambre` (`id`, `nom`, `description`, `location`, `loyerParDefaut`, `cite`, `deleted`) VALUES
(1, 'Chambre a', '', '', '20000', 2, 1),
(2, 'Chambre city', '', '', NULL, 3, 0),
(3, 'Chambre 456', '3 chambres, 1 salon, cuisine. ..', 'Yaoundé', '50000', 2, 0),
(4, 'Chambre a', '', '', NULL, 2, 0),
(5, 'CHAMB U', '', '', NULL, 4, 0),
(6, 'CHAMBRE EWANE', '', '', NULL, 5, 1),
(7, 'BA3', '', '', '25000', 5, 0),
(8, 'BA2', '', '', NULL, 5, 0),
(9, 'BA4', '', '', '25000', 5, 0),
(10, 'BA5', '', '', '10000', 5, 1),
(11, 'BA1', '', '', '22000', 5, 0),
(12, 'ChambTest', '', '', NULL, 7, 1),
(13, 'Chambre short Name', '10 cuisines, 20 pieces', 'Bafoussam', '69000', 5, 1),
(14, 'BA6', '', '', '30000', 5, 0),
(15, 'BA5', '', '', '30000', 5, 0),
(16, 'BB1', '', '', NULL, 8, 0),
(17, 'BB2', '', '', '10000', 8, 0),
(18, 'BB3', '', '', '10000', 8, 0),
(19, 'BB4', '', '', '10000', 8, 0),
(20, 'BB5', '', '', '10000', 8, 0),
(21, 'BB6', '', '', '10000', 8, 0),
(22, 'BB7', '', '', '10000', 8, 0),
(23, 'BB8', '', '', '10000', 8, 0),
(24, 'BB9', '', '', '10000', 8, 0),
(25, 'BB10', '', '', '10000', 8, 0),
(26, 'BLC1', '', '', NULL, 9, 0),
(27, 'BLC2', '', '', '10000', 9, 0),
(28, 'BLC3', '', '', '10000', 9, 0),
(29, 'BLC4', '', '', '10000', 9, 0),
(30, 'BLC5', '', '', '10000', 9, 0),
(31, 'BLC6', '', '', '10000', 9, 0),
(32, 'BLC7', '', '', NULL, 9, 0),
(33, 'STD1', '', '', '42500', 10, 0),
(34, 'STD2', '', '', '42500', 10, 0),
(35, 'STD3', '', '', '42500', 10, 0),
(36, 'STD4', '', '', '42500', 10, 0),
(37, 'ETA1', '', '', NULL, 11, 0),
(38, 'ETA2', '', '', '10000', 11, 0),
(39, 'ETA3', '', '', '10000', 11, 0),
(40, 'ETA4', '', '', '10000', 11, 0),
(41, 'ETA5', '', '', '10000', 11, 0),
(42, 'ETA6', '', '', '10000', 11, 0),
(43, 'ETA7', '', '', '10000', 11, 0),
(44, 'ETA8', '', '', NULL, 11, 0),
(45, 'ETA9', '', '', '10000', 11, 0),
(46, 'ETA10', '', '', '10000', 11, 0),
(47, 'ETA11', '', '', '10000', 11, 0),
(48, 'ETA12', '', '', '10000', 11, 0),
(49, 'ETA13', '', '', '10000', 11, 0),
(50, 'ETA14', '', '', '10000', 11, 0),
(51, 'ETC1', '', '', NULL, 12, 0),
(52, 'ETC2', '', '', '10000', 12, 0),
(53, 'ETC3', '', '', '10000', 12, 0),
(54, 'ETC4', '', '', '10000', 12, 0),
(55, 'ETC5', '', '', '10000', 12, 0),
(56, 'ETC6', '', '', '10000', 12, 0),
(57, 'ETC8', '', '', '10000', 12, 0),
(58, 'ETC7', '', '', '10000', 12, 0),
(59, 'ETC9', '', '', '10000', 12, 0),
(60, 'ETB1', '', '', NULL, 13, 0),
(61, 'ETB2', '', '', '10000', 13, 0),
(62, 'ETB3', '', '', '10000', 13, 0),
(63, 'ETB4', '', '', '10000', 13, 0),
(64, 'ETB6', '', '', '10000', 13, 0),
(65, 'ETB7', '', '', '10000', 13, 0),
(66, 'ETB8', '', '', '10000', 13, 0);

-- --------------------------------------------------------

--
-- Structure de la table `Cite`
--

CREATE TABLE `Cite` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `location` varchar(400) NOT NULL,
  `description` varchar(400) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Cite`
--

INSERT INTO `Cite` (`id`, `nom`, `location`, `description`, `deleted`) VALUES
(1, 'New', 'City', '', 1),
(2, 'Cité A', '', '', 1),
(3, 'New city test', '', '', 1),
(4, 'CITE UA', 'Yaounde', '', 1),
(5, 'BAT A', '', '', 0),
(6, 'Chambre Azua', '', '', 1),
(7, 'CiteTest', '', '', 1),
(8, 'BAT B', '', '', 0),
(9, 'BLOC C', '', '', 0),
(10, 'STUDIOS', '', '', 0),
(11, 'ETAGE A', '', '', 0),
(12, 'ETAGE C', '', '', 0),
(13, 'ETAGE B', '', '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `ContratLocation`
--

CREATE TABLE `ContratLocation` (
  `id` int(11) NOT NULL,
  `locataire` int(11) NOT NULL,
  `chambre` int(11) NOT NULL,
  `date_debut` datetime NOT NULL,
  `loyer` int(11) NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `totalPayer` int(11) NOT NULL DEFAULT 0,
  `nbrMoisPayer` int(11) NOT NULL DEFAULT 0,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ContratLocation`
--

INSERT INTO `ContratLocation` (`id`, `locataire`, `chambre`, `date_debut`, `loyer`, `balance`, `totalPayer`, `nbrMoisPayer`, `deleted`) VALUES
(1, 1, 1, '2022-09-30 00:00:00', 20000, -20000, 0, 0, 0),
(2, 4, 2, '2022-09-17 00:00:00', 30000, -30000, 0, 0, 0),
(3, 5, 3, '2022-09-29 00:00:00', 50000, -50000, 0, 0, 0),
(4, 6, 4, '2022-10-03 00:00:00', 5000, -5000, 0, 0, 0),
(5, 7, 5, '2022-10-01 00:00:00', 50000, -50000, 0, 0, 0),
(6, 8, 6, '2022-09-12 00:00:00', 25000, -25000, 0, 0, 0),
(7, 8, 7, '2022-09-12 00:00:00', 25000, -25000, 0, 0, 1),
(8, 10, 8, '2022-10-30 00:00:00', 25000, -25000, 0, 0, 1),
(9, 12, 9, '2022-10-30 00:00:00', 22000, -22000, 0, 0, 1),
(10, 12, 10, '2022-10-30 00:00:00', 35000, -35000, 0, 0, 1),
(11, 9, 8, '2022-07-12 00:00:00', 35000, -35000, 0, 0, 1),
(12, 9, 8, '2022-07-29 00:00:00', 35000, -35000, 0, 0, 1),
(13, 10, 9, '2022-09-30 00:00:00', 25000, 0, 25000, 1, 1),
(14, 12, 10, '2022-08-30 00:00:00', 35000, -35000, 0, 0, 0),
(15, 11, 10, '2022-08-30 00:00:00', 35000, -25000, 10000, 0, 1),
(16, 14, 11, '2022-10-30 00:00:00', 22000, -22000, 0, 0, 1),
(17, 14, 11, '2022-09-30 00:00:00', 22000, -22000, 0, 0, 1),
(18, 16, 12, '2022-10-25 00:00:00', 6000, -6000, 0, 0, 0),
(19, 13, 14, '2022-09-30 00:00:00', 30000, -30000, 0, 0, 1),
(20, 10, 11, '2022-08-30 00:00:00', 25000, 25000, 50000, 2, 0),
(21, 14, 8, '2022-08-30 00:00:00', 22000, 22000, 44000, 2, 0),
(22, 13, 7, '2022-08-30 00:00:00', 30000, 20000, 50000, 1, 0),
(23, 11, 9, '2022-07-30 00:00:00', 35000, 50000, 85000, 2, 0),
(24, 14, 14, '2022-07-30 00:00:00', 30000, -30000, 0, 0, 1),
(25, 9, 15, '2022-07-30 00:00:00', 35000, 18000, 53000, 1, 0),
(26, 8, 14, '2022-09-12 00:00:00', 25000, 0, 25000, 1, 0),
(27, 24, 16, '2022-08-30 00:00:00', 30000, 0, 30000, 1, 0),
(28, 29, 17, '2022-08-30 00:00:00', 30000, 30000, 60000, 2, 0),
(29, 31, 18, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(30, 30, 19, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(31, 23, 20, '2022-08-30 00:00:00', 30000, 30000, 60000, 2, 0),
(32, 27, 21, '2022-08-30 00:00:00', 20000, 20000, 40000, 2, 0),
(33, 22, 22, '2022-04-07 00:00:00', 15000, 45000, 60000, 4, 0),
(34, 32, 23, '2022-10-13 00:00:00', 30000, 0, 30000, 1, 0),
(35, 33, 24, '2022-09-30 00:00:00', 25000, 0, 25000, 1, 0),
(36, 28, 25, '2022-09-30 00:00:00', 30000, 0, 30000, 1, 0),
(37, 34, 26, '2022-08-28 00:00:00', 25000, 25000, 50000, 2, 0),
(38, 35, 27, '2022-08-28 00:00:00', 25000, 25000, 50000, 2, 0),
(39, 39, 28, '2022-08-28 00:00:00', 26000, 26000, 52000, 2, 0),
(40, 37, 29, '2022-08-28 00:00:00', 26000, 26000, 52000, 2, 0),
(41, 40, 30, '2022-07-28 00:00:00', 26000, 52000, 78000, 3, 0),
(42, 36, 31, '2022-08-28 00:00:00', 26000, 26000, 52000, 2, 0),
(43, 38, 32, '2022-08-28 00:00:00', 25000, 25000, 50000, 2, 0),
(44, 37, 33, '2022-08-30 00:00:00', 42500, -42500, 0, 0, 1),
(45, 22, 33, '2022-08-30 00:00:00', 42500, -42500, 0, 0, 1),
(46, 20, 33, '2022-08-30 00:00:00', 42500, 42500, 85000, 2, 0),
(47, 19, 34, '2022-07-30 00:00:00', 42500, 15000, 57500, 1, 0),
(48, 18, 35, '2022-08-30 00:00:00', 40000, -40000, 0, 0, 0),
(49, 21, 36, '2022-07-30 00:00:00', 42500, 77500, 120000, 2, 0),
(50, 56, 37, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(51, 46, 38, '2022-08-30 00:00:00', 25000, 25000, 50000, 2, 0),
(52, 52, 39, '2022-08-30 00:00:00', 25000, 25000, 50000, 2, 0),
(53, 48, 40, '2022-08-30 00:00:00', 30000, 30000, 60000, 2, 0),
(54, 59, 41, '2022-07-30 00:00:00', 25000, 20000, 45000, 1, 0),
(55, 47, 42, '2022-08-30 00:00:00', 35000, 32000, 67000, 1, 0),
(56, 55, 43, '2022-08-30 00:00:00', 30000, 30000, 60000, 2, 0),
(57, 53, 46, '2022-09-30 00:00:00', 35000, 0, 35000, 1, 0),
(58, 49, 44, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(59, 60, 45, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(60, 41, 47, '2022-09-30 00:00:00', 30000, 300000, 330000, 11, 0),
(61, 42, 48, '2022-09-30 00:00:00', 30000, 210000, 240000, 8, 0),
(62, 57, 49, '2022-09-30 00:00:00', 30000, 270000, 300000, 10, 0),
(63, 54, 50, '2022-08-30 00:00:00', 30000, 45000, 75000, 2, 0),
(64, 65, 51, '2022-11-02 00:00:00', 35000, -35000, 0, 0, 0),
(65, 66, 52, '2022-08-30 00:00:00', 40000, -40000, 0, 0, 0),
(66, 62, 53, '2022-08-30 00:00:00', 40000, 40000, 80000, 2, 0),
(67, 71, 54, '2022-08-30 00:00:00', 40000, 40000, 80000, 2, 0),
(68, 69, 55, '2022-08-30 00:00:00', 40000, 40000, 80000, 2, 0),
(69, 63, 56, '2022-08-30 00:00:00', 35000, 35000, 70000, 2, 0),
(70, 68, 58, '2022-08-30 00:00:00', 40000, 35000, 75000, 1, 0),
(71, 67, 57, '2022-08-30 00:00:00', 40000, -40000, 0, 0, 0),
(72, 73, 59, '2022-09-30 00:00:00', 35000, 385000, 420000, 12, 0),
(73, 83, 60, '2022-09-21 00:00:00', 35000, 385000, 420000, 12, 0),
(74, 85, 61, '2022-09-25 00:00:00', 35000, 175000, 210000, 6, 0),
(75, 81, 62, '2022-09-30 00:00:00', 30000, 0, 30000, 1, 0),
(76, 81, 63, '2022-09-30 00:00:00', 35000, 0, 35000, 1, 0),
(77, 75, 64, '2022-09-30 00:00:00', 35000, 0, 35000, 1, 0),
(78, 79, 65, '2022-09-30 00:00:00', 35000, 0, 35000, 1, 0),
(79, 77, 66, '2022-09-30 00:00:00', 35000, 70000, 105000, 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `Locataire`
--

CREATE TABLE `Locataire` (
  `id` int(11) NOT NULL,
  `nom` varchar(35) NOT NULL,
  `prenom` varchar(35) NOT NULL,
  `tel1` varchar(35) NOT NULL,
  `tel2` varchar(35) NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT 'default.png',
  `age` varchar(30) DEFAULT NULL,
  `sexe` varchar(30) NOT NULL,
  `situation_matrimonial` varchar(20) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Locataire`
--

INSERT INTO `Locataire` (`id`, `nom`, `prenom`, `tel1`, `tel2`, `image`, `age`, `sexe`, `situation_matrimonial`, `deleted`) VALUES
(1, 'Jean', 'Fodon', '87876767', '', 'default.png', '', 'Homme', 'Célibataire', 1),
(2, 'New count', 'jgareth', '8778878', '', 'images/de82699f71b600211b621663238490blobimage_name', '', 'Homme', 'Célibataire', 1),
(3, 'Paul', 'George', '67677667', '67676767', 'images/f9159cad917d8f64e6151663387473blobimage_name', '', 'Homme', 'Célibataire', 1),
(4, 'Test', 'Prénom test', '6696559', '', 'images/1eed213a18b1f4dec00c1663393314blobimage_name', '', 'Homme', 'Célibataire', 1),
(5, 'Ibrahimovic', 'God', '5666665', '', 'images/cb98d382413b2c41e13e1664459411blobimage_name', '33', 'Homme', 'En couple', 1),
(6, 'Paul', 'Hu', '56666542', '', 'images/cbb2e3fc2dfb4c67e01d1664775758blobimage_name', '35', 'Homme', 'Célibataire', 1),
(7, 'Mahamadou', 'Heidara', '6778787878', '', 'images/10e649c4ac63c3f476211665408948blobimage_name', '', 'Homme', 'Célibataire', 1),
(8, 'EWANE', 'Engelbert', '679329933', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(9, 'AZUA', 'J', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(10, 'PEMI', 'Abdou Nourou', '696068045', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(11, 'MENDO', 'Stella', '696555269', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(12, 'AYE ELE', 'SIMON', '1', '', 'default.png', '', 'Homme', 'Célibataire', 1),
(13, 'EBELLE EKOTTO', 'N', '698956958', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(14, 'AYEELE', 'SIMON', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(15, 'TESTERU', 'JEANU', '7887787', '', 'default.png', '', 'Homme', 'Célibataire', 1),
(16, 'Tester', 'tttt', '878778', '', 'default.png', '23', 'Homme', 'Célibataire', 1),
(17, 'Granted', 'Golduck', '68899', '', 'default.png', '22', 'Homme', 'Célibataire', 1),
(18, 'KALLA MBOA', 'H', '655435741', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(19, 'ONDOUA', 'ENYGNE', '695560481', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(20, 'AYISSI AYMAR / SINGO', '? /Leticia', '670616479', '698821530', 'default.png', '', 'Homme', 'Célibataire', 0),
(21, 'ETOH AVOM', 'A', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(22, 'AYISSI A', '', '670616479', '698821530', 'default.png', '', 'Femme', 'Célibataire', 0),
(23, 'NDOUNOUDJE', 'AXELLE', '1', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(24, 'YUEGO KANGAING', 'Y.P', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(25, 'BIEND', 'T.H', '690744834', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(26, 'NGOA', 'EKELLE', '693308825', '696467733', 'default.png', '', 'Homme', 'Célibataire', 0),
(27, 'ATANGANA ESSOMBA', 'GABRIEL A', '696631713', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(28, 'OUSMANOU MOUAMADOU', 'DJHA', '698263781', '675239080', 'default.png', '', 'Homme', 'Célibataire', 0),
(29, 'EYOUM BENDA', 'CHRISTIAN', '695047995', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(30, 'AGBOR', 'FRIDA', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(31, 'KOTCHAP', 'Y', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(32, 'ASSOMO', 'BRIGITTE NATHALIE', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(33, 'AKONO NNA', 'BERTILLE', '12', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(34, 'POUGOUM', 'G', '655070868', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(35, 'MAFFO', 'R', '655193055', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(36, 'ALIMA', 'B', '693781953', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(37, 'ABBO', 'T', '676070870', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(38, 'OBAMA KOLONDO', 'A', '691132739', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(39, 'MOLO NOAH ', 'C', '695015197', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(40, 'NGUINTEDEM', 'M', '652332797', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(41, 'MELONG', 'Vanessa', '654825093', '677832339', 'default.png', '', 'Femme', 'Célibataire', 0),
(42, 'NJI Shalom', 'S', '673840850', '676592560', 'default.png', '', 'Homme', 'Célibataire', 0),
(43, 'DJIEDEU TCHAMENI', 'Dilane', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(44, 'MAMENDE MABALLY', 'Rachel Edine', '656912732', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(45, 'EZEMBE Clememine', 'Epse Mabally', '697180051', '683393920', 'default.png', '', 'Femme', 'Célibataire', 0),
(46, 'MVONDO MVONDO', 'Landry', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(47, 'NGO SOGA', 'Sarah', '697335190', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(48, 'NTSAMA MVONDO', 'C', '657750710', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(49, 'NKONDA JC', 'J', '693888000', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(50, 'RUFFINE NDINGASAC', 'R', '698559528', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(51, 'SOGETOL', 'S', '698925802', '653863660', 'default.png', '', 'Homme', 'Célibataire', 0),
(52, 'MBOUOMBO YMDJI', 'Y', '693671096', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(53, 'TCHOUFFO', 'Romaric', '690944803', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(54, 'Carole (Mère du bébé)', 'M', '1', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(55, 'MOUDAMAC NTAMAK', 'Um', '696764986', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(56, 'POUKAM KAMGA', 'M', '691631833', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(57, 'DEUDJIEU RAISSA', 'Pamela', '696359909', '651498065', 'default.png', '', 'Femme', 'Célibataire', 0),
(58, 'MBONY AMENE', 'A', '696604440', '675917702', 'default.png', '', 'Femme', 'Célibataire', 0),
(59, 'MVONDO Henry', 'H', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(60, 'HANS MOASJIS', 'M', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(61, 'KUANKAN TAKAM', 'Samuel Alex', '655467412', '675367697', 'default.png', '', 'Homme', 'Célibataire', 0),
(62, 'OHANDJA OHANDJA', 'Marcel', '693046860', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(63, 'GNEDJO FOSTSING', 'Lionel', '690187334', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(64, 'KAMGA ROMARIC', 'R', '691991445', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(65, 'DATCHOUA W', 'W', '6', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(66, 'KUFFOR', 'Adrian', '652353394', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(67, 'KAMBA Regine', 'R', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(68, 'MARIE JOSE', 'Siafa', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(69, 'SALUSTIANO ONDO', 'O', '691117913', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(70, 'KAÏTAMA DEME', 'D', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(71, 'NKODO BIKOUA', 'B', '697541470', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(72, 'NINOH AXEL', 'Ange', '1', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(73, 'NYATE OLIVIA', 'O', '677879193', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(74, 'NNA BRAD', 'B', '694120754', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(75, 'CHICK BOVIN', 'AKARAGNE Brenda', '679231357', '677636226', 'default.png', '', 'Homme', 'En couple', 0),
(76, 'POKAM KAMTE', 'Celine', '695358145', '676835219', 'default.png', '', 'Homme', 'Célibataire', 0),
(77, 'ANIKE FOUDAMA', 'F', '695412681', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(78, 'MENDOUGOU TEMOGOU', 'E', '697398509', '672740197', 'default.png', '', 'Homme', 'Célibataire', 0),
(79, 'TCHOUNDA ', 'William', '698636452', '699706077', 'default.png', '', 'Homme', 'Célibataire', 0),
(80, 'MANDENG IVANA', 'V', '655246165', '', 'default.png', '', 'Femme', 'Célibataire', 0),
(81, 'KAMSU NZOUET', 'Chou', '691916349', '674073314', 'default.png', '', 'Homme', 'Célibataire', 0),
(82, 'SEVIDZEM VITINO', 'Junior', '679625199', '675074756', 'default.png', '', 'Homme', 'Célibataire', 0),
(83, 'NCHANJE NJANGA', 'Fabrice', '657111005', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(84, 'NJANGA MARI', 'Chantale', '699887726', '', 'default.png', '', 'Homme', 'Célibataire', 0),
(85, 'EMMA JESSE', 'Gouenossou Andomo', '697600474', '674969052', 'default.png', '', 'Homme', 'Célibataire', 0),
(86, 'ANDOMO BIDINIA', 'B', '674592250', '677738322', 'default.png', '', 'Homme', 'Célibataire', 0),
(87, 'MAMBOU TIYOU', 'Étienne', '690294341', '670585741', 'default.png', '', 'Homme', 'Célibataire', 0);

-- --------------------------------------------------------

--
-- Structure de la table `Manager`
--

CREATE TABLE `Manager` (
  `id` int(11) NOT NULL,
  `login` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `isAdmin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Manager`
--

INSERT INTO `Manager` (`id`, `login`, `password`, `isAdmin`) VALUES
(13, 'aaaa', 'aaaa', 1),
(14, 'NonAdmin', '0099', 0);

-- --------------------------------------------------------

--
-- Structure de la table `Payment`
--

CREATE TABLE `Payment` (
  `id` int(11) NOT NULL,
  `manager` int(11) NOT NULL,
  `contratLocation` int(11) NOT NULL,
  `montant` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Payment`
--

INSERT INTO `Payment` (`id`, `manager`, `contratLocation`, `montant`, `date`) VALUES
(22, 13, 13, 25000, '2022-09-30 00:00:00'),
(23, 13, 15, 10000, '2022-08-30 00:00:00'),
(32, 13, 20, 25000, '2022-08-30 00:00:00'),
(33, 13, 20, 25000, '2022-09-30 00:00:00'),
(34, 13, 21, 22000, '2022-08-30 00:00:00'),
(35, 13, 22, 30000, '2022-08-30 00:00:00'),
(36, 13, 23, 45000, '2022-08-30 00:00:00'),
(37, 13, 25, 3000, '2022-07-30 00:00:00'),
(38, 13, 25, 20000, '2022-08-30 00:00:00'),
(39, 13, 26, 25000, '2022-09-12 00:00:00'),
(40, 13, 25, 30000, '2022-09-30 00:00:00'),
(41, 13, 23, 40000, '2022-09-30 00:00:00'),
(42, 13, 21, 22000, '2022-09-30 00:00:00'),
(43, 13, 22, 20000, '2022-09-30 00:00:00'),
(44, 13, 27, 30000, '2022-08-30 00:00:00'),
(45, 13, 28, 30000, '2022-08-30 00:00:00'),
(46, 13, 29, 35000, '2022-08-30 00:00:00'),
(47, 13, 30, 35000, '2022-08-30 00:00:00'),
(48, 13, 31, 30000, '2022-08-30 00:00:00'),
(49, 13, 32, 20000, '2022-08-30 00:00:00'),
(50, 13, 33, 60000, '2022-08-18 00:00:00'),
(51, 13, 34, 30000, '2022-10-13 00:00:00'),
(52, 13, 28, 30000, '2022-09-30 00:00:00'),
(53, 13, 29, 35000, '2022-09-30 00:00:00'),
(54, 13, 30, 35000, '2022-09-30 00:00:00'),
(55, 13, 31, 30000, '2022-09-30 00:00:00'),
(56, 13, 32, 20000, '2022-09-30 00:00:00'),
(57, 13, 35, 25000, '2022-09-30 00:00:00'),
(58, 13, 36, 30000, '2022-09-30 00:00:00'),
(59, 13, 37, 25000, '2022-08-28 00:00:00'),
(60, 13, 38, 25000, '2022-08-28 00:00:00'),
(61, 13, 39, 26000, '2022-08-28 00:00:00'),
(62, 13, 40, 26000, '2022-08-28 00:00:00'),
(63, 13, 41, 52000, '2022-08-28 00:00:00'),
(64, 13, 42, 26000, '2022-08-28 00:00:00'),
(65, 13, 43, 25000, '2022-11-28 00:00:00'),
(66, 13, 37, 25000, '2022-09-28 00:00:00'),
(67, 13, 42, 26000, '2022-09-28 00:00:00'),
(68, 13, 39, 26000, '2022-09-28 00:00:00'),
(69, 13, 40, 26000, '2022-09-28 00:00:00'),
(70, 13, 43, 25000, '2022-09-28 00:00:00'),
(71, 13, 41, 26000, '2022-09-28 00:00:00'),
(72, 13, 38, 25000, '2022-09-28 00:00:00'),
(75, 13, 46, 42500, '2022-08-30 00:00:00'),
(76, 13, 46, 42500, '2022-09-30 00:00:00'),
(77, 13, 47, 42500, '2022-08-30 00:00:00'),
(79, 13, 47, 15000, '2022-07-30 00:00:00'),
(80, 13, 49, 40000, '2022-07-30 00:00:00'),
(81, 13, 49, 40000, '2022-08-30 00:00:00'),
(83, 13, 49, 40000, '2022-09-30 00:00:00'),
(84, 13, 50, 35000, '2022-08-30 00:00:00'),
(85, 13, 50, 35000, '2022-09-30 00:00:00'),
(86, 13, 51, 25000, '2022-08-30 00:00:00'),
(87, 13, 51, 25000, '2022-09-30 00:00:00'),
(88, 13, 52, 25000, '2022-08-30 00:00:00'),
(89, 13, 52, 25000, '2022-09-30 00:00:00'),
(90, 13, 53, 30000, '2022-08-30 00:00:00'),
(91, 13, 53, 30000, '2022-09-30 00:00:00'),
(92, 13, 54, 15000, '2022-07-30 00:00:00'),
(93, 13, 54, 20000, '2022-08-30 00:00:00'),
(94, 13, 54, 10000, '2022-09-30 00:00:00'),
(95, 13, 55, 15000, '2022-08-30 00:00:00'),
(96, 13, 55, 52000, '2022-09-30 00:00:00'),
(97, 13, 56, 30000, '2022-08-30 00:00:00'),
(98, 13, 56, 30000, '2022-09-30 00:00:00'),
(99, 13, 57, 35000, '2022-09-30 00:00:00'),
(100, 13, 58, 35000, '2022-08-30 00:00:00'),
(101, 13, 58, 35000, '2022-09-30 00:00:00'),
(102, 13, 59, 35000, '2022-08-30 00:00:00'),
(103, 13, 59, 35000, '2022-09-30 00:00:00'),
(105, 13, 60, 330000, '2022-09-09 00:00:00'),
(106, 13, 61, 240000, '2022-09-10 00:00:00'),
(107, 13, 62, 300000, '2022-09-10 00:00:00'),
(108, 13, 63, 75000, '2022-08-30 00:00:00'),
(109, 13, 66, 40000, '2022-08-30 00:00:00'),
(110, 13, 66, 40000, '2022-09-30 00:00:00'),
(111, 13, 67, 40000, '2022-08-30 00:00:00'),
(112, 13, 67, 40000, '2022-09-30 00:00:00'),
(113, 13, 68, 40000, '2022-08-30 00:00:00'),
(114, 13, 68, 40000, '2022-09-30 00:00:00'),
(115, 13, 69, 35000, '2022-08-30 00:00:00'),
(116, 13, 69, 35000, '2022-09-30 00:00:00'),
(117, 13, 70, 40000, '2022-08-30 00:00:00'),
(118, 13, 70, 35000, '2022-09-30 00:00:00'),
(119, 13, 72, 420000, '2022-09-21 00:00:00'),
(120, 13, 73, 420000, '2022-09-21 00:00:00'),
(121, 13, 74, 210000, '2022-09-25 00:00:00'),
(122, 13, 75, 30000, '2022-09-30 00:00:00'),
(123, 13, 76, 35000, '2022-09-30 00:00:00'),
(124, 13, 77, 35000, '2022-09-30 00:00:00'),
(125, 13, 78, 35000, '2022-09-30 00:00:00'),
(126, 13, 79, 105000, '2022-09-30 00:00:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Chambre`
--
ALTER TABLE `Chambre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cite` (`cite`);

--
-- Index pour la table `Cite`
--
ALTER TABLE `Cite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ContratLocation`
--
ALTER TABLE `ContratLocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `locataire` (`locataire`),
  ADD KEY `chambre` (`chambre`);

--
-- Index pour la table `Locataire`
--
ALTER TABLE `Locataire`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Manager`
--
ALTER TABLE `Manager`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Payment`
--
ALTER TABLE `Payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manager` (`manager`),
  ADD KEY `contraLocation` (`contratLocation`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Chambre`
--
ALTER TABLE `Chambre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pour la table `Cite`
--
ALTER TABLE `Cite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `ContratLocation`
--
ALTER TABLE `ContratLocation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT pour la table `Locataire`
--
ALTER TABLE `Locataire`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT pour la table `Manager`
--
ALTER TABLE `Manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Payment`
--
ALTER TABLE `Payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Chambre`
--
ALTER TABLE `Chambre`
  ADD CONSTRAINT `Chambre_ibfk_1` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`),
  ADD CONSTRAINT `Chambre_ibfk_2` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`),
  ADD CONSTRAINT `Chambre_ibfk_3` FOREIGN KEY (`cite`) REFERENCES `Cite` (`id`);

--
-- Contraintes pour la table `ContratLocation`
--
ALTER TABLE `ContratLocation`
  ADD CONSTRAINT `ContratLocation_ibfk_1` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  ADD CONSTRAINT `ContratLocation_ibfk_2` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`),
  ADD CONSTRAINT `ContratLocation_ibfk_3` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  ADD CONSTRAINT `ContratLocation_ibfk_4` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`),
  ADD CONSTRAINT `ContratLocation_ibfk_5` FOREIGN KEY (`locataire`) REFERENCES `Locataire` (`id`),
  ADD CONSTRAINT `ContratLocation_ibfk_6` FOREIGN KEY (`chambre`) REFERENCES `Chambre` (`id`);

--
-- Contraintes pour la table `Payment`
--
ALTER TABLE `Payment`
  ADD CONSTRAINT `Payment_ibfk_1` FOREIGN KEY (`manager`) REFERENCES `Manager` (`id`),
  ADD CONSTRAINT `Payment_ibfk_3` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`),
  ADD CONSTRAINT `Payment_ibfk_4` FOREIGN KEY (`manager`) REFERENCES `Manager` (`id`),
  ADD CONSTRAINT `Payment_ibfk_6` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`),
  ADD CONSTRAINT `Payment_ibfk_7` FOREIGN KEY (`contratLocation`) REFERENCES `ContratLocation` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
