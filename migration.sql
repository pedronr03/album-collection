DROP DATABASE IF EXISTS `AlbumCollection`;

CREATE DATABASE `AlbumCollection`;

USE `AlbumCollection`;

DROP TABLE IF EXISTS `Genre`;

CREATE TABLE `Genre`
(
    `id`   INT AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    CONSTRAINT PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Artist`;

CREATE TABLE `Artist`
(
    `id`   INT AUTO_INCREMENT,
    `name` VARCHAR(75) NOT NULL,
    CONSTRAINT PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `Album`;

CREATE TABLE `Album`
(
    `id`         INT AUTO_INCREMENT,
    `title`      VARCHAR(75) NOT NULL,
    `releasedAt` DATE        NOT NULL,
    `artistId`   INT         NOT NULL,
    `genreId`    INT,
    CONSTRAINT PRIMARY KEY (`id`),
    CONSTRAINT FOREIGN KEY (`artistId`)
        REFERENCES `Artist` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`genreId`)
        REFERENCES `Genre` (`id`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `Song`;

CREATE TABLE `Song`
(
    `id`      INT AUTO_INCREMENT,
    `title`   VARCHAR(75) NOT NULL,
    `length`  INT         NOT NULL,
    `albumId` INT         NOT NULL,
    CONSTRAINT PRIMARY KEY (`id`),
    CONSTRAINT FOREIGN KEY (`albumId`)
        REFERENCES `Album` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);