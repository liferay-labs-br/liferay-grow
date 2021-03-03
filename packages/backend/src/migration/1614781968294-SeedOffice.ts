import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import OfficeSeed from '../seed/office.seed';

export class SeedOffice1614781968294 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('office').save(OfficeSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('office');
  }
}
