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
-- Table structure for table `recept`
--

DROP TABLE IF EXISTS `recept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recept` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int DEFAULT NULL,
  `kategorija_id` int DEFAULT NULL,
  `naslov` varchar(100) NOT NULL,
  `upute` text,
  `slika_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `korisnik_id` (`korisnik_id`),
  KEY `kategorija_id` (`kategorija_id`),
  CONSTRAINT `recept_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`),
  CONSTRAINT `recept_ibfk_2` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recept`
--

LOCK TABLES `recept` WRITE;
/*!40000 ALTER TABLE `recept` DISABLE KEYS */;
INSERT INTO `recept` VALUES (1,4,1,'Vegan Smoothie TEST','1. Pomiješajte voće s bademovim mlijekom. 2. Poslužite ohlađeno.',1),(2,2,4,'Caesar Salad','1. Pomiješajte zelenu salatu, krutone i parmezan. 2. Dodajte Caesar preljev i dobro promiješajte.',2),(3,3,2,'Chicken Soup','1. Kuhajte piletinu s povrćem. 2. Dodajte sol i papar po ukusu.',3),(4,1,3,'Lemonade','1. Pomiješajte limunov sok, vodu i šećer. 2. Poslužite ohlađeno.',4),(18,1,4,'Bruskete s rajčicom','Narezati rajčicu i staviti na tostirani kruh s maslinovim uljem.',6),(19,2,4,'Rolice od tikvica','Tanko narezane tikvice napuniti sirom i zarolati.',11),(20,5,4,'Punjene gljive','Gljive napuniti mješavinom sira i začina te zapeći.',23),(21,3,4,'Mini pite sa špinatom','Prhko tijesto puniti špinatom i sirom.',17),(22,4,4,'Namaz od tune','Tunu izmiješati s jogurtom i začinima.',24),(23,2,3,'Smoothie od jagoda','Izmiksati jagode, bananu i jogurt.',12),(24,1,3,'Zeleni smoothie','Izmiksati špinat, bananu i vodu.',7),(25,3,3,'Limonada','Pomiješati vodu, limunov sok i šećer.',18),(26,5,3,'Koktel od ananasa','Pomiješati ananas, jogurt i malo meda.',25),(27,4,3,'Topla čokolada','Zakuhati mlijeko i dodati čokoladu.',26),(28,1,6,'Palačinke s čokoladom','Napraviti palačinke i premazati čokoladom.',5),(29,2,6,'Voćna salata','Narezati razno voće i preliti limunovim sokom.',13),(30,5,6,'Muffini od borovnice','Pripremiti smjesu i umiješati borovnice.',27),(31,4,6,'Kolač s orasima','Tijesto zamijesiti i dodati mljevene orahe.',28),(32,3,6,'Tiramisu','Redati piškote, kremu i kavu.',19),(33,5,5,'Piletina u umaku','Piletinu pirjati u kremastom umaku.',29),(34,2,5,'Rižoto s povrćem','Pirjati rižu i povrće dok ne omekša.',16),(35,1,5,'Tjestenina s tunom','Skuhati tjesteninu i dodati tunu i začine.',8),(36,3,5,'Pečena riba','Ribu začiniti i peći u pećnici.',20),(37,4,5,'Gulaš','Kuhati meso i povrće dugo na laganoj vatri.',30),(38,1,1,'Salata od rajčice','Narezati rajčice i začiniti.',9),(39,5,1,'Grčka salata','Pomiješati rajčice, krastavce, sir i masline.',33),(40,2,1,'Zelena salata s orasima','Salatu posuti orasima i preliti maslinovim uljem.',15),(41,4,1,'Salata s tunom','Pomiješati tunu, kukuruz i zelenu salatu.',34),(42,3,1,'Cezar salata','Salatu začiniti dressingom i dodati piletinu.',21),(43,2,2,'Pileća juha','Kuhati piletinu s povrćem i začinima.',14),(44,5,2,'Juha od tikve','Pirjati tikvu i izmiksati u kremastu juhu.',31),(45,3,2,'Goveđa juha','Dugo kuhati govedinu i povrće.',22),(46,1,2,'Juha od brokule','Pirjati brokulu i izmiksati.',10),(47,4,2,'Juha od rajčice','Kuhati rajčice s začinima i izmiksati.',32);
/*!40000 ALTER TABLE `recept` ENABLE KEYS */;
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
