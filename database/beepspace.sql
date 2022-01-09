-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2022 at 11:11 PM
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
-- Table structure for table `groupchat`
--

CREATE TABLE `groupchat` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf16_czech_ci NOT NULL,
  `color` text COLLATE utf16_czech_ci NOT NULL,
  `users` text COLLATE utf16_czech_ci NOT NULL,
  `connected_users` text COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `groupchat`
--

INSERT INTO `groupchat` (`id`, `name`, `color`, `users`, `connected_users`) VALUES
(1, 'pepegacChat', '#FFFFFFFF', '1,8,17', ''),
(5, 'skupina 1', '#00ff04', '1', ',1'),
(6, 'Janicka skupina', '#000000', '1', ''),
(7, 'kokot', '#000000', '8', '');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` longtext COLLATE utf16_czech_ci NOT NULL,
  `reciever_id` int(11) NOT NULL,
  `isChatMessage` tinyint(1) NOT NULL,
  `chat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message_date`, `user_id`, `content`, `reciever_id`, `isChatMessage`, `chat_id`) VALUES
(18, '0000-00-00 00:00:00', 8, 'cus', 1, 0, 0),
(19, '0000-00-00 00:00:00', 8, 'nazdar', 1, 0, 0),
(20, '0000-00-00 00:00:00', 8, 'jak je?', 1, 0, 0),
(21, '0000-00-00 00:00:00', 1, 'joo dobrý', 8, 0, 0),
(22, '0000-00-00 00:00:00', 1, 'co ty?', 8, 0, 0),
(23, '0000-00-00 00:00:00', 1, 'Ahoj', 9, 0, 0),
(24, '0000-00-00 00:00:00', 1, 'Jak je?', 9, 0, 0),
(25, '0000-00-00 00:00:00', 9, '👹', 1, 0, 0),
(26, '0000-00-00 00:00:00', 1, '😂😂😂', 9, 0, 0),
(27, '0000-00-00 00:00:00', 1, 'Ty jsi noob ', 9, 0, 0),
(28, '0000-00-00 00:00:00', 9, 'Koukni se na moji stěnu ', 1, 0, 0),
(29, '0000-00-00 00:00:00', 1, 'Proč?', 9, 0, 0),
(30, '0000-00-00 00:00:00', 1, '😐😐😐', 9, 0, 0),
(31, '0000-00-00 00:00:00', 9, '🤣', 1, 0, 0),
(32, '0000-00-00 00:00:00', 9, '😮‍💨', 1, 0, 0),
(33, '0000-00-00 00:00:00', 1, '😂😂😂', 9, 0, 0),
(34, '0000-00-00 00:00:00', 1, 'Pozdrav mamku', 9, 0, 0),
(35, '0000-00-00 00:00:00', 9, 'Jak jako', 1, 0, 0),
(36, '0000-00-00 00:00:00', 9, 'Přes tu aplikaci ?', 1, 0, 0),
(37, '0000-00-00 00:00:00', 9, 'Nebo jak to myslíš ?', 1, 0, 0),
(38, '0000-00-00 00:00:00', 9, 'Mám ti udělat svačinu ?', 1, 0, 0),
(39, '0000-00-00 00:00:00', 9, 'Hej', 1, 0, 0),
(40, '0000-00-00 00:00:00', 9, '🎄', 1, 0, 0),
(41, '0000-00-00 00:00:00', 1, 'Jo pls', 9, 0, 0),
(42, '0000-00-00 00:00:00', 1, 'No jako přes tu aplikaci', 9, 0, 0),
(43, '0000-00-00 00:00:00', 1, '👾', 9, 0, 0),
(44, '0000-00-00 00:00:00', 1, 'Ahoj mami!💖', 10, 0, 0),
(45, '0000-00-00 00:00:00', 10, 'Ahooooj', 1, 0, 0),
(46, '0000-00-00 00:00:00', 10, '😲', 1, 0, 0),
(47, '0000-00-00 00:00:00', 1, '❤️👍🏻✅', 10, 0, 0),
(48, '0000-00-00 00:00:00', 11, 'Ahoj', 1, 0, 0),
(49, '0000-00-00 00:00:00', 1, 'Nazdaar⚽️', 11, 0, 0),
(50, '0000-00-00 00:00:00', 11, 'Suoer vysledek', 1, 0, 0),
(51, '0000-00-00 00:00:00', 11, 'Dvě vítězství 💪', 1, 0, 0),
(52, '0000-00-00 00:00:00', 11, 'Ahoj', 9, 0, 0),
(53, '0000-00-00 00:00:00', 12, '1', 1, 0, 0),
(54, '0000-00-00 00:00:00', 1, 'pepego)', 12, 0, 0),
(224, '0000-00-00 00:00:00', 1, 'tesst', 15, 0, 0),
(225, '0000-00-00 00:00:00', 1, 'ahoj', 15, 0, 0),
(226, '0000-00-00 00:00:00', 1, 'fj', 15, 0, 0),
(227, '0000-00-00 00:00:00', 15, 'nmec', 12, 0, 0),
(228, '0000-00-00 00:00:00', 15, 'pepego', 1, 0, 0),
(229, '0000-00-00 00:00:00', 15, 'pepego', 1, 0, 0),
(230, '0000-00-00 00:00:00', 1, 'noob', 15, 0, 0),
(231, '0000-00-00 00:00:00', 1, 'noboo', 15, 0, 0),
(232, '0000-00-00 00:00:00', 1, 'b', 15, 0, 0),
(233, '0000-00-00 00:00:00', 1, 'b', 15, 0, 0),
(234, '0000-00-00 00:00:00', 1, 'b', 15, 0, 0),
(235, '0000-00-00 00:00:00', 1, 'd', 15, 0, 0),
(236, '0000-00-00 00:00:00', 15, 'haah', 1, 0, 0),
(237, '0000-00-00 00:00:00', 15, 'noob', 1, 0, 0),
(238, '0000-00-00 00:00:00', 1, 'ahoj :)', 16, 0, 0),
(239, '0000-00-00 00:00:00', 1, 'jhaajajaj', 16, 0, 0),
(240, '0000-00-00 00:00:00', 1, 'noobe', 16, 0, 0),
(241, '0000-00-00 00:00:00', 16, 'avoj', 1, 0, 0),
(242, '0000-00-00 00:00:00', 1, ':)', 16, 0, 0),
(243, '0000-00-00 00:00:00', 16, 'tonjsem ja ', 1, 0, 0),
(244, '0000-00-00 00:00:00', 1, '😍😍', 16, 0, 0),
(245, '0000-00-00 00:00:00', 16, '🥺🥺🥺🥺🥺', 1, 0, 0),
(246, '0000-00-00 00:00:00', 1, '🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺', 16, 0, 0),
(247, '0000-00-00 00:00:00', 1, 'ahoj', 11, 0, 0),
(248, '0000-00-00 00:00:00', 1, 'jak je?', 11, 0, 0),
(249, '0000-00-00 00:00:00', 11, 'Dneska bomba⚽️', 1, 0, 0),
(250, '0000-00-00 00:00:00', 1, 'Azoj', 8, 0, 0),
(251, '0000-00-00 00:00:00', 1, 'ty jsi noob', 8, 0, 0),
(252, '0000-00-00 00:00:00', 1, 'jhahahah', 8, 0, 0),
(253, '0000-00-00 00:00:00', 1, 'Ahoj', 11, 0, 0),
(254, '0000-00-00 00:00:00', 8, 'ahoj', 1, 0, 0),
(255, '0000-00-00 00:00:00', 8, 'pepego', 1, 0, 0),
(256, '0000-00-00 00:00:00', 1, 'ty jsi noob', 8, 0, 0),
(257, '0000-00-00 00:00:00', 1, 'noob', 8, 0, 0),
(258, '0000-00-00 00:00:00', 1, 'paneboze', 8, 0, 0),
(259, '0000-00-00 00:00:00', 1, 'achjo', 8, 0, 0),
(260, '0000-00-00 00:00:00', 1, '¨', 8, 0, 0),
(261, '0000-00-00 00:00:00', 1, '¨', 8, 0, 0),
(262, '0000-00-00 00:00:00', 1, '¨', 8, 0, 0),
(263, '0000-00-00 00:00:00', 1, 'Pici', 8, 0, 0),
(264, '0000-00-00 00:00:00', 1, 'test', 8, 0, 0),
(265, '0000-00-00 00:00:00', 1, 'test', 11, 0, 0),
(266, '0000-00-00 00:00:00', 1, 'coeee', 11, 0, 0),
(267, '0000-00-00 00:00:00', 1, 'coooe', 11, 0, 0),
(268, '0000-00-00 00:00:00', 1, 'noobe', 11, 0, 0),
(269, '0000-00-00 00:00:00', 8, 'test', 1, 0, 0),
(270, '0000-00-00 00:00:00', 8, 'test', 1, 0, 0),
(271, '0000-00-00 00:00:00', 1, 'ahouj', 8, 0, 0),
(272, '0000-00-00 00:00:00', 1, 'test', 8, 0, 0),
(273, '0000-00-00 00:00:00', 1, 'test', 8, 0, 0),
(274, '0000-00-00 00:00:00', 1, 'ty jsi noob', 8, 0, 0),
(275, '0000-00-00 00:00:00', 8, 'lol wym', 1, 0, 0),
(276, '0000-00-00 00:00:00', 1, 'test', 8, 0, 0),
(277, '0000-00-00 00:00:00', 1, 'tes', 8, 0, 0),
(278, '0000-00-00 00:00:00', 8, 'ahoj?', 1, 0, 0),
(279, '0000-00-00 00:00:00', 8, 'ahoj?', 1, 0, 0),
(280, '0000-00-00 00:00:00', 8, 'ajoj', 1, 0, 0),
(281, '0000-00-00 00:00:00', 8, 'f', 1, 0, 0),
(282, '0000-00-00 00:00:00', 8, 'f', 1, 0, 0),
(283, '0000-00-00 00:00:00', 8, 'f', 1, 0, 0),
(284, '0000-00-00 00:00:00', 8, 'f', 1, 0, 0),
(285, '0000-00-00 00:00:00', 8, 'f', 1, 0, 0),
(290, '0000-00-00 00:00:00', 1, 'achjo', 1, 1, 1),
(291, '0000-00-00 00:00:00', 1, 'noobe', 1, 1, 1),
(292, '0000-00-00 00:00:00', 1, 'achjo toto je fucked up', 1, 1, 1),
(293, '0000-00-00 00:00:00', 1, 'ahoj', 17, 0, 0),
(294, '0000-00-00 00:00:00', 17, 'sauu', 1, 0, 0),
(295, '0000-00-00 00:00:00', 1, 'jak se mas?', 17, 0, 0),
(296, '0000-00-00 00:00:00', 17, 'ale ghetto', 1, 0, 0),
(297, '0000-00-00 00:00:00', 1, '🤣', 17, 0, 0),
(298, '0000-00-00 00:00:00', 17, '😻', 1, 0, 0),
(299, '0000-00-00 00:00:00', 1, '🍿🍿🍿🍿🍿🍿', 17, 0, 0),
(300, '0000-00-00 00:00:00', 17, '🤎', 1, 0, 0),
(301, '0000-00-00 00:00:00', 1, '🥣', 17, 0, 0),
(302, '0000-00-00 00:00:00', 17, '🥣🥣🥣🥣🥣', 1, 0, 0),
(303, '0000-00-00 00:00:00', 1, '🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞🥞', 17, 0, 0),
(304, '0000-00-00 00:00:00', 1, '🥞🥞🥞🥞🥞🥞', 17, 0, 0),
(305, '0000-00-00 00:00:00', 1, '🥞', 17, 0, 0),
(306, '0000-00-00 00:00:00', 17, '🍵🍵', 1, 0, 0),
(307, '0000-00-00 00:00:00', 17, '🕸🦄🦧🐑🦮🦙🦩🦥🐾🦡🦫🌝🌬🌫', 1, 0, 0),
(308, '0000-00-00 00:00:00', 1, 'achjo', 8, 0, 0),
(309, '0000-00-00 00:00:00', 1, 'ahoj', 8, 0, 0),
(310, '0000-00-00 00:00:00', 1, 'ahoj', 8, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `content` text COLLATE utf16_czech_ci NOT NULL,
  `date` datetime NOT NULL,
  `type` text COLLATE utf16_czech_ci NOT NULL,
  `origin_id` int(11) NOT NULL,
  `reciever_id` int(11) NOT NULL,
  `groupchat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `content`, `date`, `type`, `origin_id`, `reciever_id`, `groupchat_id`) VALUES
