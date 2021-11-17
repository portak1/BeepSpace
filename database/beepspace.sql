-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2021 at 09:15 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `beepspace`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` longtext COLLATE utf16_czech_ci NOT NULL,
  `reciever_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message_date`, `user_id`, `content`, `reciever_id`) VALUES
(6, '2021-11-04 13:30:18', 1, 'petr je vlastně totalní noob', 7),
(7, '2021-11-04 13:30:18', 7, 'je no', 1),
(8, '0000-00-00 00:00:00', 1, 'ahoj', 8),
(9, '0000-00-00 00:00:00', 1, '???', 8),
(10, '0000-00-00 00:00:00', 8, 'no', 1),
(11, '0000-00-00 00:00:00', 8, 'to', 1),
(12, '0000-00-00 00:00:00', 8, 'si', 1),
(13, '0000-00-00 00:00:00', 8, 'delas', 1),
(14, '0000-00-00 00:00:00', 8, 'prdel???', 1),
(15, '0000-00-00 00:00:00', 1, 'noob', 8),
(16, '0000-00-00 00:00:00', 8, 'co to je?', 1),
(17, '0000-00-00 00:00:00', 8, 'halloooo?', 1),
(18, '0000-00-00 00:00:00', 8, 'cus', 1),
(19, '0000-00-00 00:00:00', 8, 'nazdar', 1),
(20, '0000-00-00 00:00:00', 8, 'jak je?', 1),
(21, '0000-00-00 00:00:00', 1, 'joo dobrý', 8),
(22, '0000-00-00 00:00:00', 1, 'co ty?', 8),
(23, '0000-00-00 00:00:00', 1, 'Ahoj', 9),
(24, '0000-00-00 00:00:00', 1, 'Jak je?', 9),
(25, '0000-00-00 00:00:00', 9, '👹', 1),
(26, '0000-00-00 00:00:00', 1, '😂😂😂', 9),
(27, '0000-00-00 00:00:00', 1, 'Ty jsi noob ', 9),
(28, '0000-00-00 00:00:00', 9, 'Koukni se na moji stěnu ', 1),
(29, '0000-00-00 00:00:00', 1, 'Proč?', 9),
(30, '0000-00-00 00:00:00', 1, '😐😐😐', 9),
(31, '0000-00-00 00:00:00', 9, '🤣', 1),
(32, '0000-00-00 00:00:00', 9, '😮‍💨', 1),
(33, '0000-00-00 00:00:00', 1, '😂😂😂', 9),
(34, '0000-00-00 00:00:00', 1, 'Pozdrav mamku', 9),
(35, '0000-00-00 00:00:00', 9, 'Jak jako', 1),
(36, '0000-00-00 00:00:00', 9, 'Přes tu aplikaci ?', 1),
(37, '0000-00-00 00:00:00', 9, 'Nebo jak to myslíš ?', 1),
(38, '0000-00-00 00:00:00', 9, 'Mám ti udělat svačinu ?', 1),
(39, '0000-00-00 00:00:00', 9, 'Hej', 1),
(40, '0000-00-00 00:00:00', 9, '🎄', 1),
(41, '0000-00-00 00:00:00', 1, 'Jo pls', 9),
(42, '0000-00-00 00:00:00', 1, 'No jako přes tu aplikaci', 9),
(43, '0000-00-00 00:00:00', 1, '👾', 9),
(44, '0000-00-00 00:00:00', 1, 'Ahoj mami!💖', 10),
(45, '0000-00-00 00:00:00', 10, 'Ahooooj', 1),
(46, '0000-00-00 00:00:00', 10, '😲', 1),
(47, '0000-00-00 00:00:00', 1, '❤️👍🏻✅', 10),
(48, '0000-00-00 00:00:00', 11, 'Ahoj', 1),
(49, '0000-00-00 00:00:00', 1, 'Nazdaar⚽️', 11),
(50, '0000-00-00 00:00:00', 11, 'Suoer vysledek', 1),
(51, '0000-00-00 00:00:00', 11, 'Dvě vítězství 💪', 1),
(52, '0000-00-00 00:00:00', 11, 'Ahoj', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` mediumtext COLLATE utf16_czech_ci NOT NULL,
  `email` text COLLATE utf16_czech_ci NOT NULL,
  `username` text COLLATE utf16_czech_ci NOT NULL,
  `number` int(11) NOT NULL,
  `birth` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `username`, `number`, `birth`) VALUES
(1, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaport@seznam.cz', 'admin', 601543636, '2003-04-10'),
(7, '23d27446488226d4eb68c249489c893ab3a9603842ff7900312ce71656a4211c', 'petr@jsinoob.cz', 'petrPepega', 8, '2021-11-27'),
(8, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'hrouzek@noob123.com', 'hrouzek', 601543636, '2021-11-27'),
(9, '3fca867ff2af052b4ce704b3c022b286a2427ec466499a34231c42393e9ca5d4', 'annaportova07@gmail.com', 'Andulilinka', 606071697, '2021-11-17'),
(10, '01cfc1a0bc86dad5a725d776ff1864d1afd748dd932fc86e5406680da66bd147', 'portova.hana@seznam.cz', 'Haminka', 607123687, '1974-02-24'),
(11, 'd099cf21d256abaa7bae2330dca322b6eb79274b2191249168215be6150ab05b', 'janport@centrum.cz', 'Klayman', 724143676, '1972-09-15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `reciever_id` (`reciever_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
