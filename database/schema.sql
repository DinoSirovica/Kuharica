/*
SQLyog Community v13.1.9 (64 bit)
MySQL - 8.0.28 : Database - kuharica
*********************************************************************
*/

CREATE DATABASE IF NOT EXISTS `kuharica` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION = 'N' */;

USE `kuharica`;

/*Table structure for table `korisnik` */

DROP TABLE IF EXISTS `korisnik`;

CREATE TABLE `korisnik`
(
    `id`               int          NOT NULL AUTO_INCREMENT,
    `korisnik_ime`     varchar(50)  NOT NULL,
    `email`            varchar(100) NOT NULL,
    `lozinka`          varchar(255) NOT NULL,
    `omiljeni_recepti`          varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `korisnik_ime` (`korisnik_ime`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/*Table structure for table `kategorija` */

DROP TABLE IF EXISTS `kategorija`;

CREATE TABLE `kategorija`
(
    `id`  int         NOT NULL AUTO_INCREMENT,
    `ime` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ime` (`ime`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 7
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/*Table structure for table `slika` */

DROP TABLE IF EXISTS `slika`;

CREATE TABLE `slika`
(
    `id`   int NOT NULL AUTO_INCREMENT,
    `data` longtext,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/* Table structure for table `sastojak` */

DROP TABLE IF EXISTS `sastojak`;

CREATE TABLE `sastojak`
(
    `id`  int          NOT NULL AUTO_INCREMENT,
    `ime` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ime` (`ime`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 71
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/*Table structure for table `recept` */

DROP TABLE IF EXISTS `recept`;

CREATE TABLE `recept`
(
    `id`            int          NOT NULL AUTO_INCREMENT,
    `korisnik_id`   int DEFAULT NULL,
    `kategorija_id` int DEFAULT NULL,
    `naslov`        varchar(100) NOT NULL,
    `upute`         text,
    `slika_id`      int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `korisnik_id` (`korisnik_id`),
    KEY `kategorija_id` (`kategorija_id`),
    CONSTRAINT `recept_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`),
    CONSTRAINT `recept_ibfk_2` FOREIGN KEY (`kategorija_id`) REFERENCES `kategorija` (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 18
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/*Table structure for table `recipe_sastojak` */

DROP TABLE IF EXISTS `recpt_sastojak`;

CREATE TABLE `recpt_sastojak`
(
    `recept_id`   int NOT NULL,
    `sastojak_id` int NOT NULL,
    `kolicina`    varchar(50) DEFAULT NULL,
    PRIMARY KEY (`recept_id`, `sastojak_id`),
    KEY `sastojak_id` (`sastojak_id`),
    CONSTRAINT `recpt_sastojak_ibfk_1` FOREIGN KEY (`recept_id`) REFERENCES `recept` (`id`),
    CONSTRAINT `recpt_sastojak_ibfk_2` FOREIGN KEY (`sastojak_id`) REFERENCES `sastojak` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;