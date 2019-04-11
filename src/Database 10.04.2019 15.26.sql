-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 10. Apr, 2019 15:25 PM
-- Tjener-versjon: 5.7.25-0ubuntu0.18.04.2
-- PHP Version: 7.2.15-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `g_idri1005_05`
--

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `alle_bestillinger`
-- (See below for the actual view)
--
CREATE TABLE `alle_bestillinger` (
`b_id` int(11)
,`fra` datetime
,`til` datetime
,`navn` varchar(35)
,`hentested` varchar(35)
,`leveringssted` varchar(35)
,`pris` int(8)
,`rabatt` int(8)
,`status` varchar(20)
);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `alle_sykler`
-- (See below for the actual view)
--
CREATE TABLE `alle_sykler` (
`v_id` int(8)
,`type` varchar(35)
,`ramme` varchar(35)
,`girsystem` int(2)
,`størrelse_hjul` int(2)
,`status` varchar(35)
,`pris` int(4)
);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `alle_varer`
-- (See below for the actual view)
--
CREATE TABLE `alle_varer` (
`v_id` int(11)
,`type` varchar(35)
,`status` varchar(35)
,`pris` int(4)
);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `alt_utstyr`
-- (See below for the actual view)
--
CREATE TABLE `alt_utstyr` (
`v_id` int(8)
,`type` varchar(35)
,`status` varchar(35)
,`pris` int(4)
);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `antall_kundebestillinger`
-- (See below for the actual view)
--
CREATE TABLE `antall_kundebestillinger` (
`mobilnummer` int(8)
,`antall_b` bigint(21)
);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `bestilling`
--

