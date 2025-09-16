-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `login_id` VARCHAR(16) NOT NULL,
    `password` VARCHAR(48) NOT NULL,

    UNIQUE INDEX `user_login_id_key`(`login_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vote` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `start_at` DATETIME(6) NOT NULL,
    `end_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `star` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(48) NOT NULL,
    `profile_image_url` VARCHAR(511) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `voting_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NULL,
    `vote_id` BIGINT NOT NULL,
    `star_id` BIGINT NOT NULL,
    `valid` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_vote_id_fkey` FOREIGN KEY (`vote_id`) REFERENCES `vote`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `voting_log` ADD CONSTRAINT `voting_log_star_id_fkey` FOREIGN KEY (`star_id`) REFERENCES `star`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
