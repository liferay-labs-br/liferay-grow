import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import RoleSeed from '../seed/role.seed';

export class SeedRole1614805756237 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('role').save(RoleSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
