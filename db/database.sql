-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 29, 2021 at 02:37 AM
-- Server version: 5.7.24
-- PHP Version: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatsva_md_beta`
--

-- --------------------------------------------------------

--
-- Table structure for table `instance`
--

CREATE TABLE `instance` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `multidevice` int(11) NOT NULL DEFAULT '0',
  `instance_key` varchar(50) NOT NULL,
  `apiKey` varchar(50) NOT NULL,
  `instance_status` varchar(50) NOT NULL,
  `qrCode` text,
  `data` text,
  `status` int(11) NOT NULL,
  `domain` varchar(200) DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `instance`
--

INSERT INTO `instance` (`id`, `name`, `multidevice`, `instance_key`, `apiKey`, `instance_status`, `qrCode`, `data`, `status`, `domain`) VALUES
(1, 'demo5@gmail.com_Device A', 1, 'NzlrOOrrBX4E', 'xxsbsd2mu4i1', 'disconnected', '2@ta+BIJeEeJhlCJBk31ZSW8a23Z1vCzjVrVwwk6w/sStpa7DIGe+2Co9CzJrLeUJN7uqexA+6pUtZVg==,wAqV2ioMm3tltnwwlFWilOIhuFVS66TN9lN5k+MdHXM=,xuBuVnD3L58d2yrPfspDMxNjmUPECK3re+Cgf1xPZho=,v3bTdEmmaaJkAZ5zA1Gv52GIPmLH/WNMngQWabms0yQ=', '', 1, 'http://localhost:8081'),
(2, 'demo5@gmail.com_Device B', 0, 'GiDcaiqI9Hpx', 'xxsbsd2mu4i1', 'disconnected', '1@UHWRJdoGkRkvN3ZhIQLAbSIgnkht2YMjLOwhMrp0SWIEF3OGKwYZB4jGfCE0Zcv3sPap+YvychdEvA==,qXvrzjDDhoKHRN/qDHfd03vUwoibv2k5si1X12+CI18=,P9QYWY4bmwtS8Te46AKyHA==', '', 1, 'http://localhost:8081'),
(3, 'demo5@gmail.com_bro', 1, 'sSCH8ndvBVlu', 'xxsbsd2mu4i1', 'connected', '2@uS2O6DA1pk63BXrX/w1v8gF15Ij7rCjahJMa5oM1kJqA7Tag0PTuME5vMNS8cTNVXk1EaA51BwUcKA==,+rXxWMIO9CgZNmh8ipl6AJry3PJD8eYAeOcNRcCyO0w=,Hf5zztVEvnKie+odENTVAF5/rkCo7I2BpcSt0zZQ9jw=,mq3UzkBRZSdZmPqCg7uedNKVH+7hP2bms1hRFBF1szs=', '', 1, 'http://localhost:8081'),
(4, 'demo5@gmail.com_device barug', 0, '9XzFMzztr63a', 'xxsbsd2mu4i1', 'disconnected', '2@AddGTk9o+foe5Hlvuah91B9wDTvHatzBbcgDzrxVgOLFYdCACWGHEodPOykQIc9K6yztobOUmAXf+w==,dwS1Pc67qrM0U/SIbUMPTzHHY+TKQwg77wjAl9mfgFo=,sfe2hkxnffc9LJwOWrLbssteMDnDU0XO9jnQtW4Eim8=,8cP2v8MRgF7dRQB+6AAP6681u/DnydKxEy/O9U2Wun8=', '', 1, 'http://localhost:8081');

-- --------------------------------------------------------

--
-- Table structure for table `tb_group`
--

CREATE TABLE `tb_group` (
  `id` int(11) NOT NULL,
  `instance_key` varchar(100) NOT NULL,
  `jid_phone` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `jid_group` varchar(100) NOT NULL,
  `creation` varchar(100) NOT NULL,
  `creator` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `descriptionId` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_group`
--

INSERT INTO `tb_group` (`id`, `instance_key`, `jid_phone`, `name`, `jid_group`, `creation`, `creator`, `description`, `descriptionId`) VALUES
(1, 'wz2doyCmdfod', '6285156345912', 'Group Testing2', '62895361034833-1631937250@g.us', '1631937250', '62895361034833@s.whatsapp.net', 'group hello', '3EB0B6F71417A3B484A4'),
(2, 'wz2doyCmdfod', '6285156345912', 'Group Testing2', '62895361034833-1631937250@g.us', '1631937250', '62895361034833@s.whatsapp.net', 'group hello', '3EB0B6F71417A3B484A4'),
(3, 'wz2doyCmdfod', '6285156345912', 'Group Testing', '120363038228291194@g.us', '1638247569', '6285156345912@s.whatsapp.net', 'null', 'null'),
(4, 'wz2doyCmdfod', '6285156345912', 'Group Testing', '120363038228291194@g.us', '1638247569', '6285156345912@s.whatsapp.net', 'null', 'null'),
(5, 'wz2doyCmdfod', '6285156345912', 'Group Testing', '120363022785177021@g.us', '1638247965', '6285156345912@s.whatsapp.net', 'null', 'null'),
(6, 'wz2doyCmdfod', '6285156345912', 'Group Testing', '120363022785177021@g.us', '1638247965', '6285156345912@s.whatsapp.net', 'null', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `apiKey` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `apiKey`, `status`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 'xxsbsd2mu4i1', 1),
(2, 'mzayn', '9ba03b9ff24112e9590efcbd79154d34', 'xxkjw09ddsdl', 1),
(3, 'dnymobile.com', '13d715c5c3abc56f6cc4db1c5f9b02e3', 'vvs0073bgskk', 1),
(4, 'indrapurwa', 'adb5bea40c7eee08140ec7e225c9d442', 'vvsi073indpwa', 1);

-- --------------------------------------------------------

--
-- Table structure for table `webhook`
--

CREATE TABLE `webhook` (
  `id` int(11) NOT NULL,
  `instance_key` varchar(20) DEFAULT NULL,
  `webhook_url` varchar(400) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `webhook`
--

INSERT INTO `webhook` (`id`, `instance_key`, `webhook_url`, `status`) VALUES
(1, '9', 'http://localhost:8080/webhook', 1),
(3, '9', 'http://localhost:8080/webhook', 1),
(4, 'P8dGoaObLa7O', 'https://webhook.site/3e118197-5472-4f71-be35-954ee5506f78', 0),
(5, 'P8dGoaObLa7O', 'https://webhook.site/3e118197-5472-4f71-be35-954ee5506f781', 1),
(6, 'sNmRMeBHOSFk', 'https://webhook.site/3e118197-5472-4f71-be35-954ee5506f78', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `instance`
--
ALTER TABLE `instance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_group`
--
ALTER TABLE `tb_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `webhook`
--
ALTER TABLE `webhook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `instance`
--
ALTER TABLE `instance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_group`
--
ALTER TABLE `tb_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `webhook`
--
ALTER TABLE `webhook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