CREATE TABLE `bestilling` (
  `b_id` int(11) NOT NULL,
  `fra` datetime DEFAULT NULL,
  `til` datetime DEFAULT NULL,
  `henting` int(8) DEFAULT NULL,
  `levering` int(8) DEFAULT NULL,
  `k_id` int(8) DEFAULT NULL,
  `rabatt` int(8) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `pris` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `bestilling`
--

INSERT INTO `bestilling` (`b_id`, `fra`, `til`, `henting`, `levering`, `k_id`, `rabatt`, `status`, `pris`) VALUES
(1, '2019-04-01 12:00:00', '2019-04-02 12:00:00', 1, 1, 1, 0, 'ferdig', 245),
(2, '2019-04-01 12:00:00', '2019-04-06 12:00:00', 1, 1, 2, 0, 'ferdig', 1525),
(3, '2019-04-03 12:00:00', '2019-04-05 12:00:00', 1, 1, 2, 0, 'ferdig', 1660),
(4, '2019-04-08 12:00:00', '2019-04-10 12:00:00', 1, 1, 3, 0, 'ferdig', 600),
(5, '2019-04-09 12:00:00', '2019-04-11 12:00:00', 1, 1, 4, 0, 'ferdig', 340),
(6, '2019-04-10 10:00:00', '2019-04-10 12:00:00', 1, 1, 5, 0, 'ferdig', 350),
(7, '2019-04-04 12:00:00', '2019-04-06 12:00:00', 1, 1, 5, 0, 'ferdig', 600),
(8, '2019-04-07 12:00:00', '2019-04-10 12:00:00', 1, 1, 1, 0, 'ferdig', 300),
(9, '2019-04-14 12:00:00', '2019-04-16 12:00:00', 1, 3, 6, 0, 'bestilt', 600),
(10, '2019-04-09 12:00:00', '2019-04-17 12:00:00', 1, 1, 3, 0, 'utlevert', 1680),
(11, '2019-04-09 12:00:00', '2019-04-14 12:00:00', 1, 1, 7, 0, 'utlevert', 1250),
(12, '2019-04-15 12:00:00', '2019-04-17 12:00:00', 1, 5, 5, 0, 'bestilt', 200);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `bestillinger_varer`
-- (See below for the actual view)
--
CREATE TABLE `bestillinger_varer` (
`b_id` int(11)
,`v_id` int(11)
,`type` varchar(35)
,`status` varchar(35)
);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `kunde`
--

CREATE TABLE `kunde` (
  `k_id` int(11) NOT NULL,
  `navn` varchar(35) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobilnummer` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `kunde`
--

INSERT INTO `kunde` (`k_id`, `navn`, `email`, `mobilnummer`) VALUES
(1, 'Helga Thorsen', 'Helga@gmail.com', 90112233),
(2, 'Per Olsen', 'per@ntnu.no', 97604571),
(3, 'Ane Solberg', 'anesolb@gmail.com', 41495904),
(4, 'Yve Line Karlsen', 'Yve@gmail.com', 90122334),
(5, 'Martin Riseth', 'martin.riseth@gmail.com', 48209470),
(6, 'Ola Nordmann', 'Olanordmann@gmail.com', 90000000),
(7, 'Kurt Nilsen', 'kurt@gmail.com', 96140517);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `lokasjon`
--

CREATE TABLE `lokasjon` (
  `l_id` int(11) NOT NULL,
  `lokasjon` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `lokasjon`
--

INSERT INTO `lokasjon` (`l_id`, `lokasjon`) VALUES
(1, 'Haugastøl'),
(2, 'Finse'),
(3, 'Flåm'),
(4, 'Voss'),
(5, 'Myrdal'),
(6, 'Munkvoll');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `prisliste`
--

CREATE TABLE `prisliste` (
  `type` varchar(35) NOT NULL,
  `pris` int(4) DEFAULT NULL,
  `kategori` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `prisliste`
--

INSERT INTO `prisliste` (`type`, `pris`, `kategori`) VALUES
('Barnehenger', 90, 'utstyr'),
('Barnesete', 50, 'utstyr'),
('Barnesykkel', 50, 'sykkel'),
('Damesykkel', 120, 'sykkel'),
('Elsykkel', 250, 'sykkel'),
('Enhjulssykkel', 100, 'sykkel'),
('Ettgirssykkel', 150, 'sykkel'),
('Hjelm', 50, 'utstyr'),
('Hjelm barn', 30, 'utstyr'),
('Hybridsykkel', 220, 'sykkel'),
('Hybridsykkel barn', 120, 'sykkel'),
('Lappesaker', 25, 'utstyr'),
('Lastehenger', 120, 'utstyr'),
('Lås', 25, 'utstyr'),
('Racersykkel', 325, 'sykkel'),
('Racersykkel barn', 150, 'sykkel'),
('Servicesykkel', 150, 'sykkel'),
('Støttehjul', 60, 'utstyr'),
('Sykkelhansker', 75, 'utstyr'),
('Sykkelveske', 50, 'utstyr'),
('Sykkelvogn', 150, 'utstyr'),
('Tandemsykkel', 190, 'sykkel'),
('Terrengsykkel', 150, 'sykkel'),
('Terrengsykkel barn', 75, 'sykkel'),
('Trehjulssykkel', 90, 'sykkel'),
('Triatlonsykkel', 250, 'sykkel'),
('Triatlonsykkel barn', 200, 'sykkel');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `restriksjoner`
--

CREATE TABLE `restriksjoner` (
  `s_type` varchar(35) DEFAULT NULL,
  `u_type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `restriksjoner`
--

INSERT INTO `restriksjoner` (`s_type`, `u_type`) VALUES
('Barnesykkel', 'Lappesaker'),
('Barnesykkel', 'Støttehjul'),
('Hybridsykkel barn', 'Hjelm barn'),
('Hybridsykkel barn', 'Lås'),
('Hybridsykkel barn', 'Lappesaker'),
('Damesykkel', 'Barnesete'),
('Damesykkel', 'Hjelm'),
('Damesykkel', 'Lastehenger'),
('Damesykkel', 'Lås'),
('Damesykkel', 'Sykkelveske'),
('Damesykkel', 'Sykkelvogn'),
('Elsykkel', 'Hjelm'),
('Elsykkel', 'Barnehenger'),
('Elsykkel', 'Barnesete'),
('Elsykkel', 'Lappesaker'),
('Elsykkel', 'Lastehenger'),
('Elsykkel', 'Lås'),
('Elsykkel', 'Sykkelveske'),
('Elsykkel', 'Sykkelvogn'),
('Enhjulssykkel', 'Lås'),
('Enhjulssykkel', 'Lappesaker'),
('Ettgirssykkel', 'Barnehenger'),
('Ettgirssykkel', 'Barnesete'),
('Ettgirssykkel', 'Hjelm'),
('Ettgirssykkel', 'Lappesaker'),
('Ettgirssykkel', 'Lastehenger'),
('Ettgirssykkel', 'Lås'),
('Ettgirssykkel', 'Sykkelveske'),
('Ettgirssykkel', 'Sykkelvogn'),
('Hybridsykkel', 'Barnehenger'),
('Hybridsykkel', 'Barnesete'),
('Hybridsykkel', 'Hjelm'),
('Hybridsykkel', 'Lappesaker'),
('Hybridsykkel', 'Lastehenger'),
('Hybridsykkel', 'Lås'),
('Hybridsykkel', 'Sykkelveske'),
('Hybridsykkel', 'Sykkelvogn'),
('Racersykkel', 'Hjelm'),
('Racersykkel', 'Lappesaker'),
('Racersykkel', 'Lås'),
('Racersykkel barn', 'Hjelm barn'),
('Racersykkel barn', 'Lappesaker'),
('Servicesykkel', 'Lås'),
('Servicesykkel', 'Sykkelveske'),
('Servicesykkel', 'Lappesaker'),
('Servicesykkel', 'Hjelm'),
('Tandemsykkel', 'Lås'),
('Tandemsykkel', 'Lappesaker'),
('Terrengsykkel', 'Hjelm'),
('Terrengsykkel', 'Lappesaker'),
('Terrengsykkel', 'Lås'),
('Terrengsykkel barn', 'Hjelm barn'),
('Terrengsykkel barn', 'Lappesaker'),
('Terrengsykkel barn', 'Lås'),
('Trehjulssykkel', 'Hjelm barn'),
('Trehjulssykkel', 'Lås'),
('Triatlonsykkel', 'Hjelm'),
('Triatlonsykkel', 'Lappesaker'),
('Triatlonsykkel', 'Lås'),
('Triatlonsykkel barn', 'Hjelm barn'),
('Triatlonsykkel barn', 'Lås'),
('Triatlonsykkel barn', 'Støttehjul'),
('Triatlonsykkel barn', 'Lappesaker'),
('Racersykkel barn', 'Lås'),
('Damesykkel', 'Barnehenger'),
('Damesykkel', 'Lappesaker'),
('Barnesykkel', 'Sykkelveske'),
('Barnesykkel', 'Hjelm barn'),
('Barnesykkel', 'Lås');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `sykkel`
--

CREATE TABLE `sykkel` (
  `v_id` int(8) NOT NULL,
  `ramme` varchar(35) DEFAULT NULL,
  `girsystem` int(2) DEFAULT NULL,
  `størrelse_hjul` int(2) DEFAULT NULL,
  `type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `sykkel`
--

INSERT INTO `sykkel` (`v_id`, `ramme`, `girsystem`, `størrelse_hjul`, `type`) VALUES
(1, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(2, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(3, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(4, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(5, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(6, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(7, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(8, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(9, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(10, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(11, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(12, 'DBS Intruder', 7, 18, 'Barnesykkel'),
(13, 'DW20x1', 12, 22, 'Damesykkel'),
(14, 'DW20x1', 12, 22, 'Damesykkel'),
(15, 'DW20x1', 12, 22, 'Damesykkel'),
(16, 'DW20x1', 12, 22, 'Damesykkel'),
(17, 'DW20x1', 12, 22, 'Damesykkel'),
(18, 'DW20x1', 12, 22, 'Damesykkel'),
(19, 'Diamant Volt 30', 3, 26, 'Elsykkel'),
(20, 'Diamant Volt 30', 3, 26, 'Elsykkel'),
(21, 'Diamant Volt 30', 3, 26, 'Elsykkel'),
(22, 'Diamant Volt 30', 3, 26, 'Elsykkel'),
(23, 'Oplex19', 0, 16, 'Enhjulssykkel'),
(24, 'Oplex19', 0, 16, 'Enhjulssykkel'),
(25, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(26, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(27, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(28, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(29, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(30, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(31, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(32, 'Fixie Urban', 1, 29, 'Ettgirssykkel'),
(33, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(34, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(35, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(36, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(37, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(38, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(39, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(40, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(41, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(42, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(43, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(44, 'DBS Logic C4000', 21, 28, 'Hybridsykkel'),
(45, 'Diamant Ultra', 8, 24, 'Hybridsykkel barn'),
(46, 'Diamant Ultra', 8, 24, 'Hybridsykkel barn'),
(47, 'Diamant Ultra', 8, 24, 'Hybridsykkel barn'),
(48, 'Diamant Ultra', 8, 24, 'Hybridsykkel barn'),
(49, 'Diamant Ultra', 8, 24, 'Hybridsykkel barn'),
(50, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(51, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(52, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(53, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(54, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(55, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(56, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(57, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(58, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(59, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(60, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(61, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(62, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(63, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(64, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(65, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(66, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(67, 'Cannondale Synapse Carbon Disc', 22, 28, 'Racersykkel'),
(68, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(69, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(70, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(71, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(72, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(73, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(74, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(75, 'Cannondale Junior Disc', 22, 24, 'Racersykkel barn'),
(76, 'Diamant Range x5', 18, 28, 'Servicesykkel'),
(77, 'Diamant Range x5', 18, 28, 'Servicesykkel'),
(78, 'Diamant Range x5', 18, 28, 'Servicesykkel'),
(79, 'Trek T900', 24, 26, 'Tandemsykkel'),
(80, 'Trek T900', 24, 26, 'Tandemsykkel'),
(81, 'Trek T900', 24, 26, 'Tandemsykkel'),
(82, 'Trek T900', 24, 26, 'Tandemsykkel'),
(83, 'Trek T900', 24, 26, 'Tandemsykkel'),
(84, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(85, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(86, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(87, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(88, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(89, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(90, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(91, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(92, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(93, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(94, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(95, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(96, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(97, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(98, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(99, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(100, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(101, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(102, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(103, 'Big Nine TFS', 21, 27, 'Terrengsykkel'),
(104, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(105, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(106, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(107, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(108, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(109, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(110, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(111, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(112, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(113, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(114, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(115, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(116, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(117, 'Big Nine TFS Junior', 12, 22, 'Terrengsykkel barn'),
(118, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(119, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(120, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(121, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(122, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(123, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(124, 'Junior3xx', 0, 8, 'Trehjulssykkel'),
(125, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(126, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(127, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(128, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(129, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(130, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(131, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(132, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(133, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(134, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(135, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(136, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(137, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(138, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(139, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(140, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(141, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(142, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(143, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(144, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(145, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(146, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(147, 'Cannondale Slice 105', 22, 28, 'Triatlonsykkel'),
(148, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(149, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(150, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(151, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(152, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(153, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(154, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(155, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(156, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(157, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(158, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(159, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn'),
(160, 'Cannondale Slice Juniorx3', 14, 22, 'Triatlonsykkel barn');

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `tilgjengelige_sykler`
-- (See below for the actual view)
--
CREATE TABLE `tilgjengelige_sykler` (
`v_id` int(8)
,`type` varchar(35)
,`ramme` varchar(35)
,`girsystem` int(2)
,`størrelse_hjul` int(2)
,`status` varchar(35)
,`pris` int(4)
,`b_id` int(11)
,`fra` datetime
,`til` datetime
);

-- --------------------------------------------------------

--
-- Erstatningsstruktur for visning `tilgjengelige_utstyr`
-- (See below for the actual view)
--
CREATE TABLE `tilgjengelige_utstyr` (
`v_id` int(8)
,`type` varchar(35)
,`status` varchar(35)
,`pris` int(4)
,`b_id` int(11)
,`fra` datetime
,`til` datetime
);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `utleieliste`
--

CREATE TABLE `utleieliste` (
  `v_id` int(8) DEFAULT NULL,
  `b_id` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `utleieliste`
--

INSERT INTO `utleieliste` (`v_id`, `b_id`) VALUES
(23, 1),
(118, 1),
(186, 1),
(206, 1),
(5, 2),
(76, 2),
(161, 2),
(187, 2),
(207, 2),
(126, 3),
(127, 3),
(148, 3),
(162, 3),
(163, 3),
(186, 3),
(19, 4),
(161, 4),
(13, 5),
(161, 5),
(23, 6),
(84, 6),
(161, 6),
(162, 6),
(19, 7),
(161, 7),
(23, 8),
(84, 9),
(85, 9),
(161, 10),
(80, 10),
(19, 11),
(23, 12);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `utstyr`
--

CREATE TABLE `utstyr` (
  `v_id` int(8) NOT NULL,
  `type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `utstyr`
--

INSERT INTO `utstyr` (`v_id`, `type`) VALUES
(161, 'Hjelm'),
(162, 'Hjelm'),
(163, 'Hjelm'),
(164, 'Hjelm'),
(165, 'Hjelm'),
(166, 'Hjelm'),
(167, 'Hjelm'),
(168, 'Hjelm'),
(169, 'Hjelm'),
(170, 'Hjelm'),
(171, 'Hjelm'),
(172, 'Hjelm'),
(173, 'Hjelm'),
(174, 'Hjelm'),
(175, 'Hjelm'),
(176, 'Hjelm'),
(177, 'Hjelm'),
(178, 'Hjelm'),
(179, 'Hjelm'),
(180, 'Hjelm'),
(181, 'Hjelm'),
(182, 'Hjelm'),
(183, 'Hjelm'),
(184, 'Hjelm'),
(185, 'Hjelm'),
(186, 'Hjelm barn'),
(187, 'Hjelm barn'),
(188, 'Hjelm barn'),
(189, 'Hjelm barn'),
(190, 'Hjelm barn'),
(191, 'Hjelm barn'),
(192, 'Hjelm barn'),
(193, 'Hjelm barn'),
(194, 'Hjelm barn'),
(195, 'Hjelm barn'),
(196, 'Hjelm barn'),
(197, 'Hjelm barn'),
(198, 'Hjelm barn'),
(199, 'Hjelm barn'),
(200, 'Hjelm barn'),
(201, 'Hjelm barn'),
(202, 'Hjelm barn'),
(203, 'Hjelm barn'),
(204, 'Hjelm barn'),
(205, 'Hjelm barn'),
(206, 'Lappesaker'),
(207, 'Lappesaker'),
(208, 'Lappesaker'),
(209, 'Lappesaker'),
(210, 'Lappesaker'),
(211, 'Lappesaker'),
(212, 'Lappesaker'),
(213, 'Lappesaker'),
(214, 'Lappesaker'),
(215, 'Lappesaker'),
(216, 'Lappesaker'),
(217, 'Lappesaker'),
(218, 'Lappesaker'),
(219, 'Lappesaker'),
(220, 'Lappesaker'),
(221, 'Lappesaker'),
(222, 'Lappesaker'),
(223, 'Lappesaker'),
(224, 'Lappesaker'),
(225, 'Lappesaker'),
(226, 'Lappesaker'),
(227, 'Lappesaker'),
(228, 'Lappesaker'),
(229, 'Lappesaker'),
(230, 'Lappesaker'),
(231, 'Lappesaker'),
(232, 'Lappesaker'),
(233, 'Lappesaker'),
(234, 'Lappesaker'),
(235, 'Lappesaker'),
(236, 'Lappesaker'),
(237, 'Lappesaker'),
(238, 'Støttehjul'),
(239, 'Støttehjul'),
(240, 'Støttehjul'),
(241, 'Støttehjul'),
(242, 'Støttehjul'),
(243, 'Støttehjul'),
(244, 'Støttehjul'),
(245, 'Støttehjul'),
(246, 'Støttehjul'),
(247, 'Støttehjul'),
(248, 'Støttehjul'),
(249, 'Støttehjul'),
(250, 'Støttehjul'),
(251, 'Støttehjul'),
(252, 'Støttehjul'),
(253, 'Sykkelveske'),
(254, 'Sykkelveske'),
(255, 'Sykkelveske'),
(256, 'Sykkelveske'),
(257, 'Sykkelveske'),
(258, 'Sykkelveske'),
(259, 'Sykkelveske'),
(260, 'Sykkelveske'),
(261, 'Sykkelveske'),
(262, 'Sykkelveske'),
(263, 'Sykkelveske'),
(264, 'Sykkelveske'),
(265, 'Sykkelveske'),
(266, 'Sykkelveske'),
(267, 'Sykkelveske'),
(268, 'Sykkelveske'),
(269, 'Sykkelveske'),
(270, 'Sykkelveske'),
(271, 'Sykkelveske'),
(272, 'Sykkelveske'),
(273, 'Sykkelveske'),
(274, 'Sykkelveske'),
(275, 'Sykkelvogn'),
(276, 'Sykkelvogn'),
(277, 'Sykkelvogn'),
(278, 'Sykkelvogn'),
(279, 'Sykkelvogn'),
(280, 'Sykkelvogn');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `vare`
--

CREATE TABLE `vare` (
  `v_id` int(11) NOT NULL,
  `tilhører` int(8) DEFAULT NULL,
  `status` varchar(35) DEFAULT NULL,
  `type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `vare`
--

INSERT INTO `vare` (`v_id`, `tilhører`, `status`, `type`) VALUES
(1, 1, 'trenger reparasjon', 'Barnesykkel'),
(2, 1, 'savnet', 'Barnesykkel'),
(3, 1, 'savnet', 'Barnesykkel'),
(4, 1, 'savnet', 'Barnesykkel'),
(5, 1, 'på lager', 'Barnesykkel'),
(6, 1, 'på lager', 'Barnesykkel'),
(7, 1, 'på lager', 'Barnesykkel'),
(8, 1, 'på lager', 'Barnesykkel'),
(9, 1, 'på lager', 'Barnesykkel'),
(10, 1, 'på lager', 'Barnesykkel'),
(11, 1, 'på lager', 'Barnesykkel'),
(12, 1, 'på lager', 'Barnesykkel'),
(13, 1, 'på lager', 'Damesykkel'),
(14, 1, 'på lager', 'Damesykkel'),
(15, 1, 'på lager', 'Damesykkel'),
(16, 1, 'på lager', 'Damesykkel'),
(17, 1, 'på lager', 'Damesykkel'),
(18, 1, 'på lager', 'Damesykkel'),
(19, 1, 'utleid', 'Elsykkel'),
(20, 1, 'på lager', 'Elsykkel'),
(21, 1, 'på lager', 'Elsykkel'),
(22, 1, 'på lager', 'Elsykkel'),
(23, 1, 'på lager', 'Enhjulssykkel'),
(24, 1, 'på lager', 'Enhjulssykkel'),
(25, 1, 'på lager', 'Ettgirssykkel'),
(26, 1, 'på lager', 'Ettgirssykkel'),
(27, 1, 'på lager', 'Ettgirssykkel'),
(28, 1, 'på lager', 'Ettgirssykkel'),
(29, 1, 'på lager', 'Ettgirssykkel'),
(30, 1, 'på lager', 'Ettgirssykkel'),
(31, 1, 'på lager', 'Ettgirssykkel'),
(32, 1, 'på lager', 'Ettgirssykkel'),
(33, 1, 'på lager', 'Hybridsykkel'),
(34, 1, 'på lager', 'Hybridsykkel'),
(35, 1, 'på lager', 'Hybridsykkel'),
(36, 1, 'på lager', 'Hybridsykkel'),
(37, 1, 'på lager', 'Hybridsykkel'),
(38, 1, 'på lager', 'Hybridsykkel'),
(39, 1, 'på lager', 'Hybridsykkel'),
(40, 1, 'på lager', 'Hybridsykkel'),
(41, 1, 'på lager', 'Hybridsykkel'),
(42, 1, 'på lager', 'Hybridsykkel'),
(43, 1, 'på lager', 'Hybridsykkel'),
(44, 1, 'på lager', 'Hybridsykkel'),
(45, 1, 'på lager', 'Hybridsykkel barn'),
(46, 1, 'på lager', 'Hybridsykkel barn'),
(47, 1, 'på lager', 'Hybridsykkel barn'),
(48, 1, 'på lager', 'Hybridsykkel barn'),
(49, 1, 'på lager', 'Hybridsykkel barn'),
(50, 1, 'på lager', 'Racersykkel'),
(51, 1, 'på lager', 'Racersykkel'),
(52, 1, 'på lager', 'Racersykkel'),
(53, 1, 'på lager', 'Racersykkel'),
(54, 1, 'på lager', 'Racersykkel'),
(55, 1, 'på lager', 'Racersykkel'),
(56, 1, 'på lager', 'Racersykkel'),
(57, 1, 'på lager', 'Racersykkel'),
(58, 1, 'på lager', 'Racersykkel'),
(59, 1, 'på lager', 'Racersykkel'),
(60, 1, 'på lager', 'Racersykkel'),
(61, 1, 'på lager', 'Racersykkel'),
(62, 1, 'på lager', 'Racersykkel'),
(63, 1, 'på lager', 'Racersykkel'),
(64, 1, 'på lager', 'Racersykkel'),
(65, 1, 'på lager', 'Racersykkel'),
(66, 1, 'på lager', 'Racersykkel'),
(67, 1, 'på lager', 'Racersykkel'),
(68, 1, 'på lager', 'Racersykkel barn'),
(69, 1, 'på lager', 'Racersykkel barn'),
(70, 1, 'på lager', 'Racersykkel barn'),
(71, 1, 'på lager', 'Racersykkel barn'),
(72, 1, 'på lager', 'Racersykkel barn'),
(73, 1, 'på lager', 'Racersykkel barn'),
(74, 1, 'på lager', 'Racersykkel barn'),
(75, 1, 'på lager', 'Racersykkel barn'),
(76, 1, 'på lager', 'Servicesykkel'),
(77, 1, 'på lager', 'Servicesykkel'),
(78, 1, 'på lager', 'Servicesykkel'),
(79, 1, 'savnet', 'Tandemsykkel'),
(80, 1, 'utleid', 'Tandemsykkel'),
(81, 1, 'på lager', 'Tandemsykkel'),
(82, 1, 'på lager', 'Tandemsykkel'),
(83, 1, 'på lager', 'Tandemsykkel'),
(84, 1, 'på lager', 'Terrengsykkel'),
(85, 1, 'utleid', 'Terrengsykkel'),
(86, 1, 'på lager', 'Terrengsykkel'),
(87, 1, 'på lager', 'Terrengsykkel'),
(88, 1, 'på lager', 'Terrengsykkel'),
(89, 1, 'på lager', 'Terrengsykkel'),
(90, 1, 'på lager', 'Terrengsykkel'),
(91, 1, 'på lager', 'Terrengsykkel'),
(92, 1, 'på lager', 'Terrengsykkel'),
(93, 1, 'på lager', 'Terrengsykkel'),
(94, 1, 'på lager', 'Terrengsykkel'),
(95, 1, 'på lager', 'Terrengsykkel'),
(96, 1, 'på lager', 'Terrengsykkel'),
(97, 1, 'på lager', 'Terrengsykkel'),
(98, 1, 'på lager', 'Terrengsykkel'),
(99, 1, 'på lager', 'Terrengsykkel'),
(100, 1, 'på lager', 'Terrengsykkel'),
(101, 1, 'på lager', 'Terrengsykkel'),
(102, 1, 'på lager', 'Terrengsykkel'),
(103, 1, 'på lager', 'Terrengsykkel'),
(104, 1, 'på lager', 'Terrengsykkel barn'),
(105, 1, 'på lager', 'Terrengsykkel barn'),
(106, 1, 'på lager', 'Terrengsykkel barn'),
(107, 1, 'på lager', 'Terrengsykkel barn'),
(108, 1, 'på lager', 'Terrengsykkel barn'),
(109, 1, 'på lager', 'Terrengsykkel barn'),
(110, 1, 'på lager', 'Terrengsykkel barn'),
(111, 1, 'på lager', 'Terrengsykkel barn'),
(112, 1, 'på lager', 'Terrengsykkel barn'),
(113, 1, 'på lager', 'Terrengsykkel barn'),
(114, 1, 'på lager', 'Terrengsykkel barn'),
(115, 1, 'på lager', 'Terrengsykkel barn'),
(116, 1, 'på lager', 'Terrengsykkel barn'),
(117, 1, 'på lager', 'Terrengsykkel barn'),
(118, 1, 'på lager', 'Trehjulssykkel'),
(119, 1, 'på lager', 'Trehjulssykkel'),
(120, 1, 'på lager', 'Trehjulssykkel'),
(121, 1, 'på lager', 'Trehjulssykkel'),
(122, 1, 'på lager', 'Trehjulssykkel'),
(123, 1, 'på lager', 'Trehjulssykkel'),
(124, 1, 'på lager', 'Trehjulssykkel'),
(125, 1, 'savnet', 'Triatlonsykkel'),
(126, 1, 'på lager', 'Triatlonsykkel'),
(127, 1, 'på lager', 'Triatlonsykkel'),
(128, 1, 'på lager', 'Triatlonsykkel'),
(129, 1, 'på lager', 'Triatlonsykkel'),
(130, 1, 'på lager', 'Triatlonsykkel'),
(131, 1, 'på lager', 'Triatlonsykkel'),
(132, 1, 'på lager', 'Triatlonsykkel'),
(133, 1, 'på lager', 'Triatlonsykkel'),
(134, 1, 'på lager', 'Triatlonsykkel'),
(135, 1, 'på lager', 'Triatlonsykkel'),
(136, 1, 'på lager', 'Triatlonsykkel'),
(137, 1, 'på lager', 'Triatlonsykkel'),
(138, 1, 'på lager', 'Triatlonsykkel'),
(139, 1, 'på lager', 'Triatlonsykkel'),
(140, 1, 'på lager', 'Triatlonsykkel'),
(141, 1, 'på lager', 'Triatlonsykkel'),
(142, 1, 'på lager', 'Triatlonsykkel'),
(143, 1, 'på lager', 'Triatlonsykkel'),
(144, 1, 'på lager', 'Triatlonsykkel'),
(145, 1, 'på lager', 'Triatlonsykkel'),
(146, 1, 'på lager', 'Triatlonsykkel'),
(147, 1, 'på lager', 'Triatlonsykkel'),
(148, 1, 'på lager', 'Triatlonsykkel barn'),
(149, 1, 'på lager', 'Triatlonsykkel barn'),
(150, 1, 'på lager', 'Triatlonsykkel barn'),
(151, 1, 'på lager', 'Triatlonsykkel barn'),
(152, 1, 'på lager', 'Triatlonsykkel barn'),
(153, 1, 'på lager', 'Triatlonsykkel barn'),
(154, 1, 'på lager', 'Triatlonsykkel barn'),
(155, 1, 'på lager', 'Triatlonsykkel barn'),
(156, 1, 'på lager', 'Triatlonsykkel barn'),
(157, 1, 'på lager', 'Triatlonsykkel barn'),
(158, 1, 'på lager', 'Triatlonsykkel barn'),
(159, 1, 'på lager', 'Triatlonsykkel barn'),
(160, 1, 'på lager', 'Triatlonsykkel barn'),
(161, 1, 'utleid', 'Hjelm'),
(162, 1, 'på lager', 'Hjelm'),
(163, 1, 'på lager', 'Hjelm'),
(164, 1, 'på lager', 'Hjelm'),
(165, 1, 'på lager', 'Hjelm'),
(166, 1, 'på lager', 'Hjelm'),
(167, 1, 'på lager', 'Hjelm'),
(168, 1, 'på lager', 'Hjelm'),
(169, 1, 'på lager', 'Hjelm'),
(170, 1, 'på lager', 'Hjelm'),
(171, 1, 'på lager', 'Hjelm'),
(172, 1, 'på lager', 'Hjelm'),
(173, 1, 'på lager', 'Hjelm'),
(174, 1, 'på lager', 'Hjelm'),
(175, 1, 'på lager', 'Hjelm'),
(176, 1, 'på lager', 'Hjelm'),
(177, 1, 'på lager', 'Hjelm'),
(178, 1, 'på lager', 'Hjelm'),
(179, 1, 'på lager', 'Hjelm'),
(180, 1, 'på lager', 'Hjelm'),
(181, 1, 'på lager', 'Hjelm'),
(182, 1, 'på lager', 'Hjelm'),
(183, 1, 'på lager', 'Hjelm'),
(184, 1, 'på lager', 'Hjelm'),
(185, 1, 'på lager', 'Hjelm'),
(186, 1, 'på lager', 'Hjelm barn'),
(187, 1, 'på lager', 'Hjelm barn'),
(188, 1, 'på lager', 'Hjelm barn'),
(189, 1, 'på lager', 'Hjelm barn'),
(190, 1, 'på lager', 'Hjelm barn'),
(191, 1, 'på lager', 'Hjelm barn'),
(192, 1, 'på lager', 'Hjelm barn'),
(193, 1, 'på lager', 'Hjelm barn'),
(194, 1, 'på lager', 'Hjelm barn'),
(195, 1, 'på lager', 'Hjelm barn'),
(196, 1, 'på lager', 'Hjelm barn'),
(197, 1, 'på lager', 'Hjelm barn'),
(198, 1, 'på lager', 'Hjelm barn'),
(199, 1, 'på lager', 'Hjelm barn'),
(200, 1, 'på lager', 'Hjelm barn'),
(201, 1, 'på lager', 'Hjelm barn'),
(202, 1, 'på lager', 'Hjelm barn'),
(203, 1, 'på lager', 'Hjelm barn'),
(204, 1, 'på lager', 'Hjelm barn'),
(205, 1, 'på lager', 'Hjelm barn'),
(206, 1, 'på lager', 'Lappesaker'),
(207, 1, 'på lager', 'Lappesaker'),
(208, 1, 'på lager', 'Lappesaker'),
(209, 1, 'på lager', 'Lappesaker'),
(210, 1, 'på lager', 'Lappesaker'),
(211, 1, 'på lager', 'Lappesaker'),
(212, 1, 'på lager', 'Lappesaker'),
(213, 1, 'på lager', 'Lappesaker'),
(214, 1, 'på lager', 'Lappesaker'),
(215, 1, 'på lager', 'Lappesaker'),
(216, 1, 'på lager', 'Lappesaker'),
(217, 1, 'på lager', 'Lappesaker'),
(218, 1, 'på lager', 'Lappesaker'),
(219, 1, 'på lager', 'Lappesaker'),
(220, 1, 'på lager', 'Lappesaker'),
(221, 1, 'på lager', 'Lappesaker'),
(222, 1, 'på lager', 'Lappesaker'),
(223, 1, 'på lager', 'Lappesaker'),
(224, 1, 'på lager', 'Lappesaker'),
(225, 1, 'på lager', 'Lappesaker'),
(226, 1, 'på lager', 'Lappesaker'),
(227, 1, 'på lager', 'Lappesaker'),
(228, 1, 'på lager', 'Lappesaker'),
(229, 1, 'på lager', 'Lappesaker'),
(230, 1, 'på lager', 'Lappesaker'),
(231, 1, 'på lager', 'Lappesaker'),
(232, 1, 'på lager', 'Lappesaker'),
(233, 1, 'på lager', 'Lappesaker'),
(234, 1, 'på lager', 'Lappesaker'),
(235, 1, 'på lager', 'Lappesaker'),
(236, 1, 'på lager', 'Lappesaker'),
(237, 1, 'på lager', 'Lappesaker'),
(238, 1, 'på lager', 'Støttehjul'),
(239, 1, 'på lager', 'Støttehjul'),
(240, 1, 'på lager', 'Støttehjul'),
(241, 1, 'på lager', 'Støttehjul'),
(242, 1, 'på lager', 'Støttehjul'),
(243, 1, 'på lager', 'Støttehjul'),
(244, 1, 'på lager', 'Støttehjul'),
(245, 1, 'på lager', 'Støttehjul'),
(246, 1, 'på lager', 'Støttehjul'),
(247, 1, 'på lager', 'Støttehjul'),
(248, 1, 'på lager', 'Støttehjul'),
(249, 1, 'på lager', 'Støttehjul'),
(250, 1, 'på lager', 'Støttehjul'),
(251, 1, 'på lager', 'Støttehjul'),
(252, 1, 'på lager', 'Støttehjul'),
(253, 1, 'på lager', 'Sykkelveske'),
(254, 1, 'på lager', 'Sykkelveske'),
(255, 1, 'på lager', 'Sykkelveske'),
(256, 1, 'på lager', 'Sykkelveske'),
(257, 1, 'på lager', 'Sykkelveske'),
(258, 1, 'på lager', 'Sykkelveske'),
(259, 1, 'på lager', 'Sykkelveske'),
(260, 1, 'på lager', 'Sykkelveske'),
(261, 1, 'på lager', 'Sykkelveske'),
(262, 1, 'på lager', 'Sykkelveske'),
(263, 1, 'på lager', 'Sykkelveske'),
(264, 1, 'på lager', 'Sykkelveske'),
(265, 1, 'på lager', 'Sykkelveske'),
(266, 1, 'på lager', 'Sykkelveske'),
(267, 1, 'på lager', 'Sykkelveske'),
(268, 1, 'på lager', 'Sykkelveske'),
(269, 1, 'på lager', 'Sykkelveske'),
(270, 1, 'på lager', 'Sykkelveske'),
(271, 1, 'på lager', 'Sykkelveske'),
(272, 1, 'på lager', 'Sykkelveske'),
(273, 1, 'på lager', 'Sykkelveske'),
(274, 1, 'på lager', 'Sykkelveske'),
(275, 1, 'på lager', 'Sykkelvogn'),
(276, 1, 'på lager', 'Sykkelvogn'),
(277, 1, 'på lager', 'Sykkelvogn'),
(278, 1, 'på lager', 'Sykkelvogn'),
(279, 1, 'på lager', 'Sykkelvogn'),
(280, 1, 'på lager', 'Sykkelvogn');

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_bestillinger`
--
DROP TABLE IF EXISTS `alle_bestillinger`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `alle_bestillinger`  AS  select `bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til`,`kunde`.`navn` AS `navn`,`henting`.`lokasjon` AS `hentested`,`levering`.`lokasjon` AS `leveringssted`,`bestilling`.`pris` AS `pris`,`bestilling`.`rabatt` AS `rabatt`,`bestilling`.`status` AS `status` from (((`bestilling` left join `kunde` on((`bestilling`.`k_id` = `kunde`.`k_id`))) left join `lokasjon` `henting` on((`bestilling`.`henting` = `henting`.`l_id`))) left join `lokasjon` `levering` on((`bestilling`.`levering` = `levering`.`l_id`))) ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_sykler`
--
DROP TABLE IF EXISTS `alle_sykler`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `alle_sykler`  AS  select `sykkel`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`sykkel`.`ramme` AS `ramme`,`sykkel`.`girsystem` AS `girsystem`,`sykkel`.`størrelse_hjul` AS `størrelse_hjul`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from (((`lokasjon` join `vare` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) join `sykkel` on((`sykkel`.`v_id` = `vare`.`v_id`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_varer`
--
DROP TABLE IF EXISTS `alle_varer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `alle_varer`  AS  select `vare`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from ((`lokasjon` join `vare` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alt_utstyr`
--
DROP TABLE IF EXISTS `alt_utstyr`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `alt_utstyr`  AS  select `utstyr`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from (((`vare` join `lokasjon` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `utstyr` on((`vare`.`v_id` = `utstyr`.`v_id`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `antall_kundebestillinger`
--
DROP TABLE IF EXISTS `antall_kundebestillinger`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `antall_kundebestillinger`  AS  select `kunde`.`mobilnummer` AS `mobilnummer`,count(`bestilling`.`k_id`) AS `antall_b` from (`kunde` left join `bestilling` on((`kunde`.`k_id` = `bestilling`.`k_id`))) group by `kunde`.`mobilnummer` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `bestillinger_varer`
--
DROP TABLE IF EXISTS `bestillinger_varer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `bestillinger_varer`  AS  select `alle_bestillinger`.`b_id` AS `b_id`,`vare`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status` from ((`alle_bestillinger` left join `utleieliste` on((`utleieliste`.`b_id` = `alle_bestillinger`.`b_id`))) left join `vare` on((`vare`.`v_id` = `utleieliste`.`v_id`))) order by `vare`.`type`,`vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `tilgjengelige_sykler`
--
DROP TABLE IF EXISTS `tilgjengelige_sykler`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `tilgjengelige_sykler`  AS  select distinct `sykkel`.`v_id` AS `v_id`,`sykkel`.`type` AS `type`,`sykkel`.`ramme` AS `ramme`,`sykkel`.`girsystem` AS `girsystem`,`sykkel`.`størrelse_hjul` AS `størrelse_hjul`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris`,`bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til` from ((((`vare` left join `utleieliste` on((`utleieliste`.`v_id` = `vare`.`v_id`))) left join `bestilling` on((`bestilling`.`b_id` = `utleieliste`.`b_id`))) left join `sykkel` on((`sykkel`.`v_id` = `vare`.`v_id`))) left join `prisliste` on((`prisliste`.`type` = `sykkel`.`type`))) where ((`sykkel`.`v_id` is not null) and (`vare`.`status` <> 'savnet') and (`vare`.`status` <> 'på reparasjon') and (`vare`.`status` <> 'trenger reparasjon')) order by `sykkel`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `tilgjengelige_utstyr`
--
DROP TABLE IF EXISTS `tilgjengelige_utstyr`;

CREATE ALGORITHM=UNDEFINED DEFINER=`g_idri1005_05`@`%` SQL SECURITY DEFINER VIEW `tilgjengelige_utstyr`  AS  select `utstyr`.`v_id` AS `v_id`,`utstyr`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris`,`bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til` from ((((`utstyr` left join `vare` on((`vare`.`v_id` = `utstyr`.`v_id`))) left join `utleieliste` on((`utleieliste`.`v_id` = `vare`.`v_id`))) left join `bestilling` on((`bestilling`.`b_id` = `utleieliste`.`b_id`))) left join `prisliste` on((`utstyr`.`type` = `prisliste`.`type`))) where ((not((`vare`.`status` like 'på reparasjon'))) or (not((`vare`.`status` like 'savnet'))) or (not((`vare`.`status` like 'trenger reparasjon')))) order by `utstyr`.`v_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bestilling`
--
ALTER TABLE `bestilling`
  ADD PRIMARY KEY (`b_id`),
  ADD KEY `henting` (`henting`),
  ADD KEY `levering` (`levering`),
  ADD KEY `k_id` (`k_id`);

--
-- Indexes for table `kunde`
--
ALTER TABLE `kunde`
  ADD PRIMARY KEY (`k_id`);

--
-- Indexes for table `lokasjon`
--
ALTER TABLE `lokasjon`
  ADD PRIMARY KEY (`l_id`);

--
-- Indexes for table `prisliste`
--
ALTER TABLE `prisliste`
  ADD PRIMARY KEY (`type`);

--
-- Indexes for table `restriksjoner`
--
ALTER TABLE `restriksjoner`
  ADD KEY `s_type` (`s_type`),
  ADD KEY `u_type` (`u_type`);

--
-- Indexes for table `sykkel`
--
ALTER TABLE `sykkel`
  ADD PRIMARY KEY (`v_id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `utleieliste`
--
ALTER TABLE `utleieliste`
  ADD KEY `v_id` (`v_id`),
  ADD KEY `b_id` (`b_id`);

--
-- Indexes for table `utstyr`
--
ALTER TABLE `utstyr`
  ADD PRIMARY KEY (`v_id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `vare`
--
ALTER TABLE `vare`
  ADD PRIMARY KEY (`v_id`),
  ADD KEY `tilhører` (`tilhører`),
  ADD KEY `type` (`type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bestilling`
--
ALTER TABLE `bestilling`
  MODIFY `b_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `kunde`
--
ALTER TABLE `kunde`
  MODIFY `k_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `lokasjon`
--
ALTER TABLE `lokasjon`
  MODIFY `l_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vare`
--
ALTER TABLE `vare`
  MODIFY `v_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `bestilling`
--
ALTER TABLE `bestilling`
  ADD CONSTRAINT `bestilling_ibfk_1` FOREIGN KEY (`henting`) REFERENCES `lokasjon` (`l_id`),
  ADD CONSTRAINT `bestilling_ibfk_2` FOREIGN KEY (`levering`) REFERENCES `lokasjon` (`l_id`),
  ADD CONSTRAINT `bestilling_ibfk_3` FOREIGN KEY (`k_id`) REFERENCES `kunde` (`k_id`);

--
-- Begrensninger for tabell `restriksjoner`
--
ALTER TABLE `restriksjoner`
  ADD CONSTRAINT `restriksjoner_ibfk_1` FOREIGN KEY (`s_type`) REFERENCES `prisliste` (`type`),
  ADD CONSTRAINT `restriksjoner_ibfk_2` FOREIGN KEY (`u_type`) REFERENCES `prisliste` (`type`);

--
-- Begrensninger for tabell `sykkel`
--
ALTER TABLE `sykkel`
  ADD CONSTRAINT `sykkel_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `vare` (`v_id`),
  ADD CONSTRAINT `sykkel_ibfk_2` FOREIGN KEY (`type`) REFERENCES `prisliste` (`type`);

--
-- Begrensninger for tabell `utleieliste`
--
ALTER TABLE `utleieliste`
  ADD CONSTRAINT `utleieliste_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `vare` (`v_id`),
  ADD CONSTRAINT `utleieliste_ibfk_2` FOREIGN KEY (`b_id`) REFERENCES `bestilling` (`b_id`);

--
-- Begrensninger for tabell `utstyr`
--
ALTER TABLE `utstyr`
  ADD CONSTRAINT `utstyr_ibfk_1` FOREIGN KEY (`v_id`) REFERENCES `vare` (`v_id`),
  ADD CONSTRAINT `utstyr_ibfk_2` FOREIGN KEY (`type`) REFERENCES `prisliste` (`type`);

--
-- Begrensninger for tabell `vare`
--
ALTER TABLE `vare`
  ADD CONSTRAINT `vare_ibfk_1` FOREIGN KEY (`tilhører`) REFERENCES `lokasjon` (`l_id`),
  ADD CONSTRAINT `vare_ibfk_3` FOREIGN KEY (`type`) REFERENCES `prisliste` (`type`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
