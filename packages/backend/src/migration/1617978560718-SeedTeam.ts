import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import TeamSeed from '../seed/team.seed';

export class SeedTeam1617978560718 implements MigrationInterface {
  public async up(): Promise<void> {
    await getRepository('team').save(TeamSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('team');
  }
}
