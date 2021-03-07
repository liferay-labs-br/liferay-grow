import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import OfficeSeed from '../seed/office.seed';

export class SeedOffice1614781968294 implements MigrationInterface {
  public async up(): Promise<void> {
    const teamPromises = [];
    for (const officeSeed of OfficeSeed) {
      const { teams, ...officeData } = officeSeed;
      const office = await getRepository('office').save(officeData);

      for (const team of teams) {
        teamPromises.push(
          getRepository('team').save({
            ...team,
            office,
          }),
        );
      }
    }
    await Promise.all(teamPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('office');
  }
}
