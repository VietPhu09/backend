import {MigrationInterface, QueryRunner} from "typeorm";

export class createTable1683363444205 implements MigrationInterface {
    name = 'createTable1683363444205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`qr\` (\`id\` int NOT NULL AUTO_INCREMENT, \`qr_link\` text NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, \`eventsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`event_register\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` tinyint NOT NULL DEFAULT 0, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`postId\` int NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz\` json NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`businessId\` int NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`sex\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`postId\` int NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`slot\` int NOT NULL, \`startDay\` varchar(255) NOT NULL, \`startTime\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`reset_password\` (\`id\` int NOT NULL AUTO_INCREMENT, \`secret\` varchar(255) NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, UNIQUE INDEX \`REL_412dd5a7159457207cdacff03b\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`qr\` ADD CONSTRAINT \`FK_610f47a6b60230829a2ae18e077\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`qr\` ADD CONSTRAINT \`FK_ad06ef1af79a5344c6797a9259a\` FOREIGN KEY (\`eventsId\`) REFERENCES \`event_register\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`event_register\` ADD CONSTRAINT \`FK_d7e312ac1bdbcf2090e652d4a30\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`event_register\` ADD CONSTRAINT \`FK_5b07eff141f7bcf021c148996bc\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_ecf6ff25c3568e3af7160a8fc91\` FOREIGN KEY (\`businessId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_854e835530570a2eb36f405f06f\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_72da7f42d43f0be3b3ef35692a0\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_a545efe23a364937bf87df57539\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_f219a87fd8c020d3bb6527c9420\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`reset_password\` ADD CONSTRAINT \`FK_412dd5a7159457207cdacff03ba\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reset_password\` DROP FOREIGN KEY \`FK_412dd5a7159457207cdacff03ba\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_f219a87fd8c020d3bb6527c9420\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_a545efe23a364937bf87df57539\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_72da7f42d43f0be3b3ef35692a0\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_854e835530570a2eb36f405f06f\``);
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_ecf6ff25c3568e3af7160a8fc91\``);
        await queryRunner.query(`ALTER TABLE \`event_register\` DROP FOREIGN KEY \`FK_5b07eff141f7bcf021c148996bc\``);
        await queryRunner.query(`ALTER TABLE \`event_register\` DROP FOREIGN KEY \`FK_d7e312ac1bdbcf2090e652d4a30\``);
        await queryRunner.query(`ALTER TABLE \`qr\` DROP FOREIGN KEY \`FK_ad06ef1af79a5344c6797a9259a\``);
        await queryRunner.query(`ALTER TABLE \`qr\` DROP FOREIGN KEY \`FK_610f47a6b60230829a2ae18e077\``);
        await queryRunner.query(`DROP INDEX \`REL_412dd5a7159457207cdacff03b\` ON \`reset_password\``);
        await queryRunner.query(`DROP TABLE \`reset_password\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`DROP TABLE \`account\``);
        await queryRunner.query(`DROP TABLE \`role\``);
        await queryRunner.query(`DROP TABLE \`quiz\``);
        await queryRunner.query(`DROP TABLE \`event_register\``);
        await queryRunner.query(`DROP TABLE \`qr\``);
    }

}
