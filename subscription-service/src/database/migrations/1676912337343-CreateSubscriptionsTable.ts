import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubscriptionsTable1676912337343 implements MigrationInterface {
    name = 'CreateSubscriptionsTable1676912337343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."subscriptions_gender_enum" AS ENUM('M', 'F', 'N/A')`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "canceledAt" TIMESTAMP WITH TIME ZONE, "email" character varying NOT NULL, "firstName" character varying, "gender" "public"."subscriptions_gender_enum", "dateOfBirth" character varying NOT NULL, "consent" boolean NOT NULL, "newsletterId" character varying NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TYPE "public"."subscriptions_gender_enum"`);
    }

}
