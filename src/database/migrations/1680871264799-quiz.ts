import {MigrationInterface, QueryRunner} from "typeorm";

export class quiz1680871264799 implements MigrationInterface {
    name = 'quiz1680871264799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`contet\` \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`quiz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz\` json NOT NULL, \`businessId\` int NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_ecf6ff25c3568e3af7160a8fc91\` FOREIGN KEY (\`businessId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz\` ADD CONSTRAINT \`FK_854e835530570a2eb36f405f06f\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_854e835530570a2eb36f405f06f\``);
        await queryRunner.query(`ALTER TABLE \`quiz\` DROP FOREIGN KEY \`FK_ecf6ff25c3568e3af7160a8fc91\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`title\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`DROP TABLE \`quiz\``);
        await queryRunner.query(`ALTER TABLE \`post\` CHANGE \`title\` \`contet\` varchar(255) NOT NULL`);
    }

}
