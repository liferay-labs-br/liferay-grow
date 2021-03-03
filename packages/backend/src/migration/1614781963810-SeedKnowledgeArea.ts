import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

import KnowledgeAreaSeed from '../seed/knowledge.area.seed';

export class SeedKnowledgeArea1614781963810 implements MigrationInterface {
  public async up(): Promise<void> {
    const skillPromises = [];
    for (const areaSeed of KnowledgeAreaSeed) {
      const { name, skills } = areaSeed;
      const area = await getRepository('knowledge_area').save({
        name,
        skills,
      });

      for (const skill of skills) {
        skillPromises.push(
          getRepository('knowledge_skill').save({
            area,
            created_by: 'SYSTEM',
            name: skill,
          }),
        );
      }
    }
    await Promise.all(skillPromises);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('knowledge_area');
    await queryRunner.dropTable('knowledge_skill');
  }
}
