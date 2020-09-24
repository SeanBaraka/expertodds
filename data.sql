-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: expertodds
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `finished_matches`
--

DROP TABLE IF EXISTS `finished_matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `finished_matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `tip_id` int DEFAULT NULL,
  `score` varchar(255) NOT NULL,
  `isWon` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_d2affab78d4a67e0d1407a24a7` (`tip_id`),
  CONSTRAINT `FK_d2affab78d4a67e0d1407a24a7d` FOREIGN KEY (`tip_id`) REFERENCES `tips` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finished_matches`
--

LOCK TABLES `finished_matches` WRITE;
/*!40000 ALTER TABLE `finished_matches` DISABLE KEYS */;
INSERT INTO `finished_matches` VALUES (1,'2020-09-14 10:55:39.079110','2020-09-14 10:55:39.079110',9,'0-3',1),(2,'2020-09-14 10:56:31.386842','2020-09-14 10:56:31.386842',10,'4-3',1),(3,'2020-09-15 00:31:54.503863','2020-09-15 00:31:54.503863',19,'3-1',1),(4,'2020-09-15 00:39:48.768562','2020-09-15 00:39:48.768562',12,'1-0',1),(5,'2020-09-15 00:40:16.369091','2020-09-15 00:40:16.369091',11,'1-0',0),(6,'2020-09-15 00:40:43.369987','2020-09-15 00:40:43.369987',17,'2-1',1),(7,'2020-09-15 00:41:54.212174','2020-09-15 00:41:54.212174',14,'2-3',1);
/*!40000 ALTER TABLE `finished_matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logins`
--

DROP TABLE IF EXISTS `logins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `logins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `email` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isStaff` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logins`
--

LOCK TABLES `logins` WRITE;
/*!40000 ALTER TABLE `logins` DISABLE KEYS */;
INSERT INTO `logins` VALUES (1,'2020-09-03 01:43:21.420405','2020-09-03 01:43:21.420405','admin@expertodds.co.ke','c1201cc8c089e0e6df7579aeed5e3441','7556928a6a721d22ec5d27728441d7ec674866e0e2835be5bf6874fcfafd94c32e32f00c4f930b89aa8e7ee8b276b04c1e759b983bbfc43a044c376609f716f3',1);
/*!40000 ALTER TABLE `logins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `isVip` tinyint NOT NULL DEFAULT '0',
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_839756572a2c38eb5a3b563126` (`userId`),
  CONSTRAINT `FK_839756572a2c38eb5a3b563126e` FOREIGN KEY (`userId`) REFERENCES `logins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,'2020-09-03 01:43:21.427189','2020-09-03 01:43:21.427189','Admin','admin@expertodds.co.ke','+254708990011',0,1);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `tips` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `tournament` varchar(255) NOT NULL,
  `home` varchar(255) NOT NULL,
  `away` varchar(255) NOT NULL,
  `prediction` varchar(255) NOT NULL,
  `isVip` tinyint NOT NULL DEFAULT '0',
  `isFeatured` tinyint NOT NULL DEFAULT '0',
  `matchDate` varchar(255) NOT NULL,
  `homeOdds` varchar(255) NOT NULL,
  `awayOdds` varchar(255) NOT NULL,
  `drawOdds` varchar(255) NOT NULL,
  `predictionOdds` varchar(255) NOT NULL,
  `isComplete` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tips`
--

LOCK TABLES `tips` WRITE;
/*!40000 ALTER TABLE `tips` DISABLE KEYS */;
INSERT INTO `tips` VALUES (9,'2020-09-13 15:02:02.763968','2020-09-15 00:28:03.000000','English premier league','Fulham','Arsenal','over 2.5',0,1,'2020-09-12T14:30','6.45','1.20','3.45','2.54',1),(10,'2020-09-13 15:02:59.533496','2020-09-15 00:28:03.000000','English premier league','Liverpool','Leeds United','Home win',0,0,'2020-09-12T17:02','1.23','5.45','3.45','1.23',1),(11,'2020-09-13 15:04:00.931259','2020-09-15 00:46:45.000000','English premier league','Westham United','Newcastle United','Draw',0,0,'2020-09-12T19:00','1.65','1.78','2.54','2.54',1),(12,'2020-09-13 15:14:29.104014','2020-09-15 00:44:31.000000','Club Friendlies','Eupen','Gent','Home win',1,0,'2020-09-13T15:13','1.34','1.24','3.24','1.34',1),(13,'2020-09-13 15:16:05.376555','2020-09-13 15:16:05.376555','Championship','Westbrom albion','Middlesbrough','Draw',1,0,'2020-09-11T15:15','1.34','2.34','2.56','2.56',0),(14,'2020-09-13 15:16:56.619686','2020-09-15 00:44:31.000000','French League 1','Bordeux','Lyon','Over 3.5',1,0,'2020-09-12T15:16','3.54','1.76','2.56','3.54',1),(15,'2020-09-14 14:54:12.010855','2020-09-14 14:54:12.010855','English premier league','Sheffield United','Wolverhampton','Away win',0,1,'2020-09-14T22:00','3.30','2.45','2.86','2.45',0),(16,'2020-09-14 14:59:43.021092','2020-09-14 14:59:43.021092','English premier league','Brighton','Chelsea','Away win',0,0,'2020-09-14T22:15','5.35','1.58','4.14','1.58',0),(17,'2020-09-14 15:03:20.419141','2020-09-15 00:44:31.000000','Belgium Jupiler League','Beerschot','Genk','Over 2.5',1,0,'2020-09-14T21:45','3.60','2.05','3.45','2.56',1),(18,'2020-09-14 15:05:28.518766','2020-09-14 15:05:28.518766','Turkey Super League','Hatayspor','Istanbul Basaksehir','Over 2.5',1,0,'2020-09-14T22:00','5.00','1.50','3.66','2.45',0),(19,'2020-09-14 23:50:41.609749','2020-09-15 00:36:53.000000','Russia Premier League','Zenit St. Pertersberg','Arsenal Tula','Over 2.5',0,0,'2020-09-14T19:00','1.24','3.56','2.56','2.12',1),(20,'2020-09-15 00:49:30.040188','2020-09-15 00:49:30.040188','English premier league','Fulham','Arsenal','Away win',0,0,'2020-09-12T14:30','4.67','1.20','3.24','1.20',0);
/*!40000 ALTER TABLE `tips` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-15  1:32:36
