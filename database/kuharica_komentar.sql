CREATE TABLE `komentar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recept_id` int NOT NULL,
  `korisnik_id` int NOT NULL,
  `tekst` text NOT NULL,
  `datum` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `recept_id` (`recept_id`),
  KEY `korisnik_id` (`korisnik_id`),
  CONSTRAINT `komentar_ibfk_1` FOREIGN KEY (`recept_id`) REFERENCES `recept` (`id`) ON DELETE CASCADE,
  CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
