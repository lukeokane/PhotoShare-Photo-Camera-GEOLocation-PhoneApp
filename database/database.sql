-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 24, 2017 at 12:08 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `albumID` int(3) NOT NULL,
  `userID` int(30) NOT NULL,
  `albumName` varchar(30) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`albumID`, `userID`, `albumName`) VALUES
(12, 36, 'Family'),
(33, 0, 'Like '),
(11, 36, 'Holidays'),
(34, 36, 'Album a'),
(1, 1, 'DEFAULT'),
(31, 42, 'Luke\'s album');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `imageID` int(11) NOT NULL,
  `userID` int(30) NOT NULL,
  `albumID` int(11) NOT NULL,
  `imageFileName` varchar(30) NOT NULL,
  `imageDesc` varchar(100) NOT NULL,
  `dateTaken` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateUploaded` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `GEOLong` double NOT NULL,
  `GEOLat` double NOT NULL,
  `GEOAddress` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `joinDate` date NOT NULL,
  `imageName` varchar(50) NOT NULL,
  `u_permission` int(6) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `username`, `email`, `joinDate`, `imageName`, `u_permission`) VALUES
(1, 'DEFAULT', 'DEFAULT@PHOTOSHARE.COM', '0000-00-00', 'NONE', 0),
(36, 'Martin Malinowski', 'user@user.com', '2017-04-14', 'http://graph.facebook.com/181730192341361/picture?', 1337),
(41, 'null', 'user@user.com', '2017-04-15', 'null', 0),
(42, 'Luke O\'Kane', 'user@user.com', '2017-04-16', 'http://graph.facebook.com/1451612458194938/picture', 1337),
(43, 'Patryk Malina', 'user@user.com', '2017-04-17', 'http://graph.facebook.com/1331369406955768/picture', 0);

-- 
--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `user_images_fk` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
