import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1681054287817 implements MigrationInterface {
    name = 'createTables1681054287817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_register\` ADD \`accountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`event_register\` ADD CONSTRAINT \`FK_5b07eff141f7bcf021c148996bc\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_register\` DROP FOREIGN KEY \`FK_5b07eff141f7bcf021c148996bc\``);
        await queryRunner.query(`ALTER TABLE \`event_register\` DROP COLUMN \`accountId\``);
    }

}
