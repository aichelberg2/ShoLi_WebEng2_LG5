-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 21. Apr 2022 um 18:31
-- Server-Version: 10.4.19-MariaDB
-- PHP-Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `sholi`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `groups`
--

CREATE TABLE `groups` (
                          `groupname` varchar(30) NOT NULL,
                          `gr_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `list`
--

CREATE TABLE `list` (
                        `list_id` int(10) NOT NULL,
                        `name` varchar(30) NOT NULL,
                        `shared` tinyint(1) NOT NULL DEFAULT 0,
                        `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `listproduct`
--

CREATE TABLE `listproduct` (
                               `pr_id` int(10) NOT NULL,
                               `list_id` int(10) NOT NULL,
                               `ticked` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `product`
--

CREATE TABLE `product` (
                           `pr_id` int(10) NOT NULL,
                           `name` varchar(50) NOT NULL,
                           `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
                        `username` varchar(30) NOT NULL,
                        `firstname` varchar(30) NOT NULL,
                        `lastname` varchar(30) NOT NULL,
                        `email` varchar(50) NOT NULL,
                        `password` varchar(30) NOT NULL,
                        `logged_in` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `usergroup`
--

CREATE TABLE `usergroup` (
                             `user` varchar(30) NOT NULL,
                             `gr_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userlist`
--

CREATE TABLE `userlist` (
                            `user` varchar(30) NOT NULL,
                            `list_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `groups`
--
ALTER TABLE `groups`
    ADD PRIMARY KEY (`gr_id`);

--
-- Indizes für die Tabelle `list`
--
ALTER TABLE `list`
    ADD PRIMARY KEY (`list_id`),
    ADD KEY `group_id` (`group_id`);

--
-- Indizes für die Tabelle `listproduct`
--
ALTER TABLE `listproduct`
    ADD KEY `pr_id` (`pr_id`),
    ADD KEY `list_id` (`list_id`);

--
-- Indizes für die Tabelle `product`
--
ALTER TABLE `product`
    ADD PRIMARY KEY (`pr_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
    ADD PRIMARY KEY (`username`);

--
-- Indizes für die Tabelle `usergroup`
--
ALTER TABLE `usergroup`
    ADD KEY `usergroup_ibfk_1` (`user`),
    ADD KEY `gr_id` (`gr_id`);

--
-- Indizes für die Tabelle `userlist`
--
ALTER TABLE `userlist`
    ADD KEY `userlist_ibfk_1` (`list_id`),
    ADD KEY `userlist_ibfk_2` (`user`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `list`
--
ALTER TABLE `list`
    ADD CONSTRAINT `list_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`gr_id`);

--
-- Constraints der Tabelle `listproduct`
--
ALTER TABLE `listproduct`
    ADD CONSTRAINT `listproduct_ibfk_1` FOREIGN KEY (`pr_id`) REFERENCES `product` (`pr_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `listproduct_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `usergroup`
--
ALTER TABLE `usergroup`
    ADD CONSTRAINT `usergroup_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `usergroup_ibfk_2` FOREIGN KEY (`gr_id`) REFERENCES `groups` (`gr_id`);

--
-- Constraints der Tabelle `userlist`
--
ALTER TABLE `userlist`
    ADD CONSTRAINT `userlist_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `userlist_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
