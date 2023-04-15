-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2023 at 02:42 PM
-- Server version: 10.3.38-MariaDB-cll-lve
-- PHP Version: 8.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boldz2001_event`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `email`, `address`, `phone_number`, `sex`, `password`, `createAt`, `updateAt`, `roleId`) VALUES
(1, 'NTT', 'nguyenthanhtung111xxx@gmail.com', 'Tam Tien Nui Thanh Quang Nam', '0866037302', 'male', '$2b$10$kBT/.Sa1u/esvcVVf8Kbk.sDVrLukf4W/Op381RvSsjd.s7DqN5Sy', '2023-04-11 13:25:45.110000', '2023-04-11 13:25:45.110000', 2),
(2, 'Duy', 'nguyenthanhtusng111xxx@gmail.com', 'Tam Tien Nui Thanh Quang Nam', '0866037302', 'male', '$2b$10$zKXCzGI8Hs9RinmxgJpope2T.w/UDaCqfqCVI/HIqSyYC3Bpoqfie', '2023-04-11 21:39:38.625426', '2023-04-13 08:59:06.183050', 2);

-- --------------------------------------------------------

--
-- Table structure for table `event_register`
--

CREATE TABLE `event_register` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `postId` int(11) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event_register`
--

INSERT INTO `event_register` (`id`, `status`, `createAt`, `updateAt`, `postId`, `accountId`) VALUES
(1, 1, '2023-04-11 21:41:19.736562', '2023-04-11 22:22:25.000000', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `postId` int(11) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `image_url`, `createAt`, `updateAt`, `postId`, `accountId`) VALUES
(1, 'C:/Users/civi_/Downloads/g4.jpg', '2023-04-11 13:25:45.127532', '2023-04-11 13:25:45.127532', NULL, 1),
(2, 'C:/Users/civi_/Downloads/g4.jpg', '2023-04-11 21:39:38.638734', '2023-04-11 21:39:38.638734', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1681194204941, 'createTable1681194204941');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slot` int(11) NOT NULL,
  `startDay` varchar(255) NOT NULL,
  `startTime` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `content`, `title`, `slot`, `startDay`, `startTime`, `createAt`, `updateAt`, `accountId`) VALUES
(1, 'hehe', 'hehe', 100, '2023-4-11', '', '2023-04-11 21:40:04.364085', '2023-04-11 22:02:35.360369', 1),
(2, 'hehe', 'hehe', 100, '2023-4-11', '', '2023-04-11 21:40:55.405031', '2023-04-11 22:02:39.364061', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qr`
--

