-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 18, 2019 at 10:37 AM
-- Server version: 5.6.41-84.1
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `heroku_f7d976e838c50a0`
--

-- --------------------------------------------------------

--
-- Table structure for table `todo`
--

CREATE TABLE `todo` (
  `todo_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `done` tinyint(4) NOT NULL DEFAULT '0',
  `created` datetime(6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `todo`
--

INSERT INTO `todo` (`todo_id`, `name`, `user_id`, `done`, `created`) VALUES
(119, 'go to the gym', 10, 0, '2018-05-03 15:29:14.000000'),
(155, 'Do some work', 10, 0, '2018-10-19 21:52:48.000000'),
(117, 'Go to the store', 10, 0, '2018-05-03 15:28:59.000000'),
(146, 'go to bed now', 9, 0, '2018-05-13 03:29:39.000000'),
(147, 'Do laundry', 10, 1, '2018-06-30 15:05:09.000000'),
(118, 'mow the grass', 10, 1, '2018-05-03 15:29:07.000000'),
(148, 'Test Todo', 10, 0, '2018-07-02 17:31:08.000000'),
(150, 'Test the keyboard', 9, 0, '2018-07-06 16:13:33.000000'),
(153, 'hello', 10, 0, '2018-08-17 14:12:32.000000'),
(151, 'hello world', 10, 0, '2018-07-26 02:17:43.000000'),
(125, 'go to work', 10, 1, '2018-05-04 11:25:04.000000');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `todos_created` int(11) NOT NULL DEFAULT '0',
  `todos_completed` int(11) NOT NULL DEFAULT '0',
  `todos_deleted` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `todos_created`, `todos_completed`, `todos_deleted`, `created`, `picture`) VALUES
(9, 'Joey Leger', 'legerinvestments@gmail.com', 104, 45, 101, '2018-04-28 18:47:39', 'public/uploads/46b3931b9959c927df4fc65fdee94b07.jpg'),
(10, 'Doc Brown', 'demo@joeyui.com', 18, 10, 9, '2018-05-02 08:30:21', 'public/uploads/fa20cc5589628ee5803c118a409e7f66.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`todo_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `name` (`name`),
  ADD KEY `email_2` (`email`),
  ADD KEY `email_3` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `todo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
