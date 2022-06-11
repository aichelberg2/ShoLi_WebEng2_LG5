-- MariaDB dump 10.19  Distrib 10.5.15-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: sholi
-- ------------------------------------------------------
-- Server version	10.5.15-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `list` (
  `list_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `shared` tinyint(1) NOT NULL DEFAULT 0,
  `creator` varchar(30) NOT NULL,
  PRIMARY KEY (`list_id`),
  KEY `creator` (`creator`),
  CONSTRAINT `list_ibfk_2` FOREIGN KEY (`creator`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (26,'Weihnachten',0,'chris'),(27,'Sommer',0,'chris'),(28,'Urlaub',0,'chris'),(33,'jkgsdcuzwd',0,'lucario1234'),(35,'Test',0,'lucario1234'),(38,'familie',1,'chris'),(39,'dddd',0,'lucario1234'),(40,'Testlol',1,'lucario1234'),(41,'ddd',1,'lucario1234');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `listproduct`
--

DROP TABLE IF EXISTS `listproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listproduct` (
  `pr_id` int(10) NOT NULL,
  `list_id` int(10) NOT NULL,
  `ticked` tinyint(4) NOT NULL DEFAULT 0,
  `edited_price` double NOT NULL,
  KEY `pr_id` (`pr_id`),
  KEY `listproduct_ibfk_2` (`list_id`),
  CONSTRAINT `listproduct_ibfk_1` FOREIGN KEY (`pr_id`) REFERENCES `product` (`pr_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `listproduct_ibfk_2` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listproduct`
--

LOCK TABLES `listproduct` WRITE;
/*!40000 ALTER TABLE `listproduct` DISABLE KEYS */;
INSERT INTO `listproduct` VALUES (16,26,0,1.34),(20,26,0,0.99),(34,26,0,0.78),(35,26,0,0.32),(35,38,0,0.32),(34,38,0,0.78),(20,40,1,0.99),(34,40,0,0.78);
/*!40000 ALTER TABLE `listproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `pr_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `Category` varchar(30) NOT NULL,
  PRIMARY KEY (`pr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (16,'Erdbeeren',3.99,'Fruits & Vegetables'),(17,'Tiefkühlpizza Salami',2.69,'Deep freeze'),(18,'Joghurt',0.99,'Freshness and cooling'),(19,'Milch',1.29,'Freshness and cooling'),(20,'Salat',0.99,'Fruits & Vegetables'),(21,'Reis',1.29,'Food'),(22,'Chips',1.29,'Sweet & Salty'),(23,'Flips',0.99,'Sweet & Salty'),(24,'Kamillentee',2.99,'Coffee, Tea & Cocoa'),(25,'Cola',1.29,'Beverages'),(26,'Fanta',1.29,'Beverages'),(27,'Wodka',8.99,'Wine, spirits & luxury food'),(28,'Kaviar',11.99,'Wine, spirits & luxury food'),(29,'Deo',2.69,'Drugstore & Cosmetics'),(30,'Abdeckstift',0.99,'Drugstore & Cosmetics'),(31,'Babypuder',2.99,'Baby & Child'),(32,'Spülmittel',1.99,'Kitchen & Household'),(33,'Katzenfutter',0.39,'Pet Supplies'),(34,'Bananen',0.78,'Fruits & Vegetables'),(35,'Kiwi',0.32,'Fruits & Vegetables'),(36,'Blumenkohl',0.78,'Fruits & Vegetables'),(37,'Kokosnuss',1.29,'Fruits & Vegetables');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `logged_in` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('chris','Chris','Markov','chris1@gmail.com','$2y$10$Zm5vi0a354.8btbDm7KGReNvSA/dR.ATn0ONJYSmtfEjcZvX.zKqq',1),('elli','Elli','Gott','elli@elli.com','$2y$10$hIupFDgJ1rD64.o2dH0jue.K8mhlQHKVxsy.dmxOYOwZpKRLv0Jaa',1),('Jefi','Jewgeni','Schnaper','jewgeni_schnaper@online.de','$2y$10$w8S5VScU5kJ9qITNG705auxucR8XHpzc2WWcEy5/xga0az5w2u8uu',1),('KindOfGod','Alexander','Toll','alex@alex.com','$2y$10$Wws7aYyCdi6VNyluulvfp.ZZMn/CYUpLg4IJ7.mgdVR6nUQayjpSK',0),('l3roit','Jonas','Schere','jonas@jonas.com','$2y$10$5auLJw3lFBszOQI2y3lcE.E.E/JV9ympyDaeCO.Jl.Zl1ef2IV2Rq',0),('lucario','Th','Hh','gt','$2y$10$WshkWK5Tqs8SqwV6dwff/OS.0Yo5I7oRM.5FlvX/uEZJxj0dFYR9O',0),('lucario1234','Lucas','Müller','lucas@lucas.gmail.com','$2y$10$tqNV93.hyusRE0yW7hrQA.queVtwE9psnO9CLUgkb7CG2mhweWIXu',1),('tomisboy','Thomas','Albert','thomas@thomas.com','$2y$10$1kYeATqSGPhmzdlfUpHce.rwzMuN.9WYju6G8dvbM20mzUhphVC/W',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userlist`
--

DROP TABLE IF EXISTS `userlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userlist` (
  `user` varchar(30) NOT NULL,
  `list_id` int(10) NOT NULL,
  KEY `userlist_ibfk_1` (`list_id`),
  KEY `userlist_ibfk_2` (`user`),
  CONSTRAINT `userlist_ibfk_1` FOREIGN KEY (`list_id`) REFERENCES `list` (`list_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userlist_ibfk_2` FOREIGN KEY (`user`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userlist`
--

LOCK TABLES `userlist` WRITE;
/*!40000 ALTER TABLE `userlist` DISABLE KEYS */;
INSERT INTO `userlist` VALUES ('chris',26),('chris',27),('chris',28),('lucario1234',33),('lucario1234',35),('chris',38),('chris',38),('elli',38),('Jefi',38),('KindOfGod',38),('l3roit',38),('lucario',38),('lucario1234',38),('tomisboy',38),('lucario1234',39),('lucario1234',40),('chris',40),('lucario1234',41),('KindOfGod',41);
/*!40000 ALTER TABLE `userlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-11  0:00:01