CREATE TABLE `qr` (
  `id` int(11) NOT NULL,
  `qr_link` text NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `accountId` int(11) DEFAULT NULL,
  `eventsId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qr`
--

INSERT INTO `qr` (`id`, `qr_link`, `createAt`, `updateAt`, `accountId`, `eventsId`) VALUES
(1, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATtSURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1LzBJA31NwAmdTcAJnU3AD5TWreOKladFK16KRq0SfL1GwCcgNkk5oJyBNAngAyqblRswnIppOqRSdVi06qFn3yZUCeUPOEmgnIpGYCMqmZgNyomYBMaiYgk5oJyBtAnlDzTSdVi06qFp1ULfrkH6Pmm4BMat5Q8y85qVp0UrXopGrRJ385IDdqJjU3aiYgk5o3gExq/iUnVYtOqhadVC365MvUfJOaCcgNkCfUPAHkCSCTmifU/ElOqhadVC06qVr0yTIgvwnIpGYCMqmZgExqJiCTmgnIpGYCMqmZgDwB5E92UrXopGrRSdUi/JF/CJBJzQTkDTUTkCfU/MtOqhadVC06qVqEP/ICkEnNBGRSMwGZ1ExAJjW/CciNmgnIjZpNQCY1N0AmNZtOqhadVC06qVr0yTIgk5ongExqJiCb1GxS8wSQSc0EZFIzqZmATGomNROQSc0bJ1WLTqoWnVQtwh95Acik5g0gN2pugGxS8wSQSc0NkDfU3AB5Qs0bJ1WLTqoWnVQt+uQlNTdAnlBzA+RGzQ2QGzU3QCY1N0AmNU+omYA8oWYCMqnZdFK16KRq0UnVok9+mZongNyomYA8oeYJNROQJ4A8AeQJIJOaGyCTmjdOqhadVC06qVr0yUtAJjVvAJnUTEAmIJOaJ4DcqJmAvKHmBsiNmjfUTEA2nVQtOqladFK16JNfBmRSM6mZgLwBZFJzo2YC8oSaCcgbam6APAHkm06qFp1ULTqpWvTJMiCTmieATGpugDwBZFIzAblRMwGZgNwAuVEzAblRMwF5Qs2mk6pFJ1WLTqoWfbJMzQRkUvMEkCeA3Ki5UTMBmYBMaiYgN2pugPwmIJOaN06qFp1ULTqpWvTJS2pu1LyhZgJyo+YJIJOaN9Q8AeQJNU8AmdRMQDadVC06qVp0UrXok5eATGomIG8AmdRMQDYBmdQ8AWRS84aaCciNmhsg33RSteikatFJ1aJPXlIzAZnU3AC5UTMBmdRMQG7U3Ki5ATKpuQHyBpAbNROQSc2Nmk0nVYtOqhadVC3CH3kByKTmBsik5gbIjZoJyBNq3gDyhJoJyCY1/6eTqkUnVYtOqhZ98pKaJ9Q8oeYGyI2aJ4BMaiYg36TmCSA3QJ5Q88ZJ1aKTqkUnVYs+eQnIb1IzqbkBcqNmUjMBeULNBGQC8gSQSc0NkEnNBOSbTqoWnVQtOqla9MkyNZuAvKFmAjIBeULNBGQCcqNmAnKj5pvUbDqpWnRSteikatEnXwbkCTVPAJnUTEBu1NwAmYBMam6APAHkDTX/p5OqRSdVi06qFn3yl1MzAXkCyKRmk5oJyKTmCSBPAJnUfNNJ1aKTqkUnVYs++csBuVEzAXlCzRNAJjU3QCY1bwCZ1NwAmdS8cVK16KRq0UnVok++TM03qZmATEAmNU8AuVEzqfkmNROQSc0NkEnNppOqRSdVi06qFn2yDMhvAnKjZpOaCcik5g0gN2o2AZnUvHFSteikatFJ1SL8kaolJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aL/AAbHQVKohLrXAAAAAElFTkSuQmCC', '2023-04-11 21:41:19.812132', '2023-04-11 21:41:19.812132', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `quiz` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `businessId` int(11) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reset_password`
--

CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reset_password`
--

INSERT INTO `reset_password` (`id`, `secret`, `createAt`, `updateAt`, `accountId`) VALUES
(5, '$2b$04$F4iPbReicrR/NiKecSEf2eK9zYl4Zl.Xu5qYX6wXz.T.CJgWN2xQK', '2023-04-11 13:51:01.099279', '2023-04-11 13:51:01.099279', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `createAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`, `createAt`, `updateAt`) VALUES
(1, 'ADMIN', '2023-04-11 13:25:07.000140', '2023-04-11 13:25:07.000140'),
(2, 'BUSINESS', '2023-04-11 13:25:07.001200', '2023-04-11 13:25:07.001200'),
(3, 'CUSTOMER', '2023-04-11 13:25:07.002052', '2023-04-11 13:25:07.002052');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_77bf26eef8865441fb9bd53a364` (`roleId`);

--
-- Indexes for table `event_register`
--
ALTER TABLE `event_register`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d7e312ac1bdbcf2090e652d4a30` (`postId`),
  ADD KEY `FK_5b07eff141f7bcf021c148996bc` (`accountId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_72da7f42d43f0be3b3ef35692a0` (`postId`),
  ADD KEY `FK_a545efe23a364937bf87df57539` (`accountId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f219a87fd8c020d3bb6527c9420` (`accountId`);

--
-- Indexes for table `qr`
--
ALTER TABLE `qr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_610f47a6b60230829a2ae18e077` (`accountId`),
  ADD KEY `FK_ad06ef1af79a5344c6797a9259a` (`eventsId`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ecf6ff25c3568e3af7160a8fc91` (`businessId`),
  ADD KEY `FK_854e835530570a2eb36f405f06f` (`accountId`);

--
-- Indexes for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_412dd5a7159457207cdacff03b` (`accountId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event_register`
--
ALTER TABLE `event_register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qr`
--
ALTER TABLE `qr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `FK_77bf26eef8865441fb9bd53a364` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_register`
--
ALTER TABLE `event_register`
  ADD CONSTRAINT `FK_5b07eff141f7bcf021c148996bc` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_d7e312ac1bdbcf2090e652d4a30` FOREIGN KEY (`postId`) REFERENCES `post` (`id`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK_72da7f42d43f0be3b3ef35692a0` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_a545efe23a364937bf87df57539` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_f219a87fd8c020d3bb6527c9420` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `qr`
--
ALTER TABLE `qr`
  ADD CONSTRAINT `FK_610f47a6b60230829a2ae18e077` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ad06ef1af79a5344c6797a9259a` FOREIGN KEY (`eventsId`) REFERENCES `event_register` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `FK_854e835530570a2eb36f405f06f` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `FK_ecf6ff25c3568e3af7160a8fc91` FOREIGN KEY (`businessId`) REFERENCES `account` (`id`);

--
-- Constraints for table `reset_password`
--
ALTER TABLE `reset_password`
  ADD CONSTRAINT `FK_412dd5a7159457207cdacff03ba` FOREIGN KEY (`accountId`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
