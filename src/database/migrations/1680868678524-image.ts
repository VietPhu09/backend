import {MigrationInterface, QueryRunner} from "typeorm";

export class image1680868678524 implements MigrationInterface {
    name = 'image1680868678524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`avatar\` \`avatarId\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`avatarId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD UNIQUE INDEX \`IDX_fc20c5df43e9d750e2f9dd7037\` (\`avatarId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fc20c5df43e9d750e2f9dd7037\` ON \`account\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_fc20c5df43e9d750e2f9dd7037b\` FOREIGN KEY (\`avatarId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_fc20c5df43e9d750e2f9dd7037b\``);
        await queryRunner.query(`DROP INDEX \`REL_fc20c5df43e9d750e2f9dd7037\` ON \`account\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_fc20c5df43e9d750e2f9dd7037\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`avatarId\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`avatarId\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`image\``);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`avatarId\` \`avatar\` varchar(255) NOT NULL`);
    }

}
