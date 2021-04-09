import { MigrationInterface, QueryRunner } from 'typeorm';

import { Team } from '../entity/Team';
import TeamSeed from '../seed/team.seed';

export class SeedTeam1617978560718 implements MigrationInterface {
  public async up(): Promise<void> {
    const teamsPromise = TeamSeed.map((team) => Team.create(team).save());

    await Promise.all(teamsPromise);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('team');
  }
}
