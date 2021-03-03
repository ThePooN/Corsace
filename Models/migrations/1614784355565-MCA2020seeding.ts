import { createReadStream, readFileSync } from "fs";
import {MigrationInterface, QueryRunner} from "typeorm";
import { createGunzip } from "zlib";
import streamToString from "stream-to-string";
import { resolve } from "path";

export class MCA2020seeding1614784355565 implements MigrationInterface {

    public async up (queryRunner: QueryRunner): Promise<void> {
        const bigSql = await streamToString(createReadStream(resolve(__dirname, "1614784355565-MCA2020seeding.sql.gz")).pipe(createGunzip()));
        const sqlInstructions = bigSql.split("\n").filter(sql => sql.trim().length !== 0);
        for(const sqlInstruction of sqlInstructions) {
            if(sqlInstruction.trim().length !== 0) {
                await queryRunner.query(sqlInstruction);
            }
        }
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
    }

}
