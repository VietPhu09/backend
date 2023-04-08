import {MigrationInterface, QueryRunner} from "typeorm";

export class post1680869484487 implements MigrationInterface {
    name = 'post1680869484487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc20c5df43e9d750e2f9dd7037\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`contet\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`postId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_72da7f42d43f0be3b3ef35692a0\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_f219a87fd8c020d3bb6527c9420\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_f219a87fd8c020d3bb6527c9420\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_72da7f42d43f0be3b3ef35692a0\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`postId\``);
        await queryRunner.query(`ALTER TABLE \`account\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fc20c5df43e9d750e2f9dd7037\` ON \`account\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
