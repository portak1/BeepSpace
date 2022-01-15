-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 15. led 2022, 11:18
-- Verze serveru: 10.4.18-MariaDB
-- Verze PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `beepspace`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `groupchat`
--

CREATE TABLE `groupchat` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf16_czech_ci NOT NULL,
  `color` text COLLATE utf16_czech_ci NOT NULL,
  `users` text COLLATE utf16_czech_ci NOT NULL,
  `connected_users` text COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `groupchat`
--

INSERT INTO `groupchat` (`id`, `name`, `color`, `users`, `connected_users`) VALUES
(1, 'Projekty chat', '#FFFFFFFF', '1,8,17', ',1'),
(5, 'General Chat', '#00ff04', '1', ''),
(6, '4.ITA', '#000000', '1', ''),
(7, 'LCDP fun club', '#000000', '8', ''),
(10, 'obhajoby', '#1814ff', '1,18', '');

-- --------------------------------------------------------

--
-- Struktura tabulky `messages`
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
-- Vypisuji data pro tabulku `messages`
--

INSERT INTO `messages` (`id`, `message_date`, `user_id`, `content`, `reciever_id`, `isChatMessage`, `chat_id`) VALUES
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
(253, '0000-00-00 00:00:00', 1, 'Ahoj', 11, 0, 0),
(265, '0000-00-00 00:00:00', 1, 'test', 11, 0, 0),
(266, '0000-00-00 00:00:00', 1, 'coeee', 11, 0, 0),
(267, '0000-00-00 00:00:00', 1, 'coooe', 11, 0, 0),
(268, '0000-00-00 00:00:00', 1, 'noobe', 11, 0, 0),
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
(319, '0000-00-00 00:00:00', 8, 'Ahoj😀', 1, 0, 0),
(320, '0000-00-00 00:00:00', 1, 'Ahoj :))', 8, 0, 0),
(321, '0000-00-00 00:00:00', 8, 'Jak se máš?👳🏿‍♂️🤿', 1, 0, 0),
(322, '0000-00-00 00:00:00', 1, 'Docela dobrý, co ty?😍😂😊😊', 8, 0, 0),
(323, '0000-00-00 00:00:00', 8, 'Hele taky to jde🏦', 1, 0, 0),
(324, '0000-00-00 00:00:00', 8, 'Nechtěl bys zajít na snídani?🥧🍰🥞🧇', 1, 0, 0),
(325, '0000-00-00 00:00:00', 1, 'tyjo moc rád! v kolik sraz?🕥', 8, 0, 0),
(326, '0000-00-00 00:00:00', 8, 'V 7:15?👵🏿', 1, 0, 0),
(327, '0000-00-00 00:00:00', 1, 'Jasný! měj se', 8, 0, 0),
(328, '0000-00-00 00:00:00', 8, 'Čaukyy xXx🥰😍😚😈😈🤤🥵🥵🥵💦💦💦', 1, 0, 0),
(329, '0000-00-00 00:00:00', 1, 'ahoj', 17, 0, 0),
(330, '0000-00-00 00:00:00', 17, 'ahoj', 1, 0, 0),
(331, '0000-00-00 00:00:00', 1, 'jak se mas', 17, 0, 0),
(332, '0000-00-00 00:00:00', 17, 'coje ti do toho', 1, 0, 0),
(333, '0000-00-00 00:00:00', 1, '-_-', 17, 0, 0),
(334, '0000-00-00 00:00:00', 17, 'uchyle', 1, 0, 0),
(335, '0000-00-00 00:00:00', 1, 'more tak chcipni ty rakle', 17, 0, 0),
(336, '0000-00-00 00:00:00', 1, 'gazde', 17, 0, 0),
(337, '0000-00-00 00:00:00', 17, 'no gazde', 1, 0, 0),
(338, '0000-00-00 00:00:00', 1, 'hm hm', 17, 0, 0),
(339, '0000-00-00 00:00:00', 1, 'achjo', 17, 0, 0),
(340, '0000-00-00 00:00:00', 17, 'gadze kdyztak', 1, 0, 0),
(341, '0000-00-00 00:00:00', 1, 'á', 17, 0, 0),
(342, '0000-00-00 00:00:00', 1, 'cus', 17, 0, 0),
(343, '0000-00-00 00:00:00', 1, 'ahoj', 18, 0, 0),
(344, '0000-00-00 00:00:00', 18, 'ahoj', 1, 0, 0),
(345, '0000-00-00 00:00:00', 18, '💟💟', 1, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `notifications`
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
-- Vypisuji data pro tabulku `notifications`
--

INSERT INTO `notifications` (`id`, `content`, `date`, `type`, `origin_id`, `reciever_id`, `groupchat_id`) VALUES
(73, 'new invite request from janickakocicka', '0000-00-00 00:00:00', 'invite', 1, 17, 8),
(74, 'new invite request from Pepa', '0000-00-00 00:00:00', 'invite', 1, 8, 6);

-- --------------------------------------------------------

--
-- Struktura tabulky `users`
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
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `username`, `number`, `birth`, `friends_id`, `online`) VALUES
(1, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaport@seznam.cz', 'admin', 601543636, '2003-04-10', '11,8,9,17,18', 1),
(8, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'hrouzek@noob123.com', 'Pepa', 601543636, '2021-11-27', ',1', 0),
(9, '3fca867ff2af052b4ce704b3c022b286a2427ec466499a34231c42393e9ca5d4', 'annaportova07@gmail.com', 'Andulilinka', 606071697, '2021-11-17', '1', 0),
(10, '01cfc1a0bc86dad5a725d776ff1864d1afd748dd932fc86e5406680da66bd147', 'portova.hana@seznam.cz', 'Haminka', 607123687, '1974-02-24', '', 0),
(11, 'd099cf21d256abaa7bae2330dca322b6eb79274b2191249168215be6150ab05b', 'janport@centrum.cz', 'Klayman', 724143676, '1972-09-15', '1', 0),
(12, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'pepega@gmail.com', 'honzik', 123, '2021-11-23', 'é', 0),
(15, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaMASIOFMmlkmff', 'honza', 23442, '0004-03-31', '', 0),
(16, 'd97d87d4da285adebd7f7b322eaf12930392eb65e51c1062de307ecb6552bab2', 'jana.placha123@seznam.cz', 'tojsemjazabijak', 739716379, '1998-04-10', '', 0),
(17, 'dd14c479f8f7da226853502b555d530862e13a4a265219877584801e3e250d2b', 'jana.placha123@seznam.cz', 'janickakocicka', 739716379, '2005-05-05', ',1', 0),
(18, '56b1db8133d9eb398aabd376f07bf8ab5fc584ea0b8bd6a1770200cb613ca005', 'vrata@gmail.com', 'vratislavinko', 234234231, '2022-01-18', ',1', 1);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `groupchat`
--
ALTER TABLE `groupchat`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `reciever_id` (`reciever_id`),
  ADD KEY `chat_id` (`chat_id`);

--
-- Indexy pro tabulku `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reciever_id` (`reciever_id`),
  ADD KEY `origin_id` (`origin_id`) USING BTREE,
  ADD KEY `groupchat_id` (`groupchat_id`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `groupchat`
--
ALTER TABLE `groupchat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pro tabulku `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=346;

--
-- AUTO_INCREMENT pro tabulku `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);

--
-- Omezení pro tabulku `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`origin_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
