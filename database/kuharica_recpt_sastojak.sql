-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: kuharica
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `recpt_sastojak`
--

DROP TABLE IF EXISTS `recpt_sastojak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recpt_sastojak` (
  `recept_id` int NOT NULL,
  `sastojak_id` int NOT NULL,
  `kolicina` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`recept_id`,`sastojak_id`),
  KEY `sastojak_id` (`sastojak_id`),
  CONSTRAINT `recpt_sastojak_ibfk_1` FOREIGN KEY (`recept_id`) REFERENCES `recept` (`id`),
  CONSTRAINT `recpt_sastojak_ibfk_2` FOREIGN KEY (`sastojak_id`) REFERENCES `sastojak` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recpt_sastojak`
--

LOCK TABLES `recpt_sastojak` WRITE;
/*!40000 ALTER TABLE `recpt_sastojak` DISABLE KEYS */;
INSERT INTO `recpt_sastojak` VALUES (1,1,'1 šalica'),(1,2,'1 šalica'),(1,3,'1 žlica'),(1,9,'1 šalica'),(1,10,'1'),(2,2,'1 glavica poveća'),(2,3,'2 žlice'),(2,5,'1 žličica'),(2,6,'1 žličica'),(2,8,'1 češanj'),(3,4,'200g'),(3,5,'po ukusu'),(3,6,'po ukusu'),(3,7,'1'),(3,8,'2 češnja'),(4,12,'1 šalica'),(4,14,'3'),(4,15,'4 šalice'),(18,1,'2 rajčice'),(18,3,'1 žlica'),(18,642,'4 kriške'),(19,643,'50g'),(19,655,'1 tikvica'),(20,8,'2 češnja'),(20,643,'100g'),(21,643,'50g'),(21,654,'100g'),(22,644,'2 žlice jogurta'),(22,651,'1 konzerva'),(23,644,'1 šalica jogurta'),(23,664,'1 banana'),(23,665,'100g'),(24,654,'1 šalica špinata'),(24,664,'1 banana'),(25,12,'2 žlice šećera'),(25,14,'2 limuna'),(25,15,'500ml vode'),(26,644,'1 šalica jogurta'),(26,662,'100g ananasa'),(27,9,'2 šalice mlijeka'),(27,671,'100g čokolade'),(28,10,'2 jaja'),(28,11,'1 šalica brašna'),(28,671,'50g čokolade'),(29,662,'1 šalica ananasa'),(29,663,'1 jabuka'),(29,665,'1 šalica jagoda'),(30,11,'2 šalice brašna'),(30,666,'100g borovnica'),(31,11,'2 šalice brašna'),(31,667,'100g oraha'),(32,9,'1 šalica mlijeka'),(32,12,'100g šećera'),(33,4,'300g piletine'),(33,9,'1 šalica mlijeka'),(34,638,'100g mrkve'),(34,647,'100g brokule'),(34,649,'200g riže'),(35,650,'200g tjestenine'),(35,651,'1 konzerva tune'),(36,3,'2 žlice maslinovog ulja'),(36,653,'1 riba'),(37,4,'300g govedine'),(37,7,'1 luk'),(38,1,'2 rajčice'),(38,3,'1 žlica maslinovog ulja'),(39,1,'1 rajčica'),(39,643,'50g sira'),(39,661,'1 krastavac'),(40,2,'1 glavica salate'),(40,667,'50g oraha'),(41,2,'1 glavica salate'),(41,651,'1 konzerva tune'),(41,657,'100g kukuruza'),(42,2,'1 glavica salate'),(42,4,'100g piletine'),(43,4,'300g piletine'),(43,637,'2 krumpira'),(43,638,'2 mrkve'),(44,9,'1 šalica mlijeka'),(44,681,'500g tikve'),(45,4,'300g govedine'),(45,7,'1 luk'),(46,9,'1 šalica mlijeka'),(46,647,'200g brokule'),(47,1,'5 rajčica'),(47,8,'2 češnja češnjaka');
/*!40000 ALTER TABLE `recpt_sastojak` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-29 17:05:26