(67, 'new invite request from hrouzek', '0000-00-00 00:00:00', 'invite', 1, 8, 1),
(68, 'new invite request from janickakocicka', '0000-00-00 00:00:00', 'invite', 1, 17, 1);

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
  `birth` date NOT NULL,
  `friends_id` text COLLATE utf16_czech_ci NOT NULL,
  `online` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `username`, `number`, `birth`, `friends_id`, `online`) VALUES
(1, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaport@seznam.cz', 'admin', 601543636, '2003-04-10', '11,8', 1),
(8, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'hrouzek@noob123.com', 'hrouzek', 601543636, '2021-11-27', ',1', 1),
(9, '3fca867ff2af052b4ce704b3c022b286a2427ec466499a34231c42393e9ca5d4', 'annaportova07@gmail.com', 'Andulilinka', 606071697, '2021-11-17', '', 0),
(10, '01cfc1a0bc86dad5a725d776ff1864d1afd748dd932fc86e5406680da66bd147', 'portova.hana@seznam.cz', 'Haminka', 607123687, '1974-02-24', '', 0),
(11, 'd099cf21d256abaa7bae2330dca322b6eb79274b2191249168215be6150ab05b', 'janport@centrum.cz', 'Klayman', 724143676, '1972-09-15', '1', 0),
(12, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'pepega@gmail.com', 'honzik', 123, '2021-11-23', '', 0),
(15, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaMASIOFMmlkmff', 'honza', 23442, '0004-03-31', '', 0),
(16, 'd97d87d4da285adebd7f7b322eaf12930392eb65e51c1062de307ecb6552bab2', 'jana.placha123@seznam.cz', 'tojsemjazabijak', 739716379, '1998-04-10', '', 0),
(17, 'dd14c479f8f7da226853502b555d530862e13a4a265219877584801e3e250d2b', 'jana.placha123@seznam.cz', 'janickakocicka', 739716379, '2005-05-05', ',1', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groupchat`
--
ALTER TABLE `groupchat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `reciever_id` (`reciever_id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reciever_id` (`reciever_id`),
  ADD KEY `origin_id` (`origin_id`) USING BTREE,
  ADD KEY `groupchat_id` (`groupchat_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groupchat`
--
ALTER TABLE `groupchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=311;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
