import { MigrationInterface, QueryRunner } from "typeorm";

export class InitVercelHack1776767803719 implements MigrationInterface {
    name = 'InitVercelHack1776767803719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "api_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_ip" character varying, "uri" character varying, "method" character varying, "host" character varying, "url" text, "status" integer, "metadata" json, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_b75b6c8fef7ba758dfef840942d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "api_log"`);
    }

}
