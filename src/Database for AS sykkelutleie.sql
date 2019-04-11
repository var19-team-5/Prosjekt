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
-- Database: `AS sykkelutleie`
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

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `restriksjoner`
--

CREATE TABLE `restriksjoner` (
  `s_type` varchar(35) DEFAULT NULL,
  `u_type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `utstyr`
--

CREATE TABLE `utstyr` (
  `v_id` int(8) NOT NULL,
  `type` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_bestillinger`
--
DROP TABLE IF EXISTS `alle_bestillinger`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `alle_bestillinger`  AS  select `bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til`,`kunde`.`navn` AS `navn`,`henting`.`lokasjon` AS `hentested`,`levering`.`lokasjon` AS `leveringssted`,`bestilling`.`pris` AS `pris`,`bestilling`.`rabatt` AS `rabatt`,`bestilling`.`status` AS `status` from (((`bestilling` left join `kunde` on((`bestilling`.`k_id` = `kunde`.`k_id`))) left join `lokasjon` `henting` on((`bestilling`.`henting` = `henting`.`l_id`))) left join `lokasjon` `levering` on((`bestilling`.`levering` = `levering`.`l_id`))) ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_sykler`
--
DROP TABLE IF EXISTS `alle_sykler`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `alle_sykler`  AS  select `sykkel`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`sykkel`.`ramme` AS `ramme`,`sykkel`.`girsystem` AS `girsystem`,`sykkel`.`størrelse_hjul` AS `størrelse_hjul`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from (((`lokasjon` join `vare` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) join `sykkel` on((`sykkel`.`v_id` = `vare`.`v_id`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alle_varer`
--
DROP TABLE IF EXISTS `alle_varer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `alle_varer`  AS  select `vare`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from ((`lokasjon` join `vare` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `alt_utstyr`
--
DROP TABLE IF EXISTS `alt_utstyr`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `alt_utstyr`  AS  select `utstyr`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris` from (((`vare` join `lokasjon` on((`lokasjon`.`l_id` = `vare`.`tilhører`))) join `utstyr` on((`vare`.`v_id` = `utstyr`.`v_id`))) join `prisliste` on((`vare`.`type` = `prisliste`.`type`))) order by `vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `antall_kundebestillinger`
--
DROP TABLE IF EXISTS `antall_kundebestillinger`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `antall_kundebestillinger`  AS  select `kunde`.`mobilnummer` AS `mobilnummer`,count(`bestilling`.`k_id`) AS `antall_b` from (`kunde` left join `bestilling` on((`kunde`.`k_id` = `bestilling`.`k_id`))) group by `kunde`.`mobilnummer` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `bestillinger_varer`
--
DROP TABLE IF EXISTS `bestillinger_varer`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `bestillinger_varer`  AS  select `alle_bestillinger`.`b_id` AS `b_id`,`vare`.`v_id` AS `v_id`,`vare`.`type` AS `type`,`vare`.`status` AS `status` from ((`alle_bestillinger` left join `utleieliste` on((`utleieliste`.`b_id` = `alle_bestillinger`.`b_id`))) left join `vare` on((`vare`.`v_id` = `utleieliste`.`v_id`))) order by `vare`.`type`,`vare`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `tilgjengelige_sykler`
--
DROP TABLE IF EXISTS `tilgjengelige_sykler`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `tilgjengelige_sykler`  AS  select distinct `sykkel`.`v_id` AS `v_id`,`sykkel`.`type` AS `type`,`sykkel`.`ramme` AS `ramme`,`sykkel`.`girsystem` AS `girsystem`,`sykkel`.`størrelse_hjul` AS `størrelse_hjul`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris`,`bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til` from ((((`vare` left join `utleieliste` on((`utleieliste`.`v_id` = `vare`.`v_id`))) left join `bestilling` on((`bestilling`.`b_id` = `utleieliste`.`b_id`))) left join `sykkel` on((`sykkel`.`v_id` = `vare`.`v_id`))) left join `prisliste` on((`prisliste`.`type` = `sykkel`.`type`))) where ((`sykkel`.`v_id` is not null) and (`vare`.`status` <> 'savnet') and (`vare`.`status` <> 'på reparasjon') and (`vare`.`status` <> 'trenger reparasjon')) order by `sykkel`.`v_id` ;

-- --------------------------------------------------------

--
-- Visningsstruktur `tilgjengelige_utstyr`
--
DROP TABLE IF EXISTS `tilgjengelige_utstyr`;

CREATE ALGORITHM=UNDEFINED DEFINER=`AS sykkelutleie`@`%` SQL SECURITY DEFINER VIEW `tilgjengelige_utstyr`  AS  select `utstyr`.`v_id` AS `v_id`,`utstyr`.`type` AS `type`,`vare`.`status` AS `status`,`prisliste`.`pris` AS `pris`,`bestilling`.`b_id` AS `b_id`,`bestilling`.`fra` AS `fra`,`bestilling`.`til` AS `til` from ((((`utstyr` left join `vare` on((`vare`.`v_id` = `utstyr`.`v_id`))) left join `utleieliste` on((`utleieliste`.`v_id` = `vare`.`v_id`))) left join `bestilling` on((`bestilling`.`b_id` = `utleieliste`.`b_id`))) left join `prisliste` on((`utstyr`.`type` = `prisliste`.`type`))) where ((not((`vare`.`status` like 'på reparasjon'))) or (not((`vare`.`status` like 'savnet'))) or (not((`vare`.`status` like 'trenger reparasjon')))) order by `utstyr`.`v_id` ;

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
