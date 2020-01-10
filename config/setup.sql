CREATE DATABASE IF NOT EXISTS  `matchars`;

CREATE TABLE IF NOT EXISTS  `matchars`.`users` 				
(
	`user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
	`username` VARCHAR(30) NOT NULL ,
	`password` VARCHAR(180) NOT NULL ,
	PRIMARY KEY (`user_id`) 
) ENGINE = InnoDB
