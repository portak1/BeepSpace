-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Sob 20. lis 2021, 12:06
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
-- Struktura tabulky `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `message_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` longtext COLLATE utf16_czech_ci NOT NULL,
  `reciever_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `messages`
--

INSERT INTO `messages` (`id`, `message_date`, `user_id`, `content`, `reciever_id`) VALUES
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
(52, '0000-00-00 00:00:00', 11, 'Ahoj', 9),
(53, '0000-00-00 00:00:00', 12, '1', 1),
(54, '0000-00-00 00:00:00', 1, 'pepego)', 12),
(224, '0000-00-00 00:00:00', 1, 'tesst', 15),
(225, '0000-00-00 00:00:00', 1, 'ahoj', 15),
(226, '0000-00-00 00:00:00', 1, 'fj', 15),
(227, '0000-00-00 00:00:00', 15, 'nmec', 12),
(228, '0000-00-00 00:00:00', 15, 'pepego', 1),
(229, '0000-00-00 00:00:00', 15, 'pepego', 1),
(230, '0000-00-00 00:00:00', 1, 'noob', 15),
(231, '0000-00-00 00:00:00', 1, 'noboo', 15),
(232, '0000-00-00 00:00:00', 1, 'b', 15),
(233, '0000-00-00 00:00:00', 1, 'b', 15),
(234, '0000-00-00 00:00:00', 1, 'b', 15),
(235, '0000-00-00 00:00:00', 1, 'd', 15),
(236, '0000-00-00 00:00:00', 15, 'haah', 1),
(237, '0000-00-00 00:00:00', 15, 'noob', 1),
(238, '0000-00-00 00:00:00', 1, 'ahoj :)', 16),
(239, '0000-00-00 00:00:00', 1, 'jhaajajaj', 16),
(240, '0000-00-00 00:00:00', 1, 'noobe', 16),
(241, '0000-00-00 00:00:00', 16, 'avoj', 1),
(242, '0000-00-00 00:00:00', 1, ':)', 16),
(243, '0000-00-00 00:00:00', 16, 'tonjsem ja ', 1),
(244, '0000-00-00 00:00:00', 1, '😍😍', 16),
(245, '0000-00-00 00:00:00', 16, '🥺🥺🥺🥺🥺', 1),
(246, '0000-00-00 00:00:00', 1, '🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺🥺', 16),
(247, '0000-00-00 00:00:00', 1, 'ahoj', 11),
(248, '0000-00-00 00:00:00', 1, 'jak je?', 11),
(249, '0000-00-00 00:00:00', 11, 'Dneska bomba⚽️', 1);

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
  `friends_id` text COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Vypisuji data pro tabulku `users`
--

INSERT INTO `users` (`id`, `password`, `email`, `username`, `number`, `birth`, `friends_id`) VALUES
(1, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaport@seznam.cz', 'admin', 601543636, '2003-04-10', ''),
(8, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'hrouzek@noob123.com', 'hrouzek', 601543636, '2021-11-27', ''),
(9, '3fca867ff2af052b4ce704b3c022b286a2427ec466499a34231c42393e9ca5d4', 'annaportova07@gmail.com', 'Andulilinka', 606071697, '2021-11-17', ''),
(10, '01cfc1a0bc86dad5a725d776ff1864d1afd748dd932fc86e5406680da66bd147', 'portova.hana@seznam.cz', 'Haminka', 607123687, '1974-02-24', ''),
(11, 'd099cf21d256abaa7bae2330dca322b6eb79274b2191249168215be6150ab05b', 'janport@centrum.cz', 'Klayman', 724143676, '1972-09-15', ''),
(12, 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'pepega@gmail.com', 'honzik', 123, '2021-11-23', ''),
(15, '6893a9af7ef872feeea9364307ce13bdc05e251d98cd18a6f1bce8f3dfbeb5c8', 'honzaMASIOFMmlkmff', 'honza', 23442, '0004-03-31', ''),
(16, 'd97d87d4da285adebd7f7b322eaf12930392eb65e51c1062de307ecb6552bab2', 'jana.placha123@seznam.cz', 'tojsemjazabijak', 739716379, '1998-04-10', '');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`) USING BTREE,
  ADD KEY `reciever_id` (`reciever_id`);

--
-- Indexy pro tabulku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT pro tabulku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`reciever_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
