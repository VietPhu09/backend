import {MigrationInterface, QueryRunner} from "typeorm";

export class update1680874152363 implements MigrationInterface {
    name = 'update1680874152363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_fc20c5df43e9d750e2f9dd7037b\``);
        await queryRunner.query(`DROP INDEX \`REL_fc20c5df43e9d750e2f9dd7037\` ON \`account\``);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`avatarId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD \`accountId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD UNIQUE INDEX \`IDX_a545efe23a364937bf87df5753\` (\`accountId\`)`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD UNIQUE INDEX \`IDX_77bf26eef8865441fb9bd53a36\` (\`roleId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_a545efe23a364937bf87df5753\` ON \`image\` (\`accountId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\` (\`roleId\`)`);
        await queryRunner.query(`ALTER TABLE \`image\` ADD CONSTRAINT \`FK_a545efe23a364937bf87df57539\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_77bf26eef8865441fb9bd53a364\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_77bf26eef8865441fb9bd53a364\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_a545efe23a364937bf87df57539\``);
        await queryRunner.query(`DROP INDEX \`REL_77bf26eef8865441fb9bd53a36\` ON \`account\``);
        await queryRunner.query(`DROP INDEX \`REL_a545efe23a364937bf87df5753\` ON \`image\``);
        await queryRunner.query(`ALTER TABLE \`account\` DROP INDEX \`IDX_77bf26eef8865441fb9bd53a36\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP INDEX \`IDX_a545efe23a364937bf87df5753\``);
        await queryRunner.query(`ALTER TABLE \`image\` DROP COLUMN \`accountId\``);
        await queryRunner.query(`ALTER TABLE \`account\` CHANGE \`roleId\` \`avatarId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fc20c5df43e9d750e2f9dd7037\` ON \`account\` (\`avatarId\`)`);
        await queryRunner.query(`ALTER TABLE \`account\` ADD CONSTRAINT \`FK_fc20c5df43e9d750e2f9dd7037b\` FOREIGN KEY (\`avatarId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
