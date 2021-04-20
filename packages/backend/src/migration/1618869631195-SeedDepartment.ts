import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import DepartmentSeed from '../seed/department.seed';

export class SeedDepartment1618869631195 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('department').save(DepartmentSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('department');
  }
}
