-- Add google_id column to korisnik table for Google authentication
ALTER TABLE `korisnik`
    ADD COLUMN `google_id` VARCHAR(255) DEFAULT NULL AFTER `omiljeni_recepti`,
    ADD UNIQUE KEY `google_id` (`google_id`);

