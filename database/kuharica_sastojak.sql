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
-- Table structure for table `sastojak`
--

DROP TABLE IF EXISTS `sastojak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sastojak` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ime` (`ime`)
) ENGINE=InnoDB AUTO_INCREMENT=692 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sastojak`
--

LOCK TABLES `sastojak` WRITE;
/*!40000 ALTER TABLE `sastojak` DISABLE KEYS */;
INSERT INTO `sastojak` VALUES (662,'Ananas'),(668,'Badem'),(653,'Bakalar'),(664,'Banana'),(666,'Borovnica'),(684,'Bosiljak'),(11,'Brašno'),(647,'Brokula'),(680,'Bundeva'),(639,'Celer'),(8,'Češnjak'),(677,'Chia sjemenke'),(660,'Chili paprika'),(673,'Cimet'),(671,'Čokolada'),(659,'Crvena paprika'),(648,'Cvjetača'),(683,'Đumbir'),(658,'Grašak'),(663,'Jabuka'),(665,'Jagoda'),(10,'Jaja'),(644,'Jogurt'),(675,'Kikiriki'),(674,'Kokos'),(661,'Krastavac'),(642,'Kruh'),(637,'Krumpir'),(657,'Kukuruz'),(682,'Kurkuma'),(641,'Kvasac'),(678,'Lanene sjemenke'),(14,'Limun'),(669,'Lješnjak'),(688,'Lovorov list'),(7,'Luk'),(686,'Majčina dušica'),(13,'Maslac'),(3,'Maslinovo ulje'),(670,'Med'),(9,'Mlijeko'),(638,'Mrkva'),(667,'Orah'),(685,'Origano'),(6,'Papar'),(656,'Patlidžan'),(640,'Peršin'),(4,'Piletina'),(1,'Rajčica'),(649,'Riža'),(687,'Ružmarin'),(12,'Šećer'),(643,'Sir'),(652,'Škampi'),(645,'Slanina'),(5,'Sol'),(690,'Soya umak'),(654,'Špinat'),(679,'Suncokretove sjemenke'),(646,'Šunka'),(681,'Tikva'),(655,'Tikvica'),(650,'Tjestenina'),(651,'Tuna'),(672,'Vanilija'),(689,'Vinski ocat'),(15,'Voda'),(691,'Wasabi'),(2,'Zelena salata'),(676,'Zobene pahuljice');
/*!40000 ALTER TABLE `sastojak` ENABLE KEYS */;
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
